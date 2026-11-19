'use client';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';
import { Icons } from '@/components/icons';
import { cn } from '@/components/lib/utils';
import { PageCard, card, tint, useDisc, useEscuro, txt } from './shell';

// Horário do tutor: só leitura (é definido pela administração), sempre em vista semanal, dia completo
const dias = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];
const INICIO = 8; // 08:00
const FIM = 20; // 20:00
const H = 64; // px por hora
const horas = Array.from({ length: FIM - INICIO + 1 }, (_, i) => INICIO + i);

// [dia, início, fim, disciplina, professor/sala]
type Aula = [number, string, string, string, string];
const aulas: Aula[] = [
  // segunda
  [0, '09:00', '10:30', 'Matemática', 'Prof. Rita · Sala 1'],
  [0, '11:00', '12:30', 'Português', 'Prof. Ana · Sala 3'],
  [0, '15:00', '16:30', 'Matemática', 'Prof. Rita · Sala 1'],
  [0, '15:00', '16:30', 'Física', 'Prof. Nuno · Sala 2'],
  [0, '16:30', '18:00', 'Física', 'Prof. Nuno · Sala 2'],
  [0, '16:30', '18:00', 'Matemática', 'Prof. Hugo · Sala 4'],
  [0, '18:00', '19:30', 'Inglês', 'Prof. Sara · Sala 1'],
  // terça
  [1, '08:30', '10:00', 'Inglês', 'Prof. Sara · Sala 2'],
  [1, '10:30', '12:00', 'Física', 'Prof. Nuno · Sala 2'],
  [1, '14:00', '15:00', 'Português', 'Prof. Ana · Sala 3'],
  [1, '15:00', '16:30', 'Física', 'Prof. Nuno · Sala 2'],
  [1, '15:00', '16:30', 'Português', 'Prof. Ana · Sala 3'],
  [1, '16:30', '18:00', 'Inglês', 'Prof. Sara · Sala 1'],
  [1, '16:30', '18:00', 'Inglês', 'Prof. Sara · Sala 3'],
  [1, '18:00', '19:30', 'Matemática', 'Prof. Rita · Sala 1'],
  // quarta
  [2, '09:00', '10:30', 'Matemática', 'Prof. Hugo · Sala 4'],
  [2, '11:00', '12:30', 'Inglês', 'Prof. Sara · Sala 2'],
  [2, '15:00', '16:30', 'Matemática', 'Prof. Rita · Sala 1'],
  [2, '15:00', '16:30', 'Matemática', 'Prof. Hugo · Sala 4'],
  [2, '16:30', '18:00', 'Física', 'Prof. Nuno · Sala 2'],
  [2, '16:30', '18:00', 'Matemática', 'Prof. Rita · Sala 1'],
  [2, '18:00', '19:30', 'Física', 'Prof. Nuno · Sala 2'],
  // quinta
  [3, '08:30', '10:00', 'Português', 'Prof. Ana · Sala 3'],
  [3, '10:30', '12:00', 'Matemática', 'Prof. Rita · Sala 1'],
  [3, '14:00', '15:00', 'Física', 'Prof. Nuno · Sala 4'],
  [3, '15:00', '16:30', 'Português', 'Prof. Ana · Sala 3'],
  [3, '15:00', '16:30', 'Inglês', 'Prof. Sara · Sala 2'],
  [3, '16:30', '18:00', 'Inglês', 'Prof. Sara · Sala 2'],
  [3, '16:30', '18:00', 'Física', 'Prof. Nuno · Sala 4'],
  [3, '18:00', '19:30', 'Português', 'Prof. Ana · Sala 3'],
  // sexta
  [4, '09:00', '10:30', 'Física', 'Prof. Nuno · Sala 2'],
  [4, '11:00', '12:30', 'Matemática', 'Prof. Hugo · Sala 4'],
  [4, '15:00', '16:30', 'Inglês', 'Prof. Sara · Sala 2'],
  [4, '16:30', '18:00', 'Português', 'Prof. Ana · Sala 3'],
  [4, '18:00', '19:30', 'Matemática', 'Prof. Hugo · Sala 4']
];

