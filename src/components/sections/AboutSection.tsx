import { motion, useInView, useMotionValue, animate } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { FiBookOpen, FiCode, FiMapPin, FiClock } from "react-icons/fi";
import { FaComputer } from "react-icons/fa6";

/**
 * AboutSection.tsx
 * Section "01 / ABOUT" — 2-column grid with bio + stats (left)
 * and category-wise ASCII skill map + "currently" info (right).
 * All animations driven exclusively by Motion (motion.dev).
 */

// ─── Data ──────────────────────────────────────────────────────────────────────

const CURRENTLY = [
  {
    icon: FiCode,
    label: "Currently learning",
    value: "Quantum Computing",
  },
  {
    icon: FiBookOpen,
    label: "Currently reading",
    value: "Homo Deus: A Brief History of Tomorrow",
  },
  {
    icon: FaComputer,
    label: "Currently playing",
    value: "Resident Evil 9: Requiem",
  },
];

// ─── New Components ────────────────────────────────────────────────────────────

function LiveStatus() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Karachi",
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", borderTop: "1px solid #222222", paddingTop: "24px", marginTop: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <motion.div 
          animate={{ opacity: [1, 0.4, 1] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "8px", height: "8px", backgroundColor: "#39FF14", borderRadius: "50%", boxShadow: "0 0 8px rgba(57, 255, 20, 0.4)" }}
        />
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "13px", color: "#F0F0F0", fontWeight: 500 }}>Available for frontend jobs</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <FiMapPin size={14} color="#A0A0A0" />
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "13px", color: "#A0A0A0" }}>Karachi, Pakistan</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <FiClock size={14} color="#A0A0A0" />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "#E8FF00" }}>{time} (PKT)</span>
      </div>
    </div>
  );
}

function PhilosophyTags() {
  const tags = ["PERFORMANCE FIRST", "TYPE SAFE", "PIXEL PERFECT"];
  return (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "20px" }}>
      {tags.map((tag) => (
        <motion.div
          key={tag}
          whileHover={{ y: -2, borderColor: "#E8FF00", color: "#E8FF00" }}
          style={{
            padding: "8px 12px",
            border: "1px solid #333333",
            backgroundColor: "#0A0A0A",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            color: "#A0A0A0",
            cursor: "default",
            transition: "color 0.2s ease, border-color 0.2s ease"
          }}
        >
          {tag}
        </motion.div>
      ))}
    </div>
  );
}

function TerminalBlock({ inView }: { inView: boolean }) {
  const [step, setStep] = useState(0);
  const [typedCommand, setTypedCommand] = useState("");
  const command = "> cat developer.json";

  useEffect(() => {
    if (!inView) return;
    
    let currentCommand = "";
    let i = 0;
    
    const typeInterval = setInterval(() => {
      if (i < command.length) {
        currentCommand += command.charAt(i);
        setTypedCommand(currentCommand);
        i++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setStep(1), 300);
      }
    }, 60);

    return () => clearInterval(typeInterval);
  }, [inView]);

  return (
    <div
      style={{
        backgroundColor: "#0A0A0A",
        border: "1px solid #222222",
        padding: "clamp(16px, 2vw, 24px)",
        overflow: "hidden",
        minHeight: "220px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Bar */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between",
        borderBottom: "1px solid #222222", 
        paddingBottom: "12px",
        marginBottom: "16px" 
      }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#555555" }}>TERMINAL</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#555555" }}>bash</span>
      </div>

      <pre
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "clamp(12px, 1.2vw, 14px)",
          lineHeight: 1.6,
          margin: 0,
          whiteSpace: "pre-wrap",
        }}
      >
        {/* Command */}
        <div style={{ color: "#F0F0F0" }}>
          {typedCommand}
          {step === 0 && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{ color: "#E8FF00", marginLeft: "4px" }}
            >
              █
            </motion.span>
          )}
        </div>
        
        {/* Output JSON */}
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ marginTop: "12px", color: "#A0A0A0" }}
          >
            <span style={{ color: "#555555" }}>{"{"}</span>
            <br />
            {"  "}<span style={{ color: "#A0A0A0" }}>"name"</span><span style={{ color: "#555555" }}>:</span> <span style={{ color: "#E8FF00" }}>"Abdullah Tariq"</span>,
            <br />
            {"  "}<span style={{ color: "#A0A0A0" }}>"role"</span><span style={{ color: "#555555" }}>:</span> <span style={{ color: "#E8FF00" }}>"Full Stack Developer"</span>,
            <br />
            {"  "}<span style={{ color: "#A0A0A0" }}>"focus"</span><span style={{ color: "#555555" }}>:</span> [
            <br />
            {"    "}<span style={{ color: "#E8FF00" }}>"Next.js"</span>, <span style={{ color: "#E8FF00" }}>"TypeScript"</span>, <span style={{ color: "#E8FF00" }}>"Python"</span>
            <br />
            {"  "}],
            <br />
            {"  "}<span style={{ color: "#A0A0A0" }}>"hobby"</span><span style={{ color: "#555555" }}>:</span> <span style={{ color: "#E8FF00" }}>"Algorithms, Coding"</span>
            <br />
            <span style={{ color: "#555555" }}>{"}"}</span>
            <br />
            <br />
            <div style={{ color: "#F0F0F0" }}>
              {"> "}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{ color: "#E8FF00", marginLeft: "4px" }}
              >
                █
              </motion.span>
            </div>
          </motion.div>
        )}
      </pre>
    </div>
  );
}

