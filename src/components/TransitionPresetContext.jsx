import { createContext, useContext } from 'react'
import { TRANSITIONS } from './motion.js'

const TransitionPresetContext = createContext({ preset: TRANSITIONS[0], direction: 1 })

export function TransitionPresetProvider({ preset, direction, children }) {
  return <TransitionPresetContext.Provider value={{ preset, direction }}>{children}</TransitionPresetContext.Provider>
}

export function useTransitionPreset() {
  return useContext(TransitionPresetContext)
}
