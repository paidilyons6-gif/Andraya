import { createContext, useContext, useState, type ReactNode } from 'react'

type DrawHandoffContextValue = {
  preloaderComplete: boolean
  setPreloaderComplete: (value: boolean) => void
}

const DrawHandoffContext = createContext<DrawHandoffContextValue | null>(null)

export function DrawHandoffProvider({ children }: { children: ReactNode }) {
  const [preloaderComplete, setPreloaderComplete] = useState(false)
  return (
    <DrawHandoffContext.Provider value={{ preloaderComplete, setPreloaderComplete }}>
      {children}
    </DrawHandoffContext.Provider>
  )
}

export function useDrawHandoff() {
  const ctx = useContext(DrawHandoffContext)
  if (!ctx) throw new Error('useDrawHandoff must be used within DrawHandoffProvider')
  return ctx
}
