import { Suspense, lazy } from "react";
import { motion } from "motion/react";

/**
 * SplineHero.tsx
 * Spline 3D scene for the Hero section — lazy-loaded with Suspense.
 *
 * The Spline scene is loaded via @splinetool/react-spline.
 * A loading placeholder is shown while the scene loads.
 * The entire container fades in with scale animation on mount.
 */

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineHeroProps {
  /** URL to the .splinecode scene file */
  sceneUrl?: string;
}

export default function SplineHero({
  sceneUrl = "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode",
}: SplineHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      className="w-full h-full relative"
    >
      <Suspense
        fallback={
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: "#0A0A0A" }}
          >
            {/* Minimal loading indicator */}
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2"
                  style={{ backgroundColor: "#E8FF00" }}
                  animate={{ scale: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </div>
          </div>
        }
      >
        <Spline
          scene={sceneUrl}
          style={{ width: "100%", height: "100%" }}
        />
      </Suspense>
    </motion.div>
  );
}
