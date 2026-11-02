import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, GithubLogo, Globe } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "The Nexus Cloud",
      description: "Autonomous content pipeline at scale: discovery, engagement-based ranking, GPU rendering, and scheduled posting across 69 channels on major social media platforms with full database provenance for every asset. Maintaining the pipeline while scaling to 400+ channels.",
      image: "/Images/project-1.jpg",
      tech: ["Python", "GPU Pipelines", "Automation", "Data Engineering"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "PSYCHE OS",
      description: "A 26-agent system that turns 6,000+ real conversations into evidence-based psychological profiles. 9-step pipeline with per-dimension micro-agents and an agent-debate mechanism for contested inferences. Built for HR teams and coaches.",
      image: "/Images/project-2.jpg",
      tech: ["LangGraph", "Multi-Agent Systems", "ChromaDB", "Python"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "AURA — Multimodal Emotion AI",
      description: "Multimodal emotion AI in PyTorch + Transformers: text, voice, and facial-expression emotion engines fused in a 28-emotion VAD taxonomy, with sarcasm and emotional-drift detection steering a companion LLM's tone in real time.",
      image: "/Images/project-3.jpg",
      tech: ["PyTorch", "Transformers", "Computer Vision", "NLP"],
      liveUrl: "#",
      githubUrl: "https://github.com/ramakantkaus-sys/AURA"
    },
    {
      id: 4,
      title: "NeuralCraft · AI Engineer",
      description: "Southwest Airlines: maintained the AWS cloud pipeline (Bedrock, Lambda, S3, SageMaker) behind a secure internal GPT platform; tested data upgrades to verify fixes before production. Humana: maintained the ETL testing pipeline — SQL validation of data correctness and transformation logic.",
      image: "/Images/project-4.jpg",
      tech: ["AWS Bedrock", "RAG", "Python", "SQL"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 5,
      title: "Keywords Studios · Research Associate – AI",
      description: "Tested and evaluated autonomous AI agent outputs in real-world web environments for a confidential AGI project — maintaining 92%+ task accuracy across multi-step reasoning and navigation benchmarks. Prompt engineering, failure analysis, and fine-tuning feedback.",
      image: "/Images/project-5.jpg",
      tech: ["AI Research", "LLM Evaluation", "Prompt Engineering", "PyTorch"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 6,
      title: "YouTube Transcript Chatbot (RAG-based)",
      description: "Developed a Retrieval-Augmented Generation (RAG) chatbot using Python, LangChain, GPT-4o-mini, and FAISS. Implemented automated YouTube transcript extraction, semantic text chunking, and vector embeddings. Enabled context-aware Q&A and interactive conversations over long-form video content.",
      image: "/Images/project-6.jpg",
      tech: ["Python", "LangChain", "GPT-4o", "FAISS", "RAG", "NLP"],
      liveUrl: "https://ragtubebot-rgkrm2fzffgrcy5ebahy2h.streamlit.app/",
      githubUrl: "https://github.com/ramakantkaus-sys/RagTubeBot"
    }
  ];

  useEffect(() => {
    const hoverCleanups: Array<() => void> = [];
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%"
        }
      });

      gsap.from(containerRef.current?.children || [], {
        y: 100,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%"
        }
      });

      const cards = containerRef.current?.children;
      if (cards) {
        Array.from(cards).forEach((card) => {
          const element = card as HTMLElement;

          const onEnter = () => {
            gsap.to(element, {
              y: -10,
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out"
            });
          };

          const onLeave = () => {
            gsap.to(element, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          };

          element.addEventListener('mouseenter', onEnter);
          element.addEventListener('mouseleave', onLeave);
          hoverCleanups.push(() => {
            element.removeEventListener('mouseenter', onEnter);
            element.removeEventListener('mouseleave', onLeave);
          });
        });
      }
    }, sectionRef);

    return () => {
      hoverCleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            My <span className="text-primary-glow">Projects</span> & <span className="text-secondary-glow">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my work in AI engineering — production LLM systems, autonomous agents, and applied machine learning, from research to real-world deployment.          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="glass cursor-pointer rounded-xl overflow-hidden hover:shadow-glow-primary transition-all duration-500 group">
              <div className="relative overflow-hidden h-48">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href={project.liveUrl} className="w-10 h-10 bg-primary/90 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-200">
                    <Globe size={18} className="text-primary-foreground" />
                  </a>
                  <a href={project.githubUrl} className="w-10 h-10 bg-secondary/90 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-secondary transition-colors duration-200">
                    <GithubLogo size={18} className="text-secondary-foreground" />
                  </a>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary-glow transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-primary/10 text-primary-glow text-xs rounded-full border border-primary/20">
                      {tech}
                    </span>
                  ))}
                </div>

                <a href={project.liveUrl} className="inline-flex items-center gap-2 text-primary-glow hover:text-primary transition-colors duration-300 group/link">
                  View Project
                  <ArrowUpRight size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gradient-secondary text-secondary-foreground rounded-lg hover:shadow-glow-secondary transition-all duration-300 hover:scale-105">
            View All Projects
          </button>
        </div> */}
      </div>

      <div className="absolute top-1/4 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2" />
    </section>
  );
};

export default Projects;