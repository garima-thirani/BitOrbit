import {
  Atom,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Network,
  Server,
  Workflow,
  type LucideIcon,
} from 'lucide-react'

const icons: Record<string, LucideIcon> = {
  Atom,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Network,
  Server,
  Workflow,
}

interface IconBadgeProps {
  icon: string
  gradient: string
}

export function IconBadge({ icon, gradient }: IconBadgeProps) {
  const Icon = icons[icon] ?? Code2

  return (
    <div
      className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${gradient} text-white shadow-glow`}
    >
      <Icon size={22} />
    </div>
  )
}
