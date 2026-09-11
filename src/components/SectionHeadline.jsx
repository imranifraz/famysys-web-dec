import { motion } from 'framer-motion'
import { sectionMaskVariants } from './motion.js'
import { useReducedMotionPref } from './MotionPrefContext.jsx'
import { useTransitionPreset } from './TransitionPresetContext.jsx'

/**
 * Wraps a slide's main headline in its own clip-path mask reveal —
 * the "typography-led section transition" from the brief, layered on top
 * of (not replacing) the shared push/parallax system every slide already
 * uses. Every slide here is its own major section, so every slide gets it.
 * The wipe direction (left/right/top/bottom/center) comes from the active
 * transition preset, so each slide boundary's reveal reads distinctly.
 */
export function SectionHeadline({ as = 'h2', className, style, children }) {
  const reduced = useReducedMotionPref()
  const { preset } = useTransitionPreset()
  const Tag = motion[as]
  return (
    <Tag className={className} style={style} variants={reduced ? undefined : sectionMaskVariants(preset.mask)}>
      {children}
    </Tag>
  )
}
