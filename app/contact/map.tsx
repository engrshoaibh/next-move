"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    const loadMap = async () => {
      // Check if map is already initialized
      if (typeof window !== "undefined" && mapRef.current) {
        // Dynamically import Leaflet to avoid SSR issues
        const L = (await import("leaflet")).default

        // Check if the Leaflet CSS is already added to the document
        if (!document.querySelector('link[href*="leaflet.css"]')) {
          const link = document.createElement("link")
          link.rel = "stylesheet"
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          link.crossOrigin = ""
          document.head.appendChild(link)
        }

        // Initialize the map only if it's not already initialized
        if (!(mapRef.current as any)._leaflet_id) {
          const map = L.map(mapRef.current).setView([40.7128, -74.006], 14) // New York coordinates

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map)

          const marker = L.marker([40.7128, -74.006]).addTo(map)
          marker.bindPopup("<b>NEXT MOVE</b><br>1234 Business Avenue<br>New York, NY 10001").openPopup()

          // Fix the map size issue by triggering a resize after the map is loaded
          setTimeout(() => {
            map.invalidateSize()
          }, 100)
        }
      }
    }

    if (hasMounted) {
      loadMap()
    }

    return () => {
      // Optional cleanup (if needed, but check map instance before cleanup)
      if (mapRef.current) {
        while (mapRef.current.firstChild) {
          mapRef.current.removeChild(mapRef.current.firstChild)
        }
      }
    }
  }, [hasMounted])

  if (!hasMounted) return null

  return (
    <Card className="border-none shadow-2xl overflow-hidden bg-white/10 backdrop-blur-md">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-white mb-2">Our Location</h2>
        <p className="text-gray-200 mb-4">Visit us at our headquarters in New York City</p>
      </div>
      <div ref={mapRef} className="h-[400px] w-full"></div>
    </Card>
  )
}
