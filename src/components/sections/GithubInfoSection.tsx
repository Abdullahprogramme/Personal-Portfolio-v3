import { useRef } from "react";
import { motion, useInView, type Variants } from "motion/react";
import { HiAcademicCap } from "react-icons/hi";
import { VscMultipleWindows } from "react-icons/vsc";
import { MdCollections } from "react-icons/md";
import { GiBrain } from "react-icons/gi";

const features = [
  {
    name: 'Easy to understand code',
    description: 'Code is written in a way that is easy to understand and maintain. This makes it easier for other developers to work on the project.',
    icon: GiBrain,
  },
  {
    name: 'Vast variety of codes',
    description: 'From Data structures to basics of programming, you will find a vast variety of code snippets here.',
    icon: MdCollections,
  },
  {
    name: 'Multiple languages',
    description: 'Code is written in mutliple languages like C, C++, Python and JavaScript. Some codes are written in more than one language.',
    icon: VscMultipleWindows,
  },
  {
    name: 'Most help to beginners like College students',
    description: 'Most of the code snippets are written keeping in mind the beginners like college students who are new to programming. This will help them to understand the basics of programming.',
    icon: HiAcademicCap,
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 50, rotateX: 15 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.3 + (i * 0.15),
      duration: 0.8,
      type: "spring",
      bounce: 0.4
    }
  }),
  hover: {
    scale: 1.02,
    y: -4,
    x: -4,
    boxShadow: "8px 8px 0px rgba(232, 255, 0, 1)",
    borderColor: "#E8FF00",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20
    }
  }
};

export default function GithubInfoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id="github-info"
      ref={sectionRef}
      style={{
        backgroundColor: "#0A0A0A",
        padding: "clamp(64px, 8vw, 96px) clamp(16px, 5vw, 40px)",
        perspective: "1000px" // For 3D transforms
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Header Content - Left Aligned */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ marginBottom: "64px", maxWidth: "800px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#E8FF00", textTransform: "uppercase", letterSpacing: "0.2em" }}>11</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#555555", letterSpacing: "0.2em" }}>/</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#555555", textTransform: "uppercase", letterSpacing: "0.2em" }}>ABOUT GITHUB</span>
          </div>
          
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 36px)", color: "#F0F0F0", lineHeight: 1.1, marginBottom: "24px" }}>
            A COLLECTION OF CODE SNIPPETS
          </h2>
          
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "16px", color: "#A0A0A0", lineHeight: 1.8, marginBottom: "32px" }}>
            Here you will find a collection of code snippets that I have written overtime my own journey of learning programming. Much of these code snippets were written when I was learning programming and I have tried to keep them as simple as possible so that beginners can understand them easily. Hope you find them helpful. Happy coding!
          </p>

          <a
            href="https://github.com/Abdullahprogramme"
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "14px",
              color: "#111111",
              backgroundColor: "#E8FF00",
              padding: "16px 32px",
              textDecoration: "none",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #E8FF00",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#E8FF00";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#E8FF00";
              e.currentTarget.style.color = "#111111";
            }}
          >
            VISIT GITHUB
          </a>
        </motion.div>

        {/* Epic Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.name}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover="hover"
              style={{ 
                backgroundColor: "#111111", 
                border: "2px solid #333333",
                boxShadow: "4px 4px 0px #333333",
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                cursor: "pointer",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease"
              }}
              className="group"
            >
              <div 
                style={{ 
                  width: "56px", 
                  height: "56px", 
                  backgroundColor: "#0A0A0A", 
                  border: "1px solid #333333",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "border-color 0.3s ease"
                }}
                className="group-hover:border-[#E8FF00]"
              >
                <feature.icon size={28} color="#E8FF00" />
              </div>
              
              <div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "24px", color: "#F0F0F0", marginBottom: "12px", fontWeight: 700 }}>
                  {feature.name}
                </h3>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "15px", color: "#A0A0A0", lineHeight: 1.6 }}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
