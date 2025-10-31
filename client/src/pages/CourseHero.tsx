// src/components/course/CourseHeroForm.tsx

import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Download, Gem } from 'lucide-react';

// Define the props interface for type safety
interface CourseHeroFormProps {
  title: string;
  shortDescription: string;
  level: string;
  duration: string;
  skills: string[];
  keyHighlights: string[];
  specializations: string[];
  formImage: string;
  heroImage: string; // <-- 1. Add prop to accept the background image
}

// Helper component for the country code input
const CountryCodeInput = () => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <span className="fi fi-in mr-2">🇮🇳</span> {/* Simple emoji flag */}
      <span className="text-muted-foreground text-sm">+91</span>
    </div>
    <Input
      type="tel"
      placeholder="Enter Contact Number"
      className="pl-20"
      data-testid="input-contact-number"
    />
  </div>
);

export const CourseHeroForm = ({
  title,
  shortDescription,
  level,
  duration,
  skills,
  keyHighlights,
  specializations,
  formImage,
  heroImage, // Destructure the new prop
}: CourseHeroFormProps) => {
  return (
    <section 
      className="relative py-16 md:py-20 bg-no-repeat bg-cover bg-center"
      style={{
        // 2. Use the 'heroImage' prop here to set the background
        backgroundImage: `linear-gradient(rgba(18, 18, 23, 0.95), rgba(18, 18, 23, 0.95)), url('${heroImage}')`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Column: Course Info */}
          <div className="space-y-6 text-white">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Link href="/courses">
                <a className="hover:text-white transition-colors" data-testid="link-breadcrumb-courses">Courses</a>
              </Link>
              <span>/</span>
              <span data-testid="text-breadcrumb-course-title">{title}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-white/20 text-white border-white/30">{level}</Badge>
              <Badge className="bg-white/20 text-white border-white/30">
                <Clock className="h-3 w-3 mr-1" />
                {duration}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl">
              {title}
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl">
              {shortDescription}
            </p>
          </div>

          {/* Right Column: Form Card */}
          <div className="w-full max-w-md mx-auto">
            <Card className="bg-card/90 backdrop-blur-sm border-border/20 shadow-xl">
              <CardHeader className="p-0 overflow-hidden rounded-t-lg">
                 <img 
                  src={formImage} 
                  alt="Data Science Program" 
                  className="w-full h-32 object-cover" 
                />
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-center">See what you'll learn</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {keyHighlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Gem className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-4 pt-4 border-t">
                  <CountryCodeInput />
                  <Select>
                    <SelectTrigger data-testid="select-specialization">
                      <SelectValue placeholder="Choose one specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      {specializations.map((spec, idx) => (
                        <SelectItem key={idx} value={spec.toLowerCase().replace(' ', '-')}>{spec}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white"
                    data-testid="button-download-brochure-hero"
                  >
                    Download Brochure <Download className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center px-4">
                  We respect your privacy. Your data is secure and will only be used to contact you about Hero Vired programs. By filling this form, you agree to our <a href="#" className="underline text-primary">Terms and Conditions</a>.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};