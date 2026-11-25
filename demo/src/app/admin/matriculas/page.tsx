'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { toast } from 'sonner';
import { cn } from '@/components/lib/utils';
import { Icons } from '@/components/icons';
import { ativo, btn, inativo, PageCard } from '../../shell';
import { dataPt, iniciais } from '../../alunos/_data';
import { type EE, type Matricula, eesExistentes, horasMes, matriculasExistentes, precoMensal } from './_data';

const anos = [9, 10, 11, 12];
const campo =
  'w-full rounded-lg border border-(--line) bg-(--surface,white) px-3 py-2 text-sm outline-none focus:border-(--accent)';

// Associa a matrícula a um EE já existente (irmãos) ou regista um novo
function PassoEE({ ee, setEe, eeInicial }: { ee: EE | null; setEe: (ee: EE | null) => void; eeInicial?: EE | null }) {
  const jaExiste = !!eeInicial && eesExistentes.some((e) => e.email === eeInicial.email);
  const [modo, setModo] = useState<'existente' | 'novo'>(eeInicial && !jaExiste ? 'novo' : 'existente');
  const [q, setQ] = useState(eeInicial && jaExiste ? eeInicial.nome : '');
  const [nome, setNome] = useState(eeInicial && !jaExiste ? eeInicial.nome : '');
  const [parentesco, setParentesco] = useState(eeInicial && !jaExiste ? eeInicial.parentesco : '');
  const [email, setEmail] = useState(eeInicial && !jaExiste ? eeInicial.email : '');
  const [telefone, setTelefone] = useState(eeInicial && !jaExiste ? eeInicial.telefone : '');

  // ao escrever um EE novo, propaga de imediato para o formulário principal
  useEffect(() => {
    if (modo === 'novo') setEe(nome && parentesco && email && telefone ? { nome, parentesco, email, telefone } : null);
  }, [modo, nome, parentesco, email, telefone, setEe]);

  const filtrados = eesExistentes.filter(
    (e) => e.nome.toLowerCase().includes(q.toLowerCase()) || e.email.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className='space-y-2.5'>
      <div className='flex gap-2'>
        <button
          type='button'
          className={cn(btn, modo === 'existente' ? ativo : inativo)}
          onClick={() => {
            setModo('existente');
            setEe(null);
          }}
        >
          Associar EE existente
        </button>
        <button
          type='button'
          className={cn(btn, modo === 'novo' ? ativo : inativo)}
          onClick={() => {
            setModo('novo');
            setEe(null);
          }}
        >
          Criar novo EE
        </button>
      </div>

      {modo === 'existente' ? (
        <div className='space-y-2'>
          <input
            placeholder='Pesquisar por nome ou email… (para associar irmãos)'
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className={campo}
          />
          <div className='max-h-36 space-y-1 overflow-auto rounded-lg border border-(--line) p-1.5'>
            {filtrados.slice(0, 20).map((e) => (
              <button
                key={e.email}
                type='button'
                onClick={() => setEe(e)}
                className={cn(
                  'flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-xs transition hover:bg-(--soft)',
                  ee?.email === e.email && 'bg-(--accent)/10 ring-1 ring-(--accent)'
                )}
              >
                <span className='min-w-0 truncate'>
                  <span className='font-semibold'>{e.nome}</span>{' '}
                  <span className='opacity-60'>· {e.parentesco} de {e.alunos.join(', ')}</span>
                </span>
                {ee?.email === e.email && <Icons.check className='size-3.5 shrink-0 text-(--accent)' />}
              </button>
            ))}
            {filtrados.length === 0 && <p className='px-2 py-3 text-center text-xs opacity-60'>Sem resultados.</p>}
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-2 gap-3'>
          <label className='block space-y-1 text-xs font-medium'>
            Nome
            <input className={campo} value={nome} onChange={(e) => setNome(e.target.value)} />
          </label>
          <label className='block space-y-1 text-xs font-medium'>
            Parentesco
            <input placeholder='ex.: Mãe, Pai, Tio' className={campo} value={parentesco} onChange={(e) => setParentesco(e.target.value)} />
          </label>
          <label className='block space-y-1 text-xs font-medium'>
            Email
            <input type='email' className={campo} value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className='block space-y-1 text-xs font-medium'>
            Telefone
            <input className={campo} value={telefone} onChange={(e) => setTelefone(e.target.value)} />
          </label>
        </div>
      )}
    </div>
  );
}

