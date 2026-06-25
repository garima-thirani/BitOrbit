import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { sidebarItems } from '@/data/navigation'
import { Logo } from '@/components/Logo'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 hidden border-r border-white/10 bg-orbit-surface/[0.82] px-3 py-4 backdrop-blur-xl transition-[width] duration-300 lg:block ${
        collapsed ? 'w-[5.4rem]' : 'w-72'
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-2 px-2">
          <Logo compact={collapsed} />
          <button
            type="button"
            onClick={onToggle}
            className="grid h-9 w-9 place-items-center rounded-lg text-orbit-muted transition hover:bg-white/[0.07] hover:text-orbit-text"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        <nav className="mt-8 space-y-1">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/'}
              className={({ isActive }) =>
                `flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-orbit-primary/[0.16] text-orbit-text shadow-glow'
                    : 'text-orbit-muted hover:bg-white/[0.07] hover:text-orbit-text'
                } ${collapsed ? 'justify-center' : ''}`
              }
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={19} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {!collapsed && (
          <div className="mt-auto rounded-lg border border-orbit-accent/[0.16] bg-orbit-card/70 p-4">
            <p className="text-sm font-semibold text-orbit-text">Offline by design</p>
            <p className="mt-2 text-xs leading-5 text-orbit-muted">
              Your engineering notes, progress, and bookmarks stay local to this workspace.
            </p>
          </div>
        )}
      </div>
    </aside>
  )
}
