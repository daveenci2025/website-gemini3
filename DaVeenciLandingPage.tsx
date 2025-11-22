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
    "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM"
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

       <div className="max-w-5xl mx-auto bg-base shadow-2xl shadow-ink/10 border border-ink/10 rounded-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          {/* Left Panel: Service Details */}
          <div className="w-full md:w-1/3 p-8 md:p-10 border-r border-ink/10 bg-base relative flex flex-col justify-between">
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
          <div className="w-full md:w-2/3 p-8 md:p-10 bg-[#F9F7F2] relative">
             
             {booked ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
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
               <>
                 {view === 'calendar' ? (
                    <div className="animate-in slide-in-from-right-4 duration-300">
                       <div className="flex items-center justify-between mb-8">
                          <button onClick={handlePrevMonth} className="p-2 hover:bg-ink/5 rounded-full transition-colors text-ink-muted">
                             <ChevronLeft className="w-5 h-5" />
                          </button>
                          <h3 className="font-serif text-xl text-ink tracking-wide">
                             {monthNames[currentDate.getMonth()]} <span className="text-ink-muted">{currentDate.getFullYear()}</span>
                          </h3>
                          <button onClick={handleNextMonth} className="p-2 hover:bg-ink/5 rounded-full transition-colors text-ink-muted">
                             <ChevronRight className="w-5 h-5" />
                          </button>
                       </div>

                       <div className="grid grid-cols-7 gap-2 mb-2 text-center">
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                             <div key={day} className="text-[10px] font-bold tracking-widest text-ink-muted/60 uppercase py-2">
                                {day}
                             </div>
                          ))}
                       </div>

                       <div className="grid grid-cols-7 gap-2">
                          {blanksArray.map((_, i) => <div key={`blank-${i}`} className="aspect-square" />)}
                          {daysArray.map(day => (
                             <button 
                                key={day}
                                onClick={() => handleDateClick(day)}
                                className="aspect-square flex items-center justify-center text-sm font-medium text-ink hover:bg-accent hover:text-white rounded-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50"
                             >
                                {day}
                             </button>
                          ))}
                       </div>

                       <p className="mt-8 text-center text-xs text-ink-muted italic font-serif">
                          Weekends reserved for study • Select a weekday for audience
                       </p>
                    </div>
                 ) : (
                    <div className="h-full flex flex-col animate-in slide-in-from-right-4 duration-300">
                       <button 
                          onClick={() => setView('calendar')} 
                          className="flex items-center text-xs font-bold text-ink-muted uppercase tracking-wider mb-6 hover:text-accent transition-colors self-start"
                       >
                          <ChevronLeft className="w-4 h-4 mr-1" /> Change Date
                       </button>

                       <div className="mb-8">
                          <h3 className="font-serif text-2xl text-ink mb-1">
                             {selectedDate?.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                          </h3>
                          <p className="text-sm text-ink-muted flex items-center gap-2">
                            <Clock className="w-4 h-4" /> Select a time
                          </p>
                       </div>

                       <div className="grid grid-cols-2 gap-4 mb-8">
                          {availableTimeSlots.map((time) => (
                             <button
                                key={time}
                                onClick={() => handleTimeSelect(time)}
                                className={`py-4 px-6 border rounded-sm text-sm font-medium transition-all duration-200 ${
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
                          <div className="mt-auto border-t border-ink/10 pt-6 flex justify-end animate-in fade-in duration-300">
                             <Button variant="primary" onClick={handleBooking} className="w-full md:w-auto">Confirm Booking</Button>
                          </div>
                       )}
                    </div>
                 )}
               </>
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
          <div className="lg:col-span-6 relative h-[500px] flex items-center justify-center hidden md:flex">
             <HeroDiagram />
          </div>
        </div>
      </Section>

      {/* 2. Who We Design For */}
      <Section className="bg-base border-t border-ink/5">
        <SectionHeader 
          eyebrow="Folio II — Who We Design For"
          title="Built for people who move capital and companies."
          subtitle="DaVeenci sits at the intersection of product, ops, and capital. We work best with leaders who care less about experiments and more about shipped systems."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <Card title="Founders & CEOs" label="Lead">
            <p>Free your leadership team from manual coordination.</p>
            <p>Scale ops, GTM, and reporting without hiring a small army.</p>
            <p>Turn AI into a defensible edge, not a side project.</p>
          </Card>
          <Card title="VCs & Investors" label="Scale">
            <p>Bring a practical AI playbook to your portfolio.</p>
            <p>Identify where automation moves the P&L, not just the pitch deck.</p>
            <p>Support founders with vetted patterns instead of vague advice.</p>
          </Card>
          <Card title="Business Owners" label="Operate">
            <p>Remove busywork from finance, sales, and customer delivery.</p>
            <p>Standardize processes before you scale them with AI.</p>
            <p>Get clear ROI stories you can share with your board or partners.</p>
          </Card>
        </div>
      </Section>

      {/* 3. Where Teams Get Stuck */}
      <Section id="problems" className="bg-alt/30" pattern="grid">
        <SectionHeader 
          eyebrow="Folio III — Where Teams Get Stuck"
          title="The AI story sounds great. The implementation doesn’t."
          subtitle="Most teams don’t fail because the tech isn’t good enough. They fail because nobody owns turning ideas into working systems."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Too many ideas, no shipped systems",
              text: "Everyone has a list of AI experiments. Few have a single critical workflow fully automated and measured."
            },
            {
              title: "Fragmented tools, fragile glue",
              text: "Zapier chains, scripts, and one-off dashboards break as soon as the business changes."
            },
            {
              title: "No clear ROI narrative",
              text: "Founders and investors can’t point to a clean “this workflow saved X hours and Y dollars,” so AI spending feels like a cost center."
            },
            {
              title: "Ops bandwidth is the bottleneck",
              text: "Your best operators are already underwater. They can’t design, test, and maintain automation on top of their day jobs."
            }
          ].map((item, i) => (
             <div key={i} className="relative bg-base p-8 border-l-4 border-ink/20 hover:border-accent transition-colors shadow-sm group overflow-hidden">
                {/* Faint graph pattern in bg */}
                <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                  <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
                     <path d="M10 70 Q 40 10, 110 40" stroke="currentColor" strokeWidth="2" />
                     <circle cx="10" cy="70" r="3" fill="currentColor" />
                     <circle cx="110" cy="40" r="3" fill="currentColor" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-ink mb-4">{item.title}</h3>
                <p className="text-ink-muted leading-relaxed">{item.text}</p>
             </div>
          ))}
        </div>
      </Section>

      {/* 4. What We Automate */}
      <Section id="automation" className="bg-base">
        <SectionHeader 
          eyebrow="Folio IV — What We Automate"
          title="We focus on workflows that move revenue, margin, or risk."
          subtitle="We map your processes like Da Vinci’s sketches—then turn them into living systems."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 border border-ink/10 rounded-lg overflow-hidden">
           {/* Using a grid gap for borders approach */}
           {[
             { title: "Revenue & GTM workflows", desc: "Lead routing, qualification, follow-ups, personalized outreach, renewal nudges." },
             { title: "Founder & exec leverage", desc: "Briefing docs, investor updates, board prep, decision dashboards." },
             { title: "Ops & delivery", desc: "Intake, triage, client onboarding, task routing, QA checks." },
             { title: "Analytics & reporting", desc: "Automated metric collection, narrative summaries, weekly digests for leaders and investors." },
             { title: "Knowledge & SOPs", desc: "Turning scattered docs into operational playbooks that bots and humans can both follow." },
           ].map((card, idx) => (
             <div key={idx} className="relative bg-base p-8 hover:bg-white/50 transition-colors group">
               <div className="w-10 h-10 mb-4 border border-accent/30 rounded-full flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                  <ScrollIcon />
               </div>
               {/* Connecting line embellishment */}
               <div className="absolute top-12 right-8 w-16 h-px bg-ink/10 group-hover:bg-accent/40 transition-colors"></div>
               <div className="absolute top-12 right-8 w-1 h-1 bg-ink/20 rounded-full group-hover:bg-accent transition-colors"></div>

               <h3 className="font-serif text-xl text-ink mb-3 font-semibold">{card.title}</h3>
               <p className="text-sm text-ink-muted">{card.desc}</p>
             </div>
           ))}
           
           {/* CTA Tile */}
           <div className="bg-base p-8 flex items-center justify-center hover:bg-white/50 transition-colors">
              <a href="#services" className="group flex items-center text-accent font-semibold text-lg">
                See examples
                <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-2 transition-transform"/>
              </a>
           </div>
        </div>
      </Section>

      {/* 5. The DaVeenci Method */}
      <Section id="method" pattern="circles">
         <SectionHeader 
          eyebrow="Folio V — The DaVeenci Method"
          title="From napkin sketch to dependable system."
          subtitle="We combine Da Vinci-style curiosity with operator-grade discipline. No labs, no theatrics—just workflows that ship."
        />

        <div className="relative mt-16">
          {/* Connecting schematic process diagram */}
          <ProcessDiagram />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
             {[
               { step: "01", title: "Diagnose the leverage points", desc: "We interview key stakeholders, map your core workflows, and quantify where automation would unlock the most time and margin." },
               { step: "02", title: "Design & ship the first system", desc: "In a focused sprint, we design, prototype, and ship one high-leverage workflow—end-to-end, with owners, alerts, and guardrails." },
               { step: "03", title: "Scale the blueprint", desc: "Once the first system works, we turn the blueprint into a reusable pattern for your next workflows or your entire portfolio." }
             ].map((item, idx) => (
               <div key={idx} className="flex flex-col items-start bg-base md:bg-transparent p-6 md:p-0 border border-ink/10 md:border-0 rounded-lg md:rounded-none backdrop-blur-sm md:backdrop-blur-none">
                  <div className="w-12 h-12 bg-ink text-white rounded-full flex items-center justify-center font-serif font-bold text-xl mb-6 shadow-lg ring-4 ring-base relative">
                    {item.step}
                    {/* Little connector node below the circle */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-accent rounded-full"></div>
                  </div>
                  <h3 className="font-serif text-2xl text-ink mb-4">{item.title}</h3>
                  <p className="text-ink-muted">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>

        <div className="mt-16 max-w-2xl mx-auto bg-white/60 border border-accent/20 p-6 rounded-lg flex gap-4 items-start relative overflow-hidden">
          {/* Decorative bg grid */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#3f84c8_1px,transparent_1px)] [background-size:8px_8px]"></div>
          
          <div className="min-w-[4px] h-full bg-accent rounded-full self-stretch relative z-10"></div>
          <div className="relative z-10">
            <p className="text-sm font-bold text-accent mb-1 uppercase tracking-wider flex items-center gap-2">
               <GitGraph className="w-4 h-4" />
               For Investors
            </p>
            <p className="text-ink-muted italic">We can run this playbook for a single company or across a portfolio, creating repeatable patterns and shared learnings.</p>
          </div>
        </div>
      </Section>

      {/* 6. Services & Advisory */}
      <Section id="services" className="bg-alt/30 border-t border-b border-ink/5">
        <SectionHeader 
          eyebrow="Folio VI — Services & Advisory"
          title="Ways to work with DaVeenci."
          subtitle="Whether you’re testing the waters or standardizing AI across a portfolio, we structure our work around clear outcomes."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Service 1 */}
          <div className="bg-base p-8 flex flex-col border border-ink/10 hover:shadow-xl transition-shadow duration-300 group relative">
             <SchematicDecor />
             <div className="mb-6">
               <h3 className="font-serif text-2xl text-ink mb-2">Automation Discovery Sprint</h3>
               <span className="inline-block px-2 py-1 bg-ink/5 text-xs font-semibold text-ink-muted uppercase tracking-wide">2–3 Weeks</span>
             </div>
             <ul className="space-y-3 mb-8 flex-grow">
               <li className="flex items-start text-sm text-ink-muted"><ChevronRight className="w-4 h-4 text-accent mt-1 mr-2 flex-shrink-0" /> Map priority workflows and failure modes.</li>
               <li className="flex items-start text-sm text-ink-muted"><ChevronRight className="w-4 h-4 text-accent mt-1 mr-2 flex-shrink-0" /> Identify 2–3 high-ROI automation candidates.</li>
               <li className="flex items-start text-sm text-ink-muted"><ChevronRight className="w-4 h-4 text-accent mt-1 mr-2 flex-shrink-0" /> Ship a clear roadmap + first implementation plan.</li>
             </ul>
             <div className="pt-6 border-t border-ink/10">
               <p className="text-xs text-ink-muted italic">Best for founders and investors who want clarity before committing budget.</p>
             </div>
          </div>

          {/* Service 2 */}
          <div className="bg-base p-8 flex flex-col border-2 border-accent/20 relative shadow-lg transform md:-translate-y-4 group">
             <SchematicDecor className="opacity-50" />
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white text-xs font-bold px-3 py-1 uppercase tracking-wide rounded-full shadow-sm">Most Popular</div>
             <div className="mb-6">
               <h3 className="font-serif text-2xl text-ink mb-2">Embedded Automation Partner</h3>
               <span className="inline-block px-2 py-1 bg-accent/10 text-xs font-semibold text-accent uppercase tracking-wide">Ongoing</span>
             </div>
             <ul className="space-y-3 mb-8 flex-grow">
               <li className="flex items-start text-sm text-ink-muted"><ChevronRight className="w-4 h-4 text-accent mt-1 mr-2 flex-shrink-0" /> We act as your fractional AI/automation team.</li>
               <li className="flex items-start text-sm text-ink-muted"><ChevronRight className="w-4 h-4 text-accent mt-1 mr-2 flex-shrink-0" /> Design, ship, and maintain critical workflows.</li>
               <li className="flex items-start text-sm text-ink-muted"><ChevronRight className="w-4 h-4 text-accent mt-1 mr-2 flex-shrink-0" /> Monthly reporting on time saved, errors reduced, and ROI.</li>
             </ul>
             <div className="pt-6 border-t border-ink/10">
               <p className="text-xs text-ink-muted italic">Best for teams without a dedicated automation function.</p>
             </div>
          </div>

          {/* Service 3 */}
          <div className="bg-base p-8 flex flex-col border border-ink/10 hover:shadow-xl transition-shadow duration-300 group relative">
             <SchematicDecor />
             <div className="mb-6">
               <h3 className="font-serif text-2xl text-ink mb-2">Portfolio & Investor Advisory</h3>
               <span className="inline-block px-2 py-1 bg-ink/5 text-xs font-semibold text-ink-muted uppercase tracking-wide">Retainer / Program</span>
             </div>
             <ul className="space-y-3 mb-8 flex-grow">
               <li className="flex items-start text-sm text-ink-muted"><ChevronRight className="w-4 h-4 text-accent mt-1 mr-2 flex-shrink-0" /> Portfolio-wide AI & automation playbook.</li>
               <li className="flex items-start text-sm text-ink-muted"><ChevronRight className="w-4 h-4 text-accent mt-1 mr-2 flex-shrink-0" /> Deep dives with selected companies.</li>
               <li className="flex items-start text-sm text-ink-muted"><ChevronRight className="w-4 h-4 text-accent mt-1 mr-2 flex-shrink-0" /> Help with technical diligence on automation-heavy pitches.</li>
             </ul>
             <div className="pt-6 border-t border-ink/10">
               <p className="text-xs text-ink-muted italic">Best for funds that want AI to show up in the numbers, not just the memos.</p>
             </div>
          </div>

        </div>
      </Section>

      {/* 7. Why DaVeenci */}
      <Section id="about" className="bg-base" pattern="nodes">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           <div>
             <span className="inline-block py-1 px-3 mb-4 border border-ink/10 rounded-full text-xs font-semibold tracking-widest text-ink-muted uppercase bg-white/50">Folio VII — Why DaVeenci</span>
             <h2 className="font-serif text-4xl md:text-5xl text-ink mb-8">Inspired by Leonardo.<br/>Grounded in operating reality.</h2>
             
             <div className="prose prose-lg text-ink-muted font-sans">
                <p className="mb-6">
                  Leonardo sketched the future in his notebooks—machines, systems, and ideas far ahead of his time.
                </p>
                <p className="mb-6">
                  DaVeenci takes the same spirit of curiosity and applies it to AI and automation, but with one constraint: everything we design has to work in the messy, human reality of your company.
                </p>
                <p>
                  We bring a mix of product, engineering, and operations experience. That means we care as much about owners, edge cases, and adoption as we do about models and prompts.
                </p>
             </div>
           </div>
           
           <div className="relative bg-white/40 p-8 border border-ink/10 rounded-lg backdrop-blur-sm">
              <h3 className="font-serif text-xl text-ink mb-6">What clients value</h3>
              <ul className="space-y-4">
                 {[
                   "We speak P&L, not just tokens and prompts.",
                   "We design for maintainability, not heroics.",
                   "We measure success in hours saved, errors avoided, and opportunities unlocked."
                 ].map((item, i) => (
                   <li key={i} className="flex items-center">
                     <div className="w-8 h-px bg-accent mr-4"></div>
                     <span className="text-ink font-medium">{item}</span>
                   </li>
                 ))}
              </ul>
              
              {/* Decorative Signature-ish look */}
              <div className="absolute bottom-4 right-8 opacity-20">
                 <svg width="100" height="40" viewBox="0 0 100 40">
                    <path d="M10,20 Q30,5 50,20 T90,20" fill="none" stroke="currentColor" strokeWidth="2" />
                 </svg>
              </div>
           </div>
        </div>
      </Section>

      {/* 8. Strong CTA Band - Replaced with Booking Section */}
      {/* We are inserting the Booking Section here */}
      
      <BookingSection />

      {/* 9. Automation Insider */}
      <Section id="newsletter" className="bg-base" pattern="circles">
        <div className="max-w-4xl mx-auto text-center">
           <span className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block">Folio VIII — Automation Insider</span>
           <h2 className="font-serif text-3xl md:text-4xl text-ink mb-6">A short letter on practical AI, for people who sign checks.</h2>
           <p className="text-ink-muted mb-10 max-w-2xl mx-auto">
             A periodic note from DaVeenci on where AI automation is actually working—in the wild, with real numbers. No hype, no jargon, just patterns you can steal.
           </p>

           <div className="flex flex-col md:flex-row gap-6 justify-center text-left max-w-3xl mx-auto mb-12">
             {[
               "Concrete workflow examples from founders and operators.",
               "Questions investors should ask about “AI-powered” startups.",
               "Simple experiments you can run in your own company."
             ].map((item, i) => (
               <div key={i} className="flex items-start gap-3 md:w-1/3">
                 <div className="mt-1 w-1.5 h-1.5 bg-accent rounded-full shrink-0" />
                 <span className="text-sm text-ink-muted">{item}</span>
               </div>
             ))}
           </div>

           <div className="max-w-md mx-auto bg-white p-2 rounded border border-ink/20 flex shadow-sm">
             <input 
               type="email" 
               placeholder="you@company.com" 
               className="flex-grow px-4 py-2 bg-transparent outline-none text-ink placeholder:text-ink/30 font-sans"
             />
             <button className="bg-ink text-white px-6 py-2 font-medium text-sm hover:bg-accent transition-colors rounded-sm">
               Get the Briefings
             </button>
           </div>
        </div>
      </Section>

      {/* 10. Footer */}
      <footer className="bg-base border-t border-ink/10 py-12 px-6">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
               <Logo className="w-8 h-8 text-ink" />
               <div className="flex flex-col">
                  <span className="font-serif text-xl font-bold">DaVeenci</span>
                  <span className="text-[0.5rem] tracking-widest text-ink-muted uppercase">The Art of Automation</span>
               </div>
            </div>

            <div className="flex gap-8 text-sm text-ink-muted">
               <a href="#" className="hover:text-accent">Privacy</a>
               <a href="#" className="hover:text-accent">Contact</a>
               <a href="#" className="hover:text-accent">LinkedIn</a>
            </div>

            <div className="text-xs text-ink-muted/60 uppercase tracking-widest">
              Inspired by Leonardo. Built for modern teams.
            </div>
         </div>
      </footer>
    </div>
  );
};

export default DaVeenciLandingPage;