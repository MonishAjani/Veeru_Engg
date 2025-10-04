import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-steel-700/60 bg-gradient-to-b from-[#0f172a] via-[#1e3a8a]/90 to-[#0f172a] pt-8 sm:pt-12 pb-4 sm:pb-6">
      <div className="container px-responsive">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 sm:mb-12">
          {/* Company info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 sm:h-12 md:h-14 w-auto bg-transparent p-1 rounded relative group">
                <div className="absolute inset-0 bg-blue-500/10 rounded-lg filter blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src="/images/company Logo -white.png"
                  alt="Veeru Engineering Logo"
                  className="h-full w-auto max-w-[120px] sm:max-w-[140px] md:max-w-[160px] object-contain drop-shadow-lg filter brightness-110 transition-all duration-300 group-hover:brightness-125"
                />
              </div>
            </div>
            <p className="text-steel-300 mb-4">
              Veeru Engineering - Delivering excellence in industrial fabrication, erection, and piping projects since 1995.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-steel-300 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg>
              </a>
              <a href="#" className="text-steel-300 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
              </a>
              <a href="#" className="text-steel-300 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div className="mt-6 sm:mt-0">
            <h3 className="text-white font-semibold mb-4 text-lg sm:text-xl">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link href="/about" className="text-steel-300 hover:text-white transition-colors block py-1">About Us</Link></li>
              <li><Link href="/services" className="text-steel-300 hover:text-white transition-colors block py-1">Services</Link></li>
              <li><Link href="/projects" className="text-steel-300 hover:text-white transition-colors block py-1">Projects</Link></li>
              <li><Link href="/certificates" className="text-steel-300 hover:text-white transition-colors block py-1">Certificates</Link></li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="mt-6 sm:mt-0">
            <h3 className="text-white font-semibold mb-4 text-lg sm:text-xl">Our Services</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="#" className="text-steel-300 hover:text-white transition-colors block py-1">Structural Fabrication</a></li>
              <li><a href="#" className="text-steel-300 hover:text-white transition-colors block py-1">Industrial Piping</a></li>
              <li><a href="#" className="text-steel-300 hover:text-white transition-colors block py-1">Heavy Equipment</a></li>
              <li><a href="#" className="text-steel-300 hover:text-white transition-colors block py-1">Factory Sheds</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="mt-6 sm:mt-0">
            <h3 className="text-white font-semibold mb-4 text-lg sm:text-xl">Contact Us</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-brand-blue mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-steel-300 text-sm sm:text-base">Plot No. C-27, Sadachar Society, Dattawadi, Amravati Road, NAGPUR-440023</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-brand-blue mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-steel-300 text-sm sm:text-base">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-brand-blue mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-steel-300 text-sm sm:text-base">info@veeruengineering.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-steel-700/30 pt-4 sm:pt-6 flex flex-col md:flex-row md:items-center md:justify-between text-steel-400">
          <p className="text-xs sm:text-sm text-center md:text-left">© {new Date().getFullYear()} Veeru Engineering. All rights reserved.</p>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-3 sm:gap-x-4 gap-y-2 mt-3 md:mt-0">
            <span className="inline-flex items-center text-xs sm:text-sm">
              <span className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-green-500 mr-1 sm:mr-2"></span>
              GST Compliant
            </span>
            <span className="inline-flex items-center text-xs sm:text-sm">
              <span className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-green-500 mr-1 sm:mr-2"></span>
              MSME Registered
            </span>
            <span className="inline-flex items-center text-xs sm:text-sm">
              <span className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-green-500 mr-1 sm:mr-2"></span>
              PF Registered
            </span>
            <span className="inline-flex items-center text-xs sm:text-sm">
              <span className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-green-500 mr-1 sm:mr-2"></span>
              PAN Verified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
