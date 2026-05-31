# 🎨 Neobrutalist 3D Interactive Portfolio

[![Astro](https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

An exceptionally styled, premium, and fully responsive personal portfolio designed using a **Neobrutalist 3D** aesthetic. Featuring high-contrast borders, solid shadows, tactile physical press interactions, playful micro-animations, and dynamic Astro island components.

---

## ✨ Design Concept & Visuals

This portfolio is heavily influenced by the **Neobrutalism** and **Web3-cartoon** visual trends.
- **Tactile 3D Mechanics**: Cards and buttons physically depress `4px` down and right on hover or click, mimicking real-world mechanics.
- **Bold Typography & High Contrast**: Thick `#000000` borders combined with eye-catching solid drop shadows (`shadow-[8px_8px_0px_#000000]`).
- **Smooth Animations**: Interactive page elements are animated with high-precision physics using Framer Motion (`motion.dev`).
- **Structured Components**: Every section resides in a custom Neobrutalist frame (`Box.astro`/`Box.tsx`) keeping a highly consistent theme across the page.

---

## 🚀 Key Features

- **🏝️ Astro Islands Architecture**: Lightning-fast loading speeds by only delivering interactive JavaScript where needed.
- **🎨 Interactive Skill Grid**: Custom categorized skill blocks with animated level meters.
- **📚 Interactive Carousel Systems**: Custom visual carousels for projects and professional certifications.
- **📑 Testimonial Card Stack**: Playful overlapping testimonial cards that cycle on user interaction.
- **🐙 Integrated GitHub Section**: Custom-designed container styling showing real-time repository stats and information.
- **📍 Rich Timeline Components**: Beautifully styled vertical timelines representing Education and Professional Experience history.
- **✉️ Seamless Contact Form**: A customized, responsive contact form utilizing physical input transitions.

---

## 📂 Project Structure

```text
/
├── public/                     # Static assets (images, icons)
│   ├── Abdullah.jpg            # Profile avatar
│   └── favicon.svg             # Page icon
├── src/
│   ├── assets/                 # SVGs and shared visual elements
│   ├── components/
│   │   ├── layout/             # Header (Navbar) and Footer components
│   │   ├── sections/           # Individual dashboard sections (Hero, About, Work, Github, etc.)
│   │   ├── shared/             # Reusable Astro elements (Box, Tag, SectionLabel)
│   │   └── ui/                 # Interactive React components (Carousels, Timelines, Animations)
│   ├── data/                   # Structured TS/JS files hosting portfolio details (Projects, Experience, Skills)
│   ├── layouts/                # Base html framework files
│   ├── pages/                  # Static routes (index.astro)
│   └── styles/                 # Master Tailwind and global stylesheet configurations (globals.css)
├── astro.config.mjs            # Astro configuration
├── tailwind.config.mjs         # Tailwind styling presets & theme extensions
├── tsconfig.json               # TypeScript configuration
└── package.json                # App dependency map
```

---

## 🛠️ Installation & Setup

Ensure you have [Node.js](https://nodejs.org/) installed (v18.x or higher recommended).

### 1. Clone the Repository
```sh
git clone https://github.com/Abdullahprogramme/Personal-Portfolio-v3.git
cd Personal-Portfolio-v3
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Run Locally in Development Mode
```sh
npm run dev
```
Open your browser and navigate to `http://localhost:4321` to view your live interactive portfolio.

### 4. Production Build & Validation
To compile a fully optimized static build of the website:
```sh
npm run build
```
To run a local server previewing the compiled production code:
```sh
npm run preview
```

---

## 🧱 Customizing the Content

All portfolio data is kept modularly separated from the main layout. To update your info, simply edit the corresponding file in `src/data/`:

*   `projects.ts` - Manage your project listings, descriptions, technologies, and source links.
*   `experience.ts` - Edit your professional career timeline.
*   `skills.ts` - Categorize and rank your core tools and programming language proficiencies.
*   `education.ts` - Maintain your academic history logs.
*   `certifications.ts` - Add newly completed courses and achievements.
*   `testimonials.ts` - Update custom reviews from clients or colleagues.

---

## 🎨 Theme Customization

The design theme system is controlled globally. 
- You can tune border thicknesses, colors, animations, and global variables in [globals.css](file:///c:/Personal%20Files/React/Personal%20Portfolio/src/styles/globals.css).
- Standard colors and neobrutalist custom layouts can be configured inside [tailwind.config.mjs](file:///c:/Personal%20Files/React/Personal%20Portfolio/tailwind.config.mjs).

---

## 📄 License

This project is licensed under the MIT License. Feel free to modify and customize it for your personal use!
