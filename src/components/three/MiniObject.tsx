import { Environment, Lightformer } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type * as THREE from 'three'
import type { ThemeColors } from '../../types'

export type MiniShape = 'bars' | 'ring'

interface MiniObjectProps {
  shape: MiniShape
  colors: ThemeColors
  /** Rendering stops completely while the card is off screen. */
  active: boolean
}

const BAR_WIDTHS = [0.16, 0.06, 0.1, 0.06, 0.2, 0.06, 0.12, 0.06, 0.16]
const BAR_GAP = 0.045

/** Bar centres, laid out left to right and centred on the origin. */
const BARS = (() => {
  const total = BAR_WIDTHS.reduce((sum, width) => sum + width, 0) + BAR_GAP * (BAR_WIDTHS.length - 1)
  let cursor = -total / 2
  return BAR_WIDTHS.map(width => {
    const bar = { width, x: cursor + width / 2 }
    cursor += width + BAR_GAP
    return bar
  })
})()

function Shape({ shape, colors }: Pick<MiniObjectProps, 'shape' | 'colors'>) {
  const group = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (!group.current) return
    // Bars sway so the barcode stays readable; the ring spins freely.
    if (shape === 'bars') group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.7
    else group.current.rotation.y += delta * 0.6
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.25
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.1) * 0.08
  })

  if (shape === 'bars') {
    // A barcode, extruded.
    return (
      <group ref={group}>
        {BARS.map((bar, index) => (
          <mesh key={index} position={[bar.x, 0, 0]}>
            <boxGeometry args={[bar.width, 1.1, 0.34]} />
            <meshStandardMaterial
              color={index === 4 ? colors.gold : colors.accent}
              metalness={0.9}
              roughness={0.22}
            />
          </mesh>
        ))}
      </group>
    )
  }

  // A streak ring with a marker riding on it.
  return (
    <group ref={group}>
      <mesh>
        <torusGeometry args={[0.68, 0.13, 20, 72]} />
        <meshStandardMaterial color={colors.accent} metalness={1} roughness={0.18} />
      </mesh>
      <mesh position={[0.68, 0, 0]}>
        <sphereGeometry args={[0.2, 24, 24]} />
        <meshStandardMaterial color={colors.gold} metalness={1} roughness={0.2} />
      </mesh>
    </group>
  )
}

export default function MiniObject({ shape, colors, active }: MiniObjectProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3.2], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      frameloop={active ? 'always' : 'never'}
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 3, 4]} intensity={2.4} />
      <Environment key={colors.accent} resolution={64} frames={1}>
        <Lightformer form="rect" intensity={4} position={[0, 4, 1]} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={2} color={colors.accent} position={[-4, 0, 2]} rotation-y={Math.PI / 2} scale={[4, 4, 1]} />
      </Environment>
      <Shape shape={shape} colors={colors} />
    </Canvas>
  )
}
