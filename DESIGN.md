---
name: MathQuiz AI
description: AI-powered math practicing for A-Level students
colors:
  primary: "#3b82f6"
  accent-cool: "#06b6d4"
  neutral-bg-dark: "#000000"
  neutral-bg-light: "#f8fafc"
typography:
  display:
    fontFamily: "var(--font-display), Georgia, serif"
    fontWeight: 400
  body:
    fontFamily: "var(--font-geist-sans), sans-serif"
    fontWeight: 400
  label:
    fontFamily: "var(--font-geist-mono), monospace"
    fontWeight: 500
rounded:
  md: "0.375rem"
  lg: "0.5rem"
  xl: "0.75rem"
  2xl: "1rem"
spacing:
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.xl}"
    padding: "0.875rem 2rem"
  card-feature:
    backgroundColor: "{colors.neutral-bg-light}"
    rounded: "{rounded.2xl}"
    padding: "1.5rem"
---

# Design System: MathQuiz AI

## 1. Overview

**Creative North Star: "The Focused Chalkboard"**

The design system for MathQuiz AI is built around the concept of a "Focused Chalkboard"—sharp, high-contrast, serious but approachable. It prioritizes the content (math problems, equations) above all else, ensuring the student's cognitive load is spent on learning rather than navigating the interface. The typography is precise, spacing is generous but controlled, and the environment supports deep focus without feeling stressful.

We explicitly reject the playful, gamified aesthetics of apps like Duolingo, the lightweight feel of flashcard apps, and the corporate SaaS aesthetics that rely on metric-hero sections or gradient text. Glassmorphism is avoided as a default decoration.

**Key Characteristics:**
- Content-first hierarchy where equations are the heroes.
- High-contrast elements for accessibility and clarity.
- Restrained use of color to minimize distractions.
- Precise typography that supports dense mathematical information.

## 2. Colors

The palette is anchored by calm indigos and soft skies, providing a trustworthy and restrained environment.

### Primary
- **Calm Indigo** (#3b82f6): The core action color. Used for primary buttons, active states, and key highlights to guide the user without shouting.

### Secondary
- **Soft Sky** (#06b6d4): Used for secondary highlights or subtle distinctions in UI components to break monotony without breaking focus.

### Neutral
- **Chalkboard Black** (#000000): The core background color for Dark Mode, ensuring high contrast and deep focus.
- **Paper White** (#f8fafc): The core background color for Light Mode, slightly tinted to reduce eye strain compared to pure white.

### Named Rules
**The One Voice Rule.** The primary accent is used strictly for actions and focal points. It should not bleed into backgrounds or large surface areas.

## 3. Typography

**Display Font:** Instrument Serif (with Georgia fallback)
**Body Font:** Geist Sans (with sans-serif fallback)
**Label/Mono Font:** Geist Mono (with monospace fallback)

**Character:** A pairing of an elegant, authoritative serif for focal moments alongside a precise, highly readable sans-serif for deep focus and utility.

### Hierarchy
- **Display** (400, clamp(3rem,8vw,5.5rem), 1.05): Used exclusively for hero headlines or major section dividers.
- **Headline** (900, 2rem - 3.75rem, tight): Used for the highest impact contrast text next to the display serif.
- **Title** (700, 1.25rem - 1.5rem, 1.2): Used for component headers and card titles.
- **Body** (400, 1rem, 1.5): Used for general reading, explanations, and math descriptions.
- **Label** (500, 0.75rem - 0.875rem, wide): Used for metadata, tags, and small utility text.

### Named Rules
**The Equation Priority Rule.** LaTeX rendering must always be crystal clear and legible across all viewports. Do not constrain line heights artificially where equations might overlap.

## 4. Elevation

The system is Tactile & Lifted. We use soft shadows to elevate cards and buttons, providing a physical sense of hierarchy without heavy structural borders.

### Shadow Vocabulary
- **Lifted Action** (`box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.2)`): Used on primary CTA buttons to make them feel pressable.
- **Surface Elevation** (`box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1)`): Used on sticky headers or floating elements to detach them from the scrolling background.

### Named Rules
**The Purposeful Depth Rule.** Shadows must have a spatial rationale. If an element does not sit *above* the background logically, it should not cast a shadow.

## 5. Components

Components are "Refined and Restrained"—simple, slightly rounded, with no excess gimmicks.

### Buttons
- **Shape:** Rounded (12px / xl)
- **Primary:** Calm Indigo background, white text, generous horizontal padding (32px).
- **Hover / Focus:** Slight background darkening with a subtle translation or shadow expansion.

### Cards / Containers
- **Corner Style:** Large radius (16px / 2xl)
- **Background:** Paper White or Chalkboard Black with a very subtle border (1px solid with 5-8% opacity).
- **Shadow Strategy:** Flat with borders by default, elevated shadows on interaction if necessary.
- **Internal Padding:** Generous (24px / 1.5rem) to let content breathe.

### Canvas / Testing Area
- **Style:** Bordered container, clearly delineated from the reading area.
- **Focus:** Purely functional for Apple Pencil input, devoid of decorative styling.

## 6. Do's and Don'ts

### Do:
- **Do** use `Instrument Serif` for hero moments to contrast with the technical UI.
- **Do** maintain WCAG AA contrast (≥ 4.5:1) for all body text and equations.
- **Do** use soft, lifted shadows to indicate interactivity and hierarchy.

### Don't:
- **Don't** use SaaS landing-page clichés like gradient text or over-rounded "ghost-card" shadows.
- **Don't** use generic AI tool marketing aesthetics (e.g., purple-to-blue neon gradients).
- **Don't** use glassmorphism as a default decoration; keep surfaces solid and legible.
- **Don't** make the UI playful or gamified; avoid the Duolingo aesthetic.
