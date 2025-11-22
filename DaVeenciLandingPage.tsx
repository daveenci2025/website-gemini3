
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ChevronRight, ChevronLeft, ArrowUpRight, Mail, Cpu, Activity, GitGraph, Zap, Settings, Calendar as CalendarIcon, Clock, Check, Globe, Share2, Users, Database, MessageSquare, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

// --- Types & Interfaces ---

interface NavLink {
  label: string;
  href: string;
}

interface CardProps {
  title: string;
  children: React.ReactNode;
  label?: string;
  className?: string;
}

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  pattern?: 'none' | 'grid' | 'circles' | 'nodes';
}

interface EventCardProps {
  image: string;
  date: string;
  title: string;
  description: string;
}

// --- Reusable Visual Components (Da Vinci / AI Motifs) ---

const VitruvianBackground: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden opacity-[0.08] ${className}`}>
    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]" viewBox="0 0 800 800">
      <circle cx="400" cy="400" r="380" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="400" cy="400" r="300" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
      <rect x="120" y="120" width="560" height="560" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="400" y1="20" x2="400" y2="780" stroke="currentColor" strokeWidth="0.5" />
      <line x1="20" y1="400" x2="780" y2="400" stroke="currentColor" strokeWidth="0.5" />
      {/* Angular lines */}
      <line x1="120" y1="120" x2="680" y2="680" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <line x1="680" y1="120" x2="120" y2="680" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
    </svg>
  </div>
);

const NodeNetworkBackground: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden opacity-[0.15] ${className}`}>
    <svg className="absolute w-full h-full text-accent" viewBox="0 0 100 100" preserveAspectRatio="none">
      {/* Random nodes and edges */}
      <circle cx="10" cy="20" r="0.5" fill="currentColor" />
      <circle cx="30" cy="40" r="0.5" fill="currentColor" />
      <circle cx="80" cy="15" r="0.5" fill="currentColor" />
      <circle cx="60" cy="70" r="0.5" fill="currentColor" />
      <circle cx="90" cy="80" r="0.5" fill="currentColor" />
      
      <line x1="10" y1="20" x2="30" y2="40" stroke="currentColor" strokeWidth="0.1" />
      <line x1="30" y1="40" x2="60" y2="70" stroke="currentColor" strokeWidth="0.1" />
      <line x1="80" y1="15" x2="30" y2="40" stroke="currentColor" strokeWidth="0.1" />
      <line x1="60" y1="70" x2="90" y2="80" stroke="currentColor" strokeWidth="0.1" />
    </svg>
  </div>
);

const GridPattern: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`absolute inset-0 pointer-events-none opacity-[0.05] ${className}`} 
    style={{ 
      backgroundImage: 'radial-gradient(#222 1px, transparent 1px)', 
      backgroundSize: '24px 24px' 
    }} 
  />
);

const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {/* Geometric Cube/Hexagon Projection - Elegant & Structural */}
    <path d="M12 2.5L20.5 7.2V16.8L12 21.5L3.5 16.8V7.2L12 2.5Z" strokeWidth="1.5" />
    
    {/* Internal Geometry */}
    <path d="M12 12V2.5" strokeWidth="0.8" className="opacity-60" />
    <path d="M12 12L20.5 16.8" strokeWidth="0.8" className="opacity-60" />
    <path d="M12 12L3.5 16.8" strokeWidth="0.8" className="opacity-60" />
    
    {/* The Node (The AI Core) */}
    <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
    
    {/* Orbital Ring (optional elegance) */}
    <circle cx="12" cy="12" r="8" strokeWidth="0.5" strokeDasharray="3 3" className="opacity-40" />
  </svg>
);

// --- System Architecture Visuals ---

