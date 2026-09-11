export function ProcessStep({ index, title, copy, isLast }) {
  return (
    <div style={styles.step}>
      <div style={styles.top}>
        <span style={styles.index}>{index}</span>
        {!isLast && <span style={styles.connector} aria-hidden="true" />}
      </div>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.copy}>{copy}</p>
    </div>
  )
}

const styles = {
  step: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    flex: 1,
    position: 'relative',
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  index: {
    fontFamily: 'var(--font-display)',
    fontSize: '42px',
    color: 'var(--color-cream-faint)',
    flexShrink: 0,
  },
  connector: {
    flex: 1,
    height: '1px',
    background: 'var(--color-ink-line)',
    marginLeft: '16px',
  },
  title: {
    fontFamily: 'var(--font-body)',
    fontSize: '24px',
    fontWeight: 600,
    letterSpacing: '0.01em',
    color: 'var(--color-fg)',
    margin: 0,
  },
  copy: {
    fontFamily: 'var(--font-body)',
    fontSize: '16.5px',
    lineHeight: 1.55,
    color: 'var(--color-cream-faint)',
    margin: 0,
    maxWidth: '300px',
  },
}
