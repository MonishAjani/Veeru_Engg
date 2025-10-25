'use client';
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react';

const links = [
  { href: '/about', label: 'About' },
  { href: '/infrastructure', label: 'Infrastructure' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/certificates', label: 'Certifications' },
  { href: '/enquiry', label: 'Enquiry' },
]

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 bg-white w-full shadow-sm border-b border-gray-100">
      {/* Orange top line with gradient */}
      <div className="h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"></div>
      
      <div className="container mx-auto px-4 flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center group">
          <div className="flex items-center">
            {/* Logo container */}
            <div className="flex items-center justify-center">
              <img
                src="/images/Veeru Infra Logo.png"
                alt="Veeru Engineering Logo"
                className="h-8"
                style={{ width: '70px' }}
              />
            </div>
            {/* No orange accent on hover */}
          </div>
        </Link>
        
        {/* Mobile menu button - improved touch target */}
        <button
          className="md:hidden rounded-md p-3 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-4 bg-orange-500 text-white px-4 py-1.5 rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm"
          >
            Contact Us
          </Link>
        </nav>
      </div>
      
      {/* Mobile menu */}
      <div
        className={`md:hidden ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden transition-all duration-300 ease-in-out bg-white shadow-lg border-t border-gray-100`}
        aria-hidden={!isMenuOpen}
      >
        <nav className="flex flex-col space-y-0 px-4 pb-4 pt-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-gray-700 hover:text-gray-900 py-3.5 flex items-center text-base font-medium border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-white py-3 mt-3 flex items-center justify-center bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors font-medium text-base"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
