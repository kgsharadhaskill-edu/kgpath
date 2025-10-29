import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">About KGPath</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          KGPath is India's premier AI-focused education platform, dedicated to empowering professionals with cutting-edge technology skills. Our mission is to bridge the gap between traditional education and industry demands, helping you build a future-proof career in the age of AI.
        </p>
        <Link href="/about">
          <Button variant="link" className="mt-4 text-base" data-testid="link-learn-more-about">
            Learn More About Us
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}