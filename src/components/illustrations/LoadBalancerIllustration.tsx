import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export function LoadBalancerIllustration() {
  const [activeRequest, setActiveRequest] = useState<number | null>(null)
  const [targetServer, setTargetServer] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRequest(Date.now())
      setTargetServer((prev) => (prev + 1) % 3)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="glass-panel my-8 p-6 flex flex-col items-center bg-orbit-background/40 rounded-xl overflow-hidden">
      <div className="text-xs font-semibold uppercase tracking-widest text-orbit-accent mb-8">Load Balancer (Round Robin)</div>

      <div className="relative w-full max-w-md h-64">
        {/* Client */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-orbit-primary/20 border border-orbit-primary rounded flex items-center justify-center text-[10px] font-bold">CLIENT</div>

        {/* LB */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-32 h-12 bg-orbit-accent/20 border border-orbit-accent rounded flex items-center justify-center text-[10px] font-bold">LOAD BALANCER</div>

        {/* Servers */}
        <div className="absolute bottom-0 left-0 w-24 h-12 bg-white/5 border border-white/10 rounded flex items-center justify-center text-[10px] font-bold">SERVER 1</div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-12 bg-white/5 border border-white/10 rounded flex items-center justify-center text-[10px] font-bold">SERVER 2</div>
        <div className="absolute bottom-0 right-0 w-24 h-12 bg-white/5 border border-white/10 rounded flex items-center justify-center text-[10px] font-bold">SERVER 3</div>

        {/* Request Animation */}
        {activeRequest && (
          <>
            <motion.div
              key={`req-to-lb-${activeRequest}`}
              initial={{ top: 48, left: '50%', x: '-50%', opacity: 1 }}
              animate={{ top: 96 }}
              transition={{ duration: 0.5 }}
              className="absolute w-2 h-2 bg-orbit-primary rounded-full z-10"
            />
            <motion.div
              key={`req-to-server-${activeRequest}`}
              initial={{ top: 144, left: '50%', x: '-50%', opacity: 0 }}
              animate={{
                top: 200,
                left: targetServer === 0 ? '12%' : targetServer === 1 ? '50%' : '88%',
                opacity: 1
              }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute w-2 h-2 bg-orbit-accent rounded-full z-10"
            />
          </>
        )}
      </div>
    </div>
  )
}
