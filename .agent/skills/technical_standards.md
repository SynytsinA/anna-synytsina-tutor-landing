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