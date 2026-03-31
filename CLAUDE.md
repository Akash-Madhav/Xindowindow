# Claude Configuration for Xindo Window

@AGENTS.md

## 🚀 Technical Summary
- **Build**: `npm run build`
- **Dev**: `npm run dev`
- **Lint**: `npm run lint`
- **Primary Stack**: Next.js 16.2.1, React 19.2.4, React Compiler, Tailwind CSS 4, GSAP, Framer Motion.

- **Components**: Functional components in `src/components`, using Radix UI primitives for accessible interactions.
- **Styling**: Tailwind CSS 4 utility-first + CSS variables in `src/app/globals.css`.

## 🛠️ Architectural Rules
1. **App Router**: Strictly follow Next.js 16 App Router patterns. Use `src/app/page.tsx` for routing and `layout.tsx` for shared structures.
2. **Client Components**: Mark interactive/animated components with `"use client"`.
3. **Animations**: 
   - Use `framer-motion` for simple interactions.
   - Use `gsap` for timeline-based animations and ScrollTrigger sections.
4. **Data Management**: Keep static content in `src/data/`.
5. **Types**: Use TypeScript for all props and state. Define interfaces in the same file if local, or in `src/lib/types/` if shared.

## 🎨 Design Reference
- Refer to `DESIGN.md` for the primary color `#C8102E` and typography (Cormorant Garamond, DM Sans).
- Maintain high contrast and "premium" spacing (Display XL at 96px).

## 🧩 Shared Patterns
- **Lenis Scroll**: Initialized in `src/components/providers/SmoothScroll.tsx` (if present).
- **Zod Validation**: Use `zod` for all form schemas and API response validation.
- **Error Handling**: Use React Error Boundaries for critical UI sections.
