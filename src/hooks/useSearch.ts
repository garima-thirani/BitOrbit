import Fuse from 'fuse.js'
import { useMemo } from 'react'
import { createSearchDocuments } from '@/utils/content'

export const useSearch = (query: string) => {
  const documents = useMemo(() => createSearchDocuments(), [])

  const fuse = useMemo(
    () =>
      new Fuse(documents, {
        keys: ['title', 'description', 'type'],
        threshold: 0.34,
        ignoreLocation: true,
      }),
    [documents],
  )

  return useMemo(() => {
    if (!query.trim()) return []
    return fuse.search(query).map((result) => result.item)
  }, [fuse, query])
}
