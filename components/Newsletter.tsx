import React from 'react';
import { Mail, ArrowUpRight, ArrowRight } from 'lucide-react';
import { Section, SectionHeader, ScrollReveal, GridPattern, Button } from './Shared';

const BriefingCard: React.FC<{
  title: string;
  description: string;
  image: string;
  issueNo: string;
  category: string;
}> = ({ title, description, image, issueNo, category }) => (
  <div className="group relative flex flex-col h-full bg-white border border-ink/10 rounded-sm overflow-hidden transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(63,132,200,0.15)] hover:-translate-y-3 hover:border-accent/30">
    <div className="absolute top-0 inset-x-0 h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-30"></div>

    <div className="relative h-60 overflow-hidden">
       <div className="absolute inset-0 bg-ink/20 mix-blend-multiply z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
       <img 
         src={image} 
         alt={title} 
         className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out filter grayscale-[0.2] contrast-[1.05] group-hover:grayscale-0 group-hover:contrast-100" 
       />
       
       <div className="absolute top-4 left-4 z-20">
          <span className="bg-white/95 backdrop-blur shadow-sm text-[10px] font-bold text-ink tracking-widest uppercase px-3 py-1.5 rounded-sm border border-ink/5 group-hover:text-accent group-hover:border-accent/20 transition-colors">
            {category}
          </span>
       </div>

        <div className="absolute bottom-0 right-0 bg-white px-4 py-2 border-tl rounded-tl-sm border-ink/10 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <span className="font-mono text-[10px] font-bold text-ink-muted uppercase tracking-wider">No. {issueNo}</span>
       </div>
    </div>

    <div className="p-8 flex flex-col flex-grow relative bg-white">
       <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
       
       <h3 className="relative font-serif text-2xl text-ink mb-3 group-hover:text-accent transition-colors duration-300 leading-tight">
          {title}
       </h3>
       
       <div className="w-12 h-0.5 bg-ink/10 mb-4 group-hover:bg-accent/30 transition-colors duration-500"></div>

       <p className="relative font-sans text-sm text-ink-muted leading-relaxed mb-8 flex-grow">
         {description}
       </p>

       <div className="relative mt-auto flex items-center justify-between pt-6 border-t border-ink/5 group-hover:border-ink/10 transition-colors">
          <span className="text-[10px] font-mono text-ink-muted/60 uppercase tracking-wider">Read Time: 4m</span>
          <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink group-hover:text-accent transition-colors">
             <span>Read Briefing</span>
             <ArrowUpRight className="w-3 h-3 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
       </div>
    </div>
  </div>
);

const Newsletter: React.FC = () => (
  <Section id="newsletter" pattern="nodes" className="bg-gradient-to-b from-base to-white relative overflow-visible" overflow={true}>
     <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-alt/10 to-transparent pointer-events-none"></div>
     
     <SectionHeader 
       eyebrow="Folio V — The Codex"
       title="Featured Briefings"
       subtitle="Architectural blueprints for the AI age. Sent weekly."
     />

     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <ScrollReveal delay={100}>
          <BriefingCard 
            title="The Agentic Workflow"
            description="Why chat interfaces are a dead end, and how to architect autonomous agent swarms that do the work for you."
            image="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800"
            issueNo="042"
            category="Architecture"
          />
        </ScrollReveal>
        <ScrollReveal delay={300}>
          <BriefingCard 
            title="Synthetic Data Pipelines"
            description="Running out of human data? Here is the playbook for generating high-fidelity synthetic datasets to fine-tune your models."
            image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
            issueNo="043"
            category="Engineering"
          />
        </ScrollReveal>
        <ScrollReveal delay={500}>
          <BriefingCard 
            title="The Zero-Touch CRM"
            description="A technical deep dive into self-healing customer databases that enrich themselves without sales rep intervention."
            image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
            issueNo="044"
            category="Operations"
          />
        </ScrollReveal>
     </div>

     <ScrollReveal delay={200}>
       <div className="max-w-5xl mx-auto bg-white border border-ink/10 p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-ink/5 rounded-sm">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
          <GridPattern className="opacity-[0.3]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
             <div className="pr-0 lg:pr-8">
                <div className="flex items-center gap-3 mb-4">
                   <Mail className="w-5 h-5 text-accent" />
                   <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest">Weekly Intelligence</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl text-ink mb-4 leading-tight">Join the Guild</h3>
                <p className="text-ink-muted text-lg mb-8 leading-relaxed font-serif italic">
                   "Receive one high-leverage automation play every Tuesday. No fluff, just blueprints."
                </p>
                <div className="flex items-center gap-4 text-sm text-ink-muted/80 font-medium">
                   <div className="flex -space-x-3">
                      {[1,2,3,4].map(i => (
                         <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden">
                            <img src={`https://i.pravatar.cc/100?img=${10+i}`} alt="Member" className="w-full h-full object-cover grayscale" />
                         </div>
                      ))}
                   </div>
                   <span className="text-xs uppercase tracking-wider">Join 2,000+ Operators</span>
                </div>
             </div>

             <div className="bg-base p-8 border border-ink/10 rounded-sm shadow-sm relative">
                 <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-ink/20"></div>
                 <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-ink/20"></div>
                 <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-ink/20"></div>
                 <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-ink/20"></div>

                 <div className="flex flex-col gap-4 relative z-10">
                    <div>
                      <label className="block text-[10px] font-bold text-ink uppercase tracking-widest mb-2">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="leonardo@florence.it" 
                        className="w-full bg-white border border-ink/20 px-4 py-3 text-ink placeholder:text-ink-muted/40 focus:outline-none focus:border-accent transition-all shadow-inner"
                      />
                    </div>
                    <Button variant="primary" className="w-full justify-between group">
                       <span>Subscribe to Codex</span>
                       <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <p className="text-[10px] text-ink-muted/50 text-center mt-1">
                       Unsubscribe at any time. We respect your inbox.
                    </p>
                 </div>
             </div>
          </div>
       </div>
     </ScrollReveal>
  </Section>
);

export default Newsletter;
