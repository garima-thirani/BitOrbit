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
    markdownPath: `/src/content/${pathId}/${moduleId}/${title}.md`,
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
    id: 'system-design',
    title: 'System Design',
    description: 'Design scalable systems by balancing latency, consistency, and cost.',
    icon: 'Network',
    gradient: 'from-orbit-secondary to-orbit-accent',
    theme: 'secondary',
    difficulty: 'advanced',
    estimatedHours: 72,
    modules: [
      moduleOf('system-design', 1, 'chapter-1', 'SD Thinking', 'System Design Thinking & Requirement Analysis', [
        { title: 'Chapter_01_Part_01_System_Design_Foundations', summary: 'Foundations of system design and architectural thinking.' },
        { title: 'Chapter_01_Part_02_Requirements_Engineering', summary: 'Gathering functional and non-functional requirements.' },
        { title: 'Chapter_01_Part_03_Capacity_Estimation', summary: 'Estimating traffic, storage, and bandwidth needs.' },
        { title: 'Chapter_01_Part_04_Bottleneck_Analysis', summary: 'Identifying and resolving system constraints.' },
        { title: 'Chapter_01_Part_05_API_Contracts_and_Client_Server_Architecture', summary: 'Designing robust service boundaries.' },
        { title: 'Chapter_01_Part_06_Tradeoffs_CAP_and_Bitly_HLD', summary: 'Balancing trade-offs and real-world HLD.' },
      ]),
      moduleOf('system-design', 2, 'chapter-2', 'Scalability', 'Capacity, load distribution, and graceful degradation.', [
        { title: 'Chapter_02_Part_01_Introduction_to_Scalability', summary: 'Scaling from zero to millions of users.' },
        { title: 'Chapter_02_Part_02_Vertical_vs_Horizontal_Scaling', summary: 'Tradeoffs between bigger boxes and more boxes.' },
        { title: 'Chapter_02_Part_03_Stateless_Architecture', summary: 'Removing state for horizontal scalability.' },
        { title: 'Chapter_02_Part_04_Load_Balancers', summary: 'Algorithms and layer 4 vs layer 7.' },
        { title: 'Chapter_02_Part_05_Sticky_Sessions', summary: 'Handling stateful connections when needed.' },
        { title: 'Chapter_02_Part_06_Auto_Scaling_Fundamentals', summary: 'Elasticity and responsive infrastructure.' },
        { title: 'Chapter_02_Part_07_Geographic_Distribution_and_Multi_Region', summary: 'Reducing latency via proximity.' },
        { title: 'Chapter_02_Part_08_Cost_vs_Performance_Tradeoffs', summary: 'Optimizing for the bottom line.' },
        { title: 'Chapter_02_Part_09_Dropbox_Case_Study', summary: 'Applying scalability to file storage.' },
        { title: 'Chapter_02_Part_10_Revision', summary: 'Reviewing scalability concepts.' },
      ]),
      moduleOf('system-design', 3, 'chapter-3', 'Databases', 'Relational, NoSQL, and CAP theorem.', [
        { title: 'Chapter_03_Part_01_RDBMS_vs_NoSQL', summary: 'Choosing the right storage model.' },
        { title: 'Chapter_03_Part_02_ACID_Properties', summary: 'Guarantees of relational databases.' },
        { title: 'Chapter_03_Part_03_BASE_Model', summary: 'Eventual consistency in distributed systems.' },
        { title: 'Chapter_03_Part_04_CAP_Theorem', summary: 'The fundamental trade-off of distributed data.' },
        { title: 'Chapter_03_Part_05_PACELC_Theorem', summary: 'Extending CAP for normal operation.' },
        { title: 'Chapter_03_Part_06_Database_Indexing', summary: 'Speeding up reads with indexes.' },
        { title: 'Chapter_03_Part_07_Schema_Design_and_Query_Optimization', summary: 'Efficient data modeling.' },
        { title: 'Chapter_03_Part_08_Database_Performance_Bottlenecks', summary: 'Identifying slow queries and locks.' },
        { title: 'Chapter_03_Part_09_Local_Delivery_Service_Case_Study', summary: 'Database design for delivery apps.' },
        { title: 'Chapter_03_Part_10_Revision', summary: 'Reviewing database fundamentals.' },
      ]),
      moduleOf('system-design', 4, 'chapter-4', 'Advanced Databases', 'Sharding, replication, and optimization.', [
        { title: 'Chapter_04_Part_01_Database_Sharding_and_Horizontal_Partitioning', summary: 'Scaling databases by splitting data.' },
        { title: 'Chapter_04_Part_02_Consistent_Hashing', summary: 'Minimizing data movement during re-sharding.' },
        { title: 'Chapter_04_Part_03_Primary_Replica_Read_Write_Separation', summary: 'Scaling reads via replication.' },
        { title: 'Chapter_04_Part_04_Read_Replicas_and_Read_Heavy_Workloads', summary: 'Handling massive read traffic.' },
        { title: 'Chapter_04_Part_05_Multi_Leader_Replication_and_Conflict_Resolution', summary: 'Writing to multiple nodes.' },
        { title: 'Chapter_04_Part_06_Connection_Pooling_and_Database_Optimization', summary: 'Managing database connections efficiently.' },
        { title: 'Chapter_04_Part_07_News_Aggregator_Case_Study', summary: 'Designing storage for news feeds.' },
        { title: 'Chapter_04_Part_08_Revision', summary: 'Reviewing database scaling.' },
      ]),
      moduleOf('system-design', 5, 'chapter-5', 'Caching', 'Latency reduction and caching strategies.', [
        { title: 'Chapter_05_Part_01_Cache_Fundamentals', summary: 'Introduction to caching.' },
        { title: 'Chapter_05_Part_02_Caching_Patterns', summary: 'Read-through, write-through, and write-back.' },
        { title: 'Chapter_05_Part_03_Cache_Eviction_Policies', summary: 'LRU, LFU, and FIFO.' },
        { title: 'Chapter_05_Part_04_Cache_Stampede_and_Thundering_Herd', summary: 'Handling cache misses at scale.' },
        { title: 'Chapter_05_Part_05_Cache_Invalidation_Strategies', summary: 'Keeping cache and DB in sync.' },
        { title: 'Chapter_05_Part_06_When_NOT_to_Cache', summary: 'Common caching pitfalls.' },
        { title: 'Chapter_05_Part_07_Ticketmaster_Case_Study', summary: 'Caching for high-traffic events.' },
        { title: 'Chapter_05_Part_08_Revision', summary: 'Reviewing caching strategies.' },
      ]),
      moduleOf('system-design', 6, 'chapter-6', 'Distributed Caching', 'Redis, Memcached, and CDNs.', [
        { title: 'Chapter_06_Part_01_Redis_Cluster_and_Data_Structures', summary: 'Scaling Redis.' },
        { title: 'Chapter_06_Part_02_Memcached_vs_Redis', summary: 'Comparing caching technologies.' },
        { title: 'Chapter_06_Part_03_CDN_Fundamentals_and_Cache_Control', summary: 'Caching at the edge.' },
        { title: 'Chapter_06_Part_04_Edge_Caching_and_Latency_Optimization', summary: 'Global delivery speed.' },
        { title: 'Chapter_06_Part_05_Multi_Tier_Caching_and_Geo_Replication', summary: 'Layered caching architectures.' },
        { title: 'Chapter_06_Part_06_Cache_Warming_Strategies', summary: 'Pre-populating cache.' },
        { title: 'Chapter_06_Part_07_Facebook_News_Feed_Case_Study', summary: 'Caching for news feeds at scale.' },
        { title: 'Chapter_06_Part_08_Revision', summary: 'Reviewing distributed caching.' },
      ]),
    ],
  },
  {
    id: 'python',
    title: 'Python Mastery',
    description: 'Master Python from basics to advanced asynchronous programming.',
    icon: 'Terminal',
    gradient: 'from-blue-500 to-cyan-500',
    theme: 'primary',
    difficulty: 'intermediate',
    estimatedHours: 40,
    modules: [
      moduleOf('python', 1, 'basics', 'Python Basics', 'Language syntax and fundamental types.', [
        { title: 'Introduction to Python', summary: 'Setting up and first steps.' },
        { title: 'Data Types', summary: 'Strings, numbers, and booleans.' },
      ]),
    ],
  },
  {
    id: 'dsa',
    title: 'DSA & Algorithms',
    description: 'Cracking the code with efficient data structures and algorithms.',
    icon: 'Binary',
    gradient: 'from-purple-500 to-pink-500',
    theme: 'accent',
    difficulty: 'advanced',
    estimatedHours: 60,
    modules: [
      moduleOf('dsa', 1, 'arrays', 'Arrays & Strings', 'Fundamental linear data structures.', [
        { title: 'Array Basics', summary: 'Time complexity and common operations.' },
        { title: 'String Manipulation', summary: 'Sliding window and two-pointer techniques.' },
      ]),
    ],
  },
]

export const allModules = learningPaths.flatMap((path) => path.modules)
export const allChapterMeta = allModules.flatMap((module) => module.chapters)
