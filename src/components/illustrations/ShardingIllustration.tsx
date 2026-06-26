import { motion } from 'framer-motion'
import { Database, HardDrive, Share2 } from 'lucide-react'

export function ShardingIllustration() {
  return (
    <div className="glass-panel my-8 overflow-hidden rounded-2xl bg-orbit-background/40 p-8">
      <div className="mb-6 flex items-center justify-between">
        <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-orbit-accent">
          Database Sharding Pattern
        </h4>
        <span className="rounded-full bg-orbit-primary/10 px-3 py-1 text-[10px] font-bold text-orbit-primary uppercase">
          Horizontal Partitioning
        </span>
      </div>

      <div className="relative flex h-64 items-center justify-center gap-12">
        {/* Shard Key Input */}
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-xl bg-white/5 p-4 text-orbit-accent">
            <Share2 size={32} />
          </div>
          <span className="text-[10px] font-bold text-orbit-muted uppercase tracking-widest">Shard Key</span>

          {/* Data Packets */}
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{
                x: [0, 150],
                y: [0, (i - 1) * 80],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.7,
                ease: "easeInOut"
              }}
              className="absolute h-2 w-2 rounded-full bg-orbit-accent"
            />
          ))}
        </div>

        {/* Shards */}
        <div className="flex flex-col gap-6">
          {['Shard A (User 1-1M)', 'Shard B (User 1M-2M)', 'Shard C (User 2M+)'].map((label, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-3 pr-6"
            >
              <div className="rounded-lg bg-orbit-primary/10 p-2 text-orbit-primary">
                <Database size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-orbit-text">{label}</span>
                <div className="mt-1 h-1 w-24 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    animate={{ width: ['30%', '70%', '45%'] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    className="h-full bg-orbit-primary"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/5 pt-6 text-[11px] text-orbit-muted">
        <p>● Eliminates single point of failure for data.</p>
        <p>● Increases write throughput linearly with nodes.</p>
      </div>
    </div>
  )
}
