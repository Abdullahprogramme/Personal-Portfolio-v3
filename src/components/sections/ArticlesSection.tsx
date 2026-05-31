import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ARTICLES_DATA } from "../../data/articles";
import { FiArrowUpRight } from "react-icons/fi";

export default function ArticlesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id="articles"
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
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#E8FF00", textTransform: "uppercase", letterSpacing: "0.2em" }}>09</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#555555", letterSpacing: "0.2em" }}>/</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#555555", textTransform: "uppercase", letterSpacing: "0.2em" }}>ARTICLES</span>
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 36px)", color: "#F0F0F0", lineHeight: 1.1 }}>
            WHAT I WROTE
          </h2>
        </motion.div>

        {/* Editorial List */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {ARTICLES_DATA.map((article, index) => {
            const articleNumber = (index + 1).toString().padStart(2, '0');

            return (
              <motion.a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "32px 16px",
                  borderBottom: "1px solid #222222",
                  textDecoration: "none",
                  backgroundColor: "transparent",
                  transition: "background-color 0.15s ease, border-color 0.15s ease",
                  flexWrap: "wrap",
                  gap: "16px"
                }}
                className="article-row"
              >
                {/* Number */}
                <div style={{ minWidth: "48px", fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", color: "#555555" }}>
                  {articleNumber}
                </div>

                {/* Title & Description */}
                <div style={{ flex: "1 1 300px" }}>
                  <h3 
                    className="article-title"
                    style={{ 
                      fontFamily: "'Space Grotesk', sans-serif", 
                      fontSize: "clamp(20px, 3vw, 24px)", 
                      color: "#F0F0F0", 
                      fontWeight: 500,
                      transition: "color 0.15s ease",
                      margin: 0
                    }}
                  >
                    {article.title}
                  </h3>
                  
                  <div className="article-desc-grid">
                    <div className="article-desc-inner">
                      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "14px", color: "#A0A0A0", lineHeight: 1.6, margin: 0 }}>
                        {article.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Meta & Icon */}
                <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "14px", color: "#A0A0A0" }}>
                      {article.publication}
                    </span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#555555" }}>
                      {article.date}
                    </span>
                  </div>
                  
                  <motion.div
                    className="article-icon"
                    variants={{
                      rest: { x: 0, color: "#555555" },
                      hover: { x: 4, color: "#E8FF00" }
                    }}
                    initial="rest"
                    whileHover="hover"
                    style={{ color: "#555555" }}
                  >
                    <FiArrowUpRight size={24} />
                  </motion.div>
                </div>
              </motion.a>
            );
          })}
        </div>

        <style>{`
          .article-row:hover {
            background-color: #111111 !important;
            border-bottom-color: #E8FF00 !important;
          }
          .article-row:hover .article-title {
            color: #E8FF00 !important;
          }
          .article-row:hover .article-icon {
            color: #E8FF00 !important;
            transform: translateX(4px) !important;
          }
          .article-desc-grid {
            display: grid;
            grid-template-rows: 0fr;
            transition: grid-template-rows 0.3s ease;
          }
          .article-row:hover .article-desc-grid {
            grid-template-rows: 1fr;
          }
          .article-desc-inner {
            overflow: hidden;
            opacity: 0;
            transition: opacity 0.3s ease, margin-top 0.3s ease;
          }
          .article-row:hover .article-desc-inner {
            opacity: 1;
            margin-top: 12px;
          }
        `}</style>
      </div>
    </section>
  );
}
