// src/pages/Home.tsx

import {
  AboutSection,
  CoursesSection,
  CtaSection,
  HeroSection,
  HiringPartnersSection,
  HowItWorksSection,
  StatsSection,
  TestimonialsSection,
  WhyChooseUsSection,
} from './Home/index';
// Data imports
import { coursesData } from '@/lib/courses-data';
import studentImg from '@assets/generated_images/Student_testimonial_photo_ccc63061.png';
import heroImg from '@assets/generated_images/Education_hero_workspace_image_3704cc8a.png';

// Icon imports (only for data definitions)
import { Users, Trophy, Building2, GraduationCap, BookOpen, Rocket, UserCheck } from 'lucide-react';

// Main Home component
export default function Home() {
  // Data definitions remain here to be passed down as props
  const stats = [
    { label: 'Students Trained', value: '10,000+', icon: Users },
    { label: 'Placement Rate', value: '95%', icon: Trophy },
    { label: 'Partner Companies', value: '200+', icon: Building2 },
    { label: 'Expert Instructors', value: '50+', icon: GraduationCap }
  ];

  const features = [
    { icon: Users, title: 'Expert Instructors', description: 'Learn from industry veterans with 10+ years of experience at top tech companies.' },
    { icon: BookOpen, title: 'Industry-Relevant Curriculum', description: 'Stay ahead with courses updated quarterly to match current industry demands.' },
    { icon: Rocket, title: 'Hands-on Projects', description: 'Build real-world projects that showcase your skills to potential employers.' },
    { icon: UserCheck, title: 'Placement Support', description: 'Comprehensive job assistance with resume building, mock interviews, and referrals.' }
  ];

  const steps = [
    { number: '01', title: 'Browse', description: 'Explore our AI-focused courses' },
    { number: '02', title: 'Enroll', description: 'Choose your course and register' },
    { number: '03', title: 'Learn', description: 'Master skills with expert guidance' },
    { number: '04', title: 'Get Placed', description: 'Land your dream job' }
  ];

  const testimonials = [
    { name: 'Amit Patel', role: 'Digital Marketing Manager', company: 'Tech Corp', image: studentImg, quote: "KGPath's AI Marketing course transformed my career. I landed a 60% salary hike within 3 months of completion!" },
    { name: 'Sneha Reddy', role: 'Full Stack Developer', company: 'StartupXYZ', image: studentImg, quote: 'The hands-on projects and mentorship were exceptional. Now I am building AI-powered applications confidently.' },
    { name: 'Rahul Sharma', role: 'Data Analyst', company: 'Finance Inc', image: studentImg, quote: 'Best investment in my career! The placement support team helped me get multiple job offers.' }
  ];

  const companies = [
    'Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Adobe',
    'Salesforce', 'IBM', 'Oracle', 'Accenture', 'TCS', 'Infosys'
  ];

  const testimonialData = [
  {
    id: 1,
    image: '../../public/student-2.png', // Replace with your image path
    quote: "Thanks to Hero Vired's program, I experienced significant personal and professional growth...",
    name: 'Darshita S.',
    title: 'Senior PR Manager',
    company: 'TechMahindra',
  },
  {
    id: 2,
    image: '../../public/student-2.png', // Replace with a different image
    quote: "The practical, hands-on projects were incredible. I built a portfolio that got me hired at my dream company.",
    name: 'Rohan V.',
    title: 'Full Stack Developer',
    company: 'Google',
  },
  {
    id: 3,
    image: '../../public/student-2.png', // Replace with a different image
    quote: "Switching careers felt daunting, but the AI in Data Analytics course gave me the confidence and skills to succeed.",
    name: 'Priya M.',
    title: 'Data Analyst',
    company: 'JPMorganChase',
  },
];

  return (
    <div className="flex flex-col">
      <HeroSection heroImg={heroImg} testimonials={testimonialData}  />
      <CoursesSection/>
      <WhyChooseUsSection features={features} />
      <StatsSection stats={stats} />
      <HowItWorksSection steps={steps} />
      <TestimonialsSection testimonials={testimonials} />
      <HiringPartnersSection companies={companies} />
      <AboutSection />
      <CtaSection />
    </div>
  );
}