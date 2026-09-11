import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { EASE_LUX } from './motion.js'

const DEFAULT_CARD_HEIGHT = 545
const ANGLE = 30
const MAX_VISIBLE_OFFSET = 4
// Breathing room between the gallery's left edge and the active card's
// left edge — kept small and constant so the section reads as flush-left,
// matching the details panel's own left-aligned text beside it.
const EDGE_PADDING = 4
// Cooldown between wheel steps so one trackpad flick doesn't skip several
// projects, and so the coverflow transition can settle.
const WHEEL_COOLDOWN_MS = 550

function cardWidth(ratio, cardHeight) {
  return ratio === 'portrait' ? cardHeight * (9 / 16) : cardHeight * (16 / 9)
}

/**
 * The same 3D "coverflow" carousel pattern as VideoGallery, adapted for
 * static project screenshots instead of embedded video — no iframe/player,
 * just an image (or a plain placeholder until real thumbnails are
 * supplied). The active project index is reported up via `onActiveChange`
 * so the caller can drive its own details panel (title, summary, bullets,
 * link) per project, rather than the single shared category-level copy
 * used elsewhere.
 *
 * Navigation stays quiet on hover. Wheel / trackpad scroll over the stage
 * steps projects; arrow and dot controls still work as before. Clicking a
 * side card also focuses it.
 */
export function WebsiteGallery({ projects, defaultRatio = 'landscape', cardHeight = DEFAULT_CARD_HEIGHT, onActiveChange }) {
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const wheelLockRef = useRef(false)
  const STEP = cardHeight * (215 / 485)

  useEffect(() => {
    activeRef.current = active
    onActiveChange?.(active)
  }, [active, onActiveChange])

  function go(next) {
    setActive(Math.max(0, Math.min(projects.length - 1, next)))
  }

  function onCardClick(i, project) {
    if (i !== active) {
      go(i)
      return
    }
    const href = project.liveUrl || project.previewUrl || project.url
    if (!href || href === '#') return
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  function onStageWheel(e) {
    // Only react to a clear vertical scroll gesture; ignore tiny jitter.
    if (Math.abs(e.deltaY) < 8 && Math.abs(e.deltaX) < 8) return

    // Keep this scroll inside the gallery so the deck doesn't also advance.
    e.preventDefault()
    e.stopPropagation()

    if (wheelLockRef.current) return
    wheelLockRef.current = true
    window.setTimeout(() => {
      wheelLockRef.current = false
    }, WHEEL_COOLDOWN_MS)

    const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX
    go(activeRef.current + (delta > 0 ? 1 : -1))
  }

  const activeWidth = cardWidth(projects[active].ratio || defaultRatio, cardHeight)
  const leftAnchor = EDGE_PADDING + activeWidth / 2

  return (
    <div style={styles.root}>
      <div
        style={{ ...styles.stage, height: `${cardHeight}px` }}
        onWheel={onStageWheel}
      >
        {projects.map((project, i) => {
          const offset = i - active
          const absOffset = Math.abs(offset)
          if (absOffset > MAX_VISIBLE_OFFSET) return null

          const ratio = project.ratio || defaultRatio
          const width = cardWidth(ratio, cardHeight)
          const isActive = offset === 0
          const previewScale = width / 1280

          return (
            <motion.button
              key={project.key}
              type="button"
              onClick={() => onCardClick(i, project)}
              aria-label={project.title}
              aria-current={isActive}
              style={{
                ...styles.card,
                width,
                height: cardHeight,
                left: leftAnchor,
                marginLeft: -width / 2,
                zIndex: 100 - absOffset,
                cursor: isActive && (project.liveUrl || project.previewUrl || project.url) ? 'pointer' : isActive ? 'default' : 'pointer',
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
              {project.previewUrl ? (
                <div style={styles.previewFrame} aria-hidden={!isActive}>
                  {/* Only mount the live site on the active card so we don't
                      spin up a fleet of remote documents in the coverflow. */}
                  {isActive && (
                    <iframe
                      src={project.previewUrl}
                      title={`${project.title} live preview`}
                      style={{
                        ...styles.previewIframe,
                        transform: `scale(${previewScale})`,
                      }}
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                      referrerPolicy="no-referrer"
                      tabIndex={-1}
                    />
                  )}
                  {!isActive && (
                    <div style={styles.previewIdle}>
                      <span style={styles.placeholderText}>{project.title}</span>
                    </div>
                  )}
                </div>
              ) : project.image ? (
                <img src={project.image} alt={project.title} style={styles.image} loading="lazy" />
              ) : (
                <div style={styles.placeholder}>
                  <span style={styles.placeholderText}>Image to be added</span>
                </div>
              )}
              <div style={styles.reflection} />
            </motion.button>
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
        <button type="button" onClick={() => go(active - 1)} disabled={active === 0} style={{ ...styles.arrowBtn, opacity: active === 0 ? 0.3 : 1 }} aria-label="Previous project">
          <ChevronLeft size={16} strokeWidth={1.5} />
        </button>

        <div style={styles.dots}>
          {projects.map((p, i) => (
            <button key={p.key} onClick={() => go(i)} aria-label={`Go to ${p.title}`} style={styles.dotBtn}>
              <span style={{ ...styles.dot, background: i === active ? 'var(--color-accent-on-dark)' : 'var(--color-ink-line)' }} />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(active + 1)}
          disabled={active === projects.length - 1}
          style={{ ...styles.arrowBtn, opacity: active === projects.length - 1 ? 0.3 : 1 }}
          aria-label="Next project"
        >
          <ChevronRight size={16} strokeWidth={1.5} />
        </button>

        <AnimatePresence mode="wait">
          <motion.span
            key={projects[active].key}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={styles.caption}
          >
            {projects[active].title}
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
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    objectPosition: 'center',
    display: 'block',
    background: 'var(--color-ink-raised)',
  },
  // Live site preview: render a desktop-width page scaled down to fit the
  // card so the homepage reads as a miniature screenshot rather than a
  // cramped mobile viewport.
  previewFrame: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    background: 'var(--color-ink-raised)',
    pointerEvents: 'none',
  },
  previewIframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '1280px',
    height: '900px',
    border: 'none',
    transformOrigin: 'top left',
    background: '#fff',
  },
  previewIdle: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--color-cream-ghost)',
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
