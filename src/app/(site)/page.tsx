'use client';

import CountUp from '../../components/CountUp';
import { useState, useEffect } from 'react';
import { getLiveProjects, LiveProject } from '../../lib/api';

// Company values data
const companyValues = [
  {
    id: 1,
    title: "Excellence",
    description: "We strive for excellence in every project, delivering the highest quality workmanship and materials.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Innovation",
    description: "We embrace innovative solutions and technologies to solve complex engineering challenges.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Integrity",
    description: "We conduct our business with the highest standards of integrity, transparency, and ethical practices.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    id: 4,
    title: "Safety",
    description: "Safety is our top priority in every project, ensuring the wellbeing of our team and clients.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  }
];

export default function HomePage() {
  const [activeValue, setActiveValue] = useState(1);
  const [featuredProjects, setFeaturedProjects] = useState<LiveProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeProject, setActiveProject] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch projects on component mount
  useEffect(() => {
    async function fetchProjects() {
      try {
        setIsLoading(true);
        const live = await getLiveProjects();
        
        // Select a few featured projects
        const featured = live.slice(0, 4); // Get up to 4 projects
        
        if (featured.length > 0) {
          setFeaturedProjects(featured);
        } else {
          // Use dummy data if no projects were fetched
          setFeaturedProjects(getDummyProjects());
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Use dummy data when API fails
        setFeaturedProjects(getDummyProjects());
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchProjects();
  }, []);
  
  // Function to get dummy projects data
  function getDummyProjects(): LiveProject[] {
    return [
      {
        id: 1,
        name: "AMRUTHA CONSTRUCTIONS PVT.LTD.",
        details: "Structural fabrication and erection for industrial facility including heavy equipment installation and piping work.",
        quantity: "2000 MT",
        location: "Nagpur, Maharashtra",
        image_url: "/images/projects/Jindal_Power_Plant.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 2,
        name: "S.S.Fabricators (Engineers & Contractors)",
        details: "Complete structural steel fabrication and erection for manufacturing plant expansion project.",
        quantity: "650 MT",
        location: "Pune, Maharashtra",
        image_url: "/images/projects/Power_Project_Koradi.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 3,
        name: "Sunil Hitech Engineers Ltd.",
        details: "Industrial piping and equipment installation for power plant with high-precision requirements.",
        quantity: "1200 MT",
        location: "Raipur, Chhattisgarh",
        image_url: "/images/projects/Sunil_Hitech.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
  }

  // Auto-rotate carousel
  useEffect(() => {
    if (!isPaused && featuredProjects.length > 0) {
      const interval = setInterval(() => {
        setActiveProject((prev) => (prev + 1) % featuredProjects.length);
      }, 5000); // Change slide every 5 seconds
      
      return () => clearInterval(interval);
    }
  }, [featuredProjects.length, isPaused]);

  return (
    <div className="overflow-x-hidden bg-[#141c2f]">
      {/* Hero section based on the provided design */}
      <section className="min-h-screen flex flex-col justify-center relative overflow-hidden">
        {/* Background image with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/Adani Plant.jpg"
            alt="Industrial Engineering"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient overlay with specified opacity */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f14] to-[#111827] opacity-65"></div>
        </div>
        
        <div className="container relative z-30">
          <div className="max-w-5xl">
            {/* Badge with updated styling to match design */}
            <div
              className="inline-block mb-6 px-4 py-2 bg-[#1e3a8a] rounded-full text-sm font-medium text-white"
            >
              Established 1995
            </div>
            
            {/* Headline with updated styling to match design */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
              Craft <span className="italic text-[#4d8bf8]">
                Precision
              </span> Solutions
              <br />with Veeru Engineering.
            </h1>
            
            {/* Subheadline with semi-transparent background */}
            <p className="text-white font-medium mb-10 max-w-2xl bg-black/50 p-6 rounded-lg backdrop-blur-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
              Veeru Engineering transforms industrial challenges into engineered excellence —
              delivering large-scale fabrication, erection, and piping projects with
              proven safety, quality, and timelines.
            </p>
            
            {/* CTA buttons with updated styling */}
            <div className="flex flex-wrap gap-4 mb-16">
              <a
                href="/projects"
                className="inline-flex items-center justify-center bg-[#2a4cad] text-white font-medium px-8 py-4 rounded-lg hover:bg-[#3a5cbd] transition-all duration-300 shadow-lg"
              >
                View Projects
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-medium px-8 py-4 rounded-lg hover:bg-white/20 transition-all duration-300 shadow-lg"
              >
                Contact Us
              </a>
            </div>
            
            {/* Statistics at bottom with updated styling */}
            <div className="mt-auto flex items-center">
              <div className="flex items-center space-x-2">
                {/* Icons for statistics - using SVG icons that match the design */}
                <div className="flex space-x-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                <p className="text-white text-lg font-medium" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                  <span className="font-semibold">50+</span> projects delivered nationwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sister Concerns Section */}
      <section className="py-12 bg-[#141c2f]">
        <div className="container">
          <h2 className="text-2xl font-semibold mb-6 text-center">Sister Concerns</h2>
          <p className="text-steel-200 mb-8 text-center max-w-3xl mx-auto">
            VEERU ENGINEERING & INFRA. SISTERS CONCERN. For giving the complete
            concentration in the areas of Structural Steel Fabrication, Heavy Equipments, Industrial Piping &
            Erection, we have opened group of companies in the name of:
          </p>
          <div className="responsive-grid-3 max-w-4xl mx-auto">
            {[
              'Veeru Construction Company',
              'Shree Govind Ores & Metal Private Limited'
            ].map((company, index) => (
              <div
                key={index}
                className="bg-steel-700/30 p-6 rounded-lg border border-steel-600/30 text-white text-center hover:bg-steel-700/50 transition-colors"
              >
                <h3 className="text-lg font-medium">{company}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-[#141c2f]">
        <div className="container">
          <div className="responsive-grid-4">
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                value: "15+",
                label: "Years of Experience"
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                value: "200+",
                label: "Skilled Professionals"
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                value: "50+",
                label: "Major Projects"
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                value: "100%",
                label: "Safety Compliance"
              }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 relative hover:bg-steel-800/30 transition-colors rounded-lg cursor-pointer"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-brand-blue to-brand-blue/70 flex items-center justify-center shadow-lg">
                  {stat.icon}
                </div>
                <div className="mt-6">
                  <div className="relative">
                    <CountUp
                      end={parseInt(stat.value.replace(/\D/g, ''))}
                      suffix={stat.value.includes('%') ? '%' : '+'}
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 w-8 bg-brand-blue/50"></div>
                  </div>
                  <p className="text-steel-300 mt-4">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-16 bg-[#141c2f]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white bg-clip-text text-transparent bg-gradient-blue">Our Values</h2>
            <p className="text-xl text-steel-100 mb-8 max-w-3xl mx-auto">The principles that guide our work</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {companyValues.map((value) => (
              <div
                key={value.id}
                onClick={() => setActiveValue(value.id)}
                className={`bg-gradient-card p-6 rounded-lg shadow-metal backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden group cursor-pointer ${
                  activeValue === value.id ? 'ring-2 ring-brand-blue scale-105' : ''
                }`}
              >
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-blue opacity-10 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
                <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-gradient-blue opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="flex justify-center mb-4 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-gradient-blue flex items-center justify-center text-white transform transition-transform duration-300 group-hover:scale-110">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 relative z-10">{value.title}</h3>
                <p className="text-steel-300 relative z-10">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 bg-[#141c2f] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-blue-500 blur-3xl"></div>
          <div className="absolute top-1/2 right-0 w-60 h-60 rounded-full bg-purple-500 blur-3xl"></div>
          <div className="absolute -bottom-20 left-1/3 w-60 h-60 rounded-full bg-cyan-500 blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white bg-clip-text text-transparent bg-gradient-blue">Our Featured Projects</h2>
            <p className="text-xl text-steel-100 mb-8 max-w-3xl mx-auto">Discover our exceptional work and innovative solutions</p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : featuredProjects.length === 0 ? (
            <div className="text-center p-8 bg-gradient-card rounded-lg shadow-lg max-w-2xl mx-auto">
              <p className="text-steel-100 text-lg">No projects available at the moment.</p>
              <p className="text-steel-300 mt-2">Please check back later for our project portfolio.</p>
            </div>
          ) : (
            <div className="relative">
              {/* Project Showcase - 3D Carousel */}
              <div
                className="relative h-[500px] perspective-1000 mx-auto max-w-5xl"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  {featuredProjects.map((project, index) => (
                    <div
                      key={project.id}
                      className={`absolute w-full max-w-lg transition-all duration-700 ease-in-out transform-gpu ${
                        index === activeProject
                          ? 'opacity-100 scale-100 z-20'
                          : index === (activeProject + 1) % featuredProjects.length
                          ? 'opacity-70 scale-90 translate-x-[30%] z-10'
                          : index === (activeProject - 1 + featuredProjects.length) % featuredProjects.length
                          ? 'opacity-70 scale-90 -translate-x-[30%] z-10'
                          : 'opacity-0 scale-75 z-0'
                      }`}
                    >
                      <div
                        className="bg-gradient-card rounded-xl p-6 shadow-xl backdrop-blur-sm border border-steel-700/30 overflow-hidden group float cursor-pointer"
                        onClick={() => window.location.href = `/projects/${project.id}`}
                      >
                        <div className="relative h-56 mb-4 rounded-lg overflow-hidden">
                          <img
                            src={project.image_url || '/images/projects/placeholder.jpg'}
                            alt={project.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                            <div className="p-4">
                              <p className="text-white text-sm">{project.details.substring(0, 100)}...</p>
                            </div>
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 flex items-center">
                          {project.name}
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </h3>
                        <div className="mb-3">
                          <span className="inline-block bg-green-600/20 text-green-400 text-sm px-2 py-1 rounded">
                            Live
                          </span>
                          <span className="inline-block ml-2 text-steel-300 text-sm">
                            Quantity: {project.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation controls */}
              <div className="flex justify-center mt-8 space-x-4 items-center">
                {isPaused && (
                  <div className="text-steel-300 text-sm mr-2 bg-steel-800/50 px-2 py-1 rounded-md">
                    <span className="inline-flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Paused
                    </span>
                  </div>
                )}
                <button
                  onClick={() => setActiveProject((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length)}
                  className="bg-gradient-blue p-3 rounded-full text-white shadow-lg hover:scale-110 transition-transform"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="flex items-center space-x-2">
                  {featuredProjects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveProject(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === activeProject ? 'bg-blue-500 scale-125' : 'bg-steel-600'
                      }`}
                      aria-label={`Go to project ${index + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setActiveProject((prev) => (prev + 1) % featuredProjects.length)}
                  className="bg-gradient-blue p-3 rounded-full text-white shadow-lg hover:scale-110 transition-transform"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
          
          {/* View all projects button */}
          <div className="text-center mt-12">
            <a
              href="/projects"
              className="inline-flex items-center justify-center bg-gradient-blue text-white font-medium px-8 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              View All Projects
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

// Add custom CSS for animations
const customStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
  
  .perspective-1000 {
    perspective: 1000px;
  }
  
  .transform-gpu {
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  
  .float {
    animation: float 6s ease-in-out infinite;
  }
`;
