import { FiStar, FiAward, FiTarget, FiZap } from "react-icons/fi";
import { FaTrophy } from "react-icons/fa6";

export interface AchievementItem {
  id: string;
  type: "large" | "metric" | "standard";
  title?: string;
  description?: string;
  date?: string;
  metric?: string;
  label?: string;
  icon?: any;
}

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: "a1",
    type: "large",
    title: "Deans List",
    description: "Four consecutive semesters I have been in the deans list with a GPA of 3.6 or above.",
    date: "2024 - 2026",
    icon: FiTarget,
  },
  {
    id: "a2",
    type: "metric",
    metric: "7+",
    label: "Learnt 7+ programming languages",
  },
  {
    id: "a3",
    type: "standard",
    title: "Top 1000 Open Source Contributor in Pakistan",
    description: "Ranked among top contributors at Rankistan (rankistan.dev).",
    date: "May 2026",
    icon: FiStar,
  },
  {
    id: "a4",
    type: "standard",
    title: "GDG on Campus lead",
    description: "Achieved the organizer position of GDG at Habib University.",
    date: "August 2024",
    icon: FiAward,
  },
  {
    id: "a5",
    type: "standard",
    title: "Learnt Quantum computing basics",
    description: "Completed the Quantum Barsaat 2024 series.",
    date: "July 2024",
    icon: FaTrophy,
  },
  {
    id: "a6",
    type: "standard",
    title: "Learn image processing in python",
    description: "Completed the Image Processing course at DataCamp.",
    date: "May 2025",
    icon: FiZap,
  },
];
