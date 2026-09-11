import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useIsPresent } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Layer } from '../components/Layer.jsx'
import { SectionLabel } from '../components/SectionLabel.jsx'
import { SectionHeadline } from '../components/SectionHeadline.jsx'
import { PortfolioMedia } from '../components/PortfolioMedia.jsx'
import { VideoGallery } from '../components/VideoGallery.jsx'
import { WebsiteGallery } from '../components/WebsiteGallery.jsx'
import { PresentationEmbed } from '../components/PresentationEmbed.jsx'
import { GhostNumeral } from '../components/GhostNumeral.jsx'
import { useIsMobile } from '../components/ViewportContext.jsx'
import { DEPTH, EASE_LUX } from '../components/motion.js'
import { safeInsets } from '../components/layout.js'
import { portfolioCategories } from '../data/content.js'

// The category tab is a controlled prop (owned by PresentationShell, not
// local state) so its next/prev arrows can step through tabs before
// falling through to the adjacent slide without reaching into this
// component via a ref — see the comment in PresentationShell.jsx for why.
export default function SelectedWorkSlide({ meta, active, activeTab, onActiveTabChange }) {
  const isPresent = useIsPresent()
  const isMobile = useIsMobile()
  const SAFE = safeInsets(isMobile)
  const tab = activeTab
  const [subTab, setSubTab] = useState(0)
  const [activeProject, setActiveProject] = useState(0)
  const current = portfolioCategories[tab]
  const hasProjects = Array.isArray(current.projects)
  const hasPresentation = Boolean(current.embedUrl)
  const activeProjectData = hasProjects ? current.projects[activeProject] : null
  const hasSubcategories = Array.isArray(current.subcategories) && current.subcategories.length > 0
  const activeSub = hasSubcategories ? current.subcategories[subTab] : null
  const hasImageGallery = hasSubcategories && Array.isArray(activeSub?.images)
  const hasVideoGallery =
    (hasSubcategories && Array.isArray(activeSub?.videos)) ||
    (!hasSubcategories && Array.isArray(current.videos))
  const activeVideos = hasSubcategories ? activeSub?.videos : current.videos
  const printProjects = hasImageGallery
    ? activeSub.images.map((img, i) => ({
        key: img.key || `${activeSub.key}-${i}`,
        title: img.title || `${activeSub.label} ${i + 1}`,
        category: activeSub.label,
        summary: img.summary || current.copy,
        bullets: img.bullets || [],
        url: img.url || '#',
        image: img.image || img.src || null,
        ratio: img.ratio || activeSub.ratio || current.ratio,
      }))
    : []
  const galleryKey = hasSubcategories
    ? `${current.key}-${activeSub.key}`
    : current.key

  const galleryRatio =
    (hasImageGallery && (activeSub.ratio || current.ratio)) ||
    (hasVideoGallery && hasSubcategories && (activeSub.ratio || current.ratio)) ||
    current.ratio

  const galleryHeight = isMobile
    ? galleryRatio === 'portrait'
      ? 280
      : 180
    : hasSubcategories
      ? 484
      : 545
  const galleryWidth = isMobile
    ? Math.min(typeof window !== 'undefined' ? window.innerWidth - SAFE.side * 2 : 340, galleryRatio === 'portrait' ? 200 : 340)
    : galleryRatio === 'portrait'
      ? 680 * (galleryHeight / 485)
      : 1080 * (galleryHeight / 485)

  useEffect(() => {
    setSubTab(0)
    setActiveProject(0)
  }, [tab])

  useEffect(() => {
    setActiveProject(0)
  }, [subTab])

  function selectTab(i) {
    if (i === tab) return
    onActiveTabChange(i)
  }

  const detailsGalleryStyle = {
    ...styles.detailsGallery,
    maxWidth: isMobile ? 'none' : '420px',
    gap: isMobile ? '14px' : '36px',
    flexShrink: isMobile ? 1 : 0,
  }

  const galleryBody = hasPresentation ? (
    <div
      style={{
        ...styles.presentationStage,
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '12px' : '20px',
      }}
    >
      <div
        style={{
          ...styles.presentationFrame,
          minHeight: isMobile ? '200px' : 0,
          height: isMobile ? '220px' : '100%',
        }}
      >
        <PresentationEmbed
          src={current.embedUrl}
          href={current.url || current.embedUrl}
          title={current.title || current.label}
          active={active}
        />
      </div>

      {!isMobile && (
        <div style={{ ...styles.presentationMeta, width: '200px', gap: '14px' }}>
          <div>
            <span style={{ ...styles.detailsEyebrow, fontSize: '12px' }}>{current.category}</span>
            <h3 style={{ ...styles.detailsLabelSmall, fontSize: '26px', margin: '6px 0 0' }}>
              {current.title || current.label}
            </h3>
          </div>
        </div>
      )}
    </div>
  ) : hasProjects ? (
    <>
      <div style={{ ...styles.galleryArea, width: isMobile ? '100%' : galleryWidth, maxWidth: isMobile ? '100%' : galleryWidth, height: isMobile ? 'auto' : '100%' }}>
        <WebsiteGallery projects={current.projects} defaultRatio={current.ratio} cardHeight={galleryHeight} onActiveChange={setActiveProject} />
      </div>

      <div style={detailsGalleryStyle}>
        <div>
          <span style={{ ...styles.detailsEyebrow, fontSize: isMobile ? '11px' : '15px' }}>{activeProjectData.category}</span>
          <h3 style={{ ...styles.detailsLabelSmall, fontSize: isMobile ? '28px' : '54px', margin: isMobile ? '8px 0 0' : '14px 0 0' }}>
            {activeProjectData.title}
          </h3>
        </div>

        <p style={{ ...styles.detailsCopy, fontSize: isMobile ? '14px' : '23px', margin: isMobile ? '0' : '20px 0 0' }}>
          {activeProjectData.summary}
        </p>

        {!isMobile && (
          <ul style={styles.projectBullets}>
            {activeProjectData.bullets.map((b) => (
              <li key={b} style={styles.projectBullet}>
                {b}
              </li>
            ))}
          </ul>
        )}

        <a href={activeProjectData.url} target="_blank" rel="noopener noreferrer" style={{ ...styles.openDeckLink, fontSize: isMobile ? '13px' : '15px' }}>
          Open the full deck
          <ArrowUpRight size={15} strokeWidth={1.75} />
        </a>
      </div>
    </>
  ) : hasImageGallery ? (
    <>
      <div style={{ ...styles.galleryArea, width: isMobile ? '100%' : galleryWidth, maxWidth: isMobile ? '100%' : galleryWidth, height: isMobile ? 'auto' : '100%' }}>
        <WebsiteGallery projects={printProjects} defaultRatio={galleryRatio} cardHeight={galleryHeight} onActiveChange={setActiveProject} />
      </div>

      <div style={detailsGalleryStyle}>
        <div>
          <span style={{ ...styles.detailsEyebrow, fontSize: isMobile ? '11px' : '15px' }}>Category</span>
          <h3 style={{ ...styles.detailsLabelSmall, fontSize: isMobile ? '28px' : '54px', margin: isMobile ? '8px 0 0' : '14px 0 0' }}>
            {activeSub.label}
          </h3>
        </div>

        <div style={{ ...styles.processBlock, gap: isMobile ? '16px' : '34px' }}>
          <div>
            <span style={{ ...styles.processLabel, fontSize: isMobile ? '12px' : '16px' }}>Input</span>
            <p style={{ ...styles.detailsCopy, fontSize: isMobile ? '14px' : '23px', margin: isMobile ? '8px 0 0' : '20px 0 0' }}>
              {current.process.input}
            </p>
          </div>
          <div>
            <span style={{ ...styles.processLabel, fontSize: isMobile ? '12px' : '16px' }}>Output</span>
            <p style={{ ...styles.detailsCopy, fontSize: isMobile ? '14px' : '23px', margin: isMobile ? '8px 0 0' : '20px 0 0' }}>
              {current.process.output}
            </p>
          </div>
        </div>
      </div>
    </>
  ) : hasVideoGallery ? (
    <>
      <div style={{ ...styles.galleryArea, width: isMobile ? '100%' : galleryWidth, maxWidth: isMobile ? '100%' : galleryWidth, height: isMobile ? 'auto' : '100%' }}>
        <VideoGallery videos={activeVideos} defaultRatio={current.ratio} cardHeight={galleryHeight} />
      </div>

      <div style={detailsGalleryStyle}>
        <div>
          <span style={{ ...styles.detailsEyebrow, fontSize: isMobile ? '11px' : '15px' }}>Category</span>
          <h3 style={{ ...styles.detailsLabelSmall, fontSize: isMobile ? '28px' : '54px', margin: isMobile ? '8px 0 0' : '14px 0 0' }}>
            {current.label}
          </h3>
        </div>

        <div style={{ ...styles.processBlock, gap: isMobile ? '16px' : '34px' }}>
          <div>
            <span style={{ ...styles.processLabel, fontSize: isMobile ? '12px' : '16px' }}>Input</span>
            <p style={{ ...styles.detailsCopy, fontSize: isMobile ? '14px' : '23px', margin: isMobile ? '8px 0 0' : '20px 0 0' }}>
              {current.process.input}
            </p>
          </div>
          <div>
            <span style={{ ...styles.processLabel, fontSize: isMobile ? '12px' : '16px' }}>Output</span>
            <p style={{ ...styles.detailsCopy, fontSize: isMobile ? '14px' : '23px', margin: isMobile ? '8px 0 0' : '20px 0 0' }}>
              {current.process.output}
            </p>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div
        style={
          isMobile
            ? { ...styles.mediaCardLandscape, width: '100%', alignSelf: 'stretch' }
            : current.ratio === 'landscape'
              ? styles.mediaCardLandscape
              : styles.mediaCard
        }
      >
        <PortfolioMedia label={current.label} copy={current.copy} media={current.media} active={active} />
      </div>

      <div style={{ ...styles.details, maxWidth: isMobile ? 'none' : '380px' }}>
        <div>
          <span style={{ ...styles.detailsEyebrow, fontSize: isMobile ? '11px' : '15px' }}>Category</span>
          <h3 style={{ ...styles.detailsLabel, fontSize: isMobile ? '28px' : '56px', margin: isMobile ? '8px 0 0' : '18px 0 0' }}>
            {current.label}
          </h3>
          {current.copy && (
            <p style={{ ...styles.detailsCopy, fontSize: isMobile ? '14px' : '23px', margin: isMobile ? '10px 0 0' : '20px 0 0' }}>
              {current.copy}
            </p>
          )}
        </div>
      </div>
    </>
  )

  const contentRowStyle = {
    ...styles.contentRow,
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '18px' : hasPresentation ? '20px' : '64px',
    justifyContent: isMobile ? 'flex-start' : hasPresentation ? 'flex-start' : 'center',
    overflowY: isMobile ? 'auto' : 'visible',
  }

  return (
    <div style={{ ...styles.root, pointerEvents: isPresent ? 'auto' : 'none' }}>
      <Layer depth={DEPTH.background}>
        <GhostNumeral value={meta.index} compact />
      </Layer>

      <Layer
        depth={DEPTH.content}
        style={{
          ...styles.main,
          left: SAFE.side,
          right: SAFE.side,
          top: isMobile ? 64 : 140,
          bottom: isMobile ? SAFE.bottom : 112,
          gap: isMobile ? '14px' : '24px',
        }}
      >
        <div style={{ ...styles.top, gap: isMobile ? '12px' : '24px' }}>
          <SectionLabel index={meta.index} total={meta.total} title={meta.title} />
          <div style={{ ...styles.headlineRow, gap: isMobile ? '8px' : '28px' }}>
            <SectionHeadline className="display-lg" style={{ ...styles.headline, fontSize: isMobile ? '32px' : '64px' }}>
              Selected Work
            </SectionHeadline>
            {!isMobile && <p style={styles.supporting}>A glimpse of what we create for businesses.</p>}
          </div>
        </div>

        <div
          style={{
            ...styles.tabs,
            gap: isMobile ? '18px' : '28px',
            paddingBottom: isMobile ? '12px' : '18px',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
          role="tablist"
          aria-label="Portfolio categories"
        >
          {portfolioCategories.map((c, i) => (
            <button
              key={c.key}
              type="button"
              role="tab"
              aria-selected={i === tab}
              onClick={() => selectTab(i)}
              style={{
                ...styles.tabBtn,
                fontSize: isMobile ? '12px' : '15px',
                paddingBottom: isMobile ? '12px' : '18px',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                color: i === tab ? 'var(--color-cream)' : 'var(--color-cream-faint)',
              }}
            >
              {c.label}
              {i === tab && isPresent && (
                <motion.span layoutId="portfolio-tab-underline" style={styles.tabUnderline} transition={{ duration: 0.35, ease: EASE_LUX }} />
              )}
            </button>
          ))}
        </div>

        {hasSubcategories && (
          <div
            style={{ ...styles.subTabs, overflowX: isMobile ? 'auto' : 'visible', WebkitOverflowScrolling: 'touch' }}
            role="tablist"
            aria-label={`${current.label} sub-categories`}
          >
            {current.subcategories.map((s, i) => (
              <button
                key={s.key}
                role="tab"
                aria-selected={i === subTab}
                onClick={() => setSubTab(i)}
                style={{
                  ...styles.subTabBtn,
                  fontSize: isMobile ? '12px' : '16px',
                  padding: isMobile ? '6px 12px' : '7px 16px',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  color: i === subTab ? 'var(--color-accent-on-dark)' : 'var(--color-cream-faint)',
                  borderColor: i === subTab ? 'var(--color-accent-on-dark)' : 'var(--color-ink-line)',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        <div style={contentRowStyle}>
          {isPresent ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={galleryKey}
                initial={{ opacity: 0, scale: isMobile ? 1 : 1.015 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE_LUX }}
                style={contentRowStyle}
              >
                {galleryBody}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div style={contentRowStyle}>{galleryBody}</div>
          )}
        </div>
      </Layer>
    </div>
  )
}

const styles = {
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  main: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  top: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
  },
  headlineRow: {
    display: 'flex',
    alignItems: 'baseline',
    flexWrap: 'wrap',
  },
  headline: {
    margin: 0,
  },
  supporting: {
    fontFamily: 'var(--font-body)',
    fontSize: '20px',
    color: 'var(--color-cream-dim)',
    margin: 0,
  },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid var(--color-ink-line)',
    flexShrink: 0,
    position: 'relative',
    zIndex: 6,
    background: 'var(--color-bg)',
  },
  tabBtn: {
    position: 'relative',
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    transition: 'color 0.25s ease',
    background: 'transparent',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
  },
  tabUnderline: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '-1px',
    height: '2px',
    background: 'var(--color-accent-on-dark)',
  },
  subTabs: {
    display: 'flex',
    gap: '12px',
    flexShrink: 0,
  },
  subTabBtn: {
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    letterSpacing: '0.03em',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--color-ink-line)',
    transition: 'color 0.2s ease, border-color 0.2s ease',
  },
  contentRow: {
    flex: 1,
    display: 'flex',
    alignItems: 'stretch',
    minHeight: 0,
    position: 'relative',
    zIndex: 0,
    overflow: 'hidden',
  },
  galleryArea: {
    flexShrink: 0,
    minWidth: 0,
    position: 'relative',
    zIndex: 0,
    overflow: 'hidden',
  },
  presentationStage: {
    flex: 1,
    minHeight: 0,
    minWidth: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'stretch',
  },
  presentationFrame: {
    flex: '1 1 auto',
    minWidth: 0,
    minHeight: 0,
    height: '100%',
    width: '100%',
  },
  presentationMeta: {
    flexShrink: 0,
    display: 'flex',
    paddingTop: '4px',
  },
  mediaCard: {
    flexShrink: 0,
    height: '100%',
    aspectRatio: '9 / 16',
    overflow: 'hidden',
    border: '1px solid var(--color-ink-line)',
  },
  mediaCardLandscape: {
    flexShrink: 0,
    alignSelf: 'center',
    width: '860px',
    maxHeight: '100%',
    aspectRatio: '16 / 9',
    overflow: 'hidden',
    border: '1px solid var(--color-ink-line)',
  },
  details: {
    flex: 1,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 0,
    paddingBottom: '16px',
  },
  detailsGallery: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 0,
    paddingBottom: '16px',
  },
  detailsEyebrow: {
    fontFamily: 'var(--font-body)',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'var(--color-cream-faint)',
  },
  detailsLabel: {
    fontFamily: 'var(--font-display)',
    fontWeight: 400,
    color: 'var(--color-fg)',
    lineHeight: 1.08,
  },
  detailsLabelSmall: {
    fontFamily: 'var(--font-display)',
    fontWeight: 400,
    color: 'var(--color-fg)',
    lineHeight: 1.15,
  },
  detailsCopy: {
    fontFamily: 'var(--font-body)',
    lineHeight: 1.6,
    color: 'var(--color-cream-dim)',
  },
  processBlock: {
    display: 'flex',
    flexDirection: 'column',
  },
  processLabel: {
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: 'var(--color-accent-on-dark)',
  },
  projectBullets: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  projectBullet: {
    fontFamily: 'var(--font-body)',
    fontSize: '15.5px',
    lineHeight: 1.4,
    color: 'var(--color-cream-dim)',
  },
  openDeckLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    width: 'fit-content',
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    letterSpacing: '0.03em',
    color: 'var(--color-cream)',
    paddingBottom: '4px',
    borderBottom: '1px solid var(--color-ink-line)',
    transition: 'border-color 0.2s ease, color 0.2s ease',
  },
}
