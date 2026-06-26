import { motion } from 'framer-motion'
import { Server, Users, ArrowRight } from 'lucide-react'

export function LoadBalancerIllustration() {
  return (
    <div className="glass-panel my-8 overflow-hidden rounded-2xl bg-orbit-background/40 p-8">
      <div className="mb-6 flex items-center justify-between">
        <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-orbit-accent">
          Traffic Distribution Pattern
        </h4>
        <span className="rounded-full bg-orbit-success/10 px-3 py-1 text-[10px] font-bold text-orbit-success uppercase">
          Live Simulation
        </span>
      </div>

      <div className="relative flex h-64 items-center justify-between px-12">
        {/* Users */}
        <div className="flex flex-col gap-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              className="relative rounded-xl bg-white/5 p-3 text-orbit-primary"
            >
              <Users size={24} />
              {/* Traffic Packets */}
              <motion.div
                animate={{
                  x: [0, 180],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "linear"
                }}
                className="absolute left-full top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-orbit-accent shadow-[0_0_10px_rgba(var(--orbit-accent-rgb),0.8)]"
              />
            </motion.div>
          ))}
        </div>

        {/* Load Balancer */}
        <div className="relative flex flex-col items-center">
          <div className="z-10 rounded-2xl border-2 border-orbit-accent bg-orbit-background p-6 shadow-[0_0_30px_rgba(var(--orbit-accent-rgb),0.2)]">
            <div className="relative h-12 w-12 text-orbit-accent">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-orbit-accent/40"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <ArrowRight size={32} />
              </div>
            </div>
          </div>
          <span className="mt-4 text-[10px] font-bold text-orbit-muted uppercase tracking-widest">
            Load Balancer
          </span>
        </div>

        {/* Servers */}
        <div className="flex flex-col gap-12">
          {[1, 2].map((i) => (
            <div key={i} className="relative flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="rounded-xl bg-white/5 p-4 text-orbit-secondary"
              >
                <Server size={32} />
              </motion.div>
              <span className="mt-2 text-[9px] font-medium text-orbit-muted uppercase">
                Server {i}
              </span>

              {/* Receiving Glow */}
              <motion.div
                animate={{
                  opacity: [0, 0.4, 0],
                  scale: [0.8, 1.1, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i === 1 ? 1.5 : 2.5
                }}
                className="absolute inset-0 -z-10 rounded-xl bg-orbit-accent blur-xl"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/5 pt-6 text-[11px] text-orbit-muted">
        <p>● Distributes 1M+ requests/sec using Round Robin.</p>
        <p>● Health checks ensure 99.99% availability.</p>
      </div>
    </div>
  )
}
