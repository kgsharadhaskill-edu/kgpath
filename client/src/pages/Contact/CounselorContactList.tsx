import React from 'react';
import { FaPhone } from 'react-icons/fa';

// 1. Define the type (or interface) for a single counselor object
// This tells TypeScript exactly what properties a counselor object has.
type Counselor = {
    id: number;
    name: string;
    expertise: string;
    photo: string;
    phone: string;
};

// 2. Apply the type to the array, making it an array of Counselor objects
const counselors: Counselor[] = [
    { id: 101, name: 'Priya Sharma', expertise: 'Admissions', photo: 'https://i.pravatar.cc/150?img=1', phone: '+919876543210' },
    { id: 102, name: 'Rajesh Kumar', expertise: 'Career Counseling', photo: 'https://i.pravatar.cc/150?img=2', phone: '+919876543211' },
    { id: 103, name: 'Anjali Singh', expertise: 'Technical Support', photo: 'https://i.pravatar.cc/150?img=3', phone: '+919876543212' },
    { id: 104, name: 'Vikram Reddy', expertise: 'Finance', photo: 'https://i.pravatar.cc/150?img=4', phone: '+919876543213' },
];

const CounselorContactList = () => {
    // 3. Apply the type to the function parameter (This directly fixes the error)
    // Now, TypeScript knows that `counselor` will have `id`, `name`, and `phone` properties.
    const handleCallClick = async (counselor: Counselor) => {
        const apiEndpoint = '/api/track-call.php';

        const trackingData = {
            counselorId: counselor.id,
            counselorName: counselor.name,
        };

        try {
            await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(trackingData),
            });
            console.log(`Tracking data sent for ${counselor.name}`);
        } catch (error) {
            console.error('Failed to track the call click:', error);
        }

        window.location.href = `tel:${counselor.phone}`;
    };

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-gray-200">
            <h3 className="font-bold text-2xl text-indigo-600 mb-2">Connect with Our Team</h3>
            <p className="text-gray-600 mb-6">
                Here is a list of our counselors. Feel free to reach out to them directly.
            </p>

            <div className="space-y-3">
                {counselors.map(counselor => (
                    <div key={counselor.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-4">
                            <img src={counselor.photo} alt={counselor.name} className="w-12 h-12 rounded-full" />
                            <div>
                                <p className="font-semibold text-gray-900">{counselor.name}</p>
                                <p className="text-sm text-gray-500">{counselor.expertise}</p>
                            </div>
                        </div>
                        
                        <button 
                            onClick={() => handleCallClick(counselor)}
                            className="flex items-center gap-2 bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full hover:bg-blue-200 transition-colors"
                            aria-label={`Call ${counselor.name}`}
                        >
                            <FaPhone className="w-3 h-3 rotate-90"/>
                            <span>Call</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CounselorContactList;