'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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

// Tutor com sessão iniciada (mock, sem backend): só aparecem as aulas dele
const TUTOR = { nome: 'Prof. Rita Almeida', disciplinas: 'Matemática e Física' };

// [dia, início, fim, disciplina, turma/grupo · sala]
type Aula = [number, string, string, string, string];
const aulas: Aula[] = [
  // segunda
  [0, '09:00', '10:30', 'Matemática', '12.º ano · 3 alunos · Sala 1'],
  [0, '11:00', '12:30', 'Física', '11.º ano · 4 alunos · Sala 2'],
  [0, '15:00', '16:30', 'Matemática', '9.º ano · 5 alunos · Sala 1'],
  [0, '16:30', '18:00', 'Matemática', '10.º ano · 4 alunos · Sala 1'],
  [0, '18:00', '19:30', 'Física', '11.º ano · 3 alunos · Sala 2'],
  // terça
  [1, '10:30', '12:00', 'Matemática', '11.º ano · 4 alunos · Sala 1'],
  [1, '14:00', '15:00', 'Matemática', 'Apoio individual · Sala 4'],
  [1, '15:00', '16:30', 'Física', '10.º ano · 5 alunos · Sala 2'],
  [1, '18:00', '19:30', 'Matemática', '12.º ano · 4 alunos · Sala 1'],
  // quarta
  [2, '09:00', '10:30', 'Física', '12.º ano · 3 alunos · Sala 2'],
  [2, '15:00', '16:30', 'Matemática', '9.º ano · 5 alunos · Sala 1'],
  [2, '16:30', '18:00', 'Matemática', '10.º ano · 4 alunos · Sala 1'],
  [2, '18:00', '19:30', 'Física', '11.º ano · 4 alunos · Sala 2'],
  // quinta
  [3, '10:30', '12:00', 'Matemática', '12.º ano · 3 alunos · Sala 1'],
  [3, '14:00', '15:00', 'Física', 'Apoio individual · Sala 4'],
  [3, '15:00', '16:30', 'Matemática', '11.º ano · 4 alunos · Sala 1'],
  [3, '16:30', '18:00', 'Física', '10.º ano · 5 alunos · Sala 2'],
  // sexta
  [4, '09:00', '10:30', 'Matemática', '10.º ano · 4 alunos · Sala 1'],
  [4, '15:00', '16:30', 'Física', '12.º ano · 3 alunos · Sala 2'],
  [4, '16:30', '18:00', 'Matemática', '9.º ano · 5 alunos · Sala 1'],
  [4, '18:00', '19:30', 'Matemática', 'Preparação para exame · Sala 1']
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

const CHAVE = 'lousa.tutor.tarefas';
const EXPIRA = 30 * 60_000; // tarefas riscadas desaparecem passados 30 minutos

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
  // tarefa riscada → hora em que foi riscada; passados 30 min é eliminada
  const [feitas, setFeitas] = useState<Record<string, number>>({});
  const [relogio, setRelogio] = useState(0);
  const [carregado, setCarregado] = useState(false);
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

  const toggle = (t: string) => {
    if (feitas[t]) {
      setFeitas(({ [t]: _, ...resto }) => resto);
      return;
    }
    setFeitas((f) => ({ ...f, [t]: Date.now() }));
    toast('Tarefa concluída', {
      id: 'tarefa-riscada', // não empilha avisos ao riscar várias seguidas
      description: 'As tarefas riscadas são eliminadas passados 30 minutos. Desmarca para a manter.'
    });
  };

  // guardado no browser (mock, sem backend): as tarefas e as riscadas sobrevivem a mudar de página ou recarregar
  useEffect(() => {
    try {
      const guardado = JSON.parse(localStorage.getItem(CHAVE) ?? 'null');
      if (guardado?.tarefas) setTarefas(guardado.tarefas);
      if (guardado?.feitas) setFeitas(guardado.feitas);
    } catch {
      /* sem acesso ao localStorage: fica só em memória */
    }
    setCarregado(true);
  }, []);
  useEffect(() => {
    if (!carregado) return;
    try {
      localStorage.setItem(CHAVE, JSON.stringify({ tarefas, feitas }));
    } catch {
      /* idem */
    }
  }, [carregado, tarefas, feitas]);

  // elimina as tarefas riscadas há mais de 30 min (ao abrir a página e depois a cada 10 s)
  useEffect(() => {
    if (!carregado) return;
    const limpar = () => {
      const agoraMs = Date.now();
      setRelogio(agoraMs);
      setFeitas((f) => {
        const expiradas = Object.keys(f).filter((k) => agoraMs - f[k] >= EXPIRA);
        if (!expiradas.length) return f;
        setTarefas((ts) => ts.filter((x) => !expiradas.includes(x)));
        return Object.fromEntries(Object.entries(f).filter(([k]) => !expiradas.includes(k)));
      });
    };
    limpar();
    const t = setInterval(limpar, 10_000);
    return () => clearInterval(t);
  }, [carregado]);
  const faltam = (t: string) =>
    Math.max(1, Math.ceil(Math.min(EXPIRA, EXPIRA - ((relogio || Date.now()) - feitas[t])) / 60_000));
  const adicionar = () => {
    const t = nova.trim();
    if (!t || tarefas.includes(t)) return;
    setTarefas((ts) => [...ts, t]);
    setNova('');
  };

  // riscadas descem para baixo das por riscar, a mais recente primeiro; por riscar mantêm a ordem original
  const ordem = [
    ...tarefas.filter((t) => !feitas[t]),
    ...tarefas.filter((t) => feitas[t]).sort((x, y) => feitas[y] - feitas[x])
  ];
  const linhas = useRef(new Map<string, HTMLLIElement>());
  const posicoes = useRef(new Map<string, number>());
  const chaveOrdem = ordem.join('|');
  // FLIP: cada linha desliza da posição antiga para a nova
  useLayoutEffect(() => {
    // medir tudo antes de animar (uma animação em curso mexe no getBoundingClientRect)
    linhas.current.forEach((el) => el.getAnimations().forEach((a) => a.cancel()));
    const novas = new Map([...linhas.current].map(([t, el]) => [t, el.getBoundingClientRect().top]));
    linhas.current.forEach((el, t) => {
      const antes = posicoes.current.get(t);
      const depois = novas.get(t)!;
      if (antes === undefined) {
        el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, easing: 'ease-out' });
      } else if (Math.abs(antes - depois) > 1) {
        el.animate([{ transform: `translateY(${antes - depois}px)` }, { transform: 'none' }], {
          duration: 500,
          easing: 'cubic-bezier(0.32,0.72,0,1)'
        });
      }
    });
    posicoes.current = novas;
  }, [chaveOrdem]);

  const diaHoje = agora ? (agora.getDay() + 6) % 7 : -1; // 0 = segunda
  const minAgora = agora ? agora.getHours() * 60 + agora.getMinutes() : 0;
  const mostraAgora = diaHoje >= 0 && diaHoje < 5 && minAgora >= INICIO * 60 && minAgora <= FIM * 60;

  return (
    <>
      <section className={cn(card, 'hidden w-64 shrink-0 flex-col overflow-hidden lg:flex')}>
        <div className='flex items-center justify-between bg-[color-mix(in_srgb,var(--rail)_86%,var(--dot))] px-4 py-3 text-(--dot)'>
          <span className='font-semibold'>Tarefas</span>
          <span className='rounded-full bg-white/25 px-2 text-sm'>{tarefas.filter((t) => !feitas[t]).length}</span>
        </div>
        <ul className='min-h-0 flex-1 space-y-1 overflow-auto p-3'>
          {ordem.map((t) => (
            <li key={t} ref={(el) => void (el ? linhas.current.set(t, el) : linhas.current.delete(t))}>
              <label className='flex cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm hover:bg-(--soft)'>
                <span className='min-w-0'>
                  <span className={cn('block', feitas[t] && 'line-through opacity-50')}>{t}</span>
                  {feitas[t] && (
                    <span className='block text-[11px] opacity-50' style={{ animation: 'aula-in 250ms ease-out' }}>
                      Eliminada daqui a {faltam(t)} min
                    </span>
                  )}
                </span>
                <Checkbox checked={!!feitas[t]} onCheckedChange={() => toggle(t)} />
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

      <PageCard
        titulo='Horário'
        acoes={
          <div className='text-right text-sm'>
            <div className='font-semibold'>{TUTOR.nome}</div>
            <div className='text-xs opacity-60'>
              {TUTOR.disciplinas} · {aulas.length} aulas por semana
            </div>
          </div>
        }
      >
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
                  <div
                    key={h}
                    className='absolute inset-x-0 border-t border-(--line)'
                    style={{ top: (h - INICIO) * H }}
                  />
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
