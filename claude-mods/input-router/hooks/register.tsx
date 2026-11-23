import type { Register } from 'claude-code'

type Kind = 'browse' | 'research' | 'quick' | 'code'

const HINTS: Record<Kind, string> = {
  browse: 'Browser task: read pages as text first, avoid screenshots unless layout matters.',
  research: 'Research task: gather in parallel, cite sources, and finish with a short conclusion.',
  quick: 'Quick question: answer directly and briefly; do not explore the codebase unless needed.',
  code: 'Coding task: read the relevant files before editing, keep changes minimal, verify them.',
}

export const classify = (text: string): Kind => {
  const t = text.trim()
  if (/https?:\/\/|\b(browser|screenshot|webpage|website|click)\b/i.test(t)) return 'browse'
  if (/\b(research|compare|investigate|find out|look up|summari[sz]e)\b/i.test(t)) return 'research'
  if (t.length < 80 && /\?\s*$/.test(t)) return 'quick'
  return 'code'
}

export const register: Register = on => {
  on('prompt.submit', ($, e, next) => {
    if (e.command || e.isMeta) return next(e)
    const kind = classify(e.text)
    $.ui.status(`route: ${kind}`)
    return next({ ...e, context: [...(e.context ?? []), `[input-router] ${HINTS[kind]}`] })
  })
}
