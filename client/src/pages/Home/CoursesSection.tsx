import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { Course } from '@/lib/courses-data'; // Assuming you have a type definition for Course

interface CoursesSectionProps {
  courses: Course[];
}

export default function CoursesSection({ courses }: CoursesSectionProps) {
  return (
    <section className="py-16 md:py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Our AI Courses</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive programs designed to make you industry-ready
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="hover-elevate overflow-hidden group" data-testid={`card-course-${course.slug}`}>
              <div className="aspect-[4/3] overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">{course.level}</Badge>
                  <Badge variant="outline" className="text-xs"><Clock className="h-3 w-3 mr-1" />{course.duration}</Badge>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{course.shortDescription}</p>
                <ul className="space-y-2 mb-6">
                  {course.learningOutcomes.slice(0, 3).map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{outcome}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`/courses/${course.slug}`}>
                  <Button className="w-full" data-testid={`button-learn-more-${course.slug}`}>
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}