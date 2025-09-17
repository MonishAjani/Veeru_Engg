import Link from 'next/link';

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
      {/* Hero section */}
      <section className="py-12 bg-gradient-to-b from-black to-steel-900">
        <div className="container">
          <Link href="/services" className="text-brand-blue hover:text-white mb-4 inline-flex items-center">
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Services
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">{service.title}</h1>
          <p className="mt-4 text-steel-200 max-w-3xl">
            {service.description}
          </p>
        </div>
      </section>

      {/* Service detail section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold mb-6">Overview</h2>
              <p className="text-steel-200 mb-8">
                {service.detailedDescription}
              </p>
              
              <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-brand-blue mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-steel-200">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <Link href="/contact" className="px-6 py-3 bg-brand-blue text-white font-medium rounded-md hover:bg-opacity-90 transition-colors shadow-lg">
                  Contact Us About This Service
                </Link>
              </div>
            </div>
            
            <div className="bg-steel-800/30 p-6 rounded-lg border border-steel-700/50 h-fit">
              <h3 className="text-xl font-semibold mb-4">Request Information</h3>
              <p className="text-steel-300 mb-6">
                Interested in our {service.title.toLowerCase()} services? Contact us today for a consultation and quote.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-brand-blue mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-steel-300">+91 98765 43210</span>
                </div>
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-brand-blue mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-steel-300">info@veeruengineering.com</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-steel-700/30">
                <Link href="/contact" className="w-full inline-block text-center px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-opacity-90 transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}