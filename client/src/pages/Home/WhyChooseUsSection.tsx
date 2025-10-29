import { Card, CardContent } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface WhyChooseUsSectionProps {
  features: Feature[];
}

export default function WhyChooseUsSection({ features }: WhyChooseUsSectionProps) {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Why Choose KGPath?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide everything you need to succeed in your AI career
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card key={idx} className="text-center hover-elevate p-6" data-testid={`card-feature-${idx}`}>
                <CardContent className="p-0">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}