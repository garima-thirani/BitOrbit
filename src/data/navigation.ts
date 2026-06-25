import { BarChart3, Bookmark, BookOpen, Home, Search, Settings } from 'lucide-react'

export const sidebarItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Learning Paths', href: '/paths', icon: BookOpen },
  { label: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
  { label: 'Search', href: '/search', icon: Search },
  { label: 'Progress', href: '/progress', icon: BarChart3 },
  { label: 'Settings', href: '/settings', icon: Settings },
]

export const quotes = [
  {
    text: 'The best systems feel inevitable after someone has done the hard thinking.',
    author: 'Engineering note',
  },
  {
    text: 'Learn the shape of the problem before polishing the solution.',
    author: 'bitOrbit',
  },
  {
    text: 'Reliable software is built by people who make feedback loops short.',
    author: 'Engineering principle',
  },
]
