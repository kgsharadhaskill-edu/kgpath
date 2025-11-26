// src/components/sections/WhyChooseUsSection.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useLayoutEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  BrainCircuit,
  Award,
  Users,
  Rocket,
  LucideIcon,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Types ---
interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

// --- SEO-Optimized Content ---
const features: Feature[] = [
  {
    icon: BrainCircuit,
    title: 'AI-Powered Learning Path',
    description:
      'Our adaptive AI-driven curriculum helps learners in Coimbatore master concepts faster with personalized learning paths.',
  },
  {
    icon: Award,
    title: 'Placement Guarantee',
    description:
      'KGPath provides structured placement support with real interview training and career-ready AI skills.',
  },
  {
    icon: Users,
    title: 'Industry Expert Mentors',
    description:
      'Get direct guidance from AI engineers and full-stack developers working in top global tech companies.',
  },
  {
    icon: Rocket,
    title: 'Career-Fast Track Programs',
    description:
      'Hands-on projects and real-world assignments make you job-ready in months—not years.',
  },
];

export default function WhyChooseUsSection() {
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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
          },
        }
      );

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
          },
        }
      );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why-choose-kgpath"
      ref={mainRef}
      className="py-20 md:py-28 bg-muted/50"
    >
      {/* SEO TAGS */}
      <Helmet>
        <meta
          name="description"
          content="Discover why KGPath is the top AI training institute in Coimbatore. Learn through AI-powered paths, industry mentors, placement support, and hands-on projects."
        />
        <meta
          name="keywords"
          content="Why choose KGPath, AI training Coimbatore, AI institute Tamil Nadu, placement-guarantee AI courses"
        />

        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "KGPath",
            "description": "AI-powered education institute offering Digital Marketing AI, Full Stack AI and Data Analytics AI training.",
            "brand": "KGPath",
            "url": "https://kgpath.com",
            "department": {
              "@type": "EducationalOrganization",
              "name": "KGPath AI Programs",
              "description": "Career-focused AI courses with placement support and professional mentorship."
            }
          }
          `}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

        {/* ===== SECTION HEADER ===== */}
        <header className="text-center mb-12 md:mb-16 anim-header">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Why Choose <span className="text-gradient">KGPath</span>?
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose KGPath to gain job-ready AI skills, industry mentorship, 
            placement support, and an accelerated path to becoming an AI professional in Coimbatore.
          </p>
        </header>

        {/* ===== SEO-FRIENDLY FEATURE CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 card-grid">
          {features.map((feature, idx) => {
            const Icon = feature.icon;

            return (
              <article
                key={idx}
                className="text-center p-6 bg-background hover-elevate anim-card"
                aria-labelledby={`feature-title-${idx}`}
              >
                <Card className="shadow-none border-none bg-transparent">
                  <CardContent className="p-0 flex flex-col items-center">

                    <div
                      className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-5"
                      role="img"
                      aria-label={`${feature.title} icon`}
                    >
                      <Icon className="h-8 w-8 text-primary" />
                    </div>

                    <h3
                      id={`feature-title-${idx}`}
                      className="text-xl font-semibold mb-2"
                    >
                      {feature.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
