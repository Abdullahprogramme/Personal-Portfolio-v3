import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { TESTIMONIALS_DATA, type TestimonialItem } from "../../data/testimonials";

const CARD_OFFSET = 16;
const SCALE_FACTOR = 0.05;

export default function TestimonialStack() {
  const [cards, setCards] = useState<TestimonialItem[]>(TESTIMONIALS_DATA);
  const [isHovered, setIsHovered] = useState(false);
  const autoAdvanceRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-advance
  useEffect(() => {
    if (isHovered) {
      if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
      return;
    }

    autoAdvanceRef.current = setInterval(() => {
      handleNext();
    }, 5000);

    return () => {
      if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
    };
  }, [cards, isHovered]);

  const handleNext = () => {
    setCards((prev) => {
      const newArray = [...prev];
      const first = newArray.shift();
      if (first) newArray.push(first);
      return newArray;
    });
  };

  const handlePrev = () => {
    setCards((prev) => {
      const newArray = [...prev];
      const last = newArray.pop();
      if (last) newArray.unshift(last);
      return newArray;
    });
  };

  const onDragEnd = (event: any, info: any) => {
    const threshold = 100; // velocity or offset threshold
    if (info.offset.x < -threshold || info.velocity.x < -500) {
      handleNext();
    } else if (info.offset.x > threshold || info.velocity.x > 500) {
      handlePrev();
    }
  };

  return (
    <div 
      style={{ display: "flex", flexDirection: "column", gap: "48px", width: "100%", maxWidth: "800px", margin: "0 auto" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ position: "relative", height: "400px", width: "100%", display: "flex", justifyContent: "center" }}>
        <AnimatePresence mode="popLayout">
          {cards.map((testimonial, index) => {
            const isFront = index === 0;
            const isSecond = index === 1;
            const isThird = index === 2;
            const isVisible = index < 3;

            if (!isVisible) return null;

            let y = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 3 - index;

            if (isSecond) {
              y = CARD_OFFSET;
              scale = 1 - SCALE_FACTOR;
              opacity = 0.6;
            } else if (isThird) {
              y = CARD_OFFSET * 2;
              scale = 1 - SCALE_FACTOR * 2;
              opacity = 0.3;
            }

            return (
              <motion.div
                key={testimonial.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{
                  y: isFront && isHovered ? y - 4 : y,
                  x: isFront && isHovered ? -4 : 0,
                  scale,
                  opacity,
                  zIndex,
                  boxShadow: isFront ? "8px 8px 0px #E8FF00" : "0px 0px 0px transparent",
                  borderColor: isFront ? "#E8FF00" : "#222222"
                }}
                exit={{
                  x: -200,
                  opacity: 0,
                  rotate: -5,
                  transition: { duration: 0.35, ease: "easeIn" }
                }}
                transition={{
                  duration: 0.4,
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
                drag={isFront ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={isFront ? onDragEnd : undefined}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundColor: isFront ? "#111111" : "#0F0F0F",
                  border: "2px solid #222222",
                  padding: "clamp(32px, 5vw, 48px)",
                  display: "flex",
                  flexDirection: "column",
                  cursor: isFront ? "grab" : "default",
                  boxSizing: "border-box"
                }}
                whileTap={isFront ? { cursor: "grabbing" } : {}}
              >
                {/* Quote Mark */}
                <div style={{ position: "absolute", top: "24px", left: "32px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "72px", color: "#E8FF00", lineHeight: 1, opacity: 0.5 }}>
                  "
                </div>

                <div style={{ flexGrow: 1, display: "flex", alignItems: "center", position: "relative", zIndex: 10, marginTop: "24px" }}>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(18px, 3vw, 24px)", color: "#F0F0F0", fontStyle: "italic", lineHeight: 1.6, maxWidth: "600px" }}>
                    {testimonial.quote}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "32px", position: "relative", zIndex: 10 }}>
                  {testimonial.avatarUrl ? (
                    <img 
                      src={testimonial.avatarUrl} 
                      alt={testimonial.author} 
                      style={{ width: "48px", height: "48px", objectFit: "cover", border: "1px solid #333333" }} 
                    />
                  ) : (
                    <div style={{ width: "48px", height: "48px", backgroundColor: "#0A0A0A", border: "1px solid #333333", display: "flex", alignItems: "center", justifyContent: "center", color: "#555555", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
                      {testimonial.author.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "20px", color: "#F0F0F0", fontWeight: 700 }}>
                      {testimonial.author}
                    </h4>
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "14px", color: "#A0A0A0" }}>
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          onClick={handlePrev}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "12px",
            color: "#A0A0A0",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            transition: "color 0.2s ease"
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = "#F0F0F0"}
          onMouseLeave={(e) => e.currentTarget.style.color = "#A0A0A0"}
        >
          PREV
        </button>

        <div style={{ display: "flex", gap: "8px" }}>
          {TESTIMONIALS_DATA.map((item) => {
            const isActive = cards[0].id === item.id;
            return (
              <div 
                key={item.id}
                style={{
                  width: "6px",
                  height: "6px",
                  backgroundColor: isActive ? "#E8FF00" : "#333333",
                  transition: "background-color 0.3s ease"
                }}
              />
            );
          })}
        </div>

        <button
          onClick={handleNext}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "12px",
            color: "#A0A0A0",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            transition: "color 0.2s ease"
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = "#F0F0F0"}
          onMouseLeave={(e) => e.currentTarget.style.color = "#A0A0A0"}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
