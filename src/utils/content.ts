import type { Chapter, ChapterMeta, LearningPath, Module, SearchDocument } from '@/types'
import { allChapterMeta, allModules, learningPaths } from '@/data/learningPaths'

const normalizeSegment = (value: string | undefined) =>
  (value ?? '')
    .toLowerCase()
    .replace(/%20/g, ' ')
    .replace(/[\s_-]+/g, '-')
    .replace(/(^-|-$)/g, '')

const markdownModules = import.meta.glob('/src/content/**/*.md', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>

export const estimateReadingTime = (content: string) => {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(wordCount / 220))
}

export const getPathById = (pathId: string | undefined): LearningPath | undefined =>
  learningPaths.find((path) => normalizeSegment(path.id) === normalizeSegment(pathId))

export const getModuleById = (
  pathId: string | undefined,
  moduleId: string | undefined,
): Module | undefined =>
  getPathById(pathId)?.modules.find(
    (module) => normalizeSegment(module.id) === normalizeSegment(moduleId),
  )

export const getChapterMetaById = (
  pathId: string | undefined,
  moduleId: string | undefined,
  chapterId: string | undefined,
): ChapterMeta | undefined =>
  getModuleById(pathId, moduleId)?.chapters.find(
    (chapter) =>
      normalizeSegment(chapter.id) === normalizeSegment(chapterId) ||
      normalizeSegment(chapter.slug) === normalizeSegment(chapterId),
  )

export const loadChapter = async (
  pathId: string | undefined,
  moduleId: string | undefined,
  chapterId: string | undefined,
): Promise<Chapter | undefined> => {
  const meta = getChapterMetaById(pathId, moduleId, chapterId)
  if (!meta) return undefined

  if (meta.contentType === 'html') {
    return {
      ...meta,
      content: '',
      estimatedReadTime: 1,
      hasContent: true,
    }
  }

  const loader = markdownModules[meta.markdownPath]
  if (!loader) {
    return {
      ...meta,
      content: '',
      estimatedReadTime: 1,
      hasContent: false,
    }
  }

  const content = await loader()
  return {
    ...meta,
    content,
    estimatedReadTime: estimateReadingTime(content),
    hasContent: true,
  }
}

export const createSearchDocuments = (): SearchDocument[] => {
  const paths: SearchDocument[] = learningPaths.map((path) => ({
    id: path.id,
    type: 'path',
    title: path.title,
    description: `${path.description} ${path.difficulty}`,
    pathId: path.id,
  }))

  const modules: SearchDocument[] = allModules.map((module) => ({
    id: module.id,
    type: 'module',
    title: module.title,
    description: module.description,
    pathId: module.pathId,
    moduleId: module.id,
  }))

  const chapters: SearchDocument[] = allChapterMeta.map((chapter) => ({
    id: chapter.id,
    type: 'chapter',
    title: chapter.title,
    description: chapter.summary,
    pathId: chapter.pathId,
    moduleId: chapter.moduleId,
    chapterId: chapter.slug,
  }))

  return [...paths, ...modules, ...chapters]
}
