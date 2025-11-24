
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Check, User, Briefcase, HelpCircle, ArrowLeft, Mail, Phone } from 'lucide-react';
import { Logo, Button, VitruvianBackground, ScrollReveal } from './Shared';
import type { CalendarProps } from './types';

const Calendar: React.FC<CalendarProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<'datetime' | 'details' | 'success'>('datetime');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    reason: 'Everything (Recommended)'
  });

  const availableTimeSlots = [
    "07:00 AM", "08:00 AM", "09:00 AM", 
    "10:00 AM", "11:00 AM", "12:00 PM"
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
    // Reset time when date changes
    setSelectedTime(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  return (
    <div className="min-h-screen bg-base font-sans text-ink selection:bg-accent/20 flex flex-col">
      <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden min-h-screen">
         <VitruvianBackground className="opacity-[0.08] fixed" />
         
         <div className="relative z-10 w-full max-w-6xl">
            <ScrollReveal>
              <div className="bg-white/60 backdrop-blur-xl shadow-2xl shadow-ink/10 border border-ink/10 rounded-sm overflow-hidden flex flex-col lg:flex-row min-h-[700px]">
                
                {/* Left Panel: Context & Agenda - Increased Width */}
                <div className="w-full lg:w-5/12 bg-white/40 border-b lg:border-b-0 lg:border-r border-ink/10 p-8 lg:p-12 flex flex-col relative">
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

                      <div className="flex items-center gap-4 py-6 border-y border-ink/5 mb-6">
                         <img src="/images/Anton%20Osipov%20-%20AI%20Impelmention%20Engeener.png" alt="Anton Osipov" className="w-12 h-12 rounded-full object-cover border border-ink/10" />
                         <div>
                            <div className="font-serif text-ink text-lg leading-none mb-1">Anton Osipov</div>
                            <div className="font-mono text-[10px] text-ink-muted uppercase tracking-widest">Consultant</div>
                         </div>
                      </div>
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
                      
                      <div className="mt-8 pt-6 border-t border-ink/5">
                        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }} className="text-xs font-mono font-bold text-accent uppercase tracking-widest hover:text-ink transition-colors block">
                           www.daveenci.ai
                        </a>
                      </div>
                   </div>
                </div>

                {/* Right Panel: Interactive Flow - Adjusted Width */}
                <div className="w-full lg:w-7/12 bg-white relative">
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
                     <div className="p-8 lg:p-12 h-full flex flex-col justify-center items-center">
                        
                        {/* Progress Bar */}
                        <div className="w-full max-w-md flex items-center gap-4 mb-8 text-xs font-bold uppercase tracking-widest">
                           <span className={`pb-1 border-b-2 transition-colors ${step === 'datetime' ? 'text-accent border-accent' : 'text-green-600 border-green-600'}`}>01 Time</span>
                           <span className={`pb-1 border-b-2 transition-colors ${step === 'details' ? 'text-accent border-accent' : 'text-ink-muted/20 border-transparent'}`}>02 Details</span>
                        </div>

                        {step === 'datetime' && (
                           <div className="flex flex-col h-full w-full max-w-md animate-in slide-in-from-right-4 duration-300">
                              {/* Calendar */}
                              <div className="mb-8">
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
                                    {['S','M','T','W','T','F','S'].map((d, i) => <div key={i}>{d}</div>)}
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

                              {/* Time Slots - Stacked Below */}
                              <div className="pt-6 border-t border-ink/10">
                                 <h3 className="font-serif text-lg text-ink mb-4 text-center">
                                    {selectedDate ? selectedDate.toLocaleDateString(undefined, {weekday: 'long', month: 'short', day: 'numeric'}) : 'Select Date Above'}
                                 </h3>
                                 
                                 {selectedDate ? (
                                    <>
                                       <div className="grid grid-cols-3 gap-3 mb-6">
                                          {availableTimeSlots.map(time => (
                                             <button
                                                key={time}
                                                onClick={() => setSelectedTime(time)}
                                                className={`py-3 px-2 text-sm border rounded-sm transition-all text-center ${
                                                   selectedTime === time
                                                   ? 'bg-accent text-white border-accent shadow-md scale-105'
                                                   : 'bg-white border-ink/10 text-ink hover:border-accent hover:text-accent hover:shadow-sm'
                                                }`}
                                             >
                                                {time}
                                             </button>
                                          ))}
                                       </div>
                                       <Button 
                                          variant="primary" 
                                          className={`w-full ${!selectedTime ? 'opacity-50 cursor-not-allowed' : ''}`}
                                          onClick={() => selectedTime && setStep('details')}
                                       >
                                          Next
                                       </Button>
                                    </>
                                 ) : (
                                    <div className="text-center text-ink-muted/50 text-sm italic py-4">
                                       Available times will appear here
                                    </div>
                                 )}
                              </div>
                           </div>
                        )}

                        {step === 'details' && (
                           <form onSubmit={handleSubmit} className="flex flex-col h-full w-full max-w-md animate-in slide-in-from-right-4 duration-300">
                              <h3 className="font-serif text-2xl text-ink mb-6">Your Information</h3>
                              
                              <div className="space-y-4 mb-6">
                                 <div>
                                    <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2 flex items-center gap-2">
                                       <User className="w-3 h-3" /> Full Name <span className="text-red-500">*</span>
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
                                       <Mail className="w-3 h-3" /> Email <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                       type="email" 
                                       required
                                       value={formData.email}
                                       onChange={(e) => setFormData({...formData, email: e.target.value})}
                                       className="w-full bg-base/30 border border-ink/20 p-3 text-ink focus:outline-none focus:border-accent transition-colors rounded-sm"
                                       placeholder="leo@florence.it"
                                    />
                                 </div>
                                 
                                 <div className="grid grid-cols-2 gap-4">
                                     <div>
                                        <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2 flex items-center gap-2">
                                           <Briefcase className="w-3 h-3" /> Company <span className="text-ink-muted/60 lowercase font-normal">(optional)</span>
                                        </label>
                                        <input 
                                           type="text" 
                                           value={formData.company}
                                           onChange={(e) => setFormData({...formData, company: e.target.value})}
                                           className="w-full bg-base/30 border border-ink/20 p-3 text-ink focus:outline-none focus:border-accent transition-colors rounded-sm"
                                           placeholder="Florence Inc."
                                        />
                                     </div>
                                     <div>
                                        <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2 flex items-center gap-2">
                                           <Phone className="w-3 h-3" /> Phone <span className="text-ink-muted/60 lowercase font-normal">(optional)</span>
                                        </label>
                                        <input 
                                           type="tel" 
                                           value={formData.phone}
                                           onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                           className="w-full bg-base/30 border border-ink/20 p-3 text-ink focus:outline-none focus:border-accent transition-colors rounded-sm"
                                           placeholder="+1 555..."
                                        />
                                     </div>
                                 </div>

                                 <div>
                                    <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2 flex items-center gap-2">
                                       <HelpCircle className="w-3 h-3" /> Reason for Reachout <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                       <select 
                                          value={formData.reason}
                                          onChange={(e) => setFormData({...formData, reason: e.target.value})}
                                          className="w-full bg-base/30 border border-ink/20 p-3 text-ink focus:outline-none focus:border-accent transition-colors rounded-sm appearance-none cursor-pointer"
                                       >
                                          <option value="Everything (Recommended)">Everything (Recommended)</option>
                                          <option value="Sales, Pipeline Ops, CRM">Sales, Pipeline Ops, CRM</option>
                                          <option value="Content & Marketing Engine">Content & Marketing Engine</option>
                                          <option value="Operational Cost Optimization">Operational Cost Optimization</option>
                                       </select>
                                       <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-ink-muted">
                                          <ChevronRight className="w-4 h-4 rotate-90" />
                                       </div>
                                    </div>
                                 </div>
                              </div>

                              <div className="mt-auto flex gap-4">
                                 <Button variant="secondary" onClick={() => setStep('datetime')} className="px-6">Back</Button>
                                 <Button variant="primary" className="flex-1">Confirm Booking</Button>
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

export default Calendar;
