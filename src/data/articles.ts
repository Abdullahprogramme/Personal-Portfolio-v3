export interface ArticleItem {
  id: string;
  title: string;
  description: string;
  publication: string;
  date: string;
  url?: string;
}

export const ARTICLES_DATA: ArticleItem[] = [
  {
    id: "1",
    title: "From Bits to Qubits: Understanding Superposition and Dirac Notation",
    description: "This article explores the very basics of quantum computing, focusing on qubits and their difference from classical bits. It delves into the concept of superposition, and then goes on to explain Dirac notation, a standard notation used to describe quantum states.",
    url: "https://medium.com/@abdtariq78/from-bits-to-qubits-understanding-superposition-and-dirac-notation-f75b78633a30",
    date: "Sep 29, 2025",
    publication: "Quantum Computing",
  },
  {
    id: "2",
    title: "Quantum Path Finding compared with A* and BFS",
    description: "In this article, we will explore the concept of quantum path finding and compare it with classical algorithms like A* and Breadth-First Search (BFS). We will discuss how quantum algorithms can potentially offer advantages in certain scenarios and analyze their performance compared to traditional methods.",
    url: "https://medium.com/@abdtariq78/quantum-path-finding-compared-with-a-and-bfs-7eb81897f955",
    date: "May 25, 2026",
    publication: "Quantum Computing",
  }
];
