'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/components/lib/utils';
import { PageCard, ativo, btn, inativo, tint, useDisc, useEscuro, txt } from '../shell';

const alunos = [
  { nome: 'Ana Silva', ano: '9.º', disc: 'Matemática', enc: 'Paula Silva', assid: 98 },
  { nome: 'João Costa', ano: '12.º', disc: 'Física', enc: 'Carlos Costa', assid: 81 },
  { nome: 'Marta Lopes', ano: '7.º', disc: 'Inglês', enc: 'Sofia Lopes', assid: 95 },
  { nome: 'Rui Pereira', ano: '11.º', disc: 'Matemática', enc: 'Luís Pereira', assid: 88 },
  { nome: 'Inês Martins', ano: '10.º', disc: 'Português', enc: 'Teresa Martins', assid: 100 },
  { nome: 'Tiago Rocha', ano: '8.º', disc: 'Inglês', enc: 'Miguel Rocha', assid: 76 },
  { nome: 'Beatriz Sousa', ano: '12.º', disc: 'Física', enc: 'Helena Sousa', assid: 92 },
  { nome: 'Diogo Nunes', ano: '9.º', disc: 'Português', enc: 'Rita Nunes', assid: 85 }
];

export default function AlunosPage() {
  const disc = useDisc();
  const escuro = useEscuro();
  const [q, setQ] = useState('');
  const [filtro, setFiltro] = useState<string | null>(null);
  const lista = alunos.filter(
    (a) => a.nome.toLowerCase().includes(q.toLowerCase()) && (!filtro || a.disc === filtro)
  );

  return (
    <PageCard
      titulo='Alunos'
      acoes={
        <button className={cn(btn, ativo)} onClick={() => toast.success('Aluno criado (mock)')}>
          + Novo aluno
        </button>
      }
    >
      <div className='flex flex-wrap items-center justify-between gap-3 border-y border-(--line) bg-(--soft)/50 px-6 py-4'>
        <input
          placeholder='Pesquisar aluno…'
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className='w-64 rounded-lg border border-(--line) bg-white px-3 py-1.5 text-sm outline-none focus:border-(--accent)'
        />
        <div className='flex flex-wrap gap-2'>
          {Object.keys(disc).map((d) => (
            <button
              key={d}
              className={cn(btn, filtro === d ? ativo : inativo)}
              onClick={() => setFiltro(filtro === d ? null : d)}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className='grid gap-3 overflow-auto p-4 sm:grid-cols-2 xl:grid-cols-3'>
        {lista.map((a) => {
          const [cor, texto] = disc[a.disc];
          return (
            <div
              key={a.nome}
              className='flex items-center gap-3 rounded-xl border border-(--line) p-3 transition hover:shadow-md'
            >
              <div
                style={{ background: tint(cor, 30), color: txt(texto, cor, escuro) }}
                className='flex size-11 shrink-0 items-center justify-center rounded-full font-bold'
              >
                {a.nome.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className='min-w-0 flex-1'>
                <div className='font-semibold'>{a.nome}</div>
                <div className='truncate text-xs opacity-70'>
                  {a.ano} ano · Enc.: {a.enc}
                </div>
                <div className='mt-1.5 h-1.5 rounded-full bg-(--soft)'>
                  <div
                    className='h-full rounded-full transition-all'
                    style={{ width: `${a.assid}%`, background: cor }}
                  />
                </div>
              </div>
              <span
                style={{ background: tint(cor), color: txt(texto, cor, escuro), borderColor: cor }}
                className='rounded-md border-l-4 px-2 py-0.5 text-xs font-medium'
              >
                {a.disc}
              </span>
            </div>
          );
        })}
        {lista.length === 0 && <p className='p-6 text-sm opacity-60'>Sem resultados.</p>}
      </div>
    </PageCard>
  );
}
