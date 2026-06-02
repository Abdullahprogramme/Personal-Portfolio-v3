import { useEffect, useRef, useState } from "react";

/**
 * AnimatedHeroBackground.tsx
 * Canvas-based animated background — "Binary Cube Matrix" style.
 *
 * Renders:
 * 1. Falling binary digits (0/1) in a matrix-rain pattern using #E8FF00 at low opacity
 * 2. Floating wireframe cubes that slowly rotate and drift
 * 3. Subtle radial glow effects
 *
 * All rendered on a <canvas> for smooth 60fps performance.
 * Blends seamlessly into the #0A0A0A background.
 */

interface Cube {
  x: number;
  y: number;
  z: number;
  size: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  speedX: number;
  speedY: number;
  speedRX: number;
  speedRY: number;
  speedRZ: number;
  opacity: number;
}

interface BinaryColumn {
  x: number;
  chars: { char: string; y: number; opacity: number; speed: number }[];
}

function project3D(
  x: number,
  y: number,
  z: number,
  cx: number,
  cy: number
): [number, number, number] {
  const perspective = 800;
  const scale = perspective / (perspective + z);
  return [x * scale + cx, y * scale + cy, scale];
}

function rotatePoint(
  x: number,
  y: number,
  z: number,
  rx: number,
  ry: number,
  rz: number
): [number, number, number] {
  // Rotate around X
  let y1 = y * Math.cos(rx) - z * Math.sin(rx);
  let z1 = y * Math.sin(rx) + z * Math.cos(rx);
  // Rotate around Y
  let x1 = x * Math.cos(ry) + z1 * Math.sin(ry);
  let z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);
  // Rotate around Z
  let x2 = x1 * Math.cos(rz) - y1 * Math.sin(rz);
  let y2 = x1 * Math.sin(rz) + y1 * Math.cos(rz);
  return [x2, y2, z2];
}

