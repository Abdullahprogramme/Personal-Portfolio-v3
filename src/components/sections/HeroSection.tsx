import { motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { FiGithub, FiLinkedin, FiInstagram, FiFacebook, FiArrowRight } from "react-icons/fi";
import { HiOutlineChevronDown } from "react-icons/hi";
import TypewriterHeadline from "../ui/TypewriterHeadline";
import AnimatedHeroBackground from "../ui/AnimatedHeroBackground";

/**
 * HeroSection.tsx
 * Full-viewport hero with staggered page-load animation sequence
 * and additional Motion.dev decorative animations.
 */

const ROLES = [
  "Quantum Enthusiast",
  "Full-Stack Developer",
  "Android Developer",
  "Tech Savvy"
];

const SOCIAL_LINKS = [
  { icon: FiGithub, href: "https://github.com/Abdullahprogramme", label: "GitHub" },
  { icon: FiLinkedin, href: "https://www.linkedin.com/in/abdullahtariq78/", label: "LinkedIn" },
  { icon: FiInstagram, href: "https://www.instagram.com/abdullahtariq62/?next=%2F&hl=en", label: "Instagram" },
  { icon: FiFacebook, href: "https://www.facebook.com/abdullah.tariq.7262", label: "Facebook" },
];

const enterVariant = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

/**
 * AnimatedLine — a horizontal accent line that draws itself in.
 */
function AnimatedLine({
  delay,
  width,
  top,
  left,
}: {
  delay: number;
  width: string;
  top: string;
  left: string;
}) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 1.2, delay, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        position: "absolute",
        top,
        left,
        width,
        height: "1px",
        backgroundColor: "#E8FF00",
        opacity: 0.12,
        transformOrigin: "left center",
        zIndex: 5,
        pointerEvents: "none",
      }}
    />
  );
}

/**
 * FloatingBracket — a decorative corner bracket that fades in and floats.
 */
