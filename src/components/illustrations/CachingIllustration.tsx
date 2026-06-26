import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export function CachingIllustration() {
  const [status, setStatus] = useState<'idle' | 'hit' | 'miss'>('idle')

  const simulate = (type: 'hit' | 'miss') => {
    setStatus(type)
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <div className="glass-panel my-8 p-6 flex flex-col items-center bg-orbit-background/40 rounded-xl">
      <div className="text-xs font-semibold uppercase tracking-widest text-orbit-accent mb-6">Caching Strategy Simulation</div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => simulate('hit')}
          className="px-4 py-2 bg-orbit-success/20 border border-orbit-success text-orbit-success rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-orbit-success/30 transition"
        >
          Simulate Cache Hit
        </button>
        <button
          onClick={() => simulate('miss')}
          className="px-4 py-2 bg-orbit-warning/20 border border-orbit-warning text-orbit-warning rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-orbit-warning/30 transition"
        >
          Simulate Cache Miss
        </button>
      </div>

      <div className="relative w-full max-w-md h-48 flex items-center justify-between px-8">
        <div className="w-16 h-16 bg-orbit-primary/20 border border-orbit-primary rounded-full flex items-center justify-center text-[10px] font-bold">APP</div>

        <div className="relative">
          <div className={`w-24 h-24 border-2 rounded-xl flex items-center justify-center text-[10px] font-bold transition-colors ${
            status === 'hit' ? 'border-orbit-success bg-orbit-success/10' :
            status === 'miss' ? 'border-orbit-warning bg-orbit-warning/10' :
            'border-white/10 bg-white/5'
          }`}>
            CACHE
          </div>
          <AnimatePresence>
            {status !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase ${status === 'hit' ? 'text-orbit-success' : 'text-orbit-warning'}`}
              >
                {status}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-[10px] font-bold">DB</div>

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full -z-10" pointerEvents="none">
           <line x1="80" y1="96" x2="160" y2="96" stroke="white" strokeWidth="1" strokeDasharray="4" opacity="0.2" />
           <line x1="280" y1="96" x2="360" y2="96" stroke="white" strokeWidth="1" strokeDasharray="4" opacity="0.2" />
        </svg>

        {status === 'miss' && (
          <motion.div
            initial={{ left: 280, top: '50%', x: 0 }}
            animate={{ left: 360 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute w-2 h-2 bg-orbit-warning rounded-full"
          />
        )}
      </div>
    </div>
  )
}
