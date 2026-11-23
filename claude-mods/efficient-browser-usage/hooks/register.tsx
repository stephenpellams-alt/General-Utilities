import type { Register } from 'claude-code'

const TEXT = `Browser efficiency: prefer reading pages as text over screenshots; take a screenshot only when layout or visuals matter. Reuse open tabs instead of opening new ones. Batch independent browser actions in one turn, avoid re-reading a page that has not changed, and stop as soon as you have the answer.`

export const register: Register = on => {
  on('prompt.compose', async ($, e, next) => {
    const r = await next(e)
    if (!e.tools.some(t => /browser|chrome|playwright/i.test(t))) return r
    return { sections: [...r.sections, { id: `${$.plugin.name}:guidance`, text: TEXT, scope: 'session' }] }
  })
}
