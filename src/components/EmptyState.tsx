import type { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
}

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="glass-panel rounded-lg p-8 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-orbit-primary/[0.12] text-orbit-primary">
        <Icon size={22} />
      </div>
      <h2 className="mt-5 text-xl font-semibold text-orbit-text">{title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-orbit-muted">{description}</p>
    </div>
  )
}