function FormularioMatricula({
  inicial,
  fechar,
  guardar
}: {
  inicial: Matricula | null;
  fechar: () => void;
  guardar: (m: Matricula) => void;
}) {
  const [nome, setNome] = useState(inicial?.nome ?? '');
  const [nascimento, setNascimento] = useState(inicial?.nascimento ?? '');
  const [ano, setAno] = useState(inicial?.ano ?? 9);
  const [turma, setTurma] = useState(inicial && inicial.turma !== '—' ? inicial.turma : '');
  const [contacto, setContacto] = useState(inicial?.contacto ?? '');
  const [ee, setEe] = useState<EE | null>(inicial?.ees[0] ?? null);
  const base = { id: nome || 'nova-matricula', ano };
  const [horas, setHoras] = useState(inicial?.horasMes ?? horasMes(base));
  const [preco, setPreco] = useState(inicial?.precoMensal ?? precoMensal(base));

  const valida = nome.trim() !== '' && nascimento !== '' && ee !== null && horas > 0 && preco > 0;

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
          if (!valida || !ee) return;
          guardar({
            id: inicial?.id ?? `MAT${Date.now()}`,
            nome: nome.trim(),
            nascimento,
            ano,
            turma: turma.trim() || '—',
            contacto: contacto.trim(),
            ees: [ee],
            horasMes: horas,
            precoMensal: preco,
            criadaEm: inicial?.criadaEm ?? new Date().toISOString().slice(0, 10),
            alunoId: inicial?.alunoId
          });
        }}
        className='max-h-[85vh] w-full max-w-lg space-y-5 overflow-auto rounded-2xl bg-(--surface,white) p-6 shadow-2xl'
      >
        <div className='flex items-start justify-between'>
          <div>
            <h3 className='text-lg font-bold'>{inicial ? 'Editar matrícula' : 'Nova matrícula'}</h3>
            <p className='text-xs opacity-60'>Ficha do aluno, encarregado de educação e mensalidade</p>
          </div>
          <button type='button' onClick={fechar} className='rounded-md p-1 opacity-60 hover:bg-(--soft) hover:opacity-100'>
            <Icons.close className='size-4' />
          </button>
        </div>

        <section className='space-y-3'>
          <h4 className='text-xs font-semibold tracking-wide uppercase opacity-60'>Ficha do aluno</h4>
          <label className='block space-y-1 text-xs font-medium'>
            Nome
            <input autoFocus className={campo} value={nome} onChange={(e) => setNome(e.target.value)} />
          </label>
          <div className='grid grid-cols-2 gap-3'>
            <label className='block space-y-1 text-xs font-medium'>
              Data de nascimento
              <input type='date' className={campo} value={nascimento} onChange={(e) => setNascimento(e.target.value)} />
            </label>
            <label className='block space-y-1 text-xs font-medium'>
              Ano
              <select className={campo} value={ano} onChange={(e) => setAno(Number(e.target.value))}>
                {anos.map((n) => (
                  <option key={n} value={n}>
                    {n}.º ano
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <label className='block space-y-1 text-xs font-medium'>
              Turma (opcional)
              <input className={campo} value={turma} onChange={(e) => setTurma(e.target.value)} />
            </label>
            <label className='block space-y-1 text-xs font-medium'>
              Contacto do aluno (opcional)
              <input placeholder='email ou telefone' className={campo} value={contacto} onChange={(e) => setContacto(e.target.value)} />
            </label>
          </div>
        </section>

        <section className='space-y-3'>
          <h4 className='text-xs font-semibold tracking-wide uppercase opacity-60'>Encarregado de educação</h4>
          <PassoEE ee={ee} setEe={setEe} eeInicial={inicial?.ees[0] ?? null} />
        </section>

        <section className='space-y-3'>
          <h4 className='text-xs font-semibold tracking-wide uppercase opacity-60'>Mensalidade</h4>
          <div className='grid grid-cols-2 gap-3'>
            <label className='block space-y-1 text-xs font-medium'>
              Horas/mês
              <input
                type='number'
                min={1}
                className={campo}
                value={horas}
                onChange={(e) => setHoras(Math.max(1, Number(e.target.value)))}
              />
            </label>
            <label className='block space-y-1 text-xs font-medium'>
              Preço mensal (€)
              <input
                type='number'
                min={1}
                className={campo}
                value={preco}
                onChange={(e) => setPreco(Math.max(1, Number(e.target.value)))}
              />
            </label>
          </div>
        </section>

        <div className='flex justify-end gap-2 pt-1'>
          <button type='button' className={cn(btn, inativo)} onClick={fechar}>
            Cancelar
          </button>
          <button type='submit' disabled={!valida} className={cn(btn, ativo, 'disabled:opacity-40')}>
            {inicial ? 'Guardar' : 'Matricular'}
          </button>
        </div>
      </form>
    </div>,
    document.getElementById('lousa-raiz') ?? document.body
  );
}

const euro = (v: number) => v.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

function Estatistica({ label, valor }: { label: string; valor: string }) {
  return (
    <div className='rounded-xl border border-(--line) p-4'>
      <div className='text-xs opacity-60'>{label}</div>
      <div className='text-2xl font-extrabold'>{valor}</div>
    </div>
  );
}

export default function MatriculasPage() {
  // matrículas criadas ou editadas nesta sessão (função dev, sem backend), por id
  const [extra, setExtra] = useState<Record<string, Matricula>>({});
  const [q, setQ] = useState('');
  const [formAberto, setFormAberto] = useState<'nova' | Matricula | null>(null);
  const router = useRouter();

  const idsExistentes = useMemo(() => new Set(matriculasExistentes.map((m) => m.id)), []);
  const novas = Object.values(extra)
    .filter((m) => !idsExistentes.has(m.id))
    .sort((a, b) => b.criadaEm.localeCompare(a.criadaEm));
  const existentes = matriculasExistentes.map((m) => extra[m.id] ?? m);
  const todas = [...novas, ...existentes];

  const lista = todas.filter(
    (m) =>
      m.nome.toLowerCase().includes(q.toLowerCase()) ||
      m.ees.some((e) => e.nome.toLowerCase().includes(q.toLowerCase()))
  );
  const mensalidadeTotal = lista.reduce((s, m) => s + m.precoMensal, 0);
  const horasMedia = lista.length ? lista.reduce((s, m) => s + m.horasMes, 0) / lista.length : 0;

  return (
    <PageCard
      titulo='Matrículas'
      acoes={
        <button className={cn(btn, ativo, 'flex items-center gap-1.5')} onClick={() => setFormAberto('nova')}>
          <Icons.add className='size-4' /> Nova matrícula
        </button>
      }
    >
      <div className='flex flex-wrap items-center justify-between gap-3 border-y border-(--line) bg-(--soft)/50 px-6 py-4'>
        <input
          placeholder='Pesquisar aluno ou EE…'
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className='w-64 rounded-lg border border-(--line) bg-white px-3 py-1.5 text-sm outline-none focus:border-(--accent)'
        />
        <span className='text-xs opacity-60'>{lista.length} matrículas</span>
      </div>

      <div className='flex-1 space-y-4 overflow-auto p-4'>
        <div className='grid grid-cols-3 gap-3'>
          <Estatistica label='Matrículas' valor={String(lista.length)} />
          <Estatistica label='Mensalidade total' valor={euro(mensalidadeTotal)} />
          <Estatistica label='Horas/mês em média' valor={horasMedia.toLocaleString('pt-PT', { maximumFractionDigits: 1 })} />
        </div>

        <div className='overflow-hidden rounded-xl border border-(--line)'>
          <table className='w-full text-sm'>
            <thead className='bg-(--soft)/60 text-left text-xs opacity-70'>
              <tr>
                <th className='px-4 py-2.5 font-medium'>Aluno</th>
                <th className='font-medium'>Nascimento</th>
                <th className='font-medium'>Turma</th>
                <th className='font-medium'>Encarregado de educação</th>
                <th className='font-medium'>Contacto</th>
                <th className='font-medium text-right'>Mensalidade</th>
                <th className='w-16 pr-4' />
              </tr>
            </thead>
            <tbody>
              {lista.map((m) => (
                <tr
                  key={m.id}
                  // matrículas com ficha abrem a página do aluno
                  onClick={() => m.alunoId && router.push(`/alunos/${m.alunoId}`)}
                  title={m.alunoId ? `Abrir ficha de ${m.nome}` : undefined}
                  className={cn('border-t border-(--line) transition-colors hover:bg-(--soft)/40', m.alunoId && 'cursor-pointer')}
                >
                  <td className='px-4 py-3'>
                    <div className='flex items-center gap-2.5'>
                      <span className='flex size-8 shrink-0 items-center justify-center rounded-full bg-(--dot)/15 text-xs font-bold'>
                        {iniciais(m.nome)}
                      </span>
                      <div className='min-w-0'>
                        <div className='flex items-center gap-1.5'>
                          <span className='truncate font-semibold'>{m.nome}</span>
                          {!m.alunoId && (
                            <span className='shrink-0 rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800'>
                              Nova
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='whitespace-nowrap'>{dataPt(m.nascimento)}</td>
                  <td className='whitespace-nowrap'>
                    {m.ano}.º {m.turma}
                  </td>
                  <td>
                    {m.ees.map((e) => (
                      <div key={e.email} className='flex flex-wrap items-center gap-1.5 whitespace-nowrap py-0.5'>
                        <span>{e.nome}</span>
                        <span className='rounded-md bg-(--dot)/10 px-1.5 py-0.5 text-[10px] font-medium opacity-70'>
                          {e.parentesco}
                        </span>
                      </div>
                    ))}
                  </td>
                  <td className='text-xs whitespace-nowrap opacity-70'>{m.contacto || m.ees[0]?.telefone}</td>
                  <td className='text-right whitespace-nowrap'>
                    <div className='font-semibold'>{euro(m.precoMensal)}</div>
                    <div className='text-[11px] opacity-60'>{m.horasMes}h/mês</div>
                  </td>
                  <td className='pr-4'>
                    <div className='flex items-center justify-end gap-1'>
                      <button
                        title='Editar matrícula'
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormAberto(m);
                        }}
                        className='rounded-md p-1.5 opacity-60 hover:bg-(--soft) hover:opacity-100'
                      >
                        <Icons.edit className='size-4' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {lista.length === 0 && <p className='p-6 text-sm opacity-60'>Sem resultados.</p>}
        </div>
      </div>

      {formAberto && (
        <FormularioMatricula
          inicial={formAberto === 'nova' ? null : formAberto}
          fechar={() => setFormAberto(null)}
          guardar={(m) => {
            setExtra((ex) => ({ ...ex, [m.id]: m }));
            toast(formAberto === 'nova' ? `Matrícula de ${m.nome} criada` : `Matrícula de ${m.nome} atualizada`);
            setFormAberto(null);
          }}
        />
      )}
    </PageCard>
  );
}
