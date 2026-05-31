import { useEffect, useRef } from "react";

/**
 * AnimatedLightningBackground.tsx
 * A highly performant canvas background effect where invisible nodes
 * move around and connect to each other with green jagged lightning arcs.
 */

export default function AnimatedLightningBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      // Use parent container dimensions
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width;
        canvas.height = height;
      }
    };
    window.addEventListener("resize", resize);
    resize();

    // Node class for moving points
    class Node {
      x: number;
      y: number;
      vx: number;
      vy: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
    }

    const numNodes = Math.min(Math.floor((width * height) / 30000), 20); // Scale with area, max 20
    const nodes: Node[] = [];
    for (let i = 0; i < numNodes; i++) {
      nodes.push(new Node());
    }

    // Draw jagged line from (x1, y1) to (x2, y2)
    const drawLightning = (x1: number, y1: number, x2: number, y2: number, opacity: number) => {
      const segments = 5;
      ctx.beginPath();
      ctx.moveTo(x1, y1);

      let prevX = x1;
      let prevY = y1;

      for (let i = 1; i <= segments; i++) {
        const t = i / segments;
        const targetX = x1 + (x2 - x1) * t;
        const targetY = y1 + (y2 - y1) * t;

        // If not the last segment, add random perpendicular jitter
        let jitterX = 0;
        let jitterY = 0;
        if (i < segments) {
          const jitterAmount = 15;
          jitterX = (Math.random() - 0.5) * jitterAmount;
          jitterY = (Math.random() - 0.5) * jitterAmount;
        }

        ctx.lineTo(targetX + jitterX, targetY + jitterY);
      }

      ctx.strokeStyle = `rgba(232, 255, 0, ${opacity * 0.5})`; // #E8FF00 but with dynamic opacity
      ctx.lineWidth = 2;
      
      // Glow effect
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#E8FF00";
      
      ctx.stroke();
      
      // Reset glow to avoid performance drop
      ctx.shadowBlur = 0;
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      nodes.forEach(node => node.update());

      const connectionDistance = 300;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            // Only draw lightning sometimes so it "flashes"
            if (Math.random() > 0.6) {
               const opacity = 1 - dist / connectionDistance;
               drawLightning(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y, opacity);
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.8
      }}
    />
  );
}
