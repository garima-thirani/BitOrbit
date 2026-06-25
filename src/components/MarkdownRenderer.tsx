import { Fragment, type ReactElement } from 'react'

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
  let codeLines: string[] = []
  let inCode = false

  const flushList = () => {
    if (listItems.length) {
      elements.push(
        <ul key={`ul-${elements.length}`}>
          {listItems.map((item) => (
            <li key={item}>{inline(item)}</li>
          ))}
        </ul>,
      )
      listItems = []
    }
  }

  const flushCode = () => {
    if (codeLines.length) {
      elements.push(
        <pre key={`pre-${elements.length}`}>
          <code>{codeLines.join('\n')}</code>
        </pre>,
      )
      codeLines = []
    }
  }

  lines.forEach((line) => {
    if (line.startsWith('```')) {
      if (inCode) {
        flushCode()
      } else {
        flushList()
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
      return
    }

    if (line.startsWith('- ')) {
      listItems.push(line.slice(2))
      return
    }

    flushList()

    if (line.startsWith('# ')) {
      elements.push(<h1 key={line}>{inline(line.slice(2))}</h1>)
      return
    }

    if (line.startsWith('## ')) {
      elements.push(<h2 key={line}>{inline(line.slice(3))}</h2>)
      return
    }

    if (line.startsWith('### ')) {
      elements.push(<h3 key={line}>{inline(line.slice(4))}</h3>)
      return
    }

    elements.push(<p key={`${line}-${elements.length}`}>{inline(line)}</p>)
  })

  flushList()
  flushCode()

  return <article className="markdown-body">{elements}</article>
}
