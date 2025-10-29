// src/pages/CourseDetail.tsx

import { useRoute, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Clock, 
  CheckCircle2, 
  Calendar,
  Users,
  Award,
  ArrowRight,
} from 'lucide-react';
import { getCourseBySlug, coursesData } from '@/lib/courses-data';
import { CourseHeroForm } from './CourseHero'; // Import the new component

export default function CourseDetail() {
  const [, params] = useRoute('/courses/:slug');
  const course = params?.slug ? getCourseBySlug(params.slug) : null;

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
        <p className="text-muted-foreground mb-8">The course you're looking for doesn't exist.</p>
        <Link href="/courses">
          <Button data-testid="button-browse-courses-fallback">Browse All Courses</Button>
        </Link>
      </div>
    );
  }

  const relatedCourses = coursesData.filter(c => c.id !== course.id).slice(0, 2);

  // Mocked data as requested by the user prompt
  const courseWithNewData = {
    ...course,
    keyHighlights: course.keyHighlights || [
      '5-month Core Foundation of Data Science',
      '3-month Specialization : AI/ML or Data Engineering',
      '180+ live hours in total of Expert-led sessions',
    ],
    skills: course.skills || ['Python', 'SQL', 'Machine Learning', 'Data Visualization', 'Big Data', 'Tableau', 'Deep Learning', 'Statistics'],
    specializations: course.specializations || ['AI/ML', 'Data Engineering'],
    formImage: course.formImage || 'https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Placeholder image for the form header
  };

  return (
    <div className="flex flex-col bg-background">
      {/* --- Use the new Hero Section Component --- */}
      <CourseHeroForm 
        title={courseWithNewData.title}
        shortDescription={courseWithNewData.shortDescription}
        level={courseWithNewData.level}
        duration={courseWithNewData.duration}
        skills={courseWithNewData.skills}
        keyHighlights={courseWithNewData.keyHighlights}
        specializations={courseWithNewData.specializations}
        formImage={courseWithNewData.formImage}
        heroImage={course.image}
      />
      {/* --- Main Content Section --- */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Course Overview</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {courseWithNewData.overview}
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Key Learning Outcomes</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {courseWithNewData.learningOutcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-3" data-testid={`outcome-${idx}`}>
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Course Curriculum</h2>
                <Accordion type="single" collapsible className="w-full">
                  {courseWithNewData.curriculum.map((module, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`} data-testid={`curriculum-module-${idx}`}>
                      <AccordionTrigger className="text-left font-semibold">{module.module}</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 pl-6 list-disc list-outside marker:text-primary">
                          {module.topics.map((topic, topicIdx) => (
                            <li key={topicIdx} className="text-muted-foreground">{topic}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Prerequisites</h2>
                <ul className="space-y-3">
                  {courseWithNewData.prerequisites.map((prereq, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{prereq}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Tools & Technologies</h2>
                <div className="flex flex-wrap gap-3">
                  {courseWithNewData.tools.map((tool, idx) => (
                    <Badge key={idx} variant="secondary" className="text-sm px-4 py-2">{tool}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Certification</h2>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground leading-relaxed">{courseWithNewData.certification}</p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Meet Your Instructor</h2>
                <Card className="hover-elevate">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <img 
                        src={courseWithNewData.instructor.photo} 
                        alt={courseWithNewData.instructor.name}
                        className="w-32 h-32 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">{courseWithNewData.instructor.name}</h3>
                        <p className="text-primary font-medium mb-3">{courseWithNewData.instructor.title}</p>
                        <p className="text-sm text-muted-foreground mb-2"><strong>Credentials:</strong> {courseWithNewData.instructor.credentials}</p>
                        <p className="text-sm text-muted-foreground"><strong>Experience:</strong> {courseWithNewData.instructor.experience}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {courseWithNewData.faqs.map((faq, idx) => (
                    <AccordionItem key={idx} value={`faq-${idx}`} data-testid={`faq-${idx}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent><p className="text-muted-foreground">{faq.answer}</p></AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* --- Right Sidebar --- */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <Card>
                  <CardContent className="p-6 space-y-2">
                    <h3 className="text-xl font-bold mb-2">Course Information</h3>
                    <div className="flex items-center gap-3 py-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-sm text-muted-foreground">Duration</div>
                        <div className="font-semibold">{courseWithNewData.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 py-2">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-sm text-muted-foreground">Level</div>
                        <div className="font-semibold">{courseWithNewData.level}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 py-2">
                      <Award className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-sm text-muted-foreground">Certification</div>
                        <div className="font-semibold text-sm">Industry Recognized</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold">Upcoming Batches</h3>
                    {courseWithNewData.upcomingBatches.map((batch, idx) => (
                      <div key={idx} className="py-2 border-b last:border-0" data-testid={`batch-${idx}`}>
                        <div className="flex items-start gap-3">
                          <Calendar className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <div className="font-semibold">{batch.startDate}</div>
                            <div className="text-sm text-muted-foreground">{batch.schedule}</div>
                            <Badge variant="outline" className="mt-2 text-xs">{batch.seats}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Related Courses Section --- */}
      {relatedCourses.length > 0 && (
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Related Courses</h2>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {relatedCourses.map((relatedCourse) => (
                <Card key={relatedCourse.id} className="hover-elevate overflow-hidden group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={relatedCourse.image} 
                      alt={relatedCourse.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">{relatedCourse.level}</Badge>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />{relatedCourse.duration}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{relatedCourse.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{relatedCourse.shortDescription}</p>
                    <Link href={`/courses/${relatedCourse.slug}`}>
                      <Button className="w-full" data-testid={`button-related-${relatedCourse.slug}`}>
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}