import { motion } from 'framer-motion'
import { Sparkles, CheckCircle2, ChevronRight } from 'lucide-react'

interface RevisionPoint {
  title: string
  description: string
}

interface QuickRevisionProps {
  points?: RevisionPoint[]
  chapterTitle: string
}

export function QuickRevision({ points = [], chapterTitle }: QuickRevisionProps) {
  // Mock points if none provided for better visualization of the feature
  const defaultPoints: RevisionPoint[] = points.length > 0 ? points : [
    { title: 'Core Premise', description: `Key takeaways from the study of ${chapterTitle}.` },
    { title: 'Technical Constraints', description: 'Trade-offs and architectural considerations discussed.' },
    { title: 'Implementation Pattern', description: 'Recommended approach for applying these concepts in production.' },
  ]

  return (
    <div className="space-y-6 py-4">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-orbit-accent/10 text-orbit-accent">
          <Sparkles size={20} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-orbit-text">Quick Revision</h2>
          <p className="text-sm text-orbit-muted tabular-nums uppercase tracking-widest">Digital Snapshot</p>
        </div>
      </div>

      <div className="grid gap-4">
        {defaultPoints.map((point, i) => (
          <motion.div
            key={point.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel group relative flex flex-col gap-2 rounded-xl p-5 hover:border-orbit-primary/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-orbit-primary group-hover:text-orbit-accent transition-colors">
                {point.title}
              </h3>
              <CheckCircle2 size={16} className="text-orbit-success/40" />
            </div>
            <p className="text-sm leading-relaxed text-orbit-muted group-hover:text-orbit-text transition-colors">
              {point.description}
            </p>
            <div className="absolute right-5 bottom-5 opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight size={14} className="text-orbit-accent" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="rounded-lg border border-orbit-primary/20 bg-orbit-primary/5 p-4">
        <p className="text-xs font-medium italic text-orbit-muted/80">
          "The best way to remember is to review frequently. This summary is generated from your offline technical notes."
        </p>
      </div>
    </div>
  )
}
