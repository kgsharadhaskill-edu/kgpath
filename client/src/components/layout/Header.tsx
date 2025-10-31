// src/components/layout/Header.tsx

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import logo from '../../../../attached_assets/Frame 6.png';
import ContactForm from '../../pages/Home/ContactForm'; // Ensure this path is correct
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
import GooeyNav from './GooeyNav';
import { motion, AnimatePresence } from 'framer-motion';

// ... (megaMenuData and other constants are unchanged)
const megaMenuData = [
  {
    category: 'Postgraduate Programs',
    description: 'Professional Pathways',
    subCategories: [
      { name: 'Data Science', icon: BookOpen, courses: [{ title: 'Data Science with Specialization', details: '8 Months Course', href: '/pg/data-science-spec' }, { title: 'Business and Data Analytics', details: 'Job Assurance', href: '/pg/business-analytics' }] },
      { name: 'Technology', icon: Code, courses: [{ title: 'Full Stack Development', details: '12 Months Course', href: '/pg/full-stack' }, { title: 'Cloud Engineering', details: 'Job Assurance', href: '/pg/cloud' }] },
    ]
  },
  {
    category: 'Certificate Programs',
    description: 'Specialized Skilling',
    subCategories: [
      { name: 'Finance', icon: DollarSign, courses: [{ title: 'Financial Analysis', details: '6 Months Course', href: '/cert/finance' }] },
      { name: 'Management', icon: Briefcase, courses: [{ title: 'Project Management', details: '4 Months Course', href: '/cert/pm' }, { title: 'Digital Marketing', details: '5 Months Course', href: '/cert/dm' }] },
    ]
  }
];


