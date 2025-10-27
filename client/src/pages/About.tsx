import { Card, CardContent } from '@/components/ui/card';
import { 
  Target, 
  Eye, 
  Heart, 
  Award, 
  Users, 
  Building,
  TrendingUp,
  Lightbulb
} from 'lucide-react';
import aboutHeroImg from '@assets/generated_images/About_Us_team_image_8ef250ed.png';
import instructorMaleImg from '@assets/generated_images/Instructor_profile_photo_d2262a53.png';
import instructorFemaleImg from '@assets/generated_images/Female_instructor_photo_21be1cc7.png';

export default function About() {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation First',
      description: 'We constantly update our curriculum to reflect the latest AI advancements and industry trends.'
    },
    {
      icon: Heart,
      title: 'Student Success',
      description: 'Every decision we make prioritizes student learning outcomes and career growth.'
    },
    {
      icon: Users,
      title: 'Expert Faculty',
      description: 'Learn from industry practitioners who bring real-world experience to the classroom.'
    },
    {
      icon: TrendingUp,
      title: 'Results Driven',
      description: 'Our 95% placement rate speaks to our commitment to getting you hired.'
    }
  ];

  const team = [
    {
      name: 'Dr. Rajesh Kumar',
      title: 'Founder & CEO',
      image: instructorMaleImg,
      credentials: 'PhD in AI, Former Google Senior Engineer'
    },
    {
      name: 'Priya Sharma',
      title: 'Head of Curriculum',
      image: instructorFemaleImg,
      credentials: 'MS CS, Ex-Microsoft Lead Developer'
    },
    {
      name: 'Dr. Rajesh Kumar',
      title: 'Lead Instructor - Marketing',
      image: instructorMaleImg,
      credentials: 'PhD Marketing Analytics, 12+ years'
    },
    {
      name: 'Priya Sharma',
      title: 'Lead Instructor - Development',
      image: instructorFemaleImg,
      credentials: 'Senior AI Engineer, 10+ years'
    },
    {
      name: 'Dr. Rajesh Kumar',
      title: 'Lead Instructor - Analytics',
      image: instructorMaleImg,
      credentials: 'PhD Statistics, Former Amazon Lead'
    },
    {
      name: 'Priya Sharma',
      title: 'Placement Director',
      image: instructorFemaleImg,
      credentials: 'MBA, 15+ years in Tech Recruitment'
    }
  ];

  const milestones = [
    { year: '2020', title: 'Founded', description: 'KGPath established with a vision to democratize AI education' },
    { year: '2021', title: '1,000 Students', description: 'Reached first milestone of training 1,000 professionals' },
    { year: '2022', title: '50+ Partners', description: 'Partnered with leading companies for placements' },
    { year: '2023', title: '5,000 Alumni', description: 'Community grew to 5,000+ successful career transitions' },
    { year: '2024', title: 'Industry Leader', description: 'Recognized as India\'s top AI education platform' },
    { year: '2025', title: '10,000+ Impact', description: 'Transformed 10,000+ careers with 95% placement rate' }
  ];

  const achievements = [
    { icon: Award, label: 'Best EdTech Platform 2024' },
    { icon: Users, label: '10,000+ Students Trained' },
    { icon: Building, label: '200+ Hiring Partners' },
    { icon: TrendingUp, label: '95% Placement Rate' }
  ];

  return (
    <div className="flex flex-col">
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${aboutHeroImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            About KGPath
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Empowering the next generation of AI professionals with cutting-edge education and industry-leading placement support.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-6">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To bridge the gap between traditional education and the rapidly evolving AI industry by providing world-class, practical training that transforms careers and creates opportunities for professionals worldwide.
              </p>
            </div>

            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-600/10 mb-6">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To become the global leader in AI education, recognized for producing industry-ready professionals who drive innovation and shape the future of technology across all sectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-card">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="text-lg leading-relaxed mb-4">
              KGPath was founded in 2020 by a team of AI enthusiasts and education professionals who recognized a critical gap in the market: while AI was transforming industries, quality education in this field remained inaccessible to most professionals.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              What started as a small cohort of 20 students has grown into India's premier AI education platform, having trained over 10,000 professionals and maintaining an industry-leading 95% placement rate. Our success is built on three pillars: cutting-edge curriculum developed by industry experts, hands-on project-based learning, and comprehensive placement support.
            </p>
            <p className="text-lg leading-relaxed">
              Today, KGPath alumni work at leading companies worldwide, from Fortune 500 corporations to innovative startups, driving AI innovation and building the future of technology. Our community continues to grow, united by a shared passion for learning and a commitment to excellence.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <Card key={idx} className="text-center hover-elevate p-6" data-testid={`value-${idx}`}>
                  <CardContent className="p-0">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert instructors and industry veterans dedicated to your success
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {team.map((member, idx) => (
              <Card key={idx} className="overflow-hidden hover-elevate group" data-testid={`team-member-${idx}`}>
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-2">{member.title}</p>
                  <p className="text-xs text-muted-foreground">{member.credentials}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Key milestones in our mission to democratize AI education
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-ml-px" />
            
            <div className="space-y-12">
              {milestones.map((milestone, idx) => (
                <div 
                  key={idx} 
                  className={`relative flex items-center gap-6 md:gap-12 ${
                    idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  data-testid={`milestone-${idx}`}
                >
                  <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-12 md:pl-0`}>
                    <Card className="hover-elevate p-6">
                      <CardContent className="p-0">
                        <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 -ml-4 md:-ml-4 bg-primary rounded-full border-4 border-background flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Our Achievements</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Recognition and impact that drives us forward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {achievements.map((achievement, idx) => {
              const Icon = achievement.icon;
              return (
                <div key={idx} className="text-center" data-testid={`achievement-${idx}`}>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <p className="font-semibold text-lg">{achievement.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">World-Class Learning Facilities</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Our state-of-the-art infrastructure includes modern classrooms with interactive displays, dedicated AI labs with high-performance computing resources, collaborative project spaces, and a comprehensive digital library. We provide both online and offline learning environments designed to maximize your learning experience.
            </p>
            <p className="text-base text-muted-foreground max-w-3xl mx-auto">
              Every aspect of our facilities is optimized for hands-on, practical learning in AI and technology, ensuring you have access to the tools and resources needed to excel in your journey.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
