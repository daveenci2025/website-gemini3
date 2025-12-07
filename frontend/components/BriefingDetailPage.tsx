
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Section, ScrollReveal, VitruvianBackground, Button } from './Shared';
import type { Page } from './types';
import { Clock, Tag, ChevronRight, Check, X, AlertTriangle, Lightbulb, BookOpen, Layers } from 'lucide-react';
import AgenticWorkflowImage from '../images/001 - What is an Agentic Workflow.png';

interface BriefingDetailPageProps {
   onNavigate: (page: Page, hash?: string, id?: string) => void;
   id?: string | null;
}

// Briefing Data Dictionary
const briefings: Record<string, any> = {
   "agentic-workflow": {
      id: "agentic-workflow",
      title: "The Agentic Workflow: Architecting Swarms",
      metaDescription: "A technical guide to moving beyond chat interfaces. Learn how to architect autonomous agent swarms, implement the 4-stage reasoning pipeline, and deploy self-correcting AI workers.",
      publishDate: "2025-10-14",
      author: "Leonardo & Team",
      category: "Architecture",
      readTime: "8 min read",
      issueNo: "042",
      image: AgenticWorkflowImage,
      quickAnswer: "An **Agentic Workflow** is a system where AI models act as autonomous agents that can plan, execute tools, reflect on results, and iterate without human intervention. Unlike a standard chatbot (Zero-Shot), an agentic workflow involves a loop of *Reasoning → Acting → Observing → Correcting*. This approach increases accuracy on complex tasks by 40-60% compared to single-prompt chains.",
      toc: ["Introduction", "Key Takeaways", "Real-World Example", "Pros & Cons", "Alternatives", "Troubleshooting", "FAQ"],
      faqs: [
         { question: "What is the difference between a Chain and an Agent?", answer: "A Chain is a hard-coded sequence of steps (A -> B -> C). An Agent uses an LLM as a reasoning engine to decide which steps to take and in what order based on the user's goal." },
         { question: "Which model is best for agentic workflows?", answer: "Currently, Gemini 1.5 Pro and GPT-4o are the leaders due to their high reasoning capabilities and large context windows. Smaller models like Flash or Llama 3-8b struggle with multi-step planning." },
         { question: "How do I prevent agents from getting stuck in loops?", answer: "Implement a 'Maximum Iteration' counter and a 'Supervisor' agent. If the worker agent fails 3 times, the Supervisor should intervene or halt the process to save token costs." }
      ]
   },
   "synthetic-data": {
      id: "synthetic-data",
      title: "Synthetic Data Pipelines: The Infinite Dataset",
      metaDescription: "Running out of human data? Here is the playbook for generating high-fidelity synthetic datasets to fine-tune your models without privacy risks.",
      publishDate: "2025-10-21",
      author: "Leonardo & Team",
      category: "Engineering",
      readTime: "6 min read",
      issueNo: "043",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600",
      quickAnswer: "**Synthetic Data** is artificially generated information that mimics real-world data properties. It solves the 'Cold Start' problem for AI models where training data is scarce, expensive, or sensitive (PII). By using seed samples and procedural generation, teams can create infinite, balanced datasets to train robust models.",
      toc: ["Introduction", "The Data Scarcity Problem", "Generation Techniques", "Validation Metrics", "Tools & Frameworks", "FAQ"],
      faqs: [
         { question: "Is synthetic data as good as real data?", answer: "For many tasks, yes. In fact, it can be better because you can perfectly balance edge cases that are rare in real life." },
         { question: "Does it hallucinate?", answer: "It can. That's why 'Human-in-the-Loop' validation on a small subset is crucial before full-scale training." }
      ]
   },
   "zero-touch-crm": {
      id: "zero-touch-crm",
      title: "The Zero-Touch CRM: Self-Healing Databases",
      metaDescription: "A technical deep dive into self-healing customer databases that enrich themselves without sales rep intervention.",
      publishDate: "2025-10-28",
      author: "Leonardo & Team",
      category: "Operations",
      readTime: "5 min read",
      issueNo: "044",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600",
      quickAnswer: "A **Zero-Touch CRM** uses background AI agents to monitor communication channels (email, Slack, calls) and automatically update customer records. It eliminates manual data entry, ensures 100% data hygiene, and can autonomously trigger follow-up workflows based on changes in deal status.",
      toc: ["Introduction", "The Data Decay Problem", "Architecture", "Privacy & Security", "Implementation Guide", "FAQ"],
      faqs: [
         { question: "How does it handle privacy?", answer: "Agents are scoped to specific fields and PII is redacted before processing by external LLMs." },
         { question: "Can it replace a RevOps team?", answer: "No, it augments them. It handles the grunt work of data entry so RevOps can focus on strategy and analysis." }
      ]
   }
};

