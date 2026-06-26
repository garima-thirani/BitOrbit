import { motion } from 'framer-motion'
import { BookOpen, Brain, GitFork, HelpCircle, Layout, Library, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeader } from '@/components/SectionHeader'

const tools = [
  {
    id: 'flashcards',
    title: 'Flashcards',
    description: 'Active recall for engineering concepts. 3D flip cards to test your memory.',
    icon: Library,
    color: 'text-orbit-accent',
    bg: 'bg-orbit-accent/10',
    border: 'border-orbit-accent/20',
  },
  {
    id: 'mindmap',
    title: 'Mind Maps',
    description: 'Visualize the shape of complex topics with interactive concept nodes.',
    icon: GitFork,
    color: 'text-orbit-primary',
    bg: 'bg-orbit-primary/10',
    border: 'border-orbit-primary/20',
  },
  {
    id: 'quiz',
    title: 'Interactive Quizzes',
    description: 'Verify your understanding with technical questions and detailed explanations.',
    icon: HelpCircle,
    color: 'text-orbit-success',
    bg: 'bg-orbit-success/10',
    border: 'border-orbit-success/20',
  },
  {
    id: 'revision',
    title: 'Quick Revision',
    description: 'Digital snapshots of key takeaways and implementation patterns.',
    icon: Layout,
    color: 'text-orbit-warning',
    bg: 'bg-orbit-warning/10',
    border: 'border-orbit-warning/20',
  },
]

export function ToolsPage() {
  return (
    <div className="space-y-10">
      <SectionHeader
        eyebrow="Interactive Library"
        title="Study Tools"
        description="A collection of specialized tools designed to help you internalize complex technical topics."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`group glass-panel relative overflow-hidden rounded-2xl p-8 transition-all hover:border-white/20`}
          >
            <div className={`absolute inset-0 bits-grid opacity-10 group-hover:opacity-20 transition-opacity`} />

            <div className="relative z-10">
              <div className={`mb-6 inline-grid h-14 w-14 place-items-center rounded-xl border ${tool.border} ${tool.bg} ${tool.color} shadow-lg`}>
                <tool.icon size={28} />
              </div>

              <h3 className="text-2xl font-semibold text-orbit-text group-hover:text-orbit-accent transition-colors">
                {tool.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-orbit-muted">
                {tool.description}
              </p>

              <div className="mt-8 flex items-center gap-4">
                <Link
                  to="/paths"
                  className="inline-flex items-center gap-2 text-sm font-bold text-orbit-accent hover:underline"
                >
                  <BookOpen size={16} />
                  Find a chapter to start
                </Link>
                <div className="h-1 w-1 rounded-full bg-white/20" />
                <span className="text-xs font-medium text-orbit-muted">
                  Integrated into every chapter
                </span>
              </div>
            </div>

            <div className="absolute -right-4 -top-4 opacity-5 transition-transform group-hover:scale-110 group-hover:opacity-10">
              <tool.icon size={160} />
            </div>
          </motion.div>
        ))}
      </div>

      <section className="glass-panel relative overflow-hidden rounded-2xl p-8 md:p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-orbit-primary/10 to-transparent" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-6 rounded-full bg-orbit-accent/20 p-4 text-orbit-accent">
            <Sparkles size={32} />
          </div>
          <h2 className="text-3xl font-bold text-orbit-text">How it works</h2>
          <p className="mt-4 max-w-2xl text-lg text-orbit-muted">
            Each study tool is dynamically generated based on your personal notes. When you create markdown
            files in your workspace, bitOrbit parses them to create interactive learning experiences.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              { label: 'Step 1', text: 'Write your technical notes in Markdown.' },
              { label: 'Step 2', text: 'bitOrbit synchronizes your local files.' },
              { label: 'Step 3', text: 'Interactive tools appear on the chapter page.' },
            ].map((step, i) => (
              <div key={i} className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-widest text-orbit-accent">{step.label}</div>
                <p className="text-sm text-orbit-muted">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
