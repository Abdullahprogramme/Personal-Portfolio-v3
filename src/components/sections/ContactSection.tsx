import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import emailjs from "@emailjs/browser";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import CyberNode from "../ui/CyberNode";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const formRef = useRef<HTMLFormElement>(null);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const form = e.target as HTMLFormElement;
    const name = form.user_name.value;
    const email = form.user_email.value;
    const message = form.message.value;
    
    const fullMessage = `${name} with email ${email}. ${message}`;
    form.message.value = fullMessage;
    
    setStatus("loading");

    const serviceId = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.PUBLIC_EMAILJS_USER_ID;

    if (!serviceId || !templateId || !publicKey) {
      console.error("Missing EmailJS environment variables.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
      return;
    }

    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(() => {
        setStatus("success");
        formRef.current?.reset();
        setTimeout(() => setStatus("idle"), 5000);
      })
      .catch((err) => {
        console.error("Failed to send email:", err);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      });
  };

  return (
    <section
      id="contact"
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
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#E8FF00", textTransform: "uppercase", letterSpacing: "0.2em" }}>12</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#555555", letterSpacing: "0.2em" }}>/</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#555555", textTransform: "uppercase", letterSpacing: "0.2em" }}>CONTACT</span>
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 36px)", color: "#F0F0F0", lineHeight: 1.1 }}>
            LET'S TALK
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ display: "flex", flexDirection: "column", gap: "32px" }}
          >
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(16px, 2vw, 18px)", color: "#A0A0A0", lineHeight: 1.6 }}>
              I'm always open to discussing product design work or partnership opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <FiMail size={24} color="#E8FF00" />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", color: "#F0F0F0" }}>abdtariq78@gmail.com</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "24px", marginTop: "16px" }}>
              <a href="https://github.com/Abdullahprogramme" style={{ color: "#555555", transition: "color 0.2s ease" }} onMouseEnter={(e) => e.currentTarget.style.color = "#E8FF00"} onMouseLeave={(e) => e.currentTarget.style.color = "#555555"}>
                <FiGithub size={24} />
              </a>
              <a href="https://www.linkedin.com/in/abdullahtariq78/" style={{ color: "#555555", transition: "color 0.2s ease" }} onMouseEnter={(e) => e.currentTarget.style.color = "#E8FF00"} onMouseLeave={(e) => e.currentTarget.style.color = "#555555"}>
                <FiLinkedin size={24} />
              </a>
            </div>

            {/* Custom High-Tech Cyber Node Component */}
            <CyberNode />
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              backgroundColor: "#111111",
              border: "2px solid #333333",
              boxShadow: "8px 8px 0px #333333",
              padding: "clamp(24px, 4vw, 40px)",
            }}
          >
            <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label htmlFor="user_name" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#A0A0A0", textTransform: "uppercase" }}>Name</label>
                <input 
                  type="text" 
                  name="user_name" 
                  id="user_name"
                  required
                  style={{
                    backgroundColor: "#0A0A0A",
                    border: "2px solid #333333",
                    padding: "16px",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "16px",
                    color: "#F0F0F0",
                    outline: "none",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease"
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "#E8FF00"; e.target.style.boxShadow = "4px 4px 0px #E8FF00"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#333333"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label htmlFor="user_email" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#A0A0A0", textTransform: "uppercase" }}>Email</label>
                <input 
                  type="email" 
                  name="user_email" 
                  id="user_email"
                  required
                  style={{
                    backgroundColor: "#0A0A0A",
                    border: "2px solid #333333",
                    padding: "16px",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "16px",
                    color: "#F0F0F0",
                    outline: "none",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease"
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "#E8FF00"; e.target.style.boxShadow = "4px 4px 0px #E8FF00"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#333333"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label htmlFor="message" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#A0A0A0", textTransform: "uppercase" }}>Message</label>
                <textarea 
                  name="message" 
                  id="message"
                  required
                  rows={4}
                  style={{
                    backgroundColor: "#0A0A0A",
                    border: "2px solid #333333",
                    padding: "16px",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "16px",
                    color: "#F0F0F0",
                    outline: "none",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    resize: "vertical"
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "#E8FF00"; e.target.style.boxShadow = "4px 4px 0px #E8FF00"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#333333"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ y: -4, x: -4, boxShadow: "8px 8px 0px #E8FF00" }}
                whileTap={{ y: 0, x: 0, boxShadow: "0px 0px 0px #E8FF00" }}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#111111",
                  backgroundColor: status === "loading" ? "#A0A0A0" : "#E8FF00",
                  padding: "16px",
                  border: "2px solid #E8FF00",
                  boxShadow: "4px 4px 0px #E8FF00",
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                  transition: "background-color 0.2s ease",
                  marginTop: "8px"
                }}
              >
                {status === "loading" ? "SENDING..." : "SEND MESSAGE"}
              </motion.button>

              {status === "success" && (
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "14px", color: "#E8FF00", marginTop: "8px" }}>
                  Your message has been sent successfully!
                </p>
              )}
              {status === "error" && (
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "14px", color: "#ff4d4f", marginTop: "8px" }}>
                  Something went wrong. Please try again later.
                </p>
              )}

            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
