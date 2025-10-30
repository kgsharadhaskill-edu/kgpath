import {
  TrendingUp,
  Building2,
  Award,
  DollarSign,
  FileText,
  Users2,
  MessageSquare,
  Briefcase,
  Zap,
  Globe,
  Users,
  BarChart,
  Target,
} from 'lucide-react';

// Assuming a placeholder image is available in assets
import studentImg from '../../../../attached_assets/student-image.png';
import recruiterImg from '../../../../attached_assets/recruiter-image.png';


export const placementStats = [
  { icon: TrendingUp, label: 'Placement Success', value: '95%', color: 'text-green-600' },
  { icon: DollarSign, label: 'Average Package', value: '₹8.5 LPA', color: 'text-blue-600' },
  { icon: Award, label: 'Highest Package', value: '₹24 LPA', color: 'text-purple-600' },
  { icon: Building2, label: 'Hiring Partners', value: '200+', color: 'text-orange-600' }
];

export const placementHighlights = [
    { icon: BarChart, title: "120% Average Salary Hike", description: "Our graduates see a significant boost in their compensation." },
    { icon: Zap, title: "Placed in 12 Days", description: "Our fastest placement record after course completion." },
    { icon: Globe, title: "25+ International Placements", description: "Alumni are making their mark in global tech hubs." },
    { icon: Users, title: "80% Career Switchers", description: "Successfully transitioned from non-tech to high-growth tech roles." }
];

export const recentPlacements = [
  { name: 'Aarav Sharma', company: 'Google', role: 'AI Engineer', package: '₹22 LPA' },
  { name: 'Diya Patel', company: 'Microsoft', role: 'Data Scientist', package: '₹20 LPA' },
  { name: 'Rohan Mehta', company: 'Amazon', role: 'ML Ops Engineer', package: '₹18 LPA' },
  { name: 'Priya Singh', company: 'Accenture', role: 'AI Consultant', package: '₹15 LPA' },
  { name: 'Vikram Kumar', company: 'TCS', role: 'Full Stack AI Dev', package: '₹12 LPA' },
];

export const placementProcess = [
  { step: '01', title: 'Skill Development', description: 'Master in-demand AI skills with hands-on projects.', icon: Target },
  { step: '02', title: 'Profile Building', description: 'Create a standout resume and LinkedIn profile.', icon: FileText },
  { step: '03', title: 'Mock Interviews', description: 'Practice with industry experts to ace any interview.', icon: Users2 },
  { step: '04', title: 'Job Placement', description: 'Connect with our 200+ exclusive hiring partners.', icon: Briefcase }
];

export const successStories = [
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

export const hiringPartners = [
  'Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Adobe',
  'Salesforce', 'IBM', 'Oracle', 'Accenture', 'TCS', 'Infosys',
  'Wipro', 'HCL', 'Cognizant', 'Capgemini', 'Deloitte', 'EY',
  'KPMG', 'PwC', 'Flipkart', 'PayTM', 'Swiggy', 'Zomato'
];

export const placementSupport = [
  { icon: FileText, title: 'Resume Building', description: 'Expert guidance to create ATS-friendly resumes that get noticed.' },
  { icon: MessageSquare, title: 'Interview Preparation', description: 'Comprehensive prep for technical, coding, and behavioral rounds.' },
  { icon: Users2, title: 'Mock Interviews', description: '1-on-1 mock interviews with industry experts providing detailed feedback.' },
  { icon: Briefcase, title: 'Job Assistance', description: 'Direct referrals to 200+ partner companies and exclusive job opportunities.' }
];

export const recruiterTestimonials = [
    {
        name: 'Anjali Desai',
        title: 'Lead Recruiter, Tech Innovators',
        image: recruiterImg,
        quote: 'KGPath students consistently raise the bar. They come in with a strong foundational knowledge and a practical, problem-solving mindset that is rare to find. They are truly industry-ready from day one.'
    },
    {
        name: 'Rajesh Kumar',
        title: 'HR Manager, Data Solutions Ltd.',
        image: recruiterImg,
        quote: "We've hired multiple graduates from KGPath for data analytics roles, and their performance has been outstanding. The curriculum is clearly aligned with current industry needs, which makes our onboarding process incredibly smooth."
    }
];

export const faqData = [
    {
      id: 'faq1',
      question: "What if I don't get placed within the support period?",
      answer: "We offer extended support and career counseling to identify gaps and provide additional training. Our goal is your success, and we stand by you until you are placed."
    },
    {
      id: 'faq2',
      question: "How long does the placement support last?",
      answer: "Our dedicated placement support starts in the final term of your course and continues for up to 6 months post-completion. We also offer lifetime access to our job portal and alumni network."
    },
    {
      id: 'faq3',
      question: "Can I choose which companies to apply for?",
      answer: "Absolutely. While we provide you with opportunities from our partner network, you have complete control over which companies you want to interview with."
    },
    {
      id: 'faq4',
      question: "Is there a minimum package guarantee?",
      answer: "While we don't guarantee a specific package number as it depends on various factors like your performance, market conditions, and prior experience, our average package is ₹8.5 LPA, reflecting the high-quality opportunities available."
    }
];