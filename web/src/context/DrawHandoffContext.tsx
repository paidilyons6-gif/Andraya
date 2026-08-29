import { createContext, useContext, useRef, useState, type ReactNode, type RefObject } from 'react'

type DrawHandoffContextValue = {
  preloaderComplete: boolean
  setPreloaderComplete: (value: boolean) => void
  flipComplete: boolean
  setFlipComplete: (value: boolean) => void
  artworkReady: boolean
  setArtworkReady: (value: boolean) => void
  skippedHandoff: boolean
  setSkippedHandoff: (value: boolean) => void
  heroTargetRef: RefObject<HTMLDivElement | null>
}

const DrawHandoffContext = createContext<DrawHandoffContextValue | null>(null)

export function DrawHandoffProvider({ children }: { children: ReactNode }) {
  const [preloaderComplete, setPreloaderComplete] = useState(false)
  const [flipComplete, setFlipComplete] = useState(false)
  const [artworkReady, setArtworkReady] = useState(false)
  const [skippedHandoff, setSkippedHandoff] = useState(false)
  const heroTargetRef = useRef<HTMLDivElement>(null)

  return (
    <DrawHandoffContext.Provider
      value={{
        preloaderComplete,
        setPreloaderComplete,
        flipComplete,
        setFlipComplete,
        artworkReady,
        setArtworkReady,
        skippedHandoff,
        setSkippedHandoff,
        heroTargetRef,
      }}
    >
      {children}
    </DrawHandoffContext.Provider>
  )
}

export function useDrawHandoff() {
  const ctx = useContext(DrawHandoffContext)
  if (!ctx) throw new Error('useDrawHandoff must be used within DrawHandoffProvider')
  return ctx
}
