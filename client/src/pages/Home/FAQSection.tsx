// src/components/CourseFAQSection.tsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- TYPE DEFINITIONS ---
interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

// --- FAQ DATA ---
// This can be easily replaced with data from a CMS or API.
const faqData: FAQItem[] = [
  {
    id: 1,
    question: "How do I enroll in a course?",
    answer: "You can enroll directly from the course page. Click on the 'Enroll Now' button and follow the on-screen instructions to complete your payment and registration. You'll get immediate access once you're done!",
  },
  {
    id: 2,
    question: "Are there any prerequisites for the courses?",
    answer: "Most of our beginner-level courses have no prerequisites. For advanced courses, the required prior knowledge is listed on the course description page. We recommend checking these before enrolling.",
  },
  {
    id: 3,
    question: "Do I get a certificate upon completion?",
    answer: "Yes! All students who successfully complete a course will receive a verifiable digital certificate from our academy. You can add it to your LinkedIn profile or resume.",
  },
  {
    id: 4,
    question: "What is the refund policy?",
    answer: "We offer a 14-day money-back guarantee. If you are not satisfied with the course for any reason, you can request a full refund within the first 14 days of your purchase.",
  },
  {
    id: 5,
    question: "Can I access the course materials after I finish?",
    answer: "Absolutely! You get lifetime access to all course materials, including videos, articles, and downloadable resources. You can revisit the content anytime you need a refresher.",
  },
];

// --- Chevron Icon Component ---
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="h-6 w-6 text-slate-500"
    animate={{ rotate: isOpen ? 180 : 0 }}
    transition={{ duration: 0.3 }}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </motion.svg>
);


// --- INDIVIDUAL FAQ ITEM COMPONENT ---
interface FAQItemProps {
  faq: FAQItem;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItemComponent: React.FC<FAQItemProps> = ({ faq, isOpen, onClick }) => {
  return (
    <div className="border-b border-slate-200">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
      >
        <span className="text-lg font-medium text-slate-800">{faq.question}</span>
        <ChevronIcon isOpen={isOpen} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${faq.id}`}
            role="region"
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-base text-slate-600">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


// --- MAIN FAQ SECTION COMPONENT ---
const CourseFAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Have questions? We're here to help. Everything you need to know about our courses and academy.
          </p>
        </div>
        <div className="mt-12">
          {faqData.map((faq) => (
            <FAQItemComponent
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onClick={() => handleToggle(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseFAQSection;