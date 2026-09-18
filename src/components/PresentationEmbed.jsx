import { useMemo } from 'react'
import { ArrowUpRight } from 'lucide-react'

/**
 * Resolve an embeddable URL for the corporate deck.
 * famysys.com sends X-Frame-Options: SAMEORIGIN, so:
 * - on famysys.com → relative /corporate/ (allowed)
 * - in Vite dev → /corporate-embed/ proxy that strips the frame header
 * - elsewhere → direct URL (blocked unless server headers are relaxed)
 */
function resolveEmbedSrc(src) {
  if (!src) return src
  if (import.meta.env.DEV) return '/corporate-embed/'
  if (typeof window !== 'undefined' && /(^|\.)famysys\.com$/i.test(window.location.hostname)) {
    return '/corporate/'
  }
  return src
}

/**
 * Live deck preview in a 16:9 iframe that fills the slot.
 * The deck lays out to the iframe viewport (no cover-crop scale), so slides
 * stay fully visible and centered. Corner control opens the full page.
 */
export function PresentationEmbed({ src, href, title, active = true }) {
  const embedSrc = useMemo(() => resolveEmbedSrc(src), [src])
  const openUrl = href || src

  function openDeck(e) {
    e.preventDefault()
    e.stopPropagation()
    if (!openUrl) return
    window.open(openUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      data-media-player="true"
      style={styles.frame}
      aria-label={`${title || 'Presentation'} deck preview`}
    >
      {active && (
        <iframe
          style={styles.iframe}
          src={embedSrc}
          title={title || 'Presentation deck'}
          allow="fullscreen; autoplay"
          allowFullScreen
          loading="eager"
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}

      <a href={openUrl} target="_blank" rel="noopener noreferrer" onClick={openDeck} style={styles.hint}>
        Open full deck
        <ArrowUpRight size={14} strokeWidth={1.75} />
      </a>
    </div>
  )
}

const styles = {
  frame: {
    position: 'relative',
    width: '100%',
    height: '100%',
    minHeight: '220px',
    overflow: 'hidden',
    border: '1px solid var(--color-ink-line)',
    background: '#0a1628',
  },
  iframe: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    border: 'none',
    display: 'block',
    background: '#0a1628',
  },
  hint: {
    position: 'absolute',
    right: '12px',
    bottom: '12px',
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
    textDecoration: 'none',
  },
}