export default function AnimatedHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.parentElement?.clientWidth || window.innerWidth;
      h = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // ── Binary rain columns ──
    // Decrease density on mobile screens
    const columnDensity = w < 768 ? 50 : 28;
    const columnCount = Math.floor(w / columnDensity);
    const columns: BinaryColumn[] = [];
    for (let i = 0; i < columnCount; i++) {
      const x = (i / columnCount) * w + Math.random() * 14;
      const charCount = 3 + Math.floor(Math.random() * 8);
      const chars = [];
      for (let j = 0; j < charCount; j++) {
        chars.push({
          char: Math.random() > 0.5 ? "1" : "0",
          y: Math.random() * h,
          opacity: 0.02 + Math.random() * 0.08,
          speed: 0.3 + Math.random() * 0.8,
        });
      }
      columns.push({ x, chars });
    }

    // ── Floating wireframe cubes ──
    const cubes: Cube[] = [];
    const maxCubes = w < 768 ? 3 : 8;
    const cubeCount = Math.min(Math.floor(w / 200) + 2, maxCubes);
    for (let i = 0; i < cubeCount; i++) {
      cubes.push({
        x: (Math.random() - 0.5) * w * 0.8,
        y: (Math.random() - 0.5) * h * 0.6,
        z: 100 + Math.random() * 400,
        size: 30 + Math.random() * 50,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.1,
        speedRX: (Math.random() - 0.5) * 0.008,
        speedRY: (Math.random() - 0.5) * 0.01,
        speedRZ: (Math.random() - 0.5) * 0.005,
        opacity: 0.04 + Math.random() * 0.08,
      });
    }

    const cubeVertices = [
      [-1, -1, -1],
      [1, -1, -1],
      [1, 1, -1],
      [-1, 1, -1],
      [-1, -1, 1],
      [1, -1, 1],
      [1, 1, 1],
      [-1, 1, 1],
    ];

    const cubeEdges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // back face
      [4, 5], [5, 6], [6, 7], [7, 4], // front face
      [0, 4], [1, 5], [2, 6], [3, 7], // connecting edges
    ];

    // ── Animation loop ──
    let lastTime = performance.now();

    const animate = (time: number) => {
      const dt = Math.min((time - lastTime) / 16.67, 3); // normalized to ~60fps
      lastTime = time;

      ctx.clearRect(0, 0, w, h);

      // ── Draw radial glow ──
      const glowGrad = ctx.createRadialGradient(
        w * 0.75, h * 0.3, 0,
        w * 0.75, h * 0.3, w * 0.5
      );
      glowGrad.addColorStop(0, "rgba(232, 255, 0, 0.03)");
      glowGrad.addColorStop(1, "transparent");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, w, h);

      // ── Draw subtle grid ──
      ctx.strokeStyle = "rgba(232, 255, 0, 0.025)";
      ctx.lineWidth = 0.5;
      const gridSize = 80;
      for (let gx = 0; gx < w; gx += gridSize) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, h);
        ctx.stroke();
      }
      for (let gy = 0; gy < h; gy += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }

      // ── Draw binary rain ──
      ctx.font = "12px 'JetBrains Mono', monospace";
      for (const col of columns) {
        for (const ch of col.chars) {
          // Randomly change character
          if (Math.random() < 0.01) {
            ch.char = Math.random() > 0.5 ? "1" : "0";
          }
          ctx.fillStyle = `rgba(232, 255, 0, ${ch.opacity})`;
          ctx.fillText(ch.char, col.x, ch.y);

          ch.y += ch.speed * dt;
          if (ch.y > h + 20) {
            ch.y = -20;
            ch.opacity = 0.02 + Math.random() * 0.08;
          }
        }
      }

      // ── Draw wireframe cubes ──
      const cx = w / 2;
      const cy = h / 2;

      for (const cube of cubes) {
        cube.x += cube.speedX * dt;
        cube.y += cube.speedY * dt;
        cube.rotX += cube.speedRX * dt;
        cube.rotY += cube.speedRY * dt;
        cube.rotZ += cube.speedRZ * dt;

        // Wrap around
        if (cube.x > w * 0.6) cube.speedX = -Math.abs(cube.speedX);
        if (cube.x < -w * 0.6) cube.speedX = Math.abs(cube.speedX);
        if (cube.y > h * 0.5) cube.speedY = -Math.abs(cube.speedY);
        if (cube.y < -h * 0.5) cube.speedY = Math.abs(cube.speedY);

        const projected: [number, number][] = [];
        for (const v of cubeVertices) {
          const [rx, ry, rz] = rotatePoint(
            v[0] * cube.size,
            v[1] * cube.size,
            v[2] * cube.size,
            cube.rotX,
            cube.rotY,
            cube.rotZ
          );
          const [px, py] = project3D(
            rx + cube.x,
            ry + cube.y,
            rz + cube.z,
            cx,
            cy
          );
          projected.push([px, py]);
        }

        ctx.strokeStyle = `rgba(232, 255, 0, ${cube.opacity})`;
        ctx.lineWidth = 1;
        for (const [a, b] of cubeEdges) {
          ctx.beginPath();
          ctx.moveTo(projected[a][0], projected[a][1]);
          ctx.lineTo(projected[b][0], projected[b][1]);
          ctx.stroke();
        }
      }

      // ── Draw corner brackets ──
      ctx.strokeStyle = "rgba(232, 255, 0, 0.06)";
      ctx.lineWidth = 1.5;

      // Top-right bracket
      const trx = w * 0.85, try_ = h * 0.12, bs = 40;
      ctx.beginPath();
      ctx.moveTo(trx, try_);
      ctx.lineTo(trx + bs, try_);
      ctx.moveTo(trx + bs, try_);
      ctx.lineTo(trx + bs, try_ + bs);
      ctx.stroke();

      // Bottom-left bracket
      const blx = w * 0.1, bly = h * 0.82;
      ctx.beginPath();
      ctx.moveTo(blx + bs, bly + bs);
      ctx.lineTo(blx, bly + bs);
      ctx.moveTo(blx, bly + bs);
      ctx.lineTo(blx, bly);
      ctx.stroke();

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
