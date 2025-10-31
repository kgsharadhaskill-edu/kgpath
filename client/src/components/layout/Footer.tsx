import { Link } from 'wouter';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export function Footer() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest('POST', '/api/newsletter', { email });
    },
    onSuccess: () => {
      toast({
        title: 'Subscribed!',
        description: 'You have successfully subscribed to our newsletter.',
      });
      setEmail('');
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to subscribe. Please try again.',
        variant: 'destructive',
      });
    }
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      newsletterMutation.mutate(email);
    }
  };

  const footerLinks = {
    courses: [
      { label: 'AI in Digital Marketing', href: '/courses/ai-digital-marketing' },
      { label: 'AI in Full Stack Development', href: '/courses/ai-full-stack-development' },
      { label: 'AI in Data Analytics', href: '/courses/ai-data-analytics' }
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Placement', href: '/placement' },
      { label: 'Contact', href: '/contact' }
    ],
    support: [
      { label: 'Help Center', href: '/contact' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-card border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                KGPath
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Transform your career with cutting-edge AI education. Learn from industry experts and get placed at top companies.
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="p-2 hover-elevate rounded-md text-muted-foreground"
                    aria-label={social.label}
                    data-testid={`link-social-${social.label.toLowerCase()}`}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-4">Our Courses</h3>
            <ul className="space-y-3">
              {footerLinks.courses.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>+91 7397788915/917/918</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>info@kgpath.com</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Coimbatore, Tamilnadu, India</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest updates on courses and career opportunities.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="input-newsletter-email"
              />
              <Button 
                type="submit" 
                className="w-full"
                disabled={newsletterMutation.isPending}
                data-testid="button-subscribe-newsletter"
              >
                {newsletterMutation.isPending ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} KGPath. All rights reserved. Empowering careers through AI education.</p>
        </div>
      </div>
    </footer>
  );
}
