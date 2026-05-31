import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { LANGUAGE_DATA } from "../../data/languages";
import { INTERESTS_DATA, CURRENTLY_DATA } from "../../data/interests";

export default function LanguagesInterestsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id="more"
      ref={sectionRef}
      style={{
        backgroundColor: "#0A0A0A",
        padding: "clamp(64px, 8vw, 96px) clamp(16px, 5vw, 40px)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ marginBottom: "64px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#E8FF00", textTransform: "uppercase", letterSpacing: "0.2em" }}>11</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#555555", letterSpacing: "0.2em" }}>/</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#555555", textTransform: "uppercase", letterSpacing: "0.2em" }}>MORE</span>
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 36px)", color: "#F0F0F0", lineHeight: 1.1 }}>
            BEYOND CODE
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Languages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.0 }}
            style={{
              backgroundColor: "#111111",
              border: "2px solid #333333",
              boxShadow: "6px 6px 0px #333333",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "32px"
            }}
          >
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "20px", color: "#F0F0F0", marginBottom: "8px" }}>Languages</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {LANGUAGE_DATA.map((lang, idx) => (
                <div key={lang.name} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "14px", color: "#F0F0F0" }}>{lang.name}</span>
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "12px", color: "#555555" }}>{lang.level}</span>
                  </div>
                  {/* Progress bar container */}
                  <div style={{ width: "100%", height: "4px", backgroundColor: "#222222" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${lang.percentage}%` } : {}}
                      transition={{ duration: 0.8, delay: 0.1 * idx, ease: "easeOut" }}
                      style={{ height: "100%", backgroundColor: "#E8FF00" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Fun Fact / Fandom */}
            <div style={{ width: "100%", height: "1px", backgroundColor: "#222222", marginTop: "auto" }} />
            
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "16px", color: "#F0F0F0" }}>Fan of</h4>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "14px", color: "#A0A0A0", lineHeight: 1.6 }}>
                I am a huge fan of <span style={{ color: "#E8FF00" }}>Lord of the Rings</span> and the <span style={{ color: "#E8FF00" }}>Marvel</span> cinematic universe. Always up for a good fantasy or superhero adventure!
              </p>
            </div>
          </motion.div>

          {/* Column 2: Interests */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{
              backgroundColor: "#111111",
              border: "2px solid #333333",
              boxShadow: "6px 6px 0px #333333",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "20px", color: "#F0F0F0", marginBottom: "32px" }}>Interests</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", flex: 1 }}>
              {INTERESTS_DATA.map((interest, idx) => (
                <motion.div
                  key={interest.id}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + (idx * 0.05), type: "spring" }}
                  whileHover={{ scale: 1.05, y: -4, boxShadow: "4px 4px 0px #E8FF00", borderColor: "#E8FF00", color: "#111111", backgroundColor: "#E8FF00" }}
                  whileTap={{ scale: 0.95, y: 0, boxShadow: "0px 0px 0px #E8FF00" }}
                  className="interest-box"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#0A0A0A",
                    border: "2px solid #333333",
                    padding: "24px",
                    gap: "12px",
                    cursor: "default",
                    transition: "color 0.2s, background-color 0.2s, border-color 0.2s"
                  }}
                >
                  <div className="interest-icon" style={{ color: "#A0A0A0", transition: "color 0.15s ease" }}>
                    <interest.icon size={24} />
                  </div>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "12px", color: "inherit", textAlign: "center" }}>
                    {interest.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Column 3: Currently */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              backgroundColor: "#111111",
              border: "2px solid #333333",
              boxShadow: "6px 6px 0px #333333",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "32px"
            }}
          >
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "20px", color: "#F0F0F0", marginBottom: "8px" }}>Currently</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {CURRENTLY_DATA.map((curr) => (
                <div key={curr.category} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#E8FF00", textTransform: "uppercase" }}>
                    {curr.category}
                  </span>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "14px", color: "#A0A0A0" }}>
                    {curr.item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <style>{`
          .interest-box:hover .interest-icon {
            color: #111111 !important;
          }
        `}</style>
      </div>
    </section>
  );
}
