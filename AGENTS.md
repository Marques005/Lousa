# AGENTS.md

Instruções para agentes de IA (Claude Code, Codex, etc.) que trabalham neste repositório.

## Projeto

- `demo/`: webapp mock da Lousa (Next.js 16, React 19, Tailwind v4). Corre com `npm --prefix demo run dev` (porta 3000).
- `components/`: biblioteca de componentes partilhada (importada como `@/components/...`).
- `mockAlunos/`: dados fictícios dos alunos (CSV + fotos). O `demo/src/app/alunos/_data/alunos.json` é gerado a partir daqui.
- Textos da interface em português de Portugal.

## Commits

- **Faz commits pequenos e frequentes enquanto escreves código**, sem esperar pelo fim da tarefa: um commit por cada passo que fique a funcionar (uma página nova, um componente, uma correção, um ajuste visual pedido).
- Antes de cada commit confirma que o projeto compila: `cd demo && npx tsc --noEmit -p .`.
- Mensagens curtas em português, no imperativo, a dizer o que mudou (ex.: `Adiciona ficha do aluno`, `Mostra só as 3 últimas avaliações`).
- Só adiciona os ficheiros que alteraste (`git add <ficheiros>`), nunca `git add -A` às cegas.
- Não commites artefactos de build nem dependências: `node_modules/`, `.next/`, `.DS_Store`.
- Trabalha no ramo atual; não faças `push` nem reescrevas histórico (`rebase`, `--amend`, `reset --hard`) sem pedido explícito.
