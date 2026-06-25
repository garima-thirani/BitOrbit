import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense, type ComponentType } from 'react'
import { AppLayout } from '@/layouts/AppLayout'

const HomePage = lazy(() => import('@/pages/HomePage').then(asDefault('HomePage')))
const LearningPathsPage = lazy(() =>
  import('@/pages/LearningPathsPage').then(asDefault('LearningPathsPage')),
)
const LearningPathPage = lazy(() =>
  import('@/pages/LearningPathPage').then(asDefault('LearningPathPage')),
)
const ModulePage = lazy(() => import('@/pages/ModulePage').then(asDefault('ModulePage')))
const ChapterPage = lazy(() => import('@/pages/ChapterPage').then(asDefault('ChapterPage')))
const BookmarksPage = lazy(() => import('@/pages/BookmarksPage').then(asDefault('BookmarksPage')))
const SearchPage = lazy(() => import('@/pages/SearchPage').then(asDefault('SearchPage')))
const ProgressPage = lazy(() => import('@/pages/ProgressPage').then(asDefault('ProgressPage')))
const SettingsPage = lazy(() => import('@/pages/SettingsPage').then(asDefault('SettingsPage')))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then(asDefault('NotFoundPage')))

function asDefault<TModule extends Record<TKey, ComponentType>, TKey extends keyof TModule>(
  key: TKey,
) {
  return (module: TModule) => ({ default: module[key] })
}

function routePage(Page: ComponentType) {
  return (
    <Suspense
      fallback={
        <div className="glass-panel rounded-lg p-6 text-sm font-medium text-orbit-muted">
          Loading orbit...
        </div>
      }
    >
      <Page />
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: routePage(HomePage) },
      { path: 'paths', element: routePage(LearningPathsPage) },
      { path: 'paths/:pathId', element: routePage(LearningPathPage) },
      { path: 'paths/:pathId/modules/:moduleId', element: routePage(ModulePage) },
      { path: 'paths/:pathId/modules/:moduleId/chapters/:chapterId', element: routePage(ChapterPage) },
      { path: 'bookmarks', element: routePage(BookmarksPage) },
      { path: 'search', element: routePage(SearchPage) },
      { path: 'progress', element: routePage(ProgressPage) },
      { path: 'settings', element: routePage(SettingsPage) },
      { path: '*', element: routePage(NotFoundPage) },
    ],
  },
])
