import { motion, AnimatePresence } from 'framer-motion'
import { Database, Search, Zap, XCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

export function CachingIllustration() {
  const [status, setStatus] = useState<'idle' | 'hit' | 'miss'>('idle')

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => prev === 'hit' ? 'miss' : 'hit')
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="glass-panel my-8 overflow-hidden rounded-2xl bg-orbit-background/40 p-8">
      <div className="mb-6 flex items-center justify-between">
        <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-orbit-accent">
          Caching Performance Pattern
        </h4>
        <div className="flex gap-2">
          <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase transition-colors ${status === 'hit' ? 'bg-orbit-success/20 text-orbit-success' : 'bg-white/5 text-orbit-muted'}`}>
            Cache Hit
          </span>
          <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase transition-colors ${status === 'miss' ? 'bg-orbit-warning/20 text-orbit-warning' : 'bg-white/5 text-orbit-muted'}`}>
            Cache Miss
          </span>
        </div>
      </div>

      <div className="relative flex h-64 items-center justify-around px-8">
        {/* Request */}
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full bg-orbit-primary/20 p-4 text-orbit-primary">
            <Search size={32} />
          </div>
          <span className="text-[10px] font-bold text-orbit-muted uppercase tracking-widest">Client Request</span>

          <motion.div
            key={status}
            animate={{ x: [0, 150] }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-[15%] top-[45%] h-3 w-3 rounded-full bg-orbit-accent shadow-[0_0_15px_rgba(var(--orbit-accent-rgb),1)]"
          />
        </div>

        {/* Cache Layer */}
        <div className="relative flex flex-col items-center gap-4">
          <motion.div
            animate={status === 'hit' ? { scale: [1, 1.1, 1], borderColor: ['rgba(255,255,255,0.1)', '#10b981', 'rgba(255,255,255,0.1)'] } : {}}
            className="rounded-2xl border-2 border-white/10 bg-white/5 p-6 backdrop-blur-md"
          >
            <Zap size={40} className={status === 'hit' ? 'text-orbit-success' : 'text-orbit-muted'} />

            <AnimatePresence>
              {status === 'hit' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-orbit-success"
                >
                  FOUND! (1ms)
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <span className="text-[10px] font-bold text-orbit-muted uppercase tracking-widest">Redis Cache</span>
        </div>

        {/* Database Layer */}
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={status === 'miss' ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.95 }}
            className="rounded-2xl border-2 border-white/10 bg-white/5 p-6"
          >
            <Database size={40} className={status === 'miss' ? 'text-orbit-warning' : 'text-orbit-muted'} />

            {status === 'miss' && (
              <motion.div
                animate={{ x: [-150, 0], opacity: [0, 1] }}
                className="absolute right-full top-1/2 h-0.5 w-32 bg-gradient-to-r from-transparent to-orbit-warning"
              />
            )}
          </motion.div>
          <span className="text-[10px] font-bold text-orbit-muted uppercase tracking-widest">Main DB</span>
        </div>
      </div>

      <div className="mt-8 border-t border-white/5 pt-6 text-[11px] text-orbit-muted">
        <p>● Cache Hits reduce database load by up to 95%.</p>
        <p>● Latency drops from ~200ms (DB) to {'<'}2ms (Cache).</p>
      </div>
    </div>
  )
}
