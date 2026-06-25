import { CheckCircle2, Circle, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ChapterMeta } from '@/types'
import { chapterRoute } from '@/utils/routes'

interface ChapterListProps {
  chapters: ChapterMeta[]
  completed: string[]
}

export function ChapterList({ chapters, completed }: ChapterListProps) {
  return (
    <div className="space-y-3">
      {chapters.map((chapter) => {
        const isDone = completed.includes(chapter.id)

        return (
          <Link
            key={chapter.id}
            to={chapterRoute(chapter)}
            className="glass-panel group flex items-start gap-4 rounded-lg p-4 transition hover:border-orbit-primary/[0.45]"
          >
            <div className="mt-1 text-orbit-muted">
              {isDone ? (
                <CheckCircle2 className="text-orbit-success" size={20} />
              ) : (
                <Circle size={20} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-orbit-muted">
                <FileText size={14} />
                Chapter {chapter.order}
              </div>
              <h3 className="mt-2 text-base font-semibold text-orbit-text group-hover:text-orbit-accent">
                {chapter.title}
              </h3>
              <p className="mt-1 text-sm leading-6 text-orbit-muted">{chapter.summary}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
