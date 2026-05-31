import { motion, useInView } from "motion/react";
import { useRef } from "react";
import SkillGrid from "../ui/SkillGrid";
import AnimatedLightningBackground from "../ui/AnimatedLightningBackground";

/**
 * SkillsSection.tsx
 * Section "02 / SKILLS" — full-width section with tab-based skill grid.
 * Icon-focused design: large icons with hover-reveal names.
 */

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        backgroundColor: "#0A0A0A",
        padding: "clamp(64px, 8vw, 96px) clamp(16px, 5vw, 40px)",
        minHeight: "200px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <AnimatedLightningBackground />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                color: "#E8FF00",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
              }}
            >
              02
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                color: "#555555",
                letterSpacing: "0.2em",
              }}
            >
              /
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                color: "#555555",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
              }}
            >
              SKILLS
            </span>
          </div>
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 36px)",
            color: "#F0F0F0",
            lineHeight: 1.1,
            marginBottom: "32px",
          }}
        >
          WHAT I WORK WITH
        </motion.h2>

        {/* Tab bar + Skill Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <SkillGrid />
        </motion.div>
      </div>
    </section>
  );
}
