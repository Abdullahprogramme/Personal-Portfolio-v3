import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { FiGithub, FiLinkedin, FiInstagram, FiFacebook, FiArrowUp } from "react-icons/fi";
import { GiBrain } from "react-icons/gi";

/**
 * Footer.tsx
 * Premium footer with proper spacing, responsive layout, and Motion animations.
 * Uses inline styles for guaranteed rendering.
 */

const NAV_LINKS = [
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#work" },
  { label: "SKILLS", href: "#skills" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "CONTACT", href: "#contact" },
];

const SOCIAL_LINKS = [
  { icon: FiGithub, href: "https://github.com/Abdullahprogramme", label: "GitHub" },
    { icon: FiLinkedin, href: "https://www.linkedin.com/in/abdullahtariq78/", label: "LinkedIn" },
    { icon: FiInstagram, href: "https://www.instagram.com/abdullahtariq62/?next=%2F&hl=en", label: "Instagram" },
    { icon: FiFacebook, href: "https://www.facebook.com/abdullah.tariq.7262", label: "Facebook" },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth < 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
      style={{
        backgroundColor: "#0A0A0A",
        borderTop: "1px solid #222222",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "0 20px" : "0 clamp(24px, 3vw, 40px)",
        }}
      >
        {/* ── Main Footer Content ── */}
        <div
          style={{
            padding: isMobile ? "40px 0" : "56px 0",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1.5fr 1fr 1fr 1fr",
            gap: isMobile ? "36px" : "32px",
          }}
        >
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToTop();
              }}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "20px",
                fontWeight: 700,
                color: "#F0F0F0",
                textDecoration: "none",
                display: "inline-block",
                marginBottom: "12px",
              }}
            >
              AT<span style={{ color: "#E8FF00" }}>.</span>
            </a>
            <p
              style={{
                fontSize: "13px",
                lineHeight: 1.7,
                color: "#555555",
                fontFamily: "'Montserrat', sans-serif",
                maxWidth: "240px",
                margin: 0,
              }}
            >
              Software Engineer building performant web experiences with modern tools.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  style={{
                    width: "36px",
                    height: "36px",
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
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={15} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#E8FF00",
                marginBottom: "16px",
              }}
            >
              Navigation
            </h4>
            <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  style={{
                    fontSize: "13px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#555555",
                    fontFamily: "'Montserrat', sans-serif",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#F0F0F0";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#555555";
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Status column — replaces generic "Built With" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#E8FF00",
                marginBottom: "16px",
              }}
            >
              Status
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {/* Availability */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#39FF14",
                    borderRadius: "50%",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: "13px",
                    color: "#A0A0A0",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  Available for work
                </span>
              </div>

              {/* Location */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    color: "#555555",
                    fontFamily: "'JetBrains Mono', monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                  }}
                >
                  Based in
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    color: "#A0A0A0",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  Pakistan · UTC+5
                </span>
              </div>

              {/* Response time */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    color: "#555555",
                    fontFamily: "'JetBrains Mono', monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                  }}
                >
                  Response time
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    color: "#A0A0A0",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  Within 24 hours
                </span>
              </div>
            </div>
          </motion.div>

          {/* Back to Top column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: isMobile ? "flex-start" : isTablet ? "flex-start" : "flex-end",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h4
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "#E8FF00",
                  marginBottom: "16px",
                  textAlign: isTablet ? "left" : "right",
                }}
              >
                Get in Touch
              </h4>
              <div style={{ textAlign: isTablet ? "left" : "right" }}>
                <a
                  href="mailto:abdtariq78@gmail.com"
                  className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-3/4 after:h-[1px] after:bg-[#555555] hover:after:bg-[#E8FF00] after:transition-colors after:duration-200"
                  style={{
                    fontSize: "13px",
                    color: "#555555",
                    fontFamily: "'Montserrat', sans-serif",
                    textDecoration: "none",
                    display: "inline-block",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#E8FF00";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#555555";
                  }}
                >
                  abdtariq78@gmail.com
                </a>
              </div>
            </div>

            <motion.button
              onClick={handleScrollToTop}
              whileHover={{ y: -3, borderColor: "#E8FF00" }}
              whileTap={{ scale: 0.95 }}
              style={{
                marginTop: "24px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                color: "#A0A0A0",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                border: "1px solid #222222",
                background: "none",
                cursor: "pointer",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#E8FF00";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#A0A0A0";
              }}
            >
              BACK TO TOP
              <FiArrowUp size={13} />
            </motion.button>
          </motion.div>
        </div>

        {/* ── Bottom Bar ── */}
        <div
          style={{
            borderTop: "1px solid #1A1A1A",
            padding: isMobile ? "16px 0" : "20px 0",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              color: "#E8FF00",
              fontFamily: "'Montserrat', sans-serif",
              margin: 0,
            }}
          >
            © {currentYear} Abdullah Tariq. All rights reserved.
          </p>
          <p className="flex items-center gap-2"
            style={{
              fontSize: "14px",
              color: "#E8FF00",
              fontFamily: "'JetBrains Mono', monospace",
              margin: 0,
            }}
          >
            Designed & Built with <GiBrain />
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
