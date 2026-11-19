# components/

Set de componentes extraído do `next-shadcn-dashboard-starter` (Next.js 16 + shadcn/ui base-nova + Tailwind v4), organizado para a plataforma de gestão de centros de estudo.

A pasta é **autocontida**: todos os imports internos usam `@/components/...`, por isso basta ter o alias `@/*` a apontar para a pasta que contém `components/` (ex.: `src/`).

Validado com `tsc --noEmit` (0 erros) contra as dependências do starter.

## Como usar

1. Copiar `components/` para `src/components/` do projeto Next.js.
2. `tsconfig.json` → `"paths": { "@/*": ["./src/*"] }`.
3. No root layout: `import '@/components/styles/globals.css';` (ver `blocks/app-shell/root-layout.tsx`).
4. `components.json` (shadcn CLI): `utils` → `@/components/lib/utils`, `lib` → `@/components/lib`, `hooks` → `@/components/hooks`.
5. Instalar as dependências (secção abaixo).

## Estrutura

| Pasta | O quê | Uso no ERP |
|---|---|---|
| `ui/` | 70+ primitivas shadcn (button, card, dialog, sheet, table, tabs, calendar, chart, combobox, kanban, sidebar, notification-card, empty, field, input-group, …) | Base de tudo |
| `data-table/` | Tabela TanStack completa: paginação, ordenação, filtros facetados, filtro de datas, slider, visibilidade de colunas, skeleton | Listas de alunos, encarregados, turmas, pagamentos, faturas |
| `forms/fields/` | Campos TanStack Form + Zod: text, textarea, select, combobox, checkbox(-group), radio, switch, slider, date-picker, tags, OTP, color, file-upload, toggle-group | Fichas de aluno, matrículas, inscrições |
| `forms/` | `submit-button`, `demo-form` (referência de todos os campos) | |
| `layout/` | `app-sidebar`, `header`, `page-container` (título/descrição/ação), `providers`, `query-provider`, `user-nav`, `info-sidebar` | Shell da aplicação |
| `modal/` | `alert-modal` (confirmação destrutiva) | Apagar registos |
| `kbar/` | Command palette (⌘K) com navegação e troca de tema | Pesquisa rápida |
| `themes/` | Provider, seletor de tema, toggle claro/escuro, fontes | |
| raiz | `breadcrumbs`, `nav-main`, `nav-user`, `nav-projects`, `org-switcher` (multi-centro), `search-input`, `file-uploader`, `user-avatar-profile`, `form-card-skeleton`, `icons` (registo Tabler) | |
| `hooks/` | `use-data-table`, `use-stepper`, `use-debounce(d-callback)`, `use-mobile`, `use-nav` (RBAC), `use-breadcrumbs`, `use-controllable-state`, `use-callback-ref` | |
| `lib/` | `utils` (`cn`), `form` (`useAppForm`), `format`, `query-client`, `searchparams` (nuqs), `api-client`, utilitários de data-table | |
| `config/` | `nav-config` (menu lateral + RBAC), `infoconfig` | Editar com os módulos do ERP |
| `types/` | `NavItem`, `NavGroup`, `PermissionCheck` | |
| `styles/` | `globals.css`, `theme.css`, 10 temas OKLCH em `themes/` | |

### `blocks/` — componentes de nível de feature (prontos a adaptar)

| Block | Conteúdo | Adaptar para |
|---|---|---|
| `users/` | **Template CRUD completo**: `api/` (types → service → queries React Query), tabela com colunas/filtros/ações, `user-form-sheet` (criar/editar em sheet), schema Zod, listing com prefetch no servidor | Alunos, encarregados, professores, funcionários |
| `products/` | Mesmo padrão CRUD + formulário em página com upload de imagem | Turmas, serviços/planos, salas |
| `overview/` | Dashboard: KPIs em cards, area/bar/pie charts (Recharts), atividade recente, skeletons e estado de erro | Painel de gestão (receita, alunos ativos, assiduidade, ocupação) |
| `forms/` | Formulário multi-passo (stepper), formulário em sheet, padrões avançados (campos dependentes, arrays, validação async) | Matrícula multi-passo, inscrições |
| `notifications/` | Centro de notificações (popover) + página + store Zustand | Alertas de pagamentos em atraso, faltas |
| `chat/` | Mensagens: lista de conversas, área de chat, composer, bubbles, store | Comunicação centro ↔ encarregados |
| `kanban/` | Quadro drag & drop (dnd-kit) com colunas, cartões e diálogo de nova tarefa | Tarefas internas, pipeline de leads/inscrições |
| `auth/` | Vistas de sign-in/sign-up (Clerk) e grelha animada | Login |
| `app-shell/` | Root layout, dashboard layout (sidebar + header + kbar + infobar), 404, global error, error boundary | Estrutura de `app/` |
| `_mock/` | Dados falsos (faker) usados pelos blocks `users`/`products` | Substituir pelo backend real em `api/service.ts` |

## Dependências

```bash
npm i @base-ui/react @base-ui/utils @shadcn/helpers @shadcn/react @tabler/icons-react @tanstack/react-form @tanstack/react-query @tanstack/react-query-devtools @tanstack/react-table class-variance-authority clsx cmdk date-fns embla-carousel-react input-otp kbar match-sorter motion next-themes nextjs-toploader nuqs react-day-picker react-dropzone react-resizable-panels react-responsive recharts sonner sort-by tailwind-merge tailwindcss-animate uuid vaul zod zustand @dnd-kit/core @dnd-kit/modifiers @dnd-kit/sortable @dnd-kit/utilities @clerk/nextjs
```

```bash
npm i -D @faker-js/faker tw-animate-css @types/sort-by
```

Versões exatas: ver `next-shadcn-dashboard-starter/package.json`.

- **Clerk** só é usado em `layout/app-sidebar`, `layout/user-nav`, `layout/providers`, `org-switcher`, `hooks/use-nav`, `blocks/auth` e `blocks/app-shell/dashboard-layout`. Se for usada outra auth, são esses os ficheiros a trocar.
- **@faker-js/faker** só é usado em `blocks/_mock`.

## Convenções (herdadas do starter)

- Ícones só via `@/components/icons` (nunca `@tabler/icons-react` direto).
- Forms: `useAppForm` de `@/components/lib/form` + `form.AppField` com `field.TextField`, `field.SelectField`, …
- Dados: `api/types.ts` → `api/service.ts` → `api/queries.ts` por feature; `useSuspenseQuery` no cliente, `useMutation` para escrita.
- URL state com nuqs (`searchParamsCache` no servidor, `useQueryStates` no cliente).
- Cabeçalhos de página via props do `PageContainer` (`pageTitle`, `pageDescription`, `pageHeaderAction`).

Licença: MIT (ver `LICENSE`, do projeto original).
