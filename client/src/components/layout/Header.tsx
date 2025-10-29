import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import logo from '../../../public/Frame 6.png';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  BookOpen,
  Briefcase,
  Code,
  DollarSign 
} from 'lucide-react';
import React from 'react';

const megaMenuData = [
  {
    category: 'Postgraduate Programs',
    description: 'Professional Pathways',
    subCategories: [
      {
        name: 'Data Science',
        icon: <BookOpen />,
        courses: [
          { title: 'Data Science with Specialization', details: '8 Months Course', href: '/pg/data-science-spec' },
          { title: 'Business and Data Analytics', details: 'Job Assurance', href: '/pg/business-analytics' },
        ]
      },
      {
        name: 'Technology',
        icon: <Code />,
        courses: [
          { title: 'Full Stack Development', details: '12 Months Course', href: '/pg/full-stack' },
          { title: 'Cloud Engineering', details: 'Job Assurance', href: '/pg/cloud' },
        ]
      },
    ]
  },
  {
    category: 'Certificate Programs',
    description: 'Specialized Skilling',
    subCategories: [
       {
        name: 'Finance',
        icon: <DollarSign />,
        courses: [
          { title: 'Financial Analysis', details: '6 Months Course', href: '/cert/finance' },
        ]
      },
       {
        name: 'Management',
        icon: <Briefcase />,
        courses: [
          { title: 'Project Management', details: '4 Months Course', href: '/cert/pm' },
          { title: 'Digital Marketing', details: '5 Months Course', href: '/cert/dm' },
        ]
      },
    ]
  }
];

