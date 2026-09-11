import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

const DESIGN_W = 1920
const DESIGN_H = 1080

/**
 * Live 1920×1080 deck preview. Cover-scales to fill the slot (no side
 * bars). Click opens the full deck page in a new tab.
 */
export function PresentationEmbed({ src, href, title, active = true }) {
  const frameRef = useRef(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const node = frameRef.current
    if (!node) return undefined

    function measure() {
      // Layout sizes in stage coords — ignore ancestor CSS transforms.
      const width = node.offsetWidth
      const height = node.offsetHeight
      if (width < 1 || height < 1) return
      // Cover: fill the whole slot; crop top/bottom or sides as needed.
      setScale(Math.max(width / DESIGN_W, height / DESIGN_H))
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(node)
    return () => ro.disconnect()
  }, [])

  function openDeck() {
    const target = href || src
    if (!target) return
    window.open(target, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      ref={frameRef}
      type="button"
      onClick={openDeck}
      aria-label={`Open ${title || 'presentation'} deck`}
      style={styles.frame}
    >
      {active && (
        <div
          style={{
            ...styles.stage,
            width: DESIGN_W,
            height: DESIGN_H,
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
          aria-hidden
        >
          <iframe
            style={styles.iframe}
            src={src}
            title={title}
            allow="fullscreen"
            loading="lazy"
            tabIndex={-1}
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}

      <span style={styles.hint}>
        Open full deck
        <ArrowUpRight size={14} strokeWidth={1.75} />
      </span>
    </button>
  )
}

const styles = {
  frame: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    border: '1px solid var(--color-ink-line)',
    background: '#0a1628',
    padding: 0,
    cursor: 'pointer',
    display: 'block',
  },
  stage: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transformOrigin: 'center center',
    pointerEvents: 'none',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
    display: 'block',
    pointerEvents: 'none',
    background: '#0a1628',
  },
  hint: {
    position: 'absolute',
    right: '16px',
    bottom: '16px',
    zIndex: 2,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'var(--font-body)',
    fontSize: '12px',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: 'var(--color-cream)',
    background: 'rgba(11, 22, 19, 0.72)',
    border: '1px solid var(--color-ink-line)',
    borderRadius: '999px',
    padding: '8px 12px',
    pointerEvents: 'none',
  },
}
