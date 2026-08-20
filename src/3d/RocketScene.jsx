import { useRef, useMemo, useCallback, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

/* ─── Constants ──────────────────────────────────────────── */
const TOTAL_DURATION = 12   // seconds for full sequence
const IGNITION_START = 1.5
const LAUNCH_START   = 3.5
const SMOKE_FILL     = 7.5
const PORTFOLIO_START = 10

/* ─── Rocket geometry ───────────────────────────────────── */
function RocketMesh({ launchProgress }) {
  const groupRef = useRef()
  const noseconeRef = useRef()
  const bodyRef = useRef()
  const engineBellRef = useRef()
  const finRefs = useRef([])

  // Metallic body material
  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#c8d4e0'),
    metalness: 0.8,
    roughness: 0.25,
  }), [])

  const noseMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#a0b0c8'),
    metalness: 0.85,
    roughness: 0.2,
  }), [])

  const finMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#3a4a5a'),
    metalness: 0.7,
    roughness: 0.3,
  }), [])

  const bellMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#2a3540'),
    metalness: 0.9,
    roughness: 0.1,
  }), [])

  // Fin positions (4 fins equally spaced)
  const finAngles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2]

  // Update group Y position during launch
  useFrame(() => {
    if (!groupRef.current) return
    if (launchProgress.current > LAUNCH_START / TOTAL_DURATION) {
      const t = Math.max(0, (launchProgress.current - LAUNCH_START / TOTAL_DURATION))
        / (1 - LAUNCH_START / TOTAL_DURATION)
      const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
      groupRef.current.position.y = ease * 18
    }
  })

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {/* Nose cone */}
      <mesh ref={noseconeRef} position={[0, 3.65, 0]} material={noseMat}>
        <coneGeometry args={[0.28, 1.3, 20]} />
      </mesh>

      {/* Upper body ring (payload fairing) */}
      <mesh position={[0, 2.8, 0]} material={noseMat}>
        <cylinderGeometry args={[0.28, 0.28, 0.7, 20]} />
      </mesh>

      {/* Separation ring */}
      <mesh position={[0, 2.45, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.04, 20]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.4} />
      </mesh>

      {/* Main body */}
      <mesh ref={bodyRef} position={[0, 1.2, 0]} material={bodyMat}>
        <cylinderGeometry args={[0.28, 0.3, 2.5, 20]} />
      </mesh>

      {/* Logo stripe */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.285, 0.285, 0.08, 20]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.3} />
      </mesh>

      {/* Engine section */}
      <mesh position={[0, -0.15, 0]} material={bodyMat}>
        <cylinderGeometry args={[0.3, 0.34, 0.5, 20]} />
      </mesh>

      {/* Engine bell */}
      <mesh ref={engineBellRef} position={[0, -0.6, 0]} material={bellMat}>
        <cylinderGeometry args={[0.1, 0.32, 0.5, 20, 1, true]} />
      </mesh>

      {/* Fins */}
      {finAngles.map((angle, i) => (
        <group
          key={i}
          ref={el => (finRefs.current[i] = el)}
          rotation={[0, angle, 0]}
          position={[0, -0.2, 0]}
        >
          <mesh
            material={finMat}
            position={[0.42, -0.3, 0]}
            rotation={[0, 0, -0.12]}
          >
            <boxGeometry args={[0.04, 0.9, 0.5]} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/* ─── Launch Pad ─────────────────────────────────────────── */
function LaunchPad() {
  const padMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#2a3a4a'),
    metalness: 0.6,
    roughness: 0.5,
  }), [])

  const concreteMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1a2030'),
    metalness: 0.1,
    roughness: 0.9,
  }), [])

  const legMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#374355'),
    metalness: 0.7,
    roughness: 0.3,
  }), [])

  return (
    <group position={[0, -1.1, 0]}>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow material={concreteMat}>
        <planeGeometry args={[40, 40]} />
      </mesh>

      {/* Platform */}
      <mesh position={[0, 0.12, 0]} material={padMat}>
        <boxGeometry args={[3.5, 0.22, 3.5]} />
      </mesh>

      {/* Center hole/exhaust duct */}
      <mesh position={[0, 0.14, 0]} material={concreteMat}>
        <cylinderGeometry args={[0.4, 0.4, 0.26, 20]} />
      </mesh>

      {/* Support legs */}
      {[[-1.4, 1.4], [1.4, 1.4], [-1.4, -1.4], [1.4, -1.4]].map(([x, z], i) => (
        <mesh key={i} position={[x, -0.6, z]} material={legMat}>
          <cylinderGeometry args={[0.07, 0.09, 1.6, 8]} />
        </mesh>
      ))}

      {/* Diagonal braces */}
      {[
        { pos: [0.7, -0.3, 0], rot: [0, 0, Math.PI / 5] },
        { pos: [-0.7, -0.3, 0], rot: [0, 0, -Math.PI / 5] },
        { pos: [0, -0.3, 0.7], rot: [Math.PI / 5, 0, 0] },
        { pos: [0, -0.3, -0.7], rot: [-Math.PI / 5, 0, 0] },
      ].map((b, i) => (
        <mesh key={i} position={b.pos} rotation={b.rot} material={legMat}>
          <cylinderGeometry args={[0.04, 0.04, 1.4, 6]} />
        </mesh>
      ))}

      {/* Grid lines on ground */}
      {[-3, -1.5, 0, 1.5, 3].map((v, i) => (
        <group key={i}>
          <mesh position={[v, 0.01, 0]} material={legMat} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.015, 12]} />
          </mesh>
          <mesh position={[0, 0.01, v]} material={legMat} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
            <planeGeometry args={[0.015, 12]} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/* ─── Exhaust fire particles ─────────────────────────────── */
function ExhaustParticles({ phase, isMobile }) {
  const meshRef = useRef()
  const COUNT = isMobile ? 80 : 180

  const { positions, velocities, lifetimes } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    const vel = new Float32Array(COUNT * 3)
    const lft = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      lft[i] = Math.random()
      pos[i * 3]     = (Math.random() - 0.5) * 0.15
      pos[i * 3 + 1] = -0.8 - Math.random() * 0.5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.15
      vel[i * 3]     = (Math.random() - 0.5) * 0.015
      vel[i * 3 + 1] = -(0.04 + Math.random() * 0.06)
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.015
    }
    return { positions: pos, velocities: vel, lifetimes: lft }
  }, [COUNT])

  const geomRef = useRef()
  const colorsRef = useRef()

  useMemo(() => {
    const colors = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const t = Math.random()
      // white-yellow-orange gradient
      colors[i * 3]     = 1
      colors[i * 3 + 1] = 0.4 + t * 0.5
      colors[i * 3 + 2] = t * 0.2
    }
    colorsRef.current = colors
  }, [COUNT])

  const rocketY = useRef(0)

  useFrame((_, delta) => {
    if (!geomRef.current || !meshRef.current) return

    const intensity = Math.max(0,
      (phase.current - IGNITION_START / TOTAL_DURATION)
        / ((SMOKE_FILL / TOTAL_DURATION) - (IGNITION_START / TOTAL_DURATION))
    )
    meshRef.current.visible = intensity > 0

    if (intensity <= 0) return

    // Move particles with rocket
    if (phase.current > LAUNCH_START / TOTAL_DURATION) {
      const t = Math.max(0, (phase.current - LAUNCH_START / TOTAL_DURATION))
        / (1 - LAUNCH_START / TOTAL_DURATION)
      const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
      rocketY.current = ease * 18
    }

    const pos = geomRef.current.attributes.position.array
    for (let i = 0; i < COUNT; i++) {
      lifetimes[i] += delta * 1.5 * intensity
      if (lifetimes[i] > 1) {
        lifetimes[i] = 0
        pos[i * 3]     = (Math.random() - 0.5) * 0.18 * intensity
        pos[i * 3 + 1] = rocketY.current - 1.1
        pos[i * 3 + 2] = (Math.random() - 0.5) * 0.18 * intensity
        velocities[i * 3]     = (Math.random() - 0.5) * 0.02
        velocities[i * 3 + 1] = -(0.06 + Math.random() * 0.08) * intensity
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02
      } else {
        pos[i * 3]     += velocities[i * 3]
        pos[i * 3 + 1] += velocities[i * 3 + 1]
        pos[i * 3 + 2] += velocities[i * 3 + 2]
      }
    }
    geomRef.current.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          itemSize={3}
          usage={THREE.DynamicDrawUsage}
        />
        <bufferAttribute attach="attributes-color" array={colorsRef.current} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={isMobile ? 0.14 : 0.1}
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ─── Smoke particles ────────────────────────────────────── */
function SmokeParticles({ phase, isMobile }) {
  const meshRef = useRef()
  const COUNT = isMobile ? 60 : 130

  const { positions, velocities, sizes, lifetimes } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    const vel = new Float32Array(COUNT * 3)
    const sz  = new Float32Array(COUNT)
    const lft = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      lft[i] = Math.random()
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 0.4
      pos[i * 3]     = Math.cos(angle) * radius
      pos[i * 3 + 1] = -1.2 - Math.random() * 0.5
      pos[i * 3 + 2] = Math.sin(angle) * radius
      vel[i * 3]     = (Math.random() - 0.5) * 0.02
      vel[i * 3 + 1] = -(0.02 + Math.random() * 0.03)
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02
      sz[i]  = 0.3 + Math.random() * 0.6
    }
    return { positions: pos, velocities: vel, sizes: sz, lifetimes: lft }
  }, [COUNT])

  const geomRef = useRef()
  const rocketY = useRef(0)

  useFrame((_, delta) => {
    if (!geomRef.current || !meshRef.current) return

    const smokeStart = IGNITION_START / TOTAL_DURATION
    const smokeEnd   = (PORTFOLIO_START + 1) / TOTAL_DURATION
    const intensity = Math.max(0, Math.min(1,
      (phase.current - smokeStart) / (smokeEnd - smokeStart)
    ))
    // Fade smoke out near end
    const fadeOut = phase.current > PORTFOLIO_START / TOTAL_DURATION
      ? 1 - (phase.current - PORTFOLIO_START / TOTAL_DURATION) / (2 / TOTAL_DURATION)
      : 1
    meshRef.current.material.opacity = Math.max(0, intensity * 0.45 * fadeOut)
    meshRef.current.visible = meshRef.current.material.opacity > 0.01

    if (!meshRef.current.visible) return

    if (phase.current > LAUNCH_START / TOTAL_DURATION) {
      const t = Math.max(0, (phase.current - LAUNCH_START / TOTAL_DURATION))
        / (1 - LAUNCH_START / TOTAL_DURATION)
      const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
      rocketY.current = ease * 18
    }

    const pos = geomRef.current.attributes.position.array
    for (let i = 0; i < COUNT; i++) {
      lifetimes[i] += delta * 0.5
      if (lifetimes[i] > 1) {
        lifetimes[i] = 0
        const angle  = Math.random() * Math.PI * 2
        const radius = Math.random() * 0.45 * intensity
        pos[i * 3]     = Math.cos(angle) * radius
        pos[i * 3 + 1] = rocketY.current - 1.1
        pos[i * 3 + 2] = Math.sin(angle) * radius
        velocities[i * 3]     = (Math.random() - 0.5) * 0.035 * intensity
        velocities[i * 3 + 1] = -(0.015 + Math.random() * 0.02)
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.035 * intensity
        sizes[i] = (0.4 + Math.random() * 0.8) * intensity
      } else {
        pos[i * 3]     += velocities[i * 3] * (1 + lifetimes[i])
        pos[i * 3 + 1] += velocities[i * 3 + 1]
        pos[i * 3 + 2] += velocities[i * 3 + 2] * (1 + lifetimes[i])
        sizes[i] = Math.min(sizes[i] + delta * 0.4, 2.5)
      }
    }
    geomRef.current.attributes.position.needsUpdate = true
    geomRef.current.attributes.size.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute attach="attributes-position" array={positions} itemSize={3} usage={THREE.DynamicDrawUsage} />
        <bufferAttribute attach="attributes-size" array={sizes} itemSize={1} usage={THREE.DynamicDrawUsage} />
      </bufferGeometry>
      <pointsMaterial
        color="#8090a0"
        size={isMobile ? 0.7 : 0.5}
        sizeAttenuation
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  )
}

