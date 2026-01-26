import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Float,
  Stars,
  Icosahedron,
  Sparkles,
  Points,
  PointMaterial,
  Trail,
  Text
} from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

// CYBER CORE 
function CyberCore() {
  const coreRef = useRef()
  const wireRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const pulse = 1.5 + Math.sin(t * 2) * 0.08 

    coreRef.current.rotation.x = t * 0.15
    coreRef.current.rotation.y = t * 0.2
    wireRef.current.rotation.copy(coreRef.current.rotation)

    coreRef.current.scale.setScalar(pulse)
    wireRef.current.scale.setScalar(pulse * 1.03)
  })

  return (
    <group>
      <Icosahedron args={[1, 1]} ref={coreRef}>
        <meshStandardMaterial
          color="#2563eb"
          emissive="#1e40af"
          emissiveIntensity={2}
          roughness={0.25}
          metalness={1}
        />
      </Icosahedron>

      <Icosahedron args={[1, 1]} ref={wireRef}>
        <meshStandardMaterial
          wireframe
          transparent
          opacity={0.35}
          color="#93c5fd"
          emissive="#60a5fa"
        />
      </Icosahedron>
    </group>
  )
}

// FLOWING SPARKS
function FaceFlowSparks({ count = 900 }) {
  const ref = useRef()

  const { positions, speeds } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.02, 1)
    const edges = new THREE.EdgesGeometry(geo)
    const pos = edges.attributes.position.array
    const points = new Float32Array(count * 3)
    const speedArr = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const idx = (Math.floor(Math.random() * (pos.length / 3)) * 3)
      points[i * 3] = pos[idx]
      points[i * 3 + 1] = pos[idx + 1]
      points[i * 3 + 2] = pos[idx + 2]
      speedArr[i] = 0.2 + Math.random() * 0.5 
    }
    return { positions: points, speeds: speedArr }
  }, [count])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const arr = ref.current.geometry.attributes.position.array

    for (let i = 0; i < count; i++) {
      arr[i * 3] *= 1 + Math.sin(t * speeds[i]) * 0.0003
      arr[i * 3 + 1] *= 1 + Math.cos(t * speeds[i]) * 0.0003
      arr[i * 3 + 2] *= 1 + Math.sin(t * speeds[i]) * 0.0003
    }
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.rotation.y += 0.002
  })

  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial size={0.03} color="#7dd3fc" transparent opacity={0.95} depthWrite={false} />
    </Points>
  )
}

// ENERGY TRAILS 
function EnergyTrail({ radius, speed = 1, color }) {
  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed * 0.8
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t * 1.7) * 0.4, Math.sin(t) * radius)
  })
  return (
    <Trail width={0.12} length={6} color={color} attenuation={(t) => t * t}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.045]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Trail>
  )
}

// FLOATING BINARY 
function BinaryParticles({ count = 40 }) {
    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 12  
            const y = (Math.random() - 0.5) * 8   
            const z = (Math.random() - 0.5) * 8   
            const val = Math.random() > 0.5 ? '1' : '0'
            const size = 0.2 + Math.random() * 0.5 
            temp.push({ position: [x, y, z], val, size })
        }
        return temp
    }, [count])

    return (
        <group>
            {particles.map((data, i) => (
                <Float 
                    key={i} 
                    speed={1 + Math.random()} 
                    rotationIntensity={0.5} 
                    floatIntensity={0.5}
                >
                    <Text 
                        position={data.position} 
                        fontSize={data.size} 
                        color="#4299e1" 
                        fillOpacity={0.3 + Math.random() * 0.4} 
                    >
                        {data.val}
                    </Text>
                </Float>
            ))}
        </group>
    )
}
// MOVING STARS 
function MovingStars() {
    const starsRef = useRef()
    
    useFrame((state) => {
        starsRef.current.rotation.y = state.clock.elapsedTime * 0.05 
        starsRef.current.rotation.x = state.clock.elapsedTime * 0.01
    })

    return (
        <group ref={starsRef}>
            <Stars 
                radius={100} 
                depth={50} 
                count={5000} 
                factor={4} 
                saturation={0} 
                fade 
                speed={1.5} 
            />
        </group>
    )
}

// MAIN COMPONENT
export default function HeroAI() {
  return (
    <div className="absolute inset-0 bg-[#020617] w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        
        {/* Lights */}
        <ambientLight intensity={1} />
        <pointLight position={[6, 6, 6]} intensity={4} />

        {/* Floating Core & Elements */}
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <CyberCore />
          <FaceFlowSparks />
          
          <EnergyTrail radius={2.2} color="#38bdf8" />
          <EnergyTrail radius={2.9} speed={1.2} color="#a855f7" />
          <EnergyTrail radius={3.5} speed={0.9} color="#2563eb" />
          
          <Sparkles count={100} scale={6} size={2} speed={0.2} opacity={0.5} />
          
          <BinaryParticles count={20} />
        </Float>

        {/* Moving Stars */}
        <MovingStars />
        
        {/* Fog */}
        <fog attach="fog" args={['#020617', 5, 150]} />

        {/* Glow */}
        <EffectComposer>
          <Bloom intensity={2} luminanceThreshold={0.25} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}