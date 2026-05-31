import { motion, useMotionValue, useTransform, animate } from "motion/react";
import type { PanInfo } from "motion/react";
import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import type { ReactNode } from "react";

export interface HorizontalScrollHandle {
  scrollBy: (direction: 1 | -1) => void;
}

interface HorizontalScrollProps {
  children: ReactNode;
  itemWidth: number;
  gap: number;
  totalItems: number;
  showProgress?: boolean;
}

const HorizontalScroll = forwardRef<HorizontalScrollHandle, HorizontalScrollProps>(
  ({ children, itemWidth, gap, totalItems, showProgress = false }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const x = useMotionValue(0);

    useEffect(() => {
      const updateWidth = () => {
        if (containerRef.current) {
          setContainerWidth(containerRef.current.offsetWidth);
        }
      };
      
      updateWidth();
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }, []);

    const totalWidth = totalItems * itemWidth + (totalItems - 1) * gap;
    const scrollableWidth = Math.max(0, totalWidth - containerWidth);
    
    // Progress bar transform (scaleX 0 -> 1 as we scroll from 0 -> -scrollableWidth)
    const progress = useTransform(x, [0, -scrollableWidth], [0, 1]);

    const snapTarget = (currentX: number) => {
      const snapWidth = itemWidth + gap;
      const target = Math.round(currentX / snapWidth) * snapWidth;
      return Math.max(-scrollableWidth, Math.min(0, target));
    };

    const handleDragEnd = (e: any, info: PanInfo) => {
      const currentX = x.get() + info.velocity.x * 0.2;
      const target = snapTarget(currentX);
      
      animate(x, target, {
        type: "spring",
        stiffness: 300,
        damping: 30,
      });
    };

    useImperativeHandle(ref, () => ({
      scrollBy: (direction: 1 | -1) => {
        const currentX = x.get();
        const snapWidth = itemWidth + gap;
        const target = snapTarget(currentX + (direction === -1 ? snapWidth : -snapWidth));
        animate(x, target, { type: "spring", stiffness: 300, damping: 30 });
      }
    }));

    return (
      <div style={{ position: "relative" }}>
        <motion.div 
          ref={containerRef} 
          style={{ overflow: "hidden", cursor: "grab" }} 
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: -scrollableWidth, right: 0 }}
            onDragEnd={handleDragEnd}
            style={{ x, display: "flex", gap: `${gap}px`, width: "max-content" }}
          >
            {children}
          </motion.div>
        </motion.div>
        
        {showProgress && scrollableWidth > 0 && (
          <div style={{ marginTop: "32px", height: "3px", backgroundColor: "#222222", position: "relative", overflow: "hidden" }}>
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                backgroundColor: "#E8FF00",
                scaleX: progress,
                transformOrigin: "left",
                width: "100%",
              }}
            />
          </div>
        )}
      </div>
    );
  }
);

export default HorizontalScroll;