/* ─── Engine glow light ──────────────────────────────────── */
function EngineGlow({ phase }) {
  const lightRef = useRef()
  const rocketY  = useRef(0)

  useFrame(() => {
    if (!lightRef.current) return
    const t = Math.max(0, phase.current - IGNITION_START / TOTAL_DURATION)
      / (1 - IGNITION_START / TOTAL_DURATION)
    const intensity = Math.min(1, t * 2) * 8

    lightRef.current.intensity = intensity

    if (phase.current > LAUNCH_START / TOTAL_DURATION) {
      const lt = Math.max(0, (phase.current - LAUNCH_START / TOTAL_DURATION))
        / (1 - LAUNCH_START / TOTAL_DURATION)
      const ease = lt < 0.5 ? 2 * lt * lt : 1 - Math.pow(-2 * lt + 2, 2) / 2
      rocketY.current = ease * 18
    }
    lightRef.current.position.y = rocketY.current - 0.9
  })

  return (
    <pointLight
      ref={lightRef}
      position={[0, -0.9, 0]}
      color="#ff7020"
      intensity={0}
      distance={8}
      decay={2}
    />
  )
}

/* ─── Camera controller ──────────────────────────────────── */
function CameraController({ phase, isMobile }) {
  const { camera } = useThree()

  useFrame(() => {
    const p = phase.current

    // Start position
    const startX = isMobile ? 0 : 6
    const startY = isMobile ? 3 : 2
    const startZ = isMobile ? 12 : 9

    if (p < IGNITION_START / TOTAL_DURATION) {
      // Gentle slow reveal from dark
      camera.position.set(startX, startY, startZ)
      camera.lookAt(0, 1, 0)
      return
    }

    if (p < LAUNCH_START / TOTAL_DURATION) {
      // Orbit slightly during ignition
      const t = (p - IGNITION_START / TOTAL_DURATION)
        / (LAUNCH_START / TOTAL_DURATION - IGNITION_START / TOTAL_DURATION)
      camera.position.x = startX - t * 1.5
      camera.position.y = startY + t * 0.5
      camera.position.z = startZ - t * 1.0
      camera.lookAt(0, 1, 0)
      return
    }

    // Track rocket upward
    const t = Math.min(1, (p - LAUNCH_START / TOTAL_DURATION)
      / ((SMOKE_FILL / TOTAL_DURATION) - (LAUNCH_START / TOTAL_DURATION)))
    const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
    const rocketY = ease * 18

    camera.position.x = startX - 3 * ease
    camera.position.y = startY + rocketY * 0.55
    camera.position.z = startZ - 3 * ease
    camera.lookAt(0, 1 + rocketY * 0.7, 0)
  })

  return null
}

