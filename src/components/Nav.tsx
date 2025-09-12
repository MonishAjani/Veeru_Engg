'use client';

import Link from 'next/link'
import { useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/infrastructure', label: 'Infrastructure' },
  { href: '/projects', label: 'Projects' },
  { href: '/certificates', label: 'Certificates' },
]

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 border-b border-steel-700/60 bg-gradient-to-b from-black/80 to-steel-900/80 backdrop-blur-md w-full">
      <div className="container-nav flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-brand-blue flex items-center justify-center">
            <span className="font-bold text-white">IC</span>
          </div>
          <span className="font-semibold text-white">InfraCorp</span>
        </Link>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden rounded-md p-2 text-steel-200 hover:bg-steel-800/50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-steel-200 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 rounded-md bg-brand-blue px-4 py-2 text-white hover:bg-opacity-90 transition-colors"
          >
            Contact Us
          </Link>
        </nav>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'max-h-[500px]' : 'max-h-0'} overflow-hidden transition-all duration-300 ease-in-out`}>
        <nav className="flex flex-col space-y-4 px-2 pb-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-steel-200 hover:text-white py-3 border-b border-steel-700/30 flex items-center justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-steel-200 hover:text-white py-2 border-b border-steel-700/30"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}

