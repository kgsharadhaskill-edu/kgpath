import React, { useState, lazy, Suspense } from 'react';
import { Helmet } from "react-helmet-async";
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Quote, X } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import ContactForm from './ContactForm'; 
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const Hyperspeed = lazy(() => import('../../animation/Hyperspeed'));

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
  testimonials: Testimonial[];
}

export default function HeroSection({ testimonials }: HeroSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>

      {/* ------------------ SEO META TAGS ------------------ */}
      <Helmet>
        <title>
          KGPATH – AI Courses in Coimbatore | Digital Marketing, Full Stack & Data Analytics
        </title>

        <meta 
          name="description" 
          content="Learn Smarter and Build Faster with KGPATH. AI-powered courses in Digital Marketing, Full Stack Development, Data Analytics & DevOps with placement support in Coimbatore." 
        />

        <meta 
          name="keywords" 
          content="AI courses Coimbatore, AI digital marketing, AI full stack development, AI data analytics course, tech training Coimbatore, KGPATH" 
        />

        <meta property="og:title" content="KGPATH – Best AI Courses in Coimbatore" />
        <meta 
          property="og:description" 
          content="Transform your career with AI-powered courses in Digital Marketing, Full Stack Development, and Data Analytics. Learn from industry experts at KGPATH." 
        />
        <meta property="og:image" content="/images/kgpath-hero-banner.webp" />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "KGPATH",
            "description": "AI courses in Digital Marketing, Full Stack Development, Data Analytics and DevOps with placement support in Coimbatore.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Coimbatore",
              "addressRegion": "Tamil Nadu",
              "addressCountry": "India"
            }
          }
          `}
        </script>
      </Helmet>
      {/* --------------------------------------------------- */}

      {/* HERO SECTION WRAPPER */}
      <section id="hero" className="relative flex flex-col w-full min-h-screen overflow-hidden bg-black">

        {/* Background Animation */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={null}>
            <Hyperspeed />
          </Suspense>
        </div>

        <div className="absolute inset-0 z-[5] bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* Main Content */}
        <div className="relative z-10 flex-grow max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 gap-x-8 items-center pt-20 md:pt-24 pb-16">

            {/* ------------------ LEFT CONTENT ------------------ */}
            <div className="text-white max-w-lg mx-auto lg:mx-0 text-center lg:text-left">

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
                Learn Smarter. Build Faster. Master AI Skills in Coimbatore.
              </h1>

              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                Become industry-ready with AI-powered training in Digital Marketing, 
                Full Stack Development, Data Analytics, and DevOps. Learn from experts, 
                build real-world projects, and fast-track your career with KGPATH.
              </p>

              <div className="mb-10 flex justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="text-base md:text-lg px-8 bg-purple-600 hover:bg-purple-700"
                  onClick={openModal}
                >
                  ⚡ Start Learning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-x-8 gap-y-6 text-gray-200">
                <div className="text-center sm:text-left">
                  <p className="text-3xl lg:text-4xl font-bold text-green-400">62.6%</p>
                  <p className="text-sm tracking-wide">Average Salary Hike for KGPATH Learners</p>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-3xl lg:text-4xl font-bold text-green-400">500+</p>
                  <p className="text-sm tracking-wide">Successful Career Transitions</p>
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2 mt-6 text-yellow-400">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} fill="currentColor" className="h-5 w-5" />
                ))}

                <div className="relative h-5 w-5">
                  <Star className="h-5 w-5 text-yellow-400 opacity-40" />
                  <div className="absolute top-0 left-0 overflow-hidden w-1/2 h-full">
                    <Star fill="currentColor" className="h-5 w-5 text-yellow-400" />
                  </div>
                </div>

                <span className="text-white ml-2 text-sm">
                  4.5 star ratings across platforms
                </span>
              </div>

            </div>

            {/* ------------------ TESTIMONIAL CAROUSEL ------------------ */}
            <div className="relative flex items-center justify-center h-full lg:min-h-[500px]">
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                className="w-full h-full hero-swiper"
              >
                {testimonials.map((testimonial) => (
                  <SwiperSlide key={testimonial.id} className="self-center">
                    <div className="flex items-center justify-center h-full">
                      <div className="flex flex-col items-center lg:relative w-full max-w-sm lg:max-w-md mx-auto">

                        <img
                          src={testimonial.image}
                          alt={`${testimonial.name} - ${testimonial.title} sharing success story from ${testimonial.company}`}
                          className="w-full h-auto object-contain max-h-[400px] lg:max-h-[480px]"
                        />

                        <div
                          className="
                            relative w-[90%] max-w-[340px] -mt-10
                            lg:absolute lg:bottom-8 lg:right-4 lg:mt-0 lg:w-auto
                            z-10
                          "
                        >
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

        {/* ------------------ COMPANY MARQUEE WITH SEO TEXT ------------------ */}
        <div className="relative z-10 w-full mt-auto overflow-hidden">
          <div className="max-w-screen-xl mx-auto px-8">
            <div className="py-8 text-center">

              <h3 className="text-xs sm:text-sm font-semibold tracking-widest text-red-500 mb-6">
                BREAK INTO THE TOP 1% WITH AI POWERED-SKILLS
              </h3>

              <p className="sr-only">
                Students from KGPATH are hired by companies such as Google, Goldman Sachs, 
                HDFC Bank, ICICI Bank, Shell, and JPMorgan Chase.
              </p>

              <div className="relative w-full overflow-hidden">
                <div className="flex whitespace-nowrap animate-marquee text-gray-400 grayscale opacity-60">
                  {[
                    'Goldman Sachs', 'Google', 'HDFC Bank', 'ICICI Bank',
                    'Shell', 'JPMorganChase','Goldman Sachs', 'Google',
                    'HDFC Bank', 'ICICI Bank', 'Shell', 'JPMorganChase'
                  ].map((company, i) => (
                    <span key={i} className="mx-10 text-base sm:text-lg font-medium">
                      {company}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* ------------------ CONTACT FORM MODAL ------------------ */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="relative w-full max-w-6xl mx-auto m-4"
            onClick={(e) => e.stopPropagation()}
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
