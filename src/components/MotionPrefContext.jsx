import { createContext, useContext } from 'react'

const MotionPrefContext = createContext(false)

export function MotionPrefProvider({ reduced, children }) {
  return <MotionPrefContext.Provider value={reduced}>{children}</MotionPrefContext.Provider>
}

export function useReducedMotionPref() {
  return useContext(MotionPrefContext)
}
