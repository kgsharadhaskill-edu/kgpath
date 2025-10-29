// src/pages/Home/HiringPartnersSection.tsx

import React from 'react';

// Define the props for the component
interface HiringPartnersSectionProps {
  companies: string[];
}

export default function HiringPartnersSection({ companies }: HiringPartnersSectionProps) {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Our Hiring Partners</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Students get placed at leading companies across industries
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {companies.map((company, idx) => (
            <div 
              key={idx} 
              className="flex items-center justify-center p-6 bg-card rounded-md hover-elevate"
              data-testid={`company-${idx}`}
            >
              <div className="text-lg font-semibold text-muted-foreground text-center">
                {company}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}