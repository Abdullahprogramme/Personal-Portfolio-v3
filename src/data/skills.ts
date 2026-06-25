/**
 * skills.ts
 * Static skill data organised by category.
 */

import type { ComponentType, CSSProperties } from "react";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCplusplus,
  SiC,
  SiReact,
  SiNextdotjs,
  SiAstro,
  SiTailwindcss,
  SiMui,
  SiNodedotjs,
  SiFlask,
  SiGit,
  SiGithub,
  SiExpo,
  SiLatex,
  SiFirebase,
  SiMongodb,
  SiNetlify,
  SiVercel,
  SiDart,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FiMousePointer, FiZap } from "react-icons/fi";

export interface SkillItem {
  name: string;
  icon: ComponentType<{ size?: number; style?: CSSProperties }>;
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: SkillItem[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    skills: [
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss },
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Python", icon: SiPython },
      { name: "C++", icon: SiCplusplus },
      { name: "C", icon: SiC },
      { name: "Dart", icon: SiDart },
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks",
    skills: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Astro", icon: SiAstro },
      { name: "React Native", icon: SiReact },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Material UI", icon: SiMui },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Flask", icon: SiFlask },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    skills: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "VS Code", icon: VscVscode },
      { name: "Cursor", icon: FiMousePointer },
      { name: "Antigravity", icon: FiZap },
      { name: "Expo", icon: SiExpo },
      { name: "LaTeX", icon: SiLatex },
    ],
  },
  {
    id: "platforms",
    label: "Platforms",
    skills: [
      { name: "Firebase", icon: SiFirebase },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Netlify", icon: SiNetlify },
      { name: "Vercel", icon: SiVercel },
    ],
  },
];
