import { motion } from 'framer-motion'
import { EASE_LUX } from './motion.js'
import { useReducedMotionPref } from './MotionPrefContext.jsx'

// Orchestrates a staggered entrance for a group of items (cards, pillars,
// steps) — each child arrives slightly after the previous one instead of
// all at once, reinforcing reading order. Carries no visual properties of
// its own; it just times its children via variant propagation from the
// slide's existing push/parallax state (enter/center/exit).
const containerVariants = {
  enter: {},
  center: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
}

const itemVariants = {
  enter: { opacity: 0, y: 18 },
  center: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_LUX } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: EASE_LUX } },
}

const reducedItemVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

export function StaggerGroup({ as = 'div', className, style, children }) {
  const Tag = motion[as]
  return (
    <Tag className={className} style={style} variants={containerVariants}>
      {children}
    </Tag>
  )
}

export function StaggerItem({ as = 'div', className, style, children }) {
  const reduced = useReducedMotionPref()
  const Tag = motion[as]
  return (
    <Tag className={className} style={style} variants={reduced ? reducedItemVariants : itemVariants}>
      {children}
    </Tag>
  )
}
