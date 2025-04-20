"use client"

import { useEffect, useRef } from "react"

export default function BubbleAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const containerWidth = container.offsetWidth
    const containerHeight = container.offsetHeight

    // Create bubbles
    const bubbleCount = 15

    for (let i = 0; i < bubbleCount; i++) {
      const bubble = document.createElement("div")
      bubble.classList.add("bubble")

      // Random size
      const size = Math.random() * 100 + 20
      bubble.style.width = `${size}px`
      bubble.style.height = `${size}px`

      // Random position
      const left = Math.random() * containerWidth
      const top = Math.random() * containerHeight
      bubble.style.left = `${left}px`
      bubble.style.top = `${top}px`

      // Random animation delay
      bubble.style.animationDelay = `${Math.random() * 5}s`

      // Random opacity
      bubble.style.opacity = `${Math.random() * 0.3 + 0.1}`

      container.appendChild(bubble)
    }

    // Cleanup
    return () => {
      const bubbles = container.querySelectorAll(".bubble")
      bubbles.forEach((bubble) => container.removeChild(bubble))
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden" />
}
