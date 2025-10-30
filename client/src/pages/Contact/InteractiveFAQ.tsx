import React, { useState } from 'react';
import { FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import SectionTitle from './SectionTitle';

// MOCK DATA
const faqItems = [
    { q: 'What are the course fees?', a: 'Course fees vary by program. You can find detailed information on each course page or by contacting our admissions team.' },
    { q: 'Do you offer EMI options?', a: 'Yes, we have flexible EMI options with our partner financial institutions. Our finance team can guide you through the process.' },
    { q: 'Is there a placement guarantee?', a: 'We offer 100% placement assistance with a dedicated placement cell. Our strong industry connections have resulted in a high placement rate, but we do not guarantee a job.' },
];

const InteractiveFAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    }
    return (
        <section>
            <SectionTitle title="Have Questions?" subtitle="Find quick answers to common queries. If you don't find what you're looking for, we're a click away." />
            <div className="max-w-3xl mx-auto">
                <div className="relative mb-8">
                    <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Type your question..."
                        className="w-full bg-white border border-gray-300 rounded-full py-3 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                </div>
                <div className="space-y-4">
                    {faqItems.map((item, i) => (
                        <div key={i} className="bg-slate-50 border border-gray-200 rounded-lg">
                            <button onClick={() => toggleFaq(i)} className="w-full flex justify-between items-center p-5 text-left">
                                <span className="font-semibold text-gray-800">{item.q}</span>
                                {openIndex === i ? <FaChevronUp className="text-indigo-600" /> : <FaChevronDown className="text-gray-500" />}
                            </button>
                            {openIndex === i && (
                                <div className="px-5 pb-5 text-gray-600">
                                    {item.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InteractiveFAQ;