import React from 'react';

interface HeroSectionProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function HeroSection({ title, description, children }: HeroSectionProps) {
  return (
    <section className="py-8 sm:py-10 md:py-12 relative overflow-hidden">
      {/* Light background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-50/20 to-blue-50/20 opacity-50"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"></div>
      
      <div className="container px-4 sm:px-6 md:px-8 relative z-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{title}</h1>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-3xl">
          {description}
        </p>
        <div className="mt-4 sm:mt-6">
          {children}
        </div>
      </div>
    </section>
  );
}