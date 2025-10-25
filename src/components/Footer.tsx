import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Creative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      {/* Orange top accent line */}
      <div className="h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"></div>
      
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          {/* Company info */}
          <div>
            <div className="mb-4 relative group">
              <div className="flex items-center">
                {/* Logo container */}
                <div className="flex items-center justify-center">
                  <img
                    src="/images/Veeru Infra Logo.png"
                    alt="Company Logo"
                    className="h-10 w-auto"
                    style={{ maxWidth: '180px' }}
                  />
                </div>
              </div>
            </div>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              Building industrial infrastructure excellence for over 30 years with unmatched precision and reliability.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded flex items-center justify-center">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-white text-sm">ISO 9001:2015 Certified</span>
            </div>
          </div>
          
          {/* Quick links */}
          <div className="flex flex-col items-center text-left">
            <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li><Link href="/services" className="text-gray-300 hover:text-white transition-colors block py-1">Services</Link></li>
                <li><Link href="/projects" className="text-gray-300 hover:text-white transition-colors block py-1">Projects</Link></li>
                <li><Link href="/infrastructure" className="text-gray-300 hover:text-white transition-colors block py-1">Infrastructure</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors block py-1">About Us</Link></li>
              </ul>
              <ul className="space-y-2">
                <li><Link href="/certificates" className="text-gray-300 hover:text-white transition-colors block py-1">Certifications</Link></li>
                <li><Link href="/enquiry" className="text-gray-300 hover:text-white transition-colors block py-1">Enquiry</Link></li>
              </ul>
            </div>
          </div>
          
          {/* Contact */}
          <div className="flex flex-col md:items-start md:ml-auto">
            <h3 className="text-white font-semibold mb-4 text-lg">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+918600016632" className="text-gray-300 hover:text-white transition-colors text-sm">+91 8600016632</a>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:veeruinfranag@gmail.com" className="text-gray-300 hover:text-white transition-colors text-sm">veeruinfranag@gmail.com</a>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-300 text-sm">Nagpur, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section with horizontal line */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row md:items-center md:justify-center">
          <div className="flex justify-center mb-6 md:mb-0">
            <p className="text-gray-400 text-sm sm:text-base text-center px-4">
              © 2025 Copyright is reserved to Axcel Solutions.
            </p>
          </div>
          <div className="flex justify-center space-x-4 mt-4 md:mt-0 md:ml-6">
            <a href="https://linkedin.com/company/veeruengineering" target="_blank" rel="noopener noreferrer" className="group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-800 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:bg-orange-500 group-hover:scale-110 group-hover:shadow-lg">
                <svg className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
            </a>
            <a href="https://twitter.com/veeruengineering" target="_blank" rel="noopener noreferrer" className="group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-800 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:bg-orange-500 group-hover:scale-110 group-hover:shadow-lg">
                <svg className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </div>
            </a>
            <a href="https://facebook.com/veeruengineering" target="_blank" rel="noopener noreferrer" className="group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-800 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:bg-orange-500 group-hover:scale-110 group-hover:shadow-lg">
                <svg className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
