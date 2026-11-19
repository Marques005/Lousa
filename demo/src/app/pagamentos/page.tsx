'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { cn } from '@/components/lib/utils';
import { Icons } from '@/components/icons';
import { PageCard, ativo, btn, inativo, useVars } from '../shell';

type Estado = 'Pago' | 'Pendente' | 'Em atraso';

const inicial: { id: number; aluno: string; mes: string; valor: number; estado: Estado }[] = [
  { id: 1, aluno: 'Ana Silva', mes: 'Novembro', valor: 120, estado: 'Pago' },
  { id: 2, aluno: 'João Costa', mes: 'Novembro', valor: 150, estado: 'Em atraso' },
  { id: 3, aluno: 'Marta Lopes', mes: 'Novembro', valor: 90, estado: 'Pago' },
  { id: 4, aluno: 'Rui Pereira', mes: 'Novembro', valor: 120, estado: 'Pendente' },
  { id: 5, aluno: 'Inês Martins', mes: 'Novembro', valor: 110, estado: 'Pago' },
  { id: 6, aluno: 'Tiago Rocha', mes: 'Outubro', valor: 90, estado: 'Em atraso' },
  { id: 7, aluno: 'Beatriz Sousa', mes: 'Novembro', valor: 150, estado: 'Pendente' },
  { id: 8, aluno: 'Diogo Nunes', mes: 'Novembro', valor: 110, estado: 'Pago' }
];

// Histórico mensal (mock): receita e alunos ativos
const historico = [
  { mes: 'Dez', receita: 4200, alunos: 52 },
  { mes: 'Jan', receita: 4650, alunos: 58 },
  { mes: 'Fev', receita: 5100, alunos: 63 },
  { mes: 'Mar', receita: 5480, alunos: 69 },
  { mes: 'Abr', receita: 5300, alunos: 71 },
  { mes: 'Mai', receita: 6050, alunos: 78 },
  { mes: 'Jun', receita: 5200, alunos: 74 },
  { mes: 'Jul', receita: 3900, alunos: 61 },
  { mes: 'Ago', receita: 3400, alunos: 55 },
  { mes: 'Set', receita: 7600, alunos: 102 },
  { mes: 'Out', receita: 8750, alunos: 117 },
  { mes: 'Nov', receita: 9420, alunos: 128 }
];

const estilo: Record<Estado, string> = {
  Pago: 'bg-emerald-100 text-emerald-800',
  Pendente: 'bg-amber-100 text-amber-800',
  'Em atraso': 'bg-red-100 text-red-700'
};

const euros = (v: number) => `${v.toLocaleString('pt-PT')} €`;
const variacao = (k: 'receita' | 'alunos') => {
  const [a, b] = historico.slice(-2);
  return ((b[k] - a[k]) / a[k]) * 100;
};

function Dica({
  active,
  payload,
  label,
  fmt
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
  fmt: (v: number) => string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className='rounded-lg border border-(--line) bg-white px-3 py-2 text-xs shadow-lg'>
      <div className='opacity-60'>{label}</div>
      <div className='text-sm font-bold'>{fmt(payload[0].value)}</div>
    </div>
  );
}

