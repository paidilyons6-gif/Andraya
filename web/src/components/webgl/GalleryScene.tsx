import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, type MutableRefObject } from 'react'
import * as THREE from 'three'
import { COLORS } from '../../lib/motion'

type GallerySceneProps = {
  progressRef: MutableRefObject<number>
}

function SpotlightRig({ progressRef }: GallerySceneProps) {
  const spotRef = useRef<THREE.SpotLight>(null)
  const targetRef = useRef<THREE.Object3D>(null)
  const dustRef = useRef<THREE.Points>(null)
  const vignetteRef = useRef<THREE.Mesh>(null)
  const { scene } = useThree()

  useEffect(() => {
    const target = targetRef.current
    const spot = spotRef.current
    if (target && !scene.children.includes(target)) scene.add(target)
    if (spot && target) spot.target = target
  }, [scene])

  const dustGeometry = useMemo(() => {
    const count = 120
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [])

  useFrame(({ clock }) => {
    const p = progressRef.current
    const spot = spotRef.current
    const target = targetRef.current
    const dust = dustRef.current
    const vignette = vignetteRef.current
    if (!spot || !target) return

    const x = -4 + p * 10
    spot.position.set(x, 5, 4)
    target.position.set(x, 0, 0)
    spot.intensity = 2.2 + p * 1.5
    spot.angle = 0.35 + p * 0.08

    if (dust) {
      dust.rotation.y = clock.elapsedTime * 0.02
      dust.position.x = x * 0.3
    }

    if (vignette) {
      const mat = vignette.material as THREE.MeshBasicMaterial
      mat.opacity = 0.15 + p * 0.55
    }
  })

  return (
    <>
      <color attach="background" args={[COLORS.galleryBg]} />
      <ambientLight intensity={0.08} color={COLORS.gallerySpot} />
      <spotLight
        ref={spotRef}
        color={COLORS.gallerySpot}
        intensity={2.5}
        angle={0.4}
        penumbra={0.85}
        distance={22}
        castShadow={false}
      />
      <object3D ref={targetRef} position={[0, 0, 0]} />
      <mesh position={[0, 0, -3]} rotation={[0, 0, 0]}>
        <planeGeometry args={[24, 14]} />
        <meshStandardMaterial color={COLORS.galleryWall} roughness={0.95} metalness={0} />
      </mesh>
      <mesh ref={vignetteRef} position={[0, 0, 1]}>
        <planeGeometry args={[24, 14]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.2}
          depthWrite={false}
        />
      </mesh>
      <points ref={dustRef} geometry={dustGeometry}>
        <pointsMaterial
          size={0.04}
          color={COLORS.gallerySpot}
          transparent
          opacity={0.35}
          sizeAttenuation
        />
      </points>
    </>
  )
}

export function GallerySceneContent({ progressRef }: GallerySceneProps) {
  return <SpotlightRig progressRef={progressRef} />
}
