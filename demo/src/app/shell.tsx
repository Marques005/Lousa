'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useRef, useState, type CSSProperties } from 'react';
import { cn } from '@/components/lib/utils';
import { Icons } from '@/components/icons';
import { startThemeTransition } from '@/components/lib/theme-transition';
import { flushSync } from 'react-dom';
import { Outfit } from 'next/font/google';

// Fonte da marca (wordmark "Lousa")
const marca = Outfit({ subsets: ['latin'], weight: ['800'] });

type Sub = { nome: string; vars: Record<string, string> };
type Familia = {
  nome: string;
  // cor de cada disciplina: [destaque, texto]
  disc: Record<string, [string, string]>;
  subs: Sub[];
};

const familias: Familia[] = [
  {
    nome: 'Café',
    disc: { Matemática: ['#C06E52', '#7A3E2A'], Física: ['#8A6A4B', '#5C4430'], Inglês: ['#C9A227', '#6B5410'], Português: ['#43281C', '#43281C'] },
    subs: [
      { nome: 'Café', vars: { '--bg': '#A47A5C', '--rail': '#43281C', '--dot': '#FBF2C0', '--logo-bg': '#FBF2C0', '--logo-fg': '#C06E52', '--accent': '#C06E52', '--accent-fg': '#FFFFFF', '--soft': '#FBF2C0', '--line': '#E9D9A6', '--ink': '#43281C', '--mark': '#C06E52' } },
      { nome: 'Café escuro', vars: { '--bg': '#43281C', '--rail': '#5A4636', '--dot': '#FBF2C0', '--logo-bg': '#C06E52', '--logo-fg': '#FBF2C0', '--accent': '#C06E52', '--accent-fg': '#FFFFFF', '--soft': '#FBF2C0', '--line': '#E9D9A6', '--ink': '#43281C', '--mark': '#C06E52' } },
      { nome: 'Canela', vars: { '--bg': '#C06E52', '--rail': '#43281C', '--dot': '#FBF2C0', '--logo-bg': '#FBF2C0', '--logo-fg': '#C06E52', '--accent': '#43281C', '--accent-fg': '#FBF2C0', '--soft': '#FDF7DD', '--line': '#EBD9B0', '--ink': '#43281C', '--mark': '#C06E52' } },
      { nome: 'Creme', vars: { '--bg': '#FBF2C0', '--rail': '#48392A', '--dot': '#FBF2C0', '--logo-bg': '#C06E52', '--logo-fg': '#FFFFFF', '--accent': '#8A6A4B', '--accent-fg': '#FFFFFF', '--soft': '#FDF8E3', '--line': '#EDE2B8', '--ink': '#43281C', '--mark': '#C06E52' } }
    ]
  },
  {
    nome: 'Gelo',
    disc: { Matemática: ['#22DCD8', '#0B5E5C'], Física: ['#4FC8EE', '#0B4F63'], Inglês: ['#1FB8D6', '#0B4A57'], Português: ['#0B3B44', '#0B3B44'] },
    subs: [
      { nome: 'Gelo', vars: { '--bg': '#3FA9C4', '--rail': '#0E4450', '--dot': '#34F6F2', '--logo-bg': '#34F6F2', '--logo-fg': '#0E4450', '--accent': '#0E4450', '--accent-fg': '#D1F5FF', '--soft': '#EEF8FF', '--line': '#C6EEFA', '--ink': '#0E4450', '--mark': '#FFFFFF' } },
      { nome: 'Oceano', vars: { '--bg': '#0E4450', '--rail': '#0A2F38', '--dot': '#34F6F2', '--logo-bg': '#34F6F2', '--logo-fg': '#0E4450', '--accent': '#1FB8D6', '--accent-fg': '#06262D', '--soft': '#EEF8FF', '--line': '#C6EEFA', '--ink': '#0E4450', '--mark': '#FFFFFF' } },
      { nome: 'Glaciar', vars: { '--bg': '#D1F5FF', '--rail': '#3FA9C4', '--dot': '#FFFFFF', '--logo-bg': '#FFFFFF', '--logo-fg': '#0E4450', '--accent': '#3FA9C4', '--accent-fg': '#FFFFFF', '--soft': '#EEF8FF', '--line': '#C6EEFA', '--ink': '#0E4450', '--mark': '#0E4450' } },
      { nome: 'Noite', vars: { '--bg': '#06262D', '--rail': '#34F6F2', '--dot': '#06262D', '--logo-bg': '#06262D', '--logo-fg': '#34F6F2', '--accent': '#34F6F2', '--accent-fg': '#06262D', '--soft': '#E6FDFD', '--line': '#BFF3F5', '--ink': '#06262D', '--mark': '#FFFFFF' } }
    ]
  },
  {
    nome: 'Floresta',
    disc: { Matemática: ['#2F7D5B', '#1F5640'], Física: ['#8DB580', '#4A6B3F'], Inglês: ['#D9A441', '#7A5A16'], Português: ['#3B3A36', '#3B3A36'] },
    subs: [
      { nome: 'Pinho', vars: { '--bg': '#EEF6EC', '--rail': '#1F3D2F', '--dot': '#DDEFD9', '--logo-bg': '#DDEFD9', '--logo-fg': '#1F3D2F', '--accent': '#2F7D5B', '--accent-fg': '#FFFFFF', '--soft': '#EEF6EC', '--line': '#D3E6CF', '--ink': '#1F3D2F', '--mark': '#D9A441' } },
      { nome: 'Musgo', vars: { '--bg': '#F1F6E8', '--rail': '#4A6B3F', '--dot': '#F1F6E8', '--logo-bg': '#F1F6E8', '--logo-fg': '#4A6B3F', '--accent': '#1F3D2F', '--accent-fg': '#F1F6E8', '--soft': '#F1F6E8', '--line': '#DCE7CF', '--ink': '#26341F', '--mark': '#D9A441' } },
      { nome: 'Sálvia', vars: { '--bg': '#F2F7EF', '--rail': '#B8CFB0', '--dot': '#1F3D2F', '--logo-bg': '#1F3D2F', '--logo-fg': '#B8CFB0', '--accent': '#2F7D5B', '--accent-fg': '#FFFFFF', '--soft': '#F2F7EF', '--line': '#DAE7D4', '--ink': '#1F3D2F', '--mark': '#2F7D5B' } },
      { nome: 'Bosque', vars: { '--bg': '#ECF7F0', '--rail': '#0F1F18', '--dot': '#8DE0B2', '--logo-bg': '#8DE0B2', '--logo-fg': '#0F1F18', '--accent': '#8DE0B2', '--accent-fg': '#0F1F18', '--soft': '#ECF7F0', '--line': '#CFEADB', '--ink': '#0F1F18', '--mark': '#D9A441' } }
    ]
  },
  {
    nome: 'Lavanda',
    disc: { Matemática: ['#7C5CC4', '#4B3285'], Física: ['#E07A9B', '#8C3354'], Inglês: ['#F0B35A', '#7D5414'], Português: ['#3A3150', '#3A3150'] },
    subs: [
      { nome: 'Lavanda', vars: { '--bg': '#F4F0FC', '--rail': '#4B3285', '--dot': '#EDE6FB', '--logo-bg': '#EDE6FB', '--logo-fg': '#4B3285', '--accent': '#7C5CC4', '--accent-fg': '#FFFFFF', '--soft': '#F4F0FC', '--line': '#E1D8F5', '--ink': '#2E2050', '--mark': '#F0B35A' } },
      { nome: 'Ameixa', vars: { '--bg': '#F8F0F4', '--rail': '#2E2050', '--dot': '#E07A9B', '--logo-bg': '#E07A9B', '--logo-fg': '#2E2050', '--accent': '#E07A9B', '--accent-fg': '#FFFFFF', '--soft': '#F8F0F4', '--line': '#EBD8E1', '--ink': '#2E2050', '--mark': '#F0B35A' } },
      { nome: 'Lilás', vars: { '--bg': '#F6F2FD', '--rail': '#D9CCF5', '--dot': '#4B3285', '--logo-bg': '#4B3285', '--logo-fg': '#D9CCF5', '--accent': '#7C5CC4', '--accent-fg': '#FFFFFF', '--soft': '#F6F2FD', '--line': '#E4DBF6', '--ink': '#2E2050', '--mark': '#E07A9B' } },
      { nome: 'Rosa', vars: { '--bg': '#FCF1F5', '--rail': '#E07A9B', '--dot': '#FFFFFF', '--logo-bg': '#FFFFFF', '--logo-fg': '#E07A9B', '--accent': '#4B3285', '--accent-fg': '#FFFFFF', '--soft': '#FCF1F5', '--line': '#F1D9E2', '--ink': '#3A2033', '--mark': '#4B3285' } }
    ]
  },
  {
    nome: 'Grafite',
    disc: { Matemática: ['#2563EB', '#1E40AF'], Física: ['#F97316', '#9A3412'], Inglês: ['#EAB308', '#854D0E'], Português: ['#52525B', '#3F3F46'] },
    subs: [
      { nome: 'Grafite', vars: { '--bg': '#F4F4F5', '--rail': '#27272A', '--dot': '#F4F4F5', '--logo-bg': '#F4F4F5', '--logo-fg': '#27272A', '--accent': '#18181B', '--accent-fg': '#FFFFFF', '--soft': '#F4F4F5', '--line': '#E4E4E7', '--ink': '#18181B', '--mark': '#2563EB' } },
      { nome: 'Ardósia', vars: { '--bg': '#F1F5F9', '--rail': '#334155', '--dot': '#E2E8F0', '--logo-bg': '#E2E8F0', '--logo-fg': '#334155', '--accent': '#2563EB', '--accent-fg': '#FFFFFF', '--soft': '#F1F5F9', '--line': '#E2E8F0', '--ink': '#0F172A', '--mark': '#F97316' } },
      { nome: 'Papel', vars: { '--bg': '#FAFAFA', '--rail': '#F4F4F5', '--dot': '#27272A', '--logo-bg': '#27272A', '--logo-fg': '#F4F4F5', '--accent': '#27272A', '--accent-fg': '#FFFFFF', '--soft': '#FAFAFA', '--line': '#E4E4E7', '--ink': '#18181B', '--mark': '#2563EB' } },
      { nome: 'Tinta', vars: { '--bg': '#EEF2FF', '--rail': '#0B0B0F', '--dot': '#A5B4FC', '--logo-bg': '#A5B4FC', '--logo-fg': '#0B0B0F', '--accent': '#4F46E5', '--accent-fg': '#FFFFFF', '--soft': '#EEF2FF', '--line': '#E0E7FF', '--ink': '#111827', '--mark': '#A5B4FC' } }
    ]
  }
];