function FloatingBracket({
  delay,
  top,
  right,
  bottom,
  left,
  rotate = 0,
}: {
  delay: number;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  rotate?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: rotate - 10 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      style={{
        position: "absolute",
        top,
        right,
        bottom,
        left,
        width: "48px",
        height: "48px",
        borderTop: "2px solid rgba(232, 255, 0, 0.1)",
        borderRight: "2px solid rgba(232, 255, 0, 0.1)",
        zIndex: 5,
        pointerEvents: "none",
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <motion.div
        animate={{ opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: "100%",
          height: "100%",
          borderTop: "2px solid #E8FF00",
          borderRight: "2px solid #E8FF00",
        }}
      />
    </motion.div>
  );
}

export default function HeroSection() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  // Track mouse for subtle parallax
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMouseX((e.clientX / window.innerWidth - 0.5) * 2);
      setMouseY((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const handleScrollToWork = () => {
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollDown = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#0A0A0A",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Animated geometric background */}
      <AnimatedHeroBackground />

      {/* ── Decorative animated accent lines ── */}
      <AnimatedLine delay={1.2} width="clamp(80px, 15vw, 200px)" top="18%" left="0" />
      <AnimatedLine delay={1.5} width="clamp(40px, 8vw, 100px)" top="75%" left="0" />

      {/* Right-side accent line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: "absolute",
          top: "30%",
          right: 0,
          width: "clamp(60px, 10vw, 150px)",
          height: "1px",
          backgroundColor: "#E8FF00",
          opacity: 0.08,
          transformOrigin: "right center",
          zIndex: 5,
          pointerEvents: "none",
        }}
      />

      {/* ── Floating decorative brackets ── */}
      <FloatingBracket delay={1.4} top="12%" right="8%" rotate={0} />
      <FloatingBracket delay={1.7} bottom="15%" left="5%" rotate={180} />

      {/* ── Animated vertical line (left edge) ── */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: "absolute",
          left: "clamp(16px, 4vw, 40px)",
          top: "20%",
          height: "60%",
          width: "1px",
          backgroundColor: "rgba(232, 255, 0, 0.06)",
          transformOrigin: "top",
          zIndex: 5,
          pointerEvents: "none",
        }}
      >
        {/* Pulsing dot on the vertical line */}
        <motion.div
          animate={{ y: ["0%", "100%", "0%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 0,
            left: "-3px",
            width: "7px",
            height: "7px",
            backgroundColor: "#E8FF00",
            opacity: 0.3,
          }}
        />
      </motion.div>

      {/* Content container — subtle parallax on mouse move */}
      <motion.div
        className="relative w-full"
        animate={{
          x: mouseX * -4,
          y: mouseY * -3,
        }}
        transition={{ type: "tween", duration: 0.6, ease: "easeOut" }}
        style={{
          zIndex: 10,
          maxWidth: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "clamp(20px, 5vw, 48px)",
          paddingRight: "clamp(20px, 5vw, 48px)",
          paddingTop: "100px",
          paddingBottom: "80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "640px" }}>

          {/* Section label — with line drawing animation */}
          <motion.div {...enterVariant(0.1)}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#555555",
              }}
            >
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: 32 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                style={{
                  height: "1px",
                  display: "inline-block",
                  backgroundColor: "#E8FF00",
                  overflow: "hidden",
                }}
              />
              <span style={{ color: "#E8FF00" }}>00</span> / HELLO
            </span>
          </motion.div>

          {/* Name — Line 1 with character stagger */}
          <motion.div {...enterVariant(0.2)}>
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(36px, 10vw, 96px)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                color: "#F0F0F0",
                margin: 0,
                display: "flex",
              }}
            >
              {"ABDULLAH".split("").map((char, i) => (
                <motion.span
                  key={`a-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.25 + i * 0.04,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          {/* Name — Line 2 with character stagger + glow pulse */}
          <motion.div
            {...enterVariant(0.3)}
            style={{ marginTop: "-8px", position: "relative" }}
          >
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(36px, 10vw, 96px)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                color: "#E8FF00",
                margin: 0,
                display: "flex",
                position: "relative",
              }}
            >
              {"TARIQ".split("").map((char, i) => (
                <motion.span
                  key={`t-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.35 + i * 0.05,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </h1>
            {/* Glow underline on TARIQ */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                position: "absolute",
                bottom: "-4px",
                left: 0,
                width: "100%",
                height: "3px",
                background: "linear-gradient(90deg, #E8FF00 0%, transparent 100%)",
                transformOrigin: "left",
                opacity: 0.4,
              }}
            />
          </motion.div>

          {/* Typewriter Role — styled as a premium compact Code Block */}
          <motion.div
            {...enterVariant(0.4)}
            style={{
              marginTop: "8px",
              backgroundColor: "#111111",
              border: "1px solid rgba(232, 255, 0, 0.15)",
              borderRadius: "6px",
              padding: "10px 14px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "clamp(12px, 1.8vw, 14px)",
              lineHeight: 1.4,
              color: "#888888",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
              position: "relative",
              overflow: "hidden",
              maxWidth: "400px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {/* Minimal glowing status indicator */}
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#E8FF00", opacity: 0.7 }} />
            
            {/* One-liner Code Representation */}
            <div style={{ whiteSpace: "nowrap" }}>
              <span style={{ color: "#E8FF00", opacity: 0.8 }}>const</span> <span style={{ color: "#F0F0F0" }}>role</span> = <span style={{ color: "#98C379" }}>"</span>
              <span style={{ display: "inline-flex", fontWeight: 600 }}>
                <TypewriterHeadline
                  strings={ROLES}
                  typingSpeed={60}
                  deleteSpeed={30}
                  pauseAt={2000}
                  style={{ color: "#E8FF00" }}
                />
              </span>
              <span style={{ color: "#98C379" }}>"</span>;
            </div>
          </motion.div>

          {/* Bio */}
          <motion.p
            {...enterVariant(0.6)}
            style={{
              color: "#A0A0A0",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(13px, 2vw, 16px)",
              lineHeight: 1.7,
              maxWidth: "440px",
              margin: 0,
            }}
          >
            Building performant, accessible web experiences with modern
            tools and a focus on clean architecture.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            {...enterVariant(0.75)}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "8px",
            }}
          >
            {/* VIEW WORK — with animated border sweep on hover */}
            <motion.button
              onClick={handleScrollToWork}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ y: 1, scale: 0.98 }}
              style={{
                backgroundColor: "#E8FF00",
                color: "#0A0A0A",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                padding: "14px 28px",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Animated shimmer effect */}
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "50%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  pointerEvents: "none",
                }}
              />
              VIEW WORK
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <FiArrowRight size={15} />
              </motion.span>
            </motion.button>

            <motion.a
              href="https://drive.google.com/file/d/1gBhMalaueKQXFUfaws_KRxPJGap5xeeP/view?usp=sharing"
              whileHover={{ y: -3, borderColor: "#E8FF00" }}
              whileTap={{ y: 1, scale: 0.98 }}
              style={{
                backgroundColor: "transparent",
                color: "#F0F0F0",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                padding: "14px 28px",
                border: "1px solid #333333",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                textDecoration: "none",
                transition: "border-color 0.2s",
              }}
            >
              DOWNLOAD CV
            </motion.a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            {...enterVariant(0.85)}
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "4px",
            }}
          >
            {SOCIAL_LINKS.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 0.9 + i * 0.08,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                style={{
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#555555",
                  border: "1px solid #222222",
                  textDecoration: "none",
                  transition: "color 0.2s, border-color 0.2s",
                }}
                whileHover={{
                  borderColor: "#E8FF00",
                  color: "#F0F0F0",
                  y: -2,
                  rotate: [0, -5, 5, 0],
                }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon size={17} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        onClick={handleScrollDown}
        style={{
          position: "absolute",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          background: "none",
          border: "none",
          padding: 0,
        }}
        aria-label="Scroll to next section"
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "#555555",
          }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <HiOutlineChevronDown size={18} style={{ color: "#555555" }} />
        </motion.div>
      </motion.button>
    </section>
  );
}