// ─── Main AboutSection ─────────────────────────────────────────────────────────

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        backgroundColor: "#0A0A0A",
        padding: "clamp(64px, 8vw, 96px) clamp(16px, 5vw, 40px)",
        minHeight: "200px",
      }}
    >
      <div
        style={{
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
              01
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
              ABOUT
            </span>
          </div>
        </motion.div>

        {/* 2-Column Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "24px",
          }}
          className="about-grid"
        >
          {/* ── Left Box (Text + Stats) ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              backgroundColor: "#111111",
              border: "1px solid #222222",
              padding: "clamp(20px, 4vw, 32px)",
              transition: "border-color 0.2s ease",
            }}
            whileHover={{ borderColor: "#E8FF00" }}
          >
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(28px, 4vw, 36px)",
                color: "#F0F0F0",
                lineHeight: 1.1,
                marginBottom: "20px",
              }}
            >
              ABOUT ME
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <p className="text-justify"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "clamp(13px, 1.5vw, 16px)",
                  color: "#A0A0A0",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                I'm a software engineer who thrives at the intersection of design and engineering. 
                I build web applications that are fast, accessible, and visually deliberate — 
                every pixel has a purpose, every interaction is considered.
              </p>
              <p className="text-justify"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "clamp(13px, 1.5vw, 16px)",
                  color: "#A0A0A0",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                I am currently a junior year student at Institute of Business Administration.
                My stack centres on Next.js, TypeScript, and Node.js, but I'm framework agnostic.
              </p>
              <p className="text-justify"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "clamp(13px, 1.5vw, 16px)",
                  color: "#A0A0A0",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                When I'm not coding, you'll find me reading about quantum computing or more on web development.
                I often play table tennis as a fun sports.
                Apart from that I am an avid competitive programmer currently on the track to learn more and participate in competitions.
              </p>
            </div>

            {/* Live Status and Philosophy Tags */}
            <LiveStatus />
            <PhilosophyTags />
          </motion.div>

          {/* ── Right Box (ASCII + Currently) ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* Top inner box — Interactive Terminal */}
            <div
              style={{
                backgroundColor: "#111111",
                border: "1px solid #222222",
                padding: "clamp(16px, 3vw, 24px)",
                transition: "border-color 0.2s ease",
                flex: 1,
              }}
            >
              <TerminalBlock inView={isInView} />
            </div>

            {/* Bottom inner box — Currently info */}
            <div
              style={{
                backgroundColor: "#111111",
                border: "1px solid #222222",
                padding: "clamp(16px, 3vw, 24px)",
                transition: "border-color 0.2s ease",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {CURRENTLY.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.5 + i * 0.1,
                      ease: "easeOut",
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <item.icon
                      size={16}
                      style={{ color: "#555555", flexShrink: 0 }}
                    />
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontSize: "11px",
                          color: "#555555",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontSize: "13px",
                          color: "#F0F0F0",
                          marginTop: "2px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.value}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Responsive grid — switches to 2 columns on lg */}
      <style>{`
        .about-grid {
          grid-template-columns: 1fr !important;
        }
        @media (min-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
