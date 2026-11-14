import { Environment, Lightformer, Sparkles } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js'
import glyphData from '../../data/ds-glyphs.json'
import type { ThemeColors } from '../../types'

export interface IntroSceneProps {
  /** Active theme colours: the intro uses the same palette as the site. */
  colors: ThemeColors
  /** Fewer fragments and a lower pixel ratio on phones and tablets. */
  lowPower: boolean
  /** The letters have appeared and the timeline is running. */
  onStart: () => void
  /** The exact frame the letters shatter: the flash is tied to this. */
  onImpact: () => void
  /** Every fragment has left the screen. */
  onFinished: () => void
}

type Command = [string, ...number[]]

const LETTER_HEIGHT = 2.5
const UNIT = LETTER_HEIGHT / 688 // 688 = cap height of the source outlines

/** Extruded, bevelled letter built from the site's own display typeface. */
function buildLetter(char: 'D' | 'S'): THREE.ExtrudeGeometry {
  const path = new THREE.ShapePath()
  for (const [op, ...v] of glyphData.glyphs[char].commands as Command[]) {
    if (op === 'M') path.moveTo(v[0], v[1])
    else if (op === 'L') path.currentPath?.lineTo(v[0], v[1])
    else if (op === 'Q') path.currentPath?.quadraticCurveTo(v[0], v[1], v[2], v[3])
    else if (op === 'C') path.currentPath?.bezierCurveTo(v[0], v[1], v[2], v[3], v[4], v[5])
    else if (op === 'Z') path.currentPath?.closePath()
  }
  const geometry = new THREE.ExtrudeGeometry(path.toShapes(), {
    depth: 190,
    curveSegments: 14,
    bevelEnabled: true,
    bevelThickness: 22,
    bevelSize: 14,
    bevelSegments: 5,
  })
  geometry.scale(UNIT, UNIT, UNIT)
  geometry.center()
  return geometry
}

interface Fragment {
  position: THREE.Vector3
  velocity: THREE.Vector3
  rotation: THREE.Euler
  spin: THREE.Vector3
  scale: THREE.Vector3
}

/** Where each letter rests when the two meet at the centre of the screen. */
const REST = { D: -1.5, S: 1.5 }

