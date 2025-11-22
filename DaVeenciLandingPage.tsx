import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ChevronRight, ChevronLeft, ArrowUpRight, Mail, Cpu, Activity, GitGraph, Zap, Settings, Calendar as CalendarIcon, Clock, Check } from 'lucide-react';

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

const ScrollIcon: React.FC = () => (
    <div className="w-6 h-6 border border-ink/30 rounded-sm flex items-center justify-center transform rotate-45">
        <div className="w-1 h-1 bg-ink rounded-full" />
    </div>
)

// --- New System Architecture Visuals ---

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
           
           {/* Paths - Darkened to stroke-ink/20 (approx #C4B59D/grayish) for visibility on white */}
           {/* Path 1: Input to Top Branch */}
           <path d="M 30 125 C 60 125, 100 50, 150 50 C 200 50, 220 30, 240 30" stroke="#C4B59D" strokeWidth="2" fill="none" />
           
           {/* Path 2: Input to Bottom Branch */}
           <path d="M 30 125 C 60 125, 100 200, 150 200 C 200 200, 240 230, 270 230" stroke="#C4B59D" strokeWidth="2" fill="none" />
           
           {/* Main Path: Input to Output (Blue Active) */}
           <path d="M 30 125 L 270 125" stroke="#3f84c8" strokeWidth="2" className="animate-pulse" />

           {/* Dashed Vertical Line */}
           <line x1="150" y1="50" x2="150" y2="200" stroke="#C4B59D" strokeWidth="2" strokeDasharray="4 4" />

           {/* Input Node */}
           <circle cx="30" cy="125" r="6" fill="#222" />
           <text x="30" y="155" textAnchor="middle" fontSize="10" fill="#5A4A3A" fontFamily="monospace" letterSpacing="0.05em">INPUT</text>

           {/* Processing Node (Center) */}
           {/* Halo */}
           <circle cx="150" cy="125" r="30" fill="#3f84c8" fillOpacity="0.1" stroke="#3f84c8" strokeWidth="1" className="animate-spin-slow origin-[150px_125px]" strokeDasharray="4 2" />
           {/* Inner solid */}
           <circle cx="150" cy="125" r="4" fill="#3f84c8" />
           <text x="150" y="175" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#3f84c8" fontFamily="monospace" letterSpacing="0.05em">PROCESSING</text>

           {/* Top Node */}
           <circle cx="150" cy="50" r="5" fill="white" stroke="#222" strokeWidth="2" />

           {/* Bottom Node */}
           <circle cx="150" cy="200" r="5" fill="white" stroke="#222" strokeWidth="2" />

           {/* Output Node Main */}
           <rect x="260" y="115" width="20" height="20" rx="2" fill="#3f84c8" />
           <text x="270" y="160" textAnchor="middle" fontSize="10" fill="#5A4A3A" fontFamily="monospace" letterSpacing="0.05em">OUTPUT</text>

           {/* Output Node Bottom */}
           <rect x="265" y="220" width="16" height="16" rx="2" fill="#222" />
        </svg>

        {/* Floating Cards Overlay */}
        {/* Updated background to bg-base (parchment) to stand out against the bg-white card */}
        
        {/* Efficiency Card */}
        <div className="absolute top-4 right-0 bg-base shadow-lg border border-ink/10 px-4 py-2 rounded flex items-center gap-3 animate-float">
           <Activity className="w-4 h-4 text-ink-muted" />
           <span className="text-xs font-bold text-ink">Efficiency +40%</span>
        </div>

        {/* Automated Card */}
        <div className="absolute bottom-12 left-8 bg-base shadow-lg border border-ink/10 px-4 py-2 rounded flex items-center gap-3 animate-float-delayed">
           <Cpu className="w-4 h-4 text-accent" />
           <span className="text-xs font-bold text-ink">Automated</span>
        </div>

    </div>
  </div>
);

