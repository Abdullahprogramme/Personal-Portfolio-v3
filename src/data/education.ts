export interface EducationItem {
  id: string;
  year: string;
  degree: string;
  institution: string;
  gpa: string;
  tags: string[];
}

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "iba",
    year: "2024 — 2028",
    degree: "BS Computer Science",
    institution: "Institute of Business Administration (IBA)",
    gpa: "GPA: 3.63 / 4.0",
    tags: ["Data Structures", "Algorithms", "Computational Thinking", "Computer Architecture", "Object Oriented Programming"],
  },
  {
    id: "quantum",
    year: "2024",
    degree: "Quantum Computing Workshops",
    institution: "QWorld",
    gpa: "Certificate",
    tags: ["Quantum Computing", "Quantum Algorithms", "Quantum Programming", "Python", "Qiskit"],
  },
  {
    id: "college",
    year: "2021 — 2023",
    degree: "A Level",
    institution: "The City School, Gulshan A Levels",
    gpa: "Grade: 4A's",
    tags: ["Mathematics", "Physics", "Computer Science", "Chemistry"],
  },
  {
    id: "school",
    year: "2016 — 2021",
    degree: "O Level",
    institution: "The City School, Boys Campus A",
    gpa: "Grade: 1A*, 6A's, 1B",
    tags: ["Mathematics", "Physics", "Computer Science", "Chemistry", "English", "Urdu", "Pakistan Studies", "Islamiyat"],
  },
];
