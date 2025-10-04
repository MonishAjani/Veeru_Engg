'use client';

import { useState, useEffect, useRef } from 'react';
import HeroSection from '../../../components/HeroSection';
import Image from 'next/image';

// Sample team members data
const teamMembers = [
  {
    id: 1,
    name: 'Narayan Singh',
    position: 'CEO & Founder',
    image: '/images/team/Narayan Singh 01.jpg'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    position: 'Chief Operations Officer',
    image: '/images/team/placeholder.jpg'
  },
  {
    id: 3,
    name: 'Vikram Singh',
    position: 'Technical Director',
    image: '/images/team/placeholder.jpg'
  },
  {
    id: 4,
    name: 'Ananya Patel',
    position: 'Chief Engineer',
    image: '/images/team/placeholder.jpg'
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
    <div className="bg-gradient-to-b from-steel-900 to-brand-black min-h-screen">
      {/* Hero section with parallax */}
      <div className="relative h-[60vh] overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0 bg-gradient-to-b from-black to-steel-900 flex items-center justify-center"
        >
          <div className="container relative z-10 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-blue">About Us</h1>
            <p className="text-xl text-steel-100 max-w-3xl mx-auto">
              We are pleased to introduce ourselves as one of the renowned structural fabricators
              engaged in Steel Fabrication, Erection Works, Structural Fabrication, Heavy Equipments,
              Industrial Piping and Factory Sheds.
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-blue opacity-10 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-blue opacity-10 blur-3xl"></div>
        </div>
      </div>

      {/* Main content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-2 text-white bg-clip-text text-transparent bg-gradient-blue">Our Expertise</h2>
            <p className="text-xl text-steel-100 mb-8">Excellence in Steel Fabrication & Building Erection</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
              {/* Modern Equipment Card */}
              <div className="bg-gradient-card p-6 rounded-lg shadow-metal backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden group">
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-blue opacity-10 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
                <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-gradient-blue opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="flex justify-center mb-4 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-gradient-blue flex items-center justify-center text-white transform transition-transform duration-300 group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 relative z-10">Modern Equipment</h3>
                <p className="text-steel-300 relative z-10">State-of-the-art machinery for precision steel fabrication</p>
              </div>
              
              {/* Expert Team Card */}
              <div className="bg-gradient-card p-6 rounded-lg shadow-metal backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden group">
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-blue opacity-10 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
                <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-gradient-blue opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="flex justify-center mb-4 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-gradient-blue flex items-center justify-center text-white transform transition-transform duration-300 group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 relative z-10">Expert Team</h3>
                <p className="text-steel-300 relative z-10">Highly trained professionals with industrial expertise</p>
              </div>
              
              {/* Trusted Partners Card */}
              <div className="bg-gradient-card p-6 rounded-lg shadow-metal backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden group">
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-blue opacity-10 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
                <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-gradient-blue opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="flex justify-center mb-4 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-gradient-blue flex items-center justify-center text-white transform transition-transform duration-300 group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 relative z-10">Trusted Partners</h3>
                <p className="text-steel-300 relative z-10">Collaboration with renowned engineers and architects</p>
              </div>
            </div>
          </div>

          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white bg-clip-text text-transparent bg-gradient-blue">Our Journey</h2>
            <p className="text-xl text-steel-100 mb-8 max-w-3xl mx-auto">From humble beginnings to industry leadership</p>
            
            {/* Interactive timeline */}
            <div className="relative max-w-5xl mx-auto py-12">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-blue opacity-30"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* 1995 Card - Left side */}
                <div className="md:col-start-1 md:col-end-2 relative">
                  <div className="bg-gradient-card p-8 rounded-lg shadow-metal backdrop-blur-sm text-left transform transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden group">
                    {/* Timeline dot */}
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-blue-500 border-4 border-steel-900 z-10 md:block hidden"></div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-blue opacity-10 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
                    <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-gradient-blue opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                    
                    <div className="flex items-center mb-4 relative z-10">
                      <div className="bg-blue-500 p-3 rounded-full text-white mr-3 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-blue">1995</h3>
                        <p className="text-steel-300">Foundation & Vision</p>
                      </div>
                    </div>
                    <p className="text-steel-200 mt-4 relative z-10">
                      <span className="text-blue-400 font-semibold">VEERU ENGINEERING & INFRA</span> was
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
                  <div className="bg-gradient-card p-8 rounded-lg shadow-metal backdrop-blur-sm text-left transform transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden group">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-purple-500 border-4 border-steel-900 z-10 md:block hidden"></div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-blue opacity-10 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
                    <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-gradient-blue opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                    
                    <div className="flex items-center mb-4 relative z-10">
                      <div className="bg-purple-500 p-3 rounded-full text-white mr-3 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-blue">2005</h3>
                        <p className="text-steel-300">Expansion & Growth</p>
                      </div>
                    </div>
                    <p className="text-steel-200 mt-4 relative z-10">
                      By 2005, we had expanded our operations significantly, taking on larger projects and building a reputation for excellence in the industry. Our team grew to include more specialized engineers and technicians.
                    </p>
                  </div>
                </div>
                
                {/* Today Card - Left side */}
                <div className="md:col-start-1 md:col-end-2 relative">
                  <div className="bg-gradient-card p-8 rounded-lg shadow-metal backdrop-blur-sm text-left transform transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden group">
                    {/* Timeline dot */}
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-green-500 border-4 border-steel-900 z-10 md:block hidden"></div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-blue opacity-10 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
                    <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-gradient-blue opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                    
                    <div className="flex items-center mb-4 relative z-10">
                      <div className="bg-green-500 p-3 rounded-full text-white mr-3 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-blue">Today</h3>
                        <p className="text-steel-300">Industry Leadership</p>
                      </div>
                    </div>
                    <p className="text-steel-200 mt-4 relative z-10">
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


          {/* Leadership section - Updated design */}
          <div className="mb-16 bg-[#0f172a] py-16 rounded-xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4 text-white bg-clip-text text-transparent bg-gradient-blue">Meet Our <span className="italic">Incredible</span> Team</h2>
              <p className="text-xl text-steel-100 mb-8 max-w-3xl mx-auto">
                Being the best isn't just a claim we make—it's a standard our team consistently upholds
                through every project, partnership, and solution we deliver.
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-wrap justify-center gap-10 mt-12">
                {teamMembers.map((member, index) => {
                  // Define different colors for each team member's indicator
                  const colors = [
                    'bg-white', // White
                    'bg-green-500', // Green
                    'bg-blue-500', // Blue
                    'bg-gray-400', // Gray
                    'bg-yellow-500' // Yellow
                  ];
                  
                  return (
                    <div
                      key={member.id}
                      className="text-center flex flex-col items-center"
                    >
                      {/* Circular image container */}
                      <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4 border-4 border-gray-700">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Colored indicator dot */}
                      <div className={`w-6 h-6 rounded-full ${colors[index % colors.length]} flex items-center justify-center mb-2`}>
                        <span className="text-xs font-bold text-gray-900">{index + 1}</span>
                      </div>
                      
                      {/* Position title with color matching the dot */}
                      <p className={`text-xs font-medium mb-1 ${
                        index === 0 ? 'text-white' :
                        index === 1 ? 'text-green-500' :
                        index === 2 ? 'text-blue-500' :
                        index === 3 ? 'text-gray-400' :
                        'text-yellow-500'
                      }`}>
                        {member.position}
                      </p>
                      
                      {/* Name */}
                      <h3 className="text-lg font-semibold text-white mb-2">{member.name}</h3>
                      
                      {/* Description text */}
                      <p className="text-xs text-gray-400 max-w-[150px]">
                        Lorem ipsum is simply dummy text of the printing and typesetting industry
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
