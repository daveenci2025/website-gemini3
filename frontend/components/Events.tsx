import React from 'react';
import { Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import { Section, SectionHeader, ScrollReveal } from './Shared';
import type { EventCardProps } from './types';

const CodexEventCard: React.FC<EventCardProps & { index: number }> = ({ image, date, title, description, index }) => (
  <div className="group relative flex flex-col h-full min-h-[500px] bg-[#FDFBF7] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)]">
    <div className="absolute inset-0 border border-[#D6CFC0] shadow-[inset_0_0_20px_rgba(214,207,192,0.2)] pointer-events-none"></div>
    
    <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-ink/20"></div>
    <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-ink/20"></div>
    <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-ink/20"></div>
    <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-ink/20"></div>

    <div className="relative p-8 flex flex-col h-full z-10">
      <div className="flex justify-between items-end mb-6 border-b border-ink/10 pb-4 border-dashed">
         <div className="flex flex-col">
            <span className="font-serif text-[11px] italic text-ink/40 mb-1">Codex DaVeenci</span>
            <span className="font-script text-xl text-ink/60 -rotate-1 transform origin-left">Folio {100 + index}.v2</span>
         </div>
         <div className="font-sans text-[10px] font-medium text-accent uppercase tracking-wider px-2 py-1 bg-accent/5 rounded-sm">
            Upcoming
         </div>
      </div>

      <div className="relative aspect-[4/3] mb-6 overflow-hidden border border-ink/10 p-1 bg-white shadow-sm rotate-[0.5deg] group-hover:rotate-0 transition-transform duration-500">
         <div className="relative w-full h-full overflow-hidden bg-ink/5">
             <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover opacity-90 filter sepia-[0.2] grayscale-[0.4] contrast-[1.1] group-hover:filter-none group-hover:opacity-100 transition-all duration-700" 
             />
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-20 mix-blend-multiply pointer-events-none"></div>
         </div>
      </div>

      <div className="mb-6 flex-grow">
        <h3 className="font-serif text-2xl md:text-3xl text-ink mb-4 group-hover:text-accent transition-colors">{title}</h3>
        <div className="flex items-center gap-2 text-ink-muted/60 text-sm font-serif italic mb-4">
            <CalendarIcon className="w-4 h-4" />
            <span>{date}</span>
        </div>
        <p className="font-serif text-base leading-relaxed text-ink/70 italic border-l-2 border-ink/10 pl-4">
           "{description}"
        </p>
      </div>

      <div className="mt-auto pt-4 flex items-center justify-between border-t border-ink/5">
         <span className="font-mono text-[9px] tracking-widest text-ink/30 uppercase">Ref: DA-2025-0{index + 1}</span>
         <button className="group/btn flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink hover:text-accent transition-colors">
            <span>Register</span>
            <ArrowRight className="w-3 h-3 transform group-hover/btn:translate-x-1 transition-transform" />
         </button>
      </div>
    </div>
  </div>
);

const Events: React.FC = () => (
  <Section id="events" pattern="grid" className="bg-alt/30">
    <div className="relative z-10">
      <SectionHeader 
        eyebrow="Folio IV — Engagement"
        title="Upcoming Intelligence"
        subtitle="Join the conversation with industry leaders, founders, and builders."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
         {[
            {
               image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
               date: "Fri, Nov 28, 2025 @ 10:00 AM CST",
               title: "AI × Ops: The Networking Session",
               description: "Curious about how AI and automation are transforming work? Meet founders, builders, and operators at this interactive networking event."
            },
            {
               image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
               date: "Fri, Dec 12, 2025 @ 10:30 AM CST",
               title: "The Battle Between AEO and SEO",
               description: "In this session, we explore the shifting terrain between classic SEO—the old mapmakers of the web—and AEO, the new intelligence engines."
            },
            {
               image: "https://images.unsplash.com/photo-1558494949-efc02570fbc2?auto=format&fit=crop&q=80&w=800",
               date: "Fri, Jan 9, 2026 @ 10:00 AM CST",
               title: "AI Foundations: Own Your Stack",
               description: "Learn how to run AI apps on infrastructure you actually control. We’ll cover the essentials of hosting, servers, and GPU access."
            }
         ].map((event, idx) => (
            <ScrollReveal key={idx} delay={idx * 150} className="h-full">
              <CodexEventCard index={idx} {...event} />
            </ScrollReveal>
         ))}
      </div>
    </div>
  </Section>
);

export default Events;
