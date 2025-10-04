import React from 'react';

interface HeroSectionProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function HeroSection({ title, description, children }: HeroSectionProps) {
  return (
    <section className="py-8 sm:py-10 md:py-12 relative overflow-hidden">
      {/* Dark navy blue gradient background with subtle animation */}
      <div className="absolute inset-0 bg-gradient-navy"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 opacity-50"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container px-responsive relative z-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-responsive-lg">{title}</h1>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-steel-200 max-w-3xl">
          {description}
        </p>
        {children}
      </div>
    </section>
  );
}