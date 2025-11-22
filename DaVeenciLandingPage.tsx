import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ChevronRight, ArrowUpRight, Mail } from 'lucide-react';

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
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {/* Da Vinci style Gear/Cog */}
    <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" className="opacity-20" strokeDasharray="2 2" />
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const ScrollIcon: React.FC = () => (
    <div className="w-6 h-6 border border-ink/30 rounded-sm flex items-center justify-center transform rotate-45">
        <div className="w-1 h-1 bg-ink rounded-full" />
    </div>
)

// --- UI Components ---

const Button: React.FC<{ 
  variant?: 'primary' | 'secondary' | 'ghost'; 
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ variant = 'primary', children, className = '', onClick }) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 font-sans text-sm font-medium transition-all duration-300 ease-out transform active:scale-95 group";
  
  const variants = {
    primary: "bg-accent hover:bg-accent-hover text-white shadow-sm hover:shadow-md hover:-translate-y-0.5",
    secondary: "bg-transparent border border-ink/20 text-ink hover:border-ink/50 hover:bg-ink/5",
    ghost: "bg-transparent text-accent hover:text-accent-hover p-0",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
      {variant === 'primary' && <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />}
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

const FeatureCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="flex flex-col p-6 border-l-2 border-ink/10 hover:border-accent hover:bg-white/40 transition-colors duration-300">
    <h4 className="font-serif text-lg font-semibold text-ink mb-2 flex items-center">
      <span className="w-2 h-2 rounded-full bg-accent mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
      {title}
    </h4>
    <p className="text-sm md:text-base text-ink-muted leading-relaxed">
      {description}
    </p>
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

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      
      {/* 0. Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-base/95 backdrop-blur-md shadow-sm py-3 border-b border-ink/5' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 group cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <Logo className="w-8 h-8 text-ink group-hover:text-accent transition-colors duration-300" />
            <span className="font-serif text-xl md:text-2xl font-bold tracking-tight ml-2">DaVeenci</span>
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
            <Button variant="primary" className="!py-2 !px-4 !text-xs">Book a Call</Button>
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
            <Button variant="primary" className="w-full mt-4" onClick={closeMenu}>Book a Call</Button>
          </div>
        )}
      </header>

      {/* 1. Hero — The Thesis */}
      <Section className="pt-40 pb-24 md:pt-48 md:pb-32 min-h-screen flex items-center">
        {/* Background Elements for Hero */}
        <VitruvianBackground className="opacity-[0.12] -right-1/4 scale-125" />
        <NodeNetworkBackground className="opacity-[0.2]" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 relative z-20">
            <span className="inline-block mb-6 text-xs font-bold tracking-[0.2em] text-accent uppercase">Folio I — The Thesis</span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.1] mb-8">
              Clarity on AI.<br />
              <span className="italic text-ink-muted/80">Automation that Ships.</span>
            </h1>
            <p className="font-sans text-xl md:text-2xl text-ink-muted max-w-2xl leading-relaxed mb-10">
              DaVeenci helps founders, investors, and operators turn AI from slideware into shipped workflows—so teams can scale revenue and margin without scaling headcount.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button variant="primary">Book a Strategy Session</Button>
              <Button variant="secondary">See How We Work</Button>
            </div>
            <p className="text-xs md:text-sm text-ink-muted/60 font-medium tracking-wide">
              Built for early-stage to growth companies in B2B SaaS, services, and tech-enabled businesses.
            </p>
          </div>
          
          {/* Abstract Illustration Area */}
          <div className="lg:col-span-5 relative h-[400px] lg:h-[600px] flex items-center justify-center hidden md:flex">
             {/* Decorative Geometric Composition */}
             <div className="relative w-full h-full">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-accent/40 rounded-full animate-[spin_10s_linear_infinite]" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-ink/10 rounded-full" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-ink/20 rotate-45" />
                
                {/* Floating 'Cards' representing automated tasks */}
                <div className="absolute top-1/3 right-10 bg-white/80 backdrop-blur p-4 shadow-lg border border-ink/5 rounded w-48 animate-pulse">
                  <div className="h-2 bg-ink/10 w-1/2 mb-2 rounded"></div>
                  <div className="h-2 bg-ink/10 w-3/4 rounded"></div>
                </div>
                
                 <div className="absolute bottom-1/4 left-10 bg-white/80 backdrop-blur p-4 shadow-lg border border-ink/5 rounded w-48" style={{animationDelay: '1s'}}>
                  <div className="h-2 bg-accent/20 w-2/3 mb-2 rounded"></div>
                  <div className="h-2 bg-ink/10 w-full rounded"></div>
                </div>
             </div>
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
             <div key={i} className="bg-base p-8 border-l-4 border-ink/20 hover:border-accent transition-colors shadow-sm">
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
             <div key={idx} className="bg-base p-8 hover:bg-white/50 transition-colors group">
               <div className="w-10 h-10 mb-4 border border-accent/30 rounded-full flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                  <ScrollIcon />
               </div>
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
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-ink/10 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
             {[
               { step: "01", title: "Diagnose the leverage points", desc: "We interview key stakeholders, map your core workflows, and quantify where automation would unlock the most time and margin." },
               { step: "02", title: "Design & ship the first system", desc: "In a focused sprint, we design, prototype, and ship one high-leverage workflow—end-to-end, with owners, alerts, and guardrails." },
               { step: "03", title: "Scale the blueprint", desc: "Once the first system works, we turn the blueprint into a reusable pattern for your next workflows or your entire portfolio." }
             ].map((item, idx) => (
               <div key={idx} className="flex flex-col items-start bg-base md:bg-transparent p-6 md:p-0 border border-ink/10 md:border-0 rounded-lg md:rounded-none">
                  <div className="w-12 h-12 bg-ink text-white rounded-full flex items-center justify-center font-serif font-bold text-xl mb-6 shadow-lg ring-4 ring-base">
                    {item.step}
                  </div>
                  <h3 className="font-serif text-2xl text-ink mb-4">{item.title}</h3>
                  <p className="text-ink-muted">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>

        <div className="mt-16 max-w-2xl mx-auto bg-white/60 border border-accent/20 p-6 rounded-lg flex gap-4 items-start">
          <div className="min-w-[4px] h-full bg-accent rounded-full self-stretch"></div>
          <div>
            <p className="text-sm font-bold text-accent mb-1 uppercase tracking-wider">For Investors</p>
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
          <div className="bg-base p-8 flex flex-col border border-ink/10 hover:shadow-xl transition-shadow duration-300">
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
          <div className="bg-base p-8 flex flex-col border-2 border-accent/20 relative shadow-lg transform md:-translate-y-4">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white text-xs font-bold px-3 py-1 uppercase tracking-wide rounded-full">Most Popular</div>
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
          <div className="bg-base p-8 flex flex-col border border-ink/10 hover:shadow-xl transition-shadow duration-300">
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

      {/* 8. Strong CTA Band */}
      <Section className="bg-ink text-base relative overflow-hidden">
        {/* Tech overlay for this section */}
        <div className="absolute inset-0 opacity-[0.1]">
           <svg className="w-full h-full" preserveAspectRatio="none">
              <pattern id="grid-inv" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid-inv)" />
           </svg>
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl text-base mb-6">Automate the busywork. Protect your focus.</h2>
          <p className="text-lg text-base/70 mb-10 font-light">
            If you’re responsible for the next stage of growth—or the next fund—you can’t afford AI that lives only in decks. Let’s design one workflow that proves the value.
          </p>
          <Button className="!bg-accent !text-white hover:!bg-accent-light text-lg px-10 py-4">Start a Discovery Call</Button>
        </div>
      </Section>

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
            <div className="flex items-center space-x-2">
               <Logo className="w-6 h-6 text-ink" />
               <span className="font-serif text-xl font-bold">DaVeenci</span>
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