function Grafico({
  titulo,
  valor,
  delta,
  children
}: {
  titulo: string;
  valor: string;
  delta: number;
  children: React.ReactElement;
}) {
  const sobe = delta >= 0;
  return (
    <div className='rounded-xl border border-(--line) p-4'>
      <div className='flex items-start justify-between'>
        <div>
          <div className='text-xs opacity-60'>{titulo}</div>
          <div className='text-2xl font-extrabold'>{valor}</div>
        </div>
        <span
          className={cn(
            'flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold',
            sobe ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'
          )}
        >
          {sobe ? <Icons.trendingUp className='size-3.5' /> : <Icons.trendingDown className='size-3.5' />}
          {sobe ? '+' : ''}
          {delta.toFixed(1)}% vs mês anterior
        </span>
      </div>
      <div className='mt-3 h-52'>
        <ResponsiveContainer width='100%' height='100%'>
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function PagamentosPage() {
  const v = useVars();
  const [linhas, setLinhas] = useState(inicial);
  const [filtro, setFiltro] = useState<Estado | 'Todos'>('Todos');

  const soma = (e: Estado) => linhas.filter((l) => l.estado === e).reduce((s, l) => s + l.valor, 0);
  const total = linhas.reduce((s, l) => s + l.valor, 0);
  const visiveis = linhas.filter((l) => filtro === 'Todos' || l.estado === filtro);

  const pagar = (id: number) => {
    setLinhas((ls) => ls.map((l) => (l.id === id ? { ...l, estado: 'Pago' } : l)));
    toast.success('Pagamento registado');
  };

  const kpis = [
    { label: 'Faturado', valor: total },
    { label: 'Recebido', valor: soma('Pago') },
    { label: 'Pendente', valor: soma('Pendente') },
    { label: 'Em atraso', valor: soma('Em atraso') }
  ];

  const eixo = { stroke: v['--ink'], opacity: 0.5, fontSize: 12 };
  const ultimo = historico.at(-1)!;

  return (
    <PageCard
      titulo='Pagamentos'
      acoes={
        <button className={cn(btn, ativo)} onClick={() => toast('Recibos enviados (mock)')}>
          Enviar recibos
        </button>
      }
    >
      <div className='flex-1 overflow-auto'>
        {/* Crescimento */}
        <div className='grid gap-4 px-6 pb-4 xl:grid-cols-2'>
          <Grafico titulo='Receita mensal' valor={euros(ultimo.receita)} delta={variacao('receita')}>
            <BarChart data={historico} margin={{ top: 4, right: 4, left: -8, bottom: 0 }} barCategoryGap={6}>
              <CartesianGrid vertical={false} stroke={v['--line']} />
              <XAxis dataKey='mes' tickLine={false} axisLine={false} tick={eixo} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={eixo}
                tickFormatter={(n) => `${n / 1000}k`}
                width={40}
              />
              <Tooltip
                cursor={{ fill: v['--soft'], opacity: 0.6 }}
                content={<Dica fmt={euros} />}
              />
              <Bar dataKey='receita' fill={v['--accent']} radius={[4, 4, 0, 0]} />
            </BarChart>
          </Grafico>

          <Grafico titulo='Alunos ativos' valor={`${ultimo.alunos}`} delta={variacao('alunos')}>
            <AreaChart data={historico} margin={{ top: 4, right: 4, left: -8, bottom: 0 }}>
              <defs>
                <linearGradient id='grad-alunos' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='0%' stopColor={v['--accent']} stopOpacity={0.3} />
                  <stop offset='100%' stopColor={v['--accent']} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke={v['--line']} />
              <XAxis dataKey='mes' tickLine={false} axisLine={false} tick={eixo} />
              <YAxis tickLine={false} axisLine={false} tick={eixo} width={40} />
              <Tooltip
                cursor={{ stroke: v['--ink'], strokeOpacity: 0.3, strokeDasharray: '3 3' }}
                content={<Dica fmt={(n) => `${n} alunos`} />}
              />
              <Area
                type='monotone'
                dataKey='alunos'
                stroke={v['--accent']}
                strokeWidth={2}
                fill='url(#grad-alunos)'
                activeDot={{ r: 5, stroke: v['--surface'], strokeWidth: 2 }}
              />
            </AreaChart>
          </Grafico>
        </div>

        {/* Este mês */}
        <div className='grid grid-cols-2 gap-3 px-6 pb-4 md:grid-cols-4'>
          {kpis.map((k) => (
            <div key={k.label} className='rounded-xl bg-(--soft) p-4'>
              <div className='text-xs opacity-70'>{k.label}</div>
              <div className='text-2xl font-extrabold'>{euros(k.valor)}</div>
            </div>
          ))}
        </div>

        <div className='flex gap-2 border-y border-(--line) bg-(--soft)/50 px-6 py-4'>
          {(['Todos', 'Pago', 'Pendente', 'Em atraso'] as const).map((f) => (
            <button key={f} className={cn(btn, filtro === f ? ativo : inativo)} onClick={() => setFiltro(f)}>
              {f}
            </button>
          ))}
        </div>

        <div className='px-6 py-2'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='text-left text-xs opacity-60'>
                <th className='py-2 font-medium'>Aluno</th>
                <th className='font-medium'>Mês</th>
                <th className='font-medium'>Valor</th>
                <th className='font-medium'>Estado</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {visiveis.map((l) => (
                <tr key={l.id} className='border-t border-(--line)'>
                  <td className='py-3 font-medium'>{l.aluno}</td>
                  <td>{l.mes}</td>
                  <td>{euros(l.valor)}</td>
                  <td>
                    <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium', estilo[l.estado])}>
                      {l.estado}
                    </span>
                  </td>
                  <td className='text-right'>
                    {l.estado !== 'Pago' && (
                      <button className={cn(btn, inativo, 'py-1 text-xs')} onClick={() => pagar(l.id)}>
                        Marcar pago
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageCard>
  );
}
