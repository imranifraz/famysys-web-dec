import { useCallback, useRef } from 'react'

const DELTA_THRESHOLD = 24
const COOLDOWN_MS = 750

/**
 * Lets mouse-wheel / trackpad scroll trigger slide navigation, like the
 * keyboard and swipe handlers. Throttled so a single scroll gesture (which
 * fires many wheel events, especially on trackpads) only advances one slide.
 */
export function useWheelNav({ onNext, onPrev }) {
  const lastFired = useRef(0)

  const onWheel = useCallback(
    (e) => {
      const now = Date.now()
      if (now - lastFired.current < COOLDOWN_MS) return
      if (Math.abs(e.deltaY) < DELTA_THRESHOLD) return
      lastFired.current = now
      if (e.deltaY > 0) onNext()
      else onPrev()
    },
    [onNext, onPrev],
  )

  return { onWheel }
}
