import { motion } from 'framer-motion'
import { ArrowRight, BookOpenCheck, Clock3, Search, Sparkles, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LearningPathCard } from '@/components/LearningPathCard'
import { MetricCard } from '@/components/MetricCard'
import { ProgressBar } from '@/components/ProgressBar'
import { quotes } from '@/data/navigation'
import { allChapterMeta, learningPaths } from '@/data/learningPaths'
import { useProgress } from '@/hooks/useProgress'
import { chapterRoute, pathRoute } from '@/utils/routes'
import { getCompletedModulesCount, getOverallProgress, getPathProgress } from '@/utils/progress'

export function HomePage() {
  const { progress } = useProgress()
  const overall = getOverallProgress(progress)
  const quote = quotes[new Date().getDate() % quotes.length]
  const lastChapter = allChapterMeta.find((chapter) => chapter.id === progress.lastChapterId) ?? allChapterMeta[0]

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-lg border border-white/10 bg-orbit-surface/[0.72] p-6 shadow-glow md:p-9">
        <div className="absolute right-8 top-8 hidden h-44 w-44 rounded-full border border-orbit-accent/20 md:block" />
        <div className="absolute right-16 top-16 hidden h-28 w-28 rounded-full border border-orbit-primary/20 md:block" />
        <motion.div
          className="absolute right-28 top-8 hidden h-3 w-3 rounded-full bg-orbit-accent shadow-accent-glow md:block"
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '0 5.5rem' }}
        />

        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-orbit-accent/20 bg-orbit-accent/10 px-3 py-1 text-xs font-medium text-orbit-accent">
            <Sparkles size={14} />
            Personal engineering encyclopedia
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-orbit-text md:text-6xl">
            Learn with focus. Build with memory. Orbit your craft.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-orbit-muted md:text-lg">
            bitOrbit organizes your offline engineering knowledge into paths, modules, chapters,
            bookmarks, and progress signals without becoming a course platform.
          </p>

          <Link
            to="/search"
            className="mt-7 flex max-w-xl items-center gap-3 rounded-lg border border-white/10 bg-orbit-background/[0.78] px-4 py-3 text-orbit-muted transition hover:border-orbit-primary/40 hover:text-orbit-text"
          >
            <Search size={19} />
            <span className="flex-1">Search paths, modules, chapters, and topics</span>
            <ArrowRight size={18} />
          </Link>

          <blockquote className="mt-7 border-l-2 border-orbit-primary pl-4 text-sm leading-6 text-orbit-muted">
            “{quote.text}”
            <span className="mt-1 block text-orbit-accent">{quote.author}</span>
          </blockquote>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Overall Progress" value={`${overall}%`} icon={Trophy} tone="primary" />
        <MetricCard label="Learning Time" value={`${progress.readingMinutes}m`} icon={Clock3} tone="accent" />
        <MetricCard
          label="Modules Completed"
          value={`${getCompletedModulesCount(progress)}`}
          icon={BookOpenCheck}
          tone="success"
        />
      </section>

      {lastChapter && (
        <section className="glass-panel rounded-lg p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orbit-accent">
                Quick Continue
              </p>
              <h2 className="mt-2 text-xl font-semibold text-orbit-text">{lastChapter.title}</h2>
              <p className="mt-1 text-sm text-orbit-muted">{lastChapter.summary}</p>
            </div>
            <Link
              to={chapterRoute(lastChapter)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-orbit-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orbit-secondary"
            >
              Continue
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      )}

      <section>
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orbit-accent">
              Learning Paths
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-orbit-text">Choose your orbit</h2>
          </div>
          <Link to={pathRoute('python')} className="text-sm font-medium text-orbit-accent hover:text-orbit-text">
            Start with Python
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {learningPaths.map((path) => (
            <LearningPathCard key={path.id} path={path} progress={getPathProgress(path, progress)} />
          ))}
        </div>
      </section>

      <section className="glass-panel rounded-lg p-5">
        <ProgressBar value={overall} label="Total encyclopedia completion" />
      </section>
    </div>
  )
}