/* ─── Ambient / directional lighting ────────────────────── */
function Lighting({ phase }) {
  const ambRef = useRef()
  const dirRef = useRef()
  const dir2Ref = useRef()

  useFrame(() => {
    if (!ambRef.current) return
    const t = Math.min(1, phase.current / (IGNITION_START / TOTAL_DURATION))
    ambRef.current.intensity = 0.05 + t * 0.2
    if (dirRef.current) dirRef.current.intensity = 0.1 + t * 1.0
    if (dir2Ref.current) dir2Ref.current.intensity = t * 0.4
  })

  return (
    <>
      <ambientLight ref={ambRef} color="#1a2840" intensity={0.05} />
      <directionalLight
        ref={dirRef}
        position={[8, 12, 6]}
        color="#c8d8f0"
        intensity={0.1}
        castShadow
      />
      <directionalLight
        ref={dir2Ref}
        position={[-5, 4, -8]}
        color="#38bdf8"
        intensity={0}
      />
      {/* Rim light */}
      <pointLight position={[-6, 8, -6]} color="#818cf8" intensity={0.5} distance={20} />
    </>
  )
}

/* ─── Scene ──────────────────────────────────────────────── */
function Scene({ phase, isMobile }) {
  return (
    <>
      <Stars
        radius={100}
        depth={60}
        count={isMobile ? 1500 : 3000}
        factor={4}
        saturation={0.4}
        fade
        speed={0.3}
      />
      <Lighting phase={phase} />
      <CameraController phase={phase} isMobile={isMobile} />
      <LaunchPad />
      <RocketMesh launchProgress={phase} />
      <ExhaustParticles phase={phase} isMobile={isMobile} />
      <SmokeParticles phase={phase} isMobile={isMobile} />
      <EngineGlow phase={phase} />
      {/* Atmospheric fog */}
      <fog attach="fog" args={['#080c14', 25, 80]} />
    </>
  )
}

