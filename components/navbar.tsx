"use client"

import type React from "react"
import { useState } from "react"
import { Menu, X, Linkedin } from "lucide-react"
import { scrollToSection } from "@/lib/smooth-scroll"
import Link from "next/link"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault()
    scrollToSection(target)
    if (isMenuOpen) setIsMenuOpen(false)
  }

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-4 md:px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl md:text-2xl font-bold" >
          NEXT MOVE
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#who-we-are"
            className="text-white hover:text-gray-300 transition-colors"
            onClick={(e) => handleNavClick(e, "#who-we-are")}
          >
            WHO WE ARE
          </a>
          <a
            href="#business-sectors"
            className="text-white hover:text-gray-300 transition-colors"
            onClick={(e) => handleNavClick(e, "#business-sectors")}
          >
            BUSINESS SECTORS
          </a>
          <a
            href="#careers"
            className="text-white hover:text-gray-300 transition-colors"
            onClick={(e) => handleNavClick(e, "#careers")}
          >
            CAREERS
          </a>
          <Link
            href="/contact"
            className="text-white hover:text-gray-300 transition-colors"
          >
            CONTACT US
          </Link>
          <a
            href="https://linkedin.com"
            target="_blank"
            className="text-white hover:text-gray-300 transition-colors"
            rel="noreferrer"
          >
            <Linkedin size={20} />
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-primary p-4">
          <div className="flex flex-col space-y-4">
            <a
              href="#who-we-are"
              className="text-white hover:text-gray-300 transition-colors"
              onClick={(e) => handleNavClick(e, "#who-we-are")}
            >
              WHO WE ARE
            </a>
            <a
              href="#business-sectors"
              className="text-white hover:text-gray-300 transition-colors"
              onClick={(e) => handleNavClick(e, "#business-sectors")}
            >
              BUSINESS SECTORS
            </a>
            <a
              href="#careers"
              className="text-white hover:text-gray-300 transition-colors"
              onClick={(e) => handleNavClick(e, "#careers")}
            >
              CAREERS
            </a>
            <Link
              href="/contact"
              className="text-white hover:text-gray-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              CONTACT US
            </Link>
            <a
              href="https://linkedin.com"
              target="_blank"
              className="text-white hover:text-gray-300 transition-colors"
              rel="noreferrer"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
