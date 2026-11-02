import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, CaretDown } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  details: string[];
  tech: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: 'Founding Member & AI Systems Engineer',
    company: 'THE PARADOX',
    period: '2025 \u2014 Present',
    location: 'Gurugram, India',
    summary: 'AI engineering studio serving clients across the US, UK, Australia, and Canada.',
    details: [
      'PSYCHE OS \u2014 a 26-agent system turning 6,000+ real conversations into evidence-based psychological profiles: 9-step pipeline, per-dimension micro-agents, and an agent-debate mechanism for contested inferences.',
      'Outreach/content automation \u2014 WhatsApp, LinkedIn, and mail processes fully automated, powered by Groq API keys.',
      'Production AI systems for clients: AI voice receptionists, lead re-engagement automation, and multi-agent workflows.',
    ],
    tech: ['LangChain', 'LangGraph', 'Python', 'Multi-Agent Systems', 'RAG'],
  },
  {
    id: 2,
    role: 'AI Engineer',
    company: 'NeuralCraft Pixelgenius Pvt Ltd',
    period: 'Mar 2026 \u2014 May 2026',
    location: 'US Enterprise Clients',
    summary: 'Production pipelines for Southwest Airlines and Humana.',
    details: [
      'Southwest Airlines \u2014 maintained the AWS cloud pipeline (Bedrock, Lambda, S3, SageMaker) behind a secure internal GPT platform; tested data upgrades to verify development-side fixes before production release.',
      'Humana \u2014 maintained the ETL testing pipeline: SQL testing and validation of data correctness and transformation logic.',
    ],
    tech: ['AWS Bedrock', 'Lambda', 'S3', 'SageMaker', 'SQL', 'Python'],
  },
  {
    id: 3,
    role: 'Research Associate \u2013 AI',
    company: 'Keywords Studios',
    period: 'Apr 2025 \u2014 Sep 2025',
    location: 'Gurgaon, India',
    summary: 'Confidential AGI project \u2014 autonomous agent evaluation at 92%+ accuracy.',
    details: [
      'Tested and evaluated autonomous AI agent outputs in real-world web environments; tracked task success rates, maintaining 92%+ accuracy across multi-step reasoning and navigation benchmarks.',
      'Wrote, iterated, and optimized prompts for LLM-powered agents; analyzed failure cases and fed findings back into prompt, workflow, and model fine-tuning/alignment improvements.',
    ],
    tech: ['LLM Evaluation', 'Prompt Engineering', 'PyTorch', 'Python'],
  },
  {
    id: 4,
    role: 'Data Science Intern',
    company: 'AAM Infotech Pvt. Ltd.',
    period: 'Oct 2024 \u2014 Mar 2025',
    location: 'Gurgaon, India',
    summary: 'End-to-end ML pipelines, from ingestion to stakeholder dashboards.',
    details: [
      'Built supervised ML models including a collaborative-filtering recommender; handled the end-to-end pipeline from data ingestion to model evaluation.',
      'Cleaned and preprocessed datasets; built dashboards communicating metrics and insights to non-technical stakeholders.',
    ],
    tech: ['Scikit-learn', 'Pandas', 'SQL', 'Power BI', 'Python'],
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<number | null>(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
      });

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', end: 'bottom 60%', scrub: 1 },
        }
      );

      gsap.utils.toArray<HTMLElement>('.exp-card').forEach((card) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%' },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            My <span className="text-primary-glow">Journey</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From data science training to production AI for US enterprises \u2014 every step, hands-on.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-border/40 md:-translate-x-1/2" />
          <div
            ref={lineRef}
            className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-primary origin-top md:-translate-x-1/2 shadow-glow-primary"
          />

          <div className="space-y-10">
            {experiences.map((exp, idx) => {
              const isOpen = openId === exp.id;
              const left = idx % 2 === 0;
              return (
                <div key={exp.id} className="relative">
                  <div className="absolute left-5 md:left-1/2 top-6 -translate-x-1/2 z-10">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow-primary">
                      <Briefcase size={18} className="text-primary-foreground" />
                    </div>
                  </div>

                  <div
                    className={`exp-card ml-16 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                      left ? 'md:mr-auto md:pr-0' : 'md:ml-auto'
                    }`}
                  >
                    <button
                      onClick={() => setOpenId(isOpen ? null : exp.id)}
                      className="w-full text-left glass rounded-xl p-6 hover:shadow-glow-primary transition-all duration-300 group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-primary-glow mb-1">{exp.period}</p>
                          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary-glow transition-colors">
                            {exp.role}
                          </h3>
                          <p className="text-muted-foreground mt-1">
                            {exp.company} \u00b7 {exp.location}
                          </p>
                          <p className="text-sm text-muted-foreground/80 mt-2">{exp.summary}</p>
                        </div>
                        <CaretDown
                          size={20}
                          className={`shrink-0 mt-1 text-primary-glow transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </div>

                      <div
                        className={`grid transition-all duration-500 ease-in-out ${
                          isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <ul className="space-y-2 mb-4">
                            {exp.details.map((d, i) => (
                              <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                                <span className="text-primary-glow mt-0.5">\u25b8</span>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-2">
                            {exp.tech.map((t) => (
                              <span
                                key={t}
                                className="px-3 py-1 bg-primary/10 text-primary-glow text-xs rounded-full border border-primary/20"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2" />
    </section>
  );
};

export default Experience;
