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
  Download,
  Calendar,
  Users,
  Award,
  DollarSign,
  ArrowRight
} from 'lucide-react';
import { getCourseBySlug, coursesData } from '@/lib/courses-data';

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

  return (
    <div className="flex flex-col">
      <section 
        className="relative min-h-[40vh] flex items-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${course.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20 w-full">
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-300">
            <Link href="/courses">
              <a className="hover:text-white transition-colors" data-testid="link-breadcrumb-courses">Courses</a>
            </Link>
            <span>/</span>
            <span data-testid="text-breadcrumb-course-title">{course.title}</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-white/20 text-white border-white/30">{course.level}</Badge>
            <Badge className="bg-white/20 text-white border-white/30">
              <Clock className="h-3 w-3 mr-1" />
              {course.duration}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-4xl">
            {course.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl">
            {course.shortDescription}
          </p>
        </div>
      </section>

      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Course Fee:</span>
              <span className="text-2xl font-bold text-primary">{course.feeStructure.amount}</span>
              {course.feeStructure.emiAvailable && (
                <Badge variant="outline" className="text-xs">EMI Available</Badge>
              )}
            </div>
            <Link href="/contact">
              <Button size="lg" data-testid="button-enroll-sticky">
                Enroll Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Course Overview</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {course.overview}
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">What You'll Learn</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.learningOutcomes.map((outcome, idx) => (
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
                  {course.curriculum.map((module, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`} data-testid={`curriculum-module-${idx}`}>
                      <AccordionTrigger className="text-left">
                        <span className="font-semibold">{module.module}</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 pl-6">
                          {module.topics.map((topic, topicIdx) => (
                            <li key={topicIdx} className="flex items-start gap-2 text-muted-foreground">
                              <span className="text-primary mt-1.5">•</span>
                              <span>{topic}</span>
                            </li>
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
                  {course.prerequisites.map((prereq, idx) => (
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
                  {course.tools.map((tool, idx) => (
                    <Badge key={idx} variant="secondary" className="text-sm px-4 py-2">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Meet Your Instructor</h2>
                <Card className="hover-elevate">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <img 
                        src={course.instructor.photo} 
                        alt={course.instructor.name}
                        className="w-32 h-32 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">{course.instructor.name}</h3>
                        <p className="text-primary font-medium mb-3">{course.instructor.title}</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>Credentials:</strong> {course.instructor.credentials}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Experience:</strong> {course.instructor.experience}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {course.faqs.map((faq, idx) => (
                    <AccordionItem key={idx} value={`faq-${idx}`} data-testid={`faq-${idx}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold">Course Information</h3>
                    
                    <div className="flex items-center gap-3 py-3 border-b">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-sm text-muted-foreground">Duration</div>
                        <div className="font-semibold">{course.duration}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 py-3 border-b">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-sm text-muted-foreground">Level</div>
                        <div className="font-semibold">{course.level}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 py-3 border-b">
                      <Award className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-sm text-muted-foreground">Certification</div>
                        <div className="font-semibold text-sm">Industry Recognized</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 py-3">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-sm text-muted-foreground">Fee</div>
                        <div className="font-semibold text-lg text-primary">{course.feeStructure.amount}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold">Upcoming Batches</h3>
                    {course.upcomingBatches.map((batch, idx) => (
                      <div key={idx} className="py-3 border-b last:border-0" data-testid={`batch-${idx}`}>
                        <div className="flex items-start gap-3 mb-2">
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

                <Card className="bg-gradient-to-br from-primary to-purple-600 text-white border-0">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold">Fee Structure</h3>
                    <div className="text-3xl font-bold">{course.feeStructure.amount}</div>
                    {course.feeStructure.emiAvailable && (
                      <p className="text-sm opacity-90">
                        {course.feeStructure.emiDetails}
                      </p>
                    )}
                    <div className="space-y-2 pt-2">
                      <Link href="/contact">
                        <Button variant="secondary" className="w-full" size="lg" data-testid="button-enroll-sidebar">
                          Enroll Now
                        </Button>
                      </Link>
                      <Link href="/contact">
                        <Button 
                          variant="outline" 
                          className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20"
                          data-testid="button-download-brochure-sidebar"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Brochure
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Certification</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {course.certification}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedCourses.length > 0 && (
        <section className="py-16 md:py-20 bg-card">
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
                        <Clock className="h-3 w-3 mr-1" />
                        {relatedCourse.duration}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{relatedCourse.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {relatedCourse.shortDescription}
                    </p>
                    <Link href={`/courses/${relatedCourse.slug}`}>
                      <Button className="w-full" data-testid={`button-related-${relatedCourse.slug}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
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
