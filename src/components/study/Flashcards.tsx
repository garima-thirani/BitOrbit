import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCw, ChevronLeft, ChevronRight } from 'lucide-react'

interface Flashcard {
  question: string
  answer: string
}

interface FlashcardsProps {
  cards: Flashcard[]
}

export function Flashcards({ cards }: FlashcardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const handleNext = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev + 1) % cards.length)
  }

  const handlePrev = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length)
  }

  if (cards.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-orbit-muted">
        No flashcards available for this chapter.
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <div className="relative h-[320px] w-full max-w-[500px] perspective-1000">
        <motion.div
          className="relative h-full w-full transition-all duration-500 preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front */}
          <div className="glass-panel absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-8 backface-hidden cursor-pointer hover:border-orbit-accent/40 transition-colors group">
            <div className="absolute inset-0 bits-grid opacity-10 group-hover:opacity-20 transition-opacity" />
            <div className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest text-orbit-accent/60">
              Question
            </div>
            <p className="relative z-10 text-center text-xl font-medium leading-relaxed text-orbit-text">
              {cards[currentIndex].question}
            </p>
            <div className="absolute bottom-4 flex items-center gap-2 text-xs text-orbit-muted">
              <RotateCw size={14} />
              Click to flip
            </div>
          </div>

          {/* Back */}
          <div
            className="glass-panel absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-8 backface-hidden cursor-pointer border-orbit-primary/40 bg-orbit-primary/5 overflow-hidden group"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <div className="absolute inset-0 bits-grid opacity-20" />
            <div className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest text-orbit-primary/60">
              Answer
            </div>
            <p className="relative z-10 text-center text-lg leading-relaxed text-orbit-text">
              {cards[currentIndex].answer}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={handlePrev}
          className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-orbit-muted hover:bg-white/10 hover:text-orbit-text transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-sm font-medium text-orbit-muted tabular-nums">
          {currentIndex + 1} / {cards.length}
        </span>
        <button
          onClick={handleNext}
          className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-orbit-muted hover:bg-white/10 hover:text-orbit-text transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
