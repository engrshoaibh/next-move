"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"

export default function BusinessSectors() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const sectors = [
    {
      name: "Construction",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1470&auto=format&fit=crop",
      description: "Leading construction projects across residential, commercial, and infrastructure sectors.",
      stats: ["250+ Projects", "5000+ Workers", "15 Countries"],
      year: "Since 1985",
    },
    {
      name: "Shopping & Retail",
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1470&auto=format&fit=crop",
      description: "Operating premium shopping malls and retail outlets across major metropolitan areas.",
      stats: ["35+ Malls", "2000+ Retail Partners", "10M+ Monthly Visitors"],
      year: "Since 1992",
    },
    {
      name: "Real Estate",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1473&auto=format&fit=crop",
      description: "Developing and managing premium residential and commercial properties worldwide.",
      stats: ["100+ Properties", "$5B+ Portfolio", "12 Cities"],
      year: "Since 1974",
    },
    {
      name: "Education",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1471&auto=format&fit=crop",
      description: "Providing quality education through schools, colleges, and training institutes.",
      stats: ["25+ Institutions", "50,000+ Students", "8 Countries"],
      year: "Since 1998",
    },
    {
      name: "Industrial",
      image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=1374&auto=format&fit=crop",
      description: "Manufacturing and industrial operations spanning multiple sectors and technologies.",
      stats: ["15 Manufacturing Plants", "3000+ Employees", "20+ Product Lines"],
      year: "Since 1980",
    },
    {
      name: "IT",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1470&auto=format&fit=crop",
      description: "Cutting-edge technology solutions and services for businesses and consumers.",
      stats: ["500+ Tech Experts", "300+ Clients", "24/7 Support"],
      year: "Since 2005",
    },
    {
      name: "Oil & Gas",
      image: "https://images.unsplash.com/photo-1695060601967-7fb135446f67?q=80&w=1470&auto=format&fit=crop",
      description: "Exploration, production, and distribution of oil and gas resources globally.",
      stats: ["10+ Oil Fields", "5 Refineries", "3 Distribution Networks"],
      year: "Since 1978",
    },
    {
      name: "Healthcare",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1453&auto=format&fit=crop",
      description: "Operating hospitals, clinics, and healthcare services with cutting-edge medical technology.",
      stats: ["20+ Hospitals", "1000+ Doctors", "2M+ Patients Annually"],
      year: "Since 1990",
    },
    {
      name: "Sports & Leisure",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1468&auto=format&fit=crop",
      description: "Managing sports facilities, teams, and leisure destinations for entertainment and recreation.",
      stats: ["15 Sports Complexes", "5 Professional Teams", "10M+ Annual Visitors"],
      year: "Since 2000",
    },
  ]

  useEffect(() => {
    if (typeof window === "undefined") return

    gsap.registerPlugin(ScrollTrigger)

    // Set up GSAP animations for sector cards
    const cards = document.querySelectorAll(".sector-card")

    cards.forEach((card, index) => {
      const image = card.querySelector(".card-image")
      const content = card.querySelector(".sector-card-content")
      const details = card.querySelector(".sector-card-details")

      // Set initial state
      gsap.set(image, { scale: 1 })
      gsap.set(content, { y: 20, opacity: 0.8 })
      gsap.set(details, { opacity: 0, y: 20 })

      // Create hover animations
      card.addEventListener("mouseenter", () => {
        gsap.to(image, { scale: 1.2, duration: 0.8, ease: "power2.out" })
        gsap.to(content, { y: -60, opacity: 1, duration: 0.5, ease: "power2.out" })
        gsap.to(details, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
      })

      card.addEventListener("mouseleave", () => {
        gsap.to(image, { scale: 1, duration: 0.5, ease: "power2.out" })
        gsap.to(content, { y: 20, opacity: 0.8, duration: 0.5, ease: "power2.out" })
        gsap.to(details, { opacity: 0, y: 20, duration: 0.5, ease: "power2.out" })
      })

      // Create scroll animations
      ScrollTrigger.create({
        trigger: card,
        start: "top bottom-=100",
        end: "bottom top+=100",
        onEnter: () => {
          gsap.fromTo(
            card,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, delay: index * 0.1, ease: "power3.out" },
          )
        },
        onEnterBack: () => {
          gsap.fromTo(
            card,
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, delay: index * 0.1, ease: "power3.out" },
          )
        },
        onLeave: () => {
          gsap.to(card, { y: -50, opacity: 0, duration: 0.8, ease: "power3.in" })
        },
        onLeaveBack: () => {
          gsap.to(card, { y: 50, opacity: 0, duration: 0.8, ease: "power3.in" })
        },
        toggleActions: "play none play none",
      })
    })

    // Create stagger effect for section title
    const title = document.querySelector(".business-sectors-title")
    const underline = document.querySelector(".business-sectors-underline")

    if (title && underline) {
      ScrollTrigger.create({
        trigger: title,
        start: "top bottom-=100",
        end: "bottom top+=100",
        onEnter: () => {
          gsap.fromTo(title, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
          gsap.fromTo(
            underline,
            { width: 0, opacity: 0 },
            { width: "6rem", opacity: 1, duration: 0.8, delay: 0.3, ease: "power3.out" },
          )
        },
        onEnterBack: () => {
          gsap.fromTo(title, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
          gsap.fromTo(
            underline,
            { width: 0, opacity: 0 },
            { width: "6rem", opacity: 1, duration: 0.8, delay: 0.3, ease: "power3.out" },
          )
        },
        onLeave: () => {
          gsap.to(title, { y: -50, opacity: 0, duration: 0.8, ease: "power3.in" })
          gsap.to(underline, { width: 0, opacity: 0, duration: 0.5, ease: "power3.in" })
        },
        onLeaveBack: () => {
          gsap.to(title, { y: 50, opacity: 0, duration: 0.8, ease: "power3.in" })
          gsap.to(underline, { width: 0, opacity: 0, duration: 0.5, ease: "power3.in" })
        },
        toggleActions: "play none play none",
      })
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", () => {})
        card.removeEventListener("mouseleave", () => {})
      })
    }
  }, [])

  return (
    <section ref={sectionRef} id="business-sectors" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="business-sectors-title text-3xl md:text-4xl font-bold text-primary text-center mb-4">
          Business Sectors
        </h2>
        <div className="business-sectors-underline w-24 h-1 bg-primary mx-auto mb-16"></div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector, index) => (
            <div key={index} className="sector-card rounded-lg overflow-hidden shadow-lg h-80 cursor-pointer">
              <div className="relative w-full h-full overflow-hidden">
                <div className="card-image-container absolute inset-0 overflow-hidden">
                  <Image
                    src={sector.image || "/placeholder.svg"}
                    alt={sector.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="card-image object-cover"
                  />
                </div>

                <div className="sector-card-content absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-xl font-semibold text-white">{sector.name}</h3>
                </div>

                <div className="sector-card-details absolute inset-0 flex flex-col justify-end p-4 bg-black/80 opacity-0">
                  <h3 className="text-xl font-semibold text-white mb-2">{sector.name}</h3>
                  <p className="text-white/80 text-sm mb-4">{sector.description}</p>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {sector.stats.map((stat, i) => (
                      <div key={i} className="bg-white/10 rounded px-2 py-1">
                        <p className="text-white text-xs">{stat}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-xs">{sector.year}</span>
                    <button className="flex items-center text-white text-sm group">
                      Learn More{" "}
                      <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-500 mt-8 text-center">
          Images courtesy of Unsplash. Used for demonstration purposes only.
        </div>
      </div>
    </section>
  )
}
