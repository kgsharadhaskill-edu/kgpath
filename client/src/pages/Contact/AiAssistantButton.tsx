import React from 'react';
import { BsRobot } from 'react-icons/bs';

const AiAssistantButton = () => (
    <div className="fixed bottom-4 right-4 z-50">
        <button className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 animate-pulse">
            <BsRobot size={32} className="text-white" />
        </button>
    </div>
);

export default AiAssistantButton;