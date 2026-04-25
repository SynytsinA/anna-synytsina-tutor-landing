# Technical Standards: Next.js 15 & Modular Architecture

## Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS + `tailwind-merge` + `clsx`

## Component Rules (Folder-per-Component)
1. **Structure:** Every component lives in its own directory: `src/components/[category]/[ComponentName]/`.
2. **Contents:**
   - `ComponentName.tsx` (Main logic)
   - `index.ts` (Barrel export: `export * from './ComponentName'`)
   - `ComponentName.test.tsx` (Placeholder for future Vitest tests)
3. **Naming:** PascalCase for components and folders.

## Logic Decoupling
- **Hooks:** Business logic and complex state management go to `src/hooks/`.
- **Constants:** All static text, FAQ data, and configuration go to `src/constants/`.
- **Utils:** Pure helper functions go to `src/utils/`.
- **Types:** Shared TS interfaces go to `src/types/`.

## SEO & Performance
- Use `next/image` for all graphics.
- Use `next/font` for local font optimization.
- Every page must define a `Metadata` object in its `layout.tsx` or `page.tsx`.

## Workflow & Git Rules
- **No Auto-Commits:** You are STRICTLY FORBIDDEN from executing `git commit` or `git push` commands automatically after completing a task.
- **Manual Review:** Always leave changes in the "modified" or "staged" state. The user will perform the final review and manual commit.
- **Completion Protocol:** After finishing a task, provide a concise summary of the changes made and ask the user to verify the code.

## TypeScript & Type Safety
- **No "any" Type:** The use of `any` is STRICTLY PROHIBITED. 
- **Alternatives:** Use specific interfaces, types, or `unknown` if the type is truly dynamic. Use generics for reusable logic.
- **Strict Definitions:** Every function parameter, return type, and component prop must be explicitly typed.
- **External Data:** For API responses or external data, define a contract (Interface/Type) that matches the expected structure.
