'use client';

import { useState, useEffect, useRef } from 'react';
import { getPrestigiousProjects, PrestigiousProject } from '../../lib/api';
import Link from 'next/link';
import CountUp from '../../components/CountUp';
import Image from 'next/image';

export default function HomePage() {
  const [prestigiousProjects, setPrestigiousProjects] = useState<PrestigiousProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Fetch prestigious projects on component mount
  useEffect(() => {
    async function fetchPrestigiousProjects() {
      try {
        setIsLoading(true);
        const projects = await getPrestigiousProjects();
        
        if (projects.length > 0) {
          setPrestigiousProjects(projects);
        } else {
          // Use dummy data if no projects were fetched
          setPrestigiousProjects(getDummyPrestigiousProjects());
        }
      } catch (error) {
        console.error('Error fetching prestigious projects:', error);
        // Use dummy data when API fails
        setPrestigiousProjects(getDummyPrestigiousProjects());
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchPrestigiousProjects();
  }, []);
  
  // Modified auto-scrolling effect with pause capability
  useEffect(() => {
    if (prestigiousProjects.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % prestigiousProjects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, prestigiousProjects.length]);
  
  // Function to get dummy prestigious projects data
  function getDummyPrestigiousProjects(): PrestigiousProject[] {
    return [
      {
        id: 1,
        name: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED",
        details: "Pipe Fabrication 3000 dia.",
        work_details: "Pipe Fabrication 3000 dia.",
        quantity: "17000 MT",
        location: "NANDAWADAGI DRIP IRRIGATION SCHEME PACKAGE - 1 (BLOCK - A, 12000 HA) PROJECT",
        client: "VITAL ENVIRONMENT INDIA PRIVATE LIMITED",
        image_url: "/images/Prestigious%20Project/Vital/Thumbnail.jpg",
        order: 1,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 2,
        name: "S.S Fabricators & Manufacturers Pvt. Ltd.",
        details: "Manufacturing of M.S. Pipes at SB-04 PDN Project, Lower Wardha Radial Gate - fabrication & Erection",
        work_details: "Manufacturing of M.S. Pipes at SB-04 PDN Project, Lower Wardha Radial Gate - fabrication & Erection",
        quantity: "10000 MT",
        location: "Wardha",
        client: "S.S Fabricators & Manufacturers Pvt. Ltd.",
        image_url: "/images/Prestigious%20Project/S.S%20Fabricators%20%26%20Manufacturers%20Pvt.%20Ltd/Thumbnail.jpg",
        order: 2,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 3,
        name: "Adani Power Limited",
        details: "CW, ACW and RW Piping along with fittings, valves and accessories for 2x800 MW (Phase-II) Ultra Super Critical Thermal Power Project, Fabrication, Erection & Painting.",
        work_details: "CW, ACW and RW Piping along with fittings, valves and accessories for 2x800 MW (Phase-II) Ultra Super Critical Thermal Power Project, Fabrication, Erection & Painting.",
        quantity: "11000 MT",
        location: "Raipur",
        client: "Adani Power Limitedss",
        image_url: "/images/Prestigious%20Project/Adani%20power%20Raipur/Thumbnail%20%281%29.jpg",
        order: 3,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 4,
        name: "Jindal Power Project",
        details: "CW and ACW Pipe, Fabrication, Erection, Commissioning & Painting.",
        work_details: "CW and ACW Pipe, Fabrication, Erection, Commissioning & Painting.",
        quantity: "9500 MT",
        location: "Tamnar, Raigarh – C.G.",
        client: "Jindal Power Project",
        image_url: "/images/Prestigious%20Project/Jindal%20Power/01%20Thumbnail.jpg",
        order: 4,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 5,
        name: "AFCONS INFRASTRUCTURE LIMITED",
        details: "Pile Liner Fabrication Work. TAB Superstructure Fabrication work.",
        work_details: "Pile Liner Fabrication Work. TAB Superstructure Fabrication work.",
        quantity: "6400 MT",
        location: "Maldives",
        client: "AFCONS INFRASTRUCTURE LIMITED",
        image_url: "/images/Prestigious%20Project/AFCONS%20INFRSTRUCTURE%20LTD%20Finalized/01%20Thumbnail.jpg",
        order: 5,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero section with modern layout */}
      <section className="min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Section - Hero Content */}
            <div className="space-y-6">
              {/* Since 1995 Badge - Positioned above the main heading with slight top margin */}
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-2 text-sm text-orange-600 mt-4">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Since 1995</span>
              </div>
              
              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Building <span className="text-orange-500">Industrial</span> Infrastructure for Tomorrow
              </h1>
              
              {/* Description */}
              <p className="text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed">
                Expert structural fabrication, industrial piping, and heavy equipment installation
                trusted by leading industries across India.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="group relative inline-flex items-center justify-center px-8 py-4 bg-orange-500 text-white rounded-lg shadow-lg hover:bg-orange-600 transition-all duration-300 hover:shadow-xl">
                  <span className="flex items-center">
                    Start Your Project
                    <svg className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </Link>
                
                <Link href="/projects" className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300">
                  <span className="flex items-center">
                    View Projects
                    <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </Link>
              </div>
              
              {/* Stats with animated counters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12 pt-8 pb-12 -mt-4">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                    <CountUp end={30} suffix="+" className="text-gray-900" />
                  </div>
                  <div className="text-xs text-gray-500">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                    <CountUp end={120} suffix="+" className="text-gray-900" duration={2500} />
                  </div>
                  <div className="text-xs text-gray-500">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                    <CountUp end={100} suffix="%" className="text-gray-900" duration={2200} />
                  </div>
                  <div className="text-xs text-gray-500">Client Satisfaction</div>
                </div>
              </div>
            </div>
            {/* Right Section - Visual Grid - Exact match to reference image */}
            <div className="grid grid-cols-1 lg:grid-cols-2 h-auto lg:h-[500px] gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 h-auto lg:h-full gap-4 mt-0 lg:mt-[-35px]">
                {/* Top Left - Construction Cranes Image (Square) */}
                <div className="col-span-2 w-full h-[180px] sm:h-[200px] lg:w-[224px] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/01 (1).jpg"
                    alt="Construction Cranes"
                    width={224}
                    height={200}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
                {/* Bottom Left - Orange Card with Expert Team (Rectangle) */}
                <div className="col-span-2 w-full h-[280px] sm:h-[360px] lg:w-[224px] rounded-2xl overflow-hidden bg-[#FF5722] flex flex-col justify-end p-6">
                  <div className="mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-white">Expert Team</h3>
                  <p className="text-white/80 text-sm">Skilled Engineers & Technicians</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 h-full flex flex-col items-center" style={{ gap: '10px' }}>
                {/* Top Right - Image Card - Styled to match reference */}
                <div className="col-span-2 w-full h-[350px] sm:h-[420px] lg:w-[320px] rounded-3xl overflow-hidden bg-gray-100 shadow-lg mx-auto">
                  <Image
                    src="/images/team/Virendra%20Singh-%20Founder%20%26%20CEO.jpg"
                    alt="Virendra Singh - Founder & CEO"
                    width={320}
                    height={420}
                    priority={true}
                    style={{ objectFit: 'cover', width: '100%', height: '100%', objectPosition: 'center 20%' }}
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
                
                {/* Bottom Right - Person in Protective Gear Image (Square) - Adjusted for spacing */}
                <div className="col-span-2 w-full h-[160px] lg:w-[300px] rounded-2xl overflow-hidden mt-4">
                  <Image
                    src="/images/02.jpg"
                    alt="Engineer in Protective Gear"
                    width={300}
                    height={160}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
              </div>
          </div>
        </div>
        </div>
      </section>

      {/* Services Section - Styled like the reference image */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive industrial solutions tailored to meet your specific project requirements
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Service 1 - Structural Fabrication */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300">
              {/* Image Section */}
              <div className="relative h-48 sm:h-52 md:h-56">
                <Image
                  src="/images/Structural%20Fabrication.png"
                  alt="Structural Fabrication"
                  width={400}
                  height={225}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
                {/* Circular Icon */}
                <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 sm:translate-y-1/2 translate-y-0 sm:block hidden">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border-2 border-orange-200">
                    <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-4 sm:p-6 pt-6 sm:pt-10 text-center flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Structural Fabrication</h3>
                <p className="text-gray-600 text-sm mb-4">Precision metal fabrication services for industrial applications with high-quality standards.</p>
                <Link href="/contact" className="mt-auto inline-block text-orange-500 hover:text-orange-700 font-medium">
                  Contact Us
                </Link>
              </div>
            </div>
            
            {/* Service 2 - Industrial Piping */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300">
              {/* Image Section */}
              <div className="relative h-48 sm:h-52 md:h-56">
                <Image
                  src="/images/Industrial%20Piping.png"
                  alt="Industrial Piping"
                  width={400}
                  height={225}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
                {/* Circular Icon */}
                <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 sm:translate-y-1/2 translate-y-0 sm:block hidden">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border-2 border-orange-200">
                    <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-4 sm:p-6 pt-6 sm:pt-10 text-center flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Industrial Piping</h3>
                <p className="text-gray-600 text-sm mb-4">Comprehensive industrial piping solutions for various applications and industries.</p>
                <Link href="/contact" className="mt-auto inline-block text-orange-500 hover:text-orange-700 font-medium">
                  Contact Us
                </Link>
              </div>
            </div>
            
            {/* Service 3 - Heavy Equipment */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300">
              {/* Image Section */}
              <div className="relative h-48 sm:h-52 md:h-56">
                <Image
                  src="/images/Heavy%20Equipments.png"
                  alt="Heavy Equipment"
                  width={400}
                  height={225}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/02.jpg";
                  }}
                />
                {/* Circular Icon */}
                <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 sm:translate-y-1/2 translate-y-0 sm:block hidden">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border-2 border-orange-200">
                    <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-4 sm:p-6 pt-6 sm:pt-10 text-center flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Heavy Equipment</h3>
                <p className="text-gray-600 text-sm mb-4">Specialized industrial equipment installation, maintenance, and repair services.</p>
                <Link href="/contact" className="mt-auto inline-block text-orange-500 hover:text-orange-700 font-medium">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prestigious Projects Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Creative background pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Prestigious Projects</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our exceptional work and innovative solutions across various industries
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : prestigiousProjects.length === 0 ? (
            <div className="text-center p-8 bg-gray-50 rounded-2xl shadow-lg max-w-2xl mx-auto">
              <p className="text-gray-600 text-lg">No projects available at the moment.</p>
              <p className="text-gray-500 mt-2">Please check back later for our project portfolio.</p>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Left Side - Navigation Dots */}
              <div className="hidden lg:flex flex-col gap-4 pt-8">
                {prestigiousProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all rounded-full ${
                      index === currentSlide
                        ? 'bg-orange-500 w-6 h-6 shadow-lg'
                        : 'bg-gray-300 w-4 h-4 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>

              {/* Center - Cards Display */}
              <div
                className="flex-1 relative min-h-[520px] sm:min-h-[560px] lg:h-[550px]"
                onMouseEnter={() => {
                  setIsPaused(true);
                }}
                onMouseLeave={() => {
                  setIsPaused(false);
                }}
              >
                {/* Top gradient decoration */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-orange-50 to-transparent opacity-70 rounded-t-3xl"></div>
                
                {/* Bottom gradient decoration */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-orange-50 to-transparent opacity-70 rounded-b-3xl"></div>
                
                {/* Left subtle pattern */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-32">
                  <div className="w-1 h-1 bg-orange-200 rounded-full mb-3 opacity-40"></div>
                  <div className="w-1 h-1 bg-orange-200 rounded-full mb-3 opacity-40"></div>
                  <div className="w-1 h-1 bg-orange-200 rounded-full mb-3 opacity-60"></div>
                  <div className="w-1 h-1 bg-orange-300 rounded-full mb-3 opacity-80"></div>
                  <div className="w-1 h-1 bg-orange-300 rounded-full mb-3"></div>
                  <div className="w-1 h-1 bg-orange-300 rounded-full mb-3 opacity-80"></div>
                  <div className="w-1 h-1 bg-orange-200 rounded-full mb-3 opacity-60"></div>
                  <div className="w-1 h-1 bg-orange-200 rounded-full mb-3 opacity-40"></div>
                  <div className="w-1 h-1 bg-orange-200 rounded-full opacity-40"></div>
                </div>
                
                {/* Right subtle pattern */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-32">
                  <div className="w-1 h-1 bg-orange-200 rounded-full mb-3 opacity-40"></div>
                  <div className="w-1 h-1 bg-orange-200 rounded-full mb-3 opacity-40"></div>
                  <div className="w-1 h-1 bg-orange-200 rounded-full mb-3 opacity-60"></div>
                  <div className="w-1 h-1 bg-orange-300 rounded-full mb-3 opacity-80"></div>
                  <div className="w-1 h-1 bg-orange-300 rounded-full mb-3"></div>
                  <div className="w-1 h-1 bg-orange-300 rounded-full mb-3 opacity-80"></div>
                  <div className="w-1 h-1 bg-orange-200 rounded-full mb-3 opacity-60"></div>
                  <div className="w-1 h-1 bg-orange-200 rounded-full mb-3 opacity-40"></div>
                  <div className="w-1 h-1 bg-orange-200 rounded-full opacity-40"></div>
                </div>
                
                {/* Previous/Next project indicators */}
                {currentSlide > 0 && (
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 bg-white/80 px-3 py-1 rounded-full">
                    Previous: {prestigiousProjects[(currentSlide - 1 + prestigiousProjects.length) % prestigiousProjects.length].name}
                  </div>
                )}
                
                {currentSlide < prestigiousProjects.length - 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 bg-white/80 px-3 py-1 rounded-full">
                    Next: {prestigiousProjects[(currentSlide + 1) % prestigiousProjects.length].name}
                  </div>
                )}
                
                {/* Current project card */}
                {prestigiousProjects.length > 0 && (
                  <div
                    key={prestigiousProjects[currentSlide].id}
                    className="relative lg:absolute w-full lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 transition-all duration-700 ease-out"
                  >
                    <div
                      className="rounded-3xl overflow-hidden transition-all duration-500 max-w-5xl mx-auto shadow-2xl bg-white border-2 border-orange-300"
                    >
                      <div className="flex flex-col lg:flex-row">
                        {/* Image on Left */}
                        <div className="w-full lg:w-1/2 h-56 sm:h-64 lg:h-auto bg-gray-200">
                          <Image
                            src={prestigiousProjects[currentSlide].image_url}
                            alt={prestigiousProjects[currentSlide].name}
                            width={600}
                            height={450}
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            priority={true}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/images/placeholder.jpg";
                            }}
                          />
                        </div>

                        {/* Content on Right */}
                        <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
                          <div>
                            <div className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
                              Project {currentSlide + 1} of {prestigiousProjects.length}
                            </div>
                            
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-gray-900">
                              {prestigiousProjects[currentSlide].name}
                            </h3>
                            
                            {/* <p className="text-lg leading-relaxed mb-8 text-gray-700">
                              {prestigiousProjects[currentSlide].details}
                            </p> */}
                          </div>

                          <div className="space-y-6">
                            <div className="flex items-start gap-3">
                              <svg className="w-5 h-5 text-orange-500 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <div>
                                <span className="font-semibold">Work:</span> {prestigiousProjects[currentSlide].work_details || prestigiousProjects[currentSlide].details}
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <svg className="w-5 h-5 text-orange-500 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                              </svg>
                              <div>
                                <span className="font-semibold">Quantity:</span> {prestigiousProjects[currentSlide].quantity}
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <svg className="w-5 h-5 text-orange-500 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <div>
                                <span className="font-semibold">Location:</span> {prestigiousProjects[currentSlide].location}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bottom Navigation Controls */}
          {!isLoading && prestigiousProjects.length > 0 && (
            <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-12">
              <button
                onClick={() => {
                  const newSlide = (currentSlide - 1 + prestigiousProjects.length) % prestigiousProjects.length;
                  setCurrentSlide(newSlide);
                }}
                className="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-gray-700 hover:text-gray-900 hover:scale-110 border-2 border-orange-300"
                aria-label="Previous project"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="text-center">
                <p className="text-sm font-semibold text-gray-700">
                  {currentSlide + 1} / {prestigiousProjects.length}
                </p>
                <p className="text-xs text-gray-500">Hover to pause</p>
              </div>

              <button
                onClick={() => {
                  const newSlide = (currentSlide + 1) % prestigiousProjects.length;
                  setCurrentSlide(newSlide);
                }}
                className="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-gray-700 hover:text-gray-900 hover:scale-110 border-2 border-orange-300"
                aria-label="Next project"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Project?</h2>
          <p className="text-base sm:text-lg md:text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Our team of experts is ready to help you bring your vision to life with our comprehensive range of services.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-white text-orange-500 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <span className="flex items-center">
              Contact Us
              <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}