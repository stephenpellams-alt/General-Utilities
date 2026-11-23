import type { Register } from 'claude-code'

type Level = 'low' | 'medium' | 'high'

export const pick = (text: string): Level => {
  const t = text.trim()
  if (/\b(architect|design|refactor|debug|security|race condition|root cause|migrate|plan)\b/i.test(t) || t.length > 1500) return 'high'
  if (t.length < 80) return 'low'
  return 'medium'
}

export const register: Register = on => {
  let level: Level = 'medium'

  on('prompt.submit', ($, e, next) => {
    if (!e.command && !e.isMeta) level = pick(e.text)
    return next(e)
  })

  on('turn.step', async function* ($, e, next) {
    // main loop only, and only on models that take effort
    if (e.agentId !== undefined || e.effort === undefined) return yield* next(e)
    // tool-result follow-ups rarely need more than medium
    const chosen: Level = e.index > 0 && level === 'high' ? 'medium' : level
    return yield* next({ ...e, effort: chosen })
  })
}
