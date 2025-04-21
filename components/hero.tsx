"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentText, setCurrentText] = useState(0)
  const [videoSrc, setVideoSrc] = useState("")

  useEffect(() => {
    // Determine user's location and set the video source
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        const country = data.country_code
        if (["AE", "SA", "BH"].includes(country)) {
          setVideoSrc("https://res.cloudinary.com/db8d9l4jw/video/upload/v1745170510/uae_gcbkq7.webm")
        } else if (["US", "GB"].includes(country)) {
          setVideoSrc("https://example.com/us-uk-video.webm")
        } else {
          setVideoSrc("https://res.cloudinary.com/db8d9l4jw/video/upload/v1745060534/1471970_People_3840x2160_ilrumt.webm")
        }
      })
      .catch(() => {
        // Fallback if geolocation fails
        setVideoSrc("https://res.cloudinary.com/db8d9l4jw/video/upload/v1745060534/1471970_People_3840x2160_ilrumt.webm")
      })
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay was prevented:", error)
      })
    }

    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % 3)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const texts = [
    "Innovative Solutions.",
    "Proven Results.",
    "Transforming Enterprises."
  ]

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        {videoSrc && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Empowering Your Business for Growth
        </motion.h1>

        <motion.h2
          className="text-xl md:text-2xl lg:text-3xl text-white mb-8 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            key={currentText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            style={{
              textTransform: "uppercase",
              fontFamily: "Open Sans, sans-serif",
              fontWeight: "bold",
              fontSize: "2rem"
            }}
          >
            {texts[currentText]}
          </motion.div>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href="#who-we-are"
            className="inline-block bg-white text-primary px-8 py-3 rounded-full font-medium transition-colors duration-300 hover:bg-[#002868] hover:text-white"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </section>
  )
}
