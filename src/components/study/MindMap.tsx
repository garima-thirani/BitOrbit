import { motion } from 'framer-motion'

interface Node {
  id: string
  label: string
  x: number
  y: number
}

interface Link {
  source: string
  target: string
}

interface MindMapProps {
  nodes?: Node[]
  links?: Link[]
  title: string
}

export function MindMap({ nodes = [], links = [], title }: MindMapProps) {
  // Default structure if none provided
  const defaultNodes: Node[] = nodes.length > 0 ? nodes : [
    { id: 'center', label: title, x: 250, y: 150 },
    { id: 'n1', label: 'Concept A', x: 100, y: 80 },
    { id: 'n2', label: 'Concept B', x: 400, y: 80 },
    { id: 'n3', label: 'Details', x: 250, y: 250 },
  ]

  const defaultLinks: Link[] = links.length > 0 ? links : [
    { source: 'center', target: 'n1' },
    { source: 'center', target: 'n2' },
    { source: 'center', target: 'n3' },
  ]

  return (
    <div className="glass-panel flex h-[400px] w-full flex-col rounded-2xl overflow-hidden bg-orbit-background/40">
      <div className="border-b border-white/10 px-4 py-3">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-orbit-accent">Concept Map</h3>
      </div>

      <div className="relative flex-1 cursor-grab active:cursor-grabbing">
        <div className="absolute inset-0 bits-grid opacity-10" />
        <svg className="h-full w-full relative z-10" viewBox="0 0 500 300">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* Links */}
          {defaultLinks.map((link, i) => {
            const source = defaultNodes.find(n => n.id === link.source)
            const target = defaultNodes.find(n => n.id === link.target)
            if (!source || !target) return null

            return (
              <motion.line
                key={`${link.source}-${link.target}`}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke="currentColor"
                className="text-orbit-primary/30"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: i * 0.2 }}
              />
            )
          })}

          {/* Nodes */}
          {defaultNodes.map((node, i) => (
            <motion.g
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 200, delay: i * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r="35"
                className={node.id === 'center' ? 'fill-orbit-primary/20 stroke-orbit-primary' : 'fill-black stroke-orbit-accent/40'}
                strokeWidth="2"
                filter="url(#glow)"
              />
              <text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-orbit-text text-[10px] font-bold uppercase tracking-tight"
                pointerEvents="none"
              >
                {node.label}
              </text>
            </motion.g>
          ))}
        </svg>

        <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-[10px] font-medium text-orbit-muted uppercase tracking-widest">
          Interactive Map (WIP)
        </div>
      </div>
    </div>
  )
}
