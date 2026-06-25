import { Bookmark } from 'lucide-react'
import { EmptyState } from '@/components/EmptyState'
import { ChapterList } from '@/components/ChapterList'
import { SectionHeader } from '@/components/SectionHeader'
import { allChapterMeta } from '@/data/learningPaths'
import { useProgress } from '@/hooks/useProgress'

export function BookmarksPage() {
  const { progress } = useProgress()
  const bookmarked = allChapterMeta.filter((chapter) =>
    progress.bookmarkedChapters.includes(chapter.id),
  )

  return (
    <div className="space-y-7">
      <SectionHeader
        eyebrow="Bookmarks"
        title="Keep important chapters close."
        description="Bookmarks are stored locally and work with your private markdown notes."
      />

      {bookmarked.length ? (
        <ChapterList chapters={bookmarked} completed={progress.completedChapters} />
      ) : (
        <EmptyState
          icon={Bookmark}
          title="No bookmarks yet"
          description="Open a chapter and bookmark it when it becomes part of your active engineering map."
        />
      )}
    </div>
  )
}
