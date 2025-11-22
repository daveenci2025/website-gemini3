import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

// --- Types & Interfaces ---

export interface NavLink {
  label: string;
  href: string;
}

export interface CardProps {
  title: string;
  children: React.ReactNode;
  label?: string;
  className?: string;
}

export interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  pattern?: 'none' | 'grid' | 'circles' | 'nodes';
  overflow?: boolean;
}

export interface EventCardProps {
  image: string;
  date: string;
  title: string;
  description: string;
}

// --- Scroll Animation Hook & Component ---

export const ScrollReveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number; direction?: 'up' | 'left' | 'right' }> = ({ children, className = "", delay = 0, direction = 'up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (direction === 'up') return 'translate-y-12 scale-95';
    if (direction === 'left') return '-translate-x-12 scale-95';
    if (direction === 'right') return 'translate-x-12 scale-95';
    return 'translate-y-12 scale-95';
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0 translate-x-0 scale-100" : `opacity-0 ${getTransform()}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Visual Components ---

export const VitruvianBackground: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden opacity-[0.12] ${className}`}>
      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]" viewBox="0 0 800 800">
        <g className="animate-[spin_40s_linear_infinite]" style={{ transformOrigin: '400px 400px' }}>
           <circle cx="400" cy="400" r="380" fill="none" stroke="currentColor" strokeWidth="1" />
           <rect x="120" y="120" width="560" height="560" fill="none" stroke="currentColor" strokeWidth="1" />
        </g>
        <g className="animate-[spin_50s_linear_infinite_reverse]" style={{ transformOrigin: '400px 400px' }}>
           <circle cx="400" cy="400" r="300" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="12 12" />
        </g>
        <line x1="400" y1="20" x2="400" y2="780" stroke="currentColor" strokeWidth="0.5" />
        <line x1="20" y1="400" x2="780" y2="400" stroke="currentColor" strokeWidth="0.5" />
        <line x1="120" y1="120" x2="680" y2="680" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        <line x1="680" y1="120" x2="120" y2="680" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      </svg>
    </div>
  );
};

export const NodeNetworkBackground: React.FC<{ className?: string }> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const connectionDistance = 200;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const width = window.innerWidth;
      const height = window.innerHeight;
      const particleCount = Math.floor((width * height) / 50000); 

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4, 
          vy: (Math.random() - 0.5) * 0.4,
        });
      }
    };

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#222222'; 
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34, 34, 34, ${(1 - distance / connectionDistance) * 0.5})`; 
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden opacity-[0.15] ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export const GridPattern: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`absolute inset-0 pointer-events-none opacity-[0.05] ${className}`} 
    style={{ 
      backgroundImage: 'radial-gradient(#222 1px, transparent 1px)', 
      backgroundSize: '24px 24px' 
    }} 
  />
);

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 2.5L20.5 7.2V16.8L12 21.5L3.5 16.8V7.2L12 2.5Z" strokeWidth="1.5" />
    <path d="M12 12V2.5" strokeWidth="0.8" className="opacity-60" />
    <path d="M12 12L20.5 16.8" strokeWidth="0.8" className="opacity-60" />
    <path d="M12 12L3.5 16.8" strokeWidth="0.8" className="opacity-60" />
    <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="8" strokeWidth="0.5" strokeDasharray="3 3" className="opacity-40 animate-spin-slow origin-center" style={{transformOrigin: '12px 12px'}} />
  </svg>
);

export const SchematicDecor: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`absolute right-4 top-4 opacity-30 ${className}`}>
     <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="30" cy="10" r="2" fill="#3f84c8" />
        <circle cx="10" cy="30" r="2" fill="#222" />
        <path d="M10 30 C 10 15, 15 10, 30 10" stroke="#222" strokeWidth="1" />
     </svg>
  </div>
);

// --- UI Components ---

export const Button: React.FC<{ 
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

export const SectionHeader: React.FC<{ eyebrow: string; title: string; subtitle?: string; className?: string }> = ({ eyebrow, title, subtitle, className }) => (
  <ScrollReveal className={`mb-12 md:mb-16 ${className}`}>
    <span className="block font-script text-2xl text-ink-muted/80 mb-2 transform -rotate-1 origin-bottom-left">
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
  </ScrollReveal>
);

export const Card: React.FC<CardProps> = ({ title, children, label, className = '' }) => (
  <div className={`relative bg-base border border-ink/10 p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:border-accent/30 group ${className}`}>
    <SchematicDecor className="opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
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

export const Section: React.FC<SectionProps> = ({ id, className = '', children, pattern = 'none', overflow = false }) => (
  <section id={id} className={`relative py-20 md:py-28 px-6 ${overflow ? 'overflow-visible' : 'overflow-hidden'} ${className}`}>
    {pattern === 'grid' && <GridPattern />}
    {pattern === 'circles' && <VitruvianBackground />}
    {pattern === 'nodes' && <NodeNetworkBackground />}
    <div className="relative z-10 max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);
