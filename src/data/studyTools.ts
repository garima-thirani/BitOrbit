export interface Flashcard {
  question: string
  answer: string
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface MindMapNode {
  id: string
  label: string
  x: number
  y: number
}

export interface MindMapLink {
  source: string
  target: string
}

export interface StudyToolsData {
  flashcards: Flashcard[]
  quiz: QuizQuestion[]
  mindmap: {
    nodes: MindMapNode[]
    links: MindMapLink[]
  }
}

export const studyToolsRegistry: Record<string, StudyToolsData> = {
  'Chapter_01_Part_01_System_Design_Foundations': {
    flashcards: [
      { question: 'What is System Design?', answer: 'Defining architecture and components to satisfy requirements under constraints.' },
      { question: 'HLD vs LLD?', answer: 'HLD is about services and data flow; LLD is about classes and logic.' },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Which stage comes first for an architect?',
        options: ['Evaluate trade-offs', 'Design architecture', 'Understand the business problem', 'Select Redis'],
        correctAnswer: 2,
        explanation: 'Always start with the problem.',
      },
    ],
    mindmap: {
      nodes: [
        { id: 'center', label: 'SD Foundations', x: 250, y: 150 },
        { id: 'hld', label: 'HLD', x: 100, y: 100 },
        { id: 'lld', label: 'LLD', x: 400, y: 100 },
        { id: 'think', label: 'Thinking', x: 250, y: 250 },
      ],
      links: [
        { source: 'center', target: 'hld' },
        { source: 'center', target: 'lld' },
        { source: 'center', target: 'think' },
      ],
    },
  },
  'Chapter_02_Part_04_Load_Balancers': {
    flashcards: [
      { question: 'What is a Load Balancer?', answer: 'Distributes traffic across servers to improve scale and availability.' },
      { question: 'Layer 4 vs Layer 7?', answer: 'L4 uses IP/Port; L7 uses application content (HTTP).' },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Which algorithm is sequential?',
        options: ['Least Connections', 'IP Hash', 'Round Robin'],
        correctAnswer: 2,
        explanation: 'Round Robin distributes one by one.',
      },
    ],
    mindmap: {
      nodes: [
        { id: 'center', label: 'Load Balancers', x: 250, y: 150 },
        { id: 'l4', label: 'Layer 4', x: 100, y: 80 },
        { id: 'l7', label: 'Layer 7', x: 400, y: 80 },
        { id: 'algos', label: 'Algorithms', x: 250, y: 250 },
      ],
      links: [
        { source: 'center', target: 'l4' },
        { source: 'center', target: 'l7' },
        { source: 'center', target: 'algos' },
      ],
    },
  },
  'Chapter_03_Part_04_CAP_Theorem': {
    flashcards: [
      { question: 'What is CAP?', answer: 'Consistency, Availability, Partition Tolerance.' },
      { question: 'Can we avoid P?', answer: 'No, networks will fail.' },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Which system prioritizes responses over data freshness during partition?',
        options: ['CP', 'AP', 'CA'],
        correctAnswer: 1,
        explanation: 'AP systems stay available.',
      },
    ],
    mindmap: {
      nodes: [
        { id: 'center', label: 'CAP', x: 250, y: 150 },
        { id: 'c', label: 'Consistency', x: 100, y: 100 },
        { id: 'a', label: 'Availability', x: 400, y: 100 },
        { id: 'p', label: 'Partition', x: 250, y: 250 },
      ],
      links: [
        { source: 'center', target: 'c' },
        { source: 'center', target: 'a' },
        { source: 'center', target: 'p' },
      ],
    },
  },
}

export const getStudyToolsForChapter = (chapterTitle: string): StudyToolsData | undefined => {
  return studyToolsRegistry[chapterTitle]
}
