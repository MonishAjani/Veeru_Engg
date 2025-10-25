'use client';

import { useState, useEffect } from 'react';
import { getProjects, Project } from '../../../lib/api';
import CountUp from '../../../components/CountUp';
import Image from 'next/image';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Dummy projects data to show when backend is not connected
  const dummyProjects = [
    {
      id: 1,
      name: "Pharmaceutical Piping System",
      details: "High-precision SS316 piping installation for pharmaceutical production facility.",
      quantity: "650 MT",
      location: "Karnataka, Hubli",
      work: "Piping Installation",
      main_image_url: "/images/projects/Power_Project_Koradi.jpg",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      name: "Chemical Plant Expansion",
      details: "Structural fabrication and equipment installation for chemical plant expansion.",
      quantity: "850 MT",
      location: "Gujarat, Vadodara",
      work: "Structural Fabrication",
      main_image_url: "/images/projects/Sunil_Hitech.jpg",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 3,
      name: "Automotive Manufacturing Plant",
      details: "Complete structural steel fabrication and installation for 50,000 sq.ft automotive manufacturing facility.",
      quantity: "2000 MT",
      location: "Maharashtra, Pune",
      work: "Steel Fabrication",
      main_image_url: "/images/projects/Jindal_Power_Plant.jpg",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 4,
      name: "Power Plant Boiler Installation",
      details: "Heavy equipment installation and piping for 500MW power plant.",
      quantity: "1200 MT",
      location: "Chhattisgarh, Raipur",
      work: "Equipment Installation",
      main_image_url: "/images/projects/Jindal_Power_Plant_2.jpg",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  // Function to open the carousel for a project
  const openCarousel = (project: Project) => {
    setSelectedProject(project);
    setShowCarousel(true);
    setCurrentImageIndex(0); // Reset to the first image
  };
  
  // Function to close the carousel
  const closeCarousel = () => {
    setShowCarousel(false);
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };
  
  // Function to navigate to the previous image
  const goToPreviousImage = () => {
    if (!selectedProject || !selectedProject.images || selectedProject.images.length === 0) return;
    
    setCurrentImageIndex((prevIndex) => {
      if (prevIndex === 0) {
        return selectedProject.images!.length - 1; // Wrap around to the last image
      } else {
        return prevIndex - 1;
      }
    });
  };
  
  // Function to navigate to the next image
  const goToNextImage = () => {
    if (!selectedProject || !selectedProject.images || selectedProject.images.length === 0) return;
    
    setCurrentImageIndex((prevIndex) => {
      if (prevIndex === selectedProject.images!.length - 1) {
        return 0; // Wrap around to the first image
      } else {
        return prevIndex + 1;
      }
    });
  };
  
  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        
        // Fetch projects from the Project table
        const projectsData = await getProjects();
        
        // Use the projects from the API
        if (projectsData.length === 0) {
          console.log('No projects found in the Projects table, using dummy data');
          setProjects(dummyProjects);
        } else {
          setProjects(projectsData);
          console.log(`Fetched ${projectsData.length} projects from the Projects table`);
        }
      } catch (e) {
        console.error('Error fetching projects:', e);
        setError(e as Error);
        // Use dummy data when API fails
        setProjects(dummyProjects);
        setError(null); // Clear error to show the dummy data
      } finally {
        setLoading(false);
      }
    }
    
    fetchProjects();
  }, []);
  
  // Add keyboard navigation for the carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showCarousel) return;
      
      if (e.key === 'ArrowLeft') {
        goToPreviousImage();
      } else if (e.key === 'ArrowRight') {
        goToNextImage();
      } else if (e.key === 'Escape') {
        closeCarousel();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showCarousel, goToPreviousImage, goToNextImage, closeCarousel]);

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Section */}
        <div className="mb-12">
          <div className="text-orange-500 uppercase text-sm font-medium mb-2">Portfolio</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Featured Projects</h1>
          <p className="text-gray-600">
            Delivering excellence across diverse industrial sectors with precision and reliability.
          </p>
        </div>

        {/* Projects Grid */}
        {error ? (
          <div className="bg-red-100 rounded-lg p-6 text-center shadow-lg">
            <h3 className="text-xl font-semibold text-red-700">Unable to load projects</h3>
            <p className="mt-2 text-gray-600">
              We're experiencing technical difficulties. Please try again later.
            </p>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <div className="mb-12">
            {/* Section Title for Projects */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
              Projects
            </h2>
            
            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {projects.map((project, index) => (
                <div key={project?.id || index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  {/* Project Image */}
                  <div className="relative h-64">
                    <img
                      src={project.main_image_url}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Project Details */}
                  <div className="p-4 border-t-4 border-orange-500">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{project.details}</p>
                    
                    {/* Location, Quantity, and Work */}
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <div className="flex items-center text-gray-500 mb-1 text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{project.location}</span>
                        </div>
                        <div className="flex items-center text-gray-500 mb-1 text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                          </svg>
                          <span>{project.quantity}</span>
                        </div>
                        {project.work && (
                          <div className="flex items-center text-gray-500 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{project.work}</span>
                          </div>
                        )}
                      </div>
                      
                      
                      {/* View Images Button */}
                      <button
                        onClick={() => openCarousel(project)}
                        className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Image Carousel Modal */}
            {showCarousel && selectedProject && (
              <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col">
                  {/* Modal Header */}
                  <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-xl font-bold">{selectedProject.name}</h3>
                    <button
                      onClick={closeCarousel}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Carousel Content */}
                  <div className="flex-1 overflow-auto p-4 custom-scrollbar">
                    <div className="relative h-96">
                      {selectedProject.images && selectedProject.images.length > 0 ? (
                        // Show the current image from the images array
                        <img
                          src={selectedProject.images[currentImageIndex].image_url}
                          alt={selectedProject.images[currentImageIndex].caption || selectedProject.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        // Fallback to main image if no images array
                        <img
                          src={selectedProject.main_image_url}
                          alt={selectedProject.name}
                          className="w-full h-full object-contain"
                        />
                      )}
                      
                      {/* Image caption */}
                      {selectedProject.images &&
                       selectedProject.images.length > 0 &&
                       selectedProject.images[currentImageIndex].caption && (
                        <div className="absolute bottom-12 left-0 right-0 text-center bg-black/50 text-white py-2 px-4">
                          {selectedProject.images[currentImageIndex].caption}
                        </div>
                      )}
                      
                      {/* Image counter */}
                      {selectedProject.images && selectedProject.images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                          {currentImageIndex + 1} / {selectedProject.images.length}
                        </div>
                      )}
                      
                      {/* Carousel navigation */}
                      {selectedProject.images && selectedProject.images.length > 1 && (
                        <div className="absolute inset-0 flex items-center justify-between px-4">
                          <button
                            onClick={goToPreviousImage}
                            className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-gray-800 hover:bg-white transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button
                            onClick={goToNextImage}
                            className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-gray-800 hover:bg-white transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                    
                    {/* Project Details */}
                    <div className="mt-4">
                      <h4 className="font-semibold text-lg">Project Details</h4>
                      <p className="text-gray-600 mt-2">{selectedProject.details}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <span className="text-gray-500 text-sm">Location:</span>
                          <p className="font-medium">{selectedProject.location}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Quantity:</span>
                          <p className="font-medium">{selectedProject.quantity}</p>
                        </div>
                        {selectedProject.work && (
                          <div className="col-span-2">
                            <span className="text-gray-500 text-sm">Work Type:</span>
                            <p className="font-medium">{selectedProject.work}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Thumbnail navigation */}
                    {selectedProject.images && selectedProject.images.length > 1 && (
                      <div className="mt-4 flex justify-center space-x-2 overflow-x-auto custom-scrollbar">
                        {selectedProject.images.map((image, index) => (
                          <button
                            key={image.id}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                              currentImageIndex === index ? 'border-orange-500 scale-105' : 'border-gray-200'
                            }`}
                          >
                            <img
                              src={image.image_url}
                              alt={image.caption || `Image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stats Section at the bottom */}
        <div className="bg-black rounded-lg py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stat 1 */}
            <div className="flex items-center">
              <div className="text-orange-500 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <div className="text-white text-4xl font-bold flex items-center">
                  <CountUp end={95} duration={2} className="text-4xl text-white" /> <span>%</span>
                </div>
                <div className="text-gray-400">On-time Project Delivery</div>
              </div>
            </div>
            
            {/* Stat 2 */}
            <div className="flex items-center">
              <div className="text-orange-500 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <div className="text-white text-4xl font-bold flex items-center">
                  <CountUp end={500} duration={2} className="text-4xl text-white" />+
                </div>
                <div className="text-gray-400">Projects Successfully Completed</div>
              </div>
            </div>
            
            {/* Stat 3 */}
            <div className="flex items-center">
              <div className="text-orange-500 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <div className="text-white text-4xl font-bold flex items-center">
                  <CountUp end={15} duration={2} className="text-4xl text-white" />+
                </div>
                <div className="text-gray-400">Industries Served</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
