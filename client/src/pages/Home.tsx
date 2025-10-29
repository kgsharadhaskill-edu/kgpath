// src/pages/Home.tsx

import {
  AboutSection,
  CoursesSection,
  HeroSection,
  HiringPartnersSection,
  StatsSection,
  TestimonialsSection,
  WhyChooseUsSection,
} from './Home/index';
// Data imports
import studentImg from '@assets/generated_images/Student_testimonial_photo_ccc63061.png';
import heroImg from '@assets/generated_images/Education_hero_workspace_image_3704cc8a.png';

// Icon imports (only for data definitions)
import { Users, Trophy, Building2, GraduationCap } from 'lucide-react';
import CourseFAQSection from './Home/FAQSection';

// Main Home component
export default function Home() {
  // Data definitions remain here to be passed down as props
  const stats = [
    { label: 'Students Trained', value: '1000+', icon: Users },
    { label: 'Placement Rate', value: '100%', icon: Trophy },
    { label: 'Partner Companies', value: '200+', icon: Building2 },
    { label: 'Expert Instructors', value: '50+', icon: GraduationCap }
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
      <WhyChooseUsSection/>
      <StatsSection stats={stats}
        heading="Proven Success by the Numbers"
        subheading="We are proud of our commitment to excellence and the results we deliver. Our stats speak for themselves."
       />
      <TestimonialsSection testimonials={testimonials} />
      <HiringPartnersSection companies={companies} />
      <CourseFAQSection />
      <AboutSection />
    </div>
  );
}