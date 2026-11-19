'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
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
function PassoEE({ ee, setEe }: { ee: EE | null; setEe: (ee: EE | null) => void }) {
  const [modo, setModo] = useState<'existente' | 'novo'>('existente');
  const [q, setQ] = useState('');
  const [nome, setNome] = useState('');
  const [parentesco, setParentesco] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

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

function FormularioMatricula({ fechar, guardar }: { fechar: () => void; guardar: (m: Matricula) => void }) {
  const [nome, setNome] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [ano, setAno] = useState(9);
  const [turma, setTurma] = useState('');
  const [contacto, setContacto] = useState('');
  const [ee, setEe] = useState<EE | null>(null);
  const base = { id: nome || 'nova-matricula', ano };
  const [horas, setHoras] = useState(horasMes(base));
  const [preco, setPreco] = useState(precoMensal(base));

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
            id: `MAT${Date.now()}`,
            nome: nome.trim(),
            nascimento,
            ano,
            turma: turma.trim() || '—',
            contacto: contacto.trim(),
            ees: [ee],
            horasMes: horas,
            precoMensal: preco,
            criadaEm: new Date().toISOString().slice(0, 10)
          });
        }}
        className='max-h-[85vh] w-full max-w-lg space-y-5 overflow-auto rounded-2xl bg-(--surface,white) p-6 shadow-2xl'
      >
        <div className='flex items-start justify-between'>
          <div>
            <h3 className='text-lg font-bold'>Nova matrícula</h3>
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
          <PassoEE ee={ee} setEe={setEe} />
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
            Matricular
          </button>
        </div>
      </form>
    </div>,
    document.getElementById('lousa-raiz') ?? document.body
  );
}

export default function MatriculasPage() {
  const [novas, setNovas] = useState<Matricula[]>([]);
  const [q, setQ] = useState('');
  const [aMatricular, setAMatricular] = useState(false);
  const lista = [...novas, ...matriculasExistentes].filter(
    (m) =>
      m.nome.toLowerCase().includes(q.toLowerCase()) ||
      m.ees.some((e) => e.nome.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <PageCard
      titulo='Matrículas'
      acoes={
        <button className={cn(btn, ativo, 'flex items-center gap-1.5')} onClick={() => setAMatricular(true)}>
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

      <div className='flex-1 overflow-auto p-4'>
        <div className='overflow-hidden rounded-xl border border-(--line)'>
          <table className='w-full text-sm'>
            <thead className='bg-(--soft)/60 text-left text-xs opacity-70'>
              <tr>
                <th className='px-4 py-2 font-medium'>Aluno</th>
                <th className='font-medium'>Nascimento</th>
                <th className='font-medium'>Turma</th>
                <th className='font-medium'>Encarregado de educação</th>
                <th className='font-medium'>Contacto</th>
                <th className='font-medium'>Mensalidade</th>
                <th className='w-10' />
              </tr>
            </thead>
            <tbody>
              {lista.map((m) => (
                <tr key={m.id} className='border-t border-(--line)'>
                  <td className='px-4 py-2.5'>
                    <div className='flex items-center gap-2.5'>
                      <span className='flex size-8 shrink-0 items-center justify-center rounded-full bg-(--dot)/15 text-xs font-bold'>
                        {iniciais(m.nome)}
                      </span>
                      <div className='min-w-0'>
                        <div className='truncate font-semibold'>{m.nome}</div>
                        {!m.alunoId && (
                          <span className='rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800'>Nova</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className='whitespace-nowrap'>{dataPt(m.nascimento)}</td>
                  <td>{m.ano}.º {m.turma}</td>
                  <td>
                    {m.ees.map((e) => (
                      <div key={e.email} className='whitespace-nowrap'>
                        {e.nome} <span className='opacity-60'>· {e.parentesco}</span>
                      </div>
                    ))}
                  </td>
                  <td className='text-xs whitespace-nowrap opacity-70'>{m.contacto || m.ees[0]?.telefone}</td>
                  <td className='whitespace-nowrap'>
                    {m.precoMensal.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}
                    <span className='opacity-60'> · {m.horasMes}h/mês</span>
                  </td>
                  <td className='pr-4 text-right'>
                    {m.alunoId && (
                      <Link href={`/alunos/${m.alunoId}`} title='Ver ficha completa' className='opacity-60 hover:opacity-100'>
                        <Icons.chevronRight className='size-4' />
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {lista.length === 0 && <p className='p-6 text-sm opacity-60'>Sem resultados.</p>}
        </div>
      </div>

      {aMatricular && (
        <FormularioMatricula
          fechar={() => setAMatricular(false)}
          guardar={(m) => {
            setNovas((ms) => [m, ...ms]);
            toast(`Matrícula de ${m.nome} criada`);
            setAMatricular(false);
          }}
        />
      )}
    </PageCard>
  );
}
