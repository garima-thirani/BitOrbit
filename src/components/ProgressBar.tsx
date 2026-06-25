interface ProgressBarProps {
  value: number
  label?: string
}

export function ProgressBar({ value, label }: ProgressBarProps) {
  const safeValue = Math.max(0, Math.min(100, value))

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between text-xs font-medium text-orbit-muted">
          <span>{label}</span>
          <span>{safeValue}%</span>
        </div>
      )}
      <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-orbit-primary via-orbit-secondary to-orbit-accent"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  )
}
