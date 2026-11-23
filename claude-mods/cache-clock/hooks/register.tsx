import type { Register } from 'claude-code'

const TTL_MS = 3_600_000

const label = (left: number) => (left <= 0 ? 'cache: cold' : `cache: ${Math.ceil(left / 60000)}m`)

export const register: Register = on => {
  let lastAt: number | undefined
  let timer: { cancel: () => void } | undefined

  on('session.start', ($, e, next) => {
    timer?.cancel()
    timer = $.clock.every(30_000, async () => {
      if (lastAt === undefined) return
      $.ui.status(label(lastAt + TTL_MS - (await $.clock.now())))
    })
    return next(e)
  })

  on('turn.step', async function* ($, e, next) {
    if (e.agentId === undefined) {
      lastAt = await $.clock.now()
      $.ui.status(label(TTL_MS))
    }
    return yield* next(e)
  })

  on('session.end', (_$, e, next) => {
    timer?.cancel()
    return next(e)
  })
}
