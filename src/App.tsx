import { RouterProvider } from 'react-router-dom'
import { ProgressProvider } from '@/hooks/useProgress'
import { router } from '@/router'

export function App() {
  return (
    <ProgressProvider>
      <RouterProvider router={router} />
    </ProgressProvider>
  )
}
