import type { ChapterMeta, LearningPath, Module } from '@/types'

const dsaIndexHtml = import.meta.glob('/src/content/DSA/index.html', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const indexHtml = dsaIndexHtml['/src/content/DSA/index.html'] ?? ''

const decodeHtml = (value: string) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim()

const stripTags = (value: string) => decodeHtml(value.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

interface DsaCard {
  href: string
  badge: string
  title: string
  summary: string
}

interface DsaSection {
  title: string
  cards: DsaCard[]
}

interface DsaModuleMeta {
  title: string
  description: string
}

const normalizeSectionTitle = (value: string) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/[\p{Emoji_Presentation}\p{Emoji}\uFE0F]/gu, '')
    .replace(/[^\p{L}\p{N}&]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()

const moduleMetaBySectionTitle: Record<string, DsaModuleMeta> = {
  [normalizeSectionTitle('📐 Module 1 — Algorithm Analysis Foundations')]: {
    title: 'Algorithm Analysis',
    description: 'Think in complexity, reason about tradeoffs, and build the habits behind efficient solutions.',
  },
  [normalizeSectionTitle('⚡ Core Data Structures')]: {
    title: 'Core Data Structures',
    description: 'Master the essential structures that power most interview and production algorithms.',
  },
  [normalizeSectionTitle('🌳 Trees & Advanced Structures')]: {
    title: 'Trees & Advanced Structures',
    description: 'Traverse, recurse, and organize hierarchical data with confidence.',
  },
  [normalizeSectionTitle('🎯 Algorithm Paradigms')]: {
    title: 'Algorithm Paradigms',
    description: 'Recognize the right problem-solving pattern before you start coding.',
  },
  [normalizeSectionTitle('🏆 Interview Mastery')]: {
    title: 'Interview Mastery',
    description: 'Put the patterns together with a system for solving problems under pressure.',
  },
}

const cardPattern = /<a class="mod-card" href="([^"]+)">[\s\S]*?<div class="mod-badge">([\s\S]*?)<\/div>[\s\S]*?<div class="mod-title">([\s\S]*?)<\/div>[\s\S]*?<div class="mod-sub">([\s\S]*?)<\/div>[\s\S]*?<span class="mod-tag[^\"]*">[\s\S]*?<\/span>[\s\S]*?<\/a>/g

const parseDsaIndex = (html: string): DsaSection[] => {
  const sections: DsaSection[] = []
  const sectionMatches = [...html.matchAll(/<div class="cat-title">([\s\S]*?)<\/div>/g)]

  sectionMatches.forEach((sectionMatch, index) => {
    const title = stripTags(sectionMatch[1])
    const start = (sectionMatch.index ?? 0) + sectionMatch[0].length
    const end = sectionMatches[index + 1]?.index ?? html.length
    const grid = html.slice(start, end)
    const cards: DsaCard[] = []

    for (const cardMatch of grid.matchAll(cardPattern)) {
      cards.push({
        href: decodeHtml(cardMatch[1]),
        badge: stripTags(cardMatch[2]),
        title: stripTags(cardMatch[3]),
        summary: stripTags(cardMatch[4]),
      })
    }

    if (cards.length > 0) {
      sections.push({ title, cards })
    }
  })

  return sections
}

const sections = parseDsaIndex(indexHtml)

const buildChapter = (sectionSlug: string, sectionTitle: string, order: number, card: DsaCard): ChapterMeta => {
  const chapterSlug = slugify(card.href.replace(/\.html$/i, '').split('/').pop() ?? card.title)

  return {
    id: `dsa-${sectionSlug}-chapter-${order}`,
    pathId: 'dsa',
    moduleId: sectionSlug,
    order,
    title: card.title,
    slug: chapterSlug,
    summary: card.summary,
    markdownPath: '',
    contentType: 'html',
    contentUrl: `/DSA/${card.href}`,
  }
}

const buildModule = (section: DsaSection, order: number): Module => {
  const moduleSlug = slugify(section.title)
  const meta = moduleMetaBySectionTitle[normalizeSectionTitle(section.title)]
  const cleanTitle = meta?.title ?? section.title.replace(/^.*?—\s*/, '').replace(/^.*?-\s*/, '').trim()

  return {
    id: moduleSlug,
    pathId: 'dsa',
    order,
    title: cleanTitle || section.title,
    description: meta?.description ?? section.cards[0]?.summary ?? 'Interactive DSA learning block.',
    chapters: section.cards.map((card, chapterIndex) => buildChapter(moduleSlug, section.title, chapterIndex + 1, card)),
  }
}

export const dsaLearningPath: LearningPath = {
  id: 'dsa',
  title: 'DSA',
  description: 'Pattern-oriented problem solving with data structures and algorithmic tradeoffs.',
  icon: 'GitBranch',
  gradient: 'from-orbit-secondary to-orbit-primary',
  theme: 'secondary',
  difficulty: 'intermediate',
  estimatedHours: 64,
  modules: sections.map((section, index) => buildModule(section, index + 1)),
}