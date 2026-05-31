import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
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
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FiMousePointer, FiZap } from "react-icons/fi";

/**
 * SkillGrid.tsx
 * Interactive skill grid with tab interface.
 * Icon-focused: large icons centered, name revealed on hover with animation.
 */

// ─── Skill Data (inline — keeps component self-contained) ──────────────────────

interface SkillItem {
  name: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
}

interface SkillCategory {
  id: string;
  label: string;
  skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
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

// ─── Skill Box Component ───────────────────────────────────────────────────────

function SkillBox({ skill, index }: { skill: SkillItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.35, delay: index * 0.03, ease: "easeOut" }}
      whileHover={{ scale: 1.06, y: -4 }}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: "#111111",
        border: "2px solid",
        borderColor: isHovered ? "#E8FF00" : "#333333",
        boxShadow: isHovered ? "6px 6px 0px #E8FF00" : "2px 2px 0px #333333",
        padding: "0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
        aspectRatio: "1 / 1",
        transition: "border-color 0.2s ease",
      }}
    >
      {/* Subtle background glow on hover */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.06 : 0,
          scale: isHovered ? 1.2 : 0.8,
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at center, #E8FF00 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Icon — large, centered, animates colour on hover */}
      <motion.div
        animate={{
          y: isHovered ? -6 : 0,
          color: isHovered ? "#E8FF00" : "#A0A0A0",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={32} />
      </motion.div>

      {/* Name — slides up from below on hover */}
      <motion.span
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 8,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{
          position: "relative",
          zIndex: 2,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px",
          color: "#E8FF00",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginTop: "8px",
          textAlign: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "90%",
        }}
      >
        {skill.name}
      </motion.span>
    </motion.div>
  );
}

// ─── Main SkillGrid ────────────────────────────────────────────────────────────

export default function SkillGrid() {
  const [activeTab, setActiveTab] = useState(SKILL_CATEGORIES[0].id);
  const activeCategory = SKILL_CATEGORIES.find((c) => c.id === activeTab)!;

  return (
    <div>
      {/* Tab Bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "32px",
        }}
      >
        {SKILL_CATEGORIES.map((category) => {
          const isActive = category.id === activeTab;
          return (
            <motion.button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                padding: "8px 16px",
                border: isActive ? "2px solid #E8FF00" : "2px solid #333333",
                boxShadow: isActive ? "4px 4px 0px #E8FF00" : "4px 4px 0px #333333",
                backgroundColor: isActive ? "#E8FF00" : "#111111",
                color: isActive ? "#0A0A0A" : "#555555",
                cursor: "pointer",
                position: "relative",
                transition: "background-color 0.2s, color 0.2s, border-color 0.2s",
              }}
            >
              {category.label}
            </motion.button>
          );
        })}
      </div>

      {/* Skill Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          style={{
            display: "grid",
            gap: "12px",
          }}
          className="skill-grid-inner"
        >
          {activeCategory.skills.map((skill, i) => (
            <SkillBox key={skill.name} skill={skill} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Responsive grid columns */}
      <style>{`
        .skill-grid-inner {
          grid-template-columns: repeat(2, 1fr) !important;
        }
        @media (min-width: 640px) {
          .skill-grid-inner {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (min-width: 768px) {
          .skill-grid-inner {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        @media (min-width: 1024px) {
          .skill-grid-inner {
            grid-template-columns: repeat(5, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
