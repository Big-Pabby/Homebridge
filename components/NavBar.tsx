'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-hb-border-light">
        <div className="max-w-360 mx-auto px-8 lg:px-16 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Homebridge" width={33} height={37} />
            <span className="text-2xl font-semibold -tracking-wider">
              Homebridge
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#about"
              className="label-sm text-hb-text-primary hover:text-hb-primary transition-colors"
            >
              About
            </a>
            <a
              href="#how-it-works"
              className="label-sm text-hb-text-primary hover:text-hb-primary transition-colors"
            >
              How it works
            </a>
            <a
              href="#features"
              className="label-sm text-hb-text-primary hover:text-hb-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="label-sm text-hb-text-primary hover:text-hb-primary transition-colors"
            >
              Pricing
            </a>
          </nav>
          
          <div className="hidden md:block">
            <Button className="bg-hb-primary hover:bg-hb-primary/90 text-white rounded-lg px-6">
              Download App
            </Button>
          </div>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-hb-text-primary hover:text-hb-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-5 border-b border-hb-border-light">
            <Image src="/logo.svg" alt="Homebridge" width={33} height={37} />
            <button
              onClick={closeMobileMenu}
              className="p-2 text-hb-text-primary hover:text-hb-primary transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col p-6 gap-6">
            <a
              href="#about"
              onClick={closeMobileMenu}
              className="text-lg text-hb-text-primary hover:text-hb-primary transition-colors"
            >
              About
            </a>
            <a
              href="#how-it-works"
              onClick={closeMobileMenu}
              className="text-lg text-hb-text-primary hover:text-hb-primary transition-colors"
            >
              How it works
            </a>
            <a
              href="#features"
              onClick={closeMobileMenu}
              className="text-lg text-hb-text-primary hover:text-hb-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              onClick={closeMobileMenu}
              className="text-lg text-hb-text-primary hover:text-hb-primary transition-colors"
            >
              Pricing
            </a>
          </nav>

          <div className="mt-auto p-6">
            <Button className="w-full bg-hb-primary hover:bg-hb-primary/90 text-white rounded-lg px-6">
              Download App
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default NavBar