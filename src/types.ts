export type PathTheme = 'primary' | 'secondary' | 'accent' | 'success' | 'warning'

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface ChapterMeta {
  id: string
  moduleId: string
  pathId: string
  title: string
  slug: string
  summary: string
  order: number
  markdownPath: string
}

export interface Chapter extends ChapterMeta {
  content: string
  estimatedReadTime: number
  hasContent: boolean
}

export interface Module {
  id: string
  pathId: string
  title: string
  description: string
  order: number
  chapters: ChapterMeta[]
}

export interface LearningPath {
  id: string
  title: string
  description: string
  icon: string
  gradient: string
  theme: PathTheme
  difficulty: Difficulty
  estimatedHours: number
  modules: Module[]
}

export interface UserProgress {
  completedChapters: string[]
  bookmarkedChapters: string[]
  readingMinutes: number
  lastChapterId: string | null
}

export interface SearchDocument {
  id: string
  type: 'path' | 'module' | 'chapter' | 'topic'
  title: string
  description: string
  pathId?: string
  moduleId?: string
  chapterId?: string
}

export interface BreadcrumbItem {
  label: string
  href: string
}
