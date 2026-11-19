// Alunos de demonstração, gerados a partir de mockAlunos/alunos_mock.csv (dados fictícios)
import dados from './alunos.json';

export type Aluno = (typeof dados)[number];
export const alunos: Aluno[] = dados;

export const getAluno = (id: string) => alunos.find((a) => a.id === id);

// Escala 1–5 (9.º ano) ou 0–20 (secundário)
export const notaMax = (a: Aluno) => (a.escala === '1-5' ? 5 : 20);
export const positiva = (a: Aluno, nota: number) => nota >= (a.escala === '1-5' ? 3 : 10);

export const iniciais = (nome: string) =>
  nome
    .split(' ')
    .filter((_, i, arr) => i === 0 || i === arr.length - 1)
    .map((n) => n[0])
    .join('');

export const dataPt = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });
