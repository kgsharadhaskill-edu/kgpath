import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SectionTitle from './SectionTitle';

const BookingCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState('');
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date for comparison

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const timeSlots = ['10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '05:00 PM'];

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const startingDay = firstDayOfMonth.getDay();

    const changeMonth = (offset: number) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    };

    const handleDateSelect = (day: number) => {
        const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        if (newSelectedDate >= today) {
            setSelectedDate(newSelectedDate);
        }
    }

    return (
        <section>
            <SectionTitle title="Book an Instant Consultation" subtitle="Select an available slot to connect with a career counselor. It's fast, easy, and free." />
            <div className="bg-slate-50 border border-gray-200 rounded-xl p-4 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {/* Calendar View */}
                    <div className="md:col-span-3">
                        <div className="flex justify-between items-center mb-4">
                            <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-200"><FaChevronLeft /></button>
                            <h4 className="font-bold text-gray-800 text-lg text-center">
                                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                            </h4>
                            <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-200"><FaChevronRight /></button>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-500 mb-2">
                           {daysOfWeek.map(day => <div key={day}>{day}</div>)}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                            {Array.from({ length: startingDay }).map((_, i) => <div key={`empty-${i}`}></div>)}
                            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                                const isToday = date.getTime() === today.getTime();
                                const isSelected = selectedDate && date.getTime() === selectedDate.getTime();
                                const isPast = date < today;

                                return (
                                    <button
                                        key={day}
                                        onClick={() => handleDateSelect(day)}
                                        disabled={isPast}
                                        className={`w-10 h-10 rounded-full transition-all duration-200 text-sm ${
                                            isPast ? 'text-gray-300 cursor-not-allowed' : 
                                            isSelected ? 'bg-indigo-600 text-white font-bold' :
                                            isToday ? 'bg-indigo-100 text-indigo-600 font-bold' :
                                            'text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    {/* Time Slot Selector */}
                    <div className="md:col-span-2">
                        <h4 className="font-bold text-gray-800 text-lg mb-4">Select a Time (IST)</h4>
                        {selectedDate ? (
                            <div className="grid grid-cols-2 gap-3">
                                {timeSlots.map(time => (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={`p-3 rounded-lg border-2 transition-all text-sm font-semibold ${
                                            selectedTime === time ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300 hover:border-indigo-500 text-gray-700'
                                        }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                                 <button disabled={!selectedTime} className="col-span-2 mt-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors">
                                    Confirm Booking
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg p-4">
                               <p className="text-center text-gray-500">Please select a date to see available times.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookingCalendar;