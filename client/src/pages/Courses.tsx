// src/pages/Courses.tsx
import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter } from 'lucide-react';
import { coursesData } from '@/lib/courses-data';
import { CoursesList } from './Courses/CoursesList'; // Import the reusable component

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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Our AI Courses</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
            Comprehensive programs designed by industry experts to make you job-ready.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-background border-b sticky top-0 z-10 backdrop-blur-sm bg-background/80">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="flex items-center gap-2 flex-shrink-0">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="font-semibold">Filters:</span>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-semibold text-muted-foreground self-center pr-2">Level:</span>
              {levels.map(level => (
                <Badge key={level} variant={selectedLevel === level ? 'default' : 'outline'} className="cursor-pointer" onClick={() => setSelectedLevel(level)}>{level}</Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-semibold text-muted-foreground self-center pr-2">Category:</span>
              {categories.map(category => (
                <Badge key={category} variant={selectedCategory === category ? 'default' : 'outline'} className="cursor-pointer" onClick={() => setSelectedCategory(category)}>{category}</Badge>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredCourses.length}</span> {filteredCourses.length === 1 ? 'course' : 'courses'}
            </p>
          </div>
        </div>
      </section>

      {/* Use the reusable CoursesList component to display the filtered courses */}
      <CoursesList courses={filteredCourses} />

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Not Sure Which Course to Choose?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Talk to our career counselors to find the perfect course for your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact"><Button size="lg">Talk to Counselor</Button></Link>
            <Link href="/contact"><Button size="lg" variant="outline">Book Free Demo</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}