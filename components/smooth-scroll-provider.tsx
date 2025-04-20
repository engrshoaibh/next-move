"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { initSmoothScroll } from "@/lib/smooth-scroll"

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Initialize smooth scrolling
    const lenis = initSmoothScroll()
    setIsReady(true)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
