// src/pages/Home/HiringPartnersSection.tsx

import React from 'react';

// Define the props for the component
interface HiringPartnersSectionProps {
  companies: string[];
}

/**
 * A single company item for the marquee.
 */
const CompanyItem = ({ name }: { name: string }) => (
  <li className="flex items-center justify-center p-6 bg-card rounded-lg flex-shrink-0 mx-4 w-48 text-center hover-elevate">
    <span className="text-lg font-semibold text-muted-foreground">{name}</span>
  </li>
);

/**
 * A reusable Marquee component.
 */
const Marquee = ({
  items,
  direction = 'left',
}: {
  items: string[];
  direction?: 'left' | 'right';
}) => {
  // We need to duplicate the items to create the seamless scroll effect
  const extendedItems = [...items, ...items];
  const animationClass = direction === 'left' ? 'animate-scroll-rtl' : 'animate-scroll-ltr';

  return (
    <div className="w-full overflow-hidden">
      <ul
        className={`flex w-max ${animationClass} hover:[animation-play-state:paused]`}
      >
        {extendedItems.map((item, idx) => (
          <CompanyItem key={idx} name={item} />
        ))}
      </ul>
    </div>
  );
};

export default function HiringPartnersSection({ companies }: HiringPartnersSectionProps) {
  // Split the companies into two rows for the bi-directional effect
  const middleIndex = Math.ceil(companies.length / 2);
  const firstRowCompanies = companies.slice(0, middleIndex);
  const secondRowCompanies = companies.slice(middleIndex);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Our Hiring Partners
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Our graduates get placed at leading companies across diverse industries.
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative flex flex-col gap-8">
          {/* Fading masks for the edges */}
          <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10"></div>

          {/* First row: Left to Right */}
          <Marquee items={firstRowCompanies} direction="right" />

          {/* Second row: Right to Left */}
          <Marquee items={secondRowCompanies} direction="left" />
        </div>
      </div>
    </section>
  );
}