function Sequence({ colors, lowPower, onStart, onImpact, onFinished }: IntroSceneProps) {
  const camera = useThree(state => state.camera)
  const viewport = useThree(state => state.viewport)
  const letterD = useRef<THREE.Mesh>(null)
  const letterS = useRef<THREE.Mesh>(null)
  const pair = useRef<THREE.Group>(null)
  const shards = useRef<THREE.InstancedMesh>(null)
  const callbacks = useRef({ onStart, onImpact, onFinished })
  callbacks.current = { onStart, onImpact, onFinished }

  const geometry = useMemo(() => ({ D: buildLetter('D'), S: buildLetter('S') }), [])
  // Same treatment as the hero headline: a light face on an accent-coloured body.
  // ExtrudeGeometry puts the front and back in group 0 and the sides and bevel in group 1.
  const materials = useMemo(
    () => ({
      face: new THREE.MeshStandardMaterial({ color: colors.ink, metalness: 0.55, roughness: 0.32 }),
      body: new THREE.MeshStandardMaterial({ color: colors.accent, metalness: 1, roughness: 0.16, envMapIntensity: 1.4 }),
      shard: new THREE.MeshStandardMaterial({ color: '#ffffff', metalness: 0.9, roughness: 0.22 }),
    }),
    [colors],
  )
  const letterMaterials = useMemo(() => [materials.face, materials.body], [materials])
  // Fragments come off in the theme's three colours: mostly accent, some secondary, some light.
  const shardPalette = useMemo(
    () => [colors.accent, colors.accent, colors.accentDeep, colors.panelStrong, colors.ink].map(c => new THREE.Color(c)),
    [colors],
  )
  const shardGeometry = useMemo(() => new THREE.TetrahedronGeometry(1, 0), [])

  const count = lowPower ? 240 : 520
  const fragments = useRef<Fragment[]>([])
  // Values the GSAP timeline animates; the render loop reads them every frame.
  const drive = useRef({ shake: 0, exploded: false, age: 0, cameraDrift: 0 })

  useEffect(
    () => () => {
      geometry.D.dispose()
      geometry.S.dispose()
      Object.values(materials).forEach(material => material.dispose())
      shardGeometry.dispose()
    },
    [geometry, materials, shardGeometry],
  )

  // Narrow screens: pull the pair back so both letters stay in frame.
  const fit = Math.min(1, viewport.width / 7.4)

  useLayoutEffect(() => {
    const d = letterD.current
    const s = letterS.current
    const group = pair.current
    if (!d || !s || !group) return

    d.position.set(-9, 2.2, -70)
    s.position.set(9, -2.2, -70)
    d.rotation.set(0.5, -1.3, 0.25)
    s.rotation.set(-0.5, 1.3, -0.25)

    const explode = () => {
      // Seed every fragment on the surface of the letter it broke off from.
      const list: Fragment[] = []
      const point = new THREE.Vector3()
      for (const mesh of [d, s]) {
        mesh.updateMatrixWorld()
        const sampler = new MeshSurfaceSampler(mesh).build()
        for (let i = 0; i < count / 2; i++) {
          sampler.sample(point)
          point.applyMatrix4(mesh.matrixWorld)
          const outward = new THREE.Vector3(point.x, point.y * 1.2, 0)
          if (outward.lengthSq() < 0.01) outward.set(Math.random() - 0.5, Math.random() - 0.5, 0)
          outward.normalize()
          const force = 2.5 + Math.random() * 8
          const size = 0.035 + Math.random() ** 2 * 0.17
          list.push({
            position: point.clone(),
            velocity: new THREE.Vector3(
              outward.x * force + (Math.random() - 0.5) * 3,
              outward.y * force + (Math.random() - 0.5) * 3,
              3 + Math.random() * 20, // toward the camera
            ),
            rotation: new THREE.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6),
            spin: new THREE.Vector3((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 14, (Math.random() - 0.5) * 14),
            scale: new THREE.Vector3(size * (0.6 + Math.random()), size * (0.6 + Math.random()), size * 0.5),
          })
        }
      }
      fragments.current = list
      list.forEach((_, index) => shards.current?.setColorAt(index, shardPalette[index % shardPalette.length]))
      if (shards.current?.instanceColor) shards.current.instanceColor.needsUpdate = true
      d.visible = false
      s.visible = false
      drive.current.exploded = true
      drive.current.age = 0
      callbacks.current.onImpact()
    }

    const timeline = gsap.timeline({ onStart: () => callbacks.current.onStart() })
    timeline
      // 1. Approach: two letters fly in from deep space and meet in the middle.
      .to(d.position, { x: REST.D, y: 0, z: 0, duration: 2.5, ease: 'expo.out' }, 0.15)
      .to(s.position, { x: REST.S, y: 0, z: 0, duration: 2.5, ease: 'expo.out' }, 0.15)
      .to(d.rotation, { x: 0, y: 0, z: 0, duration: 2.5, ease: 'power3.out' }, 0.15)
      .to(s.rotation, { x: 0, y: 0, z: 0, duration: 2.5, ease: 'power3.out' }, 0.15)
      .to(drive.current, { cameraDrift: 1, duration: 3, ease: 'sine.inOut' }, 0)
      // 2. Anticipation: a short held breath, the pair tightens.
      .to(group.scale, { x: 0.93, y: 0.93, z: 0.93, duration: 0.42, ease: 'power2.in' }, 2.62)
      .to(drive.current, { shake: 0.035, duration: 0.42, ease: 'power2.in' }, 2.62)
      // 3. Impact.
      .to(group.scale, { x: 1.12, y: 1.12, z: 1.12, duration: 0.06, ease: 'power4.out' }, 3.04)
      .call(explode, undefined, 3.1)
      .set(drive.current, { shake: 0.55 }, 3.1)
      .to(drive.current, { shake: 0, duration: 0.9, ease: 'expo.out' }, 3.12)
      .call(() => callbacks.current.onFinished(), undefined, 4.9)

    return () => {
      timeline.kill()
    }
  }, [count, shardPalette])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const { shake, cameraDrift, exploded } = drive.current

    // Slow push-in with a slight orbit, plus shake on impact.
    const time = state.clock.elapsedTime
    camera.position.set(
      Math.sin(time * 0.5) * 0.35 * (1 - cameraDrift * 0.6) + (Math.random() - 0.5) * shake,
      0.25 - cameraDrift * 0.25 + (Math.random() - 0.5) * shake,
      10.5 - cameraDrift * 1.3,
    )
    camera.lookAt(0, 0, 0)

    const mesh = shards.current
    if (!mesh || !exploded) return
    drive.current.age += dt
    const age = drive.current.age
    // Fragments shrink away near the end so nothing pops out of existence.
    const fade = THREE.MathUtils.clamp(1 - (age - 1.1) / 0.6, 0, 1)

    fragments.current.forEach((fragment, index) => {
      fragment.velocity.y -= 3.2 * dt
      fragment.velocity.multiplyScalar(1 - 0.35 * dt)
      fragment.position.addScaledVector(fragment.velocity, dt)
      fragment.rotation.x += fragment.spin.x * dt
      fragment.rotation.y += fragment.spin.y * dt
      fragment.rotation.z += fragment.spin.z * dt
      dummy.position.copy(fragment.position)
      dummy.rotation.copy(fragment.rotation)
      dummy.scale.copy(fragment.scale).multiplyScalar(fade)
      dummy.updateMatrix()
      mesh.setMatrixAt(index, dummy.matrix)
    })
    mesh.count = fragments.current.length
    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <>
      <group ref={pair} scale={1}>
        <group scale={fit}>
          <mesh ref={letterD} geometry={geometry.D} material={letterMaterials} />
          <mesh ref={letterS} geometry={geometry.S} material={letterMaterials} />
        </group>
      </group>
      <group scale={fit}>
        <instancedMesh ref={shards} args={[shardGeometry, materials.shard, count]} count={0} frustumCulled={false} />
      </group>
      <Sparkles count={lowPower ? 50 : 130} scale={[22, 12, 30]} position={[0, 0, -8]} size={1.6} speed={0.5} opacity={0.6} color={colors.accentInk} />
    </>
  )
}

