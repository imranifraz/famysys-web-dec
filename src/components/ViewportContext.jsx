import { createContext, useContext } from 'react'

const ViewportContext = createContext({ isMobile: false })

export function ViewportProvider({ isMobile, children }) {
  return <ViewportContext.Provider value={{ isMobile }}>{children}</ViewportContext.Provider>
}

export function useIsMobile() {
  return useContext(ViewportContext).isMobile
}
