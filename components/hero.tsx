"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Ensure video plays automatically and handles loading
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay was prevented:", error)
      })
    }
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <video ref={videoRef} autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="https://res.cloudinary.com/db8d9l4jw/video/upload/v1745060534/1471970_People_3840x2160_ilrumt.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          NEXT MOVE GROUP
        </motion.h1>

        <motion.h2
          className="text-xl md:text-2xl lg:text-3xl text-white mb-8 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          OF COMPANIES
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href="#who-we-are"
            className="inline-block bg-white text-primary px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </section>
  )
}
