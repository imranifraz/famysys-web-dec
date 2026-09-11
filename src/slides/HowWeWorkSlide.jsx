import { Layer } from '../components/Layer.jsx'
import { SectionLabel } from '../components/SectionLabel.jsx'
import { SectionHeadline } from '../components/SectionHeadline.jsx'
import { ProcessStep } from '../components/ProcessStep.jsx'
import { StaggerGroup, StaggerItem } from '../components/Stagger.jsx'
import { GhostNumeral } from '../components/GhostNumeral.jsx'
import { DEPTH } from '../components/motion.js'
import { SAFE } from '../components/layout.js'
import { processSteps } from '../data/content.js'

export default function HowWeWorkSlide({ meta }) {
  return (
    <div style={styles.root}>
      <Layer depth={DEPTH.background}>
        <GhostNumeral value={meta.index} />
      </Layer>

      <Layer depth={DEPTH.content} style={styles.main}>
        <div style={styles.top}>
          <SectionLabel index={meta.index} total={meta.total} title={meta.title} />
          <SectionHeadline className="display-lg" style={styles.headline}>
            From your idea to finished content.
          </SectionHeadline>
        </div>

        <StaggerGroup style={styles.steps}>
          {processSteps.map((step, i) => (
            <StaggerItem key={step.index} style={styles.stepItem}>
              <ProcessStep
                index={step.index}
                title={step.title}
                copy={step.copy}
                isLast={i === processSteps.length - 1}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Layer>

      <Layer depth={DEPTH.decorative} style={styles.closing}>
        <p style={styles.closingText}>You bring the idea. We bring it to life.</p>
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
    left: SAFE.side,
    right: SAFE.side,
    top: 152,
    display: 'flex',
    flexDirection: 'column',
    gap: '44px',
  },
  top: {
    display: 'flex',
    flexDirection: 'column',
    gap: '22px',
  },
  headline: {
    fontSize: '68px',
    maxWidth: '1100px',
  },
  steps: {
    display: 'flex',
    gap: '40px',
  },
  stepItem: {
    flex: 1,
  },
  closing: {
    position: 'absolute',
    left: SAFE.side,
    right: SAFE.side,
    bottom: 130,
  },
  closingText: {
    fontFamily: 'var(--font-accent)',
    fontStyle: 'italic',
    fontSize: '32px',
    color: 'var(--color-cream)',
    margin: 0,
  },
}
