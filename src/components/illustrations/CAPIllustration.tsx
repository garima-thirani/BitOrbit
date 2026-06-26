import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export function CAPIllustration() {
  const [active, setActive] = useState<'C' | 'A' | 'P' | null>(null)

  const nodes = [
    { id: 'C', label: 'Consistency', description: 'Every read receives the most recent write or an error.', color: 'text-orbit-accent' },
    { id: 'A', label: 'Availability', description: 'Every request receives a (non-error) response.', color: 'text-orbit-primary' },
    { id: 'P', label: 'Partition Tolerance', description: 'The system continues to operate despite network failures.', color: 'text-orbit-success' },
  ]

  return (
    <div className="glass-panel my-8 overflow-hidden rounded-2xl bg-orbit-background/40 p-8">
      <div className="mb-6 flex items-center justify-between">
        <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-orbit-accent">
          CAP Theorem Interactive Triangle
        </h4>
        <span className="text-[10px] font-bold text-orbit-muted uppercase">Pick Two</span>
      </div>

      <div className="relative flex h-80 flex-col items-center justify-center">
        <svg viewBox="0 0 400 300" className="h-full w-full max-w-md">
          {/* Triangle Lines */}
          <motion.path
            d="M 200 50 L 350 250 L 50 250 Z"
            fill="none"
            stroke="white"
            strokeWidth="1"
            className="opacity-10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
          />

          {/* Connection Glows */}
          <AnimatePresence>
            {active && (
              <motion.circle
                key="glow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                exit={{ opacity: 0 }}
                cx={active === 'C' ? 200 : active === 'A' ? 350 : 50}
                cy={active === 'C' ? 50 : active === 'A' ? 250 : 250}
                r="60"
                className="fill-orbit-accent blur-2xl"
              />
            )}
          </AnimatePresence>

          {/* Vertices */}
          {nodes.map((node, i) => {
            const x = node.id === 'C' ? 200 : node.id === 'A' ? 350 : 50
            const y = node.id === 'C' ? 50 : node.id === 'A' ? 250 : 250

            return (
              <motion.g
                key={node.id}
                onMouseEnter={() => setActive(node.id as any)}
                onMouseLeave={() => setActive(null)}
                className="cursor-help"
              >
                <circle cx={x} cy={y} r="40" className="fill-black stroke-white/10" />
                <motion.circle
                  animate={active === node.id ? { r: 45, strokeOpacity: 1 } : { r: 40, strokeOpacity: 0.2 }}
                  cx={x} cy={y} className={`fill-none stroke-2 ${node.color}`}
                />
                <text x={x} y={y} textAnchor="middle" dominantBaseline="central" className="fill-orbit-text text-[12px] font-bold">
                  {node.id}
                </text>
              </motion.g>
            )
          })}
        </svg>

        <div className="mt-4 min-h-[60px] text-center">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h5 className={`text-sm font-bold ${nodes.find(n => n.id === active)?.color}`}>
                  {nodes.find(n => n.id === active)?.label}
                </h5>
                <p className="mt-1 text-xs text-orbit-muted max-w-xs mx-auto">
                  {nodes.find(n => n.id === active)?.description}
                </p>
              </motion.div>
            ) : (
              <p className="text-xs text-orbit-muted italic">Hover over a vertex to explore the theorem</p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
