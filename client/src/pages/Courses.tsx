import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Clock, 
  CheckCircle2,
  Filter
} from 'lucide-react';
import { coursesData, type Course } from '@/lib/courses-data';

export default function Courses() {
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const categories = ['All', ...Array.from(new Set(coursesData.map(c => c.category)))];

  const filteredCourses = coursesData.filter(course => {
    const levelMatch = selectedLevel === 'All' || course.level === selectedLevel;
    const categoryMatch = selectedCategory === 'All' || course.category === selectedCategory;
    return levelMatch && categoryMatch;
  });

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-primary to-purple-600 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Our AI Courses
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Comprehensive programs designed by industry experts to make you job-ready in cutting-edge AI technologies.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-8 md:mb-12">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="font-semibold">Filters:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground self-center">Level:</span>
              {levels.map(level => (
                <Badge
                  key={level}
                  variant={selectedLevel === level ? 'default' : 'outline'}
                  className="cursor-pointer hover-elevate"
                  onClick={() => setSelectedLevel(level)}
                  data-testid={`filter-level-${level.toLowerCase()}`}
                >
                  {level}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground self-center">Category:</span>
              {categories.map(category => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className="cursor-pointer hover-elevate"
                  onClick={() => setSelectedCategory(category)}
                  data-testid={`filter-category-${category.toLowerCase()}`}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredCourses.length}</span> {filteredCourses.length === 1 ? 'course' : 'courses'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover-elevate overflow-hidden group flex flex-col" data-testid={`card-course-${course.slug}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">{course.level}</Badge>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {course.duration}
                    </Badge>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {course.shortDescription}
                  </p>
                  
                  <div className="mb-6 flex-1">
                    <h4 className="text-sm font-semibold mb-2">Key Learning Outcomes:</h4>
                    <ul className="space-y-2">
                      {course.learningOutcomes.slice(0, 3).map((outcome, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3 mt-auto">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Course Fee:</span>
                      <span className="font-bold text-lg text-primary">{course.feeStructure.amount}</span>
                    </div>
                    <Link href={`/courses/${course.slug}`}>
                      <Button className="w-full" data-testid={`button-view-details-${course.slug}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                No courses found matching your filters. Please adjust your selection.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Not Sure Which Course to Choose?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Talk to our career counselors to find the perfect course for your goals and background.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" data-testid="button-counselor">
                Talk to Counselor
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" data-testid="button-demo">
                Book Free Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
