import React from 'react'; // We no longer need useRef
import { FaMapMarkerAlt, FaBuilding, FaTrafficLight, FaCar } from 'react-icons/fa';
import SectionTitle from './SectionTitle';

// --- Data Section (can be in the same file or imported) ---

export type Center = {
  name: string;
  city: string;
  lat: number;
  lng: number;
  mapsUrl: string;
};

export const centers: Center[] = [
  {
    name: "KGPath Main Campus, Saravanampatti",
    city: "Coimbatore",
    lat: 11.0517,
    lng: 76.9896,
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Sharadha+Skill+Academy+Saravanampatti",
  },
];

// --- Component Section ---

const LocationSelector = () => {
    // 1. Get the specific campus data. We'll use the first one from the array.
    const ourCampus = centers[0];

    // 2. Update the click handler to open the Google Maps URL.
    const handleNavigateClick = () => {
        if (ourCampus.mapsUrl) {
            // This opens the directions link in a new tab.
            window.open(ourCampus.mapsUrl, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <section>
            <SectionTitle title="Visit Our Campus" subtitle="We'd love to meet you. Find our nearest center and get real-time directions."/>
            <div className="bg-slate-50 border border-gray-200 rounded-xl overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/2 p-8">
                        <p className="text-sm font-semibold text-indigo-600">YOUR DETECTED LOCATION</p>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Coimbatore, Tamil Nadu</h3>
                        <div className="space-y-3 text-gray-600">
                            {/* You can make this dynamic using the `ourCampus` variable if needed */}
                            <p className="flex items-center gap-3"><FaBuilding /> <strong>Nearest Center:</strong> {ourCampus.name}</p>
                            <p className="flex items-center gap-3"><FaTrafficLight className="text-yellow-500" /> <strong>Traffic:</strong> Moderate</p>
                            <p className="flex items-center gap-3"><FaCar /> <strong>Est. Travel:</strong> 25 mins</p>
                        </div>
                        <button
                            onClick={handleNavigateClick}
                            className="mt-6 w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            <FaMapMarkerAlt /> Navigate Now
                        </button>
                    </div>
                    {/* 3. The ref is no longer needed here. */}
                    <div className="md:w-1/2 min-h-[250px] md:h-auto">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.6024004033306!2d76.90760687523883!3d10.993353955154607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85f250592aecb%3A0xeb18b8ce5a4b0711!2sSharadha%20Skill%20Academy!5e0!3m2!1sen!2sin!4v1761813966214!5m2!1sen!2sin"
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full"
                            title="Campus Location Map"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LocationSelector;