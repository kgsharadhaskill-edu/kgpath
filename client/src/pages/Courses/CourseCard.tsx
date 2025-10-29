// src/components/courses/CourseCard.tsx
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle2, Download, ArrowRight } from 'lucide-react';
import type { Course } from '@/lib/courses-data';

interface CourseCardProps {
  course: Course;
  onBrochureClick: () => void; // Function to open the contact form modal
}

export function CourseCard({ course, onBrochureClick }: CourseCardProps) {
  return (
    // Set the card to be a flex container with full height to ensure it fills the grid cell.
    <Card className="hover-elevate overflow-hidden group flex flex-col h-full" data-testid={`card-course-${course.slug}`}>
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      {/* Set CardContent to be a flex container that grows to fill available space. */}
      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="text-xs">{course.level}</Badge>
          <Badge variant="outline" className="text-xs flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {course.duration}
          </Badge>
        </div>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {course.shortDescription}
        </p>

        {/* This div will grow, pushing the buttons to the bottom of the card. */}
        <div className="flex-1">
          <ul className="space-y-2">
            {course.learningOutcomes.slice(0, 3).map((outcome, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Use mt-auto to ensure this div is always at the bottom of the CardContent flex container. */}
        <div className="mt-auto pt-4 border-t">
           <div className="flex flex-col sm:flex-row gap-2">
             <Button variant="outline" className="w-full" onClick={onBrochureClick}>
                <Download className="mr-2 h-4 w-4" />
                Download Brochure
            </Button>
            <Link href={`/courses/${course.slug}`} className="w-full">
              <Button className="w-full">
                View Program
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}