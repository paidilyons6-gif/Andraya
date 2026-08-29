import { Canvas } from '@react-three/fiber'
import type { MutableRefObject } from 'react'
import { GallerySceneContent } from './GalleryScene'

type GalleryCanvasProps = {
  progressRef: MutableRefObject<number>
}

export function GalleryCanvas({ progressRef }: GalleryCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%' }}
    >
      <GallerySceneContent progressRef={progressRef} />
    </Canvas>
  )
}