export default function IntroScene(props: IntroSceneProps) {
  const { colors } = props
  return (
    <Canvas
      dpr={props.lowPower ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 0.25, 10.5], fov: 38, near: 0.1, far: 200 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.15} />
      <spotLight position={[0, 9, 9]} angle={0.5} penumbra={1} intensity={220} />
      <directionalLight position={[-7, 2, 5]} intensity={1.6} color={colors.accentInk} />
      <directionalLight position={[7, -3, 4]} intensity={1.2} color={colors.panelStrong} />
      {/* A dark studio with soft boxes, tinted with the theme's accent and secondary colours. */}
      <Environment resolution={256} frames={1}>
        <color attach="background" args={['#020203']} />
        <Lightformer form="rect" intensity={9} position={[0, 6, 2]} rotation-x={Math.PI / 2} scale={[14, 3, 1]} />
        <Lightformer form="rect" intensity={6} color={colors.accent} position={[-8, 0, 3]} rotation-y={Math.PI / 2} scale={[9, 1.6, 1]} />
        <Lightformer form="rect" intensity={5} color={colors.panelStrong} position={[8, 0, 3]} rotation-y={-Math.PI / 2} scale={[9, 1.6, 1]} />
        <Lightformer form="rect" intensity={3} color={colors.accent} position={[0, -6, 2]} rotation-x={-Math.PI / 2} scale={[14, 2, 1]} />
        <Lightformer form="ring" intensity={3} position={[0, 0, 12]} scale={5} />
      </Environment>
      <Sequence {...props} />
    </Canvas>
  )
}
