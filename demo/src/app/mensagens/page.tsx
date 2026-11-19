'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/components/lib/utils';
import { ativo, btn, card } from '../shell';

type Msg = { de: 'eu' | 'eles'; texto: string; hora: string; nova?: boolean };

// Conversa que responde sozinha (teste)
const AUTO = 'Luís Pereira';
const RESPOSTA_AUTO = 'Obrigado pela mensagem! 👍 (resposta automática de teste)';
const agora = () => new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });

const conversas: { nome: string; aluno: string; msgs: Msg[] }[] = [
  {
    nome: 'Paula Silva',
    aluno: 'Ana Silva',
    msgs: [
      { de: 'eles', texto: 'Boa tarde! A Ana pode sair 15 min mais cedo na quinta?', hora: '14:02' },
      { de: 'eu', texto: 'Boa tarde, Paula. Sim, sem problema, avisamos a professora Rita.', hora: '14:10' },
      { de: 'eles', texto: 'Obrigada 🙏', hora: '14:11' }
    ]
  },
  {
    nome: 'Carlos Costa',
    aluno: 'João Costa',
    msgs: [
      { de: 'eu', texto: 'Olá Carlos, a mensalidade de novembro do João está em atraso.', hora: 'Ontem' },
      { de: 'eles', texto: 'Peço desculpa, transfiro hoje ainda.', hora: 'Ontem' }
    ]
  },
  {
    nome: 'Sofia Lopes',
    aluno: 'Marta Lopes',
    msgs: [{ de: 'eles', texto: 'Quando é o próximo teste de Inglês?', hora: 'Seg' }]
  },
  {
    nome: 'Luís Pereira',
    aluno: 'Rui Pereira',
    msgs: [{ de: 'eu', texto: 'O Rui teve 18 no teste de Matemática! 🎉', hora: 'Sex' }]
  }
];

export default function MensagensPage() {
  const [dados, setDados] = useState(conversas);
  const [sel, setSel] = useState(0);
  const [texto, setTexto] = useState('');
  const [aEscrever, setAEscrever] = useState<number | null>(null);
  const fim = useRef<HTMLDivElement>(null);
  const atual = dados[sel];

  const juntar = (idx: number, m: Msg) =>
    setDados((d) => d.map((c, i) => (i === idx ? { ...c, msgs: [...c.msgs, m] } : c)));

  const enviar = () => {
    if (!texto.trim()) return;
    const idx = sel;
    juntar(idx, { de: 'eu', texto, hora: agora(), nova: true });
    setTexto('');

    if (dados[idx].nome === AUTO) {
      setTimeout(() => setAEscrever(idx), 600);
      setTimeout(() => {
        setAEscrever(null);
        juntar(idx, { de: 'eles', texto: RESPOSTA_AUTO, hora: agora(), nova: true });
      }, 2200);
    }
  };

  // desce até à última mensagem
  useEffect(() => {
    fim.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [atual.msgs.length, aEscrever, sel]);

  return (
    <>
      <section className={cn(card, 'flex w-72 shrink-0 flex-col overflow-hidden')}>
        <div className='bg-[color-mix(in_srgb,var(--rail)_86%,var(--dot))] px-4 py-3 font-semibold text-(--dot)'>Encarregados</div>
        <ul className='flex-1 overflow-auto p-2'>
          {dados.map((c, i) => (
            <li key={c.nome}>
              <button
                onClick={() => setSel(i)}
                className={cn(
                  'w-full rounded-xl px-3 py-2.5 text-left transition-colors',
                  sel === i ? 'bg-(--soft)' : 'hover:bg-(--soft)/60'
                )}
              >
                <div className='flex justify-between text-sm font-semibold'>
                  {c.nome}
                  <span className='text-xs font-normal opacity-50'>{c.msgs.at(-1)?.hora}</span>
                </div>
                <div className='truncate text-xs opacity-60'>{c.msgs.at(-1)?.texto}</div>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <main className={cn(card, 'flex min-w-0 flex-1 flex-col overflow-hidden')}>
        <header className='border-b border-(--line) px-6 py-4'>
          <div className='text-xl font-extrabold'>{atual.nome}</div>
          <div className='text-xs opacity-60'>Encarregado de {atual.aluno}</div>
        </header>
        <div className='flex flex-1 flex-col gap-2 overflow-auto bg-(--soft)/40 p-6'>
          {atual.msgs.map((m, i) => (
            <div
              key={`${sel}-${i}`}
              className={cn(
                'max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm',
                m.de === 'eu'
                  ? 'self-end rounded-br-sm bg-(--accent) text-(--accent-fg)'
                  : 'self-start rounded-bl-sm bg-white'
              )}
              style={
                m.nova
                  ? {
                      animation: `${m.de === 'eu' ? 'msg-enviar' : 'msg-receber'} ${m.de === 'eu' ? 520 : 420}ms cubic-bezier(0.32, 0.72, 0, 1) both`,
                      transformOrigin: m.de === 'eu' ? 'bottom right' : 'bottom left'
                    }
                  : undefined
              }
            >
              {m.texto}
              <div className='mt-0.5 text-right text-[10px] opacity-60'>{m.hora}</div>
            </div>
          ))}
          {aEscrever === sel && (
            <div
              className='flex gap-1 self-start rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm'
              style={{ animation: 'msg-receber 300ms cubic-bezier(0.32, 0.72, 0, 1) both', transformOrigin: 'bottom left' }}
            >
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className='size-1.5 rounded-full bg-(--ink)/50'
                  style={{ animation: `msg-ponto 1s ${d * 150}ms ease-in-out infinite` }}
                />
              ))}
            </div>
          )}
          <div ref={fim} />
          <style>{`
            @keyframes msg-enviar {
              0% { opacity: 0; transform: translateY(72px) scale(0.85); }
              40% { opacity: 1; }
              100% { opacity: 1; transform: none; }
            }
            @keyframes msg-receber {
              from { opacity: 0; transform: translate(-16px, 10px) scale(0.9); }
              to { opacity: 1; transform: none; }
            }
            @keyframes msg-ponto {
              0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
              30% { transform: translateY(-4px); opacity: 1; }
            }
          `}</style>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            enviar();
          }}
          className='flex gap-2 border-t border-(--line) p-4'
        >
          <input
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder='Escrever mensagem…'
            className='flex-1 rounded-lg border border-(--line) px-3 py-2 text-sm outline-none focus:border-(--accent)'
          />
          <button type='submit' className={cn(btn, ativo, 'active:scale-95')}>
            Enviar
          </button>
        </form>
      </main>
    </>
  );
}
