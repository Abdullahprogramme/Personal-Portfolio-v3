import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import type { EducationItem } from "../../data/education";
import type { ExperienceItem } from "../../data/experience";

export type TimelineType = "education" | "experience";

export interface TimelineProps {
  type: TimelineType;
  items: (EducationItem | ExperienceItem)[];
}

export default function Timeline({ type, items }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: "relative", 
        paddingLeft: "32px", 
        display: "flex", 
        flexDirection: "column", 
        gap: "48px" 
      }}
    >
      {/* Vertical line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.0, ease: "easeInOut" }}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "2px",
          backgroundColor: "#222222",
          transformOrigin: "top",
        }}
      />
      
      {items.map((item, index) => (
        <TimelineEntry 
          key={item.id} 
          item={item} 
          index={index} 
          type={type} 
          containerInView={isInView} 
        />
      ))}
    </div>
  );
}

function TimelineEntry({ item, index, type, containerInView }: { item: any; index: number; type: TimelineType; containerInView: boolean }) {
  const isEducation = type === "education";
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={containerInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2, ease: "easeOut" }}
      style={{
        position: "relative",
        backgroundColor: "#111111",
        border: "2px solid",
        borderColor: isHovered ? "#E8FF00" : "#333333",
        boxShadow: isHovered ? "6px 6px 0px #E8FF00" : "4px 4px 0px #333333",
        padding: "clamp(20px, 4vw, 32px)",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Timeline Node (Square) */}
      <motion.div
        initial={{ scale: 0 }}
        animate={containerInView ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: index * 0.2 + 0.1, ease: "backOut" }}
        style={{
          position: "absolute",
          left: "calc(-32px - 7px)", // -paddingLeft of container (32px) - half width of square (6px) + half line width (1px)
          top: "32px",
          width: "12px",
          height: "12px",
          backgroundColor: "#E8FF00",
        }}
      />

      {/* Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Header Area */}
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "12px",
              color: "#E8FF00",
              marginBottom: "8px",
            }}
          >
            {item.year}
          </div>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  color: isEducation ? "#F0F0F0" : "#E8FF00",
                  lineHeight: 1.2,
                  marginBottom: "4px",
                }}
              >
                {isEducation ? item.degree : item.role}
              </h3>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: isEducation ? "14px" : "18px",
                  color: "#A0A0A0",
                }}
              >
                {isEducation ? item.institution : item.company}
              </div>
            </div>
            
            {!isEducation && item.badge && (
              <Badge text={item.badge} />
            )}
          </div>
        </div>

        {/* Body Area */}
        {isEducation ? (
          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "14px",
              color: "#555555",
            }}
          >
            {item.gpa}
          </div>
        ) : (
          <ul
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "14px",
              color: "#A0A0A0",
              margin: 0,
              paddingLeft: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {item.bullets.map((bullet: string, i: number) => (
              <li key={i} style={{ listStyleType: "disc" }}>{bullet}</li>
            ))}
          </ul>
        )}

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
          {item.tags.map((tag: string) => (
            <span
              key={tag}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                backgroundColor: "#111111",
                border: "1px solid #333333",
                color: "#A0A0A0",
                padding: "4px 10px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Badge({ text }: { text: string }) {
  const [pulse, setPulse] = useState(false);
  
  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "12px",
        backgroundColor: "#0A0A0A",
        border: "2px solid",
        borderColor: pulse ? "rgba(232, 255, 0, 0.5)" : "#E8FF00",
        boxShadow: "2px 2px 0px #E8FF00",
        color: "#E8FF00",
        padding: "2px 8px",
        transition: "border-color 0.15s ease",
        cursor: "default",
      }}
      onMouseEnter={() => {
        setPulse(true);
        setTimeout(() => setPulse(false), 150);
        setTimeout(() => setPulse(true), 300);
        setTimeout(() => setPulse(false), 450);
      }}
    >
      {text}
    </div>
  );
}
