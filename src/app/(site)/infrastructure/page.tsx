export default function InfrastructurePage() {
  return (
    <div>
      {/* Hero section */}
      <section className="py-12 bg-gradient-to-b from-black to-steel-900">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold">Our Infrastructure</h1>
          <p className="mt-4 text-steel-200 max-w-3xl">
            Advanced facilities and equipment that enable us to deliver exceptional quality and efficiency.
          </p>
        </div>
      </section>

      {/* Main content section */}
      <section className="py-16">
        <div className="container">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mb-6">State-of-the-Art Facilities</h2>
            
            <p className="mb-6">
              Veeru Engineering & Infra. has the most advanced infrastructure, which enhances the
              quality of works and timely completion of our clients' projects. We are honestly and dedicatedly
              performing our duties for the welfare of company and clients as well.
            </p>
            
            <p className="mb-6">
              We have highly qualified and experienced structural Engineers, site Engineers / Site
              Supervisors – Technical in civil-electrical-mechanical-structural who are capable of giving
              outstanding outputs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-3">Engineering Expertise</h3>
                <ul className="list-disc pl-5 space-y-2 text-steel-300">
                  <li>Structural engineering team</li>
                  <li>Civil engineering specialists</li>
                  <li>Electrical engineering department</li>
                  <li>Mechanical engineering professionals</li>
                </ul>
              </div>
              
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-3">Technical Capabilities</h3>
                <ul className="list-disc pl-5 space-y-2 text-steel-300">
                  <li>Advanced design software</li>
                  <li>Modern fabrication equipment</li>
                  <li>Quality testing facilities</li>
                  <li>Project management tools</li>
                </ul>
              </div>
            </div>

            {/* Machinery Section */}
            <h2 className="text-2xl font-semibold mb-6 mt-12">Machinery & Equipment</h2>
            <p className="mb-6">
              Our state-of-the-art machinery and equipment allow us to handle complex fabrication and construction
              projects with precision and efficiency. We continuously invest in the latest technology to maintain
              our competitive edge and deliver superior results.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4">Name Of Machineries - [MECHANICAL]</h3>
                
                <div className="overflow-x-auto">
                  <table className="responsive-table">
                    <thead>
                      <tr className="border-b border-steel-700">
                        <th className="pb-2 pr-4 font-semibold">Machinery</th>
                        <th className="pb-2 text-center font-semibold">QTY.</th>
                      </tr>
                    </thead>
                    <tbody className="text-steel-300">
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4" data-label="Machinery">SUB-ARC Automatic Welding Machine</td>
                        <td className="py-2 text-center" data-label="QTY.">8</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">Hydraulic Plate bending Machine<br/>(Thickness Capacity: 1) 40 mm. 2) 25 mm. 3) 16 mm</td>
                        <td className="py-2 text-center">3</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">MIG Welding Machine</td>
                        <td className="py-2 text-center">40</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">Rectifier Welding Machine</td>
                        <td className="py-2 text-center">600</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">Pug Cutting Machines</td>
                        <td className="py-2 text-center">40</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">Hand Cutting set</td>
                        <td className="py-2 text-center">100</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">Pillar type Drilling Machine-Heavy Duty</td>
                        <td className="py-2 text-center">2</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">Magnetic Drilling Machines</td>
                        <td className="py-2 text-center">5</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">Hydra 10 Tons Cap</td>
                        <td className="py-2 text-center">6</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">Hydra 12 Tons cap</td>
                        <td className="py-2 text-center">6</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">Hydra 14 Tons cap</td>
                        <td className="py-2 text-center">8</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">Hydra 16 Tons Cap</td>
                        <td className="py-2 text-center">2</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">DG 62.5 KVA</td>
                        <td className="py-2 text-center">15</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">DG 82.5 KVA</td>
                        <td className="py-2 text-center">10</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">SAW Rotator</td>
                        <td className="py-2 text-center">8 Set</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4">Name Of Machineries - [CIVIL]</h3>
                
                <div className="overflow-x-auto">
                  <table className="responsive-table">
                    <thead>
                      <tr className="border-b border-steel-700">
                        <th className="pb-2 pr-4 font-semibold">Machinery</th>
                        <th className="pb-2 text-center font-semibold">QTY.</th>
                      </tr>
                    </thead>
                    <tbody className="text-steel-300">
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">Ex-200 Tata Hitachi</td>
                        <td className="py-2 text-center">2 Nos.</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">PC-200 L&T komatsu</td>
                        <td className="py-2 text-center">2 Nos.</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">Ex-70 Tata Hitachi</td>
                        <td className="py-2 text-center">2 Nos.</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">JCB</td>
                        <td className="py-2 text-center">4 Nos.</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">Tipper (10 wheeler) Ashok Leyland</td>
                        <td className="py-2 text-center">13 Nos.</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">Tipper (06 wheeler) Ashok Leyland</td>
                        <td className="py-2 text-center">5 Nos.</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">Vibratory Roller L&T case</td>
                        <td className="py-2 text-center">1 Nos.</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">Grador 405 Komatsu</td>
                        <td className="py-2 text-center">1 Nos.</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">Dozor D-60 Komatsu</td>
                        <td className="py-2 text-center">1 Nos.</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">Tractor Dozor John deer 5 5 HP</td>
                        <td className="py-2 text-center">1 Nos.</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">Tractor with Trolley Eicher</td>
                        <td className="py-2 text-center">1 Nos.</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">Concrete Mixture Fisa enterprises</td>
                        <td className="py-2 text-center">1 Nos.</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">Water tankers Local made</td>
                        <td className="py-2 text-center">2 Nos.</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">Centering Material Local Made</td>
                        <td className="py-2 text-center">2000 M2</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">Vibratory Needle Fisa enterprises</td>
                        <td className="py-2 text-center">6 Nos.</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">RM-1050-Concrete Mixer Universal</td>
                        <td className="py-2 text-center">1 Nos.</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">Self loder 2 Cum. Ajax fiori Eng.</td>
                        <td className="py-2 text-center">1 Nos.</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">Nos. Trimble Make Total station</td>
                        <td className="py-2 text-center">2 Nos.</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">Sokya Make therolite Machine</td>
                        <td className="py-2 text-center">5 Nos.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Workforce Section */}
            <h2 className="text-2xl font-semibold mb-6 mt-12">Workforce</h2>
            <p className="mb-6">
              Our highly skilled and experienced workforce is the backbone of our operations. We employ a diverse team of professionals and skilled workers who are dedicated to delivering excellence in every project.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4">STAFF LIST</h3>
                
                <div className="overflow-x-auto">
                  <table className="responsive-table">
                    <thead>
                      <tr className="border-b border-steel-700">
                        <th className="pb-2 pr-4 font-semibold">Name Of Manpower</th>
                        <th className="pb-2 text-center font-semibold">QTY.</th>
                      </tr>
                    </thead>
                    <tbody className="text-steel-300">
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">1. SITE INCHARGE</td>
                        <td className="py-2 text-center">8</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">2. ENGINEER</td>
                        <td className="py-2 text-center">14</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">3. QUALITY ENGINEER</td>
                        <td className="py-2 text-center">10</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">4. SAFETY ENGINEER</td>
                        <td className="py-2 text-center">8</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">5. SUPERVISOR</td>
                        <td className="py-2 text-center">40</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">6. CIVIL ENGINEER</td>
                        <td className="py-2 text-center">12</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">7. STORE KEEPER</td>
                        <td className="py-2 text-center">9</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">8. ACCOUNTANT</td>
                        <td className="py-2 text-center">13</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">9. ADMINISTRATOR</td>
                        <td className="py-2 text-center">6</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">10. PURCHASER</td>
                        <td className="py-2 text-center">5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4">WORKER LIST</h3>
                
                <div className="overflow-x-auto">
                  <table className="responsive-table">
                    <thead>
                      <tr className="border-b border-steel-700">
                        <th className="pb-2 pr-4 font-semibold">Name Of Manpower</th>
                        <th className="pb-2 text-center font-semibold">QTY.</th>
                      </tr>
                    </thead>
                    <tbody className="text-steel-300">
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">1. FORMAN</td>
                        <td className="py-2 text-center">15</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">2. FABARICATOR</td>
                        <td className="py-2 text-center">24</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">3. FITTER</td>
                        <td className="py-2 text-center">38</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">4. WELDER</td>
                        <td className="py-2 text-center">170</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">5. GRINDER</td>
                        <td className="py-2 text-center">65</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">6. GASS CUTTER</td>
                        <td className="py-2 text-center">45</td>
                      </tr>
                      <tr className="border-b border-steel-800">
                        <td className="py-2 pr-4">7. RIGGER</td>
                        <td className="py-2 text-center">60</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">8. HELPER</td>
                        <td className="py-2 text-center">400</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <p>
              Our infrastructure and machinery enable us to take on complex projects with confidence,
              ensuring that we deliver high-quality results on time and within budget.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
