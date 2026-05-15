# ISHA 3D Landing Page

> Instagram-trending Next.js landing page for ISHA wellness/lifestyle brand with premium 3D web animations.

---

## Project Overview

**Project Name:** ISHA 3D Landing Page
**Type:** Premium marketing website with Web3D animations
**Tech Stack:** Next.js, React Three Fiber, Three.js, Framer Motion, GSAP
**Design Aesthetic:** Glassmorphism + Organic Blob Animations + Dark Mode with Warm Accents

---

## Visual Aesthetic Requirements

| Element | Specification |
|---------|---------------|
| **Primary Color** | Warm Brown `#8B7355` |
| **Accent Color** | Rose Gold `#D4A574` |
| **Secondary Color** | Cream `#F5E6D3` |
| **Dark Background** | `#0f0f0f` with subtle gradients |
| **Glassmorphism** | `backdrop-filter: blur(20px)` with rgba backgrounds |
| **Glow Effect** | `filter: drop-shadow(0 0 20px rgba(212, 165, 116, 0.6))` |

---

## Trending 3D Elements

### 1. Hero Section - Organic Blob Morph
- **Library:** Three.js / React Three Fiber with Perlin noise
- **Behavior:** Blob morphs slowly, reacts to mouse movement
- **Content:** ISHA logo floats inside/around blob in 3D space
- **Colors:** Warm brown → rose gold gradient inside blob
- **Animation:** Framer Motion + Three.js combined

### 2. Features Section - Interactive 3D Cards
- **Effect:** Glassmorphic cards with 3D lift on hover (perspective transform)
- **Icons:** Small 3D icons (Spline embeds or Three.js models)
- **Interaction:** Icons rotate on hover (parallax effect)
- **Style:** No shadows - subtle glow instead

### 3. About/Stats Section - Animated Number Counters
- **Library:** react-countup with 3D rotate/scale animation
- **Background:** Gradient mesh (Apple-style)
- **Trigger:** Intersection Observer for scroll-triggered reveals

### 4. Testimonials - 3D Carousel
- **Style:** 3D Rolodex rotating on scroll
- **Tech:** Framer Motion + Three.js perspective
- **Effects:** Depth, slight tilt, glassmorphic user avatars

### 5. Blog Preview - Liquid Swipe Transition
- **Library:** GSAP for smooth liquid effects
- **Interaction:** Hover lift + glow increase
- **Animation:** Oil/water flowing across page effect

### 6. CTA Button - Interactive 3D Button
- **Style:** 3D depth with neon glow
- **Interaction:** Ripple effect on click (smoother than Material)
- **Animation:** Icon animates on hover/click

---

## Animation Libraries

```bash
# Core 3D
npm install three @react-three/fiber @react-three/drei

# Animations
npm install framer-motion gsap

# Scroll & State
npm install react-intersection-observer zustand

# Optional (bonus features)
npm install @react-lenis howler
```

---

## Animation Techniques

- **Easing:** `cubic-bezier(0.34, 1.56, 0.64, 1)` for bouncy feel
- **Parallax:** Scroll-based depth effect
- **Stagger:** Sequential element appearances
- **Scroll Velocity:** Animation speed responds to scroll speed
- **Magnetic Cursor:** Elements move toward cursor

---

## Performance Optimization

- Use canvas acceleration for 3D elements
- Lazy load Spline models (only when visible)
- Debounce scroll events
- Use requestAnimationFrame for animations
- Minimize re-renders with React.memo

---

## Next.js Setup

```typescript
// pages/index.tsx
import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false
})

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeroScene />
      {/* Other sections */}
    </Suspense>
  )
}
```

---

## Color Palette Reference

| Name | Hex | Usage |
|------|-----|-------|
| Warm Brown | `#8B7355` | Primary brand color |
| Rose Gold | `#D4A574` | Accent/bright highlights |
| Cream | `#F5E6D3` | Light backgrounds |
| Deep Black | `#0f0f0f` | Dark mode background |
| Soft White | `#FAFAFA` | Light mode text |

---

## Project Structure

```
isha-3d-landing/
├── src/
│   ├── components/
│   │   ├── 3d/           # Three.js/R3F components
│   │   ├── sections/     # Page sections
│   │   └── ui/           # Reusable UI components
│   ├── pages/            # Next.js pages
│   ├── styles/           # Global styles
│   └── hooks/            # Custom hooks
├── public/               # Static assets
├── package.json
├── tsconfig.json
└── README.md
```

---

## Key Instagram Trends Being Hit

- ✓ Glassmorphism (trending since 2024, still hot)
- ✓ Organic shapes & blob animations (very 2025-2026)
- ✓ Interactive 3D (huge engagement factor)
- ✓ Smooth micro-interactions (Gen-Z loves this)
- ✓ Dark mode with warm accents (aesthetic balance)
- ✓ Gradient backgrounds (timeless)
- ✓ Particle effects (subtle, not overdone)

---

## Timeline Estimate

| Skill Level | Hours |
|-------------|-------|
| Beginner | 80-100 hrs |
| Intermediate | 40-50 hrs |
| Expert | 20-30 hrs |

---

## Dependencies Summary

| Package | Purpose |
|---------|---------|
| `three` | 3D engine |
| `@react-three/fiber` | React renderer for Three.js |
| `@react-three/drei` | R3F utilities (OrbitControls, etc.) |
| `framer-motion` | Smooth UI animations |
| `gsap` | Advanced animation sequencing |
| `react-intersection-observer` | Scroll triggers |
| `zustand` | State management for 3D scenes |
| `@react-lenis` | Smooth scroll (bonus) |
| `howler` | Sound effects (bonus) |

---

## Design Resources

- **Glassmorphism CSS:**
  ```css
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  ```

- **Glow Effect:**
  ```css
  filter: drop-shadow(0 0 20px rgba(212, 165, 116, 0.6));
  ```

---

> Built with Instagram-trending aesthetics and premium 3D web animations. This landing page is designed to be screenshot-worthy and viral-worthy.