const min = (h: string) => {
  const [hh, mm] = h.split(':').map(Number);
  return hh * 60 + mm;
};

// aulas sobrepostas no mesmo dia ficam lado a lado (pista = coluna dentro do dia)
function comPistas(dia: number) {
  const doDia = aulas.filter((a) => a[0] === dia).sort((x, y) => min(x[1]) - min(y[1]));
  const fimPista: number[] = [];
  const res = doDia.map((a) => {
    let p = fimPista.findIndex((f) => f <= min(a[1]));
    if (p === -1) p = fimPista.length;
    fimPista[p] = min(a[2]);
    return { a, p };
  });
  return res.map((r) => ({
    ...r,
    n: Math.max(...res.filter((o) => min(o.a[1]) < min(r.a[2]) && min(o.a[2]) > min(r.a[1])).map((o) => o.p + 1))
  }));
}

const tarefasIniciais = [
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
  const [tarefas, setTarefas] = useState(tarefasIniciais);
  const [feitas, setFeitas] = useState<string[]>([]);
  const [nova, setNova] = useState('');
  const [agora, setAgora] = useState<Date | null>(null);
  const grelha = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAgora(new Date());
    const t = setInterval(() => setAgora(new Date()), 60_000);
    // abre o horário perto da hora atual (ou no início do dia)
    const h = new Date().getHours();
    grelha.current?.scrollTo({ top: Math.max(0, (Math.min(h, FIM) - INICIO - 1) * H) });
    return () => clearInterval(t);
  }, []);

  const toggle = (t: string) => setFeitas((f) => (f.includes(t) ? f.filter((x) => x !== t) : [...f, t]));
  const adicionar = () => {
    const t = nova.trim();
    if (!t || tarefas.includes(t)) return;
    setTarefas((ts) => [...ts, t]);
    setNova('');
  };

  const diaHoje = agora ? (agora.getDay() + 6) % 7 : -1; // 0 = segunda
  const minAgora = agora ? agora.getHours() * 60 + agora.getMinutes() : 0;
  const mostraAgora = diaHoje >= 0 && diaHoje < 5 && minAgora >= INICIO * 60 && minAgora <= FIM * 60;

  return (
    <>
      <section className={cn(card, 'hidden w-64 shrink-0 flex-col overflow-hidden lg:flex')}>
        <div className='flex items-center justify-between bg-[color-mix(in_srgb,var(--rail)_86%,var(--dot))] px-4 py-3 text-(--dot)'>
          <span className='font-semibold'>Tarefas</span>
          <span className='rounded-full bg-white/25 px-2 text-sm'>{tarefas.length - feitas.length}</span>
        </div>
        <ul className='min-h-0 flex-1 space-y-1 overflow-auto p-3'>
          {tarefas.map((t) => (
            <li key={t} style={{ animation: 'aula-in 250ms ease-out' }}>
              <label className='flex cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm hover:bg-(--soft)'>
                <span className={cn(feitas.includes(t) && 'line-through opacity-50')}>{t}</span>
                <Checkbox checked={feitas.includes(t)} onCheckedChange={() => toggle(t)} />
              </label>
            </li>
          ))}
        </ul>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            adicionar();
          }}
          className='flex items-center gap-2 border-t border-(--line) p-3'
        >
          <input
            value={nova}
            onChange={(e) => setNova(e.target.value)}
            placeholder='Nova tarefa…'
            className='min-w-0 flex-1 rounded-lg border border-(--line) bg-(--surface,white) px-3 py-1.5 text-sm outline-none focus:border-(--accent)'
          />
          <button
            type='submit'
            disabled={!nova.trim()}
            aria-label='Adicionar tarefa'
            className='rounded-lg bg-(--accent) p-1.5 text-(--accent-fg) transition hover:brightness-110 disabled:opacity-40'
          >
            <Icons.add className='size-4' />
          </button>
        </form>
      </section>

      <PageCard titulo='Horário'>
        <div ref={grelha} className='min-h-0 flex-1 overflow-auto px-4 pb-4'>
          <div className='grid min-w-[720px] grid-cols-[60px_repeat(5,1fr)]'>
            {/* cabeçalho dos dias, fixo ao fazer scroll */}
            <div className='sticky top-0 z-20 bg-(--surface,white)' />
            {dias.map((d, i) => (
              <div
                key={d}
                className={cn(
                  'sticky top-0 z-20 bg-(--surface,white) py-2 text-center text-sm font-semibold',
                  i === diaHoje && 'text-(--accent)'
                )}
              >
                {d}
              </div>
            ))}

            {/* coluna das horas */}
            <div className='relative mt-3' style={{ height: (FIM - INICIO) * H }}>
              {horas.map((h) => (
                <div
                  key={h}
                  className='absolute right-2 -translate-y-1/2 text-xs opacity-60'
                  style={{ top: (h - INICIO) * H }}
                >
                  {String(h).padStart(2, '0')}:00
                </div>
              ))}
            </div>

            {dias.map((_, di) => (
              <div
                key={di}
                className={cn('relative mt-3 border-l border-(--line)', di === diaHoje && 'bg-(--soft)/30')}
                style={{ height: (FIM - INICIO) * H }}
              >
                {/* linhas das horas e meias horas */}
                {horas.map((h) => (
                  <div key={h} className='absolute inset-x-0 border-t border-(--line)' style={{ top: (h - INICIO) * H }} />
                ))}
                {horas.slice(0, -1).map((h) => (
                  <div
                    key={`m${h}`}
                    className='absolute inset-x-0 border-t border-dashed border-(--line) opacity-50'
                    style={{ top: (h - INICIO) * H + H / 2 }}
                  />
                ))}

                {comPistas(di).map(({ a: [, ini, fim, ds, info], p, n }) => {
                  const [cor, texto] = disc[ds];
                  const top = ((min(ini) - INICIO * 60) / 60) * H;
                  const altura = ((min(fim) - min(ini)) / 60) * H;
                  return (
                    <button
                      key={`${ini}-${ds}-${info}`}
                      title={`${ds} · ${ini}–${fim} · ${info}`}
                      onClick={() => toast(`${ds} · ${dias[di]} ${ini}–${fim}`, { description: info })}
                      style={{
                        top: top + 2,
                        height: altura - 4,
                        left: `calc(${(p / n) * 100}% + 4px)`,
                        width: `calc(${100 / n}% - 8px)`,
                        background: tint(cor),
                        borderLeftColor: cor,
                        color: txt(texto, cor, escuro),
                        animation: 'aula-in 250ms ease-out'
                      }}
                      className='absolute z-10 overflow-hidden rounded-lg border-l-4 px-2.5 py-1.5 text-left transition hover:brightness-95'
                    >
                      <div className='truncate text-sm font-semibold'>{ds}</div>
                      <div className='truncate text-xs opacity-80'>
                        {ini}–{fim}
                      </div>
                      {altura >= H * 1.25 && <div className='truncate text-xs opacity-80'>{info}</div>}
                    </button>
                  );
                })}

                {/* linha da hora atual */}
                {mostraAgora && di === diaHoje && (
                  <div
                    className='pointer-events-none absolute inset-x-0 z-[15] border-t-2 border-red-500'
                    style={{ top: ((minAgora - INICIO * 60) / 60) * H }}
                  >
                    <span className='absolute -top-[5px] -left-[5px] size-2 rounded-full bg-red-500' />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </PageCard>
      <style>{`@keyframes aula-in { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </>
  );
}
