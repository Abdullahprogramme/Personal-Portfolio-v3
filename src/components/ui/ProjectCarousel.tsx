import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { PROJECTS_DATA, type ProjectItem } from "../../data/projects";
import { FiGithub, FiExternalLink, FiGrid, FiMaximize } from "react-icons/fi";
import HorizontalScroll from "./HorizontalScroll";

type Category = "All" | "React JS" | "Full Stack" | "Python" | "React Native" | "Flutter" | "Other";
const CATEGORIES: Category[] = ["All", "React JS", "Full Stack", "Python", "React Native", "Flutter"];

export default function ProjectCarousel() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [viewMode, setViewMode] = useState<"grid" | "scroll">("grid");
  const [viewportWidth, setViewportWidth] = useState(1024);
  
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredProjects = PROJECTS_DATA.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* Top Bar: Filter and View Toggle */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px" }}>
        
        {/* Filter Bar */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  padding: "8px 16px",
                  backgroundColor: isActive ? "#E8FF00" : "#111111",
                  border: "2px solid",
                  borderColor: isActive ? "#E8FF00" : "#333333",
                  color: isActive ? "#0A0A0A" : "#555555",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  textTransform: "uppercase"
                }}
              >
                <motion.div
                  style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: isActive ? "#0A0A0A" : "#333333",
                  transition: "background-color 0.2s"
                }} />
                {cat}
              </button>
            );
          })}
        </div>

        {/* View Toggle */}
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setViewMode("grid")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "12px",
              padding: "8px 12px",
              backgroundColor: viewMode === "grid" ? "#1A1A1A" : "transparent",
              border: "1px solid #333333",
              color: viewMode === "grid" ? "#E8FF00" : "#555555",
              cursor: "pointer",
            }}
          >
            <FiGrid size={14} /> GRID
          </button>
          <button
            onClick={() => setViewMode("scroll")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "12px",
              padding: "8px 12px",
              backgroundColor: viewMode === "scroll" ? "#1A1A1A" : "transparent",
              border: "1px solid #333333",
              color: viewMode === "scroll" ? "#E8FF00" : "#555555",
              cursor: "pointer",
            }}
          >
            <FiMaximize size={14} /> SCROLL
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ position: "relative", minHeight: "600px" }}>
        {viewMode === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
              gap: "24px",
            }}
            className="project-grid"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} isFeatured={project.featured && i === 0} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              position: "relative"
            }}
          >
            <HorizontalScroll 
              itemWidth={viewportWidth} 
              gap={0} 
              totalItems={filteredProjects.length}
              showProgress={true}
            >
              {filteredProjects.map((project, i) => (
                <div key={project.id} style={{ width: `${viewportWidth}px`, padding: "0 16px", boxSizing: "border-box" }}>
                  <ProjectPanel project={project} />
                </div>
              ))}
            </HorizontalScroll>
          </motion.div>
        )}
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .project-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}

// ─── Grid Card Component ────────────────────────────────────────────────────────

function ProjectCard({ project, index, isFeatured }: { project: ProjectItem; index: number; isFeatured?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        height: "100%", 
        backgroundColor: "#111111",
        border: "2px solid #333333",
        boxShadow: isHovered ? "8px 8px 0px #E8FF00" : "4px 4px 0px #333333",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        gridColumn: isFeatured ? "1 / -1" : "auto",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
        borderColor: isHovered ? "#E8FF00" : "#333333",
        transform: isHovered ? "translate(-4px, -4px)" : "translate(0px, 0px)"
      }}
    >
      {/* Featured Accent Bar */}
      {isFeatured && (
        <motion.div
          animate={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "3px",
            backgroundColor: "#E8FF00",
            zIndex: 10,
          }}
        />
      )}

      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Content Area */}
        <div style={{ padding: "32px", display: "flex", flexDirection: "column", flexGrow: 1, width: "100%", boxSizing: "border-box" }}>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "24px", fontWeight: 700, color: "#F0F0F0", marginBottom: "16px" }}>
            {project.title}
          </h3>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "14px", color: "#A0A0A0", lineHeight: 1.6, marginBottom: "32px", flexGrow: 1 }}>
            {project.description}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "auto", marginBottom: "24px" }}>
            {project.tags.map((tag) => (
              <span key={tag} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#555555", backgroundColor: "#0A0A0A", border: "1px solid #222222", padding: "4px 8px" }}>
                {tag}
              </span>
            ))}
          </div>
          
          <div style={{ display: "flex", gap: "24px" }}>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#E8FF00", textDecoration: "none", fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", fontWeight: 700, transition: "opacity 0.2s ease" }} onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"} onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
                VIEW LIVE <FiExternalLink size={16} />
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#A0A0A0", textDecoration: "none", fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", transition: "color 0.2s ease" }} onMouseEnter={(e) => e.currentTarget.style.color = "#F0F0F0"} onMouseLeave={(e) => e.currentTarget.style.color = "#A0A0A0"}>
                GITHUB <FiGithub size={16} />
              </a>
            )}
          </div>
        </div>
      </div>

    </motion.div>
  );
}

// ─── Scroll Panel Component ─────────────────────────────────────────────────────

function ProjectPanel({ project }: { project: ProjectItem }) {
  return (
    <div 
      style={{ 
        backgroundColor: "#111111", 
        border: "2px solid #333333",
        boxShadow: "6px 6px 0px #333333",
        display: "flex", 
        flexDirection: "row", 
        height: "100%",
        overflow: "hidden"
      }}
    >
      {/* Text Side */}
      <div style={{ width: "100%", padding: "clamp(32px, 5vw, 64px)", display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#E8FF00", marginBottom: "16px", textTransform: "uppercase" }}>
          {project.category}
        </div>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, color: "#F0F0F0", lineHeight: 1.1, marginBottom: "24px" }}>
          {project.title}
        </h2>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "16px", color: "#A0A0A0", lineHeight: 1.6, marginBottom: "32px", maxWidth: "800px" }}>
          {project.description}
        </p>
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "48px" }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#A0A0A0", backgroundColor: "#0A0A0A", border: "1px solid #333333", padding: "6px 12px" }}>
              {tag}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", gap: "24px", marginTop: "auto" }}>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#E8FF00", textDecoration: "none", fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", fontWeight: 700 }}>
              VIEW LIVE <FiExternalLink size={16} />
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#A0A0A0", textDecoration: "none", fontFamily: "'JetBrains Mono', monospace", fontSize: "14px" }}>
              GITHUB <FiGithub size={16} />
            </a>
          )}
        </div>
      </div>

    </div>
  );
}
