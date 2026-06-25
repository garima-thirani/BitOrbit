import { BarChart3, BookOpenCheck, Clock3, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MetricCard } from '@/components/MetricCard'
import { ProgressBar } from '@/components/ProgressBar'
import { SectionHeader } from '@/components/SectionHeader'
import { learningPaths } from '@/data/learningPaths'
import { useProgress } from '@/hooks/useProgress'
import { getCompletedModulesCount, getOverallProgress, getPathProgress } from '@/utils/progress'
import { pathRoute } from '@/utils/routes'

export function ProgressPage() {
  const { progress } = useProgress()
  const overall = getOverallProgress(progress)

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Progress"
        title="A compact view of your engineering momentum."
        description="Track completion and reading time without turning bitOrbit into an LMS."
      />

      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Overall Progress" value={`${overall}%`} icon={Trophy} tone="primary" />
        <MetricCard label="Reading Time" value={`${progress.readingMinutes}m`} icon={Clock3} tone="accent" />
        <MetricCard
          label="Modules Complete"
          value={`${getCompletedModulesCount(progress)}`}
          icon={BookOpenCheck}
          tone="success"
        />
      </section>

      <section className="glass-panel rounded-lg p-5">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-orbit-primary/[0.12] text-orbit-primary">
            <BarChart3 size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-orbit-text">Total Completion</h2>
            <p className="text-sm text-orbit-muted">Across all paths and modules in the framework.</p>
          </div>
        </div>
        <div className="mt-5">
          <ProgressBar value={overall} label="All chapters" />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {learningPaths.map((path) => (
          <Link
            key={path.id}
            to={pathRoute(path.id)}
            className="glass-panel rounded-lg p-5 transition hover:border-orbit-accent/[0.45]"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-orbit-text">{path.title}</h2>
                <p className="mt-1 text-sm text-orbit-muted">{path.modules.length} modules</p>
              </div>
              <span className="text-sm font-semibold text-orbit-accent">
                {getPathProgress(path, progress)}%
              </span>
            </div>
            <div className="mt-4">
              <ProgressBar value={getPathProgress(path, progress)} />
            </div>
          </Link>
        ))}
      </section>
    </div>
  )
}
