# 🎓 Anna Synytsina - Interactive Tutoring Platform

[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel&logoColor=white)](https://anna-synytsina-tutor-landing.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Vitest-Tested-729B1B?logo=vitest&logoColor=white)](https://vitest.dev/)

A modern, high-performance landing page and interactive educational platform built for a primary school teacher and tutor. Designed to combine a professional marketing presence for parents with gamified, engaging learning experiences for children (Grades 1-4).

## 🚀 Tech Stack

* **Framework:** Next.js 16.2 (App Router)
* **Language:** TypeScript 5.9 (Strict Mode)
* **Testing:** Vitest & React Testing Library
* **Styling:** Tailwind CSS 3.4
* **Animations:** CSS Modules & Tailwind Utilities
* **Code Quality:** ESLint & Husky (Pre-commit hooks)
* **Deployment:** Vercel

## ✨ Key Features

* **Gamified Learning Modules:** Includes interactive mini-games to keep children engaged, such as:
    * 🪄 *Sorting Hat Anagrams:* A Harry Potter-themed word puzzle.
    * 🎄 *Grinch Math Sorter:* A drag-and-drop game for learning odd/even numbers.
* **SEO Optimized:** Built with Next.js Server Components and semantic HTML to ensure high visibility for local searches (Targeting: Dnipro, primary school tutoring).
* **Image Optimization:** Utilizing `next/image` for automatic WebP conversion and lazy loading of high-resolution assets.
* **Responsive Design:** A mobile-first approach ensuring a flawless experience for parents browsing on smartphones.

## 🏗️ Architecture & Best Practices

This project strictly follows a scalable, modular architecture designed for token efficiency and long-term maintainability:

* **Folder-per-Component Pattern:** Every component lives in its own isolated directory with an `index.ts` barrel file.
* **Logic Decoupling:** Complex game states and drag-and-drop mechanics are extracted into custom React hooks (e.g., `useGrinchGame.ts`, `usePotterGame.ts`) to keep UI components pure and declarative.
* **Data Isolation:** All static content, copy, and configuration data are centralized in `src/constants/landing.ts` for easy updates by non-technical users.
* **Feature-Driven Structure:** Clear separation between generic UI (`src/components/shared`) and complex business logic (`src/components/features`).

## 📁 Directory Structure Overview

```text
src/
├── app/               # Next.js App Router (layout, page, global css)
├── components/        
│   ├── features/      # Complex interactive widgets (Games)
│   ├── shared/        # Reusable landing page sections (Hero, About, FAQ)
│   └── ui/            # Atomic UI elements (Buttons, ScrollToTop)
├── constants/         # Centralized static data and configuration
└── hooks/             # Custom React hooks for business logic
```

## 🛠️ Getting Started
To run this project locally:

1. **Clone the repository:**
```bash
git clone https://github.com/SynytsinA/anna-synytsina-tutor-landing.git
cd anna-synytsina-tutor-landing
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 👨💻 Author
Artem Synytsin
