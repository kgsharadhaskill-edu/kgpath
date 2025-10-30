import React from 'react';
import { FaWhatsapp, FaPhone, FaEnvelope, FaCommentDots, FaVideo, FaMicrophone } from 'react-icons/fa';
import SectionTitle from './SectionTitle';

const contactMethods = [
    { icon: FaWhatsapp, title: 'WhatsApp', desc: 'Instant Chat', time: '1-2 Mins', color: 'text-green-500' },
    { icon: FaPhone, title: 'Phone Call', desc: 'We\'ll Call You', time: '5-10 Mins', color: 'text-blue-500' },
    { icon: FaEnvelope, title: 'Email', desc: 'Detailed Inquiry', time: '2-4 Hours', color: 'text-red-500' },
    { icon: FaCommentDots, title: 'Live Chat', desc: 'Web Messaging', time: '0-2 Mins', color: 'text-purple-500' },
    { icon: FaVideo, title: 'Video Call', desc: 'Schedule a Meet', time: 'By Appt.', color: 'text-orange-500' },
    { icon: FaMicrophone, title: 'Voice Note', desc: 'Send Audio', time: '~30 Mins', color: 'text-yellow-500' },
];

const MultiModalContact = () => (
    <section>
        <SectionTitle title="How Would You Like to Connect?" subtitle="Choose your preferred way to reach us. We're available across multiple channels." />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {contactMethods.map((method, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                    <method.icon className={`w-10 h-10 mb-4 ${method.color}`} />
                    <h3 className="font-bold text-lg text-gray-800">{method.title}</h3>
                    <p className="text-gray-500 text-sm mb-2">{method.desc}</p>
                    <p className="text-xs text-indigo-600 font-mono">Avg. Resp: {method.time}</p>
                </div>
            ))}
        </div>
    </section>
);

export default MultiModalContact;