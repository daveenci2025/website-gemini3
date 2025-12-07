import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Section, ScrollReveal, VitruvianBackground, Button } from './Shared';
import type { Page } from './types';
import { Clock, Tag, ChevronRight, Check, X, AlertTriangle, Lightbulb, BookOpen, Layers } from 'lucide-react';
import AgenticWorkflowImage from '../images/001 - What is an Agentic Workflow.png';
import SyntheticDataImage from '../images/002 - Synthetic Data Pipelines.png';
import ZeroTouchCRMImage from '../images/003 - Zero-Touch CRM.png';

interface BriefingDetailPageProps {
   onNavigate: (page: Page, hash?: string, id?: string) => void;
   id?: string | null;
}

interface BriefingSection {
   id: string;
   title: string;
   content: React.ReactNode;
}

interface BriefingData {
   id: string;
   title: string;
   metaDescription: string;
   publishDate: string;
   author: string;
   category: string;
   readTime: string;
   issueNo: string;
   image: string;
   quickAnswerTitle: string;
   quickAnswer: string;
   toc: string[];
   sections: BriefingSection[];
   faqs: { question: string; answer: string }[];
}

// Briefing Data Dictionary
const briefings: Record<string, BriefingData> = {
   "agentic-workflow": {
      id: "agentic-workflow",
      title: "The Agentic Workflow: Architecting Swarms",
      metaDescription: "A technical guide to moving beyond chat interfaces. Learn how to architect autonomous agent swarms, implement the 4-stage reasoning pipeline, and deploy self-correcting AI workers.",
      publishDate: "2025-10-14",
      author: "Leonardo & Team",
      category: "Architecture",
      readTime: "15 min read",
      issueNo: "042",
      image: AgenticWorkflowImage,
      quickAnswerTitle: "What is an Agentic Workflow?",
      quickAnswer: "An **Agentic Workflow** is an iterative system design where Large Language Models (LLMs) function as autonomous engines capable of defining their own control flow. Unlike traditional linear automation (A → B → C), an agentic workflow utilizes a dynamic loop of **Reasoning, Action, Observation, and Reflection**.<br/><br/>This architecture allows the AI to:<br/>1. **Decompose** vague user goals into actionable sub-tasks.<br/>2. **Utilize Tools** (APIs, web search, code interpreters) to gather data.<br/>3. **Self-Correct** by analyzing the output of its tools and adjusting the plan in real-time.<br/><br/>Research suggests that wrapping an LLM in an agentic loop can improve performance on complex reasoning benchmarks (like HumanEval) by 40–60% compared to zero-shot prompting.",
      toc: ["The Shift", "Anatomy", "Design Patterns", "Swarms", "Real-World", "Tech Stack", "Challenges", "FAQ"],
      sections: [
         {
            id: "the-shift",
            title: "The Shift: From Prompt Engineering to Flow Engineering",
            content: (
               <>
                  <p>The era of "Prompt Engineering"—optimizing a single text input to get a perfect output—is rapidly fading. We are entering the era of <strong>Flow Engineering</strong>.</p>
                  <p>In a traditional "Zero-Shot" interaction, the LLM is treated as a magic black box: you put a question in, and you hope for a correct answer. However, LLMs are probabilistic token predictors, not logic engines. When asked to perform complex, multi-step tasks (e.g., "Research this company, crawl their website, and write a personalized sales email"), a single prompt often fails due to loss of context or hallucination.</p>
                  <p><strong>Agentic Workflows replace the "Black Box" with a "System."</strong></p>
                  <p>Instead of asking for the final output immediately, the system asks the LLM to act as a router and planner. The developer does not code the path; the developer codes the guardrails and tools, allowing the LLM to navigate the path itself.</p>
                  <div className="my-8 overflow-x-auto">
                     <table className="w-full text-sm text-left border-collapse">
                        <thead>
                           <tr className="border-b border-ink/10">
                              <th className="py-2 font-bold text-ink">Feature</th>
                              <th className="py-2 font-bold text-ink">Linear Chain (Zero-Shot)</th>
                              <th className="py-2 font-bold text-ink">Agentic Workflow</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr className="border-b border-ink/5">
                              <td className="py-2 text-ink-muted">Control Flow</td>
                              <td className="py-2 text-ink-muted">Hard-coded (A → B → C)</td>
                              <td className="py-2 text-ink-muted">Dynamic (LLM decides next step)</td>
                           </tr>
                           <tr className="border-b border-ink/5">
                              <td className="py-2 text-ink-muted">Error Handling</td>
                              <td className="py-2 text-ink-muted">Fails if one step breaks</td>
                              <td className="py-2 text-ink-muted">Retries or changes strategy</td>
                           </tr>
                           <tr className="border-b border-ink/5">
                              <td className="py-2 text-ink-muted">Complexity</td>
                              <td className="py-2 text-ink-muted">Low (Summarization, Chat)</td>
                              <td className="py-2 text-ink-muted">High (Coding, Research, Data Analysis)</td>
                           </tr>
                           <tr>
                              <td className="py-2 text-ink-muted">Latency</td>
                              <td className="py-2 text-ink-muted">Low (Single inference)</td>
                              <td className="py-2 text-ink-muted">High (Multiple loops/inferences)</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </>
            )
         },
         {
            id: "anatomy",
            title: "The Anatomy of an AI Agent",
            content: (
               <>
                  <p>To architect an agentic workflow, you must understand the four pillars of agent architecture (often referenced in the ReAct papers and Andrew Ng’s lectures):</p>
                  <ul className="list-none space-y-4 mt-4">
                     <li>
                        <strong className="text-ink block mb-1">1. The Brain (The Profile)</strong>
                        This is the LLM itself (e.g., GPT-4o, Gemini 1.5 Pro, Claude 3.5 Sonnet). The "Profile" defines the persona (e.g., "You are a Senior Python Engineer"). It provides the reasoning capability to understand the user's intent.
                     </li>
                     <li>
                        <strong className="text-ink block mb-1">2. Memory</strong>
                        Agents need context to iterate.
                        <ul className="list-disc list-inside pl-4 mt-2 text-ink-muted/80">
                           <li><strong>Short-term Memory:</strong> The chat history and the logs of previous steps taken during the current task.</li>
                           <li><strong>Long-term Memory:</strong> Vector databases (RAG) that allow the agent to recall information from days or weeks ago.</li>
                        </ul>
                     </li>
                     <li>
                        <strong className="text-ink block mb-1">3. Planning</strong>
                        Before acting, the agent must plan.
                        <ul className="list-disc list-inside pl-4 mt-2 text-ink-muted/80">
                           <li><strong>Decomposition:</strong> Breaking a goal like "Build a website" into "Write HTML," "Write CSS," and "Debug."</li>
                           <li><strong>Reflection:</strong> Reviewing past actions. "Did my last search query yield good results? No? I should try a different keyword."</li>
                        </ul>
                     </li>
                     <li>
                        <strong className="text-ink block mb-1">4. Tools (Action Space)</strong>
                        This is the most critical differentiator. Tools are executable functions the LLM can call.
                        <ul className="list-disc list-inside pl-4 mt-2 text-ink-muted/80">
                           <li><strong>Standard Tools:</strong> Web Search (Google), Calculator, Code Interpreter.</li>
                           <li><strong>Custom Tools:</strong> <code>get_customer_data(id)</code>, <code>send_slack_message(channel, msg)</code>.</li>
                        </ul>
                     </li>
                  </ul>
               </>
            )
         },
         {
            id: "design-patterns",
            title: "Design Patterns: Architecting the Loop",
            content: (
               <>
                  <p>You do not need to invent an agent from scratch. There are established patterns:</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                     <div className="p-4 bg-white/40 border border-ink/10 rounded-sm">
                        <h4 className="font-bold text-ink mb-2">The ReAct Pattern</h4>
                        <p className="text-sm">The standard baseline. The model outputs a thought, then an action, then observes the output.</p>
                     </div>
                     <div className="p-4 bg-white/40 border border-ink/10 rounded-sm">
                        <h4 className="font-bold text-ink mb-2">The Reflection Pattern</h4>
                        <p className="text-sm">A "Critic" agent reviews the draft for errors, improving it before sending it to the user. Great for coding.</p>
                     </div>
                     <div className="p-4 bg-white/40 border border-ink/10 rounded-sm">
                        <h4 className="font-bold text-ink mb-2">The Router Pattern</h4>
                        <p className="text-sm">The LLM acts as a traffic controller, analyzing input and routing it to a specialized sub-agent.</p>
                     </div>
                  </div>
               </>
            )
         },
         {
            id: "swarms",
            title: "Swarm Intelligence: Multi-Agent Orchestration",
            content: (
               <>
                  <p>For enterprise-grade tasks, a single agent is often insufficient. This leads to Multi-Agent Systems (Swarms), where distinct agents collaborate.</p>
                  <h4 className="font-bold text-ink mt-4 mb-2">Key Orchestration Methods:</h4>
                  <ul className="list-disc list-inside space-y-2">
                     <li><strong>Hierarchical (The Boss & Workers):</strong> A "Supervisor" agent breaks down the task and assigns it to "Worker" agents.</li>
                     <li><strong>Sequential Handoffs:</strong> Agent A completes a task and passes the entire context to Agent B.</li>
                     <li><strong>Joint Chat (Flat Hierarchy):</strong> Agents participate in a shared message thread, chiming in when their specific expertise is required.</li>
                  </ul>
                  <div className="mt-4 p-4 bg-accent/5 border-l-2 border-accent">
                     <p className="text-sm italic"><strong>Why Swarms?</strong> Specialization reduces hallucination. A prompt tuned for writing code is different from a prompt tuned for testing code. Separating them yields higher accuracy.</p>
                  </div>
               </>
            )
         },
         {
            id: "real-world",
            title: "Real-World Architecture: The Autonomous Support Triager",
            content: (
               <div className="bg-alt/10 p-6 rounded-sm border border-ink/5">
                  <p className="mb-4"><strong>The Problem:</strong> A SaaS company receives 500 tickets/day. Tier 1 support is drowning in repetitive queries about API limits.</p>
                  <p className="mb-4"><strong>The Workflow:</strong></p>
                  <ol className="list-decimal list-inside space-y-3 font-medium text-ink bg-white/50 p-6 rounded-sm border border-ink/5">
                     <li className="pl-2"><span className="font-bold">Trigger:</span> New Ticket arrives via Webhook.</li>
                     <li className="pl-2"><span className="font-bold">Agent 1 (Triage):</span> Classifies ticket urgency and category. Result: "Account Access."</li>
                     <li className="pl-2"><span className="font-bold">Agent 2 (Investigator):</span> Calls <code>stripe_api.get_customer_status(email)</code>. Observation: "Basic Plan".</li>
                     <li className="pl-2"><span className="font-bold">Agent 3 (Drafter):</span> Writes email explaining limitation and offering upgrade link.</li>
                     <li className="pl-2"><span className="font-bold">Supervisor:</span> Checks tone and link accuracy.</li>
                     <li className="pl-2"><span className="font-bold">Action:</span> Draft saved to Zendesk or sent automatically.</li>
                  </ol>
                  <p className="mt-4 text-sm text-green-700 font-bold">Result: 60% of tickets resolved without human intervention.</p>
               </div>
            )
         },
         {
            id: "tech-stack",
            title: "The Tech Stack: Building Blocks",
            content: (
               <>
                  <p>To build this, you need specific libraries designed for graph-based logic.</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                     <li className="p-3 border border-ink/10 hover:border-accent transition-colors">
                        <strong className="block text-accent">LangChain / LangGraph</strong>
                        <span className="text-xs">The industry standard for stateful, multi-actor apps. Allows explicit cyclical flows.</span>
                     </li>
                     <li className="p-3 border border-ink/10 hover:border-accent transition-colors">
                        <strong className="block text-accent">AutoGen (Microsoft)</strong>
                        <span className="text-xs">Excellent for conversational swarms where agents "talk" to each other.</span>
                     </li>
                     <li className="p-3 border border-ink/10 hover:border-accent transition-colors">
                        <strong className="block text-accent">CrewAI</strong>
                        <span className="text-xs">High-level framework for orchestrating role-based agents. Accessible and fast.</span>
                     </li>
                     <li className="p-3 border border-ink/10 hover:border-accent transition-colors">
                        <strong className="block text-accent">DSPy</strong>
                        <span className="text-xs">Focuses on optimizing prompts programmatically within the pipeline.</span>
                     </li>
                  </ul>
               </>
            )
         },
         {
            id: "challenges",
            title: "Challenges & Risk Mitigation",
            content: (
               <div className="space-y-6">
                  <div>
                     <h4 className="font-bold text-ink text-sm mb-1 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-orange-500" /> The "Infinite Loop" Trap</h4>
                     <p className="text-sm"><strong>Risk:</strong> Agent keeps retrying forever. <br /><strong>Solution:</strong> Implement Maximum Iterations (e.g., max_steps=5).</p>
                  </div>
                  <div>
                     <h4 className="font-bold text-ink text-sm mb-1 flex items-center gap-2"><Clock className="w-4 h-4 text-orange-500" /> Latency & Cost</h4>
                     <p className="text-sm"><strong>Risk:</strong> 10 LLM calls for one question is slow and expensive. <br /><strong>Solution:</strong> Use smaller models (Llama-3-8b) for reasoning, and smart models (GPT-4o) for synthesis.</p>
                  </div>
                  <div>
                     <h4 className="font-bold text-ink text-sm mb-1 flex items-center gap-2"><X className="w-4 h-4 text-orange-500" /> Tool Hallucination</h4>
                     <p className="text-sm"><strong>Risk:</strong> Agent invents tool parameters. <br /><strong>Solution:</strong> Provide robust Type Definitions (JSON Schema) for strict validation.</p>
                  </div>
               </div>
            )
         }
      ],
      faqs: [
         { question: "What is the difference between a Chain and an Agent?", answer: "A Chain is a hard-coded sequence (A → B → C). It is deterministic. An Agent uses an LLM as a reasoning engine to decide which steps to take and in what order. Chains are for known processes; Agents are for ambiguous goals." },
         { question: "Which model is best for agentic workflows?", answer: "Currently, Claude 3.5 Sonnet and GPT-4o are the leaders for coding and agentic reasoning due to their ability to follow complex instructions and adhere to tool schemas. For local deployment, Llama 3.1 (70B) is the top open-source contender." },
         { question: "How do I debug an agent?", answer: "Debugging agents is difficult because they are non-deterministic. You must implement 'Observability' using tools like LangSmith or Arize Phoenix. These tools trace the execution path, showing you the exact 'Thought' and 'Observation' at every step of the loop." },
         { question: "Are agents ready for production?", answer: "Yes, but with 'Human-in-the-loop' guardrails. Autonomous agents are widely used for data analysis, coding assistance, and internal research. Customer-facing agents usually require a final approval step before sending messages." }
      ]
   },
   "synthetic-data": {
      id: "synthetic-data",
      title: "Synthetic Data Pipelines: The Infinite Dataset",
      metaDescription: "Running out of human data? Here is the playbook for generating high-fidelity synthetic datasets to fine-tune your models without privacy risks.",
      publishDate: "2025-10-21",
      author: "Leonardo & Team",
      category: "Engineering",
      readTime: "12 min read",
      issueNo: "043",
      image: SyntheticDataImage,
      quickAnswerTitle: "What is Synthetic Data?",
      quickAnswer: "**Synthetic Data** is information artificially generated by algorithms or AI models that mimics the statistical properties and patterns of real-world data without containing any actual user information.<br/><br/><strong>Why is it used?</strong><br/>It solves three primary bottlenecks in AI development:<br/>1. <strong>Privacy:</strong> Work with 'medical-grade' data without violating GDPR/HIPAA.<br/>2. <strong>Scarcity:</strong> Fill gaps where real data is expensive or rare.<br/>3. <strong>Balance:</strong> Fix biased datasets by upsampling underrepresented groups.",
      toc: ["Context", "Techniques", "Architecture", "Real-World", "Dangers", "Tools", "FAQ"],
      sections: [
         {
            id: "context",
            title: "The Context: Hitting the Data Wall",
            content: (
               <>
                  <p>By late 2025, the AI industry faced a critical realization: we are running out of high-quality human text. The internet has been crawled. To make models smarter, we cannot just add more data; we need better data.</p>
                  <h4 className="font-bold text-ink mt-4 mb-2">The "Cold Start" Problem</h4>
                  <p>Most teams get stuck because they want to fine-tune a specialized model (e.g., a "Legal Contract Reviewer"), but they cannot send their clients' actual confidential contracts to OpenAI or train on them locally due to privacy risks.</p>
                  <h4 className="font-bold text-ink mt-4 mb-2">The Synthetic Solution</h4>
                  <p>Instead of waiting years to collect 10,000 real contracts, teams now build <strong>Synthetic Data Pipelines</strong>. They take 5 "seed" examples, de-identify them, and use a massive reasoning model (like GPT-4o) to generate 10,000 variations. This creates an "Infinite Dataset" that is mathematically similar to reality but legally distinct.</p>
                  <div className="my-8 overflow-x-auto">
                     <table className="w-full text-sm text-left border-collapse">
                        <thead>
                           <tr className="border-b border-ink/10">
                              <th className="py-2 font-bold text-ink">Feature</th>
                              <th className="py-2 font-bold text-ink">Real World Data</th>
                              <th className="py-2 font-bold text-ink">Synthetic Data</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr className="border-b border-ink/5">
                              <td className="py-2 text-ink-muted">Cost</td>
                              <td className="py-2 text-ink-muted">High (Collection + Annotation)</td>
                              <td className="py-2 text-ink-muted">Low (Compute cost)</td>
                           </tr>
                           <tr className="border-b border-ink/5">
                              <td className="py-2 text-ink-muted">Privacy</td>
                              <td className="py-2 text-ink-muted">High Risk (PII leaks)</td>
                              <td className="py-2 text-ink-muted">Zero Risk (Math-generated)</td>
                           </tr>
                           <tr className="border-b border-ink/5">
                              <td className="py-2 text-ink-muted">Speed</td>
                              <td className="py-2 text-ink-muted">Months/Years</td>
                              <td className="py-2 text-ink-muted">Hours/Days</td>
                           </tr>
                           <tr>
                              <td className="py-2 text-ink-muted">Quality</td>
                              <td className="py-2 text-ink-muted">"Noisy" (Humans make typos)</td>
                              <td className="py-2 text-ink-muted">"Clean" (Structured output)</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </>
            )
         },
         {
            id: "techniques",
            title: "Techniques: How Data is Synthesized",
            content: (
               <>
                  <p>Not all synthetic data is created equal. Depending on the modality (Text, Tabular, Images), different architectures are used.</p>
                  <div className="space-y-6 mt-6">
                     <div className="p-4 bg-white/40 border border-ink/10 rounded-sm">
                        <h4 className="font-bold text-ink mb-2">1. LLM-for-LLM (Self-Instruct)</h4>
                        <p className="text-sm mb-2">Currently the dominant method for text. You use a "Teacher" model (e.g., GPT-4o) to generate training data for a "Student" model (e.g., Llama-3-8B).</p>
                        <p className="text-xs text-ink-muted italic">Method: "Generate 50 complex customer complaints regarding shipping delays, varying the tone from polite to furious."</p>
                     </div>
                     <div className="p-4 bg-white/40 border border-ink/10 rounded-sm">
                        <h4 className="font-bold text-ink mb-2">2. Variational Autoencoders (VAEs) & GANs</h4>
                        <p className="text-sm">Used primarily for tabular data (Excel sheets) and images. The model learns the probability distribution of a dataset and samples new rows from that distribution.</p>
                     </div>
                     <div className="p-4 bg-white/40 border border-ink/10 rounded-sm">
                        <h4 className="font-bold text-ink mb-2">3. Rules-Based / Procedural</h4>
                        <p className="text-sm">Used for coding and math. You write a script that generates random logic puzzles or Python functions with known correct answers. Guarantees 100% accuracy.</p>
                     </div>
                  </div>
               </>
            )
         },
         {
            id: "architecture",
            title: "Architecture: Building the Pipeline",
            content: (
               <>
                  <p>A robust Synthetic Data Pipeline acts as a refinery. You don't just "ask ChatGPT." You build a flow.</p>
                  <ul className="list-none space-y-4 mt-4">
                     <li>
                        <strong className="text-ink block mb-1">Phase 1: The Seed (The DNA)</strong>
                        You curate a small "Golden Set" of real data (10–50 examples). This defines the style, format, and complexity you want.
                     </li>
                     <li>
                        <strong className="text-ink block mb-1">Phase 2: The Expansion (The Generator)</strong>
                        An LLM iterates through the seed data and generates variations. Technique: "Evol-Instruct" (WizardLM method). The LLM is asked to make the data more complex, more rare, or more detailed in each step.
                     </li>
                     <li>
                        <strong className="text-ink block mb-1">Phase 3: The Filter (The Judge)</strong>
                        This is the most critical step. Synthetic generators hallucinate. You need a second agent (The Critic) to score the generated data.
                        <ul className="list-disc list-inside pl-4 mt-2 text-xs text-ink-muted">
                           <li>"Does this generated SQL query actually run? If not, discard."</li>
                           <li>"Is the sentiment of this text actually negative? If not, discard."</li>
                        </ul>
                     </li>
                     <li>
                        <strong className="text-ink block mb-1">Phase 4: Formatting</strong>
                        The surviving data is formatted into JSONL (JSON Lines) for fine-tuning frameworks like Axolotl or Unsloth.
                     </li>
                  </ul>
               </>
            )
         },
         {
            id: "real-world",
            title: "Real-World Example: The HIPAA-Compliant Doctor",
            content: (
               <div className="bg-alt/10 p-6 rounded-sm border border-ink/5">
                  <p className="mb-4"><strong>The Problem:</strong> A HealthTech startup wants to build a chatbot that helps triage patients in the ER. They have zero data because sharing patient logs is illegal.</p>
                  <p className="mb-4"><strong>The Synthetic Pipeline Solution:</strong></p>
                  <ul className="list-disc list-inside space-y-2 font-medium text-ink bg-white/50 p-6 rounded-sm border border-ink/5">
                     <li><span className="font-bold">Seed:</span> Doctors write 20 fake but realistic patient dialogues.</li>
                     <li><span className="font-bold">Generation:</span> Pipeline generates 100,000 unique patient encounters using specific medical variables.</li>
                     <li><span className="font-bold">Validation:</span> An automated "Doctor Agent" reviews the synthetic diagnosis to ensure it follows medical guidelines.</li>
                     <li><span className="font-bold">Training:</span> A local Llama-3 model is fine-tuned on this synthetic data.</li>
                  </ul>
                  <p className="mt-4 text-sm text-green-700 font-bold">Result: 90% accuracy on triage benchmarks without ever seeing a real patient's private data.</p>
               </div>
            )
         },
         {
            id: "dangers",
            title: "The Dangers: Model Collapse",
            content: (
               <div className="bg-orange-50/50 border border-orange-200/50 p-6 rounded-sm">
                  <h4 className="font-bold text-orange-900 mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> What is it?</h4>
                  <p className="text-sm text-ink-muted mb-4">If you train a model entirely on synthetic data generated by another AI, the model eventually loses touch with reality. It begins to amplify the biases and hallucinations of the creator model. The data becomes "inbred."</p>
                  <h4 className="font-bold text-orange-900 mb-2">How to avoid it?</h4>
                  <ul className="list-disc list-inside text-sm text-ink-muted space-y-1">
                     <li><strong>The Mixer Strategy:</strong> Always mix synthetic data with at least 10-20% high-quality human data.</li>
                     <li><strong>Perplexity Filtering:</strong> Discard generated text that has low statistical probability (gibberish) or excessively high probability (repetitive clichés).</li>
                  </ul>
               </div>
            )
         },
         {
            id: "tools",
            title: "Tools & Frameworks",
            content: (
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 border border-ink/10 hover:border-accent transition-colors">
                     <strong className="block text-accent">Gretel.ai</strong>
                     <span className="text-xs">The enterprise standard for tabular and text synthetic data with privacy guarantees.</span>
                  </div>
                  <div className="p-3 border border-ink/10 hover:border-accent transition-colors">
                     <strong className="block text-accent">Argilla / Distilabel</strong>
                     <span className="text-xs">Open-source tools specifically designed for "Human feedback" and building synthetic datasets.</span>
                  </div>
                  <div className="p-3 border border-ink/10 hover:border-accent transition-colors">
                     <strong className="block text-accent">LangSmith</strong>
                     <span className="text-xs">Essential for tracing the generation loops and testing the quality of outputs.</span>
                  </div>
                  <div className="p-3 border border-ink/10 hover:border-accent transition-colors">
                     <strong className="block text-accent">SDV</strong>
                     <span className="text-xs">Synthetic Data Vault. A Python library for generating tabular data.</span>
                  </div>
               </div>
            )
         }
      ],
      faqs: [
         { question: "Is synthetic data as good as real data?", answer: "For 'reasoning' tasks (coding, math, logic), it is often better than real data because it is cleaner and free of human noise. For 'nuance' tasks (creative writing, cultural slang), real human data is still superior." },
         { question: "Does synthetic data hallucinate?", answer: "Yes. The generator can invent facts. This is why the Validation/Filtering step in the pipeline is mandatory. You must programmatically verify the data before training on it." },
         { question: "Can I copyright a model trained on synthetic data?", answer: "This is a gray area in 2025. While you cannot copyright the synthetic data itself, the weights of the model you train may be proprietary depending on your jurisdiction." },
         { question: "How much synthetic data do I need?", answer: "For fine-tuning a specific behavior (e.g., 'Speak like a pirate'), you may only need 500–1,000 synthetic examples. For teaching a model a new skill, you need tens of thousands." }
      ]
   },
   "zero-touch-crm": {
      id: "zero-touch-crm",
      title: "The Zero-Touch CRM: Self-Healing Databases",
      metaDescription: "A technical deep dive into self-healing customer databases that enrich themselves without sales rep intervention.",
      publishDate: "2025-10-28",
      author: "Leonardo & Team",
      category: "Operations",
      readTime: "10 min read",
      issueNo: "044",
      image: ZeroTouchCRMImage,
      quickAnswerTitle: "What is a Zero-Touch CRM?",
      quickAnswer: "A **Zero-Touch CRM** is a data infrastructure that uses autonomous AI agents to maintain a System of Record without human intervention. Instead of relying on sales representatives to manually type notes, the system utilizes a \"Sensor Mesh\" (integrations with Email, Slack, Zoom, LinkedIn) to passively observe interactions.<br/><br/>It uses Large Language Models (LLMs) to extract entities (people, roles, budget), deduplicate records, and sync updates to platforms like Salesforce or HubSpot. It transforms the CRM from a passive database of \"what happened\" into a real-time engine of \"what is happening.\"",
      toc: ["Crisis", "Architecture", "Real-World", "Tech Stack", "Privacy", "Pros & Cons", "Implementation", "FAQ"],
      sections: [
         {
            id: "crisis",
            title: "The Crisis: The Entropy of Sales Data",
            content: (
               <>
                  <h4 className="font-bold text-ink mb-2">The "System of Garbage"</h4>
                  <p className="mb-4">By 2025, the industry standard metric for B2B data decay is roughly 30% per year.</p>
                  <ul className="list-disc list-inside space-y-1 mb-4 text-ink-muted">
                     <li>People change jobs (every 2.5 years on average).</li>
                     <li>Companies merge or rebrand.</li>
                     <li>Phone numbers change.</li>
                  </ul>
                  <p className="mb-6">In the traditional model, the CRM relies on the Sales Representative to update this information. However, sales reps are incentivized to close deals, not do data entry. Consequently, the CRM becomes a graveyard of outdated info.</p>

                  <h4 className="font-bold text-ink mb-2">The Paradigm Shift</h4>
                  <p>The Zero-Touch model operates on a simple premise: <strong>Data entry is a bug, not a feature.</strong> If a piece of information exists digitally (in an email signature, a LinkedIn update, or a Zoom transcript), the human should never have to re-type it.</p>
               </>
            )
         },
         {
            id: "architecture",
            title: "Architecture: How Self-Healing Works",
            content: (
               <>
                  <p className="mb-6">A self-healing database is not a single tool; it is a loop consisting of four distinct phases.</p>
                  <div className="space-y-6">
                     <div className="p-4 bg-white/40 border border-ink/10 rounded-sm">
                        <h4 className="font-bold text-ink mb-1">1. The Sensor Mesh (Ingest)</h4>
                        <p className="text-sm">The system needs "ears." It connects to unstructured data streams: Gmail/Outlook, Slack/Teams, Zoom/Meet, and public signals like LinkedIn APIs.</p>
                     </div>
                     <div className="p-4 bg-white/40 border border-ink/10 rounded-sm">
                        <h4 className="font-bold text-ink mb-1">2. The Extraction Engine (The Brain)</h4>
                        <p className="text-sm mb-2">Unstructured text is passed through an LLM for Named Entity Recognition (NER).</p>
                        <div className="bg-ink/5 p-2 rounded text-xs font-mono text-ink-muted">
                           Input: "Leonardo, VP of Eng @ TechFlow | +1-555-0199"<br />
                           Extraction: &#123; Name: "Leonardo", Role: "VP of Engineering", Company: "TechFlow" &#125;
                        </div>
                     </div>
                     <div className="p-4 bg-white/40 border border-ink/10 rounded-sm">
                        <h4 className="font-bold text-ink mb-1">3. Identity Resolution (The Match)</h4>
                        <p className="text-sm">The hardest engineering challenge. Using fuzzy matching and vector embeddings to decide if "Leonardo" in an email is the same as "Leo" in Salesforce.</p>
                     </div>
                     <div className="p-4 bg-white/40 border border-ink/10 rounded-sm">
                        <h4 className="font-bold text-ink mb-1">4. The Write-Back (The Heal)</h4>
                        <p className="text-sm">The agent executes an API call to the CRM to update the specific field.</p>
                     </div>
                  </div>
               </>
            )
         },
         {
            id: "real-world",
            title: "Real-World Example: The \"Champion Movement\" Play",
            content: (
               <div className="bg-alt/10 p-6 rounded-sm border border-ink/5">
                  <p className="mb-4 font-medium"><strong>The Scenario:</strong> Alice is a "Head of Product" at Company A and is your main champion. She leaves to join Company B as a "VP of Product."</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="opacity-60">
                        <h5 className="font-bold text-xs uppercase tracking-widest mb-2">The Old Way</h5>
                        <p className="text-sm">The sales rep emails Alice at Company A. The email bounces. The rep marks the lead as "Dead." Relationship lost.</p>
                     </div>
                     <div>
                        <h5 className="font-bold text-xs uppercase tracking-widest text-accent mb-2">The Zero-Touch Way</h5>
                        <ul className="list-disc list-inside text-sm space-y-2">
                           <li><strong>Signal:</strong> System detects LinkedIn update or auto-responder.</li>
                           <li><strong>Action 1:</strong> Marks Alice as "Left Company" in Company A. Triggers task: "Find replacement."</li>
                           <li><strong>Action 2:</strong> Creates new contact for Alice under Company B with inferred email.</li>
                           <li><strong>Action 3:</strong> Drafts congratulatory email: "Congrats on the VP role!"</li>
                        </ul>
                     </div>
                  </div>
                  <p className="mt-4 text-sm text-green-700 font-bold text-center">Result: One lost lead becomes two active opportunities automatically.</p>
               </div>
            )
         },
         {
            id: "tech-stack",
            title: "The Tech Stack: Sensors & Healers",
            content: (
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 border border-ink/10 hover:border-accent transition-colors">
                     <strong className="block text-accent">Clay</strong>
                     <span className="text-xs">The leader in "waterfalling" data providers. Can look up a domain, find the CEO, and write a personalized line.</span>
                  </div>
                  <div className="p-3 border border-ink/10 hover:border-accent transition-colors">
                     <strong className="block text-accent">Attio</strong>
                     <span className="text-xs">A next-gen CRM built entirely around the concept of "Data Objects" that sync with email automatically.</span>
                  </div>
                  <div className="p-3 border border-ink/10 hover:border-accent transition-colors">
                     <strong className="block text-accent">Fireflies.ai / Gong</strong>
                     <span className="text-xs">Transcribe calls and use AI to fill in "Deal Fields" (Budget, Timeline) directly into Salesforce.</span>
                  </div>
                  <div className="p-3 border border-ink/10 hover:border-accent transition-colors">
                     <strong className="block text-accent">Nango / Merge.dev</strong>
                     <span className="text-xs">Unified APIs to connect your internal AI agents to your customers' disparate systems.</span>
                  </div>
               </div>
            )
         },
         {
            id: "privacy",
            title: "Privacy, Security & Governance",
            content: (
               <>
                  <p>Giving AI read-access to your company's email and Slack is a massive security surface area.</p>
                  <ul className="list-disc list-inside space-y-2 mt-4">
                     <li><strong>PII Redaction Layers:</strong> Before text is sent to an external LLM, use a local library (like Microsoft Presidio) to scrub Credit Card numbers and SSNs.</li>
                     <li><strong>Local Inference:</strong> For highly sensitive industries, use local models (Llama-3-70b) hosted in your own VPC. The data never leaves your server.</li>
                     <li><strong>Role-Based Scope:</strong> The AI agent should only have permission to update records; it should generally not have permission to delete records without human approval.</li>
                  </ul>
               </>
            )
         },
         {
            id: "pros-cons",
            title: "Pros & Cons",
            content: (
               <div className="my-8 overflow-x-auto">
                  <table className="w-full text-sm text-left border-collapse">
                     <thead>
                        <tr className="border-b border-ink/10">
                           <th className="py-2 font-bold text-ink w-1/2">Pros</th>
                           <th className="py-2 font-bold text-ink w-1/2">Cons</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr className="border-b border-ink/5 align-top">
                           <td className="py-2 pr-4 text-ink-muted"><strong>Data Hygiene:</strong> Reaches nearly 100% accuracy on contact details.</td>
                           <td className="py-2 pl-4 text-ink-muted"><strong>Implementation Cost:</strong> Requires expensive API credits (Clay, OpenAI).</td>
                        </tr>
                        <tr className="border-b border-ink/5 align-top">
                           <td className="py-2 pr-4 text-ink-muted"><strong>Rep Productivity:</strong> Saves ~5-10 hours per week per rep on data entry.</td>
                           <td className="py-2 pl-4 text-ink-muted"><strong>Privacy Risks:</strong> Inadvertent ingestion of confidential internal discussions.</td>
                        </tr>
                        <tr className="align-top">
                           <td className="py-2 pr-4 text-ink-muted"><strong>Revenue Signals:</strong> Detects buying signals (e.g., "We are scaling") that humans miss.</td>
                           <td className="py-2 pl-4 text-ink-muted"><strong>"Over-Automation":</strong> Can trigger awkward automated emails if context is misread.</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            )
         },
         {
            id: "implementation",
            title: "Implementation Guide: Crawl, Walk, Run",
            content: (
               <div className="space-y-6">
                  <div>
                     <h4 className="font-bold text-ink text-sm mb-1">Phase 1: The Scribe (Meeting Notes)</h4>
                     <p className="text-sm text-ink-muted">Don't touch the database yet. Implement Fireflies or Gong. Goal: Ensure every client call results in a structured summary in the CRM notes field.</p>
                  </div>
                  <div>
                     <h4 className="font-bold text-ink text-sm mb-1">Phase 2: The Updater (Signatures & Titles)</h4>
                     <p className="text-sm text-ink-muted">Use a tool like SigParser. Goal: When an email arrives, parse the signature. If the title/phone differs from the CRM, update it.</p>
                  </div>
                  <div>
                     <h4 className="font-bold text-ink text-sm mb-1">Phase 3: The Hunter (Signal-Based Outbound)</h4>
                     <p className="text-sm text-ink-muted">Connect Clay or a custom agent. Goal: Monitor news/LinkedIn for job changes and have the AI automatically create new leads and draft initial outreach.</p>
                  </div>
               </div>
            )
         }
      ],
      faqs: [
         { question: "Can this replace a Revenue Operations (RevOps) team?", answer: "No. It augments them. RevOps currently spends 60% of their time cleaning data. Zero-Touch CRM handles the grunt work, allowing RevOps to focus on strategy, territory planning, and analytics." },
         { question: "Does this work with legacy CRMs like Salesforce?", answer: "Yes. While newer CRMs (Attio, folk) have this native, you can build Zero-Touch pipelines on top of Salesforce using their API or middleware tools like Zapier/Make combined with OpenAI." },
         { question: "How do you handle 'Hallucinations' in data entry?", answer: "You implement 'Confidence Scores.' If the AI is 99% sure it found a phone number, it updates the field. If it is only 60% sure, it creates a 'Task' for a human to verify the data." },
         { question: "Is it legal to scrape LinkedIn for this?", answer: "Direct scraping is against LinkedIn ToS. However, using authorized data vendors (like PeopleDataLabs or Clearbit) who aggregate public data is the standard, compliant workaround." }
      ]
   }
};

const BriefingDetailPage: React.FC<BriefingDetailPageProps> = ({ onNavigate, id }) => {
   const data = (id && briefings[id]) ? briefings[id] : briefings["agentic-workflow"];

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
                     <Button variant="primary" className="w-full text-xs py-2" onClick={() => onNavigate('home', 'booking')}>Book Strategy</Button>
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
                     {data.quickAnswerTitle}
                  </h2>
                  <div className="prose prose-lg text-ink-muted leading-relaxed">
                     <p dangerouslySetInnerHTML={{ __html: data.quickAnswer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </div>
               </div>

               <img src={data.image} alt={data.title} className="w-full aspect-square object-cover rounded-sm mb-12 shadow-xl shadow-ink/5" />

               {/* Dynamic Sections */}
               {data.sections.map((section) => (
                  <div key={section.id} id={section.id} className="mb-16">
                     <h3 className="font-serif text-2xl text-ink mb-6">{section.title}</h3>
                     <div className="prose prose-lg text-ink-muted/90">
                        {section.content}
                     </div>
                  </div>
               ))}

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
