'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Team members data with actual images
const teamMembers = [
  {
    id: 1,
    name: 'Sanjay Singh',
    position: 'Director',
    image: '/images/team/Sanjay Singh- Director.jpg'
  },
  {
    id: 2,
    name: 'Ashish Singh',
    position: 'Director',
    image: '/images/team/Ashish Singh- Director.jpg'
  },
  {
    id: 3,
    name: 'Narayan Singh',
    position: 'Vice President (Project) ',
    image: '/images/team/Narayan Singh- Vice President(Project).jpg'
  },
  {
    id: 4,
    name: 'ShivKumar Sharma',
    position: 'Chief Financial Officer',
    image: '/images/team/Shivkumar Sharma- Chief Financial Officer .jpg'
  }
];

export default function AboutPage() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect for hero section
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollY = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
        parallaxRef.current.style.opacity = `${1 - scrollY * 0.002}`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section - Styled like the image */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* About Us Header with dotted border */}
            <div className="border-2 border-dotted border-blue-200 inline-block px-4 py-2 mb-8">
              <span className="text-orange-500 font-semibold uppercase tracking-wider">ABOUT US</span>
            </div>
            
            {/* Main content in a grid layout */}
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left Column - Text Content */}
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                  Three Decades of Engineering Excellence
                </h1>
                
                <div className="space-y-6 text-gray-600">
                  <p className="text-lg">
                    Since our establishment, Veeru Engineering & Infra has been at the forefront of industrial infrastructure development. With over 30 years of experience, we've built a reputation for delivering complex projects with precision and integrity.
                  </p>
                  
                  <p className="text-lg">
                    Our team of skilled engineers and technicians brings together decades of combined expertise in structural fabrication, industrial piping, and heavy equipment installation. We serve diverse industries including automotive, pharmaceutical, chemical processing, and manufacturing.
                  </p>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6 mt-12">
                  {/* Stat Box 1 */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-4xl font-bold text-gray-900">30+</h3>
                    <p className="text-gray-500">Years in Industry</p>
                  </div>
                  
                  {/* Stat Box 2 */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-4xl font-bold text-gray-900">500+</h3>
                    <p className="text-gray-500">Projects Delivered</p>
                  </div>
                  
                  {/* Stat Box 3 */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-4xl font-bold text-gray-900">150+</h3>
                    <p className="text-gray-500">Skilled Professionals</p>
                  </div>
                  
                  {/* Stat Box 4 */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-4xl font-bold text-gray-900">15+</h3>
                    <p className="text-gray-500">Industry Sectors</p>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Image with Overlay */}
              <div>
                {/* Main Image Container */}
                <div className="relative">
                  {/* Main Image */}
                  <div className="rounded-lg overflow-hidden shadow-xl">
                    <img
                      src="/images/team/Virendra%20Singh-%20Founder%20%26%20CEO%20.jpg"
                      alt="Virendra Singh - Founder & CEO"
                      className="w-full h-[600px] object-cover"
                    />
                  </div>
                  
                  {/* Founder Card */}
                  <div className="absolute bottom-6 right-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-0.5 shadow-xl">
                      <div className="bg-white rounded-md p-2 backdrop-blur-sm">
                        <div className="flex items-center">
                          <div className="w-1 h-8 bg-orange-500 rounded-full mr-2"></div>
                          <div>
                            <h3 className="text-sm font-extrabold text-gray-900 leading-tight">Virendra Singh</h3>
                            <div className="flex items-center">
                              <span className="text-xs font-medium text-orange-600">Founder & CEO</span>
                              <svg className="h-3 w-3 ml-1 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812a3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812a3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* ISO Certification Card - Below the image, at same level as stats */}
                <div className="mt-12">
                  <div className="w-full transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
                    <div className="bg-gradient-to-br from-white via-gray-50 to-orange-50 rounded-xl overflow-hidden shadow-xl border border-gray-100 relative group-hover:shadow-orange-200">
                      {/* Decorative elements removed */}
                      
                      {/* Decorative dots */}
                      <div className="absolute top-0 right-0 w-3 h-3 bg-gray-900 rounded-full m-3 group-hover:bg-gray-800 transition-colors duration-300"></div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-orange-500 rounded-full m-3 group-hover:bg-orange-600 transition-colors duration-300"></div>
                      <div className="absolute bottom-0 left-10 w-2 h-2 bg-orange-300 rounded-full m-3 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-10 right-10 w-2 h-2 bg-gray-400 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <div className="p-8 relative">
                        {/* ISO Logo/Icon with animation */}
                        <div className="absolute -top-6 right-6 bg-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center border-2 border-orange-500 group-hover:border-orange-600 transition-colors duration-300 group-hover:scale-110 transform">
                          <div className="relative">
                            <span className="text-sm font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">ISO</span>
                            <div className="absolute -inset-1 rounded-full border-2 border-orange-300 opacity-0 group-hover:opacity-70 animate-ping"></div>
                          </div>
                        </div>
                        
                        {/* Title with gradient text */}
                        <h3 className="text-2xl font-extrabold mb-3 flex items-center">
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-800 group-hover:from-orange-700 group-hover:to-orange-900 transition-colors duration-300">ISO Certified Quality</span>
                        </h3>
                        
                        {/* Description with styled border */}
                        <p className="text-gray-600 mb-6 border-l-2 border-orange-500 pl-4 italic group-hover:border-orange-600 transition-colors duration-300">
                          Committed to international standards of excellence in every project we undertake.
                        </p>
                        
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-400 mr-2 shadow-md group-hover:from-orange-600 group-hover:to-orange-500 transition-colors duration-300 transform group-hover:scale-105"></div>
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 mr-4 shadow-md group-hover:from-gray-800 group-hover:to-gray-700 transition-colors duration-300 transform group-hover:scale-105"></div>
                          <span className="text-lg text-gray-700 font-medium flex items-center group-hover:text-gray-800 transition-colors duration-300">
                            Certified Team
                            <svg className="h-5 w-5 ml-2 text-orange-500 group-hover:text-orange-600 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812a3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812a3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Core Values - clean light section like the reference */}
          <div className="bg-white rounded-[24px] py-16 px-6 md:px-10 shadow-xl mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Our Core Values</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">The principles that guide our work and define our commitment to excellence</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Safety First',
                  desc: 'Uncompromising commitment to workplace safety and quality standards.',
                  icon: (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6l7 4v4c0 5-7 6-7 6s-7-1-7-6V10l7-4z" /></svg>
                  )
                },
                {
                  title: 'Innovation',
                  desc: 'Leveraging cutting-edge technology and modern engineering practices.',
                  icon: (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  )
                },
                {
                  title: 'Precision',
                  desc: 'Delivering accurate, high-quality work that meets exact specifications.',
                  icon: (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" /></svg>
                  )
                },
                {
                  title: 'Reliability',
                  desc: 'Consistent performance and on-time delivery you can count on.',
                  icon: (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  )
                }
              ].map((item, idx) => (
                <div key={idx} className="rounded-2xl p-6 bg-gradient-to-b from-gray-50 to-white border border-gray-200 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-gray-900 font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-2 text-gray-900">Our Expertise</h2>
            <p className="text-lg text-gray-600 mb-8">Excellence in Steel Fabrication & Building Erection</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
              {/* Modern Equipment Card */}
              <div className="p-8 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 text-center">Modern Equipment</h3>
                <p className="text-gray-600 text-center">State-of-the-art machinery for precision steel fabrication</p>
              </div>
              
              {/* Expert Team Card */}
              <div className="p-8 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 text-center">Expert Team</h3>
                <p className="text-gray-600 text-center">Highly trained professionals with industrial expertise</p>
              </div>
              
              {/* Trusted Partners Card */}
              <div className="p-8 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 text-center">Trusted Partners</h3>
                <p className="text-gray-600 text-center">Collaboration with renowned engineers and architects</p>
              </div>
            </div>
          </div>

          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Journey</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">From humble beginnings to industry leadership</p>
            
            {/* Interactive timeline */}
            <div className="relative max-w-5xl mx-auto py-12">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* 1995 Card - Left side */}
                <div className="md:col-start-1 md:col-end-2 relative">
                  <div className="bg-gradient-to-b from-gray-50 to-white border border-gray-200 p-8 rounded-2xl shadow-sm text-left">
                    {/* Timeline dot */}
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-orange-500 border-4 border-white z-10 md:block hidden"></div>
                    
                    <div className="flex items-center mb-4">
                      <div className="bg-orange-500 p-3 rounded-full text-white mr-3 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">1995</h3>
                        <p className="text-gray-600">Foundation & Vision</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mt-4">
                      <span className="text-orange-600 font-semibold">VEERU ENGINEERING & INFRA</span> was
                      established in 1995 with unwavering dedication and
                      determination to offer quality Structural Steel Fabrication
                      and Erection Work.
                    </p>
                  </div>
                </div>
                
                {/* Empty space for alignment */}
                <div className="md:col-start-2 md:col-end-3 md:h-20"></div>
                
                {/* 2005 Card - Right side, slightly lower */}
                <div className="md:col-start-2 md:col-end-3 relative md:-mt-16">
                  <div className="bg-gradient-to-b from-gray-50 to-white border border-gray-200 p-8 rounded-2xl shadow-sm text-left">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-orange-500 border-4 border-white z-10 md:block hidden"></div>
                    
                    <div className="flex items-center mb-4">
                      <div className="bg-orange-500 p-3 rounded-full text-white mr-3 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">2005</h3>
                        <p className="text-gray-600">Expansion & Growth</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mt-4">
                      By 2005, we had expanded our operations significantly, taking on larger projects and building a reputation for excellence in the industry. Our team grew to include more specialized engineers and technicians.
                    </p>
                  </div>
                </div>
                
                {/* Today Card - Left side */}
                <div className="md:col-start-1 md:col-end-2 relative">
                  <div className="bg-gradient-to-b from-gray-50 to-white border border-gray-200 p-8 rounded-2xl shadow-sm text-left">
                    {/* Timeline dot */}
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-orange-500 border-4 border-white z-10 md:block hidden"></div>
                    
                    <div className="flex items-center mb-4">
                      <div className="bg-orange-500 p-3 rounded-full text-white mr-3 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Today</h3>
                        <p className="text-gray-600">Industry Leadership</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mt-4">
                      Today, we have achieved a respectable position for
                      completing Heavy Equipment works as per client specifications.
                      Our strategic approach enables us to handle projects with
                      perfection and innovation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Leadership section - light theme */}
          <div className="mb-16 bg-gray-50 py-16 rounded-2xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Meet Our <span className="italic">Incredible</span> Team</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                Dedicated. Skilled. Trusted.
              </p>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                Our experienced team delivers precise civil construction solutions to leading industrial giants such as Adani, JSW, and more. We drive project excellence, safety, and reliability through every partnership. Your vision becomes reality with unmatched expertise and commitment.
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-16 mt-12">
                {teamMembers.map((member, index) => (
                  <div
                    key={member.id}
                    className="text-center flex flex-col items-center mb-12 sm:mb-16"
                  >
                    {/* Circular image container */}
                    <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden bg-gray-200 mb-4 border-4 border-gray-300 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-auto h-auto max-w-none"
                        style={{
                          minWidth: '100%',
                          minHeight: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center 30%', // Position to focus on face
                          transform: 'scale(1.1)' // Slightly zoom in to focus on face
                        }}
                      />
                    </div>
                    
                    {/* Colored indicator dot */}
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center mb-2">
                      <span className="text-sm font-bold text-white">{index + 1}</span>
                    </div>
                    
                    {/* Position title */}
                    <p className="text-sm font-medium mb-1 text-orange-500">
                      {member.position}
                    </p>
                    
                    {/* Name */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                    
                    {/* Custom description for each team member */}
                    <p className="text-sm text-gray-500 max-w-[180px] sm:max-w-[220px]">
                      {index === 0 && "Leading our team with vision and expertise in industrial engineering since 1995."}
                      {index === 1 && "Overseeing project execution and ensuring operational excellence across all sites."}
                      {index === 2 && "Driving strategic decisions and business growth with decades of industry experience."}
                      {index === 3 && "Managing financial operations and ensuring sustainable growth for our company."}
                      {index === 4 && "Bringing innovative technical solutions to our most challenging projects."}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
