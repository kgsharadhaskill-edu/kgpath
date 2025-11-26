// src/pages/Home.tsx
import { Helmet } from "react-helmet-async";
import ScrollReveal from "./ScrollReveal";

import {
  AboutSection,
  CoursesSection,
  HeroSection,
  HiringPartnersSection,
  StatsSection,
  TestimonialsSection,
  WhyChooseUsSection,
} from './Home/index';

import studentImg from '@assets/generated_images/Student_testimonial_photo_ccc63061.png';
import heroImg from '@assets/generated_images/Education_hero_workspace_image_3704cc8a.png';

import { Users, Trophy, Building2, GraduationCap } from 'lucide-react';
import CourseFAQSection from './Home/FAQSection';

// Main Home Component
export default function Home() {

  // ---- Stats Data ----
  const stats = [
    { label: 'Students Trained', value: '1000+', icon: Users },
    { label: 'Placement Rate', value: '100%', icon: Trophy },
    { label: 'Partner Companies', value: '200+', icon: Building2 },
    { label: 'Expert Instructors', value: '50+', icon: GraduationCap }
  ];

  // ---- Testimonials ----
  const testimonials = [
    {
      name: 'Amit Patel',
      role: 'Digital Marketing Manager',
      company: 'Tech Corp',
      image: studentImg,
      quote: "KGPath's AI Marketing course transformed my career. I landed a 60% salary hike within 3 months!"
    },
    {
      name: 'Sneha Reddy',
      role: 'Full Stack Developer',
      company: 'StartupXYZ',
      image: studentImg,
      quote: 'The hands-on projects and expert mentorship helped me build AI-powered applications confidently.'
    },
    {
      name: 'Rahul Sharma',
      role: 'Data Analyst',
      company: 'Finance Inc',
      image: studentImg,
      quote: 'The placement support team helped me secure multiple job offers. Great program!'
    }
  ];

  // ---- Hero Testimonials Slider ----
  const testimonialData = [
    {
      id: 1,
      image: '../../../student-2.png',
      quote: "Thanks to KGPath’s program, I experienced massive personal and professional growth...",
      name: 'Darshita S.',
      title: 'Senior PR Manager',
      company: 'TechMahindra',
    },
    {
      id: 2,
      image: '../../../student-2.png',
      quote: "The practical, hands-on projects helped me build a portfolio that got me hired at Google.",
      name: 'Rohan V.',
      title: 'Full Stack Developer',
      company: 'Google',
    },
    {
      id: 3,
      image: '../../../student-2.png',
      quote: "Switching careers felt easy with KGPath. The AI Data Analytics course changed my life.",
      name: 'Priya M.',
      title: 'Data Analyst',
      company: 'JPMorganChase',
    },
  ];

  const companies = [
    'Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Adobe',
    'Salesforce', 'IBM', 'Oracle', 'Accenture', 'TCS', 'Infosys'
  ];

  return (
    <div className="flex flex-col">

      {/* ----------------------------------- */}
      {/* 🔥 PAGE-LEVEL SEO (VERY IMPORTANT) */}
      {/* ----------------------------------- */}
      <Helmet>
        <title>KGPath – AI Courses in Coimbatore | Digital Marketing, Full Stack, Data Analytics</title>

        <meta
          name="description"
          content="KGPath offers AI-powered courses in Coimbatore including Digital Marketing AI, Full Stack AI, Data Analytics AI and DevOps. 100% placement support and expert mentors."
        />

        <meta
          name="keywords"
          content="AI courses Coimbatore, KGPath, Digital Marketing AI, AI Full Stack Development, AI Data Analytics, tech courses Coimbatore, placement training"
        />

        <link rel="canonical" href="https://www.kgpath.com/" />

        {/* Open Graph for social */}
        <meta property="og:title" content="KGPath – Best AI Courses in Coimbatore" />
        <meta property="og:description" content="Become job-ready with AI-powered courses in Full Stack, Digital Marketing and Data Analytics. Learn smarter with KGPath." />
        <meta property="og:image" content={heroImg} />
        <meta property="og:url" content="https://www.kgpath.com/" />
        <meta property="og:type" content="website" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="KGPath – AI Courses in Coimbatore" />
        <meta name="twitter:description" content="Upskill with AI-powered courses at KGPath. 100% placement support." />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "KGPath",
            "url": "https://www.kgpath.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Coimbatore",
              "addressRegion": "Tamil Nadu",
              "addressCountry": "India"
            },
            "description": "AI-powered courses including Digital Marketing, Full Stack Development, Data Analytics and DevOps in Coimbatore.",
            "knowsAbout": [
              "AI in Digital Marketing",
              "AI in Full Stack Development",
              "AI in Data Analytics",
              "Career training",
              "Placement support"
            ]
          }
          `}
        </script>
      </Helmet>

      {/* ----------------------------------- */}
      {/* 🔥 HOME PAGE SECTIONS */}
      {/* ----------------------------------- */}

      <ScrollReveal>
        <HeroSection {...({ heroImg, testimonials: testimonialData } as any)} />
      </ScrollReveal>

      <ScrollReveal>
        <CoursesSection />
      </ScrollReveal>

      <ScrollReveal>
        <WhyChooseUsSection />
      </ScrollReveal>

      <ScrollReveal>
        <StatsSection
          stats={stats}
          heading="Proven Success by the Numbers"
          subheading="Our programs are designed to ensure real outcomes, not just certificates."
        />
      </ScrollReveal>

      <ScrollReveal>
        <TestimonialsSection testimonials={testimonials} />
      </ScrollReveal>

      <ScrollReveal>
        <HiringPartnersSection companies={companies} />
      </ScrollReveal>

      <ScrollReveal>
        <CourseFAQSection />
      </ScrollReveal>

      <ScrollReveal>
        <AboutSection />
      </ScrollReveal>
    </div>
  );
}
