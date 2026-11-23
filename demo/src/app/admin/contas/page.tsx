'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'sonner';
import { cn } from '@/components/lib/utils';
import { Icons } from '@/components/icons';
import { ativo, btn, inativo, PageCard } from '../../shell';
import { iniciais } from '../../alunos/_data';
import { type Conta, type Papel, contasIniciais } from './_data';

const todosPapeis: Papel[] = ['Admin', 'Tutor'];
const campo =
  'w-full rounded-lg border border-(--line) bg-(--surface,white) px-3 py-2 text-sm outline-none focus:border-(--accent)';

function Estatistica({ label, valor }: { label: string; valor: string }) {
  return (
    <div className='rounded-xl border border-(--line) p-4'>
      <div className='text-xs opacity-60'>{label}</div>
      <div className='text-2xl font-extrabold'>{valor}</div>
    </div>
  );
}

function Badge({ papel }: { papel: Papel }) {
  return (
    <span
      className={cn(
        'rounded-md px-1.5 py-0.5 text-[11px] font-bold',
        papel === 'Admin' ? 'bg-(--accent)/15 text-(--accent)' : 'bg-(--dot)/15 text-(--ink)'
      )}
    >
      {papel}
    </span>
  );
}

// Criar ou editar uma conta (admin/tutor, pode ter vários papéis)
function FormularioConta({
  inicial,
  fechar,
  guardar
}: {
  inicial: Conta | null;
  fechar: () => void;
  guardar: (c: Omit<Conta, 'id' | 'criadaEm'>) => void;
}) {
  const [nome, setNome] = useState(inicial?.nome ?? '');
  const [email, setEmail] = useState(inicial?.email ?? '');
  const [telefone, setTelefone] = useState(inicial?.telefone ?? '');
  const [papeis, setPapeis] = useState<Papel[]>(inicial?.papeis ?? ['Tutor']);
  const [ativa, setAtiva] = useState(inicial?.ativa ?? true);

  const togglePapel = (p: Papel) =>
    setPapeis((ps) => (ps.includes(p) ? ps.filter((x) => x !== p) : [...ps, p]));

  const valida = nome.trim() !== '' && email.trim() !== '' && papeis.length > 0;

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
          if (valida) guardar({ nome: nome.trim(), email: email.trim(), telefone: telefone.trim(), papeis, ativa });
        }}
        className='w-full max-w-md space-y-4 rounded-2xl bg-(--surface,white) p-6 shadow-2xl'
      >
        <div className='flex items-start justify-between'>
          <div>
            <h3 className='text-lg font-bold'>{inicial ? 'Editar conta' : 'Nova conta'}</h3>
            <p className='text-xs opacity-60'>Contas de admin e tutor · permissões por papel</p>
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
          Nome
          <input autoFocus className={campo} value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        <div className='grid grid-cols-2 gap-3'>
          <label className='block space-y-1 text-xs font-medium'>
            Email
            <input type='email' className={campo} value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className='block space-y-1 text-xs font-medium'>
            Telefone
            <input className={campo} value={telefone} onChange={(e) => setTelefone(e.target.value)} />
          </label>
        </div>

        <div className='space-y-1.5'>
          <span className='block text-xs font-medium'>Papéis (uma conta pode ter vários)</span>
          <div className='flex gap-2'>
            {todosPapeis.map((p) => (
              <button
                key={p}
                type='button'
                onClick={() => togglePapel(p)}
                className={cn(btn, papeis.includes(p) ? ativo : inativo)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <label className='flex cursor-pointer items-center gap-2 text-xs font-medium'>
          <input type='checkbox' checked={ativa} onChange={(e) => setAtiva(e.target.checked)} className='size-4' />
          Conta ativa
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

function ConfirmarEliminar({ conta, fechar, confirmar }: { conta: Conta; fechar: () => void; confirmar: () => void }) {
  return createPortal(
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4'
      style={{ animation: 'aula-in 200ms ease-out' }}
      onClick={fechar}
    >
      <div onClick={(e) => e.stopPropagation()} className='w-full max-w-sm space-y-4 rounded-2xl bg-(--surface,white) p-6 shadow-2xl'>
        <h3 className='text-lg font-bold'>Eliminar conta?</h3>
        <p className='text-sm opacity-70'>
          A conta de <span className='font-semibold'>{conta.nome}</span> vai deixar de ter acesso à plataforma.
        </p>
        <div className='flex justify-end gap-2 pt-1'>
          <button type='button' className={cn(btn, inativo)} onClick={fechar}>
            Cancelar
          </button>
          <button
            type='button'
            className={cn(btn, 'border-red-200 bg-red-600 text-white hover:bg-red-700')}
            onClick={confirmar}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('lousa-raiz') ?? document.body
  );
}

export default function ContasPage() {
  const [contas, setContas] = useState(contasIniciais);
  const [q, setQ] = useState('');
  const [filtro, setFiltro] = useState<Papel | null>(null);
  const [aEditar, setAEditar] = useState<Conta | null>(null);
  const [aCriar, setACriar] = useState(false);
  const [aEliminar, setAEliminar] = useState<Conta | null>(null);

  const lista = contas.filter(
    (c) =>
      (c.nome.toLowerCase().includes(q.toLowerCase()) || c.email.toLowerCase().includes(q.toLowerCase())) &&
      (!filtro || c.papeis.includes(filtro))
  );
  const admins = lista.filter((c) => c.papeis.includes('Admin')).length;
  const tutores = lista.filter((c) => c.papeis.includes('Tutor')).length;
  const inativas = lista.filter((c) => !c.ativa).length;

  return (
    <PageCard
      titulo='Gestão de contas'
      acoes={
        <button className={cn(btn, ativo, 'flex items-center gap-1.5')} onClick={() => setACriar(true)}>
          <Icons.add className='size-4' /> Nova conta
        </button>
      }
    >
      <div className='flex flex-wrap items-center justify-between gap-3 border-y border-(--line) bg-(--soft)/50 px-6 py-4'>
        <input
          placeholder='Pesquisar conta…'
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className='w-64 rounded-lg border border-(--line) bg-white px-3 py-1.5 text-sm outline-none focus:border-(--accent)'
        />
        <div className='flex flex-wrap items-center gap-2'>
          <span className='text-xs opacity-60'>{lista.length} contas</span>
          {todosPapeis.map((p) => (
            <button key={p} className={cn(btn, filtro === p ? ativo : inativo)} onClick={() => setFiltro(filtro === p ? null : p)}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className='flex-1 space-y-4 overflow-auto p-4'>
        <div className='grid grid-cols-2 gap-3 lg:grid-cols-4'>
          <Estatistica label='Contas' valor={String(lista.length)} />
          <Estatistica label='Admin' valor={String(admins)} />
          <Estatistica label='Tutor' valor={String(tutores)} />
          <Estatistica label='Inativas' valor={String(inativas)} />
        </div>

        <div className='grid content-start gap-3 sm:grid-cols-2 xl:grid-cols-3'>
          {lista.map((c) => (
            <div
              key={c.id}
              className={cn(
                'flex items-start gap-3 rounded-xl border border-(--line) p-3 transition hover:border-(--accent) hover:shadow-md',
                !c.ativa && 'opacity-70'
              )}
            >
              <span className='flex size-11 shrink-0 items-center justify-center rounded-full bg-(--dot)/15 text-sm font-bold ring-2 ring-(--soft)'>
                {iniciais(c.nome)}
              </span>
              <div className='min-w-0 flex-1'>
                <div className='flex items-center gap-1.5'>
                  <span className='truncate font-semibold'>{c.nome}</span>
                  {!c.ativa && (
                    <span className='shrink-0 rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800'>
                      Inativa
                    </span>
                  )}
                </div>
                <div className='truncate text-xs opacity-60'>{c.email}</div>
                <div className='truncate text-xs opacity-60'>{c.telefone}</div>
                <div className='mt-1.5 flex gap-1.5'>
                  {c.papeis.map((p) => (
                    <Badge key={p} papel={p} />
                  ))}
                </div>
              </div>
              <div className='flex shrink-0 gap-1'>
                <button
                  title='Editar'
                  onClick={() => setAEditar(c)}
                  className='rounded-md p-1.5 opacity-60 hover:bg-(--soft) hover:opacity-100'
                >
                  <Icons.edit className='size-4' />
                </button>
                <button
                  title='Eliminar'
                  onClick={() => setAEliminar(c)}
                  className='rounded-md p-1.5 opacity-60 hover:bg-red-50 hover:text-red-600 hover:opacity-100'
                >
                  <Icons.trash className='size-4' />
                </button>
              </div>
            </div>
          ))}
          {lista.length === 0 && <p className='p-6 text-sm opacity-60'>Sem resultados.</p>}
        </div>
      </div>

      {aCriar && (
        <FormularioConta
          inicial={null}
          fechar={() => setACriar(false)}
          guardar={(c) => {
            setContas((cs) => [{ ...c, id: `CNT${String(cs.length + 1).padStart(3, '0')}`, criadaEm: new Date().toISOString().slice(0, 10) }, ...cs]);
            toast(`Conta de ${c.nome} criada`);
            setACriar(false);
          }}
        />
      )}
      {aEditar && (
        <FormularioConta
          inicial={aEditar}
          fechar={() => setAEditar(null)}
          guardar={(c) => {
            setContas((cs) => cs.map((x) => (x.id === aEditar.id ? { ...x, ...c } : x)));
            toast(`Conta de ${c.nome} atualizada`);
            setAEditar(null);
          }}
        />
      )}
      {aEliminar && (
        <ConfirmarEliminar
          conta={aEliminar}
          fechar={() => setAEliminar(null)}
          confirmar={() => {
            setContas((cs) => cs.filter((x) => x.id !== aEliminar.id));
            toast(`Conta de ${aEliminar.nome} eliminada`);
            setAEliminar(null);
          }}
        />
      )}
    </PageCard>
  );
}
