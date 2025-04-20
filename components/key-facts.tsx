"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import BubbleAnimation from "./bubble-animation"

export default function KeyFacts() {
  const sectionRef = useRef<HTMLElement>(null)

  const facts = [
    {
      title: "5000+",
      description: "worldwide productive employees",
    },
    {
      title: "Operations",
      description: "from North America to North Africa, Europe and South Asia",
    },
    {
      title: "USD 3 billion +",
      description: "annual business turnover",
    },
    {
      title: "Since 1974",
      description: "a heritage more than 45 years",
    },
    {
      title: "23",
      description: "Business Units in 9 Sectors",
    },
  ]

  useEffect(() => {
    if (typeof window === "undefined") return

    gsap.registerPlugin(ScrollTrigger)

    const title = document.querySelector(".key-facts-title")
    const underline = document.querySelector(".key-facts-underline")
    const factElements = document.querySelectorAll(".key-fact")

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

    factElements.forEach((fact, index) => {
      ScrollTrigger.create({
        trigger: fact,
        start: "top bottom-=100",
        end: "bottom top+=100",
        onEnter: () => {
          gsap.fromTo(
            fact,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.8, delay: index * 0.1, ease: "back.out(1.7)" },
          )
        },
        onEnterBack: () => {
          gsap.fromTo(
            fact,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.8, delay: index * 0.1, ease: "back.out(1.7)" },
          )
        },
        onLeave: () => {
          gsap.to(fact, { scale: 0.8, opacity: 0, duration: 0.8, ease: "power3.in" })
        },
        onLeaveBack: () => {
          gsap.to(fact, { scale: 0.8, opacity: 0, duration: 0.8, ease: "power3.in" })
        },
        toggleActions: "play none play none",
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} id="key-facts" className="relative py-20 bg-primary overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="key-facts-title text-3xl md:text-4xl font-bold text-white text-center mb-4">Key Facts</h2>
        <div className="key-facts-underline w-24 h-1 bg-white mx-auto mb-16"></div>

        <div className="relative">
          <BubbleAnimation />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {facts.map((fact, index) => (
              <div key={index} className="key-fact flex justify-center opacity-0">
                <div className="key-fact-circle">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">{fact.title}</h3>
                  <p className="text-sm text-white text-center">{fact.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
