import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Brain, 
  Users, 
  Trophy, 
  Building2, 
  BookOpen, 
  UserCheck, 
  GraduationCap,
  Rocket,
  Clock,
  Star,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import heroImg from '@assets/generated_images/Education_hero_workspace_image_3704cc8a.png';
import { coursesData } from '@/lib/courses-data';
import studentImg from '@assets/generated_images/Student_testimonial_photo_ccc63061.png';

export default function Home() {
  const stats = [
    { label: 'Students Trained', value: '10,000+', icon: Users },
    { label: 'Placement Rate', value: '95%', icon: Trophy },
    { label: 'Partner Companies', value: '200+', icon: Building2 },
    { label: 'Expert Instructors', value: '50+', icon: GraduationCap }
  ];

  const features = [
    {
      icon: Users,
      title: 'Expert Instructors',
      description: 'Learn from industry veterans with 10+ years of experience at top tech companies.'
    },
    {
      icon: BookOpen,
      title: 'Industry-Relevant Curriculum',
      description: 'Stay ahead with courses updated quarterly to match current industry demands.'
    },
    {
      icon: Rocket,
      title: 'Hands-on Projects',
      description: 'Build real-world projects that showcase your skills to potential employers.'
    },
    {
      icon: UserCheck,
      title: 'Placement Support',
      description: 'Comprehensive job assistance with resume building, mock interviews, and referrals.'
    }
  ];

  const steps = [
    { number: '01', title: 'Browse', description: 'Explore our AI-focused courses' },
    { number: '02', title: 'Enroll', description: 'Choose your course and register' },
    { number: '03', title: 'Learn', description: 'Master skills with expert guidance' },
    { number: '04', title: 'Get Placed', description: 'Land your dream job' }
  ];

  const testimonials = [
    {
      name: 'Amit Patel',
      role: 'Digital Marketing Manager',
      company: 'Tech Corp',
      image: studentImg,
      quote: "KGPath's AI Marketing course transformed my career. I landed a 60% salary hike within 3 months of completion!"
    },
    {
      name: 'Sneha Reddy',
      role: 'Full Stack Developer',
      company: 'StartupXYZ',
      image: studentImg,
      quote: 'The hands-on projects and mentorship were exceptional. Now I am building AI-powered applications confidently.'
    },
    {
      name: 'Rahul Sharma',
      role: 'Data Analyst',
      company: 'Finance Inc',
      image: studentImg,
      quote: 'Best investment in my career! The placement support team helped me get multiple job offers.'
    }
  ];

  const companies = [
    'Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Adobe', 
    'Salesforce', 'IBM', 'Oracle', 'Accenture', 'TCS', 'Infosys'
  ];

  return (
    <div className="flex flex-col">
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-24">
          <div className="max-w-4xl">
            <Badge className="mb-6 bg-primary/20 text-primary-foreground border-primary/30 backdrop-blur-sm" data-testid="badge-hero">
              India's Leading AI Education Platform
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              Transform Your Career with AI Skills
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
              Master cutting-edge AI technologies with expert-led courses. Join 10,000+ students who landed their dream jobs with 95% placement rate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/courses">
                <Button size="lg" className="text-base md:text-lg px-8" data-testid="button-explore-courses">
                  Explore Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-base md:text-lg px-8 bg-background/10 backdrop-blur-sm border-white/30 text-white hover:bg-background/20"
                  data-testid="button-download-brochure"
                >
                  Download Brochure
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-6 md:gap-8 text-white">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span className="text-sm md:text-base">10,000+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span className="text-sm md:text-base">95% Placement Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span className="text-sm md:text-base">200+ Partner Companies</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About KGPath</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            KGPath is India's premier AI-focused education platform, dedicated to empowering professionals with cutting-edge technology skills. Our mission is to bridge the gap between traditional education and industry demands, helping you build a future-proof career in the age of AI.
          </p>
          <Link href="/about">
            <Button variant="link" className="mt-4 text-base" data-testid="link-learn-more-about">
              Learn More About Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Our AI Courses</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive programs designed to make you industry-ready
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {coursesData.map((course) => (
              <Card key={course.id} className="hover-elevate overflow-hidden group" data-testid={`card-course-${course.slug}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
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
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Why Choose KGPath?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need to succeed in your AI career
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="text-center hover-elevate p-6" data-testid={`card-feature-${idx}`}>
                  <CardContent className="p-0">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="text-center" data-testid={`stat-${idx}`}>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your journey to a successful AI career in 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative" data-testid={`step-${idx}`}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Student Success Stories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from our alumni who transformed their careers with KGPath
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="hover-elevate" data-testid={`testimonial-${idx}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Our Hiring Partners</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Students get placed at leading companies across industries
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {companies.map((company, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-center p-6 bg-card rounded-md hover-elevate"
                data-testid={`company-${idx}`}
              >
                <div className="text-lg font-semibold text-muted-foreground">
                  {company}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <TrendingUp className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Join thousands of successful students who are now working at top companies. Start your AI learning journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-base md:text-lg px-8"
                data-testid="button-cta-enroll"
              >
                Enroll Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base md:text-lg px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                data-testid="button-cta-counselor"
              >
                Talk to Counselor
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
