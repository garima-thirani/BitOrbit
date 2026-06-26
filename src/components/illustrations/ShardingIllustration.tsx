import { motion } from 'framer-motion'
import { useState } from 'react'

export function ShardingIllustration() {
  const [data, setData] = useState<{id: number, shard: number}[]>([])

  const addData = () => {
    const id = Math.floor(Math.random() * 1000)
    const shard = id % 3
    setData(prev => [...prev.slice(-5), { id, shard }])
  }

  return (
    <div className="glass-panel my-8 p-6 flex flex-col items-center bg-orbit-background/40 rounded-xl">
      <div className="text-xs font-semibold uppercase tracking-widest text-orbit-accent mb-6">Horizontal Partitioning (Sharding)</div>

      <button
        onClick={addData}
        className="mb-8 px-6 py-2 bg-orbit-primary/20 border border-orbit-primary text-orbit-primary rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-orbit-primary/30 transition"
      >
        Write Random Data (ID % 3)
      </button>

      <div className="grid grid-cols-3 gap-4 w-full">
        {[0, 1, 2].map(s => (
          <div key={s} className="flex flex-col items-center">
            <div className="w-full h-32 bg-white/5 border border-white/10 rounded-lg p-2 flex flex-col gap-2 overflow-hidden">
              <div className="text-[8px] font-bold text-orbit-muted uppercase text-center border-b border-white/5 pb-1">Shard {s}</div>
              <div className="flex flex-col gap-1">
                {data.filter(d => d.shard === s).map(d => (
                  <motion.div
                    key={d.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-orbit-accent/20 border border-orbit-accent/40 rounded px-1 py-0.5 text-[8px] text-center"
                  >
                    ID: {d.id}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