const HeroDiagram: React.FC = () => (
  <div className="relative w-full max-w-md lg:max-w-lg mx-auto aspect-square bg-white shadow-2xl shadow-ink/20 rounded-sm border border-ink/10 p-6 md:p-10 rotate-[-2deg] hover:rotate-0 transition-transform duration-700 ease-out">
    {/* Card Header */}
    <div className="flex justify-between items-center mb-8 border-b border-ink/10 pb-4">
       <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-ink/10"></div>
          <div className="w-3 h-3 rounded-full bg-ink/10"></div>
       </div>
       <div className="font-mono text-[10px] tracking-[0.2em] text-ink/40 uppercase">System Architecture v2.0</div>
    </div>

    {/* Diagram SVG */}
    <div className="relative h-full w-full">
        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 300 250" fill="none">
           
           {/* Paths */}
           <path d="M 30 125 C 60 125, 100 50, 150 50 C 200 50, 220 30, 240 30" stroke="#C4B59D" strokeWidth="1.5" fill="none" />
           <path d="M 30 125 C 60 125, 100 200, 150 200 C 200 200, 240 230, 270 230" stroke="#C4B59D" strokeWidth="1.5" fill="none" />
           <path d="M 30 125 L 270 125" stroke="#3f84c8" strokeWidth="1.5" className="animate-pulse" />

           <line x1="150" y1="50" x2="150" y2="200" stroke="#C4B59D" strokeWidth="1.5" strokeDasharray="4 4" />

           <circle cx="30" cy="125" r="6" fill="#222" />
           <text x="30" y="155" textAnchor="middle" fontSize="10" fill="#5A4A3A" fontFamily="monospace" letterSpacing="0.05em">INPUT</text>

           <circle cx="150" cy="125" r="30" fill="#3f84c8" fillOpacity="0.1" stroke="#3f84c8" strokeWidth="1" className="animate-spin-slow origin-[150px_125px]" strokeDasharray="4 2" />
           <circle cx="150" cy="125" r="4" fill="#3f84c8" />
           <text x="150" y="175" textAnchor="middle" fontSize="10" fontWeight="500" fill="#3f84c8" fontFamily="monospace" letterSpacing="0.05em">PROCESSING</text>

           <circle cx="150" cy="50" r="5" fill="white" stroke="#222" strokeWidth="1.5" />
           <circle cx="150" cy="200" r="5" fill="white" stroke="#222" strokeWidth="1.5" />

           <rect x="260" y="115" width="20" height="20" rx="2" fill="#3f84c8" />
           <text x="270" y="160" textAnchor="middle" fontSize="10" fill="#5A4A3A" fontFamily="monospace" letterSpacing="0.05em">OUTPUT</text>
           <rect x="265" y="220" width="16" height="16" rx="2" fill="#222" />
        </svg>

        <div className="absolute top-4 right-0 bg-base shadow-lg border border-ink/10 px-4 py-2 rounded flex items-center gap-3 animate-float">
           <Activity className="w-4 h-4 text-ink-muted" />
           <span className="text-xs font-medium text-ink">Efficiency +40%</span>
        </div>

        <div className="absolute bottom-12 left-8 bg-base shadow-lg border border-ink/10 px-4 py-2 rounded flex items-center gap-3 animate-float-delayed">
           <Cpu className="w-4 h-4 text-accent" />
           <span className="text-xs font-medium text-ink">Automated</span>
        </div>
    </div>
  </div>
);

// --- New CRM Diagram ---

