import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, HelpCircle, Trophy, ArrowRight, RotateCcw } from 'lucide-react'

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface QuizProps {
  questions: QuizQuestion[]
  onComplete?: (score: number) => void
}

export function Quiz({ questions, onComplete }: QuizProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const currentQuestion = questions[currentStep]

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return
    setSelectedOption(index)
  }

  const handleSubmit = () => {
    if (selectedOption === null) return
    setIsAnswered(true)
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1)
      setSelectedOption(null)
      setIsAnswered(false)
    } else {
      setShowResult(true)
      onComplete?.(score + (selectedOption === currentQuestion.correctAnswer ? 1 : 0))
    }
  }

  const resetQuiz = () => {
    setCurrentStep(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setScore(0)
    setShowResult(false)
  }

  if (questions.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4 text-orbit-muted">
        <HelpCircle size={40} className="opacity-20" />
        <p>No quiz questions available for this chapter.</p>
      </div>
    )
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center py-8 text-center"
      >
        <div className="relative mb-6">
          <div className="absolute inset-0 animate-ping rounded-full bg-orbit-accent/20" />
          <div className="relative grid h-24 w-24 place-items-center rounded-full bg-orbit-accent/10 text-orbit-accent">
            <Trophy size={48} />
          </div>
        </div>
        <h3 className="text-3xl font-bold text-orbit-text">Quiz Complete!</h3>
        <p className="mt-2 text-orbit-muted">
          You scored <span className="font-bold text-orbit-accent">{score}</span> out of{' '}
          <span className="font-bold text-orbit-text">{questions.length}</span>
        </p>

        <div className="mt-8 grid w-full max-w-xs gap-4">
          <div className="glass-panel overflow-hidden rounded-xl p-1">
            <div
              className="h-2 bg-orbit-accent transition-all duration-1000"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <button
            onClick={resetQuiz}
            className="flex items-center justify-center gap-2 rounded-lg bg-orbit-primary px-6 py-3 font-semibold text-white transition hover:bg-orbit-secondary"
          >
            <RotateCcw size={18} />
            Try Again
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="py-4">
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-orbit-accent">
            Question {currentStep + 1} of {questions.length}
          </p>
          <h3 className="text-xl font-medium text-orbit-text">{currentQuestion.question}</h3>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 font-mono text-sm font-bold text-orbit-accent">
          {Math.round(((currentStep + 1) / questions.length) * 100)}%
        </div>
      </div>

      <div className="grid gap-3">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedOption === index
          const isCorrect = isAnswered && index === currentQuestion.correctAnswer
          const isWrong = isAnswered && isSelected && index !== currentQuestion.correctAnswer

          return (
            <button
              key={index}
              disabled={isAnswered}
              onClick={() => handleOptionSelect(index)}
              className={`group relative flex items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                isSelected && !isAnswered
                  ? 'border-orbit-accent bg-orbit-accent/5'
                  : isCorrect
                  ? 'border-orbit-success bg-orbit-success/10'
                  : isWrong
                  ? 'border-orbit-error bg-orbit-error/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.08]'
              }`}
            >
              <div
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border text-sm font-bold transition-colors ${
                  isSelected && !isAnswered
                    ? 'border-orbit-accent bg-orbit-accent text-white'
                    : isCorrect
                    ? 'border-orbit-success bg-orbit-success text-white'
                    : isWrong
                    ? 'border-orbit-error bg-orbit-error text-white'
                    : 'border-white/10 bg-white/10 text-orbit-muted group-hover:border-white/20'
                }`}
              >
                {String.fromCharCode(65 + index)}
              </div>
              <span className="flex-1 text-sm font-medium text-orbit-text">{option}</span>
              {isCorrect && <Check size={20} className="text-orbit-success" />}
              {isWrong && <X size={20} className="text-orbit-error" />}
            </button>
          )
        })}
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-orbit-accent">Explanation</p>
            <p className="mt-2 text-sm leading-relaxed text-orbit-muted">{currentQuestion.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex justify-end">
        {!isAnswered ? (
          <button
            disabled={selectedOption === null}
            onClick={handleSubmit}
            className="flex items-center gap-2 rounded-lg bg-orbit-primary px-8 py-2.5 text-sm font-bold text-white transition hover:bg-orbit-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 rounded-lg bg-orbit-accent px-8 py-2.5 text-sm font-bold text-white transition hover:bg-orbit-accent/80"
          >
            {currentStep === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  )
}
