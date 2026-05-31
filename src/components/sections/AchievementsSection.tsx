import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "motion/react";
import { ACHIEVEMENTS_DATA, type AchievementItem } from "../../data/achievements";
import AnimatedLightningBackground from "../ui/AnimatedLightningBackground";

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id="achievements"
      ref={sectionRef}
      style={{
        backgroundColor: "#0A0A0A",
        padding: "clamp(64px, 8vw, 96px) clamp(16px, 5vw, 40px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <AnimatedLightningBackground />
      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ marginBottom: "48px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#E8FF00", textTransform: "uppercase", letterSpacing: "0.2em" }}>07</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#555555", letterSpacing: "0.2em" }}>/</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#555555", textTransform: "uppercase", letterSpacing: "0.2em" }}>ACHIEVEMENTS</span>
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 36px)", color: "#F0F0F0", lineHeight: 1.1 }}>
            MILESTONES
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div style={{ display: "grid", gap: "24px" }} className="bento-grid">
          {ACHIEVEMENTS_DATA.map((item, i) => {
            let className = "bento-item";
            if (item.type === "large") className += " bento-large";

            return (
              <motion.div
                key={item.id}
                className={className}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                {item.type === "metric" ? (
                  <MetricBox item={item} inView={isInView} />
                ) : (
                  <StandardBox item={item} isLarge={item.type === "large"} />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .bento-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .bento-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: 1fr;
          }
          .bento-large {
            grid-column: span 2;
          }
        }
      `}</style>
    </section>
  );
}

function MetricBox({ item, inView }: { item: AchievementItem; inView: boolean }) {
  const [displayValue, setDisplayValue] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (inView && item.metric) {
      const numMatch = item.metric.match(/\d+/);
      if (numMatch) {
        const num = parseInt(numMatch[0], 10);
        const suffix = item.metric.replace(numMatch[0], "");
        
        const controls = animate(0, num, {
          duration: 1.5,
          ease: "easeOut",
          onUpdate: (val) => {
            setDisplayValue(Math.floor(val) + suffix);
          }
        });
        return () => controls.stop();
      } else {
        setDisplayValue(item.metric);
      }
    }
  }, [inView, item.metric]);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: "#111111",
        border: "2px solid #333333",
        padding: "clamp(24px, 4vw, 32px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        height: "100%",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        borderColor: isHovered ? "#E8FF00" : "#333333",
        boxShadow: isHovered ? "6px 6px 0px #E8FF00" : "6px 6px 0px #333333"
      }}
    >
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(40px, 5vw, 48px)", fontWeight: 700, color: "#E8FF00", marginBottom: "8px", lineHeight: 1.1 }}>
        {displayValue || item.metric}
      </div>
      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "12px", color: "#555555", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {item.label}
      </div>
    </motion.div>
  );
}

function StandardBox({ item, isLarge }: { item: AchievementItem; isLarge?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: "#111111",
        border: "1px solid",
        borderColor: isHovered ? "#E8FF00" : "#222222",
        padding: isLarge ? "clamp(32px, 5vw, 48px)" : "24px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "border-color 0.2s ease",
        position: "relative",
      }}
    >
      {Icon && (
        <div style={{ position: "absolute", top: isLarge ? "48px" : "24px", right: isLarge ? "48px" : "24px" }}>
          <Icon size={isLarge ? 24 : 16} color="#555555" />
        </div>
      )}
      
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <h3 style={{ 
          fontFamily: "'Space Grotesk', sans-serif", 
          fontSize: isLarge ? "clamp(24px, 3vw, 32px)" : "20px", 
          fontWeight: 700, 
          color: "#F0F0F0", 
          marginBottom: "12px", 
          paddingRight: "32px", 
          lineHeight: 1.2 
        }}>
          {item.title}
        </h3>
        <p style={{ 
          fontFamily: "'Montserrat', sans-serif", 
          fontSize: isLarge ? "16px" : "14px", 
          color: "#A0A0A0", 
          lineHeight: 1.6, 
          marginBottom: "24px",
          maxWidth: isLarge ? "80%" : "100%"
        }}>
          {item.description}
        </p>
      </div>
      
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#555555", marginTop: "auto" }}>
        {item.date}
      </div>
    </motion.div>
  );
}