const CRMFlowDiagram: React.FC = () => (
  <div className="relative w-full max-w-md mx-auto aspect-[4/3] bg-white shadow-xl shadow-ink/10 rounded-sm border border-ink/10 p-8 rotate-[1deg] hover:rotate-0 transition-transform duration-500 ease-out">
    <div className="flex justify-between items-center mb-6 border-b border-ink/10 pb-4">
       <div className="font-serif text-lg text-ink italic">Pipeline Automation</div>
       <div className="font-mono text-[9px] tracking-widest text-ink/30 uppercase">V 1.4</div>
    </div>
    <div className="relative h-full w-full">
      <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 300 180" fill="none">
         {/* Main Flow Line */}
         <path d="M 20 90 C 80 90, 100 90, 140 90 C 180 90, 200 90, 260 90" stroke="#C4B59D" strokeWidth="1.5" strokeDasharray="6 4" />
         <path d="M 20 90 C 80 90, 100 90, 140 90" stroke="#3f84c8" strokeWidth="2" className="animate-pulse" />
         
         {/* Lead Source Node (Left) */}
         <circle cx="30" cy="90" r="18" fill="white" stroke="#222" strokeWidth="1.5" />
         <circle cx="30" cy="90" r="6" fill="#222" />
         <text x="30" y="130" textAnchor="middle" fontSize="10" fill="#5A4A3A" fontFamily="monospace">LEADS</text>

         {/* Enrichment Node (Center) */}
         <path d="M 140 70 L 157 80 L 157 100 L 140 110 L 123 100 L 123 80 Z" fill="white" stroke="#3f84c8" strokeWidth="1.5" />
         <circle cx="140" cy="90" r="8" fill="#3f84c8" fillOpacity="0.2" className="animate-ping" style={{animationDuration: '3s'}} />
         <text x="140" y="130" textAnchor="middle" fontSize="10" fill="#3f84c8" fontFamily="monospace">ENRICH</text>

         {/* CRM Destination (Right) */}
         <rect x="250" y="70" width="30" height="40" rx="2" fill="#222" />
         <line x1="255" y1="80" x2="275" y2="80" stroke="white" strokeWidth="1" opacity="0.5" />
         <line x1="255" y1="90" x2="275" y2="90" stroke="white" strokeWidth="1" opacity="0.5" />
         <text x="265" y="130" textAnchor="middle" fontSize="10" fill="#5A4A3A" fontFamily="monospace">CRM</text>

         {/* Connecting Arc to Slack */}
         <path d="M 157 80 C 180 40, 220 40, 240 50" stroke="#C4B59D" strokeWidth="1" strokeDasharray="2 2" />
         <rect x="240" y="35" width="24" height="24" rx="4" fill="white" stroke="#222" strokeWidth="1" />
         <path d="M 252 47 L 252 47" stroke="#222" strokeWidth="4" strokeLinecap="round" />
      </svg>

      {/* Floating Badge */}
      <div className="absolute top-0 right-10 bg-[#f0fdf4] border border-green-100 shadow-sm px-3 py-1 rounded-sm flex items-center gap-2 animate-float">
         <div className="w-2 h-2 bg-green-500 rounded-full"></div>
         <span className="text-[10px] font-bold text-green-800 tracking-wide">QUALIFIED</span>
      </div>
    </div>
  </div>
);

// --- New Marketing Engine Diagram ---

const MarketingEngineDiagram: React.FC = () => (
  <div className="relative w-full max-w-md mx-auto aspect-[4/3] bg-white shadow-xl shadow-ink/10 rounded-sm border border-ink/10 p-8 rotate-[-1deg] hover:rotate-0 transition-transform duration-500 ease-out">
     <div className="flex justify-between items-center mb-2 border-b border-ink/10 pb-4">
       <div className="font-serif text-lg text-ink italic">Content Multiplier</div>
       <div className="font-mono text-[9px] tracking-widest text-ink/30 uppercase">ENG 2.0</div>
    </div>
    <div className="relative h-full w-full">
       <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 300 180" fill="none">
          {/* Center Hub */}
          <circle cx="150" cy="90" r="24" fill="#white" stroke="#222" strokeWidth="1.5" />
          <polygon points="145,80 160,90 145,100" fill="#222" />
          
          {/* Radiating Lines */}
          <line x1="174" y1="90" x2="240" y2="50" stroke="#C4B59D" strokeWidth="1.5" />
          <line x1="174" y1="90" x2="240" y2="130" stroke="#C4B59D" strokeWidth="1.5" />
          <line x1="126" y1="90" x2="60" y2="90" stroke="#C4B59D" strokeWidth="1.5" />

          {/* Pulse Effects */}
          <circle cx="150" cy="90" r="30" stroke="#3f84c8" strokeWidth="1" className="animate-ping" style={{animationDuration: '2s', opacity: 0.2}} />

          {/* Nodes */}
          {/* Blog - Right Top */}
          <rect x="230" y="30" width="30" height="40" rx="2" fill="white" stroke="#3f84c8" strokeWidth="1.5" />
          <line x1="238" y1="45" x2="252" y2="45" stroke="#3f84c8" strokeWidth="1" />
          <line x1="238" y1="55" x2="252" y2="55" stroke="#3f84c8" strokeWidth="1" />

          {/* Social - Right Bottom */}
          <circle cx="245" cy="130" r="15" fill="white" stroke="#3f84c8" strokeWidth="1.5" />
          <path d="M 238 132 L 244 138 L 254 124" stroke="#3f84c8" strokeWidth="1.5" fill="none" />

          {/* Newsletter - Left */}
          <rect x="30" y="75" width="30" height="30" rx="2" fill="#222" />
          <path d="M 35 85 L 45 92 L 55 85" stroke="white" strokeWidth="1.5" fill="none" />
          
          {/* Labels */}
          <text x="150" y="135" textAnchor="middle" fontSize="10" fill="#222" fontFamily="monospace" letterSpacing="0.1em">SOURCE</text>
          <text x="245" y="85" textAnchor="middle" fontSize="9" fill="#3f84c8" fontFamily="monospace">REPURPOSED</text>
       </svg>

       <div className="absolute top-4 left-4 bg-base shadow-sm border border-ink/10 px-3 py-1 rounded-sm animate-float-delayed">
          <span className="text-[10px] font-bold text-ink-muted tracking-wide uppercase">4x Reach</span>
       </div>
    </div>
  </div>
);