const ProcessDiagram: React.FC = () => (
  <div className="hidden md:block absolute top-20 left-0 w-full h-32 pointer-events-none z-0">
     <svg className="w-full h-full" preserveAspectRatio="none">
        {/* Connecting curve from 1 to 2 */}
        <path d="M 200 60 C 350 60, 400 20, 600 40" fill="none" stroke="#E4D6BD" strokeWidth="2" strokeDasharray="8 4" />
        {/* Connecting curve from 2 to 3 */}
        <path d="M 700 40 C 850 60, 900 60, 1100 60" fill="none" stroke="#E4D6BD" strokeWidth="2" strokeDasharray="8 4" />
        
        {/* Decorative Nodes on path */}
        <circle cx="475" cy="30" r="3" fill="#3f84c8" />
        <circle cx="900" cy="55" r="3" fill="#3f84c8" />
     </svg>
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

       <div className="max-w-4xl mx-auto bg-base shadow-2xl shadow-ink/10 border border-ink/10 rounded-sm overflow-hidden flex flex-col md:flex-row">
          {/* Left Panel: Service Details */}
          <div className="w-full md:w-5/12 p-6 md:p-8 border-r border-ink/10 bg-base relative flex flex-col justify-between">
             <div>
                <div className="w-14 h-14 bg-ink text-base flex items-center justify-center rounded-sm mb-8 shadow-md">
                   <CalendarIcon className="w-7 h-7" />
                </div>
                
                <div className="flex items-baseline justify-between border-b border-ink/10 pb-4 mb-6">
                   <div>
                     <span className="text-[10px] font-bold text-ink-muted tracking-[0.2em] uppercase block mb-1">Duration</span>
                     <span className="font-serif text-3xl text-ink">45 Min</span>
                   </div>
                   <span className="text-xs font-bold text-green-700 tracking-widest uppercase bg-green-100 px-2 py-1 rounded-sm">Free</span>
                </div>
                
                <h2 className="font-serif text-3xl text-ink mb-4">Fit Check</h2>
                <p className="text-ink-muted text-sm leading-relaxed mb-8 font-serif italic">
                   "Introductory call to map your territory and identify potential leverage points."
                </p>

                <div className="space-y-4">
                   <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 mt-2 rotate-45 bg-accent"></div>
                      <span className="text-sm text-ink-muted">Overview of challenges</span>
                   </div>
                   <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 mt-2 rotate-45 bg-accent"></div>
                      <span className="text-sm text-ink-muted">Initial fit assessment</span>
                   </div>
                   <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 mt-2 rotate-45 bg-accent"></div>
                      <span className="text-sm text-ink-muted">Next steps discussion</span>
                   </div>
                </div>
             </div>

             <div className="mt-8 pt-6 border-t border-ink/5 text-xs text-ink-muted/60 uppercase tracking-wider">
                DaVeenci Consulting
             </div>
          </div>

          {/* Right Panel: Calendar & Time */}
          <div className="w-full md:w-7/12 p-6 md:p-8 bg-[#F9F7F2] relative flex flex-col">
             
             {booked ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in duration-500 py-12">
                   <div className="w-16 h-16 bg-green-100 text-green-800 rounded-full flex items-center justify-center mb-6">
                      <Check className="w-8 h-8" />
                   </div>
                   <h3 className="font-serif text-3xl text-ink mb-4">Booking Confirmed</h3>
                   <p className="text-ink-muted mb-2">
                      You are scheduled for <strong>{selectedDate?.toLocaleDateString()}</strong> at <strong>{selectedTime}</strong>.
                   </p>
                   <p className="text-sm text-ink-muted/70 mb-8">A calendar invitation has been sent to your email.</p>
                   <Button variant="secondary" onClick={resetBooking}>Book Another</Button>
                </div>
             ) : (
               <div className="max-w-[320px] mx-auto w-full h-full flex flex-col justify-center">
                 {view === 'calendar' ? (
                    <div className="animate-in slide-in-from-right-4 duration-300">
                       <div className="flex items-center justify-between mb-6">
                          <button onClick={handlePrevMonth} className="p-1.5 hover:bg-ink/5 rounded-full transition-colors text-ink-muted">
                             <ChevronLeft className="w-4 h-4" />
                          </button>
                          <h3 className="font-serif text-lg text-ink tracking-wide">
                             {monthNames[currentDate.getMonth()]} <span className="text-ink-muted">{currentDate.getFullYear()}</span>
                          </h3>
                          <button onClick={handleNextMonth} className="p-1.5 hover:bg-ink/5 rounded-full transition-colors text-ink-muted">
                             <ChevronRight className="w-4 h-4" />
                          </button>
                       </div>

                       <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                             <div key={day} className="text-[9px] font-bold tracking-widest text-ink-muted/60 uppercase py-1">
                                {day}
                             </div>
                          ))}
                       </div>

                       <div className="grid grid-cols-7 gap-1 text-sm">
                          {blanksArray.map((_, i) => <div key={`blank-${i}`} className="aspect-square" />)}
                          {daysArray.map(day => (
                             <button 
                                key={day}
                                onClick={() => handleDateClick(day)}
                                className="aspect-square flex items-center justify-center text-ink hover:bg-accent hover:text-white rounded-sm transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-accent/50 text-xs font-medium"
                             >
                                {day}
                             </button>
                          ))}
                       </div>

                       <p className="mt-6 text-center text-[10px] text-ink-muted italic font-serif">
                          Weekends reserved for study • Select a weekday
                       </p>
                    </div>
                 ) : (
                    <div className="h-full flex flex-col animate-in slide-in-from-right-4 duration-300">
                       <button 
                          onClick={() => setView('calendar')} 
                          className="flex items-center text-xs font-bold text-ink-muted uppercase tracking-wider mb-4 hover:text-accent transition-colors self-start"
                       >
                          <ChevronLeft className="w-3 h-3 mr-1" /> Change Date
                       </button>

                       <div className="mb-6">
                          <h3 className="font-serif text-xl text-ink mb-1">
                             {selectedDate?.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                          </h3>
                          <p className="text-xs text-ink-muted flex items-center gap-2">
                            <Clock className="w-3 h-3" /> Select a time
                          </p>
                       </div>

                       <div className="grid grid-cols-2 gap-3 mb-6">
                          {availableTimeSlots.map((time) => (
                             <button
                                key={time}
                                onClick={() => handleTimeSelect(time)}
                                className={`py-2 px-4 border rounded-sm text-xs font-medium transition-all duration-200 ${
                                   selectedTime === time 
                                   ? 'bg-accent text-white border-accent shadow-md' 
                                   : 'bg-white border-ink/10 text-ink hover:border-accent/50 hover:shadow-sm'
                                }`}
                             >
                                {time}
                             </button>
                          ))}
                       </div>

                       {selectedTime && (
                          <div className="mt-auto border-t border-ink/10 pt-4 flex justify-end animate-in fade-in duration-300">
                             <Button variant="primary" onClick={handleBooking} className="w-full text-xs py-2">Confirm</Button>
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
    { label: "Services", href: "#services" },
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
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-base/95 backdrop-blur-md shadow-sm py-3 border-b border-ink/5' : 'bg-transparent py-6'}`}>
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
          <div className="lg:col-span-6 relative h-[5