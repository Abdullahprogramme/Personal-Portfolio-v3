export interface ExperienceItem {
  id: string;
  year: string;
  role: string;
  company: string;
  badge: "FULL TIME" | "PART TIME" | "INTERNSHIP" | "FREELANCE" | "WORKSHOP";
  bullets: string[];
  tags: string[];
}

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "ta",
    year: "Jan - May 2026",
    role: "Teachers Assistant at IBA",
    company: "IBA Karachi",
    badge: "PART TIME",
    bullets: [
      "Assisted the professor with grading assignments, quizzes, and exams.",
      "Conducted lab sessions for students, providing guidance on practical assignments.",
      "Helped students with their assignments, quizzes, and exams.",
    ],
    tags: ["C++", "Rubrics", "IBA Karachi", "Teaching", "Object Oriented Programming"],
  },
  {
    id: "qworld",
    year: "July 2025",
    role: "Participant QWorld Quantum Computing Workshop",
    company: "QWorld",
    badge: "WORKSHOP",
    bullets: [
      "Attended 4-week online intensive workshop by QWorld to learn quantum computing concepts.",
      "Built small quantum circuits using Qiskit and Python",
      "Learned about quantum gates, algorithms, and hybrid quantum-classical computing."
    ],
    tags: ["Quantum Computing", "Qiskit", "Python", "QWorld"],
  },
  {
    id: "prodigy",
    year: "June 2024",
    role: "Android developer intern",
    company: "Prodigy InfoTech",
    badge: "INTERNSHIP",
    bullets: [
      "Learnt Android development basics and built small Android applications.",
      "Learned about Android architecture, UI design, and app development lifecycle."
    ],
    tags: ["Android", "React Native", "Typescript", "Prodigy InfoTech", "Internship"],
  },
  {
    id: "m-labs",
    year: "June 2024",
    role: "Gamer programmer intern",
    company: "M-Labs at Mindstorm studios",
    badge: "INTERNSHIP",
    bullets: [
      "Gained practical experience in game development using Unity and C#.",
      "Collaborated with a team to develop and test game mechanics and features.",
      "Learned basics of game design and development process."
    ],
    tags: ["Game Development", "Unity", "C#", "M-Labs", "Internship"],
  },
  {
    id: "sca",
    year: "May 2024",
    role: "Summer career Academy",
    company: "Habib University",
    badge: "WORKSHOP",
    bullets: [
      "The Summer Career Academy provided essential industry skills through a comprehensive career curation program featuring experts in various fields.",
      "The training encompassed a wide range of topics, including emotional intelligence, leadership, and presentation skills.",
      "Additionally, we gained proficiency in Power BI for data manipulation and entry, with clear and effective instruction.",
      "We also had the opportunity to meet and learn from industry leaders, enhancing our understanding and preparedness for future careers.",
    ],
    tags: ["Power BI", "Data Manipulation", "Leadership", "Presentation Skills", "Team Management", "Teamwork", "Strategic Thinking", "Data Visualization", "Problem Solving"],
  },
];
