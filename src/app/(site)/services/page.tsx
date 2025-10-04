import Link from 'next/link';
import HeroSection from '../../../components/HeroSection';
import CountUp from '../../../components/CountUp';

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

// Dummy services data
const dummyServices = [
  {
    id: 1,
    title: "Fabrication",
    description: "Precision metal fabrication services for industrial applications with high-quality standards.",
    icon: "building"
  },
  {
    id: 2,
    title: "Structural Erection",
    description: "Professional structural erection services for industrial and commercial projects.",
    icon: "crane"
  },
  {
    id: 3,
    title: "Piping",
    description: "Comprehensive industrial piping solutions for various applications and industries.",
    icon: "pipe"
  },
  {
    id: 4,
    title: "Sheds",
    description: "Custom industrial shed design, fabrication, and installation services.",
    icon: "warehouse"
  },
  {
    id: 5,
    title: "Equipment",
    description: "Specialized industrial equipment installation, maintenance, and repair services.",
    icon: "cog"
  },
];

export default function ServicesPage() {
  return (
    <div>
      <HeroSection
        title="Our Services"
        description="We offer a comprehensive range of industrial fabrication and engineering services tailored to meet the specific needs of your projects."
      />

      {/* Services section */}
      <section className="py-16">
        <div className="container">
          <div className="relative mb-12">
            <div className="absolute -left-4 top-0 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-blue">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="pl-10">
              <h2 className="text-2xl font-semibold mb-6 inline-block bg-clip-text text-transparent bg-gradient-blue">Our Expertise</h2>
              <div className="h-1 w-20 bg-gradient-blue rounded mb-6"></div>
              <p className="mb-8 text-steel-300 max-w-3xl">
                Our team of skilled professionals delivers exceptional quality across a wide range of industrial services.
                Each service is backed by years of experience and a commitment to excellence.
              </p>
            </div>
          </div>
          
          <div className="responsive-grid-3">
            {dummyServices.map((service) => (
              <div
                key={service.id}
                className="card p-8 flex flex-col items-center text-center fade-in"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue/30 to-brand-blue/10 flex items-center justify-center mb-4">
                  {getIconForService(service.icon)}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-steel-300">{service.description}</p>
                
                <div className="mt-6 pt-4 border-t border-steel-700/30 w-full">
                  <Link 
                    href="/contact"
                    className="text-brand-blue hover:text-white transition-colors flex items-center justify-center w-full"
                  >
                    Contact Us
                    <svg 
                      className="h-4 w-4 ml-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* Stats Section */}
          <div className="my-16 py-10 px-8 bg-gradient-card rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-gradient-blue opacity-5 rounded-full"></div>
            <div className="absolute -left-10 -bottom-10 w-60 h-60 bg-gradient-blue opacity-5 rounded-full"></div>
            
            <h3 className="text-2xl font-semibold mb-8 text-center">Our Impact by the Numbers</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center transform transition-all duration-300 hover:scale-105">
                <div className="text-4xl font-bold text-white mb-2">
                  <span className="bg-clip-text text-transparent bg-gradient-blue">
                    <CountUp end={150} suffix="+" duration={2.5} />
                  </span>
                </div>
                <div className="text-steel-300">Projects Completed</div>
              </div>
              
              <div className="text-center transform transition-all duration-300 hover:scale-105">
                <div className="text-4xl font-bold text-white mb-2">
                  <span className="bg-clip-text text-transparent bg-gradient-blue">
                    <CountUp end={15} suffix="+" duration={2.5} />
                  </span>
                </div>
                <div className="text-steel-300">Years Experience</div>
              </div>
              
              <div className="text-center transform transition-all duration-300 hover:scale-105">
                <div className="text-4xl font-bold text-white mb-2">
                  <span className="bg-clip-text text-transparent bg-gradient-blue">
                    <CountUp end={50} suffix="+" duration={2.5} />
                  </span>
                </div>
                <div className="text-steel-300">Satisfied Clients</div>
              </div>
              
              <div className="text-center transform transition-all duration-300 hover:scale-105">
                <div className="text-4xl font-bold text-white mb-2">
                  <span className="bg-clip-text text-transparent bg-gradient-blue">
                    <CountUp end={5000} suffix="+" duration={2.5} />
                  </span>
                </div>
                <div className="text-steel-300">Tons of Steel</div>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold mb-4">Ready to Start Your Project?</h3>
            <p className="text-steel-300 max-w-2xl mx-auto mb-8">
              Our team of experts is ready to help you bring your vision to life with our comprehensive range of services.
            </p>
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center px-8 py-3 bg-gradient-blue text-white rounded-md shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <span className="relative z-10 flex items-center justify-center">
                Contact Us Today
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
      </section>
    </div>
  );
}
