import { useEffect } from 'react'
import { isMediaExpanded } from './mediaExpandLock.js'

export function useKeyboardNav({ onNext, onPrev, onFirst, onLast }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (isMediaExpanded()) return
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault()
          onNext()
          break
        case 'ArrowLeft':
          e.preventDefault()
          onPrev()
          break
        case ' ':
          e.preventDefault()
          if (e.shiftKey) onPrev()
          else onNext()
          break
        case 'Home':
          e.preventDefault()
          onFirst()
          break
        case 'End':
          e.preventDefault()
          onLast()
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onNext, onPrev, onFirst, onLast])
}
