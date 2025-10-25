'use client';

import { useState, useEffect } from 'react';
import { getCertificates } from '../../../lib/api';

// Enhanced certificate modal with zoom capability
function CertificateModal({ certificate, onClose }) {
  if (!certificate) return null;
  
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3));
  };
  
  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 1));
  };
  
  const handleMouseDown = (e) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };
  
  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };
  
  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fadeInZoom"
      onClick={onClose}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-60 h-60 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div
        className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 z-50 bg-gray-800/50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-800/70 transition-colors"
          onClick={onClose}
        >
          <span className="text-2xl">×</span>
        </button>
        
        {/* Certificate image with zoom and pan */}
        <div
          className="overflow-hidden bg-gray-100 relative h-[80vh]"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="absolute inset-0 flex items-center justify-center cursor-move transition-transform duration-100"
            style={{
              transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            }}
          >
            <img
              src={certificate.image_url}
              alt={certificate.name}
              className="max-w-[90%] max-h-[90vh] object-contain rounded-lg"
              draggable="false"
            />
          </div>
          
          {/* Zoom controls */}
          <div className="absolute bottom-6 left-6 flex space-x-2">
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-md p-2 transition-colors"
              onClick={handleZoomIn}
              title="Zoom In"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-md p-2 transition-colors"
              onClick={handleZoomOut}
              title="Zoom Out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-md p-2 transition-colors"
              onClick={handleReset}
              title="Reset View"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
          
          {/* Zoom level indicator */}
          <div className="absolute bottom-6 right-6 bg-gray-800/50 text-white px-3 py-1 rounded-md text-sm">
            {Math.round(scale * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CertificatesPage() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch certificates on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCertificates();
        setCertificates(data);
      } catch (e) {
        setError(e);
        console.error('Error fetching certificates:', e);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  // Function to open the certificate modal
  const openCertificate = (certificate) => {
    setSelectedCertificate(certificate);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };
  
  // Function to close the certificate modal
  const closeCertificate = () => {
    setSelectedCertificate(null);
    document.body.style.overflow = ''; // Restore scrolling
  };

  // Default certificates with actual images from the media directory
  const defaultCertificates = [
    {
      id: 1,
      name: "GST Registration Certificate",
      details: "Official certification of our compliance with India's Goods and Services Tax regulations, demonstrating our commitment to financial transparency and legal compliance.",
      image_url: "/django_backend/media/certificates/GST.jpg",
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      name: "Financial Performance Report",
      details: "Comprehensive financial performance analysis showcasing our company's revenue growth, profitability metrics, and operational efficiency over the fiscal year.",
      image_url: "/django_backend/media/certificates/PL_Statement.jpg",
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      name: "Corporate Financial Statement",
      details: "Detailed quarterly financial statement prepared in accordance with international accounting standards, highlighting our strong financial position and sustainable growth trajectory.",
      image_url: "/django_backend/media/certificates/PL_Statement_03.jpg",
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      name: "Annual Corporate Report",
      details: "Comprehensive annual report detailing our financial achievements, project milestones, corporate governance practices, and strategic vision for sustainable growth and innovation.",
      image_url: "/django_backend/media/certificates/PL_Statement_04.jpg",
      created_at: new Date().toISOString()
    }
  ];
  
  // Function to render a certificate card
  const renderCertificateCard = (certificate, index) => {
    return (
      <div
        key={certificate.id}
        className="animate-fadeUp"
        style={{
          animationDelay: `${index * 0.1}s`
        }}
      >
        <div
          className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(249,115,22,0.2)]"
        >
          {/* Certificate image */}
          <div className="h-[220px] overflow-hidden border-b border-gray-100">
            {certificate.image_url ? (
              <img
                src={certificate.image_url}
                alt={certificate.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="bg-gray-100 h-full flex items-center justify-center">
                <p className="text-gray-500 text-sm">No image available</p>
              </div>
            )}
          </div>
          
          {/* Certificate content */}
          <div className="p-4">
            <h3 className="text-[1.125rem] font-semibold text-gray-900 mb-2 line-clamp-1">{certificate.name}</h3>
            <p className="text-[0.9rem] text-gray-600 line-clamp-3 mb-4">{certificate.details}</p>
            
            {/* View certificate button */}
            <button
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-5 rounded-lg transition-colors w-full"
              onClick={() => openCertificate(certificate)}
            >
              View Certificate
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Hero section with light background */}
      <section className="py-16 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white opacity-70"></div>
        
        {/* Blueprint texture overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}></div>
        
        <div className="container mx-auto px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 tracking-wide mb-4">Our Certifications</h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <h2 className="text-xl md:text-2xl text-gray-600 mb-6">Proof of Quality, Safety & Compliance</h2>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-lg">
            We take pride in maintaining certified standards of excellence across all our construction and infrastructure projects.
            Explore our verified documents and certifications that validate our commitment to reliability and professionalism.
          </p>
        </div>
      </section>

      {/* Certificates grid section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-8">
          {error ? (
            <div className="bg-red-100 border border-red-300 rounded-lg p-6 text-center max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-red-700">Unable to load certificates</h3>
              <p className="mt-2 text-gray-600">
                We're experiencing technical difficulties. Please try again later.
              </p>
            </div>
          ) : loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
              <p className="text-gray-600 mt-4">Loading certificates...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(certificates.length === 0 ? defaultCertificates : certificates).map((certificate, index) =>
                renderCertificateCard(certificate, index)
              )}
            </div>
          )}
          
          {/* Footer note */}
          <div className="text-center mt-16 text-gray-600 max-w-3xl mx-auto">
            <p>
              Our certifications reflect our dedication to safety, quality, and compliance in every construction and infrastructure project we undertake.
            </p>
          </div>
        </div>
      </section>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <CertificateModal 
          certificate={selectedCertificate} 
          onClose={closeCertificate} 
        />
      )}
      
      {/* Add CSS for animations */}
      <style jsx global>{`
        @keyframes fadeInZoom {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInZoom {
          animation: fadeInZoom 0.3s ease-in-out forwards;
        }
        
        .animate-fadeUp {
          opacity: 0;
          animation: fadeUp 0.3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
