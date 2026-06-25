import { Database, Moon, ShieldCheck } from 'lucide-react'
import { SectionHeader } from '@/components/SectionHeader'

const settings = [
  {
    icon: Moon,
    title: 'Dark mode only',
    description: 'The interface is tuned for the specified space palette and does not switch themes.',
  },
  {
    icon: Database,
    title: 'Local progress storage',
    description: 'Bookmarks, completions, and reading time are stored in browser local storage.',
  },
  {
    icon: ShieldCheck,
    title: 'Offline content model',
    description: 'Add private markdown chapters under src/content and keep the encyclopedia self-contained.',
  },
]

export function SettingsPage() {
  return (
    <div className="space-y-7">
      <SectionHeader
        eyebrow="Settings"
        title="Workspace preferences."
        description="bitOrbit keeps configuration intentionally quiet and local."
      />

      <section className="grid gap-4 lg:grid-cols-3">
        {settings.map((item) => (
          <article key={item.title} className="glass-panel rounded-lg p-5">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-orbit-primary/[0.12] text-orbit-primary">
              <item.icon size={21} />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-orbit-text">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-orbit-muted">{item.description}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
