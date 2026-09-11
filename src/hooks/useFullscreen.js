import { useCallback, useEffect, useState } from 'react'

export function useFullscreen(targetRef) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    function onChange() {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const toggle = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      targetRef.current?.requestFullscreen?.().catch(() => {})
    }
  }, [targetRef])

  return { isFullscreen, toggle }
}
