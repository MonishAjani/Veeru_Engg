import { getServices } from '../../../lib/api'

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

export default async function ServicesPage() {
  // Fetch services from the backend
  let services: any[] = [];
  let error = null;
  
  try {
    const result: any = await getServices();
    // Handle both direct array and paginated response with results array
    if (Array.isArray(result)) {
      services = result;
    } else if (result && typeof result === 'object' && Array.isArray(result.results)) {
      services = result.results;
    }
  } catch (e) {
    error = e;
    console.error('Error fetching services:', e);
  }

  return (
    <div>
      {/* Hero section */}
      <section className="py-12 bg-gradient-to-b from-black to-steel-900">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold">Our Services</h1>
          <p className="mt-4 text-steel-200 max-w-3xl">
            We offer a comprehensive range of industrial fabrication and engineering services
            tailored to meet the specific needs of your projects.
          </p>
        </div>
      </section>

      {/* Services section */}
      <section className="py-16">
        <div className="container">
          {error ? (
            <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-red-200">Unable to load services</h3>
              <p className="mt-2 text-steel-300">
                We're experiencing technical difficulties. Please try again later.
              </p>
            </div>
          ) : services.length === 0 ? (
            // Message when no services are available
            <div className="bg-steel-900/20 border border-steel-800/50 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold">No Services Available</h3>
              <p className="mt-2 text-steel-300">
                Please add services through the admin panel.
              </p>
            </div>
          ) : (
            // Display actual services from the backend
            <div className="responsive-grid-3">
              {services.map((service) => (
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
                    <button className="text-brand-blue hover:text-white transition-colors flex items-center justify-center w-full">
                      Learn More
                      <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

