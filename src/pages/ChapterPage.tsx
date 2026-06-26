import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  GitFork,
  HelpCircle,
  Layers3,
  Library,
  Timer,
  X,
} from 'lucide-react'
import type { Chapter } from '@/types'
import { EmptyState } from '@/components/EmptyState'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { ProgressBar } from '@/components/ProgressBar'
import { useProgress } from '@/hooks/useProgress'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { getChapterMetaById, getModuleById, getPathById, loadChapter } from '@/utils/content'
import { chapterRoute, moduleRoute, pathRoute } from '@/utils/routes'
import { Flashcards } from '@/components/study/Flashcards'
import { MindMap } from '@/components/study/MindMap'
import { QuickRevision } from '@/components/study/QuickRevision'
import { Quiz } from '@/components/study/Quiz'

export function ChapterPage() {
  const { pathId, moduleId, chapterId } = useParams()
  const path = getPathById(pathId)
  const module = getModuleById(pathId, moduleId)
  const meta = getChapterMetaById(pathId, moduleId, chapterId)
  const { progress, toggleBookmark, toggleChapterComplete, recordReading } = useProgress()
  const scrollProgress = useScrollProgress()
  const [chapter, setChapter] = useState<Chapter | null>(null)
  const [activeTool, setActiveTool] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)
  const recordedChapterId = useRef<string | null>(null)

  useEffect(() => {
    let active = true
    setChapter(null)
    setFailed(false)

    loadChapter(pathId, moduleId, chapterId)
      .then((loaded) => {
        if (active) {
          setChapter(loaded ?? null)
        }
      })
      .catch(() => {
        if (active) setFailed(true)
      })

    return () => {
      active = false
    }
  }, [chapterId, moduleId, pathId])

  useEffect(() => {
    if (chapter && recordedChapterId.current !== chapter.id) {
      recordedChapterId.current = chapter.id
      recordReading(chapter.id, chapter.estimatedReadTime)
    }
  }, [chapter, recordReading])

  const siblings = module?.chapters ?? []
  const currentIndex = meta ? siblings.findIndex((item) => item.id === meta.id) : -1
  const previous = currentIndex > 0 ? siblings[currentIndex - 1] : null
  const next = currentIndex >= 0 && currentIndex < siblings.length - 1 ? siblings[currentIndex + 1] : null

  const isBookmarked = meta ? progress.bookmarkedChapters.includes(meta.id) : false
  const isCompleted = meta ? progress.completedChapters.includes(meta.id) : false

  const actions = useMemo(
    () => [
      { id: 'revision', label: 'Quick Revision', icon: Layers3 },
      { id: 'flashcards', label: 'Flashcards', icon: Library },
      { id: 'mindmap', label: 'Mind Map', icon: GitFork },
      { id: 'quiz', label: 'Knowledge Quiz', icon: HelpCircle },
    ],
    [],
  )

  if (!path || !module || !meta) return <Navigate to="/paths" replace />

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-20 -mx-4 border-b border-white/10 bg-orbit-background/[0.84] px-4 py-3 backdrop-blur-xl md:-mx-8 md:px-8 lg:top-0">
        <ProgressBar value={scrollProgress} />
      </div>

      <nav className="flex flex-wrap items-center gap-2 text-sm text-orbit-muted">
        <Link to={pathRoute(path.id)} className="hover:text-orbit-accent">
          {path.title}
        </Link>
        <span>/</span>
        <Link to={moduleRoute(module)} className="hover:text-orbit-accent">
          {module.title}
        </Link>
        <span>/</span>
        <span className="text-orbit-text">{meta.title}</span>
      </nav>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <article className="glass-panel rounded-lg p-5 md:p-8">
          <div className="flex flex-col gap-5 border-b border-white/10 pb-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orbit-accent">
                Chapter {meta.order}
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-orbit-text md:text-5xl">
                {meta.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-orbit-muted">{meta.summary}</p>
              <p className="mt-3 inline-flex items-center gap-2 text-sm text-orbit-muted">
                <Timer size={16} />
                {chapter?.estimatedReadTime ?? 1} min estimated read
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => toggleBookmark(meta.id)}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isBookmarked
                    ? 'bg-orbit-warning/15 text-orbit-warning'
                    : 'bg-white/[0.07] text-orbit-muted hover:text-orbit-text'
                }`}
              >
                <Bookmark size={17} />
                Bookmark
              </button>
              <button
                type="button"
                onClick={() => toggleChapterComplete(meta.id)}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isCompleted
                    ? 'bg-orbit-success/15 text-orbit-success'
                    : 'bg-orbit-primary text-white hover:bg-orbit-secondary'
                }`}
              >
                <CheckCircle2 size={17} />
                {isCompleted ? 'Completed' : 'Mark done'}
              </button>
            </div>
          </div>

          <div className="mt-8">
            {failed && (
              <EmptyState
                icon={Library}
                title="Chapter could not be loaded"
                description="Check the markdown file path in the content manifest and keep notes under src/content."
              />
            )}

            {!failed && chapter?.hasContent && <MarkdownRenderer content={chapter.content} />}

            {!failed && chapter && !chapter.hasContent && (
              <EmptyState
                icon={Library}
                title="Ready for your private notes"
                description={`Create ${chapter.markdownPath.replace('/src/', 'src/')} to add this chapter to your offline encyclopedia. No generated learning content has been added.`}
              />
            )}
          </div>
        </article>

        <aside className="space-y-4">
          <div className="glass-panel rounded-lg p-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-orbit-muted">
              Study Tools
            </h2>
            <div className="mt-4 space-y-2">
              {actions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => setActiveTool(action.id)}
                  className="flex w-full items-center gap-3 rounded-lg bg-white/[0.07] px-3 py-3 text-left text-sm font-medium text-orbit-text transition hover:bg-orbit-primary/[0.16]"
                >
                  <action.icon size={17} className="text-orbit-accent" />
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-lg p-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-orbit-muted">
              Navigation
            </h2>
            <div className="mt-4 grid gap-2">
              {previous ? (
                <Link
                  to={chapterRoute(previous)}
                  className="flex items-center gap-2 rounded-lg bg-white/[0.07] px-3 py-3 text-sm text-orbit-muted hover:text-orbit-text"
                >
                  <ArrowLeft size={16} />
                  {previous.title}
                </Link>
              ) : (
                <span className="rounded-lg bg-white/5 px-3 py-3 text-sm text-orbit-muted">
                  First chapter in module
                </span>
              )}
              {next ? (
                <Link
                  to={chapterRoute(next)}
                  className="flex items-center justify-between gap-2 rounded-lg bg-white/[0.07] px-3 py-3 text-sm text-orbit-muted hover:text-orbit-text"
                >
                  {next.title}
                  <ArrowRight size={16} />
                </Link>
              ) : (
                <span className="rounded-lg bg-white/5 px-3 py-3 text-sm text-orbit-muted">
                  Last chapter in module
                </span>
              )}
            </div>
          </div>
        </aside>
      </section>

      <AnimatePresence>
        {activeTool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-orbit-background/80 p-4 backdrop-blur-md md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-panel relative w-full max-w-4xl overflow-hidden rounded-2xl p-6 md:p-10"
            >
              <button
                onClick={() => setActiveTool(null)}
                className="absolute right-4 top-4 rounded-full p-2 text-orbit-muted hover:bg-white/10 hover:text-orbit-text"
              >
                <X size={20} />
              </button>

              <div className="mt-4">
                {activeTool === 'revision' && <QuickRevision chapterTitle={meta.title} />}
                {activeTool === 'flashcards' && (
                  <Flashcards
                    cards={[
                      {
                        question: `What is the core premise of ${meta.title}?`,
                        answer: meta.summary,
                      },
                      {
                        question: 'Is bitOrbit offline?',
                        answer: 'Yes, it is designed as your personal offline engineering library.',
                      },
                      {
                        question: 'Where should I store my notes?',
                        answer: 'Store markdown files under the src/content directory.',
                      },
                    ]}
                  />
                )}
                {activeTool === 'mindmap' && <MindMap title={meta.title} />}
                {activeTool === 'quiz' && (
                  <Quiz
                    questions={[
                      {
                        id: 'q1',
                        question: `Which architectural pattern is most relevant to ${meta.title}?`,
                        options: ['Monolithic', 'Microservices', 'Event-driven', 'Serverless'],
                        correctAnswer: 2,
                        explanation: 'Event-driven architectures allow for high decoupling and scalability, which is a core focus of modern systems design.',
                      },
                      {
                        id: 'q2',
                        question: 'What is the primary benefit of using a Bits-themed UI?',
                        options: [
                          'Lower power consumption',
                          'Higher visual focus and technical intuition',
                          'Faster page loads',
                          'Better SEO',
                        ],
                        correctAnswer: 1,
                        explanation: 'The Bits theme is designed to provide high visual focus and technical intuition for engineering topics.',
                      },
                    ]}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