const DiscCtx = createContext(familias[0].disc);
export const useDisc = () => useContext(DiscCtx);

// Modo escuro: superfícies escuras, mantém as cores do tema
const EscuroCtx = createContext(false);
// variáveis de cor ativas (para SVG/gráficos, que não leem var())
const VarsCtx = createContext<Record<string, string>>({});
export const useVars = () => useContext(VarsCtx);
export const useEscuro = () => useContext(EscuroCtx);
// cor do texto de uma disciplina, legível nos dois modos
export const txt = (texto: string, cor: string, escuro: boolean) =>
  escuro ? `color-mix(in srgb, ${cor} 55%, white)` : texto;
const varsEscuro = { '--surface': '#17171B', '--soft': '#24242A', '--line': '#32323A', '--ink': '#ECECF1' };

// Estilos partilhados pelas páginas
export const btn = 'rounded-lg border px-4 py-1.5 text-sm font-medium transition';
export const ativo = 'border-(--accent) bg-(--accent) text-(--accent-fg)';
export const inativo = 'border-(--line) bg-white text-(--ink) hover:bg-(--soft)';
export const card = 'bg-white border-r border-(--line) last:border-r-0';
export const tint = (cor: string, pct = 16) => `color-mix(in srgb, ${cor} ${pct}%, var(--surface, white))`;

