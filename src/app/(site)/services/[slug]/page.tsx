'use client';

import Link from 'next/link';
import { useState } from 'react';
import HeroSection from '../../../../components/HeroSection';
import Image from 'next/image';

// Icons mapping for service icons
const iconComponents: Record<string, React.ReactNode> = {
  building: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  cog: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  pipe: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  warehouse: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
    </svg>
  ),
  crane: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  // Default icon if none matches
  default: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
};

// Function to get icon based on icon name
function getIconForService(iconName: string) {
  return iconComponents[iconName] || iconComponents.default;
}

// Service details data
const serviceDetails = {
  fabrication: {
    title: "Fabrication",
    description: "Precision metal fabrication services for industrial applications with high-quality standards.",
    icon: "building",
    detailedDescription: "Our fabrication services include cutting, bending, welding, and assembling various metals to create structures and components for industrial use. We specialize in custom fabrication for complex projects, utilizing advanced technology and skilled craftsmen to deliver precision results. Our team can handle projects of any scale, from small components to large industrial structures.",
    features: [
      "Custom metal fabrication for industrial applications",
      "Precision cutting, bending, and welding services",
      "Large-scale structural fabrication capabilities",
      "Quality control and testing at every stage",
      "Experienced team of certified welders and fabricators"
    ]
  },
  erection: {
    title: "Erection",
    description: "Professional structural erection services for industrial and commercial projects.",
    icon: "crane",
    detailedDescription: "Our erection services cover the assembly and installation of structural components on-site. We handle everything from foundation preparation to final assembly, ensuring structural integrity and safety at every step. Our experienced team uses specialized equipment and follows strict safety protocols to complete projects efficiently and safely, even in challenging environments.",
    features: [
      "Structural steel erection for industrial facilities",
      "Equipment installation and positioning",
      "Specialized heavy lifting capabilities",
      "Comprehensive safety protocols and compliance",
      "Experienced project management and coordination"
    ]
  },
  piping: {
    title: "Piping",
    description: "Comprehensive industrial piping solutions for various applications and industries.",
    icon: "pipe",
    detailedDescription: "We provide end-to-end piping solutions including design, fabrication, installation, and testing. Our expertise covers various materials and specifications suitable for different industrial applications, from water systems to chemical processing. We ensure leak-proof installations, proper insulation, and compliance with industry standards for all piping projects.",
    features: [
      "Industrial piping design and installation",
      "High-pressure and large-diameter pipe fabrication",
      "Specialized welding for various materials",
      "Pressure testing and quality assurance",
      "Maintenance and repair services for existing systems"
    ]
  },
  sheds: {
    title: "Sheds",
    description: "Custom industrial shed design, fabrication, and installation services.",
    icon: "warehouse",
    detailedDescription: "Our industrial shed services include design, fabrication, and construction of durable structures for various applications. We create custom solutions based on your specific requirements, considering factors like space utilization, ventilation, lighting, and future expansion possibilities. Our sheds are built to withstand harsh environmental conditions while providing optimal functionality.",
    features: [
      "Custom industrial shed design and engineering",
      "Pre-engineered building solutions",
      "Structural steel fabrication and erection",
      "Roofing and cladding installation",
      "Complete turnkey solutions including foundations"
    ]
  },
  equipment: {
    title: "Equipment",
    description: "Specialized industrial equipment installation, maintenance, and repair services.",
    icon: "cog",
    detailedDescription: "We offer comprehensive services for industrial equipment, including installation, maintenance, repair, and upgrades. Our team is trained to handle various types of industrial machinery and equipment, ensuring optimal performance and longevity. We also provide consultation on equipment selection and layout optimization for maximum efficiency in your operations.",
    features: [
      "Industrial equipment installation and commissioning",
      "Preventive maintenance programs",
      "Emergency repair services",
      "Equipment upgrades and modifications",
      "Technical consultation and optimization"
    ]
  }
};

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const service = serviceDetails[slug as keyof typeof serviceDetails];
  
  if (!service) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
        <p className="text-steel-300 mb-8">The service you're looking for doesn't exist or has been moved.</p>
        <Link href="/services" className="btn-primary">
          Back to Services
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <HeroSection
        title={service.title}
        description={service.description}
      >
        <Link href="/services" className="text-brand-blue hover:text-white mb-4 inline-flex items-center">
          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Services
        </Link>
      </HeroSection>

      {/* Service detail section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="relative mb-12">
                <div className="absolute -left-4 top-0 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-blue">
                  <div className="text-white">
                    {getIconForService(service.icon)}
                  </div>
                </div>
                <div className="pl-10">
                  <h2 className="text-2xl font-semibold mb-6 inline-block bg-clip-text text-transparent bg-gradient-blue">Overview</h2>
                  <div className="h-1 w-20 bg-gradient-blue rounded mb-6"></div>
                </div>
              </div>
              <div className="bg-gradient-card rounded-xl p-8 shadow-lg relative overflow-hidden mb-12">
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-blue opacity-10 rounded-full"></div>
                <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-gradient-blue opacity-10 rounded-full"></div>
                
                <p className="text-steel-200 relative z-10">
                  {service.detailedDescription}
                </p>
              </div>
              
              <div className="relative mb-12">
                <div className="absolute -left-4 top-0 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="pl-10">
                  <h2 className="text-2xl font-semibold mb-6 inline-block bg-clip-text text-transparent bg-gradient-blue">Key Features</h2>
                  <div className="h-1 w-20 bg-gradient-blue rounded mb-6"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {service.features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-gradient-card rounded-lg p-4 shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl relative overflow-hidden"
                  >
                    <div className="absolute -right-8 -top-8 w-16 h-16 bg-gradient-blue opacity-10 rounded-full"></div>
                    <div className="flex items-start relative z-10">
                      <div className="bg-gradient-blue rounded-full p-2 mr-3 flex-shrink-0">
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-steel-200">{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Project Showcase */}
              <div className="relative mb-12">
                <div className="absolute -left-4 top-0 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="pl-10">
                  <h2 className="text-2xl font-semibold mb-6 inline-block bg-clip-text text-transparent bg-gradient-blue">Project Showcase</h2>
                  <div className="h-1 w-20 bg-gradient-blue rounded mb-6"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="bg-gradient-card rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                  >
                    <div className="relative h-48 w-full">
                      <div className="absolute inset-0 bg-gradient-blue/20 z-10"></div>
                      <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/70 px-4 py-2 rounded-md">
                          <span className="text-white font-medium">View Project</span>
                        </div>
                      </div>
                      <div className="h-full w-full bg-steel-800 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-steel-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-white mb-1">Project Example {item}</h3>
                      <p className="text-steel-300 text-sm">Showcasing our expertise in {service.title.toLowerCase()} services.</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center px-8 py-3 bg-gradient-blue text-white rounded-md shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Contact Us About This Service
                    <svg
                      className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-white opacity-20 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              </div>
            </div>
            
            <div className="bg-gradient-card rounded-xl shadow-lg h-fit relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-blue opacity-10 rounded-full"></div>
              <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-gradient-blue opacity-10 rounded-full"></div>
              
              <div className="p-6 relative z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-blue flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-center">Request Information</h3>
                <p className="text-steel-300 mb-6 text-center">
                  Interested in our {service.title.toLowerCase()} services? Contact us today for a consultation and quote.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center p-3 bg-steel-800/50 rounded-lg transition-colors hover:bg-steel-800/70">
                    <div className="w-10 h-10 rounded-full bg-gradient-blue flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-steel-400">Phone</div>
                      <span className="text-steel-200">+91 98765 43210</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-steel-800/50 rounded-lg transition-colors hover:bg-steel-800/70">
                    <div className="w-10 h-10 rounded-full bg-gradient-blue flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-steel-400">Email</div>
                      <span className="text-steel-200">info@veeruengineering.com</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-steel-700/30">
                  <Link
                    href="/contact"
                    className="group relative inline-flex items-center justify-center px-6 py-3 bg-gradient-blue text-white rounded-md shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg w-full"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Request a Quote
                      <svg
                        className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-white opacity-20 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Services Section */}
      <section className="py-16 bg-gradient-to-b from-steel-900/50 to-steel-900">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold mb-4 inline-block bg-clip-text text-transparent bg-gradient-blue">Related Services</h2>
            <p className="text-steel-300 max-w-2xl mx-auto">
              Explore our other services that complement {service.title.toLowerCase()} to create comprehensive solutions for your projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(serviceDetails)
              .filter(([key]) => key !== slug)
              .slice(0, 3)
              .map(([key, relatedService]) => (
                <div
                  key={key}
                  className="bg-gradient-card rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl relative overflow-hidden group"
                >
                  <div className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-blue opacity-10 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
                  <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-gradient-blue opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <div className="flex flex-col items-center text-center relative z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-blue flex items-center justify-center mb-4">
                      <div className="text-white">
                        {getIconForService(relatedService.icon)}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{relatedService.title}</h3>
                    <p className="text-steel-300 mb-4">{relatedService.description}</p>
                    
                    <Link
                      href={`/services/${key}`}
                      className="mt-auto text-brand-blue hover:text-white transition-colors flex items-center justify-center"
                    >
                      Learn More
                      <svg className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}