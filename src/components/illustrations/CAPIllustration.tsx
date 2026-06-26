import { motion } from 'framer-motion'
import { useState } from 'react'

export function CAPIllustration() {
  const [selected, setSelected] = useState<'CP' | 'AP' | 'CA' | null>(null)

  return (
    <div className="glass-panel my-8 p-6 flex flex-col items-center bg-orbit-background/40 rounded-xl">
      <div className="text-xs font-semibold uppercase tracking-widest text-orbit-accent mb-10">The CAP Theorem Triangle</div>

      <div className="relative w-64 h-64 mb-8">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          {/* Triangle */}
          <path d="M 50 10 L 90 80 L 10 80 Z" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />

          {/* Vertices */}
          <circle cx="50" cy="10" r="3" className="fill-orbit-primary" />
          <text x="50" y="2" textAnchor="middle" className="fill-orbit-text text-[5px] font-bold uppercase">Consistency</text>

          <circle cx="90" cy="80" r="3" className="fill-orbit-secondary" />
          <text x="96" y="82" className="fill-orbit-text text-[5px] font-bold uppercase">Availability</text>

          <circle cx="10" cy="80" r="3" className="fill-orbit-accent" />
          <text x="4" y="82" textAnchor="end" className="fill-orbit-text text-[5px] font-bold uppercase">Partition Tolerance</text>

          {/* Selection Areas */}
          <g className="cursor-pointer" onClick={() => setSelected('CP')}>
            <circle cx="30" cy="45" r="8" className={`transition-colors ${selected === 'CP' ? 'fill-orbit-primary/40' : 'fill-white/5 hover:fill-white/10'}`} />
            <text x="30" y="46" textAnchor="middle" className="fill-white text-[4px] font-bold pointer-events-none">CP</text>
          </g>

          <g className="cursor-pointer" onClick={() => setSelected('AP')}>
            <circle cx="50" cy="80" r="8" className={`transition-colors ${selected === 'AP' ? 'fill-orbit-accent/40' : 'fill-white/5 hover:fill-white/10'}`} />
            <text x="50" y="81" textAnchor="middle" className="fill-white text-[4px] font-bold pointer-events-none">AP</text>
          </g>

          <g className="cursor-pointer" onClick={() => setSelected('CA')}>
            <circle cx="70" cy="45" r="8" className={`transition-colors ${selected === 'CA' ? 'fill-orbit-secondary/40' : 'fill-white/5 hover:fill-white/10'}`} />
            <text x="70" y="46" textAnchor="middle" className="fill-white text-[4px] font-bold pointer-events-none">CA</text>
          </g>
        </svg>
      </div>

      <div className="h-16 text-center">
        {selected === 'CP' && <p className="text-xs text-orbit-muted italic">"I'd rather return an error than stale data during a partition."</p>}
        {selected === 'AP' && <p className="text-xs text-orbit-muted italic">"I will return whatever data I have, even if it might be old."</p>}
        {selected === 'CA' && <p className="text-xs text-orbit-muted italic">"Theoretical system that only works when there are no network issues."</p>}
        {!selected && <p className="text-xs text-orbit-muted uppercase tracking-widest opacity-50">Select a trade-off</p>}
      </div>
    </div>
  )
}