const BriefingDetailPage: React.FC<BriefingDetailPageProps> = ({ onNavigate, id }) => {
   const data = (id && briefings[id]) ? briefings[id] : briefings["agentic-workflow"]; // Default to agentic if not found

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [id]);

   // AEO: Inject Structured Data (JSON-LD)
   useEffect(() => {
      const schemaData = {
         "@context": "https://schema.org",
         "@type": "TechArticle",
         "headline": data.title,
         "image": [data.image],
         "datePublished": data.publishDate,
         "author": [{
            "@type": "Organization",
            "name": "DaVeenci Consulting"
         }],
         "description": data.metaDescription,
         "mainEntity": {
            "@type": "FAQPage",
            "mainEntity": (data.faqs || []).map((faq: any) => ({
               "@type": "Question",
               "name": faq.question,
               "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
               }
            }))
         }
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schemaData);
      document.head.appendChild(script);

      return () => {
         document.head.removeChild(script);
      };
   }, [data]);

   return (
      <div className="flex flex-col w-full min-h-screen bg-base">
         <Header onNavigate={onNavigate} currentPage="briefing-detail" />

         {/* Article Header */}
         <div className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-6 overflow-hidden">
            <VitruvianBackground className="opacity-[0.1]" />
            <div className="max-w-4xl mx-auto relative z-10 text-center">
               <div className="flex items-center justify-center gap-3 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <span className="px-3 py-1 bg-white/50 backdrop-blur border border-ink/10 rounded-sm text-[10px] font-bold tracking-widest uppercase text-accent">
                     {data.category}
                  </span>
                  <span className="text-ink-muted/40 font-mono text-xs">#{data.issueNo}</span>
               </div>

               <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.1] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                  {data.title}
               </h1>

               <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-ink-muted/70 font-medium animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                  <div className="flex items-center gap-2">
                     <span className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center font-serif italic text-xs">D</span>
                     <span>By {data.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Clock className="w-4 h-4" />
                     <span>{data.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Tag className="w-4 h-4" />
                     <span>{data.publishDate}</span>
                  </div>
               </div>
            </div>
         </div>

         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-24">

            {/* Sidebar - TOC (Great for AEO Site Links) */}
            <aside className="hidden lg:block lg:col-span-3 relative">
               <div className="sticky top-32 p-6 border-l border-ink/10">
                  <h3 className="font-sans text-xs font-bold text-ink uppercase tracking-widest mb-4">Contents</h3>
                  <ul className="space-y-3">
                     {data.toc.map((item, i) => (
                        <li key={i}>
                           <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-ink-muted hover:text-accent transition-colors flex items-center gap-2 group">
                              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                              {item}
                           </a>
                        </li>
                     ))}
                  </ul>
                  <div className="mt-8 pt-8 border-t border-ink/10">
                     <p className="text-xs text-ink-muted mb-4">Need this implemented?</p>
                     <Button variant="primary" className="w-full text-xs py-2">Book Strategy</Button>
                  </div>
               </div>
            </aside>

            {/* Main Content */}
            <article className="lg:col-span-9 max-w-3xl mx-auto">

               {/* AEO: Quick Answer Box (Featured Snippet Optimization) */}
               <div className="bg-accent/5 border border-accent/20 p-6 md:p-8 rounded-sm mb-12 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                     <Lightbulb className="w-12 h-12 text-accent" />
                  </div>
                  <h2 className="font-serif text-2xl text-accent mb-4 flex items-center gap-2">
                     <span className="text-sm font-sans font-bold uppercase tracking-widest bg-white/50 px-2 py-1 rounded-sm text-ink-muted">Quick Answer</span>
                     What is an Agentic Workflow?
                  </h2>
                  <div className="prose prose-lg text-ink-muted leading-relaxed">
                     <p dangerouslySetInnerHTML={{ __html: data.quickAnswer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </div>
               </div>

               <img src={data.image} alt={data.title} className="w-full aspect-video object-cover rounded-sm mb-12 shadow-xl shadow-ink/5" />

               {/* Introduction */}
               <div className="prose prose-lg text-ink-muted/90 font-serif mb-16 first-letter:text-5xl first-letter:font-bold first-letter:text-ink first-letter:float-left first-letter:mr-3">
                  <p id="introduction">
                     The era of "Prompt Engineering" is fading. We are entering the era of "Flow Engineering."
                     While a single prompt can write a poem, it cannot reliably navigate a complex enterprise database,
                     cross-reference three tables, and email a summary to a client. For that, you need agency.
                  </p>
                  <p>
                     Most teams get stuck because they treat LLMs as magic inputs. They expect one box to do everything.
                     Real production systems break tasks down. This briefing outlines the architectural shift from linear chains to circular, self-correcting agent loops.
                  </p>
               </div>

               {/* AEO: Key Takeaways (Bulleted Lists rank well) */}
               <div id="key-takeaways" className="mb-16">
                  <h3 className="font-sans text-xl font-bold text-ink mb-6 flex items-center gap-2">
                     <Layers className="w-5 h-5 text-accent" /> Key Takeaways
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {['Move from Zero-Shot to Iterative loops.', 'Separate "Planner" agents from "Executor" agents.', 'Tools are the hands of the AI; give them access.', 'Observability is critical; log every "thought" step.'].map((point, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 bg-white/40 border border-ink/5 rounded-sm">
                           <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                           <span className="text-ink text-base font-medium">{point}</span>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Real World Example */}
               <Section id="real-world-example" pattern="grid" className="bg-alt/10 rounded-sm mb-16 !py-12 !px-8 border border-ink/5" overflow={true}>
                  <div className="flex items-center gap-3 mb-6">
                     <BookOpen className="w-6 h-6 text-ink" />
                     <h3 className="font-serif text-2xl text-ink m-0">Real-World Example: The Support Triager</h3>
                  </div>
                  <p className="text-ink-muted mb-6">
                     <strong>The Problem:</strong> A SaaS company receives 500 tickets a day. Tier 1 support is overwhelmed.
                  </p>
                  <p className="text-ink-muted mb-6">
                     <strong>The Agentic Solution:</strong>
                  </p>
                  <ol className="list-decimal list-inside space-y-3 font-medium text-ink bg-white/50 p-6 rounded-sm border border-ink/5">
                     <li className="pl-2"><span className="font-bold">Observation:</span> Agent reads the ticket.</li>
                     <li className="pl-2"><span className="font-bold">Reasoning:</span> "User is asking about API keys. I need to check their plan."</li>
                     <li className="pl-2"><span className="font-bold">Action:</span> Agent calls <code>stripe_tool.get_plan(user_email)</code>.</li>
                     <li className="pl-2"><span className="font-bold">Observation:</span> "Plan is 'Free Tier'. They don't have API access."</li>
                     <li className="pl-2"><span className="font-bold">Final Answer:</span> Agent drafts a reply explaining they need to upgrade.</li>
                  </ol>
               </Section>

               {/* AEO: Pros & Cons (Comparison Tables rank well) */}
               <div id="pros-&-cons" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                  <div className="bg-white/40 border-t-4 border-green-500 p-6 shadow-sm">
                     <h4 className="font-bold text-ink uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Check className="w-4 h-4" /> Pros
                     </h4>
                     <ul className="space-y-3">
                        <li className="text-sm text-ink-muted">High reliability on complex tasks</li>
                        <li className="text-sm text-ink-muted">Self-correction capabilities</li>
                        <li className="text-sm text-ink-muted">Can use external tools (Search, API)</li>
                     </ul>
                  </div>
                  <div className="bg-white/40 border-t-4 border-red-400 p-6 shadow-sm">
                     <h4 className="font-bold text-ink uppercase tracking-widest mb-4 flex items-center gap-2">
                        <X className="w-4 h-4" /> Cons
                     </h4>
                     <ul className="space-y-3">
                        <li className="text-sm text-ink-muted">Higher latency (slower response)</li>
                        <li className="text-sm text-ink-muted">Increased token cost (more steps)</li>
                        <li className="text-sm text-ink-muted">Harder to debug than linear chains</li>
                     </ul>
                  </div>
               </div>

               {/* Alternatives */}
               <div id="alternatives" className="mb-16">
                  <h3 className="font-serif text-2xl text-ink mb-6">Alternatives to Full Agents</h3>
                  <p className="text-ink-muted mb-4">Not every task needs a swarm. Consider these lighter architectures:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                     <div className="p-4 border border-ink/10 text-center hover:border-accent transition-colors">
                        <span className="block font-bold text-ink mb-2">RAG</span>
                        <span className="text-xs text-ink-muted">Just retrieval, no multi-step reasoning.</span>
                     </div>
                     <div className="p-4 border border-ink/10 text-center hover:border-accent transition-colors">
                        <span className="block font-bold text-ink mb-2">Chain of Thought</span>
                        <span className="text-xs text-ink-muted">Linear reasoning in a single prompt.</span>
                     </div>
                     <div className="p-4 border border-ink/10 text-center hover:border-accent transition-colors">
                        <span className="block font-bold text-ink mb-2">Router</span>
                        <span className="text-xs text-ink-muted">Classify input and send to specific prompt.</span>
                     </div>
                  </div>
               </div>

               {/* Troubleshooting Guide */}
               <div id="troubleshooting" className="bg-orange-50/50 border border-orange-200/50 p-8 rounded-sm mb-16">
                  <h3 className="font-sans text-lg font-bold text-orange-900 mb-6 flex items-center gap-2">
                     <AlertTriangle className="w-5 h-5" /> Troubleshooting Guide
                  </h3>
                  <div className="space-y-6">
                     <div>
                        <h4 className="font-bold text-ink text-sm mb-1">Agent is looping indefinitely</h4>
                        <p className="text-sm text-ink-muted">Ensure you have a <code>max_iterations</code> limit set (e.g., 5 loops) and a system prompt that forces a "Final Answer" if stuck.</p>
                     </div>
                     <div>
                        <h4 className="font-bold text-ink text-sm mb-1">Tools are being hallucinated</h4>
                        <p className="text-sm text-ink-muted">Provide the tool definitions in strict JSON or TypeScript interface format within the system prompt. Use low temperature (0.0 - 0.2).</p>
                     </div>
                  </div>
               </div>

               {/* FAQ (Schema Optimized) */}
               <div id="faq" className="mb-16">
                  <h3 className="font-serif text-3xl text-ink mb-8 text-center">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                     {data.faqs.map((faq, i) => (
                        <div key={i} className="border-b border-ink/10 pb-4">
                           <h4 className="font-bold text-ink text-lg mb-2">{faq.question}</h4>
                           <p className="text-ink-muted text-base leading-relaxed">{faq.answer}</p>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Further Reading */}
               <div id="further-reading" className="bg-ink text-base p-8 rounded-sm">
                  <h3 className="font-serif text-xl text-white mb-4">Further Resources</h3>
                  <ul className="space-y-2 text-white/70">
                     <li className="hover:text-accent cursor-pointer transition-colors">→ Read: The ReAct Paper (Reasoning + Acting)</li>
                     <li className="hover:text-accent cursor-pointer transition-colors">→ GitHub: LangChain Agent Templates</li>
                     <li className="hover:text-accent cursor-pointer transition-colors">→ DaVeenci Codex: Prompt Patterns (Briefing #039)</li>
                  </ul>
               </div>

            </article>
         </div>

         <Footer />
      </div>
   );
};

export default BriefingDetailPage;
