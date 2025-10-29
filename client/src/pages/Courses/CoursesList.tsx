// src/components/courses/CoursesList.tsx
import { useState } from 'react';
import type { Course } from '@/lib/courses-data';
import { CourseCard } from './CourseCard';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import ContactForm from '../Home/ContactForm'; // Move ContactForm to a reusable components folder

interface CoursesListProps {
  courses: Course[];
  title?: string;
  description?: string;
}

export function CoursesList({ courses, title, description }: CoursesListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
            {description && (
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">{description}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {courses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course}
              onBrochureClick={handleOpenModal} 
            />
          ))}
        </div>

        {courses.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                No courses found matching your criteria.
              </p>
            </div>
        )}

        {/* Modal for the Contact Form */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[900px] p-0 overflow-hidden rounded-xl">
                {/* The ContactForm component is rendered inside the modal dialog */}
                <ContactForm onClose={handleCloseModal} />
            </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}