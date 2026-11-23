import type { Register } from 'claude-code'

const LIGHT = new Set(['Explore', 'web-fetch', 'claude-code-guide', 'statusline-setup'])

export const register: Register = on => {
  on('agent.spawn', ($, e, next) => {
    if (e.model !== undefined || e.subagentType === 'fork') return next(e)

    let model: string | undefined
    if (LIGHT.has(e.subagentType)) model = 'haiku'
    else if (e.subagentType === 'Plan' || e.prompt.length > 3000) model = undefined // inherit the parent's
    else model = 'sonnet'

    if (model === undefined) return next(e)
    $.ui.toast(`${e.subagentType}: ${model}`)
    return next({ ...e, model })
  })
}