// Contas (função dev, sem backend): cada papel vê só algumas páginas
// Navegação por tipo de conta (função dev, sem backend)
type Item = { nome: string; href: string; icon: (typeof Icons)[keyof typeof Icons]; sub?: Item[] };

const navAdmin: Item[] = [
  { nome: 'Eventos e aniversários', href: '/admin/eventos', icon: Icons.sparkles },
  { nome: 'Gestão de contas', href: '/admin/contas', icon: Icons.account },
  { nome: 'Matrículas', href: '/admin/matriculas', icon: Icons.forms },
  { nome: 'Tutores e funcionários', href: '/admin/tutores', icon: Icons.teams },
  { nome: 'Mapa geral', href: '/admin/mapa', icon: Icons.dashboard },
  { nome: 'Mensagens', href: '/mensagens', icon: Icons.chat },
  {
    nome: 'Finanças',
    href: '/financas',
    icon: Icons.billing,
    sub: [
      { nome: 'Pagamentos', href: '/pagamentos', icon: Icons.creditCard },
      { nome: 'Custos', href: '/financas/custos', icon: Icons.product },
      { nome: 'Análise financeira', href: '/financas/analise', icon: Icons.trendingUp }
    ]
  }
];

const navTutor: Item[] = [
  { nome: 'Página inicial', href: '/inicio', icon: Icons.notification },
  { nome: 'Horário', href: '/', icon: Icons.calendar },
  { nome: 'Mapa da aula', href: '/tutor/aula', icon: Icons.checks },
  { nome: 'Os meus alunos', href: '/alunos', icon: Icons.teams },
  { nome: 'Mapa de férias', href: '/tutor/ferias', icon: Icons.clock },
  { nome: 'Mensagens', href: '/mensagens', icon: Icons.chat }
];

