import { FiCode, FiBook, FiCoffee, FiCpu, FiMonitor, FiActivity } from "react-icons/fi";

export interface InterestItem {
  id: string;
  label: string;
  icon: any;
}

export const INTERESTS_DATA: InterestItem[] = [
  { id: "i1", label: "Coding", icon: FiCode },
  { id: "i2", label: "Reading", icon: FiBook },
  { id: "i3", label: "Cooking", icon: FiCoffee }, 
  { id: "i4", label: "Technology", icon: FiCpu },
  { id: "i5", label: "Gaming", icon: FiMonitor },
  { id: "i6", label: "Table Tennis", icon: FiActivity },
];

export interface CurrentlyItem {
  category: string;
  item: string;
}

export const CURRENTLY_DATA: CurrentlyItem[] = [
  { category: "LEARNING", item: "Quantum Computing"},
  { category: "READING", item: "Homo Deus: A Brief History of Tomorrow" },
  { category: "PLAYING", item: "Resident Evil 9: Requiem" },
];
