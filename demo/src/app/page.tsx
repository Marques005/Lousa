'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/components/lib/utils';
import { PageCard, ativo, btn, card, inativo, tint, useDisc, useEscuro, txt } from './shell';

const dias = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];
const horas = ['15:00', '16:30', '18:00'];

// [dia, hora, disciplina, professor/sala]
const aulas: [number, number, string, string][] = [
  [0, 0, 'Matemática', 'Prof. Rita · Sala 1'],
  [0, 0, 'Física', 'Prof. Nuno · Sala 2'],
  [1, 0, 'Física', 'Prof. Nuno · Sala 2'],
  [1, 0, 'Português', 'Prof. Ana · Sala 3'],
  [2, 0, 'Matemática', 'Prof. Rita · Sala 1'],
  [2, 0, 'Matemática', 'Prof. Hugo · Sala 4'],
  [3, 0, 'Português', 'Prof. Ana · Sala 3'],
  [3, 0, 'Inglês', 'Prof. Sara · Sala 2'],
  [4, 0, 'Inglês', 'Prof. Sara · Sala 2'],
  [0, 1, 'Física', 'Prof. Nuno · Sala 2'],
  [0, 1, 'Matemática', 'Prof. Hugo · Sala 4'],
  [1, 1, 'Inglês', 'Prof. Sara · Sala 1'],
  [1, 1, 'Inglês', 'Prof. Sara · Sala 3'],
  [2, 1, 'Física', 'Prof. Nuno · Sala 2'],
  [2, 1, 'Matemática', 'Prof. Rita · Sala 1'],
  [3, 1, 'Inglês', 'Prof. Sara · Sala 2'],
  [3, 1, 'Física', 'Prof. Nuno · Sala 4'],
  [4, 1, 'Português', 'Prof. Ana · Sala 3'],
  [0, 2, 'Inglês', 'Prof. Sara · Sala 1'],
  [1, 2, 'Matemática', 'Prof. Rita · Sala 1'],
  [2, 2, 'Física', 'Prof. Nuno · Sala 2'],
  [3, 2, 'Português', 'Prof. Ana · Sala 3'],
  [4, 2, 'Matemática', 'Prof. Hugo · Sala 4']
];

const tarefas = [
  'Lançar sumários de ontem',
  'Ligar ao encarregado do João',
  'Confirmar sala 4 para sexta',
  'Enviar recibos de novembro',
  'Marcar teste de Física',
  'Rever faltas da semana'
];

export default function HorarioPage() {
  const disc = useDisc();
  const escuro = useEscuro();
  const [vista, setVista] = useState('Semana');
  const [filtro, setFiltro] = useState<string | null>(null);
  const [feitas, setFeitas] = useState<string[]>([]);

  const toggle = (t: string) =>
    setFeitas((f) => (f.includes(t) ? f.filter((x) => x !== t) : [...f, t]));

  return (
    <>
      <section className={cn(card, 'hidden w-64 shrink-0 flex-col overflow-hidden lg:flex')}>
        <div className='flex items-center justify-between bg-[color-mix(in_srgb,var(--rail)_86%,var(--dot))] px-4 py-3 text-(--dot)'>
          <span className='font-semibold'>Tarefas</span>
          <span className='rounded-full bg-white/25 px-2 text-sm'>{tarefas.length - feitas.length}</span>
        </div>
        <ul className='space-y-1 p-3'>
          {tarefas.map((t) => (
            <li key={t}>
              <label className='flex cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm hover:bg-(--soft)'>
                <span className={cn(feitas.includes(t) && 'line-through opacity-50')}>{t}</span>
                <Checkbox checked={feitas.includes(t)} onCheckedChange={() => toggle(t)} />
              </label>
            </li>
          ))}
        </ul>
      </section>

      <PageCard titulo='Horário'>
        <div className='flex flex-wrap items-center justify-between gap-3 border-y border-(--line) bg-(--soft)/50 px-6 py-4'>
          <div className='flex gap-2'>
            {['Semana', 'Mês', 'Dia'].map((v) => (
              <button key={v} className={cn(btn, vista === v ? ativo : inativo)} onClick={() => setVista(v)}>
                {v}
              </button>
            ))}
          </div>
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

        <div className='overflow-auto p-4'>
          <div className='grid min-w-[720px] grid-cols-[60px_repeat(5,1fr)]'>
            <div />
            {dias.map((d) => (
              <div key={d} className='pb-2 text-center text-sm font-semibold'>
                {d}
              </div>
            ))}
            {horas.map((h, hi) => (
              <div key={h} className='contents'>
                <div className='border-t border-(--line) pt-3 text-xs opacity-60'>{h}</div>
                {dias.map((_, di) => (
                  <div key={di} className='space-y-2 border-t border-l border-(--line) p-2'>
                    {aulas
                      .filter(([d, hr, ds]) => d === di && hr === hi && (!filtro || filtro === ds))
                      .map(([, , ds, info], i) => {
                        const [cor, texto] = disc[ds];
                        return (
                          <button
                            // a key muda com o filtro → as aulas visíveis voltam a entrar com um fade curto
                            key={`${filtro}-${i}`}
                            onClick={() => toast(`${ds} · ${dias[di]} ${h}`, { description: info })}
                            style={{
                              background: tint(cor),
                              borderLeftColor: cor,
                              color: txt(texto, cor, escuro),
                              animation: 'aula-in 250ms ease-out'
                            }}
                            className='w-full rounded-lg border-l-4 px-3 py-2 text-left transition hover:brightness-95'
                          >
                            <div className='text-sm font-semibold'>{ds}</div>
                            <div className='text-xs opacity-80'>{info}</div>
                          </button>
                        );
                      })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </PageCard>
      <style>{`@keyframes aula-in { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </>
  );
}
