import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { FiArrowUpRight, FiBriefcase, FiCheck } from "react-icons/fi";
import { SiUpwork } from "react-icons/si";
import AnimatedLightningBackground from "../ui/AnimatedLightningBackground";

const PROFILES = [
  {
    name: "Upwork",
    icon: SiUpwork,
    logoSrc: undefined,
    brandBackground: "#14A800",
    brandColor: "#FFFFFF",
    eyebrow: "OPEN FOR PROJECTS",
    description: "Available for thoughtful web products, full-stack builds, and long-term engineering partnerships.",
    href: "https://www.upwork.com/freelancers/~014b72e4e0a5441439?mp_source=share",
    accent: "#14A800",
    services: ["Full-stack development", "React and Next.js", "TypeScript architecture"],
  },
  {
    name: "Contra",
    icon: undefined,
    logoSrc: "/Contra.png",
    brandBackground: "#F0F0F0",
    brandColor: "#0A0A0A",
    eyebrow: "INDEPENDENT TALENT",
    description: "A direct line for ambitious digital work where product thinking and clean execution matter.",
    href: "https://contra.com/abdullah_tariq_tmvafb71?referralExperimentNid=DEFAULT_REFERRAL_PROGRAM&referrerUsername=abdullah_tariq_tmvafb71",
    accent: "#F0F0F0",
    services: ["Frontend experiences", "Performance-focused builds", "Design systems"],
  },
];

export default function FreelanceProfilesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      id="freelance"
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#0A0A0A",
        padding: "clamp(64px, 8vw, 96px) clamp(16px, 5vw, 40px)",
      }}
    >
      <AnimatedLightningBackground />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ maxWidth: "720px", marginBottom: "48px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#E8FF00", letterSpacing: "0.2em" }}>12</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#555555", letterSpacing: "0.2em" }}>/</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#555555", letterSpacing: "0.2em" }}>FREELANCE</span>
          </div>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(32px, 6vw, 64px)", lineHeight: 0.98, letterSpacing: "-0.03em", color: "#F0F0F0", margin: 0 }}>
            LET&apos;S MAKE<br />
            <span style={{ color: "#E8FF00" }}>GOOD WORK.</span>
          </h2>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "16px", color: "#A0A0A0", lineHeight: 1.7, margin: "24px 0 0", maxWidth: "560px" }}>
            Find me where independent builders and serious products meet.
          </p>
        </motion.div>

        <div className="freelance-profile-grid" style={{ display: "grid", gap: "24px" }}>
          {PROFILES.map((profile, index) => (
            <motion.a
              key={profile.name}
              href={profile.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 36 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.12 + index * 0.12, ease: "easeOut" }}
              whileHover={{ y: -6, x: -6, boxShadow: "10px 10px 0px #E8FF00", borderColor: "#E8FF00" }}
              whileTap={{ y: -2, x: -2 }}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                minHeight: "330px",
                padding: "clamp(24px, 4vw, 40px)",
                backgroundColor: "#111111",
                border: "2px solid #333333",
                boxShadow: "5px 5px 0px #333333",
                color: "inherit",
                textDecoration: "none",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "56px", height: "56px", display: "grid", placeItems: "center", backgroundColor: profile.brandBackground, color: profile.brandColor, border: "2px solid #F0F0F0", boxShadow: profile.name === "Upwork" ? "0 0 24px rgba(20, 168, 0, 0.35)" : "none" }}>
                    {profile.logoSrc ? (
                      <img src={profile.logoSrc} alt="" style={{ width: "34px", height: "34px", objectFit: "contain" }} />
                    ) : profile.icon ? (
                      <profile.icon size={28} />
                    ) : null}
                  </div>
                  <div>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.16em", color: profile.accent, margin: "0 0 6px" }}>{profile.eyebrow}</p>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1, color: "#F0F0F0", margin: 0 }}>{profile.name}</h3>
                  </div>
                </div>
                <FiArrowUpRight size={24} color="#E8FF00" />
              </div>

              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "15px", color: "#A0A0A0", lineHeight: 1.65, maxWidth: "440px", margin: "32px 0 24px" }}>{profile.description}</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "auto" }}>
                {profile.services.map((service) => (
                  <div key={service} style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#F0F0F0" }}>
                    <FiCheck size={14} color="#E8FF00" />
                    {service}
                  </div>
                ))}
              </div>

              <div style={{ position: "absolute", right: "24px", bottom: "18px", color: "#333333" }}>
                <FiBriefcase size={44} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <style>{`
        .freelance-profile-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .freelance-profile-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
}