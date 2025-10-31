
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
  Cpu,
  LifeBuoy,
  BrainCircuit,
  Lightbulb,
  Sparkles,
  Rocket,
} from 'lucide-react';
import { getCourseBySlug, coursesData, kgpathAdvantages, hiringPartners } from '@/lib/courses-data';
import { CourseHeroForm } from './CourseHero';

// Map string identifiers to actual icon components
const iconComponents: { [key: string]: React.ReactNode } = {
  Cpu: <Cpu />,
  LifeBuoy: <LifeBuoy />,
  BrainCircuit: <BrainCircuit />,
  Lightbulb: <Lightbulb />,
  Sparkles: <Sparkles />,
  Rocket: <Rocket />,
};

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
    <div className="flex flex-col bg-background">
      <CourseHeroForm 
        title={course.title}
        shortDescription={course.shortDescription}
        level={course.level}
        duration={course.duration}
        skills={course.skills}
        keyHighlights={course.keyHighlights}
        specializations={course.specializations}
        formImage={course.formImage}
        heroImage={course.image}
      />
      
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
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Key Learning Outcomes</h2>
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
              
              <div className="bg-card/50 border border-border/50 rounded-xl shadow-sm p-6 md:p-8 relative overflow-hidden flex items-center justify-center">
                <img
                  src="/certificate.jpg"
                  alt="Certificate"
                  className="w-[90%] md:w-[70%] lg:w-[50%] h-auto rounded-lg shadow-md object-contain"
                />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-center mb-2">The <span className="text-primary">KGPATH</span> advantage</h2>
                <p className="text-muted-foreground text-center mb-8">Invest in yourself – learn, grow, and excel</p>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {kgpathAdvantages.map((advantage, index) => (
                    <div key={index} className="bg-card/50 p-6 rounded-lg border border-border/50 text-center">
                      <div className="flex justify-center mb-3 h-8 w-8 text-primary">{iconComponents[advantage.icon]}</div>
                      <h3 className="font-semibold mb-2 text-lg">{advantage.title}</h3>
                      <p className="text-sm text-muted-foreground">{advantage.description}</p>
                    </div>
                  ))}
                </div>
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
                    <Badge key={idx} variant="secondary" className="text-sm px-4 py-2">{tool}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {course.faqs.map((faq, idx) => (
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
                  <CardContent className="p-6 space-y-3">
                    <h3 className="text-xl font-bold mb-2">Course Information</h3>
                    <div className="flex items-center gap-3 py-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-sm text-muted-foreground">Duration</div>
                        <div className="font-semibold">{course.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 py-2">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-sm text-muted-foreground">Level</div>
                        <div className="font-semibold">{course.level}</div>
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
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Upcoming Batches</h3>
                    <div className="space-y-5">
                      {course.upcomingBatches.map((batch, idx) => (
                        <div key={idx} className="pb-4 border-b last:border-0" data-testid={`batch-${idx}`}>
                          <div className="flex items-start gap-4">
                            <Calendar className="h-5 w-5 text-primary mt-1" />
                            <div>
                              <div className="font-semibold">{batch.startDate}</div>
                              <div className="text-sm text-muted-foreground">{batch.schedule}</div>
                              <Badge 
                                variant={batch.seats.toLowerCase().includes('left') ? 'default' : 'secondary'} 
                                className="mt-2 text-xs"
                              >
                                {batch.seats}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Our Graduates Work At Leading Companies</h2>
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
            <div className="flex animate-marquee whitespace-nowrap">
              {hiringPartners.concat(hiringPartners).map((partner, index) => (
                <div key={index} className="mx-8 text-xl font-semibold text-muted-foreground flex-shrink-0">
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {relatedCourses.length > 0 && (
          <section className="py-12 md:py-16 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
              <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">Related Courses</h2>
              <div
                className="
                  grid gap-6 md:gap-8 justify-center
                  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                "
              >
                {relatedCourses.map((relatedCourse) => (
                  <Card
                    key={relatedCourse.id}
                    className="hover-elevate overflow-hidden group rounded-lg max-w-sm mx-auto"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={relatedCourse.image}
                        alt={relatedCourse.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4 md:p-5 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-[10px]">{relatedCourse.level}</Badge>
                        <Badge variant="outline" className="text-[10px]">
                          <Clock className="h-3 w-3 mr-1" />{relatedCourse.duration}
                        </Badge>
                      </div>
                      <h3 className="text-base md:text-lg font-semibold mb-1">{relatedCourse.title}</h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {relatedCourse.shortDescription}
                      </p>
                      <Link href={`/courses/${relatedCourse.slug}`}>
                        <Button size="sm" className="w-full">
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