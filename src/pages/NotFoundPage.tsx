import { Compass } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EmptyState } from '@/components/EmptyState'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-2xl pt-16">
      <EmptyState
        icon={Compass}
        title="This orbit does not exist"
        description="The route could not be found. Return home or choose a learning path from the sidebar."
      />
      <div className="mt-5 text-center">
        <Link
          to="/"
          className="inline-flex rounded-lg bg-orbit-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-orbit-secondary"
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
