import type { ChapterMeta, LearningPath, Module } from '@/types'
import { dsaLearningPath } from '@/data/dsaCatalog'

const chapter = (
  pathId: string,
  moduleId: string,
  order: number,
  title: string,
  summary: string,
  slugOverride?: string
): ChapterMeta => {
  const slug = slugOverride || title
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
    markdownPath: `/src/content/${pathId}/${moduleId}/${slugOverride || slug}.md`,
  }
}

const moduleOf = (
  pathId: string,
  order: number,
  id: string,
  title: string,
  description: string,
  chapters: Array<{ title: string; summary: string; slug?: string }>,
): Module => ({
  id,
  pathId,
  order,
  title,
  description,
  chapters: chapters.map((item, index) => chapter(pathId, id, index + 1, item.title, item.summary, item.slug)),
})

const systemDesignHtmlUrl = (moduleOrder: number, chapterOrder: number) =>
  encodeURI(
    `/System design html/chapter-${String(moduleOrder).padStart(2, '0')}-part-${String(chapterOrder).padStart(2, '0')}.html`,
  )

const withSystemDesignHtml = (module: Module): Module => ({
  ...module,
  chapters: module.chapters.map((item) => ({
    ...item,
    markdownPath: '',
    contentType: 'html',
    contentUrl: systemDesignHtmlUrl(module.order, item.order),
  })),
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
    id: 'system-design',
    title: 'System Design',
    description: 'Design scalable systems by balancing latency, consistency, and cost.',
    icon: 'Network',
    gradient: 'from-orbit-secondary to-orbit-accent',
    theme: 'secondary',
    difficulty: 'advanced',
    estimatedHours: 120,
    modules: [
      moduleOf('System-Design', 1, 'Chapter-1', 'Requirement Analysis', 'Mastering the first phase of system design.', [
        { slug: 'Chapter_01_Part_01_System_Design_Foundations', title: 'Foundations', summary: 'Thinking like an architect and HLD basics.' },
        { slug: 'Chapter_01_Part_02_Requirements_Engineering', title: 'Requirements', summary: 'Functional and non-functional requirements.' },
        { slug: 'Chapter_01_Part_03_Capacity_Estimation', title: 'Estimation', summary: 'Back-of-the-envelope calculations.' },
        { slug: 'Chapter_01_Part_04_Bottleneck_Analysis', title: 'Bottlenecks', summary: 'Identifying system limits.' },
        { slug: 'Chapter_01_Part_05_API_Contracts_and_Client_Server_Architecture', title: 'API Contracts', summary: 'Designing service boundaries.' },
        { slug: 'Chapter_01_Part_06_Tradeoffs_CAP_and_Bitly_HLD', title: 'Tradeoffs', summary: 'CAP theorem and URL shortener design.' },
      ]),
      moduleOf('System-Design', 2, 'Chapter-2', 'Scalability', 'Building systems that handle millions of users.', [
        { slug: 'Chapter_02_Part_01_Introduction_to_Scalability', title: 'Introduction', summary: 'What does it mean to scale?' },
        { slug: 'Chapter_02_Part_02_Vertical_vs_Horizontal_Scaling', title: 'Scaling Modes', summary: 'Choosing the right growth strategy.' },
        { slug: 'Chapter_02_Part_03_Stateless_Architecture', title: 'Statelessness', summary: 'Decoupling application state.' },
        { slug: 'Chapter_02_Part_04_Load_Balancers', title: 'Load Balancing', summary: 'Distributing traffic effectively.' },
        { slug: 'Chapter_02_Part_05_Sticky_Sessions', title: 'Sticky Sessions', summary: 'When state persistence matters.' },
        { slug: 'Chapter_02_Part_06_Auto_Scaling_Fundamentals', title: 'Auto-Scaling', summary: 'Dynamic infrastructure response.' },
        { slug: 'Chapter_02_Part_07_Geographic_Distribution_and_Multi_Region', title: 'Geo-Distribution', summary: 'Going global with your services.' },
        { slug: 'Chapter_02_Part_08_Cost_vs_Performance_Tradeoffs', title: 'Cost Analysis', summary: 'Balancing the bill with speed.' },
        { slug: 'Chapter_02_Part_09_Dropbox_Case_Study', title: 'Case Study: Dropbox', summary: 'Real-world scalability at work.' },
        { slug: 'Chapter_02_Part_10_Revision', title: 'Scalability Revision', summary: 'Key takeaways and patterns.' },
      ]),
      moduleOf('System-Design', 3, 'Chapter-3', 'Database Fundamentals', 'Data storage, consistency models, and indexing.', [
        { slug: 'Chapter_03_Part_01_RDBMS_vs_NoSQL', title: 'SQL vs NoSQL', summary: 'Choosing the right database type.' },
        { slug: 'Chapter_03_Part_02_ACID_Properties', title: 'ACID', summary: 'Transactional integrity.' },
        { slug: 'Chapter_03_Part_03_BASE_Model', title: 'BASE', summary: 'Eventual consistency in NoSQL.' },
        { slug: 'Chapter_03_Part_04_CAP_Theorem', title: 'CAP Theorem', summary: 'Consistency, Availability, and Partition Tolerance.' },
        { slug: 'Chapter_03_Part_05_PACELC_Theorem', title: 'PACELC', summary: 'A modern extension of CAP.' },
        { slug: 'Chapter_03_Part_06_Database_Indexing', title: 'Indexing', summary: 'Accelerating data access.' },
        { slug: 'Chapter_03_Part_07_Schema_Design_and_Query_Optimization', title: 'Schema Design', summary: 'Efficient data modeling.' },
        { slug: 'Chapter_03_Part_08_Database_Performance_Bottlenecks', title: 'Performance', summary: 'Finding the slow queries.' },
        { slug: 'Chapter_03_Part_09_Local_Delivery_Service_Case_Study', title: 'Case Study: Delivery', summary: 'Designing for high writes.' },
        { slug: 'Chapter_03_Part_10_Revision', title: 'Database Revision', summary: 'Storage essentials summary.' },
      ]),
      moduleOf('System-Design', 4, 'Chapter-4', 'Scaling Databases', 'Sharding, replication, and distributed data.', [
        { slug: 'Chapter_04_Part_01_Database_Sharding_and_Horizontal_Partitioning', title: 'Sharding', summary: 'Splitting data across nodes.' },
        { slug: 'Chapter_04_Part_02_Consistent_Hashing', title: 'Consistent Hashing', summary: 'The secret to elastic sharding.' },
        { slug: 'Chapter_04_Part_03_Primary_Replica_Read_Write_Separation', title: 'Replication', summary: 'Read/Write separation patterns.' },
        { slug: 'Chapter_04_Part_04_Read_Replicas_and_Read_Heavy_Workloads', title: 'Read Replicas', summary: 'Scaling read-heavy systems.' },
        { slug: 'Chapter_04_Part_05_Multi_Leader_Replication_and_Conflict_Resolution', title: 'Multi-Leader', summary: 'Advanced replication strategies.' },
        { slug: 'Chapter_04_Part_06_Connection_Pooling_and_Database_Optimization', title: 'Optimization', summary: 'Managing database connections.' },
        { slug: 'Chapter_04_Part_07_News_Aggregator_Case_Study', title: 'Case Study: News', summary: 'Handling global feed updates.' },
        { slug: 'Chapter_04_Part_08_Revision', title: 'Scaling Revision', summary: 'Distributed data takeaways.' },
      ]),
      moduleOf('System-Design', 5, 'Chapter-5', 'Caching Fundamentals', 'Reducing latency with strategic data caching.', [
        { slug: 'Chapter_05_Part_01_Cache_Fundamentals', title: 'Introduction', summary: 'Basics of memory caching.' },
        { slug: 'Chapter_05_Part_02_Caching_Patterns', title: 'Patterns', summary: 'Look-aside, Write-through, Write-back.' },
        { slug: 'Chapter_05_Part_03_Cache_Eviction_Policies', title: 'Eviction', summary: 'LRU, LFU, and TTL strategies.' },
        { slug: 'Chapter_05_Part_04_Cache_Stampede_and_Thundering_Herd', title: 'Stampedes', summary: 'Handling concurrent cache misses.' },
        { slug: 'Chapter_05_Part_05_Cache_Invalidation_Strategies', title: 'Invalidation', summary: 'Keeping data fresh.' },
        { slug: 'Chapter_05_Part_06_When_NOT_to_Cache', title: 'Anti-patterns', summary: 'Common caching pitfalls.' },
        { slug: 'Chapter_05_Part_07_Ticketmaster_Case_Study', title: 'Case Study: Tickets', summary: 'High-traffic caching strategies.' },
        { slug: 'Chapter_05_Part_08_Revision', title: 'Caching Revision', summary: 'Latency reduction summary.' },
      ]),
      moduleOf('System-Design', 6, 'Chapter-6', 'Advanced Caching & CDN', 'Global delivery and distributed cache clusters.', [
        { slug: 'Chapter_06_Part_01_Redis_Cluster_and_Data_Structures', title: 'Redis Cluster', summary: 'Mastering distributed Redis.' },
        { slug: 'Chapter_06_Part_02_Memcached_vs_Redis', title: 'Redis vs Memcached', summary: 'Choosing the right caching engine.' },
        { slug: 'Chapter_06_Part_03_CDN_Fundamentals_and_Cache_Control', title: 'CDN Basics', summary: 'Global content delivery networks.' },
        { slug: 'Chapter_06_Part_04_Edge_Caching_and_Latency_Optimization', title: 'Edge Caching', summary: 'Pushing content to the user.' },
        { slug: 'Chapter_06_Part_05_Multi_Tier_Caching_and_Geo_Replication', title: 'Multi-Tier', summary: 'Complex caching architectures.' },
        { slug: 'Chapter_06_Part_06_Cache_Warming_Strategies', title: 'Cache Warming', summary: 'Pre-loading data for performance.' },
        { slug: 'Chapter_06_Part_07_Facebook_News_Feed_Case_Study', title: 'Case Study: Facebook', summary: 'Massive scale caching patterns.' },
        { slug: 'Chapter_06_Part_08_Revision', title: 'Advanced Revision', summary: 'Global delivery summary.' },
      ]),
      moduleOf('System-Design', 7, 'Chapter-7', 'Distributed Communication', 'Synchronous and asynchronous communication across services.', [
        { slug: 'chapter-07-part-01', title: 'Communication in Distributed Systems', summary: 'How services talk through sync, async, and event-driven patterns.' },
        { slug: 'chapter-07-part-02', title: 'Synchronous Communication', summary: 'REST, gRPC, and request-response service interactions.' },
      ]),
    ].map(withSystemDesignHtml),
  },
  dsaLearningPath,
]

export const allModules = learningPaths.flatMap((path) => path.modules)
export const allChapterMeta = allModules.flatMap((module) => module.chapters)
