import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Medal, Translate, Lightbulb } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    icon: Medal,
    title: 'Data Science Professional Training',
    institution: 'Ducat \u2014 Noida',
    period: 'Apr 2024 \u2014 Mar 2025',
    description:
      'Eight-month intensive program with three additional months of hands-on training: Python, statistics, machine learning, deep learning, SQL, and Power BI \u2014 the foundation I built my AI career on.',
  },
  {
    icon: GraduationCap,
    title: 'BSc \u2014 Non-Medical',
    institution: 'KLP College, Rewari \u2014 Indira Gandhi University, Meerpur',
    period: '2020 \u2014 2023',
    description:
      'Physics, Chemistry, Mathematics. A first-principles math background that shows up in everything I build \u2014 from model evaluation to algorithmic reasoning.',
  },
  {
    icon: GraduationCap,
    title: 'Senior Secondary (XII) \u2014 91% \u00b7 Secondary (X) \u2014 90%',
    institution: 'Haryana Board (HBSE)',
    period: '2018 \u2014 2020',
    description:
      'Scored 100 in Mathematics (Class X) and 99 in Mathematics (Class XII) \u2014 the pattern started early.',
  },
];

const Education = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

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

      gsap.utils.toArray<HTMLElement>('.edu-card').forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: (i % 3) * 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%' },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            <span className="text-primary-glow">Education</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Math first, machines second \u2014 the order matters.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {education.map((edu) => {
            const Icon = edu.icon;
            return (
              <div
                key={edu.title}
                className="edu-card glass rounded-xl p-6 hover:shadow-glow-primary transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-5 shadow-glow-primary">
                  <Icon size={22} className="text-primary-foreground" />
                </div>
                <p className="text-xs uppercase tracking-widest text-primary-glow mb-2">{edu.period}</p>
                <h3 className="text-lg font-semibold text-foreground mb-1">{edu.title}</h3>
                <p className="text-sm text-muted-foreground/80 mb-3">{edu.institution}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{edu.description}</p>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="edu-card glass rounded-xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center shrink-0 shadow-glow-accent">
              <Translate size={22} className="text-accent-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">English \u2014 C2 Proficient</h3>
              <p className="text-sm text-muted-foreground">
                EF SET English Certificate: full professional proficiency \u2014 reading, listening, writing, and speaking.
              </p>
            </div>
          </div>
          <div className="edu-card glass rounded-xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-secondary flex items-center justify-center shrink-0 shadow-glow-secondary">
              <Lightbulb size={22} className="text-secondary-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Interests</h3>
              <p className="text-sm text-muted-foreground">
                Mathematics, AI, and psychology \u2014 formal systems, machine intelligence, and cognitive science;
                understanding how complex systems work from first principles.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/2" />
    </section>
  );
};

export default Education;
