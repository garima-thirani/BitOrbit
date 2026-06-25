interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
}

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-orbit-accent">
          {eyebrow}
        </p>
      )}
      <h1 className="text-3xl font-semibold tracking-tight text-orbit-text md:text-5xl">{title}</h1>
      {description && <p className="mt-4 text-base leading-7 text-orbit-muted">{description}</p>}
    </div>
  )
}
