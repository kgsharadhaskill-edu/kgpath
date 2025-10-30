import React from 'react';

const SectionTitle: React.FC<{ title: string; subtitle:string }> = ({ title, subtitle }) => (
    <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-600 tracking-tight">{title}</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
    </div>
);

export default SectionTitle;