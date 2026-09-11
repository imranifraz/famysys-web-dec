import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { EASE_LUX } from './motion.js'

const DEFAULT_CARD_HEIGHT = 545
const ANGLE = 30
const MAX_VISIBLE_OFFSET = 4
const EDGE_PADDING = 4
const WHEEL_COOLDOWN_MS = 550

function cardWidth(ratio, cardHeight) {
  return ratio === 'portrait' ? cardHeight * (9 / 16) : cardHeight * (16 / 9)
}

function driveFileId(src) {
  if (!src) return null
  const match = src.match(/\/file\/d\/([^/?#]+)/)
  return match?.[1] ?? null
}

/** Drive preview URL — the only embed mode that reliably plays shared videos. */
function drivePreviewSrc(src) {
  const id = driveFileId(src)
  if (!id) return src
  return `https://drive.google.com/file/d/${id}/preview`
}

/**
 * Coverflow video gallery. Google Drive files are shown via the /preview
 * iframe (native <video> + uc?export=download fails — Drive returns an HTML
 * interstitial, not a media stream). The active card starts interactive so
 * the Drive play control works; a light edge strip keeps wheel browse usable.
 */
export function VideoGallery({ videos, defaultRatio = 'landscape', cardHeight = DEFAULT_CARD_HEIGHT }) {
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const wheelLockRef = useRef(false)
  const stageRef = useRef(null)
  const STEP = cardHeight * (215 / 485)

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    setActive(0)
  }, [videos])

  function go(next) {
    setActive(Math.max(0, Math.min(videos.length - 1, next)))
  }

  function stepFromWheel(e) {
    if (Math.abs(e.deltaY) < 8 && Math.abs(e.deltaX) < 8) return false

    e.preventDefault()
    e.stopPropagation()

    if (wheelLockRef.current) return true
    wheelLockRef.current = true
    window.setTimeout(() => {
      wheelLockRef.current = false
    }, WHEEL_COOLDOWN_MS)

    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
    go(activeRef.current + (delta > 0 ? 1 : -1))
    return true
  }

  useEffect(() => {
    const node = stageRef.current
    if (!node) return undefined

    function onWheel(e) {
      stepFromWheel(e)
    }

    node.addEventListener('wheel', onWheel, { passive: false })
    return () => node.removeEventListener('wheel', onWheel)
  }, [videos.length])

  function onCardClick(i) {
    if (i !== active) go(i)
  }

  const activeWidth = cardWidth(videos[active].ratio || defaultRatio, cardHeight)
  const leftAnchor = EDGE_PADDING + activeWidth / 2

  return (
    <div style={styles.root}>
      <div ref={stageRef} style={{ ...styles.stage, height: `${cardHeight}px` }}>
        {videos.map((video, i) => {
          const offset = i - active
          const absOffset = Math.abs(offset)
          if (absOffset > MAX_VISIBLE_OFFSET) return null

          const ratio = video.ratio || defaultRatio
          const width = cardWidth(ratio, cardHeight)
          const isActive = offset === 0

          return (
            <motion.div
              key={video.title}
              role="group"
              aria-label={video.title}
              aria-current={isActive}
              onClick={() => onCardClick(i)}
              style={{
                ...styles.card,
                width,
                height: cardHeight,
                left: leftAnchor,
                marginLeft: -width / 2,
                zIndex: 100 - absOffset,
                cursor: isActive ? 'default' : 'pointer',
              }}
              animate={{
                x: offset * STEP,
                rotateY: offset * -ANGLE,
                z: isActive ? 40 : -absOffset * 130,
                scale: Math.max(0.62, 1 - absOffset * 0.13),
                opacity: Math.max(0.18, 1 - absOffset * 0.24),
              }}
              transition={{ duration: 0.55, ease: EASE_LUX }}
            >
              {isActive ? (
                <>
                  <iframe
                    key={drivePreviewSrc(video.src)}
                    style={styles.frame}
                    src={drivePreviewSrc(video.src)}
                    title={video.title}
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    frameBorder="0"
                  />
                  {/* Narrow side hit-areas so wheel / click-to-browse still
                      work without covering Drive’s center play control. */}
                  <div style={styles.edgeLeft} aria-hidden />
                  <div style={styles.edgeRight} aria-hidden />
                </>
              ) : (
                <div style={styles.placeholder}>
                  <span style={styles.playBadge}>
                    <Play size={12} fill="currentColor" strokeWidth={0} />
                  </span>
                </div>
              )}
              <div style={styles.reflection} />
            </motion.div>
          )
        })}
      </div>

      <div
        style={{
          ...styles.controls,
          width: activeWidth,
          marginLeft: EDGE_PADDING,
        }}
      >
        <button type="button" onClick={() => go(active - 1)} disabled={active === 0} style={{ ...styles.arrowBtn, opacity: active === 0 ? 0.3 : 1 }} aria-label="Previous video">
          <ChevronLeft size={16} strokeWidth={1.5} />
        </button>

        <div style={styles.dots}>
          {videos.map((v, i) => (
            <button key={v.title} type="button" onClick={() => go(i)} aria-label={`Go to ${v.title}`} style={styles.dotBtn}>
              <span style={{ ...styles.dot, background: i === active ? 'var(--color-accent-on-dark)' : 'var(--color-ink-line)' }} />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(active + 1)}
          disabled={active === videos.length - 1}
          style={{ ...styles.arrowBtn, opacity: active === videos.length - 1 ? 0.3 : 1 }}
          aria-label="Next video"
        >
          <ChevronRight size={16} strokeWidth={1.5} />
        </button>

        <AnimatePresence mode="wait">
          <motion.span
            key={videos[active].title}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={styles.caption}
          >
            {videos[active].title}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '100%',
    justifyContent: 'flex-start',
    gap: '22px',
  },
  stage: {
    position: 'relative',
    width: '100%',
    perspective: '1600px',
    flexShrink: 0,
  },
  card: {
    position: 'absolute',
    top: 0,
    overflow: 'hidden',
    border: '1px solid var(--color-ink-line)',
    background: 'var(--color-ink-raised)',
    transformStyle: 'preserve-3d',
  },
  frame: {
    width: '100%',
    height: '100%',
    border: 'none',
    display: 'block',
  },
  edgeLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '12%',
    zIndex: 3,
  },
  edgeRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '12%',
    zIndex: 3,
  },
  placeholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBadge: {
    width: '34px',
    height: '34px',
    borderRadius: '999px',
    background: 'var(--color-cream)',
    color: 'var(--color-ink)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reflection: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    background: 'linear-gradient(180deg, transparent 65%, rgba(11,22,19,0.5) 100%)',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
  },
  arrowBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '999px',
    border: '1px solid var(--color-ink-line)',
    color: 'var(--color-cream)',
    flexShrink: 0,
  },
  dots: {
    display: 'flex',
    gap: '7px',
    flexShrink: 0,
  },
  dotBtn: {
    padding: '6px 2px',
  },
  dot: {
    display: 'block',
    width: '7px',
    height: '7px',
    borderRadius: '999px',
  },
  caption: {
    fontFamily: 'var(--font-body)',
    fontSize: '15px',
    color: 'var(--color-cream-dim)',
    marginLeft: '8px',
    paddingLeft: '16px',
    borderLeft: '1px solid var(--color-ink-line)',
    maxWidth: '160px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}
