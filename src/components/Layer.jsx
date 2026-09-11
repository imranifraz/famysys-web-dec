import { motion } from 'framer-motion'
import { layerVariants, reducedLayerVariants } from './motion.js'
import { useReducedMotionPref } from './MotionPrefContext.jsx'
import { useTransitionPreset } from './TransitionPresetContext.jsx'

/**
 * A parallax layer within a slide. Depth controls how far it travels
 * relative to sibling layers during the slide transition (see motion.js).
 * The active transition preset (axis/distance/scale, one per slide
 * boundary) comes from TransitionPresetContext. Variants are inherited
 * from the slide wrapper's animate state — no `animate`/`initial`/`exit`
 * props needed here. Falls back to a plain crossfade when the viewer
 * prefers reduced motion.
 */
export function Layer({ depth = 1, className, style, children }) {
  const reduced = useReducedMotionPref()
  const { preset, direction } = useTransitionPreset()
  return (
    <motion.div
      className={className}
      style={style}
      custom={direction}
      variants={reduced ? reducedLayerVariants() : layerVariants(depth, preset)}
    >
      {children}
    </motion.div>
  )
}
