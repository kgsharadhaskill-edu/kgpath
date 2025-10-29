import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

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
  return (
    <div className="relative flex flex-col w-full min-h-screen overflow-hidden bg-black">
      {/* Background Image & Gradient */}
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      
      {/* Main Content Area */}
      <div className="relative z-10 flex-grow max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* MODIFIED: Increased top padding to account for your now-visible absolute header */}
        {/* The header has h-20 (80px) on mobile and h-24 (96px) on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 gap-x-8 items-center h-full pt-28 md:pt-32 pb-16">
            
            {/* Left Column: Text Content */}
            <div className="text-white max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
                Learn Smarter! Build Faster! Think AI!
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                  Learn how AI transforms careers in Digital Marketing, Full Stack Development, Data Analytics, and DevOps.
              </p>
              {/* ... (rest of the component is unchanged) ... */}
              <div className="mb-10 flex justify-center lg:justify-start">
                <Link href="/book-session"><Button size="lg" className="text-base md:text-lg px-8 bg-purple-600 hover:bg-purple-700">⚡ Start Learning<ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
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
            <div className="relative flex items-center justify-center h-full min-h-[500px]">
              <Swiper modules={[Pagination, Autoplay]} spaceBetween={30} slidesPerView={1} loop={true} autoplay={{delay: 5000, disableOnInteraction: false}} pagination={{ clickable: true }} className="w-full h-full hero-swiper">
                {testimonials.map((testimonial) => (
                  <SwiperSlide key={testimonial.id} className="self-center">
                    <div className="relative flex items-end justify-center h-full">
                      <div className="relative w-full max-w-sm lg:max-w-md mx-auto">
                        <img src={testimonial.image} alt={testimonial.name} className="w-full h-auto object-contain max-h-[480px]" />
                        <div className="absolute bottom-0 w-[90%] max-w-[320px] left-1/2 -translate-x-1/2 translate-y-1/4 sm:left-auto sm:right-0 sm:translate-x-1/4 sm:bottom-8 z-10">
                          <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-lg p-5 text-white shadow-2xl">
                            <Quote className="absolute top-4 right-4 h-12 w-12 text-white/20" />
                            <p className="text-sm mb-4 italic">{testimonial.quote}</p>
                            <div className="flex items-center gap-3">
                              <div><p className="font-semibold">{testimonial.name}</p><p className="text-xs text-gray-300">{testimonial.title}</p></div>
                              <div className="ml-auto text-xs font-mono bg-white/90 text-black px-2 py-1 rounded">{testimonial.company}</div>
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
   
      {/* Bottom Company Logos Section */}
      <div className="relative z-10 w-full mt-auto">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="py-8 text-center">
            <h3 className="text-sm font-semibold tracking-widest text-red-500 mb-6">BREAK INTO THE TOP 1% WITH AI POWERED-SKILLS</h3>
            <div className="flex flex-wrap justify-center items-center gap-x-6 md:gap-x-10 gap-y-4 text-gray-400 grayscale opacity-60">
              {['Goldman Sachs', 'Google', 'HDFC Bank', 'ICICI Bank', 'Shell', 'JPMorganChase'].map(company => (<span key={company} className="text-lg font-medium">{company}</span>))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}