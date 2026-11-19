'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'sonner';
import { Icons } from '@/components/icons';
import { cn } from '@/components/lib/utils';
import { PageCard, ativo, btn, inativo } from '../../shell';

// Mapa de férias do tutor (mock, sem backend): mostra o ano inteiro com fins de semana, feriados,
// férias aprovadas e pedidos pendentes. "Pedir férias" cria um pedido que o admin aprova ou recusa.
// Os pedidos ficam guardados no browser para a página do admin os poder ler mais tarde.

type Estado = 'Pendente' | 'Aprovado' | 'Recusado';
type Pedido = { id: string; inicio: string; fim: string; estado: Estado; criado: string; nota?: string };

const CHAVE = 'lousa.ferias.tutor';
const HOJE = '2026-11-19';
const DIAS_ANO = 22; // dias úteis de férias por ano
const TRANSITADOS = 2; // dias que transitaram do ano anterior
const MESES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
];
const LETRAS = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D']; // segunda → domingo
const COLUNAS = 37; // 31 dias + até 6 de desfasamento

const pedidosIniciais: Pedido[] = [
  { id: 'p1', inicio: '2026-04-06', fim: '2026-04-10', estado: 'Aprovado', criado: '2026-02-10' },
  { id: 'p2', inicio: '2026-08-03', fim: '2026-08-21', estado: 'Aprovado', criado: '2026-03-02' },
  {
    id: 'p3',
    inicio: '2026-10-12',
    fim: '2026-10-14',
    estado: 'Recusado',
    criado: '2026-09-15',
    nota: 'Semana de testes'
  },
  { id: 'p4', inicio: '2026-12-28', fim: '2026-12-30', estado: 'Pendente', criado: '2026-11-10' }
];

const iso = (y: number, m: number, d: number) => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
const somaDias = (s: string, n: number) => {
  const [y, m, d] = s.split('-').map(Number);
  const x = new Date(y, m - 1, d + n);
  return iso(x.getFullYear(), x.getMonth(), x.getDate());
};
const diaSemana = (s: string) => {
  const [y, m, d] = s.split('-').map(Number);
  return (new Date(y, m - 1, d).getDay() + 6) % 7; // 0 = segunda
};
const dataPt = (s: string) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' });
};

// Páscoa (algoritmo de Meeus) → Sexta-feira Santa e Corpo de Deus
function pascoa(y: number) {
  const a = y % 19,
    b = Math.floor(y / 100),
    c = y % 100,
    d = Math.floor(b / 4),
    e = b % 4;
  const f = Math.floor((b + 8) / 25),
    g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30,
    i = Math.floor(c / 4),
    k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7,
    m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31),
    dia = ((h + l - 7 * m + 114) % 31) + 1;
  return iso(y, mes - 1, dia);
}
function feriados(y: number): Record<string, string> {
  const p = pascoa(y);
  return {
    [iso(y, 0, 1)]: 'Ano Novo',
    [somaDias(p, -2)]: 'Sexta-feira Santa',
    [p]: 'Páscoa',
    [iso(y, 3, 25)]: 'Dia da Liberdade',
    [iso(y, 4, 1)]: 'Dia do Trabalhador',
    [somaDias(p, 60)]: 'Corpo de Deus',
    [iso(y, 5, 10)]: 'Dia de Portugal',
    [iso(y, 7, 15)]: 'Assunção de Nossa Senhora',
    [iso(y, 9, 5)]: 'Implantação da República',
    [iso(y, 10, 1)]: 'Todos os Santos',
    [iso(y, 11, 1)]: 'Restauração da Independência',
    [iso(y, 11, 8)]: 'Imaculada Conceição',
    [iso(y, 11, 25)]: 'Natal'
  };
}

// dias úteis entre duas datas (sem fins de semana nem feriados)
function diasUteis(inicio: string, fim: string) {
  const out: string[] = [];
  for (let d = inicio; d <= fim; d = somaDias(d, 1)) {
    if (diaSemana(d) < 5 && !feriados(Number(d.slice(0, 4)))[d]) out.push(d);
  }
  return out;
}

const corEstado: Record<Estado, string> = {
  Aprovado: 'bg-emerald-100 text-emerald-800',
  Pendente: 'bg-amber-100 text-amber-800',
  Recusado: 'bg-red-100 text-red-700'
};

