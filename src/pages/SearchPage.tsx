import { useState } from 'react'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EmptyState } from '@/components/EmptyState'
import { SectionHeader } from '@/components/SectionHeader'
import { useSearch } from '@/hooks/useSearch'
import { searchRouteFor } from '@/utils/routes'

export function SearchPage() {
  const [query, setQuery] = useState('')
  const results = useSearch(query)

  return (
    <div className="space-y-7">
      <SectionHeader
        eyebrow="Offline search"
        title="Find the right engineering note fast."
        description="Search runs locally across paths, modules, chapters, and topic metadata with Fuse.js."
      />

      <label className="glass-panel flex items-center gap-3 rounded-lg px-4 py-3">
        <Search size={20} className="text-orbit-accent" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full border-0 bg-transparent text-base text-orbit-text outline-none placeholder:text-orbit-muted"
          placeholder="Search Python, caching, graphs, evaluation..."
          autoFocus
        />
      </label>

      {!query && (
        <EmptyState
          icon={Search}
          title="Start typing to search locally"
          description="The index is built from the local bitOrbit metadata and updates as the framework grows."
        />
      )}

      {query && results.length === 0 && (
        <EmptyState
          icon={Search}
          title="No matches found"
          description="Try a broader engineering term or add markdown notes under src/content."
        />
      )}

      <div className="grid gap-3">
        {results.map((result) => (
          <Link
            key={`${result.type}-${result.id}`}
            to={searchRouteFor(result)}
            className="glass-panel rounded-lg p-4 transition hover:border-orbit-accent/[0.45]"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-orbit-primary/[0.12] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orbit-accent">
                {result.type}
              </span>
              <h2 className="text-lg font-semibold text-orbit-text">{result.title}</h2>
            </div>
            <p className="mt-2 text-sm leading-6 text-orbit-muted">{result.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
