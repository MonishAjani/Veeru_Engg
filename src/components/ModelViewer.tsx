'use client';

import { useEffect, useRef } from 'react';

interface ModelViewerProps {
  src: string;
  alt: string;
  poster?: string;
  height?: string;
  width?: string;
}

export default function ModelViewer({ src, alt, poster, height = '400px', width = '100%' }: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This is a placeholder for actual 3D model viewer implementation
    // In a real implementation, you would use a library like Three.js, Babylon.js, or model-viewer web component
    
    if (containerRef.current) {
      const container = containerRef.current;
      
      // Create a simple placeholder with controls that simulate a 3D viewer
      container.innerHTML = '';
      
      // Create image placeholder (in a real implementation, this would be a 3D canvas)
      const img = document.createElement('img');
      img.src = poster || '/images/Veeru Infra Logo.jpg';
      img.alt = alt;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      
      // Add controls overlay
      const controls = document.createElement('div');
      controls.className = 'absolute bottom-4 right-4 bg-black/50 text-white text-xs rounded-lg p-2';
      controls.innerHTML = `
        <div class="flex space-x-3">
          <button class="hover:text-orange-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button class="hover:text-orange-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button class="hover:text-orange-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>
      `;
      
      // Add loading indicator
      const loadingIndicator = document.createElement('div');
      loadingIndicator.className = 'absolute inset-0 flex items-center justify-center';
      loadingIndicator.innerHTML = `
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
      `;
      
      // Add model info
      const modelInfo = document.createElement('div');
      modelInfo.className = 'absolute top-4 left-4 bg-black/50 text-white text-xs rounded-lg p-2';
      modelInfo.textContent = `Model: ${alt}`;
      
      // Add interaction hint
      const interactionHint = document.createElement('div');
      interactionHint.className = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white text-sm rounded-lg p-3 pointer-events-none opacity-0 transition-opacity duration-300';
      interactionHint.textContent = 'Click and drag to rotate';
      
      // Show hint on mouse over
      container.addEventListener('mouseenter', () => {
        interactionHint.style.opacity = '1';
        setTimeout(() => {
          interactionHint.style.opacity = '0';
        }, 2000);
      });
      
      // Add all elements to container
      container.appendChild(img);
      container.appendChild(controls);
      container.appendChild(loadingIndicator);
      container.appendChild(modelInfo);
      container.appendChild(interactionHint);
      
      // Simulate loading complete
      setTimeout(() => {
        loadingIndicator.style.display = 'none';
      }, 1500);
    }
  }, [src, alt, poster]);

  return (
    <div 
      ref={containerRef} 
      className="relative bg-gray-100" 
      style={{ height, width }}
    >
      {/* Initial loading state */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    </div>
  );
}