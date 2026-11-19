// Contas de admin/tutor (dados fictícios, função dev sem backend)
export type Papel = 'Admin' | 'Tutor';

export type Conta = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  papeis: Papel[];
  ativa: boolean;
  criadaEm: string;
};

export const contasIniciais: Conta[] = [
  {
    id: 'CNT001',
    nome: 'Beatriz Fonseca',
    email: 'beatriz.fonseca@example.com',
    telefone: '+351 000 300 001',
    papeis: ['Admin'],
    ativa: true,
    criadaEm: '2025-09-01'
  },
  {
    id: 'CNT002',
    nome: 'Tiago Dias',
    email: 'diretor.9a@example.com',
    telefone: '+351 000 300 002',
    papeis: ['Admin', 'Tutor'],
    ativa: true,
    criadaEm: '2025-09-01'
  },
  {
    id: 'CNT003',
    nome: 'Rita Teixeira',
    email: 'rita.teixeira@example.com',
    telefone: '+351 000 300 003',
    papeis: ['Tutor'],
    ativa: true,
    criadaEm: '2025-09-10'
  },
  {
    id: 'CNT004',
    nome: 'Nuno Cardoso',
    email: 'nuno.cardoso@example.com',
    telefone: '+351 000 300 004',
    papeis: ['Tutor'],
    ativa: true,
    criadaEm: '2025-09-10'
  },
  {
    id: 'CNT005',
    nome: 'Ana Esteves',
    email: 'ana.esteves@example.com',
    telefone: '+351 000 300 005',
    papeis: ['Tutor'],
    ativa: true,
    criadaEm: '2025-10-02'
  },
  {
    id: 'CNT006',
    nome: 'Hugo Marques',
    email: 'hugo.marques@example.com',
    telefone: '+351 000 300 006',
    papeis: ['Tutor'],
    ativa: true,
    criadaEm: '2025-10-02'
  },
  {
    id: 'CNT007',
    nome: 'Sara Pinho',
    email: 'sara.pinho@example.com',
    telefone: '+351 000 300 007',
    papeis: ['Tutor'],
    ativa: true,
    criadaEm: '2025-11-05'
  },
  {
    id: 'CNT008',
    nome: 'Luís Ramos',
    email: 'luis.ramos@example.com',
    telefone: '+351 000 300 008',
    papeis: ['Tutor'],
    ativa: false,
    criadaEm: '2025-06-15'
  }
];
