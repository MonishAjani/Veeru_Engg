'use client';

import Link from 'next/link'
import { useState } from 'react';

const links = [
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/infrastructure', label: 'Infrastructure' },
  { href: '/projects', label: 'Projects' },
  { href: '/certificates', label: 'Certificates' },
]

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#0f172a] backdrop-blur-md w-full shadow-lg">
      <div className="container-nav flex h-16 sm:h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 ml-2 sm:ml-4 md:ml-8">
          <div className="h-10 sm:h-12 md:h-16 w-auto bg-transparent p-1 rounded relative group">
            <div className="absolute inset-0 bg-blue-500/10 rounded-lg filter blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img
              src="/images/company Logo -white.png"
              alt="Veeru Engineering Logo"
              className="h-full w-auto max-w-[120px] sm:max-w-[150px] md:max-w-[180px] object-contain drop-shadow-lg filter brightness-110 transition-all duration-300 group-hover:brightness-125"
            />
          </div>
        </Link>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden rounded-md p-2 mr-2 text-steel-100 hover:bg-gradient-blue focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-6 mr-2 sm:mr-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-steel-100 hover:text-white transition-colors text-sm lg:text-base px-2 py-1"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 rounded-md bg-gradient-blue px-3 py-1.5 lg:px-4 lg:py-2 text-sm lg:text-base text-white hover:shadow-lg transition-all shadow-metal"
          >
            Contact Us
          </Link>
        </nav>
      </div>
      
      {/* Mobile menu */}
      <div
        className={`md:hidden ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden transition-all duration-300 ease-in-out bg-gradient-card shadow-metal`}
        aria-hidden={!isMenuOpen}
      >
        <nav className="flex flex-col space-y-2 px-4 pb-4 pt-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-steel-100 hover:text-white py-2 flex items-center justify-center text-lg border-b border-steel-700/20"
              onClick={() => setIsMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-steel-100 hover:text-white py-3 mt-2 flex items-center justify-center bg-gradient-blue rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
