import { getLiveProjects, LiveProject } from '../../../lib/api';
import HeroSection from '../../../components/HeroSection';

export default async function ProjectsPage() {
  // Fetch all projects from the backend
  let liveProjects: LiveProject[] = [];
  let error = null;
  
  // Dummy projects data to show when backend is not connected
  const dummyProjects: LiveProject[] = [
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

  try {
    // Fetch real data from the API
    liveProjects = await getLiveProjects();
    
    // Log the number of projects fetched
    console.log(`Fetched ${liveProjects.length} live projects`);
    
    // If no projects were fetched, use dummy data
    if (liveProjects.length === 0) {
      liveProjects = dummyProjects;
      console.log('No projects found, using dummy data');
    }
  } catch (e) {
    error = e;
    console.error('Error fetching projects:', e);
    
    // Use dummy data when API fails
    liveProjects = dummyProjects;
    console.log('API error, using dummy data');
    error = null; // Clear error to show the dummy data
  }

  return (
    <div>
      <HeroSection
        title="Our Projects"
        description="Explore our portfolio of live projects across various industries."
      />

      {/* Projects section */}
      <section className="py-16">
        <div className="container">
          {error ? (
            <div className="bg-red-900/20 rounded-lg p-6 text-center shadow-lg">
              <h3 className="text-xl font-semibold text-red-200">Unable to load projects</h3>
              <p className="mt-2 text-steel-300">
                We're experiencing technical difficulties. Please try again later.
              </p>
            </div>
          ) : (
            <>
              {/* Live Projects */}
              <div>
                <h2 className="text-2xl font-semibold mb-8 text-white">Our Projects</h2>
                
                {liveProjects.length === 0 ? (
                  <div className="text-center p-8 bg-gradient-card rounded-lg shadow-lg">
                    <p className="text-steel-100 text-lg">No live projects available at the moment.</p>
                    <p className="text-steel-300 mt-2">Please check back later for updates on our ongoing projects.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {liveProjects.map((project) => (
                      <div key={project.id} className="bg-gradient-card rounded-xl p-6 shadow-lg flex flex-col">
                        {project.image_url && (
                          <div className="mb-4 rounded-lg overflow-hidden">
                            <img
                              src={project.image_url}
                              alt={project.name}
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        )}
                        <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                        <div className="mb-3">
                          <span className="inline-block bg-green-600/20 text-green-400 text-sm px-2 py-1 rounded">
                            Live
                          </span>
                          <span className="inline-block ml-2 text-steel-300 text-sm">
                            Quantity: {project.quantity}
                          </span>
                        </div>
                        <p className="text-steel-300 flex-grow mb-4">{project.details}</p>
                        {project.location && (
                          <p className="text-steel-300">Location: {project.location}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
            </>
          )}
        </div>
      </section>
    </div>
  );
}
