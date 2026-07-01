import { motion } from 'framer-motion'
import { ArrowRightLeft, Code2, Server } from 'lucide-react'

export function ClientServerIllustration() {
  return (
    <div className="glass-panel my-8 overflow-hidden rounded-2xl bg-orbit-background/40 p-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-orbit-accent">
          API Contract Flow
        </h4>
        <span className="rounded-full bg-orbit-secondary/10 px-3 py-1 text-[10px] font-bold uppercase text-orbit-secondary">
          Interactive Flow
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto_1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-5"
        >
          <div className="mb-3 flex items-center gap-3 text-orbit-primary">
            <Code2 size={20} />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">Client</span>
          </div>
          <p className="text-sm leading-6 text-orbit-muted">
            Sends requests, validates input lightly, and depends on the API contract for the shape of the response.
          </p>
          <div className="mt-4 rounded-xl border border-white/10 bg-orbit-background/60 p-3 text-xs text-orbit-muted">
            POST /v1/urls
          </div>
        </motion.div>

        <div className="flex items-center justify-center py-2 lg:py-0">
          <motion.div
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-full border border-orbit-accent/30 bg-orbit-accent/10 p-4 text-orbit-accent shadow-accent-glow"
          >
            <ArrowRightLeft size={28} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-5"
        >
          <div className="mb-3 flex items-center gap-3 text-orbit-secondary">
            <Server size={20} />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">Server</span>
          </div>
          <p className="text-sm leading-6 text-orbit-muted">
            Owns business logic, enforces rules, and returns a contract-compliant response with status codes.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-orbit-muted">
            <span className="rounded-xl border border-white/10 bg-orbit-background/60 px-3 py-2">200 OK</span>
            <span className="rounded-xl border border-white/10 bg-orbit-background/60 px-3 py-2">400 Error</span>
          </div>
        </motion.div>
      </div>

      <div className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-[11px] text-orbit-muted md:grid-cols-3">
        <span>Contract is explicit.</span>
        <span>Implementation stays hidden.</span>
        <span>Changes stay decoupled.</span>
      </div>
    </div>
  )
}