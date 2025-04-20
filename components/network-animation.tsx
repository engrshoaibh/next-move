"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { gsap } from "gsap"

export default function NetworkAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const particlesRef = useRef<THREE.Points | null>(null)
  const originalPositionsRef = useRef<Float32Array | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 200

    const posArray = new Float32Array(particlesCount * 3)
    const originalPositions = new Float32Array(particlesCount * 3)

    // Create grid-like structure with some randomness
    const gridSize = Math.ceil(Math.sqrt(particlesCount))
    const spacing = 10 / gridSize

    let index = 0
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (index >= particlesCount) break

        // Calculate grid position with slight randomness
        const x = (i - gridSize / 2) * spacing + (Math.random() - 0.5) * spacing * 0.5
        const y = (j - gridSize / 2) * spacing + (Math.random() - 0.5) * spacing * 0.5
        const z = (Math.random() - 0.5) * 2

        const idx = index * 3
        posArray[idx] = x
        posArray[idx + 1] = y
        posArray[idx + 2] = z

        // Store original positions for reset
        originalPositions[idx] = x
        originalPositions[idx + 1] = y
        originalPositions[idx + 2] = z

        index++
      }
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    originalPositionsRef.current = originalPositions

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.08,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
    })

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)
    particlesRef.current = particlesMesh

    // Lines between particles
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.2,
    })

    const linesGeometry = new THREE.BufferGeometry()
    const lines = new THREE.LineSegments(linesGeometry, linesMaterial)
    scene.add(lines)

    // Mouse position in 3D space
    const mouse3D = new THREE.Vector3(0, 0, 0)
    const mouseSpeed = { value: 0 }
    let lastMouseX = 0
    let lastMouseY = 0

    // Mouse move event
    const handleMouseMove = (event: MouseEvent) => {
      // Calculate mouse speed
      const speedX = Math.abs(event.clientX - lastMouseX)
      const speedY = Math.abs(event.clientY - lastMouseY)
      const speed = Math.sqrt(speedX * speedX + speedY * speedY)

      // Update last position
      lastMouseX = event.clientX
      lastMouseY = event.clientY

      // Smooth speed transition
      gsap.to(mouseSpeed, {
        value: Math.min(speed, 100),
        duration: 0.3,
      })

      // Update 2D mouse position for React state
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      })

      // Convert mouse position to normalized device coordinates (-1 to +1)
      mouse3D.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse3D.y = -(event.clientY / window.innerHeight) * 2 + 1
      mouse3D.z = 0.5 // Set a fixed z-coordinate

      // Break particles when mouse moves fast
      if (speed > 20) {
        breakParticles(mouse3D, speed)
      }
    }

    // Break particles function
    const breakParticles = (mouse: THREE.Vector3, intensity: number) => {
      if (!particlesRef.current || !originalPositionsRef.current) return

      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      const originalPositions = originalPositionsRef.current

      // Convert mouse position to world coordinates
      const mouseWorld = mouse.clone()
      mouseWorld.unproject(camera)
      const dir = mouseWorld.sub(camera.position).normalize()
      const distance = -camera.position.z / dir.z
      const pos = camera.position.clone().add(dir.multiplyScalar(distance))

      // Affect particles based on distance to mouse
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]
        const z = positions[i + 2]

        const distanceToMouse = Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2) + Math.pow(pos.z - z, 2))

        // If close to mouse, push particles away
        if (distanceToMouse < 2) {
          const pushFactor = (1 - distanceToMouse / 2) * (intensity / 50)
          const pushX = (x - pos.x) * pushFactor
          const pushY = (y - pos.y) * pushFactor
          const pushZ = (Math.random() - 0.5) * pushFactor

          // Animate the particle movement
          gsap.to(positions, {
            [i]: x + pushX,
            [i + 1]: y + pushY,
            [i + 2]: z + pushZ,
            duration: 0.5 + Math.random() * 0.5,
            ease: "elastic.out(1, 0.3)",
            onUpdate: () => {
              particlesRef.current!.geometry.attributes.position.needsUpdate = true
            },
          })
        }
      }
    }

    // Reset particles function
    const resetParticles = () => {
      if (!particlesRef.current || !originalPositionsRef.current) return

      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      const originalPositions = originalPositionsRef.current

      for (let i = 0; i < positions.length; i += 3) {
        gsap.to(positions, {
          [i]: originalPositions[i],
          [i + 1]: originalPositions[i + 1],
          [i + 2]: originalPositions[i + 2],
          duration: 1 + Math.random(),
          ease: "elastic.out(1, 0.3)",
          onUpdate: () => {
            particlesRef.current!.geometry.attributes.position.needsUpdate = true
          },
        })
      }
    }

    // Add double click to reset
    const handleDoubleClick = () => {
      resetParticles()
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("dblclick", handleDoubleClick)

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate particles slowly
      if (particlesRef.current) {
        particlesRef.current.rotation.x += 0.0003
        particlesRef.current.rotation.y += 0.0005
      }

      // Update lines
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array
        const linePositions = []

        // Convert mouse position to world coordinates
        const mouseWorld = mouse3D.clone()
        mouseWorld.unproject(camera)
        const dir = mouseWorld.sub(camera.position).normalize()
        const distance = -camera.position.z / dir.z
        const pos = camera.position.clone().add(dir.multiplyScalar(distance))

        for (let i = 0; i < particlesCount; i++) {
          const i3 = i * 3
          const x1 = positions[i3]
          const y1 = positions[i3 + 1]
          const z1 = positions[i3 + 2]

          // Connect to other particles
          for (let j = i + 1; j < particlesCount; j++) {
            const j3 = j * 3
            const x2 = positions[j3]
            const y2 = positions[j3 + 1]
            const z2 = positions[j3 + 2]

            const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2))

            if (distance < 1.5) {
              linePositions.push(x1, y1, z1)
              linePositions.push(x2, y2, z2)
            }
          }

          // Connect to mouse position if close enough
          const distanceToMouse = Math.sqrt(Math.pow(pos.x - x1, 2) + Math.pow(pos.y - y1, 2) + Math.pow(pos.z - z1, 2))

          if (distanceToMouse < 2) {
            linePositions.push(x1, y1, z1)
            linePositions.push(pos.x, pos.y, pos.z)
          }
        }

        linesGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3))
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("dblclick", handleDoubleClick)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className="network-animation" />
}
