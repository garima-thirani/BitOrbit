import { Fragment, type ReactElement } from 'react'
import { motion } from 'framer-motion'
import { ClientServerIllustration } from '@/components/illustrations/ClientServerIllustration'
import { LoadBalancerIllustration } from '@/components/illustrations/LoadBalancerIllustration'
import { CachingIllustration } from '@/components/illustrations/CachingIllustration'
import { ShardingIllustration } from '@/components/illustrations/ShardingIllustration'
import { CAPIllustration } from '@/components/illustrations/CAPIllustration'

interface MarkdownRendererProps {
  content: string
}

const inline = (text: string) => {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g)

  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={index}>{part.slice(1, -1)}</code>
    }

    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }

    return <Fragment key={index}>{part}</Fragment>
  })
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const lines = content.split('\n')
  const elements: ReactElement[] = []
  let listItems: string[] = []
  let tableLines: string[] = []
  let quoteLines: string[] = []
  let codeLines: string[] = []
  let inCode = false
  let codeLanguage = ''

  const animationProps = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35 },
  }

  const flushList = () => {
    if (listItems.length) {
      elements.push(
        <motion.ul key={`ul-${elements.length}`} {...animationProps} className="space-y-2">
          {listItems.map((item) => (
            <li key={item}>{inline(item)}</li>
          ))}
        </motion.ul>,
      )
      listItems = []
    }
  }

  const flushQuote = () => {
    if (quoteLines.length) {
      elements.push(
        <motion.blockquote
          key={`quote-${elements.length}`}
          {...animationProps}
          className="rounded-2xl border border-orbit-accent/20 bg-orbit-accent/[0.06] p-5 text-orbit-text"
        >
          <p className="leading-7 text-orbit-muted">{inline(quoteLines.join(' '))}</p>
        </motion.blockquote>,
      )
      quoteLines = []
    }
  }

  const flushTable = () => {
    if (!tableLines.length) return

    const rows = tableLines
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) =>
        line
          .replace(/^\|/, '')
          .replace(/\|$/, '')
          .split('|')
          .map((cell) => cell.trim()),
      )
      .filter((row) => !row.every((cell) => /^:?-{3,}:?$/.test(cell)))

    if (rows.length) {
      const [header, ...body] = rows

      elements.push(
        <motion.div key={`table-${elements.length}`} {...animationProps} className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                {header.map((cell) => (
                  <th key={cell}>{inline(cell)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${rowIndex}-${cellIndex}`}>{inline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>,
      )
    }

    tableLines = []
  }

  const flushCode = () => {
    if (codeLines.length) {
      const codeContent = codeLines.join('\n').trim()

      if (codeLanguage === 'illustration') {
        if (codeContent === 'load-balancer') {
          elements.push(<LoadBalancerIllustration key={`ill-${elements.length}`} />)
        } else if (codeContent === 'caching') {
          elements.push(<CachingIllustration key={`ill-${elements.length}`} />)
        } else if (codeContent === 'sharding') {
          elements.push(<ShardingIllustration key={`ill-${elements.length}`} />)
        } else if (codeContent === 'cap') {
          elements.push(<CAPIllustration key={`ill-${elements.length}`} />)
        } else if (codeContent === 'client-server') {
          elements.push(<ClientServerIllustration key={`ill-${elements.length}`} />)
        }
      } else {
        elements.push(
          <motion.pre key={`pre-${elements.length}`} {...animationProps}>
            <code>{codeLines.join('\n')}</code>
          </motion.pre>,
        )
      }
      codeLines = []
      codeLanguage = ''
    }
  }

  lines.forEach((line) => {
    if (line.startsWith('```')) {
      if (inCode) {
        flushCode()
      } else {
        flushList()
        codeLanguage = line.slice(3).trim()
      }
      inCode = !inCode
      return
    }

    if (inCode) {
      codeLines.push(line)
      return
    }

    if (!line.trim()) {
      flushList()
      flushQuote()
      flushTable()
      return
    }

    if (line.trim().startsWith('>')) {
      flushList()
      flushTable()
      quoteLines.push(line.replace(/^>\s?/, '').trim())
      return
    }

    if (line.trim().startsWith('|')) {
      flushList()
      flushQuote()
      tableLines.push(line)
      return
    }

    flushQuote()
    flushTable()

    if (line.startsWith('- ') || line.startsWith('• ')) {
      listItems.push(line.slice(2))
      return
    }

    flushList()

    if (line.startsWith('# ')) {
      elements.push(
        <motion.h1 key={line} {...animationProps} className="scroll-mt-24">
          {inline(line.slice(2))}
        </motion.h1>,
      )
      return
    }

    if (line.startsWith('## ')) {
      elements.push(
        <motion.h2 key={line} {...animationProps} className="scroll-mt-24">
          {inline(line.slice(3))}
        </motion.h2>,
      )
      return
    }

    if (line.startsWith('### ')) {
      elements.push(
        <motion.h3 key={line} {...animationProps} className="scroll-mt-24">
          {inline(line.slice(4))}
        </motion.h3>,
      )
      return
    }

    elements.push(
      <motion.p key={`${line}-${elements.length}`} {...animationProps}>
        {inline(line)}
      </motion.p>,
    )
  })

  flushList()
  flushQuote()
  flushTable()
  flushCode()

  return <article className="markdown-body">{elements}</article>
}
