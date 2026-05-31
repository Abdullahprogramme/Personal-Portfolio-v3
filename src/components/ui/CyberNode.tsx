import { useState, useEffect } from "react";
import { motion } from "motion/react";

export default function CyberNode() {
  const [hexCode, setHexCode] = useState("0x0000");

  useEffect(() => {
    const interval = setInterval(() => {
      setHexCode(`0x${Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, "0")}`);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        flex: 1,
        minHeight: "300px",
        width: "100%",
        marginTop: "16px",
        backgroundColor: "#0A0A0A",
        border: "1px solid #222222",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          zIndex: 0,
        }}
      />

      {/* Flashing Corner Texts */}
      <div style={{ position: "absolute", top: "16px", left: "16px", zIndex: 10 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#555555", letterSpacing: "0.2em" }}>SYS_STATUS</div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#E8FF00", display: "flex", alignItems: "center", gap: "6px" }}>
          <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} style={{ width: "6px", height: "6px", backgroundColor: "#E8FF00", borderRadius: "50%" }} />
          ONLINE
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "16px", right: "16px", zIndex: 10, textAlign: "right" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#555555", letterSpacing: "0.2em" }}>MEM_ADDR</div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#A0A0A0" }}>
          {hexCode}
        </div>
      </div>

      <div style={{ position: "absolute", top: "16px", right: "16px", zIndex: 10, textAlign: "right" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#555555", letterSpacing: "0.2em" }}>NODE</div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#A0A0A0" }}>78</div>
      </div>

      {/* Moving Electric Pulse on Border */}
      <motion.div
        animate={{ left: ["-10%", "110%", "-10%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ position: "absolute", top: 0, height: "1px", width: "30%", background: "linear-gradient(90deg, transparent, #E8FF00, transparent)", zIndex: 5 }}
      />
      <motion.div
        animate={{ top: ["-10%", "110%", "-10%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
        style={{ position: "absolute", right: 0, width: "1px", height: "30%", background: "linear-gradient(180deg, transparent, #E8FF00, transparent)", zIndex: 5 }}
      />

      {/* Center Animated Rings */}
      <div style={{ position: "relative", width: "140px", height: "140px", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 5 }}>
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            border: "1px dashed #333333",
            borderRadius: "50%",
            borderTop: "2px solid #A0A0A0",
            borderRight: "1px solid #E8FF00",
          }}
        />
        {/* Middle Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            width: "70%",
            height: "70%",
            border: "1px dotted #555555",
            borderRadius: "50%",
            borderBottom: "2px solid #E8FF00",
            borderLeft: "2px solid #333333",
          }}
        />
        {/* Inner Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            width: "40%",
            height: "40%",
            border: "1px solid #222222",
            borderRadius: "50%",
            borderTop: "2px solid #E8FF00",
          }}
        />
        {/* Core Dot */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "12px",
            height: "12px",
            backgroundColor: "#E8FF00",
            borderRadius: "50%",
            boxShadow: "0 0 20px #E8FF00",
          }}
        />
      </div>
    </div>
  );
}
