import React from 'react';
import { Link } from 'wouter';
import { IconType } from 'react-icons';
import { FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa';
import SectionTitle from './SectionTitle';

// Static contact methods (no backend)
const contactMethods = [
  {
    icon: "FaWhatsapp",
    title: "WhatsApp",
    desc: "Instant Chat",
    time: "1–2 Mins",
    color: "text-green-500",
    href: "https://wa.me/7397788918"
  },
  {
    icon: "FaPhone",
    title: "Phone Call",
    desc: "We'll Call You",
    time: "5–10 Mins",
    color: "text-blue-500 rotate-90",
    href: "tel:+917397788918"
  },
  {
    icon: "FaEnvelope",
    title: "Email",
    desc: "Detailed Inquiry",
    time: "2–4 Hours",
    color: "text-red-500",
    href: "mailto:info@kgpath.com"
  }
];

// Mapping icons
const iconMap: Record<string, IconType> = {
  FaWhatsapp: FaWhatsapp,
  FaPhone: FaPhone,
  FaEnvelope: FaEnvelope,
};

const MultiModalContact = () => {
  return (
    <section>
      <SectionTitle
        title="How Would You Like to Connect?"
        subtitle="Choose your preferred way to reach us."
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {contactMethods.map((method, i) => {
          const IconComponent = iconMap[method.icon];
          const isInternalLink = method.href.startsWith('/');

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
