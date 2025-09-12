'use client';

import { useState, useEffect } from 'react';
import { getCertificates } from '../../../lib/api';

// Modal component for displaying full-size certificate
function CertificateModal({ certificate, onClose }) {
  if (!certificate) return null;
  
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden" onClick={e => e.stopPropagation()}>
        <button 
          className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="p-4 bg-steel-900 text-white">
          <h3 className="text-xl font-semibold">{certificate.name}</h3>
        </div>
        
        <div className="overflow-auto max-h-[70vh]">
          <img
            src={certificate.image_url}
            alt={certificate.name}
            className="w-full h-auto"
          />
        </div>
        
        <div className="p-4 bg-white text-black">
          <p>{certificate.details}</p>
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

  // Render default certificates when none are available
  const renderDefaultCertificates = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* GST Registration */}
      <div 
        className="bg-steel-900/80 rounded-lg overflow-hidden flex flex-col cursor-pointer transform transition-transform hover:scale-105"
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate">GST Registration</h3>
        </div>
        <div className="relative h-40 overflow-hidden">
          <div className="bg-steel-800 h-full flex items-center justify-center">
            <p className="text-steel-400 text-sm">Certificate image not available</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-3 w-full">
              <p className="text-white text-sm truncate">Our Goods and Services Tax registration certificate</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* MSME Certificate */}
      <div 
        className="bg-steel-900/80 rounded-lg overflow-hidden flex flex-col cursor-pointer transform transition-transform hover:scale-105"
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate">MSME Certificate</h3>
        </div>
        <div className="relative h-40 overflow-hidden">
          <div className="bg-steel-800 h-full flex items-center justify-center">
            <p className="text-steel-400 text-sm">Certificate image not available</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-3 w-full">
              <p className="text-white text-sm truncate">Certification as a Micro, Small, and Medium Enterprise</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* PF Registration */}
      <div 
        className="bg-steel-900/80 rounded-lg overflow-hidden flex flex-col cursor-pointer transform transition-transform hover:scale-105"
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate">PF Registration</h3>
        </div>
        <div className="relative h-40 overflow-hidden">
          <div className="bg-steel-800 h-full flex items-center justify-center">
            <p className="text-steel-400 text-sm">Certificate image not available</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-3 w-full">
              <p className="text-white text-sm truncate">Provident Fund registration certificate</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* PAN Details */}
      <div 
        className="bg-steel-900/80 rounded-lg overflow-hidden flex flex-col cursor-pointer transform transition-transform hover:scale-105"
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate">PAN Details</h3>
        </div>
        <div className="relative h-40 overflow-hidden">
          <div className="bg-steel-800 h-full flex items-center justify-center">
            <p className="text-steel-400 text-sm">Certificate image not available</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-3 w-full">
              <p className="text-white text-sm truncate">Permanent Account Number details</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Hero section */}
      <section className="py-12 bg-gradient-to-b from-black to-steel-900">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold">Certificates & Compliance</h1>
          <p className="mt-4 text-steel-200 max-w-3xl">
            Our certifications and compliance documents demonstrate our commitment to quality, safety, and industry standards.
          </p>
        </div>
      </section>

      {/* Certificates section */}
      <section className="py-16">
        <div className="container">
          {error ? (
            <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-red-200">Unable to load certificates</h3>
              <p className="mt-2 text-steel-300">
                We're experiencing technical difficulties. Please try again later.
              </p>
            </div>
          ) : loading ? (
            <div className="text-center py-12">
              <p className="text-steel-300">Loading certificates...</p>
            </div>
          ) : certificates.length === 0 ? (
            renderDefaultCertificates()
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {certificates.map((certificate) => (
                <div 
                  key={certificate.id} 
                  className="bg-steel-900/80 rounded-lg overflow-hidden flex flex-col cursor-pointer transform transition-transform hover:scale-105"
                  onClick={() => openCertificate(certificate)}
                >
                  {/* Certificate name at top */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold truncate">{certificate.name}</h3>
                  </div>
                  
                  {/* Certificate image preview */}
                  <div className="relative h-40 overflow-hidden">
                    {certificate.image_url ? (
                      <img
                        src={certificate.image_url}
                        alt={certificate.name}
                        className="object-cover w-full h-full bg-white"
                      />
                    ) : (
                      <div className="bg-steel-800 h-full flex items-center justify-center">
                        <p className="text-steel-400 text-sm">No image available</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-3 w-full">
                        <p className="text-white text-sm truncate">{certificate.details}</p>
                        <p className="text-steel-300 text-xs mt-1">Click to view full certificate</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Certificate Modal - outside of the conditional rendering */}
      {selectedCertificate && (
        <CertificateModal 
          certificate={selectedCertificate} 
          onClose={closeCertificate} 
        />
      )}
    </div>
  );
}
