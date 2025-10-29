// src/pages/Courses.tsx
import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter } from 'lucide-react';
import { coursesData } from '@/lib/courses-data';
import { CoursesList } from '../Courses/CoursesList'; // Import the reusable component

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