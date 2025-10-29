// src/components/sections/WhyChooseUsSection.tsx
'use client'; // Required for hooks like useEffect and useRef

import { Card, CardContent } from '@/components/ui/card';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BrainCircuit,
  Award,
  Users,
  Rocket,
  CheckCircle2,
  XCircle,
  LucideIcon,
} from 'lucide-react';

// Register the GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// --- Type Definitions ---
interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ComparisonPoint {
  feature: string;
  kgpath: { text: string; pro: boolean };
  traditional: { text: string; pro: boolean };
}


// --- Component Content (Data) ---
const features: Feature[] = [
  {
    icon: BrainCircuit,
    title: 'AI-Powered Learning Path',
    description: 'Our adaptive AI curriculum tailors to your pace, ensuring you master concepts efficiently before moving on.',
  },
  {
    icon: Award,
    title: 'Placement Guarantee',
    description: "We're invested in your success. Land a job in the AI field within 6 months of graduation, or your tuition is on us.",
  },
  {
    icon: Users,
    title: 'Expert Industry Mentors',
    description: 'Get 1-on-1 guidance from professionals at leading tech companies. Build your network and gain real-world insights.',
  },
  {
    icon: Rocket,
    title: 'Career Fast-Track',
    description: 'Forget years of outdated theory. Our project-based approach gives you the practical skills employers demand right now.',
  },
];

const comparisonPoints: ComparisonPoint[] = [
    {
      feature: 'Curriculum',
      kgpath: { text: 'Always-updated, industry-relevant', pro: true },
      traditional: { text: 'Often theoretical and slow to adapt', pro: false },
    },
    {
      feature: 'Time to Job-Ready',
      kgpath: { text: '6-9 months', pro: true },
      traditional: { text: '4+ years', pro: false },
    },
    {
      feature: 'Focus',
      kgpath: { text: 'Practical, hands-on projects', pro: true },
      traditional: { text: 'Theory and academic research', pro: false },
    },
    {
      feature: 'Cost & ROI',
      kgpath: { text: 'Lower cost, immediate career returns', pro: true },
      traditional: { text: 'High tuition, delayed earning potential', pro: false },
    },
];


// --- The React Component ---
export default function WhyChooseUsSection() {
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the main header
      gsap.fromTo(
        '.anim-header',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.anim-header',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Animate the feature cards with a stagger effect
      gsap.fromTo(
        '.anim-card',
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.card-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
      
      // Animate the comparison section
      gsap.fromTo(
        '.anim-comparison',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.comparison-section',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

    }, mainRef);

    // Cleanup function
    return () => ctx.revert();
  }, []);

  return (
    <section ref={mainRef} className="py-20 md:py-28 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* --- Main Heading --- */}
        <div className="text-center mb-12 md:mb-16 anim-header">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Why Choose <span className="text-gradient">KGPath</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We've engineered the most direct path from ambitious learner to high-impact AI professional.
          </p>
        </div>

        {/* --- Feature Cards Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 card-grid">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card key={idx} className="text-center p-6 bg-background hover-elevate anim-card" data-testid={`card-feature-${idx}`}>
                <CardContent className="p-0 flex flex-col items-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-5">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}