export function Header() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProgramMenuOpen, setIsProgramMenuOpen] = useState(false);
  
  const [activeCategory, setActiveCategory] = useState(megaMenuData[0].category);
  const [activeSubCategory, setActiveSubCategory] = useState(megaMenuData[0].subCategories[0].name);

  const [openMobileSections, setOpenMobileSections] = useState<{ [key: string]: boolean }>({});

  const programMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (programMenuRef.current && !programMenuRef.current.contains(event.target as Node)) {
        setIsProgramMenuOpen(false);
      }
    }
    if (isProgramMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProgramMenuOpen]);

  useEffect(() => {
    if (isProgramMenuOpen) {
      const firstCategory = megaMenuData[0];
      setActiveCategory(firstCategory.category);
      setActiveSubCategory(firstCategory.subCategories[0].name);
    }
  }, [isProgramMenuOpen]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/courses', label: 'Courses' },
    { href: '/blog', label: 'Blog' },
    { href: '/placement', label: 'Placement' },
    { href: '/contact', label: 'Contact' }
  ];

  const isActive = (href: string) => {
    if (href === '/') return location === '/';
    return location.startsWith(href);
  };
  
  const currentCategory = megaMenuData.find(c => c.category === activeCategory) || megaMenuData[0];
  const currentSubCategory = currentCategory.subCategories.find(sc => sc.name === activeSubCategory) || currentCategory.subCategories[0];

  const toggleMobileSection = (key: string) => {
    setOpenMobileSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <header 
     className="bg-white absolute top-0 z-50 w-full transition-all duration-300"
    >
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* === UPDATED: Increased header height === */}
        <div className="flex items-center justify-between h-20 md:h-24">
          <div className="flex items-center gap-4">
            <Link href="/" data-testid="link-home-logo">
              <a className="flex items-center gap-2 hover-elevate rounded-md px-3 py-2 -ml-3">
                <img
                  src={logo}
                  alt="KGPath Logo"
                  className="h-10 w-auto object-contain"
                />
              </a>
            </Link>
            
            <div className="font-dmserif relative hidden md:block" ref={programMenuRef}>
              <Button
                size="lg"
                onClick={() => setIsProgramMenuOpen((prev) => !prev)}
                className="bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                Program
                <ChevronDown className={`ml-2 transition-transform ${isProgramMenuOpen ? 'rotate-180' : ''}`} />
              </Button>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a className={`px-4 py-2 rounded-md text-base font-medium transition-colors hover-elevate ${ isActive(link.href) ? 'text-primary' : 'text-foreground/70'}`}>
                  {link.label}
                </a>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {/* === UPDATED: Increased button size === */}
            <Link href="/free-course"><Button variant="outline" size="lg">Free course</Button></Link>
            <Link href="/contact"><Button size="lg">Enroll Now</Button></Link>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {isProgramMenuOpen && (
        <>
          <div onClick={() => setIsProgramMenuOpen(false)} className="fixed inset-0 top-20 md:top-24 z-40 bg-black/60 backdrop-blur-sm"></div>
          <div className="absolute top-full left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto p-4">
               <div className="bg-background rounded-lg shadow-2xl border overflow-hidden">
                <div className="flex">
                  <div className="w-1/3 border-r border-border">
                    {megaMenuData.map((cat) => (
                      <button key={cat.category} onMouseEnter={() => { setActiveCategory(cat.category); setActiveSubCategory(cat.subCategories[0].name); }} className={`w-full text-left p-4 hover:bg-muted ${activeCategory === cat.category ? 'bg-muted' : ''}`} >
                        <p className="font-semibold">{cat.category}</p>
                        <p className="text-sm text-foreground/60">{cat.description}</p>
                      </button>
                    ))}
                  </div>
                  <div className="w-1/3 border-r border-border">
                     {currentCategory.subCategories.map((subCat) => (
                        <button key={subCat.name} onMouseEnter={() => setActiveSubCategory(subCat.name)} className={`w-full flex items-center justify-between text-left p-4 hover:bg-muted ${activeSubCategory === subCat.name ? 'bg-muted' : ''}`} >
                          <span className="flex items-center gap-2 font-medium">
                            {React.cloneElement(subCat.icon, { className: "h-5 w-5" })}
                            {subCat.name}
                          </span>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                     ))}
                  </div>
                  <div className="w-1/3 p-2">
                     {currentSubCategory.courses.map((course) => (
                       <Link key={course.title} href={course.href}>
                         <a className="block p-3 hover:bg-muted rounded-md" onClick={() => setIsProgramMenuOpen(false)} >
                            <p className="font-semibold">{course.title}</p>
                            <p className="text-sm text-foreground/60">{course.details}</p>
                         </a>
                       </Link>
                     ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* --- 4. RESPONSIVE MOBILE ACCORDION --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="flex flex-col px-2 py-4 gap-1">
             {/* Mobile Program Accordion */}
            <div>
              <button
                onClick={() => toggleMobileSection('program')}
                className="flex justify-between items-center w-full px-3 py-3 rounded-md text-base font-medium"
              >
                <span>Program</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${openMobileSections['program'] ? 'rotate-180' : ''}`} />
              </button>
              {openMobileSections['program'] && (
                <div className="pl-4 border-l ml-3">
                  {megaMenuData.map(cat => (
                    <div key={cat.category}>
                      <button onClick={() => toggleMobileSection(cat.category)} className="flex justify-between items-center w-full py-2">
                        <span>{cat.category}</span>
                         <ChevronDown className={`h-4 w-4 transition-transform ${openMobileSections[cat.category] ? 'rotate-180' : ''}`} />
                      </button>
                      {openMobileSections[cat.category] && (
                        <div className="pl-4 border-l ml-3">
                          {cat.subCategories.map(subCat => (
                             <div key={subCat.name}>
                              <button onClick={() => toggleMobileSection(subCat.name)} className="flex justify-between items-center w-full py-2">
                                <span>{subCat.name}</span>
                                <ChevronDown className={`h-4 w-4 transition-transform ${openMobileSections[subCat.name] ? 'rotate-180' : ''}`} />
                              </button>
                              {openMobileSections[subCat.name] && (
                                <div className="pl-4 border-l ml-3">
                                  {subCat.courses.map(course => (
                                    <Link key={course.href} href={course.href}>
                                      <a onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-foreground/80">{course.title}</a>
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a onClick={() => setIsMobileMenuOpen(false)} className={`px-3 py-3 rounded-md text-base font-medium ${ isActive(link.href) ? 'bg-primary/10 text-primary' : 'text-foreground/70' }`}>
                  {link.label}
                </a>
              </Link>
            ))}
            <div className="flex items-center gap-2 mt-2 px-2">
              <Link href="/free-course" className="flex-1"><Button variant="outline" className="w-full">Free course</Button></Link>
              <Link href="/contact" className="flex-1"><Button className="w-full">Enroll Now</Button></Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}