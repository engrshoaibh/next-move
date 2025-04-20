"use client"

import { useEffect, useState, useRef } from "react"

// Fixed duration for the preloader in milliseconds
const PRELOADER_DURATION = 5000 // 5 seconds

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const preloaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Disable scrolling during preloader
    document.body.style.overflow = "hidden"

    // Set timeout to hide preloader after fixed duration
    const timer = setTimeout(() => {
      if (preloaderRef.current) {
        preloaderRef.current.classList.add("fade-out")

        // Wait for fade-out animation to complete
        setTimeout(() => {
          setIsLoading(false)
          document.body.style.overflow = "auto" // Re-enable scrolling
        }, 800) // Match the fade-out animation duration
      }
    }, PRELOADER_DURATION)

    // Cleanup
    return () => {
      clearTimeout(timer)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div ref={preloaderRef} className="preloader fixed inset-0 z-50 flex items-center justify-center bg-black">
      <svg width="400" height="120" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg" className="w-4/5 max-w-md">
        {/* NEXT */}
        <text
          x="30"
          y="70"
          className="svg-text next-text"
          fontSize="60"
          fontWeight="bold"
          fill="transparent"
          stroke="#ffffff"
          strokeWidth="2"
        >
          NEXT
        </text>

        {/* MOVE */}
        <text
          x="200"
          y="70"
          className="svg-text move-text"
          fontSize="60"
          fontWeight="bold"
          fill="transparent"
          stroke="#ffffff"
          strokeWidth="2"
        >
          MOVE
        </text>
      </svg>
    </div>
  )
}
