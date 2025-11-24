
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Section, ScrollReveal, Button } from './Shared';

const Booking: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [view, setView] = useState<'calendar' | 'time'>('calendar');
  const [booked, setBooked] = useState(false);

  const availableTimeSlots = [
    "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM"
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { days, firstDay };
  };

  const { days, firstDay } = getDaysInMonth(currentDate);
  const daysArray = Array.from({ length: days }, (_, i) => i + 1);
  const blanksArray = Array.from({ length: firstDay }, (_, i) => i);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
    setView('time');
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleBooking = () => {
    setTimeout(() => setBooked(true), 800);
  };

  const resetBooking = () => {
    setBooked(false);
    setSelectedDate(null);
    setSelectedTime(null);
    setView('calendar');
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <Section className="bg-alt/20 border-t border-ink/5" overflow={true}>
       <div id="booking" className="mb-12 text-center">
          <ScrollReveal>
            <h2 className="font-serif text-4xl md:text-5xl text-ink mb-4">Select Date & Time</h2>
            <p className="text-ink-muted">Secure your spot for a Fit Check.</p>
          </ScrollReveal>
       </div>

       <ScrollReveal delay={100}>
         <div className="max-w-5xl mx-auto bg-base shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border border-ink/10 rounded-sm overflow-hidden flex flex-col md:flex-row min-h-[480px] transition-shadow duration-500">
            <div className="w-full md:w-5/12 p-8 md:p-10 border-r border-ink/10 bg-base relative flex flex-col justify-between z-10">
               <div>
                  <div className="w-12 h-12 bg-ink text-base flex items-center justify-center rounded-sm mb-8 shadow-md">
                     <CalendarIcon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex items-baseline justify-between border-b border-ink/10 pb-4 mb-6">
                     <div>
                       <span className="text-[10px] font-bold text-ink-muted tracking-[0.2em] uppercase block mb-1">Duration</span>
                       <span className="font-serif text-3xl text-ink">45 Min</span>
                     </div>
                     <span className="text-[10px] font-bold text-green-700 tracking-widest uppercase bg-green-100 px-3 py-1 rounded-sm">Free</span>
                  </div>
                  
                  <h2 className="font-serif text-3xl text-ink mb-4">Fit Check</h2>
                  <p className="text-ink-muted text-sm leading-relaxed mb-8 font-serif italic">
                     "Introductory call to map your territory and identify potential leverage points."
                  </p>
               </div>

               <div className="mt-auto pt-6 border-t border-ink/5 text-[10px] text-ink-muted/60 uppercase tracking-wider flex justify-between items-center">
                  <span>DaVeenci Consulting</span>
                  <span>GMT-5</span>
               </div>
            </div>

            <div className="w-full md:w-7/12 p-8 md:p-12 bg-white relative flex flex-col items-center justify-center z-10">
               
               {booked ? (
                  <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in duration-500 w-full">
                     <div className="w-16 h-16 bg-green-100 text-green-800 rounded-full flex items-center justify-center mb-6">
                        <Check className="w-8 h-8" />
                     </div>
                     <h3 className="font-serif text-3xl text-ink mb-3">Booking Confirmed</h3>
                     <p className="text-ink-muted mb-1">
                        {selectedDate?.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                     </p>
                     <p className="text-xl text-ink font-serif mb-8">at {selectedTime}</p>
                     <Button variant="secondary" onClick={resetBooking} className="text-sm px-6 py-3">Book Another</Button>
                  </div>
               ) : (
                 <div className="w-full max-w-[360px]">
                   {view === 'calendar' ? (
                      <div className="animate-in slide-in-from-right-4 duration-300">
                         <div className="flex items-center justify-between mb-6">
                            <button onClick={handlePrevMonth} className="p-2 hover:bg-ink/5 rounded-full transition-colors text-ink-muted">
                               <ChevronLeft className="w-5 h-5" />
                            </button>
                            <h3 className="font-serif text-lg text-ink tracking-wide font-medium">
                               {monthNames[currentDate.getMonth()]} <span className="text-ink-muted ml-1">{currentDate.getFullYear()}</span>
                            </h3>
                            <button onClick={handleNextMonth} className="p-2 hover:bg-ink/5 rounded-full transition-colors text-ink-muted">
                               <ChevronRight className="w-5 h-5" />
                            </button>
                         </div>

                         <div className="grid grid-cols-7 gap-2 mb-2 text-center">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                               <div key={day} className="text-[10px] font-bold text-ink-muted/60 uppercase tracking-wider">
                                  {day}
                                </div>
                            ))}
                         </div>

                         <div className="grid grid-cols-7 gap-2 text-sm">
                            {blanksArray.map((_, i) => <div key={`blank-${i}`} className="w-10 h-10" />)}
                            {daysArray.map(day => (
                               <button 
                                  key={day}
                                  onClick={() => handleDateClick(day)}
                                  className="w-10 h-10 flex items-center justify-center text-ink hover:bg-accent hover:text-white hover:shadow-lg hover:scale-110 rounded-sm transition-all duration-200 focus:outline-none text-sm font-medium"
                               >
                                  {day}
                               </button>
                            ))}
                         </div>
                      </div>
                   ) : (
                      <div className="w-full flex flex-col animate-in slide-in-from-right-4 duration-300">
                         <div className="flex items-center justify-between mb-6">
                           <button 
                              onClick={() => setView('calendar')} 
                              className="flex items-center text-xs font-bold text-ink-muted uppercase tracking-wider hover:text-accent transition-colors"
                           >
                              <ChevronLeft className="w-3 h-3 mr-1" /> Back
                           </button>
                           <h3 className="font-serif text-lg text-ink">
                             {selectedDate?.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                           </h3>
                         </div>

                         <div className="grid grid-cols-2 gap-3 mb-8">
                            {availableTimeSlots.map((time) => (
                               <button
                                  key={time}
                                  onClick={() => handleTimeSelect(time)}
                                  className={`py-3 px-4 border rounded-sm text-sm font-medium transition-all duration-200 ${
                                     selectedTime === time 
                                     ? 'bg-accent text-white border-accent shadow-xl scale-105' 
                                     : 'bg-white border-ink/10 text-ink hover:border-accent hover:text-accent hover:shadow-md hover:-translate-y-0.5'
                                  }`}
                               >
                                  {time}
                               </button>
                            ))}
                         </div>

                         {selectedTime && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                               <Button variant="primary" onClick={handleBooking} className="w-full">Confirm Booking</Button>
                            </div>
                         )}
                      </div>
                   )}
                 </div>
               )}
            </div>
         </div>
       </ScrollReveal>
    </Section>
  );
};

export default Booking;
