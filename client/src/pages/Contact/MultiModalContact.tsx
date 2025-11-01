import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
// Import IconType to correctly type the icon components
import { IconType } from 'react-icons'; 
import { FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa';
import SectionTitle from './SectionTitle';

// 1. Define an interface for the shape of our contact method data
interface ContactMethod {
    icon: string; // The string identifier from the DB
    title: string;
    desc: string;
    time: string;
    color: string;
    href: string;
}

// 2. Define a type for the possible icon names for type safety
type IconName = 'FaWhatsapp' | 'FaPhone' | 'FaEnvelope';

// 3. Create a mapping from the string identifier to the actual icon component
// We use a typed index signature for maximum type safety.
const iconMap: { [key in IconName]: IconType } = {
    FaWhatsapp: FaWhatsapp,
    FaPhone: FaPhone,
    FaEnvelope: FaEnvelope,
};

const MultiModalContact = () => {
    // 4. Strongly type the state hooks
    const [contactMethods, setContactMethods] = useState<ContactMethod[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const API_URL = import.meta.env.VITE_API_URL;
        fetch(`${API_URL}contact-methods.php`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data: ContactMethod[]) => { // Type the incoming data
                setContactMethods(data);
            })
            .catch(error => {
                console.error("Error fetching contact methods:", error);
                setError("Failed to load contact information. Please try again later.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []); // Empty dependency array ensures this runs only once

    if (loading) {
        return <p className="text-center text-gray-500">Loading contact options...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <section>
            <SectionTitle 
                title="How Would You Like to Connect?" 
                subtitle="Choose your preferred way to reach us." 
            />
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {contactMethods.map((method, i) => {
                    const isInternalLink = method.href.startsWith('/');
                    // Use a type assertion to tell TypeScript that method.icon is a valid IconName
                    const IconComponent = iconMap[method.icon as IconName]; 

                    // Safeguard in case the icon name from the DB doesn't exist in our map
                    if (!IconComponent) {
                        console.warn(`Icon component not found for key: ${method.icon}`);
                        return null;
                    }

                    const cardContent = (
                        <>
                            <IconComponent className={`w-10 h-10 mb-4 mx-auto ${method.color}`} />
                            <h3 className="font-bold text-lg text-gray-800">{method.title}</h3>
                            <p className="text-gray-500 text-sm mb-2">{method.desc}</p>
                            <p className="text-xs text-indigo-600 font-mono">Avg. Resp: {method.time}</p>
                        </>
                    );

                    const cardClasses =
                        "block bg-white text-center p-6 rounded-xl border border-gray-200 hover:border-indigo-500 hover:shadow-lg transition-all duration-300";

                    return isInternalLink ? (
                        <Link key={i} href={method.href} className={cardClasses}>
                            {cardContent}
                        </Link>
                    ) : (
                        <a
                            key={i}
                            href={method.href}
                            className={cardClasses}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {cardContent}
                        </a>
                    );
                })}
            </div>
        </section>
    );
};

export default MultiModalContact;