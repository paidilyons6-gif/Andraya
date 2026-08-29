import { useEffect, useState } from 'react'

export function useMotionEnabled() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finePointer = window.matchMedia('(pointer: fine)')

    const update = () => {
      setEnabled(!reduced.matches)
    }

    update()
    reduced.addEventListener('change', update)
    finePointer.addEventListener('change', update)
    return () => {
      reduced.removeEventListener('change', update)
      finePointer.removeEventListener('change', update)
    }
  }, [])

  return enabled
}

export function useFinePointer() {
  const [fine, setFine] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const update = () => setFine(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return fine
}
