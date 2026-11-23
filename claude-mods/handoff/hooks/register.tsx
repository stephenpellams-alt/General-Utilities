import type { Register } from 'claude-code'

const PROMPT =
  'Write a handoff note for the next session: goal, what is done, what is in progress, decisions made, files touched, open problems, and the exact next steps. Markdown, concise.'

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'handoff', description: 'Write a handoff summary to HANDOFF.md' })
    return next(e)
  })

  on('command.run', { command: 'handoff' }, async ($, e) => {
    const r = await $.model.fork({ prompt: e.args ? `${PROMPT}\nFocus: ${e.args}` : PROMPT, effort: 'low' })
    if (!r.isAnswered) return { text: `handoff failed: ${r.reason}` }
    const path = `${await $.session.cwd()}/HANDOFF.md`
    await $.fs.write(path, r.text)
    return { text: `Handoff written to ${path}` }
  })
}
