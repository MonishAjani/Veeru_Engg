// Sample team members data
const teamMembers = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    position: 'CEO & Founder',
    image: '/images/team/placeholder.jpg'
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
  return (
    <div>
      {/* Hero section */}
      <section className="py-12 bg-gradient-to-b from-black to-steel-900">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold">About Us</h1>
          <p className="mt-4 text-steel-200 max-w-3xl">
            We are pleased to introduce ourselves as one of the renowned structural fabricators
            engaged in Steel Fabrication, Erection Works, Structural Fabrication, Heavy Equipments,
            Industrial Piping and Factory Sheds.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Expertise</h2>
              <p className="text-steel-200 mb-4">
                A quality conscious company, Veeru Engineering & Infra. is
                well-equipped with modern machines and backed by personnel who have sound educational
                background, industrially trained and well-versed with all kinds of advance Steel Fabrication and
                Building Erection techniques.
              </p>
              <p className="text-steel-200">
                Ever since our inception in the year 1995, we have been receiving
                blessing and overwhelming encouragements from our valuable clients, which enable us to work
                with well-known, highly established and renowned Engineers, Architects & Consultants.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden border border-steel-700">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero.jpg"
                alt="Steel fabrication facility"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
            <div className="order-2 md:order-1 rounded-lg overflow-hidden border border-steel-700">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/projects/placeholder.jpg"
                alt="Construction project"
                className="w-full h-auto"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl font-semibold mb-4">Our History</h2>
              <p className="text-steel-200 mb-4">
                VEERU ENGINEERING & INFRA. ESTABLISHED IN YEAR 1995 with the dedication
                and determination to offer quality Structural Steel Fabrication and Erection Work. Today, it has
                achieved a respectable position for completing Heavy Equipments works as per specification of
                clients.
              </p>
              <p className="text-steel-200">
                Before starting this company, we had in-depth analysis of so many projects in structural
                steel fabrications, Heavy Equipments & its relevant erections in all over India so that we can
                handle projects with perfection and complete under assigned time and within budget.
              </p>
            </div>
          </div>

          {/* Leadership section */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Meet the <span className="italic">incredible</span> team.</h2>
              <p className="text-steel-200 max-w-3xl mx-auto">
                Being the best isn't just a claim we make—it's a standard our team consistently upholds
                through every project, partnership, and solution we deliver.
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="overflow-hidden rounded-lg bg-white/5 border border-white/10"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4 bg-gradient-to-b from-steel-900/80 to-steel-800/80">
                      <h3 className="text-lg font-semibold">{member.name}</h3>
                      <p className="text-sm text-steel-300">{member.position}</p>
                      <div className="mt-3 pt-3 border-t border-steel-700/30 flex space-x-3">
                        <a href="#" className="text-steel-400 hover:text-white transition-colors">
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg>
                        </a>
                        <a href="#" className="text-steel-400 hover:text-white transition-colors">
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
