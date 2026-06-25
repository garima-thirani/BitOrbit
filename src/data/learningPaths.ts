import type { ChapterMeta, LearningPath, Module } from '@/types'

const chapter = (
  pathId: string,
  moduleId: string,
  order: number,
  title: string,
  summary: string,
): ChapterMeta => {
  const slug = title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  return {
    id: `${pathId}-${moduleId}-chapter-${order}`,
    pathId,
    moduleId,
    order,
    title,
    slug,
    summary,
    markdownPath: `/src/content/${pathId}/${moduleId}/${slug}.md`,
  }
}

const moduleOf = (
  pathId: string,
  order: number,
  id: string,
  title: string,
  description: string,
  chapters: Array<Pick<ChapterMeta, 'title' | 'summary'>>,
): Module => ({
  id,
  pathId,
  order,
  title,
  description,
  chapters: chapters.map((item, index) => chapter(pathId, id, index + 1, item.title, item.summary)),
})

export const learningPaths: LearningPath[] = [
  {
    id: 'python',
    title: 'Python',
    description: 'A structured path for Python language fluency, tooling, and production habits.',
    icon: 'Code2',
    gradient: 'from-orbit-primary to-orbit-accent',
    theme: 'primary',
    difficulty: 'beginner',
    estimatedHours: 42,
    modules: [
      moduleOf('python', 1, 'core-language', 'Core Language', 'Syntax, flow control, functions, and collections.', [
        { title: 'Execution Model', summary: 'How Python runs files, modules, scopes, and imports offline.' },
        { title: 'Data Structures', summary: 'Lists, tuples, dictionaries, sets, and choosing the right shape.' },
      ]),
      moduleOf('python', 2, 'production-python', 'Production Python', 'Packaging, typing, testing, and maintainable scripts.', [
        { title: 'Type Hints', summary: 'Use annotations to make Python code easier to reason about.' },
        { title: 'Testing Workflow', summary: 'Design fast, local feedback loops for engineering notebooks and tools.' },
      ]),
    ],
  },
  {
    id: 'dsa',
    title: 'DSA',
    description: 'Pattern-oriented problem solving with data structures and algorithmic tradeoffs.',
    icon: 'GitBranch',
    gradient: 'from-orbit-secondary to-orbit-primary',
    theme: 'secondary',
    difficulty: 'intermediate',
    estimatedHours: 64,
    modules: [
      moduleOf('dsa', 1, 'patterns', 'Problem Patterns', 'Reusable ways to identify and solve algorithmic problems.', [
        { title: 'Two Pointers', summary: 'When sorted order or paired movement shrinks a search space.' },
        { title: 'Sliding Window', summary: 'Maintain a live range while optimizing substring and subarray work.' },
      ]),
      moduleOf('dsa', 2, 'graphs', 'Graphs', 'Traversal, shortest paths, and dependency modeling.', [
        { title: 'Graph Traversal', summary: 'Choose BFS or DFS based on the question the graph is asking.' },
        { title: 'Topological Order', summary: 'Model prerequisites, builds, and dependency chains.' },
      ]),
    ],
  },
  {
    id: 'database',
    title: 'Database',
    description: 'Relational, document, indexing, and query design for dependable systems.',
    icon: 'Database',
    gradient: 'from-orbit-accent to-orbit-success',
    theme: 'accent',
    difficulty: 'intermediate',
    estimatedHours: 38,
    modules: [
      moduleOf('database', 1, 'relational-design', 'Relational Design', 'Schema modeling, keys, constraints, and query planning.', [
        { title: 'Schema Boundaries', summary: 'Turn domain rules into tables, relationships, and constraints.' },
        { title: 'Indexes', summary: 'Use access patterns to decide what deserves an index.' },
      ]),
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    description: 'API design, service boundaries, reliability, and operational thinking.',
    icon: 'Server',
    gradient: 'from-orbit-primary to-orbit-warning',
    theme: 'primary',
    difficulty: 'intermediate',
    estimatedHours: 52,
    modules: [
      moduleOf('backend', 1, 'api-foundations', 'API Foundations', 'HTTP, contracts, validation, and service ergonomics.', [
        { title: 'HTTP Contracts', summary: 'Design routes, status codes, and payloads that age well.' },
        { title: 'Validation', summary: 'Defend system boundaries with precise input and state checks.' },
      ]),
    ],
  },
  {
    id: 'react',
    title: 'React',
    description: 'Component architecture, routing, state, and polished frontend workflows.',
    icon: 'Atom',
    gradient: 'from-orbit-accent to-orbit-primary',
    theme: 'accent',
    difficulty: 'intermediate',
    estimatedHours: 46,
    modules: [
      moduleOf('react', 1, 'component-systems', 'Component Systems', 'Build interface primitives with clear contracts.', [
        { title: 'Composition', summary: 'Prefer explicit component boundaries and focused props.' },
        { title: 'State Locality', summary: 'Keep state close to the experience that owns it.' },
      ]),
    ],
  },
  {
    id: 'system-design',
    title: 'System Design',
    description: 'Design scalable systems by balancing latency, consistency, and cost.',
    icon: 'Network',
    gradient: 'from-orbit-secondary to-orbit-accent',
    theme: 'secondary',
    difficulty: 'advanced',
    estimatedHours: 72,
    modules: [
      moduleOf('system-design', 1, 'scalability', 'Scalability', 'Capacity, load distribution, and graceful degradation.', [
        { title: 'Load Paths', summary: 'Trace a request through the system before scaling any one part.' },
        { title: 'Caching', summary: 'Use freshness and ownership rules to select caching boundaries.' },
      ]),
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud',
    description: 'Cloud fundamentals, deployment models, infrastructure, and reliability basics.',
    icon: 'Cloud',
    gradient: 'from-orbit-success to-orbit-accent',
    theme: 'success',
    difficulty: 'intermediate',
    estimatedHours: 40,
    modules: [
      moduleOf('cloud', 1, 'deployment', 'Deployment', 'Ship services with repeatable, observable release practices.', [
        { title: 'Environments', summary: 'Separate local, staging, and production concerns clearly.' },
        { title: 'Observability', summary: 'Collect signals that explain behavior before incidents happen.' },
      ]),
    ],
  },
  {
    id: 'devops',
    title: 'DevOps',
    description: 'Automation, CI, containers, releases, and sustainable engineering workflows.',
    icon: 'Workflow',
    gradient: 'from-orbit-warning to-orbit-primary',
    theme: 'warning',
    difficulty: 'intermediate',
    estimatedHours: 44,
    modules: [
      moduleOf('devops', 1, 'delivery', 'Delivery', 'Automate checks and releases without losing control.', [
        { title: 'CI Pipelines', summary: 'Create fast pipelines that catch meaningful regressions.' },
        { title: 'Containers', summary: 'Package runtime assumptions into repeatable environments.' },
      ]),
    ],
  },
  {
    id: 'ai',
    title: 'AI',
    description: 'AI fundamentals, evaluation, retrieval, and applied engineering patterns.',
    icon: 'BrainCircuit',
    gradient: 'from-orbit-primary to-orbit-secondary',
    theme: 'primary',
    difficulty: 'advanced',
    estimatedHours: 80,
    modules: [
      moduleOf('ai', 1, 'applied-ai', 'Applied AI', 'Build useful AI features with context, evaluation, and guardrails.', [
        { title: 'Prompt Interfaces', summary: 'Design inputs and outputs as reliable product contracts.' },
        { title: 'Evaluation', summary: 'Measure model behavior with examples, rubrics, and regression checks.' },
      ]),
    ],
  },
]

export const allModules = learningPaths.flatMap((path) => path.modules)
export const allChapterMeta = allModules.flatMap((module) => module.chapters)
