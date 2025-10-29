// src/pages/Home/TestimonialsSection.tsx

import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

// Define the shape of a testimonial object
interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
}

// Define the props for the component
interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-16 md:py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Student Success Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from our alumni who transformed their careers with KGPath
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, idx) => (
            <Card key={idx} className="hover-elevate" data-testid={`testimonial-${idx}`}>
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-6 italic flex-grow">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}