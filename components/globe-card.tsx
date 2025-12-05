"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Image from "next/image"
import * as THREE from "three"

const logos = [
  { src: "/logos/3-logo.png", alt: "3", width: 60, height: 30 },
  { src: "/logos/telia-logo.png", alt: "Telia", width: 100, height: 50 },
  { src: "/logos/tele2-logo.png", alt: "Tele2", width: 110, height: 50 },
  { src: "/logos/telenor-logo.png", alt: "Telenor", width: 150, height: 70 },
  { src: "/logos/telnect-logo.svg", alt: "Telnect", width: 140, height: 62 },
]

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function MatrixGlobe() {
  const pointsRef = useRef<THREE.Points>(null)
  const timeRef = useRef(0)

  // Generate points on a sphere using Fibonacci sphere algorithm for even distribution
  const particles = useMemo(() => {
    const count = 800
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const phases = new Float32Array(count)

    const goldenRatio = (1 + Math.sqrt(5)) / 2
    const angleIncrement = Math.PI * 2 * goldenRatio

    for (let i = 0; i < count; i++) {
      // Fibonacci sphere distribution
      const t = i / count
      const inclination = Math.acos(1 - 2 * t)
      const azimuth = angleIncrement * i

      const radius = 3.8
      const x = radius * Math.sin(inclination) * Math.cos(azimuth)
      const y = radius * Math.sin(inclination) * Math.sin(azimuth)
      const z = radius * Math.cos(inclination)

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      // Base color (blue)
      colors[i * 3] = 0.24
      colors[i * 3 + 1] = 0.4
      colors[i * 3 + 2] = 0.99

      // Deterministic pseudo-random size variation
      sizes[i] = pseudoRandom(i + 1) * 0.08 + 0.04

      // Deterministic pseudo-random phase distribution
      phases[i] = pseudoRandom(i + count + 1) * Math.PI * 2
    }

    return { positions, colors, sizes, phases, count }
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return

    timeRef.current += 0.02

    const colors = pointsRef.current.geometry.attributes.color.array as Float32Array
    const sizes = pointsRef.current.geometry.attributes.size.array as Float32Array

    // Animate dots with Poisson noise distribution
    for (let i = 0; i < particles.count; i++) {
      // Use Poisson-like distribution for lighting up dots
      const phase = particles.phases[i]
      const noise = Math.sin(timeRef.current * 0.5 + phase) * 0.5 + 0.5
      const poissonNoise = Math.pow(noise, 3) // Cubic for more dramatic effect

      // Randomly light up dots based on Poisson distribution
      const shouldLight = Math.random() < 0.02 // 2% chance per frame
      const intensity = shouldLight ? 1 : poissonNoise * 0.3 + 0.3

      // Interpolate between blue and bright cyan/white
      colors[i * 3] = 0.24 + intensity * 0.76 // R
      colors[i * 3 + 1] = 0.4 + intensity * 0.6 // G
      colors[i * 3 + 2] = 0.99 // B stays high

      // Pulse size
      sizes[i] = (particles.sizes[i] + intensity * 0.15) * (1 + Math.sin(timeRef.current + phase) * 0.2)
    }

    pointsRef.current.geometry.attributes.color.needsUpdate = true
    pointsRef.current.geometry.attributes.size.needsUpdate = true

    pointsRef.current.rotation.y += 0.015
    pointsRef.current.rotation.x += 0.005
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute attach="attributes-color" count={particles.count} array={particles.colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={particles.count} array={particles.sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export function GlobeCard() {
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const activeLogo = logos[currentLogoIndex] || logos[0]

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = logos.map((logo) => {
        return new Promise((resolve, reject) => {
          if (typeof window !== 'undefined') {
            const img = window.Image ? new window.Image() : document.createElement('img')
            img.src = logo.src
            img.onload = resolve
            img.onerror = reject
          } else {
            resolve(true)
          }
        })
      })

      try {
        await Promise.all(imagePromises)
        setImagesLoaded(true)
      } catch (error) {
        console.error("[v0] Failed to preload images:", error)
        // Still set to true to prevent infinite loading
        setImagesLoaded(true)
      }
    }

    preloadImages()
  }, [])

  useEffect(() => {
    if (!imagesLoaded) return

    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentLogoIndex((prev) => (prev + 1) % logos.length)
        setIsTransitioning(false)
      }, 300)
    }, 3000)

    return () => clearInterval(interval)
  }, [imagesLoaded])

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl" style={{ width: "100%", height: "100%" }}>
      <div className="absolute inset-0" style={{ width: "100%", height: "100%" }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 40 }} style={{ width: "100%", height: "100%" }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <MatrixGlobe />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Canvas>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="transition-all duration-300"
          style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? "scale(0.9)" : "scale(1)",
          }}
        >
          <Image
            src={activeLogo?.src ?? "/placeholder.svg"}
            alt={activeLogo?.alt ?? "Operator logo"}
            width={activeLogo?.width ?? 96}
            height={activeLogo?.height ?? 48}
            className="object-contain drop-shadow-lg transition-all duration-300"
            priority
          />
        </div>
      </div>
    </div>
  )
}
