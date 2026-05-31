import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";

/**
 * TypewriterHeadline.tsx
 * Custom typewriter effect — no library dependency.
 *
 * Cycles through an array of strings, typing each character,
 * pausing at the end, then deleting in reverse before advancing.
 * Blinking cursor in accent colour.
 */

interface TypewriterProps {
  strings: string[];
  typingSpeed?: number;
  deleteSpeed?: number;
  pauseAt?: number;
  className?: string;
}

export default function TypewriterHeadline({
  strings,
  typingSpeed = 60,
  deleteSpeed = 30,
  pauseAt = 2000,
  className = "",
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [stringIndex, setStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentString = strings[stringIndex];

  const tick = useCallback(() => {
    if (isPaused) return;

    if (!isDeleting) {
      // Typing forward
      if (displayText.length < currentString.length) {
        setDisplayText(currentString.slice(0, displayText.length + 1));
      } else {
        // Reached end — pause before deleting
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseAt);
      }
    } else {
      // Deleting backward
      if (displayText.length > 0) {
        setDisplayText(currentString.slice(0, displayText.length - 1));
      } else {
        // Finished deleting — advance to next string
        setIsDeleting(false);
        setStringIndex((prev) => (prev + 1) % strings.length);
      }
    }
  }, [displayText, isDeleting, isPaused, currentString, strings.length, pauseAt]);

  useEffect(() => {
    const speed = isDeleting ? deleteSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, deleteSpeed, typingSpeed]);

  return (
    <span
      className={className}
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "clamp(14px, 2.5vw, 18px)",
      }}
    >
      <span style={{ color: "#F0F0F0" }}>{displayText}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
        style={{ color: "#E8FF00" }}
      >
        |
      </motion.span>
    </span>
  );
}
