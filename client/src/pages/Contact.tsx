import React from 'react';
import MultiModalContact from '../pages/Contact/MultiModalContact';
import BookingCalendar from '../pages/Contact/BookingCalendar';
import LocationSelector from '../pages/Contact/LocationSelector';
import SuccessStories from '../pages/Contact/SuccessStories';
import InteractiveFAQ from '../pages/Contact/InteractiveFAQ';
import CounselorContactList from '../pages/Contact/CounselorContactList';

const ContactPage = () => {
    return (
        <div className="bg-white text-gray-800 min-h-screen">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <header className="text-center mb-20">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-gray-900">
                        Get In Touch
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                        We're here to help you navigate your educational journey. Connect with us instantly through your favorite channel.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-24">
                        <MultiModalContact />
                        <BookingCalendar />
                        <LocationSelector />
                        <InteractiveFAQ />
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1 space-y-12">
                        <CounselorContactList />    
                        <SuccessStories />
                    </aside>
                </div>
                
                {/* Floating Action Buttons */}
            </main>
        </div>
    );
}

export default ContactPage;