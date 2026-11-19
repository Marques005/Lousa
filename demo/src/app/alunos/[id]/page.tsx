'use client';

import Link from 'next/link';
import { notFound, useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { cn } from '@/components/lib/utils';
import { Icons } from '@/components/icons';
import { ativo, btn, card, inativo } from '../../shell';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { type Aluno, alunos, dataPt, getAluno, iniciais, notaMax, positiva } from '../_data';

function Linha({ icon: Icon, children }: { icon: (typeof Icons)[keyof typeof Icons]; children: React.ReactNode }) {
  return (
    <div className='flex items-start gap-2.5 text-sm'>
      <Icon className='mt-0.5 size-4 shrink-0 opacity-70' />
      <span className='min-w-0 break-words'>{children}</span>
    </div>
  );
}

function Secao({ titulo, acao, children }: { titulo: string; acao?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section>
      <div className='mb-3 flex items-center justify-between'>
        <h2 className='text-base font-bold'>{titulo}</h2>
        {acao}
      </div>
      {children}
    </section>
  );
}

function Campo({ label, valor }: { label: string; valor: React.ReactNode }) {
  return (
    <div className='text-xs'>
      <span className='opacity-60'>{label}: </span>
      <span className='font-semibold'>{valor}</span>
    </div>
  );
}

// Encarregados de educação: um cartão por EE, desliza para o lado (scroll-snap) com setas e pontos
function Encarregados({ ees }: { ees: Aluno['ees'] }) {
  const pista = useRef<HTMLDivElement>(null);
  const [atual, setAtual] = useState(0);
  const varios = ees.length > 1;
  const ir = (k: number) => {
    const el = pista.current;
    if (el) el.scrollTo({ left: k * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <div>
      <h2 className='mb-2 text-sm font-bold whitespace-nowrap'>
        {varios ? 'Encarregados de educação' : 'Encarregado de educação'}
      </h2>
      <div className='relative'>
        {varios && (
          <>
            <button
              onClick={() => ir(atual - 1)}
              disabled={atual === 0}
              aria-label='EE anterior'
              className='absolute top-1/2 -left-6 z-10 -translate-y-1/2 rounded-md p-0.5 transition hover:bg-(--dot)/15 disabled:opacity-20'
            >
              <Icons.chevronLeft className='size-5' />
            </button>
            <button
              onClick={() => ir(atual + 1)}
              disabled={atual === ees.length - 1}
              aria-label='EE seguinte'
              className='absolute top-1/2 -right-6 z-10 -translate-y-1/2 rounded-md p-0.5 transition hover:bg-(--dot)/15 disabled:opacity-20'
            >
              <Icons.chevronRight className='size-5' />
            </button>
          </>
        )}
        <div
          ref={pista}
          onScroll={(e) => setAtual(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
          className='flex snap-x snap-mandatory overflow-x-auto rounded-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
        >
          {ees.map((ee) => (
            <div key={ee.email} className='w-full shrink-0 snap-start space-y-2.5 rounded-xl bg-(--dot)/10 p-4'>
              <div className='flex items-center gap-3'>
                <span className='flex size-10 items-center justify-center rounded-full bg-(--dot)/20 text-sm font-bold'>
                  {iniciais(ee.nome)}
                </span>
                <div>
                  <div className='font-semibold'>{ee.nome}</div>
                  <div className='text-xs opacity-70'>{ee.parentesco}</div>
                </div>
              </div>
              <Linha icon={Icons.phone}>{ee.telefone}</Linha>
              <Linha icon={Icons.send}>{ee.email}</Linha>
            </div>
          ))}
        </div>
      </div>
      {varios && (
        <div className='mt-2 flex justify-center gap-1.5'>
          {ees.map((ee, k) => (
            <button
              key={ee.email}
              onClick={() => ir(k)}
              aria-label={ee.nome}
              className={cn(
                'h-1.5 rounded-full bg-(--dot) transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
                k === atual ? 'w-4' : 'w-1.5 opacity-30'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Avaliações vindas da escola (testes, fichas, trabalhos)
const escalaAv = (a: Aluno) => {
  const pct = a.escala === '1-5'; // 9.º ano: testes em percentagem
  return {
    rotulo: pct ? '0–100%' : 'escala 0–20',
    ok: (n: number) => (pct ? n >= 50 : n >= 9.5),
    fmt: (n: number) =>
      pct ? `${Math.round(n)}%` : n.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
  };
};

type Av = Aluno['avaliacoes'][number];
const chave = (x: Av) => `${x.data}-${x.disciplina}-${x.tipo}-${x.nota}`;

function TabelaAvaliacoes({ a, itens, eliminar }: { a: Aluno; itens: Av[]; eliminar?: (x: Av) => void }) {
  const { ok, fmt } = escalaAv(a);
  const [aSair, setASair] = useState<string | null>(null); // linha a desaparecer antes de ser removida
  return (
    <table className='w-full text-sm'>
      <thead className='bg-(--soft)/60 text-left text-xs opacity-70'>
        <tr>
          <th className={cn('w-36 py-2 pr-4 font-medium', eliminar ? 'pl-11' : 'pl-4')}>Data</th>
          <th className='font-medium'>Disciplina</th>
          <th className='w-44 font-medium'>Tipo</th>
          <th className='w-24 pr-4 text-right font-medium'>Nota</th>
        </tr>
      </thead>
      <tbody>
        {itens.map((x, k) => (
          <tr
            key={chave(x)}
            className='group border-t border-(--line) transition-colors hover:bg-(--soft)/40'
            // entrada em cascata, como se a tabela fosse "desenrolando"; saída ao eliminar
            style={{
              animation:
                aSair === chave(x)
                  ? 'linha-out 260ms ease-in both'
                  : `linha-in 420ms cubic-bezier(0.32,0.72,0,1) ${Math.min(k, 12) * 45}ms both`
            }}
            onAnimationEnd={(e) => {
              if (e.animationName === 'linha-out') {
                setASair(null);
                eliminar?.(x);
              }
            }}
          >
            <td className={cn('relative py-2.5 pr-4 whitespace-nowrap', eliminar ? 'pl-11' : 'pl-4')}>
              {eliminar && (
                <button
                  title='Eliminar avaliação'
                  aria-label='Eliminar avaliação'
                  onClick={() => setASair(chave(x))}
                  className='absolute top-1/2 left-3 -translate-x-1 -translate-y-1/2 rounded-md p-1 text-red-500 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 hover:bg-red-100 focus-visible:opacity-100'
                >
                  <Icons.trash className='size-4' />
                </button>
              )}
              {dataPt(x.data)}
            </td>
            <td>{x.disciplina}</td>
            <td className='opacity-70'>{x.tipo}</td>
            <td className='pr-4 text-right'>
              <span
                className={cn(
                  'inline-block min-w-12 rounded-md px-2 py-0.5 text-center font-bold',
                  ok(x.nota) ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'
                )}
              >
                {fmt(x.nota)}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Na ficha: só as 3 últimas; "Ver todas" troca a ficha pela vista completa
function Avaliacoes({
  a,
  avs,
  verTodas,
  eliminar
}: {
  a: Aluno;
  avs: Av[];
  verTodas: () => void;
  eliminar: (x: Av) => void;
}) {
  return (
    <Secao
      titulo='Avaliações'
      acao={<span className='text-xs opacity-60'>Testes e trabalhos da escola · {escalaAv(a).rotulo}</span>}
    >
      <div className='overflow-hidden rounded-xl border border-(--line)'>
        <TabelaAvaliacoes a={a} itens={avs.slice(0, 3)} eliminar={eliminar} />
        {avs.length > 3 && (
          <button
            onClick={verTodas}
            className='flex w-full items-center justify-center gap-1 border-t border-(--line) py-2 text-xs font-medium text-(--accent) transition hover:bg-(--soft)/60'
          >
            Ver todas ({avs.length})
            <Icons.chevronRight className='size-4' />
          </button>
        )}
      </div>
    </Secao>
  );
}

// Registo de uma avaliação trazida da escola (mock: fica só em memória)
function NovaAvaliacao({ a, fechar, guardar }: { a: Aluno; fechar: () => void; guardar: (x: Av) => void }) {
  const pct = a.escala === '1-5';
  const [disciplina, setDisciplina] = useState(a.notas[0]?.disciplina ?? '');
  const [tipo, setTipo] = useState('Teste');
  const [data, setData] = useState('2026-11-19');
  const [nota, setNota] = useState('');
  const max = pct ? 100 : 20;
  const valor = Number(nota.replace(',', '.'));
  const valida = nota !== '' && !Number.isNaN(valor) && valor >= 0 && valor <= max && data !== '';

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && fechar();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [fechar]);

  const campo =
    'w-full rounded-lg border border-(--line) bg-(--surface,white) px-3 py-2 text-sm outline-none focus:border-(--accent)';

  // portal para a raiz da Shell (tem as variáveis do tema): o conteúdo da página tem transform e prenderia o `fixed`
  return createPortal(
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4'
      style={{ animation: 'aula-in 200ms ease-out' }}
      onClick={fechar}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          if (valida) guardar({ data, disciplina, tipo, nota: pct ? Math.round(valor) : Math.round(valor * 10) / 10 });
        }}
        className='w-full max-w-md space-y-4 rounded-2xl bg-(--surface,white) p-6 shadow-2xl'
      >
        <div className='flex items-start justify-between'>
          <div>
            <h3 className='text-lg font-bold'>Registar avaliação</h3>
            <p className='text-xs opacity-60'>
              {a.nome} · {pct ? 'nota em percentagem (0–100%)' : 'escala 0–20'}
            </p>
          </div>
          <button
            type='button'
            onClick={fechar}
            className='rounded-md p-1 opacity-60 hover:bg-(--soft) hover:opacity-100'
          >
            <Icons.close className='size-4' />
          </button>
        </div>

        <label className='block space-y-1 text-xs font-medium'>
          Disciplina
          <select className={campo} value={disciplina} onChange={(e) => setDisciplina(e.target.value)}>
            {a.notas.map((n) => (
              <option key={n.disciplina}>{n.disciplina}</option>
            ))}
          </select>
        </label>
        <div className='grid grid-cols-2 gap-3'>
          <label className='block space-y-1 text-xs font-medium'>
            Tipo
            <select className={campo} value={tipo} onChange={(e) => setTipo(e.target.value)}>
              {['Teste', 'Mini-teste', 'Ficha de avaliação', 'Trabalho'].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className='block space-y-1 text-xs font-medium'>
            Data
            <input type='date' className={campo} value={data} onChange={(e) => setData(e.target.value)} />
          </label>
        </div>
        <label className='block space-y-1 text-xs font-medium'>
          Nota {pct ? '(%)' : '(0–20)'}
          <input
            autoFocus
            inputMode='decimal'
            placeholder={pct ? 'ex.: 72' : 'ex.: 14,5'}
            className={campo}
            value={nota}
            onChange={(e) => setNota(e.target.value)}
          />
        </label>

        <div className='flex justify-end gap-2 pt-1'>
          <button type='button' className={cn(btn, inativo)} onClick={fechar}>
            Cancelar
          </button>
          <button type='submit' disabled={!valida} className={cn(btn, ativo, 'disabled:opacity-40')}>
            Guardar
          </button>
        </div>
      </form>
    </div>,
    document.getElementById('lousa-raiz') ?? document.body
  );
}

function TodasAvaliacoes({
  a,
  avs,
  voltar,
  registar,
  eliminar
}: {
  a: Aluno;
  avs: Av[];
  voltar: () => void;
  registar: (x: Av) => void;
  eliminar: (x: Av) => void;
}) {
  const [disc, setDisc] = useState<string | null>(null);
  const [aRegistar, setARegistar] = useState(false);
  const { ok, fmt } = escalaAv(a);
  const discs = [...new Set(avs.map((x) => x.disciplina))];
  const itens = avs.filter((x) => !disc || x.disciplina === disc);
  const media = itens.reduce((s, x) => s + x.nota, 0) / (itens.length || 1);
  const negativas = itens.filter((x) => !ok(x.nota)).length;

  return (
    <div className='space-y-5' style={{ animation: 'aula-in 300ms ease-out' }}>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div className='flex items-center gap-3'>
          <button onClick={voltar} className={cn(btn, inativo, 'flex items-center gap-1 px-3')}>
            <Icons.chevronLeft className='size-4' /> Voltar à ficha
          </button>
          <h2 className='text-base font-bold'>Todas as avaliações</h2>
        </div>
        <button className={cn(btn, ativo, 'flex items-center gap-1.5')} onClick={() => setARegistar(true)}>
          <Icons.add className='size-4' /> Registar avaliação
        </button>
      </div>

      <div className='grid grid-cols-3 gap-3'>
        {[
          ['Avaliações', String(itens.length)],
          ['Média', fmt(media)],
          ['Negativas', String(negativas)]
        ].map(([l, v]) => (
          <div key={l} className='rounded-xl border border-(--line) p-4'>
            <div className='text-xs opacity-60'>{l}</div>
            <div className='text-2xl font-extrabold'>{v}</div>
          </div>
        ))}
      </div>

      <div className='flex flex-wrap gap-2'>
        <button className={cn(btn, !disc ? ativo : inativo)} onClick={() => setDisc(null)}>
          Todas
        </button>
        {discs.map((d) => (
          <button key={d} className={cn(btn, disc === d ? ativo : inativo)} onClick={() => setDisc(d)}>
            {d}
          </button>
        ))}
      </div>

      <div
        key={disc ?? 'todas'}
        className='overflow-hidden rounded-xl border border-(--line)'
        style={{ animation: 'aula-in 250ms ease-out' }}
      >
        <TabelaAvaliacoes a={a} itens={itens} eliminar={eliminar} />
      </div>
      {aRegistar && (
        <NovaAvaliacao
          a={a}
          fechar={() => setARegistar(false)}
          guardar={(x) => {
            registar(x);
            setDisc(null);
            setARegistar(false);
          }}
        />
      )}
    </div>
  );
}

// Sessões no centro (mock): sessões 2x por semana desde o início do ano letivo, geradas a partir do id
type Atividade = { assunto: string; tipo: string; data: string; estado: 'Agendada' | 'Concluída' | 'Faltou' };
const HOJE = '2026-11-19';

function atividadeDe(a: Aluno): Atividade[] {
  let semente = [...a.id].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  const rnd = () => (semente = (semente * 1103515245 + 12345) >>> 0) / 2 ** 32;
  const out: Atividade[] = [];
  for (let d = new Date('2026-09-22T12:00:00'); d <= new Date('2026-11-27T12:00:00'); d.setDate(d.getDate() + 1)) {
    const dia = d.getDay();
    if ((dia !== 2 && dia !== 4) || rnd() < 0.45) continue; // terças e quintas, nem todas
    const data = d.toISOString().slice(0, 10);
    const disc = a.notas[Math.floor(rnd() * a.notas.length)]?.disciplina ?? 'Estudo';
    const tipo = rnd() < 0.6 ? 'Explicação' : 'Apoio ao estudo';
    out.push({
      assunto: `Sessão de ${disc}`,
      tipo,
      data,
      estado: data > HOJE ? 'Agendada' : rnd() < 0.08 ? 'Faltou' : 'Concluída'
    });
  }
  return out.sort((x, y) => y.data.localeCompare(x.data));
}

const corPonto = { Agendada: 'bg-amber-400', Concluída: 'bg-emerald-500', Faltou: 'bg-red-500' };
const corEstado = {
  Agendada: 'bg-amber-100 text-amber-800',
  Concluída: 'bg-emerald-100 text-emerald-800',
  Faltou: 'bg-red-100 text-red-700'
};

const DIAS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
const MESES = ['2026-09', '2026-10', '2026-11']; // meses com sessões no mock

// Calendário mensal das sessões do aluno no centro
function CalendarioSessoes({ sessoes }: { sessoes: Atividade[] }) {
  const [m, setMes] = useState(MESES.indexOf(HOJE.slice(0, 7)));
  const [dir, setDir] = useState(0); // -1 mês anterior, 1 seguinte: o mês novo entra desse lado
  const setM = (n: number) => {
    setDir(n > m ? 1 : -1);
    setMes(n);
  };
  const [ano, mes] = MESES[m].split('-').map(Number);
  const primeiro = new Date(ano, mes - 1, 1);
  const vazios = (primeiro.getDay() + 6) % 7; // semana começa à segunda
  const nDias = new Date(ano, mes, 0).getDate();
  const porDia = new Map<string, Atividade[]>();
  sessoes.forEach((x) => porDia.set(x.data, [...(porDia.get(x.data) ?? []), x]));
  const doMes = sessoes.filter((x) => x.data.startsWith(MESES[m]));
  const conta = (e: Atividade['estado']) => doMes.filter((x) => x.estado === e).length;
  const titulo = primeiro.toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' });

  return (
    <div className='overflow-hidden rounded-xl border border-(--line) p-4'>
      <div className='mb-3 flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <button
            onClick={() => setM(m - 1)}
            disabled={m === 0}
            className='rounded-md p-1 transition hover:bg-(--soft) disabled:opacity-30'
          >
            <Icons.chevronLeft className='size-4' />
          </button>
          <span className='w-36 text-center text-sm font-bold first-letter:uppercase'>{titulo}</span>
          <button
            onClick={() => setM(m + 1)}
            disabled={m === MESES.length - 1}
            className='rounded-md p-1 transition hover:bg-(--soft) disabled:opacity-30'
          >
            <Icons.chevronRight className='size-4' />
          </button>
        </div>
        <div className='flex flex-wrap gap-3 text-xs'>
          {(['Concluída', 'Agendada', 'Faltou'] as const).map((e) => (
            <span key={e} className='flex items-center gap-1.5'>
              <span className={cn('size-2 rounded-full', corPonto[e])} />
              {e === 'Concluída' ? 'Concluídas' : e === 'Agendada' ? 'Agendadas' : 'Faltas'}
              <span className='font-semibold'>{conta(e)}</span>
            </span>
          ))}
        </div>
      </div>

      <div
        key={m}
        className='grid grid-cols-7 gap-1'
        style={
          {
            '--dx': `${dir * 40}px`,
            animation: 'mes-in 480ms cubic-bezier(0.32,0.72,0,1) both'
          } as React.CSSProperties
        }
      >
        {DIAS.map((d) => (
          <div key={d} className='pb-1 text-center text-[11px] font-medium opacity-50'>
            {d}
          </div>
        ))}
        {Array.from({ length: vazios }, (_, k) => (
          <div key={`v${k}`} />
        ))}
        {Array.from({ length: nDias }, (_, k) => {
          const data = `${MESES[m]}-${String(k + 1).padStart(2, '0')}`;
          const dia = porDia.get(data) ?? [];
          const fds = (vazios + k) % 7 >= 5;
          return (
            <div
              key={data}
              // semanas a "desenrolar" de cima para baixo
              style={{
                animation: `dia-in 420ms cubic-bezier(0.32,0.72,0,1) ${Math.floor((vazios + k) / 7) * 40 + ((vazios + k) % 7) * 12}ms both`
              }}
              className={cn(
                'min-h-16 rounded-lg border border-transparent p-1.5 text-xs',
                fds ? 'bg-(--soft)/30' : 'bg-(--soft)/60',
                data === HOJE && 'border-(--accent)'
              )}
            >
              <div className={cn('mb-1 font-semibold', data === HOJE ? 'text-(--accent)' : 'opacity-60')}>{k + 1}</div>
              {dia.map((x) => (
                <div
                  key={x.assunto}
                  title={`${x.assunto} · ${x.tipo} · ${x.estado}`}
                  className={cn(
                    'truncate rounded px-1 py-0.5 text-[10px] leading-tight font-medium',
                    corEstado[x.estado]
                  )}
                >
                  {x.assunto.replace('Sessão de ', '')}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Notas por ano letivo e período (só notas finais, sem intercalares).
// - anos anteriores: gerados (mock) a partir das notas atuais do aluno
// - ano atual: 1.º período vem do mock; os seguintes são lançados pelo tutor
// - anos seguintes: o tutor passa o aluno de ano depois de lançar o 3.º período
// O que o tutor lança fica guardado no browser (sem backend).
type NotaDisc = { disciplina: string; nota: number };
type Periodo = { periodo: string; notas: NotaDisc[] };
type Escala = '1-5' | '0-20';
type AnoLetivo = {
  anoLetivo: string;
  ano: number;
  escala: Escala;
  disciplinas: string[];
  periodos: Periodo[];
  editavel: boolean;
};
type Guardado = { anos: Record<string, Periodo[]>; extra: { anoLetivo: string; ano: number }[] };
const PERIODOS = ['1.º período', '2.º período', '3.º período'];

const escalaDe = (ano: number): Escala => (ano <= 9 ? '1-5' : '0-20');
const maxDe = (e: Escala) => (e === '1-5' ? 5 : 20);
const minDe = (e: Escala) => (e === '1-5' ? 1 : 0);
const positivaE = (e: Escala, n: number) => n >= (e === '1-5' ? 3 : 10);
const anoLetivoMais = (al: string, k: number) => {
  const y = Number(al.slice(0, 4)) + k;
  return `${y}/${y + 1}`;
};
const curto = (al: string) => `${al.slice(0, 4)}/${al.slice(7)}`;

// disciplinas por ano de escolaridade (tiradas do próprio mock)
const discPorAno = (ano: number, a: Aluno): string[] => {
  if (ano === a.ano) return a.notas.map((n) => n.disciplina);
  const ref = alunos.find((x) => x.ano === Math.max(9, Math.min(12, ano)) && (ano <= 9 || a.ano <= 9 || x.curso === a.curso));
  return (ref ?? a).notas.map((n) => n.disciplina);
};

// histórico determinístico: mantém o "nível" do aluno, com alguma variação entre anos e períodos
function historico(a: Aluno): AnoLetivo[] {
  let semente = [...a.id].reduce((h, c) => (h * 33 + c.charCodeAt(0)) >>> 0, 11);
  const rnd = () => (semente = (semente * 1103515245 + 12345) >>> 0) / 2 ** 32;
  const nivelGeral = a.notas.reduce((s, n) => s + n.nota, 0) / (a.notas.length || 1) / notaMax(a);
  return [2, 1].map((k) => {
    const ano = a.ano - k;
    const escala = escalaDe(ano);
    const max = maxDe(escala);
    const disciplinas = discPorAno(ano, a);
    const periodos = PERIODOS.map((periodo, p) => ({
      periodo,
      notas: disciplinas.map((disciplina) => {
        const atual = a.notas.find((n) => n.disciplina === disciplina);
        const nivel = atual ? atual.nota / notaMax(a) : nivelGeral;
        const ruido = (rnd() - 0.5) * 0.22 + (p - 1) * 0.02;
        const nota = Math.round((nivel + ruido) * max);
        return { disciplina, nota: Math.max(minDe(escala), Math.min(max, nota)) };
      })
    }));
    return { anoLetivo: anoLetivoMais(a.anoLetivo, -k), ano, escala, disciplinas, periodos, editavel: false };
  });
}

function useNotasGuardadas(id: string, anoAtual: string) {
  const [porAluno, setPorAluno] = useState<Record<string, Guardado>>({});
  useEffect(() => {
    try {
      const v = JSON.parse(localStorage.getItem(`lousa.notas.${id}`) ?? 'null');
      // formato antigo (só uma lista de períodos do ano atual)
      const g: Guardado = Array.isArray(v) ? { anos: { [anoAtual]: v }, extra: [] } : (v ?? { anos: {}, extra: [] });
      setPorAluno((p) => ({ ...p, [id]: g }));
    } catch {
      /* sem localStorage: fica só em memória */
    }
  }, [id, anoAtual]);
  const atualizar = (f: (g: Guardado) => Guardado) =>
    setPorAluno((prev) => {
      const novo = f(prev[id] ?? { anos: {}, extra: [] });
      try {
        localStorage.setItem(`lousa.notas.${id}`, JSON.stringify(novo));
      } catch {
        /* idem */
      }
      return { ...prev, [id]: novo };
    });
  const lancar = (anoLetivo: string, p: Periodo) =>
    atualizar((g) => ({
      ...g,
      anos: { ...g.anos, [anoLetivo]: [...(g.anos[anoLetivo] ?? []).filter((x) => x.periodo !== p.periodo), p] }
    }));
  const iniciarAno = (anoLetivo: string, ano: number) =>
    atualizar((g) => ({ ...g, extra: [...g.extra.filter((x) => x.anoLetivo !== anoLetivo), { anoLetivo, ano }] }));
  return [porAluno[id] ?? { anos: {}, extra: [] }, lancar, iniciarAno] as const;
}

// junta histórico + ano atual + anos iniciados pelo tutor; só o último ano é editável
function anosDoAluno(a: Aluno, g: Guardado): AnoLetivo[] {
  const ordenar = (ps: Periodo[]) => [...ps].sort((x, y) => PERIODOS.indexOf(x.periodo) - PERIODOS.indexOf(y.periodo));
  const atual: AnoLetivo = {
    anoLetivo: a.anoLetivo,
    ano: a.ano,
    escala: a.escala as Escala,
    disciplinas: a.notas.map((n) => n.disciplina),
    periodos: ordenar([
      { periodo: PERIODOS[0], notas: a.notas },
      ...(g.anos[a.anoLetivo] ?? []).filter((p) => p.periodo !== PERIODOS[0])
    ]),
    editavel: true
  };
  const extra = [...g.extra]
    .sort((x, y) => x.anoLetivo.localeCompare(y.anoLetivo))
    .map(({ anoLetivo, ano }) => ({
      anoLetivo,
      ano,
      escala: escalaDe(ano),
      disciplinas: discPorAno(ano, a),
      periodos: ordenar(g.anos[anoLetivo] ?? []),
      editavel: true
    }));
  const todos = [...historico(a), atual, ...extra];
  return todos.map((x, k) => ({ ...x, editavel: x.editavel && k === todos.length - 1 }));
}

const resumo = (e: Escala, notas: NotaDisc[]) => ({
  media: Math.round((notas.reduce((s, n) => s + n.nota, 0) / (notas.length || 1)) * 100) / 100,
  negativas: notas.filter((n) => !positivaE(e, n.nota)).length
});

function NotasAnos({
  a,
  anos,
  lancar,
  iniciarAno
}: {
  a: Aluno;
  anos: AnoLetivo[];
  lancar: (anoLetivo: string, p: Periodo) => void;
  iniciarAno: (anoLetivo: string, ano: number) => void;
}) {
  const [selAno, setSelAno] = useState(anos.length - 1);
  const [selPer, setSelPer] = useState<number | null>(null); // null = último período do ano
  const [aLancar, setALancar] = useState(false);
  // quando aparece um ano novo (ao carregar ou ao passar de ano) mostra-o
  useEffect(() => setSelAno(anos.length - 1), [anos.length]);
  const ano = anos[Math.min(selAno, anos.length - 1)];
  const nPer = ano.periodos.length;
  useEffect(() => setSelPer(null), [ano.anoLetivo, nPer]);
  const per = ano.periodos[selPer ?? nPer - 1];
  const max = maxDe(ano.escala);
  const porLancar = ano.editavel ? PERIODOS.filter((p) => !ano.periodos.some((x) => x.periodo === p)) : [];
  const ultimoAno = anos[anos.length - 1];
  const podePassar = ano === ultimoAno && ultimoAno.periodos.length === PERIODOS.length && ultimoAno.ano < 12;

  return (
    <Secao
      titulo='Notas'
      acao={
        porLancar.length > 0 ? (
          <button className={cn(btn, ativo, 'flex items-center gap-1.5')} onClick={() => setALancar(true)}>
            <Icons.add className='size-4' /> Lançar notas do {porLancar[0]}
          </button>
        ) : podePassar ? (
          <button
            className={cn(btn, ativo, 'flex items-center gap-1.5')}
            onClick={() => {
              const novo = anoLetivoMais(ultimoAno.anoLetivo, 1);
              iniciarAno(novo, ultimoAno.ano + 1);
              toast(`${a.nome.split(' ')[0]} passou para o ${ultimoAno.ano + 1}.º ano (${novo})`);
            }}
          >
            <Icons.chevronRight className='size-4' /> Passar para o {ultimoAno.ano + 1}.º ano
          </button>
        ) : null
      }
    >
      <div className='rounded-xl border border-(--line) p-4'>
        {/* anos letivos */}
        <div className='mb-3 flex flex-wrap gap-2'>
          {anos.map((x, k) => (
            <button
              key={x.anoLetivo}
              onClick={() => setSelAno(k)}
              className={cn(btn, x === ano ? ativo : inativo, 'flex items-center gap-1.5 px-3 py-1 text-xs')}
            >
              {curto(x.anoLetivo)} · {x.ano}.º ano
              {x.editavel && <span className='rounded bg-white/25 px-1 text-[10px]'>atual</span>}
            </button>
          ))}
        </div>

        {/* períodos do ano escolhido */}
        <div className='mb-4 flex flex-wrap items-center justify-between gap-2'>
          {nPer > 0 ? (
            <div className='flex gap-1 rounded-lg bg-(--soft)/60 p-1'>
              {ano.periodos.map((p, k) => (
                <button
                  key={p.periodo}
                  onClick={() => setSelPer(k)}
                  className={cn(
                    'rounded-md px-3 py-1 text-xs font-medium transition',
                    p === per ? 'bg-(--surface,white) shadow-sm' : 'opacity-60 hover:opacity-100'
                  )}
                >
                  {p.periodo}
                </button>
              ))}
            </div>
          ) : (
            <span />
          )}
          {per && (
            <span className='text-xs opacity-60'>
              Média {resumo(ano.escala, per.notas).media.toLocaleString('pt-PT')} · escala {ano.escala}
            </span>
          )}
        </div>

        {per ? (
          <div key={`${ano.anoLetivo}-${per.periodo}`} className='grid gap-x-8 gap-y-3 md:grid-cols-2'>
            {per.notas.map((n, k) => {
              const ok = positivaE(ano.escala, n.nota);
              return (
                <div key={n.disciplina} className='flex items-center gap-3'>
                  <span className='w-40 shrink-0 truncate text-sm'>{n.disciplina}</span>
                  <div className='h-2 flex-1 overflow-hidden rounded-full bg-(--soft)'>
                    <div
                      className={cn('h-full origin-left rounded-full', ok ? 'bg-(--accent)' : 'bg-red-400')}
                      style={{
                        width: `${(n.nota / max) * 100}%`,
                        animation: `barra-in 600ms cubic-bezier(0.32,0.72,0,1) ${k * 40}ms both`
                      }}
                    />
                  </div>
                  <span className={cn('w-7 text-right text-sm font-bold', !ok && 'text-red-500')}>{n.nota}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className='py-6 text-center text-sm opacity-60'>
            Ainda sem notas em {ano.anoLetivo}. Lança as do 1.º período quando estiverem disponíveis.
          </p>
        )}
      </div>

      {aLancar && porLancar[0] && (
        <LancarNotas
          a={a}
          ano={ano}
          periodo={porLancar[0]}
          fechar={() => setALancar(false)}
          guardar={(p) => {
            lancar(ano.anoLetivo, p);
            setALancar(false);
            toast(`Notas do ${p.periodo} de ${ano.anoLetivo} lançadas`);
          }}
        />
      )}
    </Secao>
  );
}

function LancarNotas({
  a,
  ano,
  periodo,
  fechar,
  guardar
}: {
  a: Aluno;
  ano: AnoLetivo;
  periodo: string;
  fechar: () => void;
  guardar: (p: Periodo) => void;
}) {
  const max = maxDe(ano.escala);
  const minimo = minDe(ano.escala);
  const [valores, setValores] = useState<Record<string, string>>({});
  const valida = (v?: string) => v !== undefined && /^\d{1,2}$/.test(v) && +v >= minimo && +v <= max;
  const tudoValido = ano.disciplinas.every((d) => valida(valores[d]));

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && fechar();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [fechar]);

  return createPortal(
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4'
      style={{ animation: 'aula-in 200ms ease-out' }}
      onClick={fechar}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          if (tudoValido)
            guardar({ periodo, notas: ano.disciplinas.map((d) => ({ disciplina: d, nota: +valores[d] })) });
        }}
        className='w-full max-w-lg space-y-4 rounded-2xl bg-(--surface,white) p-6 shadow-2xl'
      >
        <div className='flex items-start justify-between'>
          <div>
            <h3 className='text-lg font-bold'>Lançar notas do {periodo}</h3>
            <p className='text-xs opacity-60'>
              {a.nome} · {ano.anoLetivo} · {ano.ano}.º ano · notas inteiras de {minimo} a {max}
            </p>
          </div>
          <button
            type='button'
            onClick={fechar}
            className='rounded-md p-1 opacity-60 hover:bg-(--soft) hover:opacity-100'
          >
            <Icons.close className='size-4' />
          </button>
        </div>

        <div className='grid max-h-[55vh] gap-2 overflow-auto sm:grid-cols-2'>
          {ano.disciplinas.map((d, k) => {
            const v = valores[d];
            const erro = v !== undefined && v !== '' && !valida(v);
            return (
              <label
                key={d}
                className='flex items-center justify-between gap-3 rounded-lg bg-(--soft)/50 px-3 py-2 text-sm'
              >
                <span className='truncate'>{d}</span>
                <input
                  autoFocus={k === 0}
                  inputMode='numeric'
                  value={v ?? ''}
                  onChange={(e) => setValores((x) => ({ ...x, [d]: e.target.value.trim() }))}
                  className={cn(
                    'w-14 rounded-md border bg-(--surface,white) px-2 py-1 text-center font-bold outline-none',
                    erro ? 'border-red-400 text-red-600' : 'border-(--line) focus:border-(--accent)',
                    valida(v) && !positivaE(ano.escala, +v!) && 'text-red-600'
                  )}
                />
              </label>
            );
          })}
        </div>

        <div className='flex items-center justify-between gap-2 pt-1'>
          <span className='text-xs opacity-60'>
            {ano.disciplinas.filter((d) => valida(valores[d])).length} de {ano.disciplinas.length} disciplinas
          </span>
          <div className='flex gap-2'>
            <button type='button' className={cn(btn, inativo)} onClick={fechar}>
              Cancelar
            </button>
            <button type='submit' disabled={!tudoValido} className={cn(btn, ativo, 'disabled:opacity-40')}>
              Lançar notas
            </button>
          </div>
        </div>
      </form>
    </div>,
    document.getElementById('lousa-raiz') ?? document.body
  );
}

export default function FichaAluno() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const a = getAluno(id);
  const [vista, setVista] = useState<{ id: string; qual: 'avaliacoes' } | null>(null);
  const [novas, setNovas] = useState<Record<string, Av[]>>({}); // avaliações registadas nesta sessão (mock)
  const detalhe = useRef<HTMLDivElement>(null);
  const [guardado, lancar, iniciarAno] = useNotasGuardadas(id, a?.anoLetivo ?? '');
  if (!a) notFound();
  const [removidas, setRemovidas] = useState<Record<string, string[]>>({}); // eliminadas nesta sessão (mock)
  const avs = [...(novas[a.id] ?? []), ...a.avaliacoes]
    .filter((x) => !(removidas[a.id] ?? []).includes(chave(x)))
    .sort((x, y) => y.data.localeCompare(x.data));
  const eliminar = (x: Av) => {
    const id = a.id;
    setRemovidas((r) => ({ ...r, [id]: [...(r[id] ?? []), chave(x)] }));
    toast(`Avaliação de ${x.disciplina} eliminada`, {
      action: {
        label: 'Anular',
        onClick: () => setRemovidas((r) => ({ ...r, [id]: (r[id] ?? []).filter((c) => c !== chave(x)) }))
      }
    });
  };
  const qual = vista?.id === a.id ? vista.qual : null; // volta à ficha ao mudar de aluno
  const mudarVista = (q: 'avaliacoes' | null) => {
    setVista(q && { id: a.id, qual: q });
    detalhe.current?.scrollTo({ top: 0 });
  };

  const i = alunos.findIndex((x) => x.id === a.id);
  const anterior = alunos[(i - 1 + alunos.length) % alunos.length];
  const seguinte = alunos[(i + 1) % alunos.length];
  const max = notaMax(a);
  const totalFaltas = a.faltasJust + a.faltasInjust;
  // painel lateral: último período lançado (do ano mais recente que já tenha notas)
  const anos = anosDoAluno(a, guardado);
  const anoComNotas = [...anos].reverse().find((x) => x.periodos.length > 0)!;
  const ultimo = anoComNotas.periodos[anoComNotas.periodos.length - 1];
  const { media, negativas } = resumo(anoComNotas.escala, ultimo.notas);
  const maxMedia = maxDe(anoComNotas.escala);

  const atividade = atividadeDe(a);

  return (
    <main className={cn(card, 'flex min-w-0 flex-1 overflow-hidden')}>
      {/* Coluna do aluno */}
      <aside className='hidden w-80 shrink-0 flex-col gap-6 overflow-auto bg-[color-mix(in_srgb,var(--rail)_86%,var(--dot))] p-6 text-(--dot) lg:flex'>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={a.foto}
            alt={a.nome}
            className='size-24 rounded-2xl object-cover shadow-lg ring-4 ring-(--dot)/20'
          />
          <h1 className='mt-4 text-2xl leading-tight font-extrabold'>{a.nome}</h1>
          <div className='mt-1 text-sm opacity-70'>
            {a.turma} · n.º {a.numero} · {a.idade} anos
          </div>
        </div>

        <div className='space-y-2.5'>
          <Linha icon={Icons.send}>{a.email}</Linha>
          <Linha icon={Icons.phone}>{a.telefone}</Linha>
          <Linha icon={Icons.calendar}>Nasceu a {dataPt(a.nascimento)}</Linha>
          <Linha icon={Icons.page}>
            {a.morada}, {a.codigoPostal} {a.localidade}
          </Linha>
        </div>

        <Encarregados key={a.id} ees={a.ees} />

        <div>
          <h2 className='mb-2 text-sm font-bold'>Média e assiduidade</h2>
          <div className='grid grid-cols-2 gap-2 text-center'>
            <div className='rounded-xl bg-(--dot)/10 p-3'>
              <div className='text-2xl font-extrabold'>{media.toLocaleString('pt-PT')}</div>
              <div className='text-[11px] opacity-70'>
                média /{maxMedia} · {ultimo.periodo.replace(' período', ' per.')} {curto(anoComNotas.anoLetivo)}
              </div>
            </div>
            <div className='rounded-xl bg-(--dot)/10 p-3'>
              <div className='text-2xl font-extrabold'>{negativas}</div>
              <div className='text-[11px] opacity-70'>negativas</div>
            </div>
            <div className='col-span-2 rounded-xl bg-(--dot)/10 p-3'>
              <div className='text-2xl font-extrabold'>{totalFaltas}</div>
              <div className='text-[11px] opacity-70'>
                faltas · {a.faltasJust} justificadas, {a.faltasInjust} injustificadas
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Detalhe */}
      <div ref={detalhe} className='min-w-0 flex-1 space-y-7 overflow-auto p-6'>
        {/* barra de topo: escondida nas vistas completas (têm o seu próprio cabeçalho) */}
        {!qual && (
          <div className='flex flex-wrap items-center justify-between gap-3'>
            <div className='flex items-center gap-2'>
              <Link href='/alunos' className={cn(btn, inativo, 'flex items-center gap-1 px-3')}>
                <Icons.chevronLeft className='size-4' /> Os meus alunos
              </Link>
              <div className='flex items-center rounded-lg border border-(--line)'>
                <Link href={`/alunos/${anterior.id}`} title={anterior.nome} className='p-1.5 hover:bg-(--soft)'>
                  <Icons.chevronLeft className='size-4' />
                </Link>
                <span className='px-1 text-xs opacity-60'>
                  {i + 1} de {alunos.length}
                </span>
                <Link href={`/alunos/${seguinte.id}`} title={seguinte.nome} className='p-1.5 hover:bg-(--soft)'>
                  <Icons.chevronRight className='size-4' />
                </Link>
              </div>
            </div>
            <div className='flex gap-2'>
              <button className={cn(btn, ativo, 'flex items-center gap-1.5')} onClick={() => router.push('/mensagens')}>
                <Icons.chat className='size-4' /> Mensagem ao EE
              </button>
              <button className={cn(btn, inativo)} onClick={() => toast('Edição em breve (mock)')}>
                Editar
              </button>
            </div>
          </div>
        )}

        {/* versão compacta do cabeçalho em ecrãs pequenos */}
        <div className='flex items-center gap-3 lg:hidden'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={a.foto} alt='' className='size-14 rounded-xl object-cover' />
          <div>
            <div className='text-xl font-extrabold'>{a.nome}</div>
            <div className='text-xs opacity-60'>{a.turma}</div>
          </div>
        </div>

        {qual === 'avaliacoes' ? (
          <TodasAvaliacoes
            key={a.id}
            a={a}
            avs={avs}
            eliminar={eliminar}
            voltar={() => mudarVista(null)}
            registar={(x) => {
              setNovas((n) => ({ ...n, [a.id]: [x, ...(n[a.id] ?? [])] }));
              toast(`Avaliação de ${x.disciplina} registada`);
            }}
          />
        ) : (
          <div className='space-y-7' style={{ animation: 'aula-in 300ms ease-out' }}>
            <Secao titulo='Dados escolares'>
              <div className='grid gap-3 md:grid-cols-2'>
                <div className='rounded-xl border border-(--line) p-4'>
                  <div className='text-xs opacity-60'>Número de processo</div>
                  <div className='mb-3 text-xl font-extrabold tracking-wide'>{a.processo}</div>
                  <div className='space-y-1'>
                    <Campo label='Ano e turma' valor={`${a.ano}.º ano · ${a.turma}`} />
                    <Campo label='Curso' valor={a.curso} />
                    <Campo
                      label='Matrícula'
                      valor={
                        <>
                          <span className='mr-1 rounded bg-emerald-100 px-1.5 py-0.5 text-emerald-800'>{a.estado}</span>
                          desde {dataPt(a.dataMatricula)}
                        </>
                      }
                    />
                  </div>
                </div>
                <div className='rounded-xl border border-(--line) p-4'>
                  <div className='text-xs opacity-60'>Escola</div>
                  <div className='mb-3 text-xl font-extrabold'>{a.escola}</div>
                  <div className='space-y-1'>
                    <Campo label='Ano letivo' valor={a.anoLetivo} />
                    <Campo label='Diretor de turma' valor={a.diretorTurma.nome} />
                    <Campo label='Contacto DT' valor={a.diretorTurma.email} />
                  </div>
                </div>
              </div>
            </Secao>

            <NotasAnos key={a.id} a={a} anos={anos} lancar={lancar} iniciarAno={iniciarAno} />

            <Avaliacoes a={a} avs={avs} eliminar={eliminar} verTodas={() => mudarVista('avaliacoes')} />

            <Secao titulo='Observações'>
              <p className='rounded-xl bg-(--soft) p-4 text-sm'>{a.observacoes}</p>
            </Secao>

            <Secao titulo='Calendário' acao={<span className='text-xs opacity-60'>Sessões de explicação e apoio</span>}>
              <CalendarioSessoes key={a.id} sessoes={atividade} />
            </Secao>
          </div>
        )}
      </div>
      <style>{`@keyframes aula-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes linha-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@keyframes linha-out { to { opacity: 0; transform: translateX(-12px); } }
@keyframes mes-in { from { opacity: 0; transform: translateX(var(--dx)); } to { opacity: 1; transform: none; } }
@keyframes barra-in { from { transform: scaleX(0); } to { transform: none; } }
@keyframes dia-in { from { opacity: 0; transform: translateY(8px) scale(0.97); } to { opacity: 1; transform: none; } }`}</style>
    </main>
  );
}
