import { motion } from 'framer-motion'

const stars = Array.from({ length: 42 }, (_, index) => ({
  id: index,
  left: `${(index * 23) % 100}%`,
  top: `${(index * 47) % 100}%`,
  size: index % 7 === 0 ? 2 : 1,
  delay: (index % 9) * 0.35,
}))

const nodes = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  left: `${8 + ((index * 31) % 84)}%`,
  top: `${10 + ((index * 19) % 76)}%`,
  delay: index * 0.18,
}))

const bits = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  left: `${(index * 17) % 100}%`,
  top: `${(index * 29) % 100}%`,
  value: index % 2 === 0 ? '0' : '1',
  delay: (index % 7) * 0.8,
  duration: 6 + (index % 4),
}))

export function SpaceBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-orbit-background">
      <motion.div
        className="absolute inset-0 opacity-[0.72]"
        animate={{ backgroundPosition: ['0% 0%', '100% 60%', '0% 0%'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 12%, rgba(108,99,255,.11), transparent 28rem), radial-gradient(circle at 78% 18%, rgba(79,209,255,.08), transparent 24rem), radial-gradient(circle at 46% 84%, rgba(52,211,153,.06), transparent 30rem)',
          backgroundSize: '140% 140%',
        }}
      />
      <div className="absolute inset-0 orbit-grid opacity-[0.72]" />
      <div className="absolute left-[-14rem] top-[-16rem] h-[34rem] w-[34rem] rounded-full bg-orbit-primary/[0.09] blur-3xl" />
      <div className="absolute right-[-10rem] top-[6rem] h-[28rem] w-[28rem] rounded-full bg-orbit-accent/[0.075] blur-3xl" />
      <div className="absolute bottom-[-18rem] left-[22%] h-[30rem] w-[44rem] rounded-full bg-orbit-secondary/[0.065] blur-3xl" />

      <div className="absolute right-[8%] top-[14%] h-80 w-80 rounded-full border border-orbit-accent/[0.08]" />
      <div className="absolute right-[12%] top-[18%] h-56 w-56 rounded-full border border-orbit-primary/[0.08]" />
      <div className="absolute left-[8%] top-[58%] h-64 w-64 rounded-full border border-orbit-secondary/[0.06]" />
      <motion.div
        aria-hidden
        className="absolute right-[calc(8%+9.2rem)] top-[calc(14%+0.2rem)] h-2 w-2 rounded-full bg-orbit-accent shadow-accent-glow"
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '0 10rem' }}
      />

      <svg className="absolute inset-0 h-full w-full opacity-[0.08]" aria-hidden>
        <line x1="12%" y1="22%" x2="38%" y2="36%" stroke="#4FD1FF" strokeWidth="1" />
        <line x1="38%" y1="36%" x2="62%" y2="24%" stroke="#6C63FF" strokeWidth="1" />
        <line x1="62%" y1="24%" x2="82%" y2="46%" stroke="#4FD1FF" strokeWidth="1" />
        <line x1="18%" y1="72%" x2="46%" y2="62%" stroke="#7B61FF" strokeWidth="1" />
        <line x1="46%" y1="62%" x2="74%" y2="72%" stroke="#34D399" strokeWidth="1" />
      </svg>

      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-orbit-text"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
          }}
          animate={{ opacity: [0.08, 0.45, 0.12] }}
          transition={{ duration: 3.8, repeat: Infinity, delay: star.delay }}
        />
      ))}

      {nodes.map((node) => (
        <motion.span
          key={node.id}
          className="absolute h-1.5 w-1.5 rounded-full border border-orbit-accent/40 bg-orbit-background shadow-accent-glow"
          style={{ left: node.left, top: node.top }}
          animate={{ opacity: [0.15, 0.55, 0.18], scale: [1, 1.35, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: node.delay }}
        />
      ))}

      {bits.map((bit) => (
        <motion.span
          key={bit.id}
          className="absolute font-mono text-[10px] font-bold text-orbit-accent/20"
          style={{ left: bit.left, top: bit.top }}
          animate={{
            opacity: [0, 0.3, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: bit.duration,
            repeat: Infinity,
            delay: bit.delay,
            ease: 'linear',
          }}
        >
          {bit.value}
        </motion.span>
      ))}
    </div>
  )
}
