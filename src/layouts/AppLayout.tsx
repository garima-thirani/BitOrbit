import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { SpaceBackground } from '@/components/space/SpaceBackground'
import { MobileNav } from '@/layouts/MobileNav'
import { Sidebar } from '@/layouts/Sidebar'

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen text-orbit-text">
      <SpaceBackground />
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />
      <MobileNav />
      <main
        className={`min-h-screen px-4 pb-28 pt-6 transition-[padding] duration-300 md:px-8 lg:pb-12 lg:pt-8 ${
          collapsed ? 'lg:pl-[7.4rem]' : 'lg:pl-[19.5rem]'
        }`}
      >
        <div className="mx-auto w-full max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
