import { useRef } from 'react'
import { isMediaExpanded } from './mediaExpandLock.js'

const SWIPE_THRESHOLD = 50

function touchBlocked(target) {
  if (!target || typeof target.closest !== 'function') return false
  return Boolean(
    target.closest('[data-media-player="true"]') ||
      target.closest('video') ||
      target.closest('iframe') ||
      target.closest('a') ||
      target.closest('button'),
  )
}

export function useSwipeNav({ onNext, onPrev }) {
  const touchStart = useRef(null)

  function onTouchStart(e) {
    if (isMediaExpanded()) return
    if (touchBlocked(e.target)) {
      touchStart.current = null
      return
    }
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }

  function onTouchEnd(e) {
    if (isMediaExpanded()) return
    if (!touchStart.current) return
    if (touchBlocked(e.target)) {
      touchStart.current = null
      return
    }
    const dx = e.changedTouches[0].clientX - touchStart.current.x
    const dy = e.changedTouches[0].clientY - touchStart.current.y
    touchStart.current = null

    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return
    if (dx < 0) onNext()
    else onPrev()
  }

  return { onTouchStart, onTouchEnd }
}
