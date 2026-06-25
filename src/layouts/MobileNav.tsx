import { NavLink } from 'react-router-dom'
import { sidebarItems } from '@/data/navigation'
import { Logo } from '@/components/Logo'

export function MobileNav() {
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-white/10 bg-orbit-background/[0.82] px-4 py-3 backdrop-blur-xl lg:hidden">
        <Logo />
      </header>
      <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-6 rounded-lg border border-white/10 bg-orbit-surface/[0.92] p-1.5 shadow-2xl backdrop-blur-xl lg:hidden">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === '/'}
            className={({ isActive }) =>
              `grid h-11 place-items-center rounded-lg transition ${
                isActive ? 'bg-orbit-primary/[0.18] text-orbit-text' : 'text-orbit-muted'
              }`
            }
            aria-label={item.label}
          >
            <item.icon size={19} />
          </NavLink>
        ))}
      </nav>
    </>
  )
}
