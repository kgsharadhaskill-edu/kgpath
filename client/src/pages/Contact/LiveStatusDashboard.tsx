import React from 'react';

// MOCK DATA (Replace with API calls)
const counselors = [
    { name: 'Priya Sharma', expertise: 'Admissions', photo: 'https://i.pravatar.cc/150?img=1', status: 'Available' },
    { name: 'Rajesh Kumar', expertise: 'Career Counseling', photo: 'https://i.pravatar.cc/150?img=2', status: 'In Meeting' },
    { name: 'Anjali Singh', expertise: 'Technical Support', photo: 'https://i.pravatar.cc/150?img=3', status: 'Offline' },
    { name: 'Vikram Reddy', expertise: 'Finance', photo: 'https://i.pravatar.cc/150?img=4', status: 'Available' },
];

const LiveStatusDashboard = () => (
    <div className="bg-slate-50 p-6 rounded-xl border border-gray-200">
        <h3 className="font-bold text-2xl text-indigo-600 mb-4">Real-Time Status</h3>
        
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
             <div className="flex items-center gap-3">
                 <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </div>
                <div>
                    <p className="font-semibold text-green-800">3 Counselors Available Now</p>
                    <p className="text-sm text-gray-600">Average wait: ~2 mins</p>
                </div>
             </div>
        </div>

        <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Our Team Online</h4>
            <div className="space-y-3">
            {counselors.map(counselor => (
                <div key={counselor.name} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                        <img src={counselor.photo} alt={counselor.name} className="w-10 h-10 rounded-full" />
                        <div>
                            <p className="font-medium text-gray-800">{counselor.name}</p>
                            <p className="text-xs text-gray-500">{counselor.expertise}</p>
                        </div>
                    </div>
                     <div className={`flex items-center gap-2 text-xs font-medium px-2 py-1 rounded-full ${
                        counselor.status === 'Available' ? 'bg-green-100 text-green-800' :
                        counselor.status === 'In Meeting' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                    }`}>
                        <div className={`w-2 h-2 rounded-full ${
                            counselor.status === 'Available' ? 'bg-green-500' :
                            counselor.status === 'In Meeting' ? 'bg-yellow-500' :
                            'bg-gray-500'
                        }`}></div>
                        {counselor.status}
                    </div>
                </div>
            ))}
            </div>
        </div>
    </div>
);

export default LiveStatusDashboard;