const navAluno: Item[] = [
  { nome: 'Página inicial', href: '/inicio', icon: Icons.notification },
  { nome: 'Assiduidade', href: '/aluno/assiduidade', icon: Icons.circleCheck },
  { nome: 'Diário', href: '/aluno/diario', icon: Icons.post },
  { nome: 'Mapa de notas', href: '/aluno/notas', icon: Icons.badgeCheck },
  { nome: 'Progresso', href: '/aluno/progresso', icon: Icons.trendingUp },
  { nome: 'Mensagens', href: '/mensagens', icon: Icons.chat },
  { nome: 'Pagamentos', href: '/pagamentos', icon: Icons.billing } // só o EE vê
];

const hrefs = (items: Item[]): string[] => items.flatMap((i) => (i.sub ? hrefs(i.sub) : [i.href]));

const papeis = [
  { nome: 'Admin', ini: 'AD', nav: navAdmin },
  { nome: 'Tutor', ini: 'TU', nav: navTutor },
  { nome: 'Aluno / EE', ini: 'EE', nav: navAluno }
].map((p) => ({ ...p, paginas: hrefs(p.nav) }));
const PapelCtx = createContext(papeis[0]);
export const usePapel = () => useContext(PapelCtx);

// título de uma rota (para as páginas ainda por fazer)
const todos = [navAdmin, navTutor, navAluno].flatMap((n) => n.flatMap((i) => [i, ...(i.sub ?? [])]));
export const tituloDe = (href: string) => todos.find((i) => i.href === href)?.nome ?? 'Página';