const SchematicDecor: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`absolute right-4 top-4 opacity-30 ${className}`}>
     <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="30" cy="10" r="2" fill="#3f84c8" />
        <circle cx="10" cy="30" r="2" fill="#222" />
        <path d="M10 30 C 10 15, 15 10, 30 10" stroke="#222" strokeWidth="1" />
     </svg>
  </div>
);

const EventCard: React.FC<EventCardProps> = ({ image, date, title, description }) => (
  <div className="bg-white border border-ink/10 rounded-sm overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group h-full">
    <div className="h-48 overflow-hidden relative">
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-ink/10 group-hover:bg-transparent transition-colors duration-300"></div>
    </div>
    <div className="p-6 md:p-8 flex flex-col flex-grow">
      <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider mb-3">
        <CalendarIcon className="w-4 h-4" />
        <span>{date}</span>
      </div>
      <h3 className="font-serif text-xl md:text-2xl text-ink mb-4 leading-tight group-hover:text-accent transition-colors duration-300">{title}</h3>
      <p className="text-ink-muted text-sm leading-relaxed mb-8 flex-grow">
        {description}
      </p>
      
      <div className="flex items-center gap-2 text-ink-muted/60 text-xs font-medium mb-6 border-t border-ink/5 pt-4">
         <Globe className="w-3 h-3" />
         <span>Online Webinar • 60 min</span>
      </div>

      <Button variant="primary" className="w-full justify-center">Join Webinar</Button>
    </div>
  </div>
);

// --- UI Components ---

const Button: React.FC<{ 
  variant?: 'primary' | 'secondary' | 'ghost'; 
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ variant = 'primary', children, className = '', onClick }) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 font-sans text-sm font-medium transition-all duration-300 ease-out transform active:scale-95 group relative overflow-hidden";
  
  const variants = {
    primary: "bg-accent hover:bg-accent-hover text-white shadow-sm hover:shadow-md hover:-translate-y-0.5",
    secondary: "bg-transparent border border-ink/20 text-ink hover:border-ink/50 hover:bg-ink/5",
    ghost: "bg-transparent text-accent hover:text-accent-hover p-0",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      <span className="relative z-10 flex items-center">{children}
      {variant === 'primary' && <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />}
      </span>
    </button>
  );
};

