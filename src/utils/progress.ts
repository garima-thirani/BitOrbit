import type { LearningPath, UserProgress } from '@/types'
import { allChapterMeta, learningPaths } from '@/data/learningPaths'

export const defaultProgress: UserProgress = {
  completedChapters: [],
  bookmarkedChapters: [],
  readingMinutes: 128,
  lastChapterId: allChapterMeta[0]?.id ?? null,
}

export const getPathProgress = (path: LearningPath, progress: UserProgress) => {
  const chapterIds = path.modules.flatMap((module) => module.chapters.map((chapter) => chapter.id))
  if (chapterIds.length === 0) return 0

  const completed = chapterIds.filter((id) => progress.completedChapters.includes(id)).length
  return Math.round((completed / chapterIds.length) * 100)
}

export const getModuleProgress = (
  moduleChapterIds: string[],
  progress: UserProgress,
) => {
  if (moduleChapterIds.length === 0) return 0

  const completed = moduleChapterIds.filter((id) => progress.completedChapters.includes(id)).length
  return Math.round((completed / moduleChapterIds.length) * 100)
}

export const getOverallProgress = (progress: UserProgress) => {
  if (allChapterMeta.length === 0) return 0

  return Math.round((progress.completedChapters.length / allChapterMeta.length) * 100)
}

export const getCompletedModulesCount = (progress: UserProgress) =>
  learningPaths
    .flatMap((path) => path.modules)
    .filter((module) => {
      const ids = module.chapters.map((chapter) => chapter.id)
      return ids.length > 0 && ids.every((id) => progress.completedChapters.includes(id))
    }).length
