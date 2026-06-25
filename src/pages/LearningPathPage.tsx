import { Navigate, useParams } from 'react-router-dom'
import { ChapterList } from '@/components/ChapterList'
import { IconBadge } from '@/components/IconBadge'
import { ModuleCard } from '@/components/ModuleCard'
import { ProgressBar } from '@/components/ProgressBar'
import { SectionHeader } from '@/components/SectionHeader'
import { useProgress } from '@/hooks/useProgress'
import { getPathById } from '@/utils/content'
import { getModuleProgress, getPathProgress } from '@/utils/progress'

export function LearningPathPage() {
  const { pathId } = useParams()
  const path = getPathById(pathId)
  const { progress } = useProgress()

  if (!path) return <Navigate to="/paths" replace />

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-lg p-6 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="flex gap-4">
            <IconBadge icon={path.icon} gradient={path.gradient} />
            <SectionHeader eyebrow={path.difficulty} title={path.title} description={path.description} />
          </div>
          <div className="min-w-[14rem] rounded-lg border border-white/10 bg-orbit-background/60 p-4">
            <ProgressBar value={getPathProgress(path, progress)} label="Path progress" />
            <p className="mt-3 text-sm text-orbit-muted">{path.estimatedHours} estimated hours</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {path.modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            progress={getModuleProgress(
              module.chapters.map((chapter) => chapter.id),
              progress,
            )}
          />
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-orbit-text">Chapters</h2>
        {path.modules.map((module) => (
          <div key={module.id} className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-orbit-muted">
              {module.title}
            </h3>
            <ChapterList chapters={module.chapters} completed={progress.completedChapters} />
          </div>
        ))}
      </section>
    </div>
  )
}