const SectionHeader: React.FC<{ eyebrow: string; title: string; subtitle?: string; className?: string }> = ({ eyebrow, title, subtitle, className }) => (
  <div className={`mb-12 md:mb-16 ${className}`}>
    <span className="inline-block py-1 px-3 mb-4 border border-ink/10 rounded-full text-xs font-semibold tracking-widest text-ink-muted uppercase bg-white/50 backdrop-blur-sm">
      {eyebrow}
    </span>
    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ink mb-6 leading-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="font-sans text-lg text-ink-muted max-w-2xl leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);

const Card: React.FC<CardProps> = ({ title, children, label, className = '' }) => (
  <div className={`relative bg-base border border-ink/10 p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:border-accent/30 group ${className}`}>
    <SchematicDecor className="opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
    {/* Corner accent */}
    <div className="absolute top-0 left-0 w-0 h-0 border-t-[12px] border-l-[12px] border-transparent group-hover:border-accent transition-all duration-300"></div>
    
    {label && (
      <span className="block text-xs font-bold text-accent uppercase tracking-wider mb-3">
        {label}
      </span>
    )}
    <h3 className="font-serif text-xl md:text-2xl text-ink mb-4">{title}</h3>
    <div className="font-sans text-ink-muted leading-relaxed space-y-2">
      {children}
    </div>
  </div>
);

const Section: React.FC<SectionProps> = ({ id, className = '', children, pattern = 'none' }) => (
  <section id={id} className={`relative py-20 md:py-28 px-6 overflow-hidden ${className}`}>
    {pattern === 'grid' && <GridPattern />}
    {pattern === 'circles' && <VitruvianBackground />}
    {pattern === 'nodes' && <NodeNetworkBackground />}
    <div className="relative z-10 max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

// --- Booking Section Components ---

const BookingSection: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [view, setView] = useState<'calendar' | 'time'>('calendar');
  const [booked, setBooked] = useState(false);

  // Slots from 7 AM to 1 PM
  const availableTimeSlots = [
    "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM"
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun
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
    // Mock booking action
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
    <Section id="booking" className="bg-alt/20 border-t border-ink/5">
       <div className="mb-12 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-ink mb-4">Select Date & Time</h2>
          <p className="text-ink-muted">Secure your spot for a Fit Check.</p>
       </div>

       {/* Wider container: max-w-5xl for a better aspect ratio */}
       <div className="max-w-5xl mx-auto bg-base shadow-2xl shadow-ink/10 border border-ink/10 rounded-sm overflow-hidden flex flex-col md:flex-row min-h-[480px]">
          {/* Left Panel: Service Details */}
          <div className="w-full md:w-5/12 p-8 md:p-10 border-r border-ink/10 bg-base relative flex flex-col justify-between">
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

          {/* Right Panel: Calendar & Time */}
          <div className="w-full md:w-7/12 p-8 md:p-12 bg-[#F9F7F2] relative flex flex-col items-center justify-center">
             
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
                                className="w-10 h-10 flex items-center justify-center text-ink hover:bg-accent hover:text-white rounded-sm transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-accent/50 text-sm font-medium"
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
                                   ? 'bg-accent text-white border-accent shadow-md scale-[1.02]' 
                                   : 'bg-white border-ink/10 text-ink hover:border-accent/50 hover:shadow-sm'
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
    </Section>
  );
};

// --- Main Page Component ---

const DaVeenciLandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { label: "Where Teams Get Stuck", href: "#problems" },
    { label: "What We Automate", href: "#automation" },
    { label: "Events", href: "#events" },
    { label: "About", href: "#about" },
    { label: "Newsletter", href: "#newsletter" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    closeMenu();
  };

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      
      {/* 0. Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#faf8f2]/95 backdrop-blur-md shadow-sm py-3 border-b border-ink/5' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo & Motto */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <Logo className="w-10 h-10 text-ink group-hover:text-accent transition-colors duration-500" />
            <div className="flex flex-col justify-center">
                <span className="font-serif text-2xl font-bold tracking-tight text-ink leading-none">DaVeenci</span>
                <span className="text-[0.55rem] tracking-[0.2em] text-accent font-semibold uppercase mt-1">The Art of Automation</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className="text-sm font-medium text-ink-muted hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button variant="primary" className="!py-2 !px-4 !text-xs" onClick={scrollToBooking}>Book a Call</Button>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="lg:hidden p-2 text-ink hover:text-accent">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-base border-b border-ink/10 shadow-xl p-6 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                onClick={closeMenu}
                className="text-lg font-serif text-ink hover:text-accent border-b border-ink/5 pb-2"
              >
                {link.label}
              </a>
            ))}
            <Button variant="primary" className="w-full mt-4" onClick={scrollToBooking}>Book a Call</Button>
          </div>
        )}
      </header>

      {/* 1. Hero — The Thesis */}
      <Section className="pt-40 pb-24 md:pt-48 md:pb-32 min-h-screen flex items-center">
        {/* Background Elements for Hero */}
        <VitruvianBackground className="opacity-[0.12] -right-1/4 scale-125" />
        <NodeNetworkBackground className="opacity-[0.15]" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-6 relative z-20">
            <span className="inline-block mb-6 text-xs font-bold tracking-[0.2em] text-accent uppercase">Folio I — The Thesis</span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.1] mb-8">
              Clarity on AI.<br />
              <span className="italic text-ink-muted/80">Automation that Ships.</span>
            </h1>
            <p className="font-sans text-xl md:text-2xl text-ink-muted max-w-2xl leading-relaxed mb-10">
              DaVeenci helps founders, investors, and operators turn AI from slideware into shipped workflows—so teams can scale revenue and margin without scaling headcount.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button variant="primary" onClick={scrollToBooking}>Book a Strategy Session</Button>
              <Button variant="secondary">See How We Work</Button>
            </div>
            <p className="text-xs md:text-sm text-ink-muted/60 font-medium tracking-wide">
              Built for early-stage to growth companies in B2B SaaS, services, and tech-enabled businesses.
            </p>
          </div>
          
          {/* System Diagram Visual Area */}
          <div className="lg:col-span-6 relative h-[500px] flex items-center justify-center">
            <HeroDiagram />
          </div>
        </div>
      </Section>

      {/* 2. Problems — Where Teams Get Stuck */}
      <Section id="problems" pattern="grid" className="bg-white/40">
        <SectionHeader 
          eyebrow="Folio II — The Problem"
          title="Where Teams Get Stuck"
          subtitle="Most companies have 'AI Initiatives'. Few have shipped outcomes."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card title="The Pilot Purgatory" label="Symptom A">
            <p>You have 12 distinct experiments running. None are production-grade. Your team is "learning" but not shipping.</p>
          </Card>
          <Card title="The Tool Fatigue" label="Symptom B">
            <p>Subscriptions to ChatGPT Team, Claude, Jasper, and Copy.ai—yet work is still being done manually in spreadsheets.</p>
          </Card>
          <Card title="The Margin Squeeze" label="Symptom C">
            <p>Revenue is growing, but headcount costs are growing faster. You need to break the linear relationship between growth and hiring.</p>
          </Card>
        </div>
      </Section>

      {/* 3. Solutions — What We Automate */}
      <Section id="automation" pattern="nodes">
        <SectionHeader 
          eyebrow="Folio III — The Solution"
          title="What We Automate"
          subtitle="We don't just 'consult'. We map, build, and deploy."
        />
        
        <div className="space-y-32">
           
           {/* Feature 1: CRM */}
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
             <div className="lg:col-span-5 space-y-6">
                <div className="w-12 h-12 bg-accent/10 text-accent flex items-center justify-center rounded-sm mb-4">
                  <GitGraph className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-3xl text-ink">Sales & Pipeline Ops</h3>
                <p className="text-ink-muted text-lg leading-relaxed">
                   Stop manually enriching leads or copy-pasting data between tools. We build self-healing pipelines that enrich contacts, draft personalized outreach, and update your CRM automatically.
                </p>
                <ul className="space-y-3 mt-4">
                  <li className="flex items-center gap-3 text-ink text-sm font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div> Automated Lead Enrichment
                  </li>
                  <li className="flex items-center gap-3 text-ink text-sm font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div> CRM Hygiene & Deduplication
                  </li>
                  <li className="flex items-center gap-3 text-ink text-sm font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div> Slack Alerts for High-Intent Leads
                  </li>
                </ul>
             </div>
             <div className="lg:col-span-7 flex justify-center lg:justify-end">
                <CRMFlowDiagram />
             </div>
           </div>

           {/* Feature 2: Marketing */}
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
             <div className="lg:col-span-7 flex justify-center lg:justify-start order-2 lg:order-1">
                <MarketingEngineDiagram />
             </div>
             <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
                <div className="w-12 h-12 bg-accent/10 text-accent flex items-center justify-center rounded-sm mb-4">
                  <Settings className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-3xl text-ink">Content & Marketing Engine</h3>
                <p className="text-ink-muted text-lg leading-relaxed">
                   Turn one seed asset into a month of content. Our workflows take a single video or webinar and automatically generate blog posts, newsletters, and social threads—maintaining your unique voice.
                </p>
                <ul className="space-y-3 mt-4">
                  <li className="flex items-center gap-3 text-ink text-sm font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div> Video to Blog Transformation
                  </li>
                  <li className="flex items-center gap-3 text-ink text-sm font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div> Newsletter Auto-Drafting
                  </li>
                  <li className="flex items-center gap-3 text-ink text-sm font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div> Social Media Clipping
                  </li>
                </ul>
             </div>
           </div>
           
           {/* Feature 3: Customer Success (Compact) */}
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-12 border-t border-ink/10">
              <div className="col-span-1 lg:col-span-1">
                 <h4 className="font-serif text-2xl text-ink mb-4">Also Available: Customer Success</h4>
              </div>
              <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="flex gap-4">
                    <Zap className="w-6 h-6 text-ink-muted mt-1 flex-shrink-0" />
                    <div>
                       <h5 className="font-medium text-ink mb-1">Support Triage</h5>
                       <p className="text-sm text-ink-muted">Auto-labeling and routing tickets based on sentiment and urgency.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <MessageSquare className="w-6 h-6 text-ink-muted mt-1 flex-shrink-0" />
                    <div>
                       <h5 className="font-medium text-ink mb-1">Draft Responses</h5>
                       <p className="text-sm text-ink-muted">AI-drafted replies for Tier 1 tickets, ready for human review.</p>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </Section>

      {/* 4. Events */}
      <Section id="events" pattern="grid" className="bg-alt/30">
        <div className="relative z-10">
          <SectionHeader 
            eyebrow="Folio IV — Engagement"
            title="Upcoming Intelligence"
            subtitle="Join the conversation with industry leaders, founders, and builders."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             <EventCard 
                image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800"
                date="Fri, Nov 28, 2025 @ 10:00 AM CST"
                title="AI × Ops: The Networking Session"
                description="Curious about how AI and automation are transforming work? Meet founders, builders, and operators at this interactive networking event."
             />
             
             <EventCard 
                image="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800"
                date="Fri, Dec 12, 2025 @ 10:30 AM CST"
                title="The Battle Between AEO and SEO"
                description="In this session, we explore the shifting terrain between classic SEO—the old mapmakers of the web—and AEO, the new intelligence engines."
             />
             
             <EventCard 
                image="https://images.unsplash.com/photo-1558494949-efc02570fbc2?auto=format&fit=crop&q=80&w=800"
                date="Fri, Jan 9, 2026 @ 10:00 AM CST"
                title="AI Foundations: Own Your Stack – Hosting & Servers"
                description="Learn how to run AI apps on infrastructure you actually control. We’ll cover the essentials of hosting, servers, and GPU access."
             />
          </div>
        </div>
      </Section>

      {/* 5. About — The Philosophy */}
      <Section id="about" pattern="circles">
         <div className="max-w-4xl mx-auto text-center">
            <Logo className="w-16 h-16 text-ink mx-auto mb-8" />
            <h2 className="font-serif text-4xl md:text-5xl text-ink mb-8 leading-tight">
               "Simplicity is the ultimate sophistication."
            </h2>
            <p className="text-ink-muted text-lg md:text-xl leading-relaxed mb-8">
               DaVeenci isn't about using the flashiest new model. It's about the engineering of elegance. We believe that the best automation is the one you don't notice—it just works, silently compounding your leverage every single day.
            </p>
            <div className="w-24 h-1 bg-accent mx-auto opacity-50"></div>
         </div>
      </Section>

      {/* 6. Booking Section (Updated) */}
      <BookingSection />

      {/* 7. Newsletter */}
      <Section id="newsletter" className="bg-white/50">
         <div className="max-w-xl mx-auto text-center">
            <Mail className="w-8 h-8 text-ink mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-ink mb-4">The DaVeenci Codex</h3>
            <p className="text-ink-muted mb-8">Join 2,000+ operators receiving one high-leverage automation play every Tuesday.</p>
            <div className="flex gap-2">
               <input 
                 type="email" 
                 placeholder="Enter your email" 
                 className="flex-1 bg-base border border-ink/10 px-4 py-3 rounded-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-accent"
               />
               <Button variant="primary">Subscribe</Button>
            </div>
         </div>
      </Section>

      {/* 8. Footer */}
      <footer className="bg-ink text-base py-12 border-t border-white/10">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
               <Logo className="w-6 h-6" />
               <span className="font-serif text-lg font-bold">DaVeenci</span>
            </div>
            <div className="text-sm text-base/50">
               © {new Date().getFullYear()} DaVeenci Consulting. All rights reserved.
            </div>
            <div className="flex gap-6 items-center">
               <a href="#" className="text-base/70 hover:text-white transition-colors" aria-label="Facebook">
                  <Facebook className="w-5 h-5" />
               </a>
               <a href="#" className="text-base/70 hover:text-white transition-colors" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
               </a>
               <a href="#" className="text-base/70 hover:text-white transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
               </a>
               <a href="#" className="text-base/70 hover:text-white transition-colors" aria-label="X">
                  <Twitter className="w-5 h-5" />
               </a>
            </div>
         </div>
      </footer>

    </div>
  );
};

export default DaVeenciLandingPage;
    