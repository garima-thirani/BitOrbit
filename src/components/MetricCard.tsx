import type { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: string
  icon: LucideIcon
  tone?: 'primary' | 'accent' | 'success' | 'warning'
}

const toneClasses = {
  primary: 'text-orbit-primary bg-orbit-primary/[0.12]',
  accent: 'text-orbit-accent bg-orbit-accent/[0.12]',
  success: 'text-orbit-success bg-orbit-success/[0.12]',
  warning: 'text-orbit-warning bg-orbit-warning/[0.12]',
}

export function MetricCard({ label, value, icon: Icon, tone = 'primary' }: MetricCardProps) {
  return (
    <section className="glass-panel rounded-lg p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-orbit-muted">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-orbit-text">{value}</p>
        </div>
        <div className={`grid h-11 w-11 place-items-center rounded-lg ${toneClasses[tone]}`}>
          <Icon size={20} />
        </div>
      </div>
    </section>
  )
}
