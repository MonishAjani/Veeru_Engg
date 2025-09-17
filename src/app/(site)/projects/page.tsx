import { getProjects } from '../../../lib/api';

export default async function ProjectsPage() {
  // Fetch all projects from the backend
  let liveProjects = [];
  let completedProjects = [];
  let error = null;
  
  try {
    // Comment out API calls to ensure dummy data is shown
    // liveProjects = await getProjects('live');
    // completedProjects = await getProjects('completed');
    
    // Force arrays to be empty to show dummy data
    liveProjects = [];
    completedProjects = [];
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="col-span-1 md:col-span-2">
                      <h3 className="text-xl font-semibold mb-4">Current Live Projects</h3>
                    </div>
                    
                    {/* Live Project 1 */}
                    <div className="card p-6 flex flex-col">
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img
                          src="/images/projects/placeholder.jpg"
                          alt="Adani Infra Project"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">ADANI INFRA. (INDIA) LIMITED</h3>
                      <div className="mb-3">
                        <span className="inline-block bg-green-600/20 text-green-400 text-sm px-2 py-1 rounded">
                          Live
                        </span>
                        <span className="inline-block ml-2 text-steel-300 text-sm">
                          Quantity: 18 KM
                        </span>
                      </div>
                      <p className="text-steel-300 mb-2">2 X 800 MW Ultra Supercritical Coal based Thermal Power Project</p>
                      <p className="text-steel-300">Location: Village Motia Dist. Godda J.H.</p>
                    </div>
                    
                    {/* Live Project 2 */}
                    <div className="card p-6 flex flex-col">
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img
                          src="/images/projects/placeholder.jpg"
                          alt="Pravaha Technologies Project"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">PRAVAHA TECHNOLOGIES</h3>
                      <div className="mb-3">
                        <span className="inline-block bg-green-600/20 text-green-400 text-sm px-2 py-1 rounded">
                          Live
                        </span>
                        <span className="inline-block ml-2 text-steel-300 text-sm">
                          Quantity: 17000 MT
                        </span>
                      </div>
                      <p className="text-steel-300">Fabrication of 3000 mm Dia 17 mm thick SAW welded bare Pipes for Nandawadagi Project Site at Karnataka</p>
                    </div>
                    
                    {/* Live Project 3 */}
                    <div className="card p-6 flex flex-col">
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img
                          src="/images/projects/placeholder.jpg"
                          alt="Afcons Infrastructure Project"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">AFCONS INFRASTRUCTURE LIMITED</h3>
                      <div className="mb-3">
                        <span className="inline-block bg-green-600/20 text-green-400 text-sm px-2 py-1 rounded">
                          Live
                        </span>
                        <span className="inline-block ml-2 text-steel-300 text-sm">
                          Quantity: 8400 MT
                        </span>
                      </div>
                      <p className="text-steel-300 mb-2">Pile Liner Fabrication Work 6400 MT</p>
                      <p className="text-steel-300 mb-2">TAB Superstructure Fabrication work 2000 MT</p>
                      <p className="text-steel-300">Project "Greater Male Connectivity – Male to Thilafushi Link Project"</p>
                    </div>
                    
                    {/* Live Project 4 */}
                    <div className="card p-6 flex flex-col">
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img
                          src="/images/projects/placeholder.jpg"
                          alt="Amrutha Constructions Project"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">AMRUTHA CONSTRUCTIONS PVT.LTD.</h3>
                      <div className="mb-3">
                        <span className="inline-block bg-green-600/20 text-green-400 text-sm px-2 py-1 rounded">
                          Live
                        </span>
                        <span className="inline-block ml-2 text-steel-300 text-sm">
                          Quantity: 6500 MT
                        </span>
                      </div>
                      <p className="text-steel-300 mb-2">Fabrication of 1388 mm Dia, 8 mm thick SAW Welded MS Pipes</p>
                      <p className="text-steel-300">Location: Near Aparala village, Devadurga Taluk, Raichur District</p>
                    </div>
                    
                    {/* Live Project 5 */}
                    <div className="card p-6 flex flex-col">
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img
                          src="/images/projects/placeholder.jpg"
                          alt="SS Fabricators Project"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">S.S.Fabricators & manufactures Pvt.Ltd.</h3>
                      <div className="mb-3">
                        <span className="inline-block bg-green-600/20 text-green-400 text-sm px-2 py-1 rounded">
                          Live
                        </span>
                      </div>
                      <p className="text-steel-300">Manufacturing & Supply of M.S. Pipes at Ghodazari SB-04 PDN Project</p>
                    </div>
                    
                    {/* Live Project 6 */}
                    <div className="card p-6 flex flex-col">
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img
                          src="/images/projects/placeholder.jpg"
                          alt="Adani Power Project"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Adani Power Limited</h3>
                      <div className="mb-3">
                        <span className="inline-block bg-green-600/20 text-green-400 text-sm px-2 py-1 rounded">
                          Live
                        </span>
                      </div>
                      <p className="text-steel-300">CW, ACW and RW Piping along with fittings, valves and accessories for 2x800 MW Raipur and Raigarh (Phase-II) Ultra Super Critical Thermal Power Project</p>
                    </div>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="col-span-1 md:col-span-2">
                      <h3 className="text-xl font-semibold mb-4">List of Completed Projects [Mechanical & Civil]</h3>
                    </div>
                    
                    {/* Project 1 */}
                    <div className="card p-6 flex flex-col">
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img 
                          src="/images/projects/placeholder.jpg" 
                          alt="NTPC Singrauli Project" 
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">NTPC Singrauli - U.P.</h3>
                      <div className="mb-3">
                        <span className="inline-block bg-blue-600/20 text-blue-400 text-sm px-2 py-1 rounded">
                          Completed
                        </span>
                        <span className="inline-block ml-2 text-steel-300 text-sm">
                          Quantity: Pipe 3200 Dia. 20mm 1500 MT
                        </span>
                      </div>
                      <p className="text-steel-300 mb-2">Client: Permanent Prestress Pvt. Ltd.</p>
                    </div>
                    
                    {/* Project 2 */}
                    <div className="card p-6 flex flex-col">
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img 
                          src="/images/projects/placeholder.jpg" 
                          alt="Godavari Project" 
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Godavari Project - NCC - A.P.</h3>
                      <div className="mb-3">
                        <span className="inline-block bg-blue-600/20 text-blue-400 text-sm px-2 py-1 rounded">
                          Completed
                        </span>
                        <span className="inline-block ml-2 text-steel-300 text-sm">
                          Quantity: Pipe 3000 Dia. 16mm 4500 MT
                        </span>
                      </div>
                      <p className="text-steel-300 mb-2">Client: Permanent Prestress Pvt. Ltd.</p>
                    </div>
                    
                    {/* Project 3 */}
                    <div className="card p-6 flex flex-col">
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img 
                          src="/images/projects/placeholder.jpg" 
                          alt="JSW Bellary Project" 
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">JSW Bellary - Karnataka</h3>
                      <div className="mb-3">
                        <span className="inline-block bg-blue-600/20 text-blue-400 text-sm px-2 py-1 rounded">
                          Completed
                        </span>
                        <span className="inline-block ml-2 text-steel-300 text-sm">
                          Quantity: 1200 MT
                        </span>
                      </div>
                      <p className="text-steel-300 mb-2">Client: KBS Paramount Pvt. Ltd.</p>
                      <p className="text-steel-300">Project: Pig casting Machine Fabrication & Erection</p>
                    </div>
                    
                    {/* Project 4 */}
                    <div className="card p-6 flex flex-col">
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img 
                          src="/images/projects/placeholder.jpg" 
                          alt="SS Fabricators Project" 
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">SS Fabricators & Manufacturers - M.H.</h3>
                      <div className="mb-3">
                        <span className="inline-block bg-blue-600/20 text-blue-400 text-sm px-2 py-1 rounded">
                          Completed
                        </span>
                        <span className="inline-block ml-2 text-steel-300 text-sm">
                          Quantity: Pipe 1200 Dia. 10mm 3500 MT
                        </span>
                      </div>
                    </div>
                    
                    {/* Project 5 */}
                    <div className="card p-6 flex flex-col">
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img 
                          src="/images/projects/placeholder.jpg" 
                          alt="NTPC Sipat Stage II Project" 
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">NTPC Sipat- Stage II - Bilaspur. - C.G.</h3>
                      <div className="mb-3">
                        <span className="inline-block bg-blue-600/20 text-blue-400 text-sm px-2 py-1 rounded">
                          Completed
                        </span>
                        <span className="inline-block ml-2 text-steel-300 text-sm">
                          Quantity: CW System 660 MT
                        </span>
                      </div>
                      <p className="text-steel-300 mb-2">Client: Kirloskar Brothers Ltd.</p>
                    </div>
                    
                    {/* Project 6 */}
                    <div className="card p-6 flex flex-col">
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img 
                          src="/images/projects/placeholder.jpg" 
                          alt="NTPC Sipat Stage I Project" 
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">NTPC Sipat- Stage I - Bilaspur. - C.G.</h3>
                      <div className="mb-3">
                        <span className="inline-block bg-blue-600/20 text-blue-400 text-sm px-2 py-1 rounded">
                          Completed
                        </span>
                        <span className="inline-block ml-2 text-steel-300 text-sm">
                          Quantity: Pipe 3750 & 1000 Dia. 20mm 5500 MT
                        </span>
                      </div>
                      <p className="text-steel-300 mb-2">Client: Permanent Prestress Pvt. Ltd.</p>
                    </div>
                    
                    {/* Project 7 */}
                    <div className="card p-6 flex flex-col">
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img 
                          src="/images/projects/placeholder.jpg" 
                          alt="MIHAN Project" 
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">MIHAN Project - Nagpur - M.H.</h3>
                      <div className="mb-3">
                        <span className="inline-block bg-blue-600/20 text-blue-400 text-sm px-2 py-1 rounded">
                          Completed
                        </span>
                        <span className="inline-block ml-2 text-steel-300 text-sm">
                          Quantity: Pipe 965 Dia. 10mm 6500 MT
                        </span>
                      </div>
                    </div>
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
