<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Xindo Window — AI Agent Guidelines

## 🏗️ Technical Architecture
- **Framework**: Next.js 16.2.1 (App Router) + React 19.2.4
- **Special Features**: React Compiler (Babel/Next.js) enabled.
- **Styling**: Tailwind CSS 4 + PostCSS @tailwindcss/postcss.
- **Animations**: 
  - `framer-motion`: For layout transitions and micro-interactions.
  - `gsap`: For complex ScrollTrigger-driven "signature moments".
- **Smooth Scroll**: `lenis` is active; ensure scroll-dependent logic respects Lenis.
- **UI & Slider**: Radix UI primitives and Embla Carousel.



## 🎨 Design System (DESIGN.md)
- Always refer to `DESIGN.md` for colors (e.g., `#C8102E` for primary), fonts (Cormorant Garamond/DM Sans), and spacing.
- Use CSS variables defined in `src/app/globals.css`.

## 📁 Directory Structure
- `src/app`: Page routes and global styles.
- `src/components`: UI components (keep them modular).
- `src/data`: Static content/JSON data for the portfolio.
- `src/lib`: Utilities, custom hooks, and shared animation logic.

## 📜 Execution Rules
1. **No Placeholders**: Use `generate_image` or actual assets/models from `public/`.
2. **Premium First**: Every UI change must feel luxurious and cinematic.
3. **TypeScript**: Strict type checking for all props and state.