export function Header() {
  // ... (all your state and useEffect hooks are unchanged and correct)
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProgramMenuOpen, setIsProgramMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(megaMenuData[0].category);
  const [activeSubCategory, setActiveSubCategory] = useState(megaMenuData[0].subCategories[0].name);
  const [openMobileSections, setOpenMobileSections] = useState<{ [key: string]: boolean }>({});
  const programMenuRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (programMenuRef.current && !programMenuRef.current.contains(event.target as Node)) {
        setIsProgramMenuOpen(false);
      }
    }
    if (isProgramMenuOpen) { document.addEventListener('mousedown', handleClickOutside); }
    return () => { document.removeEventListener('mousedown', handleClickOutside); };
  }, [isProgramMenuOpen]);

  useEffect(() => {
    if (isProgramMenuOpen) {
      const firstCategory = megaMenuData[0];
      setActiveCategory(firstCategory.category);
      setActiveSubCategory(firstCategory.subCategories[0].name);
    }
  }, [isProgramMenuOpen]);

  useEffect(() => {
    const bodyStyle = document.body.style;
    bodyStyle.overflow = isModalOpen || isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { bodyStyle.overflow = 'unset'; };
  }, [isModalOpen, isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { href: '/', label: 'Home' }, { href: '/about', label: 'About' }, { href: '/courses', label: 'Courses' },
    { href: '/blog', label: 'Blog' }, { href: '/placement', label: 'Placement' }, { href: '/contact', label: 'Contact' }
  ];

  const isActive = (href: string) => (href === '/' ? location === '/' : location.startsWith(href));

  const currentCategory = megaMenuData.find(c => c.category === activeCategory) || megaMenuData[0];
  const currentSubCategory = currentCategory.subCategories.find(sc => sc.name === activeSubCategory) || currentCategory.subCategories[0];

  const toggleMobileSection = (key: string) => setOpenMobileSections(prev => ({ ...prev, [key]: !prev[key] }));


  return (
    <React.Fragment>
      <header className="sticky top-0 z-50 w-full transition-all duration-300 bg-background/80 backdrop-blur-sm border-b">
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">

            <div className="hidden lg:flex items-center gap-6">
              {/* FIX 1: Removed the inner <a> tag here */}
              <Link href="/" data-testid="link-home-logo" className="flex items-center">
                <img src={logo} alt="KGPath Logo" className="h-12 w-auto object-contain" />
              </Link>
              <div className="relative" ref={programMenuRef}>
                <Button size="lg" onClick={() => setIsProgramMenuOpen(prev => !prev)}>
                  Program <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isProgramMenuOpen ? 'rotate-180' : ''}`} />
                </Button>
              </div>
              <GooeyNav items={navItems} />
            </div>

            <div className="lg:hidden">
              {/* FIX 2: Removed the inner <a> tag here */}
              <Link href="/" data-testid="link-home-logo-mobile" className="flex items-center">
                <img src={logo} alt="KGPath Logo" className="h-12 w-auto object-contain" />
              </Link>
            </div>

            <div className="hidden lg:flex items-center">
              <Button size="lg" onClick={openModal}>Enroll Now</Button>
            </div>

            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2">
              <Menu className="h-6 w-6" /><span className="sr-only">Toggle Menu</span>
            </button>
          </div>
        </div>

        {isProgramMenuOpen && (
          <>
            <div onClick={() => setIsProgramMenuOpen(false)} className="fixed inset-0 top-20 lg:top-24 z-40 bg-black/60 backdrop-blur-sm"></div>
            <div className="absolute top-full left-0 right-0 z-50">
              <div className="max-w-7xl mx-auto p-4">
                <div className="bg-background rounded-lg shadow-2xl border overflow-hidden">
                  <div className="flex">
                    <div className="w-1/3 border-r">{megaMenuData.map((cat) => (<button key={cat.category} onMouseEnter={() => { setActiveCategory(cat.category); setActiveSubCategory(cat.subCategories[0].name); }} className={`w-full text-left p-4 hover:bg-muted transition-colors ${activeCategory === cat.category ? 'bg-muted' : ''}`} ><p className="font-semibold">{cat.category}</p><p className="text-sm text-foreground/60">{cat.description}</p></button>))}</div>
                    <div className="w-1/3 border-r">{currentCategory.subCategories.map((subCat) => { const Icon = subCat.icon; return (<button key={subCat.name} onMouseEnter={() => setActiveSubCategory(subCat.name)} className={`w-full flex items-center justify-between text-left p-4 hover:bg-muted transition-colors ${activeSubCategory === subCat.name ? 'bg-muted' : ''}`} ><span className="flex items-center gap-3 font-medium"><Icon className="h-5 w-5 text-primary" />{subCat.name}</span><ChevronRight className="h-4 w-4" /></button>); })}</div>
                    <div className="w-1/3 p-2">{currentSubCategory.courses.map((course) => (
                      // FIX 3: Removed the inner <a> tag here
                      <Link key={course.title} href={course.href} className="block p-3 hover:bg-muted rounded-md transition-colors" onClick={() => setIsProgramMenuOpen(false)}>
                        <p className="font-semibold">{course.title}</p>
                        <p className="text-sm text-foreground/60">{course.details}</p>
                      </Link>
                    ))}</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed inset-0 z-[100] bg-background lg:hidden">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between h-20 border-b px-4">
                <Link href="/"><img src={logo} alt="KGPath Logo" className="h-10 w-auto object-contain" /></Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2"><X className="h-6 w-6" /></button>
              </div>
              <nav className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col gap-1">
                  {navItems.map((link) => (
                    // FIX 4: Removed the inner <a> tag here
                    <Link key={link.href} href={link.href} className={`block px-4 py-3 rounded-md text-base font-medium transition-colors ${isActive(link.href) ? 'bg-primary/10 text-primary' : 'text-foreground/80 hover:bg-muted'}`}>
                      {link.label}
                    </Link>
                  ))}
                  <div className="my-2 border-t"></div>
                  <div>
                    <button onClick={() => toggleMobileSection('program')} className="flex justify-between items-center w-full px-4 py-3 rounded-md text-base font-medium hover:bg-muted">
                      <span>Program</span><ChevronDown className={`h-5 w-5 transition-transform ${openMobileSections['program'] ? 'rotate-180' : ''}`} />
                    </button>
                    {openMobileSections['program'] && (<div className="pl-4 border-l ml-5 my-1">{megaMenuData.map(cat => (<div key={cat.category}><button onClick={() => toggleMobileSection(cat.category)}
                     className="flex justify-between items-center w-full py-2 pl-2 text-foreground/80 hover:text-foreground"><span className="font-medium">{cat.category}</span><ChevronDown className={`h-4 w-4 transition-transform 
                     ${openMobileSections[cat.category] ? 'rotate-180' : ''}`} />
                     </button>{openMobileSections[cat.category] && (<div className="pl-4 border-l ml-3 my-1">{cat.subCategories.map(subCat => (<div key={subCat.name}><button onClick={() => toggleMobileSection(subCat.name)} 
                     className="flex justify-between items-center w-full py-2 pl-2 text-foreground/80 hover:text-foreground">
                      <span>{subCat.name}</span><ChevronDown className={`h-4 w-4 transition-transform ${openMobileSections[subCat.name] ? 'rotate-180' : ''}`} /></button>{openMobileSections[subCat.name] && (<div className="pl-4 border-l ml-3 my-1">
                        {subCat.courses.map(course => (
                          // FIX 5: Removed the inner <a> tag here
                          <Link key={course.href} href={course.href} className="block py-2 pl-2 text-foreground/70 hover:text-primary">
                            {course.title}
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
                </div>
              </nav>
              <div className="mt-auto p-4 border-t">
                <Button className="w-full" size="lg" onClick={openModal}>Enroll Now</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isModalOpen && (<div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={closeModal}><div className="max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}><div className="relative"><ContactForm onClose={closeModal} /><button onClick={closeModal} className="absolute top-2 right-2 md:top-2 md:right-2 p-2 rounded-full bg-gray-200/50 hover:bg-gray-300/80" aria-label="Close form"><X className="h-5 w-5 text-gray-800" /></button></div></div></div>)}
    </React.Fragment>
  );
}