export default function Shell({ children }: { children: React.ReactNode }) {
  // por defeito: Floresta · Pinho
  const [fi, setFi] = useState(2);
  const [si, setSi] = useState(0);
  const [temaAberto, setTemaAberto] = useState(false);
  const [marcaVar, setMarcaVar] = useState(1); // logo Espaçado por defeito
  const [escuro, setEscuro] = useState(false);
  const [pi, setPi] = useState(0);
  const [grupoAberto, setGrupoAberto] = useState(false);

  const itemCls =
    'group flex items-center gap-3 rounded-xl py-2 transition-[padding,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-(--mark)/15';
  const iconCls =
    'size-6 shrink-0 text-(--dot) transition-all duration-200 group-hover:scale-110 group-hover:text-(--mark) group-hover:opacity-100';
  const labelCls =
    'text-sm font-medium whitespace-nowrap text-(--dot) transition-[opacity,transform,color] duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:text-(--mark)';
  const labelOn = 'translate-x-0 opacity-100 delay-100';
  const labelOff = '-translate-x-1 opacity-0 duration-200';

  const NavLink = ({ item, pequeno }: { item: Item; pequeno?: boolean }) => {
    const atual = path === item.href;
    return (
      <Link
        href={item.href}
        title={item.nome}
        onClick={(e) => {
          e.preventDefault();
          if (atual) return;
          crossfade();
          router.push(item.href);
        }}
        className={cn(itemCls, aberta ? (pequeno ? 'px-2' : 'px-4') : 'px-2', pequeno && 'py-1.5', atual && 'bg-(--dot)/15')}
      >
        <item.icon className={cn(iconCls, pequeno && 'size-5', !atual && 'opacity-60')} stroke={atual ? 2.2 : 1.8} />
        <span className={cn(labelCls, pequeno && 'text-[13px]', aberta ? labelOn : labelOff)}>{item.nome}</span>
      </Link>
    );
  };
  const [menuPapel, setMenuPapel] = useState(false);
  const papel = papeis[pi];
  // componentes shadcn (checkbox, toasts…) seguem a classe .dark
  useEffect(() => {
    document.documentElement.classList.toggle('dark', escuro);
  }, [escuro]);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setTemaAberto(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, []);
  const [aberta, setAberta] = useState(false);
  const path = usePathname();
  const router = useRouter();
  // se a conta nova não tem acesso à página atual, vai para a primeira página dela
  useEffect(() => {
    if (!papel.paginas.includes(path)) router.push(papel.paginas[0]);
  }, [papel, path, router]);
  const conteudo = useRef<HTMLDivElement>(null);
  const fantasma = useRef<HTMLDivElement>(null);

  // Tira uma "fotografia" da página atual e desvanece-a por cima da nova
  const crossfade = () => {
    const atual = conteudo.current;
    const alvo = fantasma.current;
    if (!atual || !alvo) return;
    const copia = atual.cloneNode(true) as HTMLElement;
    copia.removeAttribute('style');
    copia.style.cssText = 'position:absolute;inset:0;display:flex;background:var(--surface, white)';
    alvo.replaceChildren(copia);
  };

  // Quando a nova página chega, a cópia da anterior desvanece enquanto a nova entra
  useEffect(() => {
    const copia = fantasma.current?.firstElementChild as HTMLElement | null;
    if (!copia) return;
    copia
      .animate(
        [
          { opacity: 1, filter: 'blur(0)', transform: 'scale(1)' },
          { opacity: 0, filter: 'blur(6px)', transform: 'scale(1.006)' }
        ],
        { duration: 380, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' }
      )
      .finished.then(() => copia.remove());
  }, [path]);
  const familia = familias[fi];
  const sub = familia.subs[si];

  return (
    <PapelCtx.Provider value={papel}>
    <EscuroCtx.Provider value={escuro}>
    <VarsCtx.Provider value={{ '--surface': '#FFFFFF', ...sub.vars, ...(escuro ? varsEscuro : {}) }}>
    <DiscCtx.Provider value={familia.disc}>
      <div
        style={{ '--surface': '#FFFFFF', ...sub.vars, ...(escuro ? varsEscuro : {}) } as CSSProperties}
        className={cn('flex h-screen bg-white text-(--ink)', escuro && 'escuro')}
      >
        <aside
          className={cn(
            'flex shrink-0 flex-col gap-2 overflow-hidden bg-(--rail) px-3 pb-4 transition-[width] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
            aberta ? 'w-60' : 'w-16'
          )}
        >
          <button
            onClick={() => setAberta((a) => !a)}
            title={aberta ? 'Recolher' : 'Expandir'}
            className='flex h-16 w-full shrink-0 items-center justify-center'
          >
            <Logo className='size-10 shrink-0' />
            <span
              className={cn(
                marca.className,
                'overflow-hidden leading-10 font-extrabold whitespace-nowrap text-(--dot) transition-[max-width,margin,opacity,letter-spacing] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
                aberta ? 'ml-2.5 max-w-[150px] opacity-100' : 'ml-0 max-w-0 opacity-0',
                // A · Simples
                marcaVar === 0 && 'text-[28px] tracking-tight',
                // B · Espaçado: as letras afastam-se ligeiramente
                marcaVar === 1 && (aberta ? 'text-[28px] tracking-[0.12em]' : 'text-[28px] tracking-tight'),
                // C · Maior
                marcaVar === 2 && 'text-[34px] tracking-tight'
              )}
            >
              Lousa
            </span>
          </button>
          {/* separador entre o logo e o menu */}
          <div className='mx-1 -mt-2 mb-3 h-px shrink-0 bg-(--dot)/15' />
          <nav className='-mx-1 flex min-h-0 flex-col gap-1 overflow-x-hidden overflow-y-auto px-1'>
            {papel.nav.map((n) => {
              if (n.sub) {
                const ativoGrupo = n.sub.some((x) => x.href === path);
                const abertoGrupo = grupoAberto || ativoGrupo;
                return (
                  <div key={n.href}>
                    <button
                      onClick={() => setGrupoAberto((g) => !g)}
                      title={n.nome}
                      className={cn(itemCls, 'w-full', aberta ? 'px-4' : 'px-2', ativoGrupo && !aberta && 'bg-(--dot)/15')}
                    >
                      <n.icon className={cn(iconCls, !ativoGrupo && 'opacity-60')} stroke={ativoGrupo ? 2.2 : 1.8} />
                      <span className={cn(labelCls, 'flex-1 text-left', aberta ? labelOn : labelOff)}>{n.nome}</span>
                      <Icons.chevronDown
                        className={cn(
                          'size-4 shrink-0 text-(--dot) opacity-60 transition-transform duration-300',
                          abertoGrupo && 'rotate-180',
                          !aberta && 'hidden'
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        'grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
                        abertoGrupo ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      )}
                    >
                      <div className={cn('flex flex-col gap-1 overflow-hidden', aberta && 'ml-5 border-l border-(--dot)/15 pl-2')}>
                        <div className='h-1 shrink-0' />
                        {n.sub.map((x) => (
                          <NavLink key={x.href} item={x} pequeno />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return <NavLink key={n.href} item={n} />;
            })}
          </nav>
          {/* Troca de conta (dev) */}
          <div className='mt-auto'>
            <div
              className={cn(
                'grid transition-[grid-template-rows,opacity] duration-300',
                menuPapel ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className='overflow-hidden'>
                <div className='mb-1 space-y-0.5 rounded-xl bg-(--dot)/10 p-1'>
                  {papeis.map((p, i) => (
                    <button
                      key={p.nome}
                      title={p.nome}
                      tabIndex={menuPapel ? 0 : -1}
                      onClick={() => {
                        setPi(i);
                        setMenuPapel(false);
                      }}
                      className={cn(
                        'flex w-full items-center gap-2 rounded-lg px-1 py-1 text-left text-(--dot) transition-colors hover:bg-(--mark)/15 hover:text-(--mark)',
                        pi === i && 'bg-(--dot)/15'
                      )}
                    >
                      <span className='flex size-6 shrink-0 items-center justify-center rounded-full bg-(--dot)/15 text-[10px] font-bold'>
                        {p.ini}
                      </span>
                      <span className={cn('text-xs font-medium whitespace-nowrap transition-opacity', aberta ? 'opacity-100' : 'opacity-0')}>
                        {p.nome}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => setMenuPapel((m) => !m)}
              title={`Conta: ${papel.nome} (dev)`}
              className='group mb-1 flex w-full items-center gap-2.5 rounded-xl px-1 py-1.5 text-left text-(--dot) transition-colors hover:bg-(--mark)/15'
            >
              <span className='flex size-8 shrink-0 items-center justify-center rounded-full bg-(--dot)/15 text-xs font-bold group-hover:text-(--mark)'>
                {papel.ini}
              </span>
              <span className={cn('min-w-0 flex-1 transition-opacity duration-300', aberta ? 'opacity-100 delay-100' : 'opacity-0')}>
                <span className='block truncate text-sm font-medium whitespace-nowrap'>{papel.nome}</span>
                <span className='block text-[10px] tracking-wide whitespace-nowrap uppercase opacity-60'>Conta · dev</span>
              </span>
              <Icons.chevronsUpDown className={cn('size-4 shrink-0 opacity-60 transition-opacity', !aberta && 'hidden')} />
            </button>
          </div>
          <div className={cn('flex gap-2', aberta ? 'flex-row items-center justify-between' : 'flex-col-reverse')}>
            <button
              onClick={() => setAberta((a) => !a)}
              title={aberta ? 'Recolher' : 'Expandir'}
              className='flex size-10 items-center justify-center rounded-xl text-(--dot) transition-colors hover:bg-(--mark)/15 hover:text-(--mark)'
            >
              <Icons.chevronsRight
                className={cn('size-5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]', aberta && 'rotate-180')}
              />
            </button>
            <div className={cn('flex gap-2', aberta ? 'flex-row' : 'flex-col-reverse')}>
            <button
              onClick={(ev) => startThemeTransition(() => flushSync(() => setEscuro((e) => !e)), ev)}
              title={escuro ? 'Modo claro' : 'Modo escuro'}
              className='group flex size-10 items-center justify-center text-(--dot) transition-colors hover:text-(--mark)'
            >
              {escuro ? (
                <Icons.sun className='size-5 transition-transform duration-500 group-hover:rotate-45' />
              ) : (
                <Icons.moon className='size-5 transition-transform duration-500 group-hover:-rotate-12' />
              )}
            </button>
            <button
              onClick={() => setTemaAberto((o) => !o)}
              title='Definições'
              className='group flex size-10 items-center justify-center text-(--dot) transition-colors hover:text-(--mark)'
            >
              <Icons.settings className='size-5 transition-transform duration-500 group-hover:rotate-90' />
            </button>
            </div>
          </div>
        </aside>

        <style>{`
          .escuro .bg-white { background-color: var(--surface) !important; }
          .escuro input { color: var(--ink); }
          @keyframes page-in {
            from { opacity: 0; filter: blur(4px); transform: scale(0.994); }
            to { opacity: 1; filter: blur(0); transform: none; }
          }
        `}</style>
        <div className='relative flex min-w-0 flex-1'>
          <div
            key={path}
            ref={conteudo}
            className='flex min-w-0 flex-1'
            style={{ animation: 'page-in 420ms cubic-bezier(0.22, 1, 0.36, 1) both' }}
          >
            {children}
          </div>
          {/* cópia da página anterior, que desvanece por cima da nova (crossfade) */}
          <div ref={fantasma} className='pointer-events-none absolute inset-0 z-10' />
        </div>

        {/* Pop-up de definições (centro do ecrã) */}
        <div
          onClick={() => setTemaAberto(false)}
          className={cn(
            'fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px] transition-opacity duration-300',
            temaAberto ? 'opacity-100' : 'pointer-events-none opacity-0'
          )}
        >
          <div
            role='dialog'
            aria-modal='true'
            aria-label='Definições'
            onClick={(e) => e.stopPropagation()}
            className={cn(
              'w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
              temaAberto ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-3 scale-95 opacity-0'
            )}
          >
            <header className='flex items-center justify-between border-b border-(--line) px-6 py-4'>
              <div>
                <h2 className='text-xl font-extrabold'>Definições</h2>
                <p className='text-xs opacity-60'>Aparência da plataforma</p>
              </div>
              <button
                onClick={() => setTemaAberto(false)}
                title='Fechar'
                className='flex size-9 items-center justify-center rounded-lg transition-colors hover:bg-(--soft)'
              >
                <Icons.close className='size-5' />
              </button>
            </header>

            <div className='max-h-[70vh] space-y-6 overflow-auto px-6 py-5'>
              <section>
                <h3 className='mb-3 text-xs font-semibold tracking-wide uppercase opacity-60'>Tema</h3>
                <div className='space-y-4'>
                  {familias.map((fm, i) => (
                    <div key={fm.nome}>
                      <div className='mb-2 text-sm font-semibold'>{fm.nome}</div>
                      <div className='grid grid-cols-2 gap-2 sm:grid-cols-4'>
                        {fm.subs.map((sb, j) => {
                          const sel = fi === i && si === j;
                          return (
                            <button
                              key={sb.nome}
                              onClick={(ev) =>
                                startThemeTransition(
                                  () =>
                                    flushSync(() => {
                                      setFi(i);
                                      setSi(j);
                                    }),
                                  ev
                                )
                              }
                              className={cn(
                                'group rounded-xl border-2 p-1.5 text-left transition-all',
                                sel ? 'border-(--accent)' : 'border-transparent hover:border-(--line)'
                              )}
                            >
                              {/* mini pré-visualização: barra + conteúdo */}
                              <div className='flex h-16 overflow-hidden rounded-lg ring-1 ring-black/10'>
                                <div className='flex w-5 flex-col items-center gap-1 pt-1.5' style={{ background: sb.vars['--rail'] }}>
                                  {[0, 1, 2].map((d) => (
                                    <span key={d} className='size-1.5 rounded-full' style={{ background: sb.vars['--dot'] }} />
                                  ))}
                                </div>
                                <div className='flex flex-1 flex-col gap-1 bg-white p-1.5'>
                                  <span className='h-1.5 w-8 rounded-full' style={{ background: sb.vars['--ink'] }} />
                                  <span className='h-2.5 w-10 rounded' style={{ background: sb.vars['--accent'] }} />
                                  <span className='mt-auto h-3 rounded' style={{ background: sb.vars['--soft'] }} />
                                </div>
                              </div>
                              <div className='mt-1.5 flex items-center justify-between px-0.5 text-xs font-medium'>
                                {sb.nome}
                                {sel && <Icons.check className='size-3.5 text-(--accent)' />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className='mb-3 text-xs font-semibold tracking-wide uppercase opacity-60'>Logo</h3>
                <div className='flex gap-2'>
                  {['Simples', 'Espaçado', 'Maior'].map((v, i) => (
                    <button
                      key={v}
                      onClick={() => {
                        setMarcaVar(i);
                        setAberta(true);
                      }}
                      className={cn(btn, marcaVar === i ? ativo : inativo)}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

      </div>
    </DiscCtx.Provider>
    </VarsCtx.Provider>
    </EscuroCtx.Provider>
    </PapelCtx.Provider>
  );
}

export function PageCard({
  titulo,
  acoes,
  children
}: {
  titulo: string;
  acoes?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main className={cn(card, 'flex min-w-0 flex-1 flex-col overflow-hidden')}>
      <header className='flex items-center justify-between gap-3 px-6 pt-5 pb-3'>
        <h1 className='text-3xl font-extrabold'>{titulo}</h1>
        {acoes}
      </header>
      {children}
    </main>
  );
}

// Logo (quadro + marcador) desenhado em SVG para herdar as cores da paleta
function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox='0 0 48 40' fill='none' strokeLinecap='round' strokeLinejoin='round' className={className}>
      <rect x='5' y='5' width='38' height='25' rx='4' stroke='var(--dot)' strokeWidth='3' fill='var(--dot)' fillOpacity='0.1' />
      <path d='M2.5 33.5h43' stroke='var(--dot)' strokeWidth='4' />
      <path d='M11 12h16M11 17h13M11 22h9' stroke='var(--dot)' strokeWidth='2.5' />
      <rect x='11' y='27' width='8' height='4' rx='1.2' fill='var(--mark)' />
      <path d='M21 27.5c3-2 5.5-1.6 8-.8s4.5.6 6.5-.6' stroke='var(--mark)' strokeWidth='2' />
      <g transform='rotate(32 36 16)'>
        <rect x='33' y='5' width='6.5' height='16' rx='2' fill='var(--mark)' stroke='var(--dot)' strokeWidth='2' />
        <path d='M33.5 21h5.5l-2.75 5z' fill='var(--dot)' />
      </g>
    </svg>
  );
}
