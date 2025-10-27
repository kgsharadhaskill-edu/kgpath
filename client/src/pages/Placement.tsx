import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Users, 
  Building2, 
  Award,
  FileText,
  Users2,
  MessageSquare,
  Briefcase,
  CheckCircle2,
  Star,
  DollarSign
} from 'lucide-react';
import studentImg from '@assets/generated_images/Student_testimonial_photo_ccc63061.png';

export default function Placement() {
  const placementStats = [
    { icon: TrendingUp, label: 'Placement Rate', value: '95%', color: 'text-green-600' },
    { icon: DollarSign, label: 'Average Package', value: '₹8.5 LPA', color: 'text-blue-600' },
    { icon: Award, label: 'Highest Package', value: '₹24 LPA', color: 'text-purple-600' },
    { icon: Building2, label: 'Partner Companies', value: '200+', color: 'text-orange-600' }
  ];

  const placementProcess = [
    {
      step: '01',
      title: 'Profile Building',
      description: 'Create a standout resume and LinkedIn profile highlighting your AI skills and projects.',
      icon: FileText
    },
    {
      step: '02',
      title: 'Interview Preparation',
      description: 'Master technical and behavioral interviews with our comprehensive prep sessions.',
      icon: MessageSquare
    },
    {
      step: '03',
      title: 'Mock Interviews',
      description: 'Practice with industry experts through realistic mock interview scenarios.',
      icon: Users2
    },
    {
      step: '04',
      title: 'Job Placement',
      description: 'Get matched with top companies through our exclusive hiring partner network.',
      icon: Briefcase
    }
  ];

  const successStories = [
    {
      name: 'Priya Sharma',
      image: studentImg,
      previousRole: 'Marketing Executive',
      currentRole: 'AI Marketing Manager',
      company: 'Tech Giants Inc',
      package: '₹12 LPA',
      story: 'After completing the AI in Digital Marketing course, I landed my dream job with a 150% salary increase. The hands-on projects and placement support were exceptional!'
    },
    {
      name: 'Rahul Verma',
      image: studentImg,
      previousRole: 'Junior Developer',
      currentRole: 'Full Stack AI Engineer',
      company: 'Innovation Labs',
      package: '₹18 LPA',
      story: 'KGPath transformed my career. The comprehensive curriculum and mentorship helped me become a confident AI developer. I received 3 job offers within a month of completion.'
    },
    {
      name: 'Sneha Patel',
      image: studentImg,
      previousRole: 'Data Entry Operator',
      currentRole: 'Data Analyst',
      company: 'Finance Corp',
      package: '₹10 LPA',
      story: 'Coming from a non-technical background, I was nervous. But the supportive instructors and structured learning path made it possible. Now I am analyzing data for a Fortune 500 company!'
    }
  ];

  const placementSupport = [
    {
      icon: FileText,
      title: 'Resume Building',
      description: 'Expert guidance to create ATS-friendly resumes that get noticed by recruiters.'
    },
    {
      icon: MessageSquare,
      title: 'Interview Preparation',
      description: 'Comprehensive prep covering technical questions, coding challenges, and behavioral interviews.'
    },
    {
      icon: Users2,
      title: 'Mock Interviews',
      description: '1-on-1 mock interviews with industry experts providing detailed feedback.'
    },
    {
      icon: Briefcase,
      title: 'Job Assistance',
      description: 'Direct referrals to 200+ partner companies and exclusive job opportunities.'
    }
  ];

  const hiringPartners = [
    'Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Adobe',
    'Salesforce', 'IBM', 'Oracle', 'Accenture', 'TCS', 'Infosys',
    'Wipro', 'HCL', 'Cognizant', 'Capgemini', 'Deloitte', 'EY',
    'KPMG', 'PwC', 'Flipkart', 'PayTM', 'Swiggy', 'Zomato'
  ];

  const companyPlacements = [
    { company: 'Google', count: 45, avgPackage: '₹22 LPA' },
    { company: 'Microsoft', count: 38, avgPackage: '₹20 LPA' },
    { company: 'Amazon', count: 52, avgPackage: '₹18 LPA' },
    { company: 'TCS', count: 120, avgPackage: '₹8 LPA' },
    { company: 'Infosys', count: 95, avgPackage: '₹7.5 LPA' },
    { company: 'Accenture', count: 68, avgPackage: '₹9 LPA' }
  ];

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-primary to-purple-600 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Placement Success
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Join 10,000+ alumni working at top companies worldwide with our industry-leading 95% placement rate.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {placementStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Card key={idx} className="hover-elevate text-center" data-testid={`stat-${idx}`}>
                  <CardContent className="p-6">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3 ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Our Placement Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A structured approach to ensure you land your dream job
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {placementProcess.map((process, idx) => {
              const Icon = process.icon;
              return (
                <Card key={idx} className="hover-elevate" data-testid={`process-${idx}`}>
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-2xl font-bold text-white">{process.step}</span>
                    </div>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{process.title}</h3>
                    <p className="text-sm text-muted-foreground">{process.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Success Stories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real students, real transformations, real success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {successStories.map((story, idx) => (
              <Card key={idx} className="hover-elevate" data-testid={`success-story-${idx}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src={story.image} 
                      alt={story.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{story.name}</h3>
                      <Badge variant="secondary" className="text-xs">{story.company}</Badge>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 pb-4 border-b">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Previous:</span>
                      <span className="font-medium">{story.previousRole}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Current:</span>
                      <span className="font-medium text-primary">{story.currentRole}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Package:</span>
                      <span className="font-bold text-green-600">{story.package}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground italic">
                    "{story.story}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Our Hiring Partners</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Students get placed at leading companies across industries
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {hiringPartners.map((company, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-center p-6 bg-background rounded-md hover-elevate border"
                data-testid={`partner-${idx}`}
              >
                <div className="text-base font-semibold text-muted-foreground">
                  {company}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Placement Support Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive support to ensure your career success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {placementSupport.map((service, idx) => {
              const Icon = service.icon;
              return (
                <Card key={idx} className="hover-elevate text-center p-6" data-testid={`service-${idx}`}>
                  <CardContent className="p-0">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-card">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Company-Wise Placement Records</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track record of our students at top companies
            </p>
          </div>

          <div className="space-y-4">
            {companyPlacements.map((record, idx) => (
              <Card key={idx} className="hover-elevate" data-testid={`company-record-${idx}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{record.company}</h3>
                        <p className="text-sm text-muted-foreground">Leading Technology Company</p>
                      </div>
                    </div>
                    <div className="flex gap-8 md:gap-12">
                      <div>
                        <div className="text-sm text-muted-foreground">Students Placed</div>
                        <div className="text-2xl font-bold text-primary">{record.count}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Avg Package</div>
                        <div className="text-2xl font-bold text-green-600">{record.avgPackage}</div>
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
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-primary to-purple-600 text-white border-0">
            <CardContent className="p-8 md:p-12 text-center">
              <Award className="h-16 w-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Launch Your AI Career?
              </h2>
              <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
                Join our next batch and get placed at top companies with our proven placement support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/courses" data-testid="link-cta-courses">
                  <button className="px-8 py-3 bg-white text-primary rounded-md font-semibold hover-elevate text-base md:text-lg">
                    Explore Courses
                  </button>
                </a>
                <a href="/contact" data-testid="link-cta-contact">
                  <button className="px-8 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-md font-semibold hover:bg-white/20 text-base md:text-lg">
                    Talk to Counselor
                  </button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
