import { motion } from 'framer-motion'

interface LogoProps {
  compact?: boolean
}

export function Logo({ compact = false }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid h-12 w-12 shrink-0 place-items-center">
        <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orbit-primary/15 via-orbit-accent/10 to-transparent blur-sm" />
        <motion.span
          className="absolute h-11 w-8 rounded-[50%] border border-orbit-accent/50"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
        <motion.span
          className="absolute h-12 w-9 rounded-[50%] border border-orbit-accent/20"
          animate={{ rotate: -180 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.span
          className="absolute h-8 w-11 rounded-[50%] border border-orbit-primary/50"
          animate={{ rotate: -360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        />
        <motion.span
          className="absolute h-9 w-12 rounded-[50%] border border-orbit-primary/20"
          animate={{ rotate: 180 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <span className="absolute right-1.5 top-2 h-1.5 w-1.5 rounded-full bg-orbit-accent shadow-accent-glow" />
        <span className="absolute bottom-2 left-2 h-1.5 w-1.5 rounded-full bg-orbit-secondary shadow-glow" />
        <motion.span
          className="absolute left-2 top-3 text-[7px] font-bold leading-none text-orbit-accent/80"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          1
        </motion.span>
        <motion.span
          className="absolute bottom-3 right-2 text-[7px] font-bold leading-none text-orbit-primary/80"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          0
        </motion.span>
        <span className="relative h-4 w-4 rotate-45 rounded-[4px] bg-gradient-to-br from-orbit-text via-orbit-accent to-orbit-primary shadow-glow" />
      </div>

      {!compact && (
        <div className="min-w-0">
          <p className="text-lg font-semibold tracking-[-0.03em] text-orbit-text">bitOrbit</p>
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-orbit-muted">
            Learn. Build. Orbit.
          </p>
        </div>
      )}
    </div>
  )
}
