// src/pages/Home/CtaSection.tsx

import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { TrendingUp, ArrowRight } from 'lucide-react';

// This component is self-contained and doesn't need props
export default function CtaSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-purple-600 text-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <TrendingUp className="h-16 w-16 mx-auto mb-6 opacity-90" />
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Ready to Transform Your Career?
        </h2>
        <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
          Join thousands of successful students who are now working at top companies. Start your AI learning journey today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/courses">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-base md:text-lg px-8 w-full sm:w-auto"
              data-testid="button-cta-enroll"
            >
              Enroll Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button 
              size="lg" 
              variant="outline" 
              className="text-base md:text-lg px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 w-full sm:w-auto"
              data-testid="button-cta-counselor"
            >
              Talk to Counselor
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}