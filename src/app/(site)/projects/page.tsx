import { getProjects } from '../../../lib/api';

export default async function ProjectsPage() {
  // Fetch all projects from the backend
  let liveProjects = [];
  let completedProjects = [];
  let error = null;
  
  try {
    // Fetch projects by type
    liveProjects = await getProjects('live');
    completedProjects = await getProjects('completed');
  } catch (e) {
    error = e;
    console.error('Error fetching projects:', e);
  }

  return (
    <div>
      {/* Hero section */}
      <section className="py-12 bg-gradient-to-b from-black to-steel-900">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold">Our Projects</h1>
          <p className="mt-4 text-steel-200 max-w-3xl">
            Explore our portfolio of live and completed projects across various industries.
          </p>
        </div>
      </section>

      {/* Projects section */}
      <section className="py-16">
        <div className="container">
          {error ? (
            <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-red-200">Unable to load projects</h3>
              <p className="mt-2 text-steel-300">
                We're experiencing technical difficulties. Please try again later.
              </p>
            </div>
          ) : (
            <>
              {/* Live Projects */}
              <div className="mb-16">
                <h2 className="text-2xl font-semibold mb-8">Live Projects</h2>
                
                {liveProjects.length === 0 ? (
                  <div className="bg-steel-900/20 border border-steel-800/50 rounded-lg p-6 text-center">
                    <p className="text-steel-300">No live projects currently available.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {liveProjects.map((project) => (
                      <div key={project.id} className="card p-6 flex flex-col">
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
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Completed Projects */}
              <div>
                <h2 className="text-2xl font-semibold mb-8">Completed Projects</h2>
                
                {completedProjects.length === 0 ? (
                  <div className="bg-steel-900/20 border border-steel-800/50 rounded-lg p-6 text-center">
                    <p className="text-steel-300">No completed projects available.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {completedProjects.map((project) => (
                      <div key={project.id} className="card p-6 flex flex-col">
                        <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                        <div className="mb-3">
                          <span className="inline-block bg-blue-600/20 text-blue-400 text-sm px-2 py-1 rounded">
                            Completed
                          </span>
                          <span className="inline-block ml-2 text-steel-300 text-sm">
                            Quantity: {project.quantity}
                          </span>
                        </div>
                        <p className="text-steel-300 flex-grow mb-4">{project.details}</p>
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
