// src/components/HeroSection.tsx

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Quote, X } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import the ContactForm component (adjust the path as needed)
import ContactForm from './ContactForm'; 

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

interface Testimonial {
  id: number;
  image: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  companyLogo?: string;
}

interface HeroSectionProps {
  heroImg: string;
  testimonials: Testimonial[];
}

export default function HeroSection({ heroImg, testimonials }: HeroSectionProps) {
  // State to control the visibility of the contact form modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handlers to open and close the modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="relative flex flex-col w-full min-h-screen overflow-hidden bg-black">
        {/* Background Image & Gradient */}
        <div
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

        {/* Main Content Area */}
        <div className="relative z-10 flex-grow max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* === UPDATED: Reduced top padding to move content up === */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 gap-x-8 items-center pt-20 md:pt-24 pb-16">
            
            {/* Left Column: Text Content */}
            <div className="text-white max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
                Learn Smarter! Build Faster! Think AI!
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                Learn how AI transforms careers in Digital Marketing, Full Stack Development, Data Analytics, and DevOps.
              </p>
              <div className="mb-10 flex justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="text-base md:text-lg px-8 bg-purple-600 hover:bg-purple-700"
                  onClick={openModal} // Open modal on click
                >
                  ⚡ Start Learning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-x-8 gap-y-6 text-gray-200">
                <div className="text-center sm:text-left"><p className="text-3xl lg:text-4xl font-bold text-green-400">62.6%</p><p className="text-sm tracking-wide">Avg. Salary Hike</p></div>
                <div className="text-center sm:text-left"><p className="text-3xl lg:text-4xl font-bold text-green-400">500+</p><p className="text-sm tracking-wide">Success Stories</p></div>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 mt-6 text-yellow-400">
                {[...Array(4)].map((_, i) => (<Star key={i} fill="currentColor" className="h-5 w-5" />))}
                <div className="relative h-5 w-5"><Star className="h-5 w-5 text-yellow-400 opacity-40" /><div className="absolute top-0 left-0 overflow-hidden w-1/2 h-full"><Star fill="currentColor" className="h-5 w-5 text-yellow-400" /></div></div>
                <span className="text-white ml-2 text-sm">4.5 star ratings across platforms</span>
              </div>
            </div>

            {/* Right Column: Swipable Testimonial Carousel */}
            <div className="relative flex items-center justify-center h-full lg:min-h-[500px]">
              <Swiper modules={[Pagination, Autoplay]} spaceBetween={30} slidesPerView={1} loop={true} autoplay={{ delay: 5000, disableOnInteraction: false }} className="w-full h-full hero-swiper">
                {testimonials.map((testimonial) => (
                  <SwiperSlide key={testimonial.id} className="self-center">
                    {/* === UPDATED: Responsive container for testimonial card === */}
                    <div className="flex items-center justify-center h-full">
                      {/* Container for image and card. Flex-col on mobile, relative on desktop */}
                      <div className="flex flex-col items-center lg:relative w-full max-w-sm lg:max-w-md mx-auto">
                        {/* Image */}
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-auto object-contain max-h-[400px] lg:max-h-[480px]"
                        />
                        {/* Card. Positioned below on mobile, absolute on desktop */}
                        <div className="
                          relative w-[90%] max-w-[340px] -mt-10  /* Mobile: Stacked below with negative margin */
                          lg:absolute lg:bottom-8 lg:right-4 lg:mt-0 lg:w-auto /* Desktop: Absolute positioned */
                          z-10
                        ">
                          <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-lg p-5 text-white shadow-2xl">
                            <Quote className="absolute top-4 right-4 h-12 w-12 text-white/20" />
                            <p className="text-sm mb-4 italic">{testimonial.quote}</p>
                            <div className="flex items-center gap-3">
                              <div>
                                <p className="font-semibold">{testimonial.name}</p>
                                <p className="text-xs text-gray-300">{testimonial.title}</p>
                              </div>
                              <div className="ml-auto text-xs font-mono bg-white/90 text-black px-2 py-1 rounded">
                                {testimonial.company}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        {/* Bottom company logos section */}
        <div className="relative z-10 w-full mt-auto overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="py-8 text-center">
            {/* === UPDATED: Responsive font size for heading === */}
            <h3 className="text-xs sm:text-sm font-semibold tracking-widest text-red-500 mb-6">
              BREAK INTO THE TOP 1% WITH AI POWERED-SKILLS
            </h3>
            <div className="relative w-full overflow-hidden">
              <div className="flex whitespace-nowrap animate-marquee text-gray-400 grayscale opacity-60">
                {['Goldman Sachs', 'Google', 'HDFC Bank', 'ICICI Bank', 'Shell', 'JPMorganChase', 'Goldman Sachs', 'Google', 'HDFC Bank', 'ICICI Bank', 'Shell', 'JPMorganChase'].map((company, i) => (
                  // === UPDATED: Responsive font size for logos ===
                  <span key={i} className="mx-10 text-base sm:text-lg font-medium">
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Modal for the Contact Form */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
          onClick={closeModal} // Close modal on overlay click
        >
          <div 
            className="relative w-full max-w-6xl mx-auto m-4"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <button
                onClick={closeModal}
                className="absolute -top-4 -right-4 z-10 bg-white rounded-full p-2 shadow-lg text-gray-600 hover:text-black hover:scale-110 transition-transform"
                aria-label="Close modal"
            >
                <X className="h-6 w-6" />
            </button>
            <ContactForm onClose={closeModal} />
          </div>
        </div>
      )}
    </>
  );
}