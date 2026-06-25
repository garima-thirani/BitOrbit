import { createContext, useContext, useMemo, type PropsWithChildren } from 'react'
import type { UserProgress } from '@/types'
import { defaultProgress } from '@/utils/progress'
import { useLocalStorage } from '@/hooks/useLocalStorage'

interface ProgressContextValue {
  progress: UserProgress
  toggleChapterComplete: (chapterId: string) => void
  toggleBookmark: (chapterId: string) => void
  recordReading: (chapterId: string, minutes: number) => void
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: PropsWithChildren) {
  const [progress, setProgress] = useLocalStorage<UserProgress>('bitorbit.progress', defaultProgress)

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress,
      toggleChapterComplete: (chapterId) => {
        setProgress((current) => {
          const completed = current.completedChapters.includes(chapterId)
            ? current.completedChapters.filter((id) => id !== chapterId)
            : [...current.completedChapters, chapterId]

          return {
            ...current,
            completedChapters: completed,
            lastChapterId: chapterId,
          }
        })
      },
      toggleBookmark: (chapterId) => {
        setProgress((current) => {
          const bookmarked = current.bookmarkedChapters.includes(chapterId)
            ? current.bookmarkedChapters.filter((id) => id !== chapterId)
            : [...current.bookmarkedChapters, chapterId]

          return {
            ...current,
            bookmarkedChapters: bookmarked,
            lastChapterId: chapterId,
          }
        })
      },
      recordReading: (chapterId, minutes) => {
        setProgress((current) => ({
          ...current,
          readingMinutes: current.readingMinutes + minutes,
          lastChapterId: chapterId,
        }))
      },
    }),
    [progress, setProgress],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const value = useContext(ProgressContext)
  if (!value) {
    throw new Error('useProgress must be used inside ProgressProvider')
  }
  return value
}
