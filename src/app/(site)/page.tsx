'use client';

import CountUp from '../../components/CountUp';

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <section className="min-h-[90vh] flex flex-col justify-center fluid-py bg-gradient-to-br from-black via-steel-900/90 to-brand-blue/30 relative overflow-hidden">
        {/* Background overlay with subtle radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.15),transparent_70%)]"></div>
        
        {/* Static background elements */}
        <div className="absolute top-0 right-0 w-full h-full">
          <div className="absolute right-0 top-1/4 w-96 h-96 rounded-full bg-brand-blue/10 blur-3xl"></div>
          <div className="absolute right-1/4 bottom-1/4 w-64 h-64 rounded-full bg-steel-700/20 blur-3xl"></div>
          <div className="absolute left-1/4 top-1/3 w-48 h-48 rounded-full bg-brand-blue/5 blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block mb-2 px-3 py-1 bg-brand-blue/20 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-brand-blue/30">
              Established 1995
            </div>
            <h1 className="h1">
              Craft <span className="italic font-normal relative">
                Precision
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-brand-blue"></span>
              </span> Solutions
              <br />with <span className="text-white">InfraCorp</span>.
            </h1>
            
            <p className="fluid-mt lead">
              InfraCorp transforms industrial challenges into engineered excellence —
              delivering large-scale fabrication, erection, and piping projects with
              proven safety, quality, and timelines.
            </p>
            <div className="fluid-mt flex flex-wrap gap-4">
              <a href="/projects" className="px-6 py-3 bg-brand-blue text-white font-medium rounded-md hover:bg-opacity-90 transition-colors shadow-lg">
                View Projects
              </a>
              <a href="/contact" className="px-6 py-3 bg-transparent border border-steel-500 text-white font-medium rounded-md hover:bg-steel-800/30 transition-colors">
                Contact Us
              </a>
            </div>
            
            {/* Social proof section with industry icons */}
            <div className="mt-16 flex items-center">
              <div className="flex -space-x-2">
                {/* Industry icons representing different sectors */}
                <div className="w-12 h-12 rounded-full bg-steel-800 border-2 border-steel-700 flex items-center justify-center text-white p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="w-12 h-12 rounded-full bg-steel-800 border-2 border-steel-700 flex items-center justify-center text-white p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                </div>
                <div className="w-12 h-12 rounded-full bg-steel-800 border-2 border-steel-700 flex items-center justify-center text-white p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="w-12 h-12 rounded-full bg-steel-800 border-2 border-steel-700 flex items-center justify-center text-white p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div className="w-12 h-12 rounded-full bg-steel-800 border-2 border-steel-700 flex items-center justify-center text-white p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                </div>
              </div>
              <p className="ml-6 text-steel-300">
                <span className="font-semibold text-white">50+</span> projects delivered nationwide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sister Concerns Section */}
      <section className="py-12 bg-gradient-to-b from-steel-900 to-steel-800">
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
              'Venkatadri Engineers Private Limited',
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
      <section className="py-16 bg-gradient-to-r from-steel-900 to-steel-800">
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
</div>
)
}


