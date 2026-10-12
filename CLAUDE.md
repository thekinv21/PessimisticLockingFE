# Pessimistic Locking Frontend

Next.js 16 app (App Router) with TypeScript, Tailwind CSS and Socket IO

## Stack

- Next.js 16.4.0 (App Router, Server Components by default)
- React 19.3.0
- TypeScript (strict mode), path alias `@/*` → `./src/*`
- Tailwind CSS v4
- TanStack Query (react-query)
- Lucide React for icons
- React Hook Form + Zod + @hookform/resolvers for forms and validation
- Axios for the HTTP client instance
- Bun as package manager (`bun install`, `bun run <script>`)

## Commands

- `bun run dev` — dev server
- `bun run build` — production build
- `bun run lint` — ESLint (incl. FSD import rules) + Steiger (FSD structure). Must pass with 0 errors.
- `bun run lint:fix` — autofix what can be fixed
- `bun run lint:fsd` — Steiger only
- `bun run format` / `bun run format:check` — Prettier

Husky `pre-commit` runs `bun run lint`; a commit with any FSD violation is rejected.
Commit message format: `type:[branchName][developerName]: description` (e.g. `feat:[master][Vadim]: add auth`).

The `processes` layer is deprecated — never create it.

## Conventions

- Server Components by default. Add `"use client"` only for interactivity, browser APIs or hooks.
- Server data: fetch in Server Components / Server Actions. Client-side and realtime data:
  TanStack Query hooks in the slice's `api` segment; WebSocket events update the Query cache.
- Validate all inputs with Zod. Schemas live in the `model` segment of the owning slice;
  generic validators in `shared/lib`.
- Use `next/image` for all images, never raw `<img>`.
- Use `next/link` for internal navigation; route paths come from `shared/routes`.
- CSS: Tailwind utility classes only. No CSS modules, no styled-components. Global styles: `app/globals.css`.
  Use the canonical class Tailwind IntelliSense suggests (`h-180` not `h-[720px]`, `grow` not `flex-grow`,
  `size-4.5` not `size-[18px]`); keep arbitrary values only when no scale value exists (`text-[13px]`).
- Naming:
  - Components: PascalCase (`UserCard.tsx`).
  - Hooks: camelCase starting with `use` (`useSidebarNav.ts`), one hook per file, in the `model` segment.
- Components stay under ~100 lines. Business logic (state, filtering, sorting, derived data, translation of
  data) lives in `model/use*.ts` hooks; components only render what the hook returns.

## Component patterns

- Props are never typed inline. Every component that takes props declares
  `type T<ComponentName>Props` directly above it (a `type`, not an `interface`; extend with `&`).
  This applies to non-exported helper components too (`SortButton` → `TSortButtonProps`).
- Up to 3 props: destructure in the signature. More than 3 (a `...rest` counts as one): take `props`
  and destructure on the first line of the body, renaming a rest element to `rest`.

  ```tsx
  type TBadgeProps = { tone?: TTone; children: ReactNode }

  export function Badge({ tone = 'neutral', children }: TBadgeProps) {}

  type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  	variant?: TButtonVariant
  	size?: TButtonSize
  	block?: boolean
  }

  export function Button(props: TButtonProps) {
  	const { variant, size, block, className, ...rest } = props
  }
  ```

- FSD page components live in `src/pages/<slice>/ui`, exported via the slice `index.ts`.
- Client components go in separate files with the `"use client"` directive.
- Loading states use `loading.tsx` (Suspense boundary) in root `app/`.
- Error boundaries use `error.tsx` with `"use client"` in root `app/`.

## Testing

Not set up yet. When added: Vitest for unit tests,
tests colocated with the slice they cover. Do not reference `test` scripts until they exist in `package.json`.

## Common gotchas

- Don't import server-only code in client components.
- Don't use `useState`/`useEffect` in Server Components.
- Always handle loading and error states.
- Use dynamic imports for heavy client components.
- Environment variables: `NEXT_PUBLIC_` prefix for client-side access; read them only in `shared/config`.
