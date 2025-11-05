import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SectionTitle from './SectionTitle'; // Assuming you have this component

const BookingCalendar = () => {
    // State for user details
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [detailsSubmitted, setDetailsSubmitted] = useState(false);
    const [formError, setFormError] = useState('');

    // State for calendar and booking
    const [currentDate, setCurrentDate] = useState(new Date());
    // ✅ FIX: Correctly type the state to accept Date or null
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState('');
    
    // State for submission status
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const timeSlots = [
        '10:00 AM - 11:00 AM', 
        '11:00 AM - 12:00 PM', 
        '02:00 PM - 03:00 PM', 
        '04:00 PM - 05:00 PM'
    ];

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const startingDay = firstDayOfMonth.getDay();

    // ✅ FIX: Add type 'number' to the parameter
    const changeMonth = (offset: number) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
        setResponseMessage('');
    };

    const handleDateSelect = (day: number) => {
        const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        if (newSelectedDate >= today) {
            setSelectedDate(newSelectedDate);
            setSelectedTime('');
            setResponseMessage('');
        }
    };

    // ✅ FIX: Add event type for form submission
    const handleDetailsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name.trim() || !phoneNumber.trim()) {
            setFormError('Please fill in both your name and phone number.');
            return;
        }
        if (!/^\d{7,}$/.test(phoneNumber.replace(/\s/g, ''))) {
            setFormError('Please enter a valid phone number.');
            return;
        }
        setFormError('');
        setDetailsSubmitted(true);
    };

    const handleConfirmBooking = async () => {
        // ✅ FIX: Type guard ensures `selectedDate` is a Date object here
        if (!selectedDate || !selectedTime) {
            setResponseMessage('Error: Please select both a date and a time.');
            return;
        }
        setIsSubmitting(true);
        setResponseMessage('');
        const formattedDate = selectedDate.toISOString().split('T')[0];
        try {
            const API_URL = import.meta.env.VITE_API_URL;
            const response = await fetch(`${API_URL}create-booking.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    phoneNumber,
                    selectedDate: formattedDate,
                    selectedTime: selectedTime,
                }),
            });
            const responseText = await response.text();
            if (!response.ok) {
                let errorMessage = "An unknown server error occurred.";
                if (responseText) {
                    try { errorMessage = JSON.parse(responseText).message || errorMessage; } catch (e) { errorMessage = "Server returned an error with an invalid format."; }
                }
                throw new Error(errorMessage);
            }

            const result = JSON.parse(responseText);
            setResponseMessage(`Success! ${result.message}`);

            // ✅ FIX FOR SUCCESS MESSAGE:
            // Do NOT reset the form here. Resetting `detailsSubmitted` immediately
            // hides the success message. The message will now persist until the
            // user interacts with the calendar again (e.g., by picking a new date).
            
        } catch (error: unknown) { // ✅ FIX: Handle 'unknown' type for error
            if (error instanceof Error) {
                setResponseMessage(`Error: ${error.message}`);
            } else {
                setResponseMessage('An unexpected error occurred.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section>
            <SectionTitle title="Book an Instant Consultation" subtitle="Select an available slot to connect with a career counselor. It's fast, easy, and free." />
            <div className="bg-slate-50 border border-gray-200 rounded-xl p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
                
                {!detailsSubmitted ? (
                    // STEP 1: User Details Form
                    <div>
                        <h3 className="font-bold text-gray-800 text-xl mb-4 text-center">Your Details</h3>
                        <form onSubmit={handleDetailsSubmit} className="max-w-md mx-auto space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your name" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input type="tel" id="phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your phone number" />
                            </div>
                            {formError && <p className="text-red-600 text-sm text-center">{formError}</p>}
                            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors">Continue to Select Date & Time</button>
                        </form>
                    </div>
                ) : (
                    // STEP 2: Calendar and Time Selection
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        {/* Calendar View */}
                        <div className="md:col-span-3">
                            <div className="flex justify-between items-center mb-4"><button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-200"><FaChevronLeft /></button><h4 className="font-bold text-gray-800 text-lg text-center">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h4><button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-200"><FaChevronRight /></button></div><div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-500 mb-2">{daysOfWeek.map(day => <div key={day}>{day}</div>)}</div><div className="grid grid-cols-7 gap-1 place-items-center">{Array.from({ length: startingDay }).map((_, i) => <div key={`empty-${i}`} />)}{Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day); const isToday = date.getTime() === today.getTime(); const isSelected = selectedDate && date.getTime() === selectedDate.getTime(); const isPast = date < today; return (<button key={day} onClick={() => handleDateSelect(day)} disabled={isPast} className={`w-10 h-10 rounded-full transition-all duration-200 text-sm ${isPast ? 'text-gray-300 cursor-not-allowed' : isSelected ? 'bg-indigo-600 text-white font-bold' : isToday ? 'bg-indigo-100 text-indigo-600 font-bold' : 'text-gray-700 hover:bg-gray-200'}`}>{day}</button>);})}</div>
                        </div>

                        {/* Time Slot / Message Section */}
                        <div className="md:col-span-2">
                            <h4 className="font-bold text-gray-800 text-lg mb-4">Select a Time (IST)</h4>
                            {responseMessage ? (
                                <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg p-4">
                                    <p className={`text-center font-medium ${responseMessage.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>{responseMessage}</p>
                                </div>
                            ) : selectedDate ? (
                                <div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3">
                                        {timeSlots.map(time => (
                                            <button key={time} onClick={() => setSelectedTime(time)} className={`p-3 rounded-lg border-2 transition-all text-sm font-semibold ${selectedTime === time ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300 hover:border-indigo-500 text-gray-700'}`}>{time}</button>
                                        ))}
                                    </div>
                                    <button onClick={handleConfirmBooking} disabled={!selectedTime || isSubmitting} className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors">{isSubmitting ? 'Booking...' : 'Confirm Booking'}</button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg p-4">
                                   <p className="text-center text-gray-500">Please select a date to see available times.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BookingCalendar;