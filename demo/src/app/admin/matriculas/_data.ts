// Dados de apoio às matrículas: mensalidade e encarregados de educação já existentes
import { type Aluno, alunos } from '../../alunos/_data';

export type EE = Aluno['ees'][number];

export type Matricula = {
  id: string;
  nome: string;
  nascimento: string;
  ano: number;
  turma: string;
  contacto: string;
  ees: EE[];
  horasMes: number;
  precoMensal: number;
  criadaEm: string;
  alunoId?: string; // tem ficha completa em /alunos/[id]
};

// Mensalidade (função dev, sem faturação real): varia com o ano de escolaridade e as horas do mês
const taxaHora = (ano: number) => (ano <= 9 ? 15 : 18);
export const horasMes = (a: { id: string; ano: number }) => {
  const seed = [...a.id].reduce((s, c) => s + c.charCodeAt(0), 0);
  return 4 + (a.ano - 9) * 2 + (seed % 3);
};
export const precoMensal = (a: { id: string; ano: number }) => Math.round((horasMes(a) * taxaHora(a.ano)) / 5) * 5;

export const matriculasExistentes: Matricula[] = alunos.map((a) => ({
  id: a.id,
  nome: a.nome,
  nascimento: a.nascimento,
  ano: a.ano,
  turma: a.turma,
  contacto: `${a.telefone} · ${a.email}`,
  ees: a.ees,
  horasMes: horasMes(a),
  precoMensal: precoMensal(a),
  criadaEm: a.dataMatricula,
  alunoId: a.id
}));

// Encarregados de educação já existentes (para associar irmãos numa nova matrícula)
export type EEExistente = EE & { alunos: string[] };
export const eesExistentes: EEExistente[] = (() => {
  const mapa = new Map<string, EEExistente>();
  for (const a of alunos) {
    for (const ee of a.ees) {
      const atual = mapa.get(ee.email);
      if (atual) atual.alunos.push(a.nome);
      else mapa.set(ee.email, { ...ee, alunos: [a.nome] });
    }
  }
  return [...mapa.values()].sort((x, y) => x.nome.localeCompare(y.nome));
})();
