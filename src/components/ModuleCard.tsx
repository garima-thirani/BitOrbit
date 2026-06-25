import { ArrowRight, BookOpenCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Module } from '@/types'
import { ProgressBar } from '@/components/ProgressBar'
import { moduleRoute } from '@/utils/routes'

interface ModuleCardProps {
  module: Module
  progress: number
}

export function ModuleCard({ module, progress }: ModuleCardProps) {
  return (
    <Link
      to={moduleRoute(module)}
      className="glass-panel group block rounded-lg p-5 transition hover:border-orbit-accent/[0.45]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-orbit-accent/[0.12] text-orbit-accent">
          <BookOpenCheck size={20} />
        </div>
        <ArrowRight className="text-orbit-muted transition group-hover:translate-x-1 group-hover:text-orbit-accent" />
      </div>
      <h2 className="mt-4 text-lg font-semibold text-orbit-text">{module.title}</h2>
      <p className="mt-2 text-sm leading-6 text-orbit-muted">{module.description}</p>
      <div className="mt-5">
        <ProgressBar value={progress} label={`${module.chapters.length} chapters`} />
      </div>
    </Link>
  )
}
