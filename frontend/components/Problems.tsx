import React from 'react';
import { Section, SectionHeader, ScrollReveal, Card } from './Shared';

const Problems: React.FC = () => (
  <Section id="problems" pattern="grid" className="bg-white/40">
    <SectionHeader
      eyebrow="Folio II — The Problem"
      title="Where Teams Get Stuck"
      subtitle="Most companies have 'AI Initiatives'. Few have shipped outcomes."
    />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <ScrollReveal delay={100} className="h-full">
        <Card title="The Pilot Purgatory" label="Symptom A" image="/images/The Pilot Purgatory.png" className="h-full">
          <p>You have 12 distinct experiments running. None are production-grade. Your team is "learning" but not shipping.</p>
        </Card>
      </ScrollReveal>
      <ScrollReveal delay={300} className="h-full">
        <Card title="The Tool Fatigue" label="Symptom B" image="/images/The Tool Fatigue.png" className="h-full">
          <p>Subscriptions to ChatGPT Team, Claude, Jasper, and Copy.ai—yet work is still being done manually in spreadsheets.</p>
        </Card>
      </ScrollReveal>
      <ScrollReveal delay={500} className="h-full">
        <Card title="The Margin Squeeze" label="Symptom C" image="/images/The Margin Squeeze.png" className="h-full">
          <p>Revenue is growing, but headcount costs are growing faster. You need to break the linear relationship between growth and hiring.</p>
        </Card>
      </ScrollReveal>
    </div>
  </Section>
);

export default Problems;
