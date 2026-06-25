import { LearningPathCard } from '@/components/LearningPathCard'
import { SectionHeader } from '@/components/SectionHeader'
import { learningPaths } from '@/data/learningPaths'
import { useProgress } from '@/hooks/useProgress'
import { getPathProgress } from '@/utils/progress'

export function LearningPathsPage() {
  const { progress } = useProgress()

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Learning paths"
        title="Engineering domains, organized for offline study."
        description="Each path keeps modules, chapters, progress, and bookmarks in one quiet workspace."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {learningPaths.map((path) => (
          <LearningPathCard key={path.id} path={path} progress={getPathProgress(path, progress)} />
        ))}
      </div>
    </div>
  )
}
