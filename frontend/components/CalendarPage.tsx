
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Check, User, Briefcase, HelpCircle, ArrowLeft } from 'lucide-react';
import { Logo, Button, VitruvianBackground, ScrollReveal } from './Shared';
import type { Page } from './types';

interface CalendarPageProps {
  onNavigate: (page: Page, hash?: string) => void;
}

const CalendarPage: React.FC<CalendarPageProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<'datetime' | 'details' | 'success'>('datetime');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    reason: 'Discovery'
  });

  const availableTimeSlots = [
    "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM"
  ];

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Calendar Logic
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

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  return (
    <div className="min-h-screen bg-base font-sans text-ink selection:bg-accent/20 flex flex-col">
      {/* Minimal Header */}
      <header className="fixed top-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none">
        <div className="pointer-events-auto cursor-pointer flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity" onClick={() => onNavigate('landing')}>
           <div className="bg-white/80 backdrop-blur p-2 rounded-full shadow-sm border border-ink/10">
              <ArrowLeft className="w-5 h-5 text-ink" />
           </div>
           <span className="font-serif text-sm font-bold tracking-wide">Back to DaVeenci</span>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden min-h-screen">
         <VitruvianBackground className="opacity-[0.08] fixed" />
         
         <div className="relative z-10 w-full max-w-6xl">
            <ScrollReveal>
              <div className="bg-white/60 backdrop-blur-xl shadow-2xl shadow-ink/10 border border-ink/10 rounded-sm overflow-hidden flex flex-col lg:flex-row min-h-[700px]">
                
                {/* Left Panel: Context & Agenda */}
                <div className="w-full lg:w-4/12 bg-white/40 border-b lg:border-b-0 lg:border-r border-ink/10 p-8 lg:p-12 flex flex-col relative">
                   <div className="mb-8">
                      <Logo className="w-12 h-12 text-ink mb-6" />
                      <span className="font-mono text-xs font-bold text-ink-muted/60 uppercase tracking-widest mb-2 block">Private Calendar</span>
                      <h1 className="font-serif text-3xl lg:text-4xl text-ink mb-4">Strategic Consultation</h1>
                      
                      <div className="flex items-center gap-6 text-sm font-medium text-ink-muted mb-8">
                         <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" /> 45 Min
                         </div>
                         <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Available
                         </div>
                      </div>

                      <p className="text-ink-muted leading-relaxed mb-8">
                         A focused session to map your operational territory and identify high-leverage automation opportunities. 
                      </p>
                   </div>

                   <div className="mt-auto">
                      <h3 className="font-serif text-lg text-ink mb-4 border-b border-ink/10 pb-2">Session Agenda</h3>
                      <ul className="space-y-4">
                         <li className="flex gap-3 text-sm text-ink-muted">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0"></div>
                            <span>Current stack & bottleneck analysis</span>
                         </li>
                         <li className="flex gap-3 text-sm text-ink-muted">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0"></div>
                            <span>Feasibility check for specific workflows</span>
                         </li>
                         <li className="flex gap-3 text-sm text-ink-muted">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0"></div>
                            <span>ROI estimation & roadmap draft</span>
                         </li>
                      </ul>
                   </div>
                </div>

                {/* Right Panel: Interactive Flow */}
                <div className="w-full lg:w-8/12 bg-white relative">
                   {step === 'success' ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in duration-500">
                         <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-100">
                            <Check className="w-10 h-10 text-green-600" />
                         </div>
                         <h2 className="font-serif text-3xl text-ink mb-2">Request Confirmed</h2>
                         <p className="text-ink-muted text-lg mb-8 max-w-md">
                            A calendar invitation has been sent to your inbox. I look forward to our conversation.
                         </p>
                         <div className="bg-base/50 p-6 rounded-sm border border-ink/5 w-full max-w-sm mb-8">
                            <div className="flex justify-between text-sm mb-2">
                               <span className="text-ink-muted">Date</span>
                               <span className="font-medium text-ink">{selectedDate?.toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                               <span className="text-ink-muted">Time</span>
                               <span className="font-medium text-ink">{selectedTime}</span>
                            </div>
                         </div>
                         <Button variant="secondary" onClick={() => onNavigate('landing')}>Return to Homepage</Button>
                      </div>
                   ) : (
                     <div className="p-8 lg:p-12 h-full flex flex-col">
                        
                        {/* Progress Bar */}
                        <div className="flex items-center gap-4 mb-8 text-xs font-bold uppercase tracking-widest">
                           <span className={`pb-1 border-b-2 transition-colors ${step === 'datetime' ? 'text-accent border-accent' : 'text-green-600 border-green-600'}`}>01 Time</span>
                           <span className={`pb-1 border-b-2 transition-colors ${step === 'details' ? 'text-accent border-accent' : 'text-ink-muted/20 border-transparent'}`}>02 Details</span>
                        </div>

                        {step === 'datetime' && (
                           <div className="flex flex-col md:flex-row gap-8 h-full animate-in slide-in-from-right-4 duration-300">
                              {/* Calendar */}
                              <div className="flex-1">
                                 <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-serif text-xl text-ink">
                                       {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                                    </h3>
                                    <div className="flex gap-2">
                                       <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} className="p-1 hover:bg-base rounded-full text-ink-muted"><ChevronLeft className="w-5 h-5" /></button>
                                       <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} className="p-1 hover:bg-base rounded-full text-ink-muted"><ChevronRight className="w-5 h-5" /></button>
                                    </div>
                                 </div>
                                 <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-ink-muted/40 mb-2">
                                    {['S','M','T','W','T','F','S'].map(d => <div key={d}>{d}</div>)}
                                 </div>
                                 <div className="grid grid-cols-7 gap-2">
                                    {blanksArray.map((_, i) => <div key={`b-${i}`} className="w-10 h-10" />)}
                                    {daysArray.map(day => {
                                       const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                                       const isSelected = selectedDate?.toDateString() === date.toDateString();
                                       return (
                                          <button 
                                             key={day} 
                                             onClick={() => handleDateClick(day)}
                                             className={`w-10 h-10 rounded-sm text-sm font-medium transition-all ${
                                                isSelected 
                                                ? 'bg-ink text-white shadow-lg scale-110' 
                                                : 'text-ink hover:bg-accent/10 hover:text-accent'
                                             }`}
                                          >
                                             {day}
                                          </button>
                                       )
                                    })}
                                 </div>
                              </div>

                              {/* Time Slots */}
                              <div className="w-full md:w-48 border-l border-ink/10 pl-0 md:pl-8 flex flex-col">
                                 <h3 className="font-serif text-lg text-ink mb-4">
                                    {selectedDate ? selectedDate.toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: 'numeric'}) : 'Select Date'}
                                 </h3>
                                 <div className="space-y-2 overflow-y-auto max-h-[300px] pr-2">
                                    {selectedDate ? availableTimeSlots.map(time => (
                                       <button
                                          key={time}
                                          onClick={() => setSelectedTime(time)}
                                          className={`w-full py-2 px-3 text-sm border rounded-sm transition-all ${
                                             selectedTime === time
                                             ? 'bg-accent text-white border-accent shadow-md'
                                             : 'border-ink/10 text-ink hover:border-accent hover:text-accent'
                                          }`}
                                       >
                                          {time}
                                       </button>
                                    )) : (
                                       <div className="text-sm text-ink-muted/50 italic py-8 text-center">Please choose a day</div>
                                    )}
                                 </div>
                                 <div className="mt-auto pt-4">
                                    <Button 
                                       variant="primary" 
                                       className={`w-full ${!selectedTime ? 'opacity-50 cursor-not-allowed' : ''}`}
                                       onClick={() => selectedTime && setStep('details')}
                                    >
                                       Next
                                    </Button>
                                 </div>
                              </div>
                           </div>
                        )}

                        {step === 'details' && (
                           <form onSubmit={handleSubmit} className="flex flex-col h-full max-w-md animate-in slide-in-from-right-4 duration-300">
                              <h3 className="font-serif text-2xl text-ink mb-6">Your Information</h3>
                              
                              <div className="space-y-6 mb-8">
                                 <div>
                                    <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2 flex items-center gap-2">
                                       <User className="w-3 h-3" /> Full Name
                                    </label>
                                    <input 
                                       type="text" 
                                       required
                                       value={formData.name}
                                       onChange={(e) => setFormData({...formData, name: e.target.value})}
                                       className="w-full bg-base/30 border border-ink/20 p-3 text-ink focus:outline-none focus:border-accent transition-colors rounded-sm"
                                       placeholder="Leonardo da Vinci"
                                    />
                                 </div>
                                 
                                 <div>
                                    <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2 flex items-center gap-2">
                                       <Briefcase className="w-3 h-3" /> Company
                                    </label>
                                    <input 
                                       type="text" 
                                       required
                                       value={formData.company}
                                       onChange={(e) => setFormData({...formData, company: e.target.value})}
                                       className="w-full bg-base/30 border border-ink/20 p-3 text-ink focus:outline-none focus:border-accent transition-colors rounded-sm"
                                       placeholder="Florence Workshop Inc."
                                    />
                                 </div>

                                 <div>
                                    <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2 flex items-center gap-2">
                                       <HelpCircle className="w-3 h-3" /> Reason for Reachout
                                    </label>
                                    <div className="relative">
                                       <select 
                                          value={formData.reason}
                                          onChange={(e) => setFormData({...formData, reason: e.target.value})}
                                          className="w-full bg-base/30 border border-ink/20 p-3 text-ink focus:outline-none focus:border-accent transition-colors rounded-sm appearance-none cursor-pointer"
                                       >
                                          <option value="Discovery">Automation Discovery</option>
                                          <option value="Partnership">Strategic Partnership</option>
                                          <option value="Consulting">Consulting Project</option>
                                          <option value="Other">Other Inquiry</option>
                                       </select>
                                       <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-ink-muted">
                                          <ChevronRight className="w-4 h-4 rotate-90" />
                                       </div>
                                    </div>
                                 </div>
                              </div>

                              <div className="mt-auto flex gap-4">
                                 <Button variant="secondary" onClick={() => setStep('datetime')} className="px-6">Back</Button>
                                 <Button variant="primary" className="flex-1">Schedule Event</Button>
                              </div>
                           </form>
                        )}

                     </div>
                   )}
                </div>

              </div>
            </ScrollReveal>
         </div>
      </main>
    </div>
  );
};

export default CalendarPage;
