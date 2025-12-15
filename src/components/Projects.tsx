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
      title: "Multimodal Emotion Chatbot",
      description: "Built a personal chatbot capable of detecting emotions from facial, vocal, and textual cues. Used OpenFace for facial analysis, Wav2Vec2 for voice emotion detection, and BERT for text-based emotion recognition. Enabled real-time emotion detection and adaptive, emotion-aware conversations.",
      image: "/Images/project-1.jpg",
      tech: ["Python", "OpenFace", "Wav2Vec2", "BERT", "NLP", "Deep Learning"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "YouTube Transcript Chatbot (RAG-based)",
      description: "Developed a Retrieval-Augmented Generation (RAG) chatbot using Python, LangChain, GPT-4o-mini, and FAISS. Implemented automated YouTube transcript extraction, semantic text chunking, and vector embeddings. Enabled context-aware Q&A and interactive conversations over long-form video content.",
      image: "/Images/project-2.jpg",
      tech: ["Python", "LangChain", "GPT-4o", "FAISS", "RAG", "NLP"],
      liveUrl: "https://ragtubebot-rgkrm2fzffgrcy5ebahy2h.streamlit.app/",
      githubUrl: "https://github.com/ramakantkaus-sys/RagTubeBot"
    },
    {
      id: 3,
      title: "Movie Recommendation System",
      description: "Content-based movie recommendation system using NLP techniques to suggest similar movies based on plot, genres, keywords, cast, and director. Designed for cold-start scenarios and deployed as an interactive Streamlit application.Built a personalized recommendation engine using collaborative filtering, content-based filtering, and NLP-based review analysis.",
      image: "/Images/project-3.jpg",
      tech: ["Python", "Machine Learning", "NLP", "Recommendation Systems", "Pandas", "Scikit-learn"],
      liveUrl: "https://cinematchrecommendation.streamlit.app/",
      githubUrl: "https://github.com/ramakantkaus-sys/Cinematch"
    },
    {
      id: 4,
      title: "Chronic Disease Risk Prediction Model",
      description: "Decision Tree based health risk assessment system analyzing demographic, lifestyle, and mental health parameters to predict the likelihood of chronic disease. Designed to support early risk screening and data-driven health insights.",
      image: "/Images/project-5.jpg",
      tech: ["Python", "Machine Learning", "NLP", "Recommendation Systems", "Pandas", "Scikit-learn"],
      liveUrl: "https://depressionriskprediction.streamlit.app/",
      githubUrl: "https://github.com/ramakantkaus-sys/Chronic-Disease-Risk-Prediction-Model"
    },
    {
      id: 5,
      title: "Research Associate - Keywords Studios",
      description: "Trained and evaluated advanced AI agents for a confidential AGI-level project, maintaining over 92% accuracy on complex reasoning and multimodal tasks. Supported model fine-tuning, alignment, and evaluation across text, vision, and other multimodal inputs.",
      image: "/Images/project-4.jpg",
      tech: ["AI Research", "Model Evaluation", "Multimodal AI", "Fine-tuning", "Python", "PyTorch"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 6,
      title: "Data Science Intern - AAM Infotech",
      description: "Worked on Machine Learning, Deep Learning, and NLP projects, including recommender systems and predictive models. Assisted in data preprocessing, feature engineering, model training, and evaluation. Gained hands-on experience in real-world data science workflows.",
      image: "/Images/project-5.jpg",
      tech: ["Machine Learning", "Deep Learning", "NLP", "Data Preprocessing", "Model Training", "Python"],
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  useEffect(() => {
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

          element.addEventListener('mouseenter', () => {
            gsap.to(element, {
              y: -10,
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          element.addEventListener('mouseleave', () => {
            gsap.to(element, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
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
            A showcase of my work in AI, Machine Learning, and Data Science — from research projects to real-world applications and professional experiences.          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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