export default function MapaFerias() {
  const [ano, setAno] = useState(Number(HOJE.slice(0, 4)));
  const [pedidos, setPedidos] = useState<Pedido[]>(pedidosIniciais);
  const [carregado, setCarregado] = useState(false);
  const [aPedir, setAPedir] = useState(false);

  useEffect(() => {
    try {
      const v = JSON.parse(localStorage.getItem(CHAVE) ?? 'null');
      if (Array.isArray(v)) setPedidos(v);
    } catch {
      /* sem localStorage: fica só em memória */
    }
    setCarregado(true);
  }, []);
  useEffect(() => {
    if (!carregado) return;
    try {
      localStorage.setItem(CHAVE, JSON.stringify(pedidos));
    } catch {
      /* idem */
    }
  }, [carregado, pedidos]);

  const fer = feriados(ano);
  // estado de cada dia (aprovado ganha a pendente)
  const marcados = new Map<string, Estado>();
  for (const p of pedidos) {
    if (p.estado === 'Recusado') continue;
    for (let d = p.inicio; d <= p.fim; d = somaDias(d, 1)) {
      if (marcados.get(d) !== 'Aprovado') marcados.set(d, p.estado);
    }
  }
  const doAno = (p: Pedido) => p.inicio.startsWith(String(ano)) || p.fim.startsWith(String(ano));
  const uteisDe = (e: Estado) =>
    pedidos.filter((p) => p.estado === e && doAno(p)).reduce((s, p) => s + diasUteis(p.inicio, p.fim).length, 0);
  const aprovados = uteisDe('Aprovado');
  const pendentes = uteisDe('Pendente');
  const disponiveis = DIAS_ANO + TRANSITADOS;
  const restantes = disponiveis - aprovados - pendentes;

  return (
    <PageCard
      titulo='Mapa de férias'
      acoes={
        <button className={cn(btn, ativo, 'flex items-center gap-1.5')} onClick={() => setAPedir(true)}>
          <Icons.add className='size-4' /> Pedir férias
        </button>
      }
    >
      <div className='min-h-0 flex-1 space-y-5 overflow-auto px-6 pb-6'>
        {/* resumo */}
        <div className='grid grid-cols-2 gap-3 lg:grid-cols-4'>
          {[
            ['Disponíveis', disponiveis, `${DIAS_ANO} do ano + ${TRANSITADOS} transitados`],
            ['Aprovados', aprovados, 'dias úteis'],
            ['Pendentes', pendentes, 'à espera do admin'],
            ['Por marcar', restantes, 'dias úteis']
          ].map(([l, v, s]) => (
            <div key={l} className='rounded-xl border border-(--line) p-4'>
              <div className='text-xs opacity-60'>{l}</div>
              <div className='text-2xl font-extrabold'>{v}</div>
              <div className='text-[11px] opacity-50'>{s}</div>
            </div>
          ))}
        </div>

        {/* mapa do ano */}
        <div className='overflow-x-auto rounded-xl border border-(--line)'>
          <div className='min-w-[1100px]'>
            <div className='grid grid-cols-[96px_repeat(37,minmax(0,1fr))] border-b border-(--line) bg-(--soft)/50 text-[11px] font-semibold'>
              <div className='flex items-center justify-between px-2 py-1.5'>
                <button
                  aria-label='Ano anterior'
                  onClick={() => setAno(ano - 1)}
                  className='rounded p-0.5 transition hover:bg-(--soft)'
                >
                  <Icons.chevronLeft className='size-3.5' />
                </button>
                <span className='text-sm font-bold tabular-nums'>{ano}</span>
                <button
                  aria-label='Ano seguinte'
                  onClick={() => setAno(ano + 1)}
                  className='rounded p-0.5 transition hover:bg-(--soft)'
                >
                  <Icons.chevronRight className='size-3.5' />
                </button>
              </div>
              {Array.from({ length: COLUNAS }, (_, c) => (
                <div key={c} className={cn('py-1.5 text-center', c % 7 >= 5 && 'opacity-50')}>
                  {LETRAS[c % 7]}
                </div>
              ))}
            </div>

            <div key={ano} style={{ animation: 'mapa-in 300ms ease-out' }}>
              {MESES.map((nome, m) => {
                const desloc = diaSemana(iso(ano, m, 1));
                const nDias = new Date(ano, m + 1, 0).getDate();
                return (
                  <div
                    key={nome}
                    className='grid grid-cols-[96px_repeat(37,minmax(0,1fr))] border-b border-(--line) text-[11px] last:border-b-0'
                  >
                    <div className='px-2 py-1.5 text-xs font-semibold'>{nome}</div>
                    {Array.from({ length: COLUNAS }, (_, c) => {
                      const dia = c - desloc + 1;
                      if (dia < 1 || dia > nDias) return <div key={c} className='border-l border-(--line)/50' />;
                      const d = iso(ano, m, dia);
                      const fds = c % 7;
                      const feriado = fer[d];
                      const estado = marcados.get(d);
                      const util = fds < 5 && !feriado;
                      return (
                        <div
                          key={c}
                          title={[
                            dataPt(d),
                            feriado,
                            estado && util && (estado === 'Aprovado' ? 'Férias aprovadas' : 'Pedido pendente')
                          ]
                            .filter(Boolean)
                            .join(' · ')}
                          className={cn(
                            'flex items-center justify-center border-l border-(--line)/50 py-1.5 tabular-nums',
                            fds === 5 && 'bg-(--soft)',
                            fds === 6 && 'bg-[color-mix(in_srgb,var(--soft)_55%,var(--line))]',
                            feriado && 'bg-emerald-600 font-semibold text-white',
                            util && estado === 'Aprovado' && 'bg-red-500 font-semibold text-white',
                            util && estado === 'Pendente' && 'bg-amber-200 font-semibold text-amber-900',
                            d === HOJE && 'ring-2 ring-(--accent) ring-inset'
                          )}
                        >
                          {dia}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* legenda */}
        <div className='flex flex-wrap gap-4 text-xs'>
          {[
            ['bg-red-500', 'Férias aprovadas'],
            ['bg-amber-200', 'Pedido pendente'],
            ['bg-emerald-600', 'Feriado'],
            ['bg-(--soft)', 'Sábado'],
            ['bg-[color-mix(in_srgb,var(--soft)_55%,var(--line))]', 'Domingo']
          ].map(([c, l]) => (
            <span key={l} className='flex items-center gap-1.5'>
              <span className={cn('size-3 rounded-sm border border-(--line)', c)} />
              {l}
            </span>
          ))}
        </div>

        {/* pedidos */}
        <section>
          <h2 className='mb-3 text-base font-bold'>Os meus pedidos</h2>
          <div className='overflow-hidden rounded-xl border border-(--line)'>
            <table className='w-full text-sm'>
              <thead className='bg-(--soft)/60 text-left text-xs opacity-70'>
                <tr>
                  <th className='px-4 py-2 font-medium'>Período</th>
                  <th className='font-medium'>Dias úteis</th>
                  <th className='font-medium'>Pedido em</th>
                  <th className='font-medium'>Observação</th>
                  <th className='font-medium'>Estado</th>
                  <th className='w-24 pr-4' />
                </tr>
              </thead>
              <tbody>
                {[...pedidos]
                  .sort((x, y) => y.inicio.localeCompare(x.inicio))
                  .map((p, k) => (
                    <tr
                      key={p.id}
                      className='border-t border-(--line)'
                      style={{ animation: `linha-in 420ms cubic-bezier(0.32,0.72,0,1) ${k * 45}ms both` }}
                    >
                      <td className='px-4 py-2.5 whitespace-nowrap'>
                        {dataPt(p.inicio)} – {dataPt(p.fim)} {p.fim.slice(0, 4)}
                      </td>
                      <td>{diasUteis(p.inicio, p.fim).length}</td>
                      <td className='opacity-70'>{dataPt(p.criado)}</td>
                      <td className='opacity-70'>{p.nota ?? '—'}</td>
                      <td>
                        <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', corEstado[p.estado])}>
                          {p.estado}
                        </span>
                      </td>
                      <td className='pr-4 text-right'>
                        {p.estado === 'Pendente' && (
                          <button
                            className='text-xs font-medium text-red-600 hover:underline'
                            onClick={() => {
                              setPedidos((ps) => ps.filter((x) => x.id !== p.id));
                              toast('Pedido de férias cancelado');
                            }}
                          >
                            Cancelar
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {aPedir && (
        <PedirFerias
          restantes={restantes}
          ocupados={marcados}
          fechar={() => setAPedir(false)}
          enviar={(p) => {
            setPedidos((ps) => [...ps, p]);
            setAno(Number(p.inicio.slice(0, 4)));
            setAPedir(false);
            toast('Pedido de férias enviado', { description: 'Fica pendente até o admin aprovar ou recusar.' });
          }}
        />
      )}
      <style>{`@keyframes mapa-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes linha-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }`}</style>
    </PageCard>
  );
}

function PedirFerias({
  restantes,
  ocupados,
  fechar,
  enviar
}: {
  restantes: number;
  ocupados: Map<string, Estado>;
  fechar: () => void;
  enviar: (p: Pedido) => void;
}) {
  // sugere a próxima semana completa
  const segunda = somaDias(HOJE, 7 - diaSemana(HOJE));
  const [inicio, setInicio] = useState(segunda);
  const [fim, setFim] = useState(somaDias(segunda, 4));
  const [nota, setNota] = useState('');
  const uteis = inicio && fim && fim >= inicio ? diasUteis(inicio, fim) : [];
  const sobrepoe = uteis.some((d) => ocupados.has(d));
  const erro =
    !inicio || !fim
      ? 'Escolhe as datas.'
      : fim < inicio
        ? 'A data de fim é anterior à de início.'
        : inicio < HOJE
          ? 'Não podes pedir férias para dias que já passaram.'
          : uteis.length === 0
            ? 'O período escolhido não tem dias úteis.'
            : sobrepoe
              ? 'Já tens férias marcadas ou pedidas nestes dias.'
              : null;
  const excede = !erro && uteis.length > restantes;

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && fechar();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [fechar]);

  const campo =
    'w-full rounded-lg border border-(--line) bg-(--surface,white) px-3 py-2 text-sm outline-none focus:border-(--accent)';

  return createPortal(
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4'
      style={{ animation: 'mapa-in 200ms ease-out' }}
      onClick={fechar}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          if (erro) return;
          enviar({
            id: `p${Date.now()}`,
            inicio,
            fim,
            estado: 'Pendente',
            criado: HOJE,
            nota: nota.trim() || undefined
          });
        }}
        className='w-full max-w-md space-y-4 rounded-2xl bg-(--surface,white) p-6 shadow-2xl'
      >
        <div className='flex items-start justify-between'>
          <div>
            <h3 className='text-lg font-bold'>Pedir férias</h3>
            <p className='text-xs opacity-60'>O pedido fica pendente até o admin o aprovar ou recusar.</p>
          </div>
          <button
            type='button'
            onClick={fechar}
            className='rounded-md p-1 opacity-60 hover:bg-(--soft) hover:opacity-100'
          >
            <Icons.close className='size-4' />
          </button>
        </div>

        <div className='grid grid-cols-2 gap-3'>
          <label className='block space-y-1 text-xs font-medium'>
            De
            <input
              type='date'
              className={campo}
              value={inicio}
              min={HOJE}
              onChange={(e) => setInicio(e.target.value)}
            />
          </label>
          <label className='block space-y-1 text-xs font-medium'>
            Até
            <input
              type='date'
              className={campo}
              value={fim}
              min={inicio || HOJE}
              onChange={(e) => setFim(e.target.value)}
            />
          </label>
        </div>

        <div className='rounded-lg bg-(--soft)/60 px-3 py-2 text-sm'>
          {erro ? (
            <span className='text-red-600'>{erro}</span>
          ) : (
            <>
              <span className='font-bold'>{uteis.length}</span> {uteis.length > 1 ? 'dias úteis' : 'dia útil'}
              {excede ? (
                <div className='text-xs text-amber-700'>
                  Excede em {uteis.length - Math.max(restantes, 0)} os dias disponíveis; o admin decide.
                </div>
              ) : (
                ` · ficam ${restantes - uteis.length} por marcar`
              )}
            </>
          )}
        </div>

        <label className='block space-y-1 text-xs font-medium'>
          Observação (opcional)
          <textarea
            rows={2}
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            placeholder='Ex.: viagem marcada, assunto familiar…'
            className={cn(campo, 'resize-none')}
          />
        </label>

        <div className='flex justify-end gap-2 pt-1'>
          <button type='button' className={cn(btn, inativo)} onClick={fechar}>
            Cancelar
          </button>
          <button type='submit' disabled={!!erro} className={cn(btn, ativo, 'disabled:opacity-40')}>
            Enviar pedido
          </button>
        </div>
      </form>
    </div>,
    document.getElementById('lousa-raiz') ?? document.body
  );
}
