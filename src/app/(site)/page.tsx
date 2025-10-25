'use client';

import { useState, useEffect, useRef } from 'react';
import { getPrestigiousProjects, PrestigiousProject } from '../../lib/api';
import Link from 'next/link';

export default function HomePage() {
  const [prestigiousProjects, setPrestigiousProjects] = useState<PrestigiousProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
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
  
  // Handle scroll events to update current slide
  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const scrollContainer = carouselRef.current.querySelector('.flex');
        if (scrollContainer) {
          const slideWidth = carouselRef.current.querySelector('.flex-shrink-0')?.clientWidth || 0;
          const scrollPosition = scrollContainer.scrollLeft;
          const newSlide = Math.round(scrollPosition / slideWidth);
          if (newSlide !== currentSlide) {
            setCurrentSlide(newSlide);
          }
        }
      }
    };
    
    const scrollContainer = carouselRef.current?.querySelector('.flex');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [currentSlide, prestigiousProjects.length]);
  
  // Function to get dummy prestigious projects data
  function getDummyPrestigiousProjects(): PrestigiousProject[] {
    return [
      {
        id: 1,
        name: "AMRUTHA CONSTRUCTIONS PVT.LTD.",
        details: "Structural fabrication and erection for industrial facility including heavy equipment installation and piping work.",
        quantity: "2000 MT",
        location: "Nagpur, Maharashtra",
        client: "Amrutha Constructions Pvt. Ltd.",
        image_url: "/images/projects/Jindal_Power_Plant.jpg",
        order: 1,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 2,
        name: "S.S.Fabricators (Engineers & Contractors)",
        details: "Complete structural steel fabrication and erection for manufacturing plant expansion project.",
        quantity: "650 MT",
        location: "Pune, Maharashtra",
        client: "S.S.Fabricators",
        image_url: "/images/projects/Power_Project_Koradi.jpg",
        order: 2,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 3,
        name: "Sunil Hitech Engineers Ltd.",
        details: "Industrial piping and equipment installation for power plant with high-precision requirements.",
        quantity: "1200 MT",
        location: "Raipur, Chhattisgarh",
        client: "Sunil Hitech Engineers Ltd.",
        image_url: "/images/projects/Sunil_Hitech.jpg",
        order: 3,
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Building <span className="text-orange-500">Industrial</span> Infrastructure for Tomorrow
              </h1>
              
              {/* Description */}
              <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                Expert structural fabrication, industrial piping, and heavy equipment installation 
                trusted by leading industries across India.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/enquiry" className="group relative inline-flex items-center justify-center px-8 py-4 bg-orange-500 text-white rounded-lg shadow-lg hover:bg-orange-600 transition-all duration-300 hover:shadow-xl">
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
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-12 pt-8 pb-12 -mt-4">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">30+</div>
                  <div className="text-xs text-gray-500">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">500+</div>
                  <div className="text-xs text-gray-500">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">100%</div>
                  <div className="text-xs text-gray-500">Client Satisfaction</div>
                </div>
              </div>
            </div>
            {/* Right Section - Visual Grid - Exact match to reference image */}
            <div className="grid grid-cols-2 h-[500px]" style={{ gap: '8px' }}>
              <div className="grid grid-cols-2 h-full" style={{ gap: '10px', marginTop: '-35px' }}>
                {/* Top Left - Construction Cranes Image (Square) */}
                <div className="col-span-2 rounded-2xl overflow-hidden" style={{ height: '200px', width: '224px' }}>
                  <img
                    src="/images/01 (1).jpg"
                    alt="Construction Cranes"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Bottom Left - Orange Card with Expert Team (Rectangle) */}
                <div className="col-span-2 rounded-2xl overflow-hidden bg-[#FF5722] flex flex-col justify-end p-6" style={{ height: '360px', width: '224px' }}>
                  <div className="mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-white">Expert Team</h3>
                  <p className="text-white/80 text-sm">Skilled Engineers & Technicians</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 h-full" style={{ gap: '10px' }}>
                {/* Top Right - Image Card */}
                <div className="col-span-2 rounded-2xl overflow-hidden" style={{ height: '360px', width: '224px' }}>
                  <img
                    src="\images\team\Virendra Singh- Founder & CEO .jpg"
                    alt="Expert Team"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Bottom Right - Person in Protective Gear Image (Square) */}
                <div className="col-span-2 rounded-2xl overflow-hidden" style={{ height: '200px', width: '224px' }}>
                  <img
                    src="/images/02.jpg"
                    alt="Engineer in Protective Gear"
                    className="w-full h-full object-cover"
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive industrial solutions tailored to meet your specific project requirements
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 - Structural Fabrication */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              {/* Image Section */}
              <div className="relative h-56">
                <img
                  src="/images/01 (1).jpg"
                  alt="Structural Fabrication"
                  className="w-full h-full object-cover"
                />
                {/* Circular Icon */}
                <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border-2 border-orange-200">
                    <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-6 pt-10 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Structural Fabrication</h3>
                <p className="text-gray-600 text-sm mb-4">Precision metal fabrication services for industrial applications with high-quality standards.</p>
                <Link href="/contact" className="inline-block text-orange-500 hover:text-orange-700 font-medium">
                  Contact Us
                </Link>
              </div>
            </div>
            
            {/* Service 2 - Industrial Piping */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              {/* Image Section */}
              <div className="relative h-56">
                <img
                  src="/images/Industrial Piping.png"
                  alt="Industrial Piping"
                  className="w-full h-full object-cover"
                />
                {/* Circular Icon */}
                <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border-2 border-orange-200">
                    <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-6 pt-10 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Industrial Piping</h3>
                <p className="text-gray-600 text-sm mb-4">Comprehensive industrial piping solutions for various applications and industries.</p>
                <Link href="/contact" className="inline-block text-orange-500 hover:text-orange-700 font-medium">
                  Contact Us
                </Link>
              </div>
            </div>
            
            {/* Service 3 - Heavy Equipment */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              {/* Image Section */}
              <div className="relative h-56">
                <img
                  src="/images/Heavy Equipments.png"
                  alt="Heavy Equipment"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/images/02.jpg";
                  }}
                />
                {/* Circular Icon */}
                <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border-2 border-orange-200">
                    <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-6 pt-10 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Heavy Equipment</h3>
                <p className="text-gray-600 text-sm mb-4">Specialized industrial equipment installation, maintenance, and repair services.</p>
                <Link href="/contact" className="inline-block text-orange-500 hover:text-orange-700 font-medium">
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Prestigious Projects</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
            <div className="relative px-12" ref={carouselRef}>
              {/* Project Carousel */}
              <div className="overflow-hidden">
                <div className="flex flex-nowrap overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar perspective-1000">
                  {prestigiousProjects.map((project, index) => (
                    <div
                      key={project.id}
                      className="min-w-full w-full flex-shrink-0 snap-center px-4 transition-transform duration-500"
                      style={{
                        transform: currentSlide === index ? 'scale(1) rotateY(0deg)' : 'scale(0.9) rotateY(5deg)',
                        opacity: currentSlide === index ? 1 : 0.6,
                        transition: 'all 0.5s ease'
                      }}
                    >
                      <div className={`bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-100 relative max-w-3xl mx-auto transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 ${currentSlide === index ? 'float-animation' : ''}`}>
                        {/* Project Image - Larger with parallax effect */}
                        {project.image_url && (
                          <div className="h-96 overflow-hidden">
                            <img
                              src={project.image_url}
                              alt={project.name}
                              className="w-full h-full object-cover transform transition-transform duration-10000 hover:scale-110"
                            />
                          </div>
                        )}
                        
                        {/* Project Title and Status - Below image with creative styling */}
                        <div className="p-6 relative">
                          {/* Decorative element */}
                          <div className="absolute -top-5 right-6 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-lg transform -rotate-12">
                            <span className="text-white font-bold">{index + 1}</span>
                          </div>
                          
                          <h3 className="text-2xl font-bold text-gray-900 mb-3 border-b border-orange-100 pb-3">{project.name}</h3>
                          
                          {/* Status and Quantity - Styled creatively */}
                          <div className="flex items-center mb-2">
                            <span className="text-sm text-gray-600 font-medium">
                              Quantity: {project.quantity}
                            </span>
                          </div>
                          
                          {/* Location with icon */}
                          {project.location && (
                            <div className="flex items-center text-sm text-gray-500 mt-2">
                              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {project.location}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation Buttons - Positioned on sides */}
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center justify-center hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:scale-105 z-10"
                onClick={() => {
                  const newSlide = Math.max(0, currentSlide - 1);
                  setCurrentSlide(newSlide);
                  if (carouselRef.current) {
                    const slideWidth = carouselRef.current.querySelector('.flex-shrink-0')?.clientWidth || 0;
                    const scrollContainer = carouselRef.current.querySelector('.flex');
                    if (scrollContainer) {
                      scrollContainer.scrollTo({
                        left: newSlide * slideWidth,
                        behavior: 'smooth'
                      });
                    }
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center justify-center hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:scale-105 z-10"
                onClick={() => {
                  const newSlide = Math.min(prestigiousProjects.length - 1, currentSlide + 1);
                  setCurrentSlide(newSlide);
                  if (carouselRef.current) {
                    const slideWidth = carouselRef.current.querySelector('.flex-shrink-0')?.clientWidth || 0;
                    const scrollContainer = carouselRef.current.querySelector('.flex');
                    if (scrollContainer) {
                      scrollContainer.scrollTo({
                        left: newSlide * slideWidth,
                        behavior: 'smooth'
                      });
                    }
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Pagination Dots - Bottom center with creative styling */}
              <div className="flex justify-center mt-8 gap-3">
                {prestigiousProjects.map((_, index) => (
                  <button
                    key={index}
                    className={`w-8 h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 w-12 shadow-md'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    onClick={() => {
                      setCurrentSlide(index);
                      if (carouselRef.current) {
                        const slideWidth = carouselRef.current.querySelector('.flex-shrink-0')?.clientWidth || 0;
                        const scrollContainer = carouselRef.current.querySelector('.flex');
                        if (scrollContainer) {
                          scrollContainer.scrollTo({
                            left: index * slideWidth,
                            behavior: 'smooth'
                          });
                        }
                      }
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Our team of experts is ready to help you bring your vision to life with our comprehensive range of services.
          </p>
          <Link href="/enquiry" className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-500 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
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