import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const EmergencyButton = () => (
    <div className="fixed bottom-4 left-4 z-40">
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-5 rounded-full shadow-lg flex items-center gap-2 transition-transform hover:scale-105">
            <FaExclamationCircle /> Urgent Help
        </button>
    </div>
);

export default EmergencyButton;