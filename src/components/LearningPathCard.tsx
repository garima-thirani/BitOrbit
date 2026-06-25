import { motion } from 'framer-motion'
import { ArrowUpRight, BookOpen, Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { LearningPath } from '@/types'
import { IconBadge } from '@/components/IconBadge'
import { ProgressBar } from '@/components/ProgressBar'
import { pathRoute } from '@/utils/routes'

interface LearningPathCardProps {
  path: LearningPath
  progress: number
}

export function LearningPathCard({ path, progress }: LearningPathCardProps) {
  const moduleCount = path.modules.length

  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      className="relative"
    >
      <Link
        to={pathRoute(path.id)}
        className="glass-panel group block h-full overflow-hidden rounded-xl p-5 transition-all hover:border-orbit-primary/50 hover:shadow-orbit-primary/10"
      >
        <div className="absolute inset-0 bits-grid opacity-0 group-hover:opacity-40 transition-opacity" />
        <div className="flex items-start justify-between gap-4">
          <IconBadge icon={path.icon} gradient={path.gradient} />
          <ArrowUpRight
            className="text-orbit-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orbit-accent"
            size={20}
          />
        </div>

        <div className="mt-5">
          <h2 className="text-xl font-semibold tracking-tight text-orbit-text">{path.title}</h2>
          <p className="mt-2 min-h-12 text-sm leading-6 text-orbit-muted">{path.description}</p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-orbit-muted">
          <span className="flex items-center gap-2">
            <BookOpen size={15} />
            {moduleCount} {moduleCount === 1 ? 'module' : 'modules'}
          </span>
          <span className="flex items-center gap-2">
            <Clock3 size={15} />
            {path.estimatedHours}h
          </span>
        </div>

        <div className="mt-5">
          <ProgressBar value={progress} label="Path progress" />
        </div>
      </Link>
    </motion.article>
  )
}
