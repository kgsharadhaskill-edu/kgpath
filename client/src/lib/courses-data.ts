import digitalMarketingImg from '@assets/generated_images/AI_Digital_Marketing_course_f14a1233.png';
import fullStackImg from '@assets/generated_images/Full_Stack_Development_course_f8b6d374.png';
import dataAnalyticsImg from '@assets/generated_images/Data_Analytics_course_image_514a317c.png';
import instructorMaleImg from '@assets/generated_images/Instructor_profile_photo_d2262a53.png';
import instructorFemaleImg from '@assets/generated_images/Female_instructor_photo_21be1cc7.png';

export interface Course {
  id: string;
  title: string;
  slug: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  image: string;
  shortDescription: string;
  overview: string;
  learningOutcomes: string[];
  curriculum: {
    module: string;
    topics: string[];
  }[];
  prerequisites: string[];
  tools: string[];
  instructor: {
    name: string;
    photo: string;
    title: string;
    credentials: string;
    experience: string;
  };
  certification: string;
  feeStructure: {
    amount: string;
    emiAvailable: boolean;
    emiDetails: string;
  };
  upcomingBatches: {
    startDate: string;
    schedule: string;
    seats: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const coursesData: Course[] = [
  {
    id: '1',
    title: 'AI in Digital Marketing',
    slug: 'ai-digital-marketing',
    category: 'Marketing',
    level: 'Intermediate',
    duration: '4 Months',
    image: digitalMarketingImg,
    shortDescription: 'Master AI-powered digital marketing strategies to transform campaigns and drive measurable results.',
    overview: 'This comprehensive course combines cutting-edge AI technology with proven digital marketing strategies. Learn how to leverage machine learning, predictive analytics, and automation tools to create data-driven marketing campaigns that deliver exceptional ROI. Perfect for marketing professionals looking to stay ahead in the AI revolution.',
    learningOutcomes: [
      'Implement AI-powered marketing automation workflows',
      'Use machine learning for customer segmentation and targeting',
      'Create personalized content using AI copywriting tools',
      'Optimize ad campaigns with predictive analytics',
      'Analyze customer behavior using AI-driven insights',
      'Deploy chatbots and conversational AI for customer engagement'
    ],
    curriculum: [
      {
        module: 'Module 1: AI Fundamentals for Marketers',
        topics: ['Introduction to AI and Machine Learning', 'AI in Marketing Landscape', 'Data-Driven Marketing Strategies']
      },
      {
        module: 'Module 2: AI-Powered Content Creation',
        topics: ['AI Copywriting Tools (GPT, Claude, Jasper)', 'Image Generation with AI', 'Video Content Automation']
      },
      {
        module: 'Module 3: Marketing Automation & Personalization',
        topics: ['Customer Journey Mapping with AI', 'Predictive Analytics for Campaigns', 'Dynamic Content Personalization']
      },
      {
        module: 'Module 4: AI Analytics & Optimization',
        topics: ['Performance Tracking with AI', 'A/B Testing Automation', 'ROI Measurement and Attribution']
      },
      {
        module: 'Module 5: Chatbots & Conversational AI',
        topics: ['Building Marketing Chatbots', 'Voice Search Optimization', 'AI-Powered Customer Support']
      },
      {
        module: 'Module 6: Capstone Project',
        topics: ['Real-World Campaign Implementation', 'Portfolio Development', 'Industry Case Studies']
      }
    ],
    prerequisites: [
      'Basic understanding of digital marketing concepts',
      'Familiarity with social media platforms',
      'No prior programming experience required'
    ],
    tools: ['ChatGPT', 'Google Analytics', 'HubSpot', 'Jasper AI', 'Midjourney', 'Zapier', 'Salesforce'],
    instructor: {
      name: 'Dr. Rajesh Kumar',
      photo: instructorMaleImg,
      title: 'AI Marketing Strategist',
      credentials: 'PhD in Marketing Analytics, Google Certified',
      experience: '12+ years in digital marketing, Former Head of Marketing at Fortune 500 company, Trained 5,000+ professionals'
    },
    certification: 'Industry-recognized KGPath AI Marketing Professional Certificate with hands-on project portfolio',
    feeStructure: {
      amount: '₹75,000',
      emiAvailable: true,
      emiDetails: 'EMI starting at ₹6,250/month (12 months). No-cost EMI available.'
    },
    upcomingBatches: [
      { startDate: 'December 15, 2025', schedule: 'Weekdays 7-9 PM', seats: '12 seats left' },
      { startDate: 'January 5, 2026', schedule: 'Weekends 10 AM-1 PM', seats: 'Open' }
    ],
    faqs: [
      {
        question: 'Do I need coding skills for this course?',
        answer: 'No, this course is designed for marketing professionals without programming background. We focus on using AI tools and platforms that require no coding.'
      },
      {
        question: 'Will I get job placement support?',
        answer: 'Yes, all students receive comprehensive placement assistance including resume building, interview preparation, and connections with 200+ hiring partners.'
      },
      {
        question: 'What is the class format?',
        answer: 'Live online classes with recorded sessions, hands-on projects, weekly assignments, and 1-on-1 mentorship sessions.'
      }
    ]
  },
  {
    id: '2',
    title: 'AI in Full Stack Development',
    slug: 'ai-full-stack-development',
    category: 'Development',
    level: 'Advanced',
    duration: '6 Months',
    image: fullStackImg,
    shortDescription: 'Build intelligent, full-stack applications powered by AI and modern development frameworks.',
    overview: 'Transform into a complete AI-powered full-stack developer. This intensive program covers frontend and backend development integrated with AI capabilities. Learn to build intelligent applications using React, Node.js, Python, and cutting-edge AI APIs. Includes real-world projects and deployment strategies.',
    learningOutcomes: [
      'Build complete full-stack applications with AI integration',
      'Master React, Node.js, and Python for AI development',
      'Implement GPT-4, Claude, and other AI APIs',
      'Create intelligent chatbots and recommendation systems',
      'Deploy scalable AI applications to production',
      'Work with vector databases and embeddings'
    ],
    curriculum: [
      {
        module: 'Module 1: Full Stack Foundations',
        topics: ['HTML, CSS, JavaScript Deep Dive', 'React.js Fundamentals', 'Node.js & Express Backend']
      },
      {
        module: 'Module 2: Database & Backend Architecture',
        topics: ['MongoDB & PostgreSQL', 'RESTful APIs', 'Authentication & Security']
      },
      {
        module: 'Module 3: AI Integration Fundamentals',
        topics: ['OpenAI API Integration', 'Prompt Engineering', 'AI Model Selection']
      },
      {
        module: 'Module 4: Advanced AI Features',
        topics: ['Vector Databases (Pinecone, Weaviate)', 'RAG Systems', 'AI Agents Development']
      },
      {
        module: 'Module 5: Python for AI',
        topics: ['Python Basics for Developers', 'LangChain Framework', 'AI Model Fine-tuning']
      },
      {
        module: 'Module 6: DevOps & Deployment',
        topics: ['Docker & Kubernetes', 'AWS/Azure Deployment', 'CI/CD Pipelines']
      },
      {
        module: 'Module 7: Capstone Projects',
        topics: ['AI SaaS Application', 'Portfolio Development', 'Production Deployment']
      }
    ],
    prerequisites: [
      'Basic programming knowledge (any language)',
      'Understanding of web fundamentals',
      'Laptop with 8GB+ RAM'
    ],
    tools: ['React', 'Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'OpenAI API', 'LangChain', 'Docker', 'AWS'],
    instructor: {
      name: 'Priya Sharma',
      photo: instructorFemaleImg,
      title: 'Senior AI Engineer',
      credentials: 'MS Computer Science, AWS Certified Solutions Architect',
      experience: '10+ years at Microsoft and Google, Built AI products used by millions, Published AI researcher'
    },
    certification: 'Professional Full Stack AI Developer Certificate with GitHub portfolio and LinkedIn showcase',
    feeStructure: {
      amount: '₹1,25,000',
      emiAvailable: true,
      emiDetails: 'EMI starting at ₹10,417/month (12 months). Scholarship available for top performers.'
    },
    upcomingBatches: [
      { startDate: 'December 20, 2025', schedule: 'Weekdays 8-10 PM', seats: '8 seats left' },
      { startDate: 'January 10, 2026', schedule: 'Weekends 2-6 PM', seats: 'Open' }
    ],
    faqs: [
      {
        question: 'Is this suitable for beginners?',
        answer: 'This is an advanced course requiring basic programming knowledge. We recommend our foundation course for complete beginners.'
      },
      {
        question: 'What kind of projects will I build?',
        answer: 'You will build 5+ real-world projects including an AI chatbot, recommendation system, content generation platform, and a complete SaaS application.'
      },
      {
        question: 'Do you provide interview preparation?',
        answer: 'Yes, comprehensive interview prep including mock interviews, coding challenges, system design, and direct referrals to top companies.'
      }
    ]
  },
  {
    id: '3',
    title: 'AI in Data Analytics',
    slug: 'ai-data-analytics',
    category: 'Analytics',
    level: 'Intermediate',
    duration: '5 Months',
    image: dataAnalyticsImg,
    shortDescription: 'Unlock powerful insights from data using AI-driven analytics and visualization techniques.',
    overview: 'Become a data analytics expert with AI superpowers. Learn to collect, clean, analyze, and visualize data using modern AI tools and techniques. Master Python, SQL, Tableau, and machine learning to extract actionable insights that drive business decisions. Perfect for aspiring data analysts and business intelligence professionals.',
    learningOutcomes: [
      'Perform advanced data analysis with Python and AI',
      'Build predictive models using machine learning',
      'Create stunning data visualizations and dashboards',
      'Master SQL for complex data queries',
      'Use AI tools for automated data cleaning and analysis',
      'Present data-driven insights to stakeholders'
    ],
    curriculum: [
      {
        module: 'Module 1: Data Analytics Foundations',
        topics: ['Introduction to Data Analytics', 'Statistics Fundamentals', 'Excel for Data Analysis']
      },
      {
        module: 'Module 2: Python for Data Analytics',
        topics: ['Python Basics', 'Pandas & NumPy', 'Data Cleaning Techniques']
      },
      {
        module: 'Module 3: SQL & Database Management',
        topics: ['SQL Queries', 'Database Design', 'Advanced SQL Techniques']
      },
      {
        module: 'Module 4: Data Visualization',
        topics: ['Tableau Fundamentals', 'Power BI', 'Python Visualization (Matplotlib, Seaborn)']
      },
      {
        module: 'Module 5: AI & Machine Learning for Analytics',
        topics: ['Predictive Analytics', 'Machine Learning Models', 'AI-Powered Insights']
      },
      {
        module: 'Module 6: Business Intelligence & Reporting',
        topics: ['Dashboard Creation', 'KPI Development', 'Stakeholder Presentations']
      },
      {
        module: 'Module 7: Capstone Analytics Project',
        topics: ['Real Business Problem', 'End-to-End Analysis', 'Professional Portfolio']
      }
    ],
    prerequisites: [
      'Basic computer skills and Excel knowledge',
      'No programming experience required',
      'Analytical mindset and curiosity for data'
    ],
    tools: ['Python', 'Pandas', 'NumPy', 'SQL', 'Tableau', 'Power BI', 'Excel', 'Jupyter Notebooks'],
    instructor: {
      name: 'Dr. Rajesh Kumar',
      photo: instructorMaleImg,
      title: 'Data Science Lead',
      credentials: 'PhD in Statistics, Certified Tableau Expert',
      experience: '15+ years in analytics, Former Data Lead at Amazon, Mentored 3,000+ data professionals'
    },
    certification: 'KGPath Certified AI Data Analyst with industry-recognized project portfolio',
    feeStructure: {
      amount: '₹85,000',
      emiAvailable: true,
      emiDetails: 'EMI starting at ₹7,083/month (12 months). Early bird discount: 10% off.'
    },
    upcomingBatches: [
      { startDate: 'December 18, 2025', schedule: 'Weekdays 7-9 PM', seats: '15 seats left' },
      { startDate: 'January 8, 2026', schedule: 'Weekends 9 AM-12 PM', seats: 'Open' }
    ],
    faqs: [
      {
        question: 'Do I need a statistics background?',
        answer: 'No prior statistics knowledge required. We start from basics and build up to advanced concepts with practical examples.'
      },
      {
        question: 'What job roles can I apply for after completion?',
        answer: 'Data Analyst, Business Intelligence Analyst, Marketing Analyst, Financial Analyst, and junior Data Scientist positions.'
      },
      {
        question: 'Are the tools provided in the course?',
        answer: 'Yes, all software tools and cloud credits are provided. You will get free access to Tableau, Power BI educational licenses, and cloud platforms.'
      }
    ]
  }
];

export const getCourseBySlug = (slug: string): Course | undefined => {
  return coursesData.find(course => course.slug === slug);
};
