import { Environment, Float, Lightformer, Sparkles } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { ThemeColors } from '../../types'

interface HeroSceneProps {
  colors: ThemeColors
  /** False when the hero is off screen: the render loop stops entirely. */
  active: boolean
  /** Fewer particles and a lower pixel ratio for touch devices. */
  lowPower: boolean
}

/** Pointer position in -1..1, shared by everything in the scene. */
function usePointer() {
  const pointer = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
  return pointer
}

function Sculpture({ colors, lowPower }: Pick<HeroSceneProps, 'colors' | 'lowPower'>) {
  const rig = useRef<THREE.Group>(null)
  const ringA = useRef<THREE.Mesh>(null)
  const ringB = useRef<THREE.Mesh>(null)
  const light = useRef<THREE.PointLight>(null)
  const pointer = usePointer()
  const viewport = useThree(state => state.viewport)

  // Geometries are created once and shared by every mesh that needs them.
  const geometry = useMemo(
    () => ({
      sphere: new THREE.SphereGeometry(1, 48, 48),
      ring: new THREE.TorusGeometry(2.25, 0.16, 24, 128),
      thinRing: new THREE.TorusGeometry(2.9, 0.035, 12, 128),
      facet: new THREE.IcosahedronGeometry(1, 0),
      gem: new THREE.OctahedronGeometry(1, 0),
    }),
    [],
  )

  const material = useMemo(
    () => ({
      accent: new THREE.MeshStandardMaterial({ metalness: 1, roughness: 0.16 }),
      forest: new THREE.MeshStandardMaterial({ metalness: 0.9, roughness: 0.28 }),
      chrome: new THREE.MeshStandardMaterial({ metalness: 1, roughness: 0.08 }),
      facet: new THREE.MeshStandardMaterial({ metalness: 0.85, roughness: 0.3, flatShading: true }),
    }),
    [],
  )

  useEffect(() => {
    material.accent.color.set(colors.accent)
    material.forest.color.set(colors.panelStrong)
    material.chrome.color.set(colors.panel)
    material.facet.color.set(colors.accentDeep)
  }, [colors, material])

  useEffect(
    () => () => {
      Object.values(geometry).forEach(item => item.dispose())
      Object.values(material).forEach(item => item.dispose())
    },
    [geometry, material],
  )

  useFrame((state, delta) => {
    const group = rig.current
    if (!group) return
    const dt = Math.min(delta, 0.05)
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.2)
    const { x, y } = pointer.current

    // Sit to the right of the headline on wide screens, centred on narrow ones.
    const homeX = viewport.width > 9 ? viewport.width * 0.24 : viewport.width * 0.12
    const ease = 1 - Math.exp(-dt * 3)
    group.position.x += (homeX + x * 0.25 - group.position.x) * ease
    group.position.y += (0.2 + y * 0.18 + scroll * 2.2 - group.position.y) * ease
    group.rotation.y += (x * 0.35 + scroll * 1.4 - group.rotation.y) * ease
    group.rotation.x += (-y * 0.22 + scroll * 0.5 - group.rotation.x) * ease
    const scale = Math.min(1, viewport.width / 10) * (1 - scroll * 0.18)
    group.scale.setScalar(scale)

    if (ringA.current) ringA.current.rotation.z += dt * 0.12
    if (ringB.current) ringB.current.rotation.z -= dt * 0.08

    // The accent light follows the cursor across the sculpture.
    if (light.current) {
      light.current.position.x += (x * 5 + homeX - light.current.position.x) * ease
      light.current.position.y += (y * 3.5 - light.current.position.y) * ease
    }
    state.invalidate()
  })

  return (
    <>
      <pointLight ref={light} position={[0, 0, 3.2]} intensity={34} distance={12} color={colors.accentInk} />
      <group ref={rig}>
        <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.6}>
          <mesh geometry={geometry.sphere} material={material.chrome} scale={1.18} />
        </Float>

        <group rotation={[1.08, 0.2, -0.35]}>
          <mesh ref={ringA} geometry={geometry.ring} material={material.accent} />
        </group>
        <group rotation={[1.35, -0.55, 0.4]}>
          <mesh ref={ringB} geometry={geometry.thinRing} material={material.forest} />
        </group>

        <Float speed={1.6} rotationIntensity={1.2} floatIntensity={1.1}>
          <mesh geometry={geometry.facet} material={material.facet} position={[-2.5, 1.5, 0.6]} scale={0.46} />
        </Float>
        <Float speed={1.3} rotationIntensity={1.4} floatIntensity={1}>
          <mesh geometry={geometry.gem} material={material.forest} position={[2.4, -1.5, 0.9]} scale={0.4} />
        </Float>
        <Float speed={2} rotationIntensity={0.4} floatIntensity={1.4}>
          <mesh geometry={geometry.sphere} material={material.accent} position={[2.05, 1.75, -0.4]} scale={0.24} />
        </Float>
        <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.2}>
          <mesh geometry={geometry.sphere} material={material.forest} position={[-1.9, -1.7, 1.1]} scale={0.17} />
        </Float>
        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.6}>
          <mesh geometry={geometry.sphere} material={material.chrome} position={[0.4, 2.55, -1]} scale={0.11} />
        </Float>

        <Sparkles
          count={lowPower ? 14 : 44}
          scale={[7, 6, 4]}
          size={2.2}
          speed={0.25}
          opacity={0.55}
          color={colors.accentInk}
        />
      </group>
    </>
  )
}

export default function HeroScene({ colors, active, lowPower }: HeroSceneProps) {
  return (
    <Canvas
      className="!absolute inset-0"
      style={{ pointerEvents: 'none' }}
      dpr={lowPower ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [0, 0, 9], fov: 36 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={active ? 'always' : 'never'}
      aria-hidden="true"
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 4]} intensity={2.2} />
      <directionalLight position={[-6, -2, 2]} intensity={0.7} color={colors.panelStrong} />
      {/* Studio reflections built from light panels: rendered once, no HDR download. */}
      <Environment key={colors.accent} resolution={128} frames={1}>
        <Lightformer form="rect" intensity={5} position={[0, 5, -2]} scale={[10, 4, 1]} />
        <Lightformer form="rect" intensity={2.5} position={[-5, 1, 2]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
        <Lightformer form="ring" intensity={3} color={colors.accent} position={[5, -1, 3]} rotation-y={-Math.PI / 2} scale={4} />
        <Lightformer form="rect" intensity={1.2} color={colors.panelStrong} position={[0, -5, 0]} rotation-x={Math.PI / 2} scale={[10, 10, 1]} />
      </Environment>
      <Sculpture colors={colors} lowPower={lowPower} />
    </Canvas>
  )
}
