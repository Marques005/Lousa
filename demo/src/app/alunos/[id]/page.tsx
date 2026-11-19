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

function TabelaAvaliacoes({ a, itens }: { a: Aluno; itens: Av[] }) {
  const { ok, fmt } = escalaAv(a);
  return (
    <table className='w-full text-sm'>
      <thead className='bg-(--soft)/60 text-left text-xs opacity-70'>
        <tr>
          <th className='w-36 px-4 py-2 font-medium'>Data</th>
          <th className='font-medium'>Disciplina</th>
          <th className='w-44 font-medium'>Tipo</th>
          <th className='w-24 pr-4 text-right font-medium'>Nota</th>
        </tr>
      </thead>
      <tbody>
        {itens.map((x, k) => (
          <tr
            key={`${x.data}-${x.disciplina}-${x.tipo}-${x.nota}`}
            className='border-t border-(--line)'
            // entrada em cascata, como se a tabela fosse "desenrolando"
            style={{ animation: `linha-in 420ms cubic-bezier(0.32,0.72,0,1) ${Math.min(k, 12) * 45}ms both` }}
          >
            <td className='px-4 py-2.5 whitespace-nowrap'>{dataPt(x.data)}</td>
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
function Avaliacoes({ a, avs, verTodas }: { a: Aluno; avs: Av[]; verTodas: () => void }) {
  return (
    <Secao
      titulo='Avaliações'
      acao={<span className='text-xs opacity-60'>Testes e trabalhos da escola · {escalaAv(a).rotulo}</span>}
    >
      <div className='overflow-hidden rounded-xl border border-(--line)'>
        <TabelaAvaliacoes a={a} itens={avs.slice(0, 3)} />
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
  registar
}: {
  a: Aluno;
  avs: Av[];
  voltar: () => void;
  registar: (x: Av) => void;
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
        <TabelaAvaliacoes a={a} itens={itens} />
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

export default function FichaAluno() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const a = getAluno(id);
  const [todasDe, setTodasDe] = useState<string | null>(null);
  const [novas, setNovas] = useState<Record<string, Av[]>>({}); // avaliações registadas nesta sessão (mock)
  const detalhe = useRef<HTMLDivElement>(null);
  if (!a) notFound();
  const avs = [...(novas[a.id] ?? []), ...a.avaliacoes].sort((x, y) => y.data.localeCompare(x.data));
  const todas = todasDe === a.id; // volta à ficha ao mudar de aluno
  const mudarVista = (id: string | null) => {
    setTodasDe(id);
    detalhe.current?.scrollTo({ top: 0 });
  };

  const i = alunos.findIndex((x) => x.id === a.id);
  const anterior = alunos[(i - 1 + alunos.length) % alunos.length];
  const seguinte = alunos[(i + 1) % alunos.length];
  const max = notaMax(a);
  const totalFaltas = a.faltasJust + a.faltasInjust;

  // atividade recente (mock): sessões no centro nas primeiras disciplinas do aluno
  const atividade = a.notas.slice(0, 4).map((n, k) => ({
    assunto: `Sessão de ${n.disciplina}`,
    tipo: k % 2 ? 'Apoio' : 'Explicação',
    data: dataPt(`2026-11-${String(18 - k * 2).padStart(2, '0')}`),
    estado: k === 0 ? 'Agendada' : 'Concluída'
  }));

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
              <div className='text-2xl font-extrabold'>{a.media.toLocaleString('pt-PT')}</div>
              <div className='text-[11px] opacity-70'>média /{max}</div>
            </div>
            <div className='rounded-xl bg-(--dot)/10 p-3'>
              <div className='text-2xl font-extrabold'>{a.negativas}</div>
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

        {/* versão compacta do cabeçalho em ecrãs pequenos */}
        <div className='flex items-center gap-3 lg:hidden'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={a.foto} alt='' className='size-14 rounded-xl object-cover' />
          <div>
            <div className='text-xl font-extrabold'>{a.nome}</div>
            <div className='text-xs opacity-60'>{a.turma}</div>
          </div>
        </div>

        {todas ? (
          <TodasAvaliacoes
            key={a.id}
            a={a}
            avs={avs}
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

            <Secao
              titulo='Notas'
              acao={
                <span className='text-xs opacity-60'>
                  {a.periodo} · escala {a.escala}
                </span>
              }
            >
              <div className='grid gap-x-8 gap-y-3 rounded-xl border border-(--line) p-4 md:grid-cols-2'>
                {a.notas.map((n) => {
                  const ok = positiva(a, n.nota);
                  return (
                    <div key={n.disciplina} className='flex items-center gap-3'>
                      <span className='w-40 shrink-0 truncate text-sm'>{n.disciplina}</span>
                      <div className='h-2 flex-1 overflow-hidden rounded-full bg-(--soft)'>
                        <div
                          className={cn('h-full rounded-full', ok ? 'bg-(--accent)' : 'bg-red-400')}
                          style={{ width: `${(n.nota / max) * 100}%` }}
                        />
                      </div>
                      <span className={cn('w-7 text-right text-sm font-bold', !ok && 'text-red-500')}>{n.nota}</span>
                    </div>
                  );
                })}
              </div>
            </Secao>

            <Avaliacoes a={a} avs={avs} verTodas={() => mudarVista(a.id)} />

            <Secao titulo='Observações'>
              <p className='rounded-xl bg-(--soft) p-4 text-sm'>{a.observacoes}</p>
            </Secao>

            <Secao titulo='Atividade no centro'>
              <div className='overflow-hidden rounded-xl border border-(--line)'>
                <table className='w-full text-sm'>
                  <thead className='bg-(--soft)/60 text-left text-xs opacity-70'>
                    <tr>
                      <th className='px-4 py-2 font-medium'>Assunto</th>
                      <th className='font-medium'>Tipo</th>
                      <th className='font-medium'>Data</th>
                      <th className='font-medium'>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {atividade.map((x) => (
                      <tr key={x.assunto} className='border-t border-(--line)'>
                        <td className='px-4 py-2.5'>{x.assunto}</td>
                        <td>{x.tipo}</td>
                        <td>{x.data}</td>
                        <td>
                          <span
                            className={cn(
                              'rounded-full px-2 py-0.5 text-xs font-medium',
                              x.estado === 'Agendada'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            )}
                          >
                            {x.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Secao>
          </div>
        )}
      </div>
      <style>{`@keyframes aula-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes linha-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }`}</style>
    </main>
  );
}
