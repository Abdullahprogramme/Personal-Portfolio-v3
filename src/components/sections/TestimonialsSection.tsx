import { useRef } from "react";
import { motion, useInView } from "motion/react";
import TestimonialStack from "../ui/TestimonialStack";
import SectionLabel from "../shared/SectionLabel.astro"; // Note: In a React component, rendering an Astro component isn't possible directly as a child unless passed through a slot. Wait, we usually just re-create the label or pass it from Astro.

// Let's implement the section wrapper in React.
export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      style={{
        backgroundColor: "#0A0A0A",
        padding: "clamp(64px, 8vw, 96px) clamp(16px, 5vw, 40px)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section Label (re-implemented in React for consistency within the island) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ marginBottom: "48px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#E8FF00", textTransform: "uppercase", letterSpacing: "0.2em" }}>08</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#555555", letterSpacing: "0.2em" }}>/</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#555555", textTransform: "uppercase", letterSpacing: "0.2em" }}>TESTIMONIALS</span>
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 36px)", color: "#F0F0F0", lineHeight: 1.1 }}>
            WHAT PEOPLE SAY
          </h2>
        </motion.div>

        {/* Carousel Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
        >
          <TestimonialStack />
        </motion.div>
      </div>
    </section>
  );
}
