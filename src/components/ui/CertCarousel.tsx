import { motion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import HorizontalScroll, { type HorizontalScrollHandle } from "./HorizontalScroll";
import { CERTIFICATIONS_DATA } from "../../data/certifications";
import { FiAward, FiArrowLeft, FiArrowRight, FiExternalLink } from "react-icons/fi";

export default function CertCarousel() {
  const scrollRef = useRef<HorizontalScrollHandle>(null);
  const [itemWidth, setItemWidth] = useState(350);

  useEffect(() => {
    const handleResize = () => {
      // Responsive width: mobile shows 1.2 cards (peek effect)
      if (window.innerWidth < 768) {
        setItemWidth(window.innerWidth * 0.8);
      } else {
        setItemWidth(350); // Desktop fixed width
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {/* Navigation Arrows Flanking the Carousel on desktop */}
      <div 
        style={{ 
          display: "flex", 
          justifyContent: "flex-end", 
          gap: "12px",
          marginBottom: "24px"
        }}
      >
        <button
          onClick={() => scrollRef.current?.scrollBy(-1)}
          style={{
            width: "32px",
            height: "32px",
            backgroundColor: "#111111",
            border: "1px solid #333333",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background-color 0.2s, border-color 0.2s, color 0.2s",
            color: "#A0A0A0",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#F0F0F0"; e.currentTarget.style.borderColor = "#E8FF00"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#A0A0A0"; e.currentTarget.style.borderColor = "#333333"; }}
        >
          <FiArrowLeft size={16} />
        </button>
        <button
          onClick={() => scrollRef.current?.scrollBy(1)}
          style={{
            width: "32px",
            height: "32px",
            backgroundColor: "#111111",
            border: "1px solid #333333",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background-color 0.2s, border-color 0.2s, color 0.2s",
            color: "#A0A0A0",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#F0F0F0"; e.currentTarget.style.borderColor = "#E8FF00"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#A0A0A0"; e.currentTarget.style.borderColor = "#333333"; }}
        >
          <FiArrowRight size={16} />
        </button>
      </div>

      <HorizontalScroll 
        ref={scrollRef} 
        itemWidth={itemWidth} 
        gap={24} 
        totalItems={CERTIFICATIONS_DATA.length}
        showProgress={false}
      >
        {CERTIFICATIONS_DATA.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            whileHover={{ 
              y: -4, 
              x: -4,
              borderColor: "#E8FF00",
              boxShadow: "8px 8px 0px #E8FF00"
            }}
            whileTap={{
              y: 0,
              x: 0,
              boxShadow: "0px 0px 0px #E8FF00"
            }}
            style={{
              width: `${itemWidth}px`,
              backgroundColor: "#111111",
              border: "2px solid #333333",
              boxShadow: "4px 4px 0px #333333",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              flexShrink: 0,
              transition: "border-color 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <FiAward size={32} color="#A0A0A0" style={{ marginBottom: "20px" }} />
            
            <h3 
              style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "20px",
              fontWeight: 700,
              color: "#F0F0F0",
              marginBottom: "8px",
              lineHeight: 1.3
            }}>
              {cert.title}
            </h3>
            
            <div style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "14px",
              color: "#A0A0A0",
              marginBottom: "16px"
            }}>
              {cert.issuer}
            </div>
            
            <div style={{ flexGrow: 1 }} />
            
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "12px",
              color: "#555555",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              marginBottom: "16px"
            }}>
              <span>{cert.date}</span>
            </div>
            
            <a 
              href={cert.link} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                color: "#E8FF00",
                textDecoration: "none",
                fontWeight: 700,
                alignSelf: "flex-end"
              }}
            >
              VERIFY <FiExternalLink size={14} />
            </a>
          </motion.div>
        ))}
      </HorizontalScroll>
    </div>
  );
}
