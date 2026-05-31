import { useRef } from "react";
import { motion, useInView } from "motion/react";
import CertCarousel from "../ui/CertCarousel";

export default function CertificationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id="certifications"
      ref={sectionRef}
      style={{
        backgroundColor: "#0A0A0A",
        padding: "clamp(64px, 8vw, 96px) clamp(16px, 5vw, 40px)",
        overflow: "hidden"
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ marginBottom: "48px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#E8FF00", textTransform: "uppercase", letterSpacing: "0.2em" }}>05</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#555555", letterSpacing: "0.2em" }}>/</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#555555", textTransform: "uppercase", letterSpacing: "0.2em" }}>CERTIFICATIONS</span>
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 36px)", color: "#F0F0F0", lineHeight: 1.1 }}>
            WHAT I EARNED
          </h2>
        </motion.div>

        {/* Carousel Content */}
        <CertCarousel />
      </div>
    </section>
  );
}
