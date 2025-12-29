
'use client';

import { useState, useEffect, useRef } from 'react';
import CountUp from '../../../components/CountUp';
import Image from 'next/image';

export default function InfrastructurePage() {
  const [expandedTables, setExpandedTables] = useState({
    mechanical: false,
    civil: false,
    staff: false,
    worker: false
  });

  const toggleTable = (tableName) => {
    setExpandedTables({
      ...expandedTables,
      [tableName]: !expandedTables[tableName]
    });
  };
  // Parallax effect for hero section
  const heroRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY;
        const heroElement = heroRef.current;
        
        // Reduced parallax effect to ensure image remains visible
        const parallaxSpeed = 0.2;
        const yPos = scrollPosition * parallaxSpeed;
        
        // Apply gentler parallax effect to background image
        heroElement.style.backgroundPosition = `center calc(50% - ${yPos}px)`;
        
        // Fade out text as user scrolls down
        const opacity = Math.max(1 - scrollPosition / 500, 0);
        const heroContent = heroElement.querySelector('.hero-content');
        if (heroContent) {
          heroContent.style.opacity = opacity;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div>
      {/* Custom Hero Section with Bulldozer Image */}
      <section className="relative overflow-hidden">
        {/* Hero container with image and content */}
        <div
          ref={heroRef}
          className="relative min-h-[95vh] flex items-center justify-center"
        >
          {/* Background image container with mask */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 h-full"
              style={{
                backgroundImage: 'url("/images/infrastructure/Veeru Infrastructure Website.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                // Removed mask image to show full image
              }}
            ></div>
            
            {/* Subtle dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-transparent"></div>
            
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 to-blue-900/20 animate-gradient-x"></div>
          </div>
          
          {/* White content area that blends with the image - using only the wavy SVG */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto translate-y-1">
              <path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
          
          {/* Hero content */}
          <div className="container px-4 sm:px-6 md:px-8 relative z-10 hero-content">
            <div className="max-w-3xl mx-auto text-center">
              {/* Orange badge */}
              <div className="inline-flex items-center gap-2 bg-orange-500 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-white mb-4 animate-bounce">
                <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Excellence in Engineering</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
                Our <span className="text-orange-500">Infrastructure</span>
              </h1>
              
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-white/90 max-w-2xl mx-auto drop-shadow-md">
                Advanced facilities and equipment that enable us to deliver exceptional quality and efficiency.
              </p>
            </div>
          </div>
        </div>
        
        {/* Content */}
        {/* <div className="container px-4 sm:px-6 md:px-8 relative z-10 hero-content">
          <div className="max-w-3xl mx-auto text-center"> */}
            {/* Orange badge */}
            {/* <div className="inline-flex items-center gap-2 bg-orange-500 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-white mb-4 animate-bounce">
              <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Excellence in Engineering</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
              Our <span className="text-orange-500">Infrastructure</span>
            </h1>
            
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-white/90 max-w-2xl mx-auto drop-shadow-md">
              Advanced facilities and equipment that enable us to deliver exceptional quality and efficiency.
            </p> */}
            
            {/* No scroll down indicator */}
            {/* <div className="hidden">
              <svg className="h-8 w-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div> */}
        
        {/* Floating equipment icons */}
        {/* <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center animate-float">
          <svg className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        
        <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center animate-float-delayed">
          <svg className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          </svg>
        </div> */}
      </section>
      
      {/* Add custom animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes float-delayed {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 4s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}</style>

      {/* Main content section - with negative margin to overlap with hero section */}
      <section className="py-2 relative z-20 bg-white">
        <div className="container">
          <div className="prose prose-invert max-w-none">
            <div className="relative mb-12">
              <div className="absolute -left-4 top-0 w-12 h-12 flex items-center justify-center rounded-full bg-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="pl-10">
                <h2 className="text-2xl font-semibold mb-6 text-orange-500">State-of-the-Art Facilities</h2>
                <div className="h-1 w-20 bg-orange-500 rounded mb-6"></div>
              </div>
            </div>
            
            <p className="mb-6">
              Veeru Engineering & Infra. has the most advanced infrastructure, which enhances the
              quality of works and timely completion of our clients' projects. We are honestly and dedicatedly
              performing our duties for the welfare of company and clients as well.
            </p>
            
            <p className="mb-6">
              We have highly qualified and experienced structural Engineers, site Engineers / Site
              Supervisors – Technical in civil-electrical-mechanical-structural who are capable of giving
              outstanding outputs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-3 text-white">Engineering Expertise</h3>
                <ul className="list-disc pl-5 space-y-2 text-white">
                  <li>Structural engineering team</li>
                  <li>Civil engineering specialists</li>
                  <li>Electrical engineering department</li>
                  <li>Mechanical engineering professionals</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-3 text-white">Technical Capabilities</h3>
                <ul className="list-disc pl-5 space-y-2 text-white">
                  <li>Advanced design software</li>
                  <li>Modern fabrication equipment</li>
                  <li>Quality testing facilities</li>
                  <li>Project management tools</li>
                </ul>
              </div>
            </div>

            {/* Machinery Section */}
            <div className="relative mb-12">
              <div className="absolute -left-4 top-0 w-12 h-12 flex items-center justify-center rounded-full bg-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="pl-10">
                <h2 className="text-2xl font-semibold mb-6 mt-12 text-orange-500">Machinery & Equipment</h2>
                <div className="h-1 w-20 bg-orange-500 rounded mb-6"></div>
                <p className="mb-6">
                  Our state-of-the-art machinery and equipment allow us to handle complex fabrication and construction
                  projects with precision and efficiency. We continuously invest in the latest technology to maintain
                  our competitive edge and deliver superior results.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 shadow-lg relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-white opacity-10 rounded-full"></div>
                <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-white opacity-10 rounded-full"></div>
                
                {/* Icon and title */}
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mr-4 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Mechanical Machinery</h3>
                </div>
                
                <div className="overflow-x-auto relative z-10">
                  <table className="responsive-table">
                    <thead>
                      <tr className="bg-orange-600">
                        <th className="py-3 px-4 font-semibold text-white border-b border-orange-700">Machinery</th>
                        <th className="py-3 px-4 font-semibold text-white text-center border-b border-orange-700">QTY.</th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      {/* Always show first 5 rows */}
                      <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                        <td className="py-2 pr-4" data-label="Machinery">SUB-ARC Automatic Welding Machine</td>
                        <td className="py-2 text-center" data-label="QTY.">16</td>
                      </tr>
                      <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                        <td className="py-2 pr-4">Hydraulic Plate bending Machine<br/>Capacity:  40 mm x 3000 mm Width</td>
                        <td className="py-2 text-center">4</td>
                      </tr>
                      <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                        <td className="py-2 pr-4">MIG Welding Machine</td>
                        <td className="py-2 text-center">80</td>
                      </tr>
                      <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                        <td className="py-2 pr-4">Rectifier Welding Machine<br/>(400 amp & 600 amp)</td>
                        <td className="py-2 text-center">800</td>
                      </tr>
                      <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                        <td className="py-2 pr-4">Pug Cutting Machines</td>
                        <td className="py-2 text-center">150</td>
                      </tr>
                      
                      {/* Show additional rows if expanded */}
                      {expandedTables.mechanical && (
                        <>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">Hand Cutting set</td>
                            <td className="py-2 text-center">250</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">Pillar type Drilling Machine-Heavy Duty</td>
                            <td className="py-2 text-center">35</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">Magnetic Drilling Machines</td>
                            <td className="py-2 text-center">14</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">Farana</td>
                            <td className="py-2 text-center">15</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">Hydra 10 Tons Cap</td>
                            <td className="py-2 text-center">6</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">Hydra 12 Tons cap</td>
                            <td className="py-2 text-center">6</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">Hydra 14 Tons cap</td>
                            <td className="py-2 text-center">8</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">Hydra 16 Tons Cap</td>
                            <td className="py-2 text-center">2</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">DG 62.5 KVA</td>
                            <td className="py-2 text-center">40</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">DG 82.5 KVA</td>
                            <td className="py-2 text-center">36</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">Hoist<br/>(Capacity- 2 Tone - 20 Tone) </td>
                            <td className="py-2 text-center">36</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">Ultra Sonic Machine </td>
                            <td className="py-2 text-center">8</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">Hydraulic Jack & Power Pack </td>
                            <td className="py-2 text-center">12 Set</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">SAW Column Boom </td>
                            <td className="py-2 text-center">6 Set</td>
                          </tr>
                          <tr className="hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">SAW Rotator</td>
                            <td className="py-2 text-center">30 Set</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                  
                  {/* Load More / Show Less button */}
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => toggleTable('mechanical')}
                      className="px-6 py-3 bg-orange-500 text-white rounded-md shadow-md overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {expandedTables.mechanical ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                            Show Less
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                            Load More
                          </>
                        )}
                      </span>
                      <span className="absolute bottom-0 left-0 w-full h-1 bg-white opacity-20"></span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 shadow-lg relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-white opacity-10 rounded-full"></div>
                <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-white opacity-10 rounded-full"></div>
                
                {/* Icon and title */}
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mr-4 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Civil Machinery</h3>
                </div>
                
                <div className="overflow-x-auto relative z-10">
                  <table className="responsive-table">
                    <thead>
                      <tr className="bg-orange-600">
                        <th className="py-3 px-4 font-semibold text-white border-b border-orange-700">Machinery</th>
                        <th className="py-3 px-4 font-semibold text-white text-center border-b border-orange-700">QTY.</th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      {/* Always show first 5 rows */}
                      <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                        <td className="py-2 pr-4">Excavator (Hyundai Ex-200)</td>
                        <td className="py-2 text-center">6 Nos.</td>
                      </tr>
                      <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                        <td className="py-2 pr-4">Excavator 210 L&T Komatsu </td>
                        <td className="py-2 text-center">4 Nos.</td>
                      </tr>
                      <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                        <td className="py-2 pr-4">Excavator (Tata Hitachi Ex-70)</td>
                        <td className="py-2 text-center">2 Nos.</td>
                      </tr>
                      <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                        <td className="py-2 pr-4">Backhoe Loader (JCB)</td>
                        <td className="py-2 text-center">4 Nos.</td>
                      </tr>
                      <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                        <td className="py-2 pr-4">Tipper (10 wheeler) Ashok Leyland</td>
                        <td className="py-2 text-center">13 Nos.</td>
                      </tr>
                      
                      {/* Show additional rows if expanded */}
                      {expandedTables.civil && (
                        <>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">Tipper (06 wheeler) Ashok Leyland</td>
                            <td className="py-2 text-center">5 Nos.</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">Vibratory Roller B.T</td>
                            <td className="py-2 text-center">2 Nos.</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">Tractor Dozor John deer 5 5 HP</td>
                            <td className="py-2 text-center">5 Nos.</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">Tractor (Eicher) with Trolley</td>
                            <td className="py-2 text-center">5 Nos.</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">Concrete Mixture cum/40hr</td>
                            <td className="py-2 text-center">1 Nos.</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">Water tankers Local made 500ltr</td>
                            <td className="py-2 text-center">6 Nos.</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">Centering Material</td>
                            <td className="py-2 text-center">5000 M2</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">Vibratory Needle (Fisa enterprises)</td>
                            <td className="py-2 text-center">20 Nos.</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">RM-1050-Concrete Mixer Universal</td>
                            <td className="py-2 text-center">4 Nos</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">Self loder 2 Cum. Ajax fiori Eng.</td>
                            <td className="py-2 text-center">2 Nos.</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">Total station (Sokkia/Nikon)</td>
                            <td className="py-2 text-center">6 Nos.</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">Auto Level (Sokkia)</td>
                            <td className="py-2 text-center">10 Nos.</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">Dewatering Pump (Elect) 10/20 HP</td>
                            <td className="py-2 text-center">15 Nos.</td>
                          </tr>
                          <tr className="hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">D.G Set 82.5 Kva</td>
                            <td className="py-2 text-center">6 Nos.</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                  
                  {/* Load More / Show Less button */}
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => toggleTable('civil')}
                      className="px-6 py-3 bg-orange-500 text-white rounded-md shadow-md overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {expandedTables.civil ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                            Show Less
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                            Load More
                          </>
                        )}
                      </span>
                      <span className="absolute bottom-0 left-0 w-full h-1 bg-white opacity-20"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Workforce Section */}
            <div className="relative mb-12">
              <div className="absolute -left-4 top-0 w-12 h-12 flex items-center justify-center rounded-full bg-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="pl-10">
                <h2 className="text-2xl font-semibold mb-6 mt-12 text-orange-500">Workforce</h2>
                <div className="h-1 w-20 bg-orange-500 rounded mb-6"></div>
                <p className="mb-6">
                  Our highly skilled and experienced workforce is the backbone of our operations. We employ a diverse team of professionals and skilled workers who are dedicated to delivering excellence in every project.
                </p>
              </div>
            </div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
  <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 shadow-lg relative overflow-hidden">
    {/* Decorative elements */}
    <div className="absolute -right-12 -top-12 w-40 h-40 bg-white opacity-10 rounded-full"></div>
    <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-white opacity-10 rounded-full"></div>
    
    {/* Icon and title */}
    <div className="flex items-center mb-6">
      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mr-4 shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-white">Staff List</h3>
    </div>
    
                
                <div className="overflow-x-auto">
                  <table className="responsive-table">
                    <thead>
                      <tr className="bg-orange-600">
                        <th className="py-3 px-4 font-semibold text-white border-b border-orange-700">Name Of Manpower</th>
                        <th className="py-3 px-4 font-semibold text-white text-center border-b border-orange-700">QTY.</th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      {/* Always show first 5 rows */}
                      <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                        <td className="py-2 pr-4">1. SITE INCHARGE</td>
                        <td className="py-2 text-center">12</td>
                      </tr>
                      <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                        <td className="py-2 pr-4">2. ENGINEER</td>
                        <td className="py-2 text-center">40</td>
                      </tr>
                      <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                        <td className="py-2 pr-4">3. QUALITY ENGINEER</td>
                        <td className="py-2 text-center">15</td>
                      </tr>
                      <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                        <td className="py-2 pr-4">4. SAFETY ENGINEER</td>
                        <td className="py-2 text-center">15</td>
                      </tr>
                      <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                        <td className="py-2 pr-4">5. SUPERVISOR</td>
                        <td className="py-2 text-center">60</td>
                      </tr>
                      
                      {/* Show additional rows if expanded */}
                      {expandedTables.staff && (
                        <>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">6. CIVIL ENGINEER</td>
                            <td className="py-2 text-center">12</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">7. STORE KEEPER</td>
                            <td className="py-2 text-center">15</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">8. ACCOUNTANT</td>
                            <td className="py-2 text-center">13</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">9. ADMINISTRATOR</td>
                            <td className="py-2 text-center">15</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">10. SURVEYOR</td>
                            <td className="py-2 text-center">5</td>
                          </tr>
                          <tr className="hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">11. PURCHASER</td>
                            <td className="py-2 text-center">5</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                  
                  {/* Load More / Show Less button */}
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => toggleTable('staff')}
                      className="px-6 py-3 bg-orange-500 text-white rounded-md shadow-md overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {expandedTables.staff ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                            Show Less
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                            Load More
                          </>
                        )}
                      </span>
                      <span className="absolute bottom-0 left-0 w-full h-1 bg-white opacity-20"></span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 shadow-lg relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-white opacity-10 rounded-full"></div>
                <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-white opacity-10 rounded-full"></div>
                
                {/* Icon and title */}
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mr-4 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Worker List</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="responsive-table">
                    <thead>
                      <tr className="bg-orange-600">
                        <th className="py-3 px-4 font-semibold text-white border-b border-orange-700">Name Of Manpower</th>
                        <th className="py-3 px-4 font-semibold text-white text-center border-b border-orange-700">QTY.</th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      {/* Always show first 5 rows */}
                      <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                        <td className="py-2 pr-4">1. FORMAN</td>
                        <td className="py-2 text-center">20</td>
                      </tr>
                      <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                        <td className="py-2 pr-4">2. FABARICATOR</td>
                        <td className="py-2 text-center">35</td>
                      </tr>
                      <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                        <td className="py-2 pr-4">3. FITTER</td>
                        <td className="py-2 text-center">65</td>
                      </tr>
                      <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                        <td className="py-2 pr-4">4. WELDER</td>
                        <td className="py-2 text-center">250</td>
                      </tr>
                      <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                        <td className="py-2 pr-4">5. GRINDER</td>
                        <td className="py-2 text-center">65</td>
                      </tr>
                      
                      {/* Show additional rows if expanded */}
                      {expandedTables.worker && (
                        <>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">6. GASS CUTTER</td>
                            <td className="py-2 text-center">70</td>
                          </tr>
                          <tr className="border-b border-steel-800 hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">7. RIGGER</td>
                            <td className="py-2 text-center">60</td>
                          </tr>
                          <tr className="hover:bg-steel-800/30 transition-colors">
                            <td className="py-2 pr-4">8. HELPER</td>
                            <td className="py-2 text-center">20</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                  
                  {/* Load More / Show Less button */}
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => toggleTable('worker')}
                      className="px-6 py-3 bg-orange-500 text-white rounded-md shadow-md overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {expandedTables.worker ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                            Show Less
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                            Load More
                          </>
                        )}
                      </span>
                      <span className="absolute bottom-0 left-0 w-full h-1 bg-white opacity-20"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="my-16 py-10 px-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-white opacity-5 rounded-full"></div>
              <div className="absolute -left-10 -bottom-10 w-60 h-60 bg-white opacity-5 rounded-full"></div>
              
              <h3 className="text-2xl font-semibold mb-8 text-center text-white">Our Capabilities at a Glance</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">
                    <CountUp end={25} suffix="+" duration={2.5} />
                  </div>
                  <div className="text-white">Years of Experience</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">
                    <CountUp end={800} suffix="+" duration={2.5} />
                  </div>
                  <div className="text-white">Skilled Workforce</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">
                    <CountUp end={100} suffix="+" duration={2.5} />
                  </div>
                  <div className="text-white">Heavy Machinery</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">
                    <CountUp end={500} suffix="+" duration={2.5} />
                  </div>
                  <div className="text-white">Projects Completed</div>
                </div>
              </div>
            </div>

            <p className="mt-8">
              Our infrastructure and machinery enable us to take on complex projects with confidence,
              ensuring that we deliver high-quality results on time and within budget.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