/* ─── Root export ────────────────────────────────────────── */
export default function RocketScene({ phase, onSequenceComplete }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  // Drive phase via rAF
  const animRef = useRef(null)
  const startTime = useRef(null)

  const tick = useCallback(() => {
    if (!startTime.current) startTime.current = performance.now()
    const elapsed = (performance.now() - startTime.current) / 1000
    const p = Math.min(elapsed / TOTAL_DURATION, 1)
    phase.current = p

    if (p >= PORTFOLIO_START / TOTAL_DURATION && onSequenceComplete) {
      const completionProgress = (p - PORTFOLIO_START / TOTAL_DURATION)
        / ((TOTAL_DURATION - PORTFOLIO_START) / TOTAL_DURATION)
      onSequenceComplete(Math.min(completionProgress, 1))
    }

    if (p < 1) {
      animRef.current = requestAnimationFrame(tick)
    }
  }, [phase, onSequenceComplete])

  // Start rAF loop in useEffect (safe: runs only after mount, not during render)
  useEffect(() => {
    const timer = setTimeout(() => {
      animRef.current = requestAnimationFrame(tick)
    }, 400)
    return () => {
      clearTimeout(timer)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [tick])

  return (
    <Canvas
      id="rocket-canvas"
      camera={{ position: [isMobile ? 0 : 6, isMobile ? 3 : 2, isMobile ? 12 : 9], fov: isMobile ? 60 : 50 }}
      gl={{
        antialias: !isMobile,
        alpha: false,
        powerPreference: 'high-performance',
      }}
      dpr={[1, isMobile ? 1.5 : 2]}
      shadows={!isMobile}
      style={{ background: '#080c14' }}
    >
      <Scene phase={phase} isMobile={isMobile} />
    </Canvas>
  )
}
