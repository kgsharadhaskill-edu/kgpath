// src/pages/Home/HowItWorksSection.tsx

import React from 'react';

// Define the shape of a single step object
interface Step {
  number: string;
  title: string;
  description: string;
}

// Define the props for the component
interface HowItWorksSectionProps {
  steps: Step[];
}

export default function HowItWorksSection({ steps }: HowItWorksSectionProps) {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your journey to a successful AI career in 4 simple steps
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center" data-testid={`step-${idx}`}>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mb-4 shadow-lg">
                <span className="text-2xl font-bold text-white">{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
              
              {/* Responsive Connector Line: Only shows on large screens */}
              {idx < steps.length - 1 && (
                <div 
                  className="hidden lg:block absolute top-10 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px"
                  style={{
                    background: 'repeating-linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary)) 6px, transparent 6px, transparent 12px))'
                  }} 
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}