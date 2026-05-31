/**
 * skills.ts
 * Static skill data organised by category.
 * Icons reference react-icons/si (Simple Icons) identifiers.
 */

export interface Skill {
  name: string;
  /** react-icons import name from 'react-icons/si' (or 'react-icons/fi' for fallbacks) */
  iconName: string;
  /** Icon pack: "si" for Simple Icons, "fi" for Feather, "vsc" for VS Code icons */
  iconPack: "si" | "fi" | "vsc";
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    skills: [
      { name: "HTML", iconName: "SiHtml5", iconPack: "si" },
      { name: "CSS", iconName: "SiCss3", iconPack: "si" },
      { name: "JavaScript", iconName: "SiJavascript", iconPack: "si" },
      { name: "TypeScript", iconName: "SiTypescript", iconPack: "si" },
      { name: "Python", iconName: "SiPython", iconPack: "si" },
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks",
    skills: [
      { name: "React", iconName: "SiReact", iconPack: "si" },
      { name: "Next.js", iconName: "SiNextdotjs", iconPack: "si" },
      { name: "Astro", iconName: "SiAstro", iconPack: "si" },
      { name: "React Native", iconName: "SiReact", iconPack: "si" },
      { name: "Tailwind CSS", iconName: "SiTailwindcss", iconPack: "si" },
      { name: "Material UI", iconName: "SiMui", iconPack: "si" },
      { name: "Node.js", iconName: "SiNodedotjs", iconPack: "si" },
      { name: "Flask", iconName: "SiFlask", iconPack: "si" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    skills: [
      { name: "Git", iconName: "SiGit", iconPack: "si" },
      { name: "GitHub", iconName: "SiGithub", iconPack: "si" },
      { name: "VS Code", iconName: "SiVisualstudiocode", iconPack: "si" },
      { name: "Cursor", iconName: "FiMousePointer", iconPack: "fi" },
      { name: "Antigravity", iconName: "FiZap", iconPack: "fi" },
      { name: "Expo", iconName: "SiExpo", iconPack: "si" },
      { name: "LaTeX", iconName: "SiLatex", iconPack: "si" },
    ],
  },
  {
    id: "platforms",
    label: "Platforms",
    skills: [
      { name: "Firebase", iconName: "SiFirebase", iconPack: "si" },
      { name: "MongoDB", iconName: "SiMongodb", iconPack: "si" },
      { name: "Netlify", iconName: "SiNetlify", iconPack: "si" },
      { name: "Vercel", iconName: "SiVercel", iconPack: "si" },
    ],
  },
];
