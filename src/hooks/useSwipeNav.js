import { useRef } from 'react'

const SWIPE_THRESHOLD = 50

export function useSwipeNav({ onNext, onPrev }) {
  const touchStart = useRef(null)

  function onTouchStart(e) {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }

  function onTouchEnd(e) {
    if (!touchStart.current) return
    const dx = e.changedTouches[0].clientX - touchStart.current.x
    const dy = e.changedTouches[0].clientY - touchStart.current.y
    touchStart.current = null

    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return
    if (dx < 0) onNext()
    else onPrev()
  }

  return { onTouchStart, onTouchEnd }
}
