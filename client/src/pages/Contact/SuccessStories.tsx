import React from 'react';
import SectionTitle from './SectionTitle';

// MOCK DATA
const successStories = [
    { name: 'Rajesh', story: 'Reached out via chat → Got admission in 48 hours!', time: '2 days' },
    { name: 'Priya', story: 'Scheduled a call → Career switched successfully to Data Science.', time: '3 weeks' },
    { name: 'Amit', story: 'Used virtual tour → Enrolled with confidence from another city.', time: '1 week' },
];

const SuccessStories = () => (
    <div className="bg-slate-50 py-12 rounded-xl border border-gray-200">
        <SectionTitle title="How We've Helped" subtitle="Your journey starts with a simple conversation." />
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 px-6">
            {successStories.map((story, i) => (
                <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-lg text-gray-700 italic">"{story.story}"</p>
                    <div className="mt-4 flex items-center justify-between">
                        <p className="font-bold text-indigo-600">- {story.name}</p>
                        <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-gray-600">{story.time}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="mt-8 text-center text-gray-500 px-6">
            Social Proof: <span className="font-bold text-gray-800">234 students</span> contacted us this week. Avg satisfaction: <span className="text-yellow-500">★★★★☆ 4.9/5</span>
        </div>
    </div>
);

export default SuccessStories;