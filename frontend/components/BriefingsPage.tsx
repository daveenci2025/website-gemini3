
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Section, ScrollReveal, BriefingCard, VitruvianBackground } from './Shared';
import type { Page } from './types';
import { Filter } from 'lucide-react';
import AgenticWorkflowImage from '../images/001 - What is an Agentic Workflow.jpg';
import SyntheticDataImage from '../images/002 - Synthetic Data Pipelines.jpg';
import ZeroTouchCRMImage from '../images/003 - Zero-Touch CRM.jpg';

interface BriefingsPageProps {
  onNavigate: (page: Page, hash?: string, id?: string) => void;
}

export const allBriefings = [
  {
    id: "agentic-workflow",
    title: "The Agentic Workflow",
    description: "Why chat interfaces are a dead end, and how to architect autonomous agent swarms that do the work for you. We explore the 4-stage reasoning pipeline used by top firms.",
    image: AgenticWorkflowImage,
    issueNo: "042",
    category: "Architecture",
    featured: true,
  },
  {
    id: "synthetic-data",
    title: "Synthetic Data Pipelines",
    description: "Running out of human data? Here is the playbook for generating high-fidelity synthetic datasets to fine-tune your models without privacy risks.",
    image: SyntheticDataImage,
    issueNo: "043",
    category: "Engineering",
    featured: true,
  },
  {
    id: "zero-touch-crm",
    title: "The Zero-Touch CRM",
    description: "A technical deep dive into self-healing customer databases that enrich themselves without sales rep intervention.",
    image: ZeroTouchCRMImage,
    issueNo: "044",
    category: "Operations",
    featured: false,
  },
  {
    id: "rag-vs-long-context",
    title: "RAG vs Long Context",
    description: "When to use Retrieval Augmented Generation vs Gemini's 2M token context window. A cost and latency analysis.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    issueNo: "041",
    category: "Engineering",
    featured: false,
  },
  {
    id: "local-llm-stack",
    title: "Local LLM Stack 2025",
    description: "Running Llama 4 locally for privacy-focused legal analysis. Hardware specs and inference engines reviewed.",
    image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&q=80&w=800",
    issueNo: "040",
    category: "Architecture",
    featured: false,
  },
  {
    id: "prompt-patterns",
    title: "Prompt Engineering Patterns",
    description: "Moving beyond 'Chain of Thought'. Implementing 'Tree of Thoughts' and recursive criticism for complex reasoning tasks.",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=800",
    issueNo: "039",
    category: "Strategy",
    featured: false,
  },
  {
    id: "ai-compliance",
    title: "AI Legal Compliance",
    description: "Navigating the EU AI Act while shipping fast. Practical checklists for automated decision-making systems.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
    issueNo: "038",
    category: "Strategy",
    featured: false,
  },
  {
    id: "saas-pricing",
    title: "The Death of SaaS Pricing",
    description: "Why 'per seat' pricing is dying and how to transition your AI product to 'outcome-based' billing models.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
    issueNo: "037",
    category: "Strategy",
    featured: false,
  },
  {
    id: "video-prod",
    title: "Automated Video Prod",
    description: "Using Veo and text-to-speech pipelines to generate personalized sales assets at scale.",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=800",
    issueNo: "036",
    category: "Operations",
    featured: false,
  }
];

const categories = ["All", "Architecture", "Engineering", "Operations", "Strategy"];

const BriefingsPage: React.FC<BriefingsPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredBriefings = allBriefings.filter(
    (b) => !b.featured && (selectedCategory === "All" || b.category === selectedCategory)
  );

  const featuredBriefings = allBriefings.filter((b) => b.featured);

  return (
    <div className="flex flex-col w-full min-h-screen bg-base">
      <Header onNavigate={onNavigate} currentPage="briefings" />

      {/* Hero Section */}
      <Section className="pt-40 pb-12 md:pt-48 md:pb-20" pattern="nodes">
        <VitruvianBackground className="opacity-[0.08]" />
        <div className="text-center max-w-4xl mx-auto mb-16">
          <ScrollReveal>
            <span className="font-script text-2xl text-accent mb-2 block">The DaVeenci Codex</span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-ink mb-6">Intelligence Briefings</h1>
            <p className="text-xl text-ink-muted max-w-2xl mx-auto leading-relaxed">
              Weekly architectural blueprints, technical deep dives, and strategic plays for the AI-native enterprise.
            </p>
          </ScrollReveal>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {featuredBriefings.map((briefing, idx) => (
            <ScrollReveal key={briefing.issueNo} delay={idx * 150} className="h-full">
              <BriefingCard
                {...briefing}
                className="h-full md:aspect-[16/9] shadow-lg border-accent/20"
                onClick={() => onNavigate('briefing-detail', undefined, briefing.id)}
              />
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* Archive Section with Filters */}
      <Section className="py-12 bg-white/30 backdrop-blur-sm border-t border-ink/5" id="archive">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h2 className="font-serif text-3xl text-ink">Latest Intelligence</h2>

          <div className="flex flex-wrap justify-center gap-2 bg-white/50 p-1.5 rounded-full border border-ink/10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat
                  ? 'bg-accent text-white shadow-md'
                  : 'text-ink-muted hover:text-ink hover:bg-white/80'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBriefings.map((briefing, idx) => (
            <ScrollReveal key={briefing.issueNo} delay={idx * 50}>
              <BriefingCard
                {...briefing}
                onClick={() => onNavigate('briefing-detail', undefined, briefing.id)}
              />
            </ScrollReveal>
          ))}
        </div>

        {filteredBriefings.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <Filter className="w-12 h-12 mx-auto mb-4 text-ink-muted" />
            <p className="font-serif text-xl">No briefings found in this category.</p>
          </div>
        )}
      </Section>

      <Footer />
    </div>
  );
};

export default BriefingsPage;
