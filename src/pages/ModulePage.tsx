import { Navigate, Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { ChapterList } from '@/components/ChapterList'
import { ProgressBar } from '@/components/ProgressBar'
import { SectionHeader } from '@/components/SectionHeader'
import { useProgress } from '@/hooks/useProgress'
import { getModuleById, getPathById } from '@/utils/content'
import { getModuleProgress } from '@/utils/progress'
import { pathRoute } from '@/utils/routes'

export function ModulePage() {
  const { pathId, moduleId } = useParams()
  const path = getPathById(pathId)
  const module = getModuleById(pathId, moduleId)
  const { progress } = useProgress()

  if (!path || !module) return <Navigate to="/paths" replace />

  const moduleProgress = getModuleProgress(
    module.chapters.map((chapter) => chapter.id),
    progress,
  )

  return (
    <div className="space-y-7">
      <Link
        to={pathRoute(path.id)}
        className="inline-flex items-center gap-2 text-sm font-medium text-orbit-muted hover:text-orbit-accent"
      >
        <ArrowLeft size={17} />
        Back to {path.title}
      </Link>

      <section className="glass-panel rounded-lg p-6 md:p-8">
        <SectionHeader eyebrow={path.title} title={module.title} description={module.description} />
        <div className="mt-6 max-w-xl">
          <ProgressBar value={moduleProgress} label="Module progress" />
        </div>
      </section>

      <ChapterList chapters={module.chapters} completed={progress.completedChapters} />
    </div>
  )
}
