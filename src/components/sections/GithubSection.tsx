import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { GitHubCalendar } from "react-github-calendar";
import { FiStar, FiBook, FiCode } from "react-icons/fi";

const GITHUB_USERNAME = "abdullahprogramme";

export default function GithubSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const [stats, setStats] = useState({
    repos: 0,
    stars: 0,
    topLanguage: "N/A"
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        const userData = await userRes.json();
        
        const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
        const reposData = await reposRes.json();
        
        let stars = 0;
        const languages: Record<string, number> = {};
        
        if (Array.isArray(reposData)) {
          reposData.forEach((repo: any) => {
            stars += repo.stargazers_count;
            if (repo.language) {
              languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
          });
        }
        
        const topLanguage = Object.keys(languages).sort((a, b) => languages[b] - languages[a])[0] || 'N/A';
        
        setStats({
          repos: userData.public_repos || 0,
          stars,
          topLanguage
        });
      } catch (err) {
        console.error("Error fetching GitHub stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <section
      id="github"
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
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#E8FF00", textTransform: "uppercase", letterSpacing: "0.2em" }}>10</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#555555", letterSpacing: "0.2em" }}>/</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#555555", textTransform: "uppercase", letterSpacing: "0.2em" }}>GITHUB</span>
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 36px)", color: "#F0F0F0", lineHeight: 1.1 }}>
            MY CONTRIBUTIONS
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Box - Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 flex flex-col items-center justify-center overflow-x-auto"
            style={{
              backgroundColor: "#111111",
              border: "2px solid #333333",
              boxShadow: "6px 6px 0px #333333",
              padding: "32px",
            }}
          >
            <div style={{ width: "100%", overflowX: "auto" }}>
              <div style={{ minWidth: "750px" }}>
                <GitHubCalendar 
                  username={GITHUB_USERNAME} 
                  colorScheme="dark"
                  theme={{
                    dark: ['#1A1A1A', '#333333', '#666600', '#AACC00', '#E8FF00']
                  }}
                  fontSize={12}
                  blockSize={12}
                  blockMargin={4}
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: "#A0A0A0" }}
                />
              </div>
            </div>
          </motion.div>

          {/* Right Box - Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1 flex flex-col justify-center"
            style={{
              backgroundColor: "#111111",
              border: "2px solid #333333",
              boxShadow: "6px 6px 0px #333333",
              padding: "32px",
              gap: "32px"
            }}
          >
            {/* Stat Row: Stars */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <FiStar size={16} color="#555555" />
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "14px", color: "#A0A0A0" }}>Total Stars</span>
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", color: "#F0F0F0" }}>{stats.stars}</span>
            </div>

            {/* Stat Row: Repos */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <FiBook size={16} color="#555555" />
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "14px", color: "#A0A0A0" }}>Public Repos</span>
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", color: "#F0F0F0" }}>{stats.repos}</span>
            </div>

            {/* Stat Row: Top Language */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <FiCode size={16} color="#555555" />
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "14px", color: "#A0A0A0" }}>Top Language</span>
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", color: "#F0F0F0" }}>{stats.topLanguage}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
