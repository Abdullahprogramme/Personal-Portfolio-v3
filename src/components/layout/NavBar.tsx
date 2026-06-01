import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

/**
 * NavBar.tsx
 * Fixed top navigation bar — React island with Motion animations.
 * Uses inline styles for guaranteed rendering on all breakpoints.
 */

const NAV_LINKS = [
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#work" },
  { label: "SKILLS", href: "#skills" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "CONTACT", href: "#contact" },
];

export default function NavBar() {
  const [activeLink, setActiveLink] = useState<string>("#about");
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setActiveLink(href);
    setDrawerOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {/* ── Navbar ── */}
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: scrolled ? "rgba(10, 10, 10, 0.95)" : "#0A0A0A",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: `1px solid ${scrolled ? "#222222" : "transparent"}`,
          transition: "background-color 0.3s, border-color 0.3s, backdrop-filter 0.3s",
        }}
      >
        <div
          style={{
            height: "clamp(56px, 6vw, 64px)",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 40px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "16px",
              fontWeight: 700,
              color: "#F0F0F0",
              textDecoration: "none",
              letterSpacing: "-0.02em",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            AT<span style={{ color: "#E8FF00" }}>.</span>
          </motion.a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-[24px]">
            {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.15 + i * 0.06 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  style={{
                    position: "relative",
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: activeLink === link.href ? "#F0F0F0" : "#A0A0A0",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: activeLink === link.href ? 500 : 400,
                    textDecoration: "none",
                    padding: "8px 0",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#F0F0F0";
                  }}
                  onMouseLeave={(e) => {
                    if (activeLink !== link.href) {
                      (e.currentTarget as HTMLElement).style.color = "#A0A0A0";
                    }
                  }}
                >
                  {link.label}
                  {activeLink === link.href && (
                    <motion.div
                      layoutId="nav-underline"
                      style={{
                        position: "absolute",
                        bottom: "-2px",
                        left: 0,
                        right: 0,
                        height: "2px",
                        backgroundColor: "#E8FF00",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.a>
              ))}

              {/* CTA Button — HIRE ME */}
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#contact");
                }}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  backgroundColor: "#E8FF00",
                  color: "#0A0A0A",
                  padding: "10px 24px",
                  textDecoration: "none",
                  marginLeft: "8px",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                HIRE ME
              </motion.a>
            </div>

          {/* Mobile menu button */}
          <motion.button
            className="flex md:hidden items-center justify-center w-[40px] h-[40px] text-[#F0F0F0] bg-transparent border-none cursor-pointer"
            onClick={() => setDrawerOpen(!drawerOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait">
                {drawerOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <HiOutlineX size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <HiOutlineMenuAlt3 size={24} />
                  </motion.div>
                )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* ── Mobile Full-Screen Overlay ── */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 40,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(10, 10, 10, 0.98)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Close zone (entire background) */}
            <div
              style={{ position: "absolute", inset: 0 }}
              onClick={() => setDrawerOpen(false)}
            />

            {/* Links */}
            <nav
              style={{
                position: "relative",
                zIndex: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "28px",
              }}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  style={{
                    fontSize: "20px",
                    textTransform: "uppercase",
                    letterSpacing: "0.25em",
                    color: activeLink === link.href ? "#E8FF00" : "#A0A0A0",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: activeLink === link.href ? 600 : 400,
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                >
                  {link.label}
                  {activeLink === link.href && (
                    <motion.div
                      layoutId="mobile-nav-underline"
                      style={{
                        height: "2px",
                        marginTop: "8px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "40px",
                        backgroundColor: "#E8FF00",
                      }}
                    />
                  )}
                </motion.a>
              ))}

              {/* CTA — Mobile HIRE ME */}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: NAV_LINKS.length * 0.06 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#contact");
                }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  backgroundColor: "#E8FF00",
                  color: "#0A0A0A",
                  padding: "16px 48px",
                  textDecoration: "none",
                  marginTop: "12px",
                }}
              >
                HIRE ME
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
