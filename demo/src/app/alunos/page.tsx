'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/components/lib/utils';
import { PageCard, ativo, btn, inativo } from '../shell';
import { alunos, notaMax } from './_data';

const anos = [9, 10, 11, 12];

export default function AlunosPage() {
  const [q, setQ] = useState('');
  const [ano, setAno] = useState<number | null>(null);
  const lista = alunos.filter(
    (a) => a.nome.toLowerCase().includes(q.toLowerCase()) && (!ano || a.ano === ano)
  );

  return (
    <PageCard titulo='Os meus alunos'>
      <div className='flex flex-wrap items-center justify-between gap-3 border-y border-(--line) bg-(--soft)/50 px-6 py-4'>
        <input
          placeholder='Pesquisar aluno…'
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className='w-64 rounded-lg border border-(--line) bg-white px-3 py-1.5 text-sm outline-none focus:border-(--accent)'
        />
        <div className='flex flex-wrap items-center gap-2'>
          <span className='text-xs opacity-60'>{lista.length} alunos</span>
          {anos.map((n) => (
            <button
              key={n}
              className={cn(btn, ano === n ? ativo : inativo)}
              onClick={() => setAno(ano === n ? null : n)}
            >
              {n}.º ano
            </button>
          ))}
        </div>
      </div>

      <div className='grid flex-1 content-start gap-3 overflow-auto p-4 sm:grid-cols-2 xl:grid-cols-3'>
        {lista.map((a) => {
          const ok = a.negativas === 0;
          return (
            <Link
              key={a.id}
              href={`/alunos/${a.id}`}
              className='group flex items-center gap-3 rounded-xl border border-(--line) p-3 transition hover:border-(--accent) hover:shadow-md'
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={a.foto}
                alt=''
                loading='lazy'
                className='size-12 shrink-0 rounded-full object-cover ring-2 ring-(--soft)'
              />
              <div className='min-w-0 flex-1'>
                <div className='truncate font-semibold group-hover:text-(--accent)'>{a.nome}</div>
                <div className='truncate text-xs opacity-60'>
                  {a.turma} · EE: {a.ees.map((e) => e.nome).join(', ')}
                </div>
              </div>
              <div className='text-right'>
                <div
                  className={cn(
                    // inline-block: a caixa acompanha o número, não a legenda de baixo
                    'inline-block rounded-md px-2 py-0.5 text-sm font-bold tabular-nums',
                    ok ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  )}
                >
                  {a.media.toLocaleString('pt-PT')}
                </div>
                <div className='mt-0.5 text-[10px] opacity-50'>
                  média /{notaMax(a)}
                  {!ok && ` · ${a.negativas} neg.`}
                </div>
              </div>
            </Link>
          );
        })}
        {lista.length === 0 && <p className='p-6 text-sm opacity-60'>Sem resultados.</p>}
      </div>
    </PageCard>
  );
}
