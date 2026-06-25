import type { ChapterMeta, Module } from '@/types'

export const pathRoute = (pathId: string) => `/paths/${pathId}`

export const moduleRoute = (module: Pick<Module, 'pathId' | 'id'>) =>
  `/paths/${module.pathId}/modules/${module.id}`

export const chapterRoute = (chapter: Pick<ChapterMeta, 'pathId' | 'moduleId' | 'slug'>) =>
  `/paths/${chapter.pathId}/modules/${chapter.moduleId}/chapters/${chapter.slug}`

export const searchRouteFor = (
  item: { type: string; pathId?: string; moduleId?: string; chapterId?: string },
) => {
  if (item.type === 'chapter' && item.pathId && item.moduleId && item.chapterId) {
    return `/paths/${item.pathId}/modules/${item.moduleId}/chapters/${item.chapterId}`
  }

  if (item.type === 'module' && item.pathId && item.moduleId) {
    return `/paths/${item.pathId}/modules/${item.moduleId}`
  }

  if (item.pathId) {
    return `/paths/${item.pathId}`
  }

  return '/paths'
}
