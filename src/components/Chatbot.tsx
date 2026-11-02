import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ChatCircle, X, PaperPlaneTilt, Robot } from 'phosphor-react';

const nextMessageId = (list: { id: number }[]) => {
  const last = list[list.length - 1];
  return last ? last.id + 1 : 1;
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Ramakant's AI assistant. Ask me about his work, skills, or experience.",
      isBot: true,
      timestamp: new Date()
    }
  ]);

  const chatboxRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    gsap.fromTo(buttonRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 1, delay: 2, ease: "back.out(1.7)" }
    );
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(chatboxRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  }, [isOpen]);

  const toggleChat = () => {
    if (isOpen) {
      gsap.to(chatboxRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.2,
        onComplete: () => setIsOpen(false)
      });
    } else {
      setIsOpen(true);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userText = message;
    setMessage('');

    setMessages(prev => [...prev, {
      id: nextMessageId(prev),
      text: userText,
      isBot: false,
      timestamp: new Date()
    }]);

    setTimeout(() => {
      const userInput = userText.toLowerCase();

      let reply = "Sorry, I didn't understand that. Can you rephrase it?";

      if (userInput.includes("service") || userInput.includes("hire") || userInput.includes("work with")) {
        reply = "Ramakant builds production AI systems: LLM apps, RAG pipelines, autonomous AI agents, and voice automation for clients across the US, UK, Australia, and Canada. Use the contact form or email ramakantkaus@gmail.com to start a conversation.";
      } else if (userInput.includes("experience") || userInput.includes("neuralcraft") || userInput.includes("job")) {
        reply = "Ramakant is a founding member & AI Systems Engineer at THE PARADOX, formerly AI Engineer at NeuralCraft (Southwest Airlines, Humana), and Research Associate \u2013 AI at Keywords Studios, where he held 92%+ task accuracy on agent evaluations.";
      } else if (userInput.includes("skill") || userInput.includes("tech") || userInput.includes("stack")) {
        reply = "His core stack: Python, LangChain/LangGraph, RAG & vector databases (FAISS, ChromaDB), prompt engineering, PyTorch, AWS (Bedrock, Lambda, S3, SageMaker), FastAPI, and SQL.";
      } else if (userInput.includes("project") || userInput.includes("portfolio") || userInput.includes("built")) {
        reply = "Highlights: The Nexus Cloud (autonomous content pipeline scaling to 400+ channels), PSYCHE OS (26-agent psychological profiling), AURA (multimodal emotion AI), and a YouTube RAG chatbot. Scroll to the Projects section for details.";
      } else if (userInput.includes("contact") || userInput.includes("email") || userInput.includes("phone")) {
        reply = "You can reach Ramakant via the contact form above, email him at ramakantkaus@gmail.com, or call +91 72062 42521.";
      } else if (userInput.includes("resume") || userInput.includes("cv")) {
        reply = "You can download his AI Engineer resume with the \u2018Download CV\u2019 button in the hero section at the top of the page.";
      }

      setMessages(prev => [...prev, {
        id: nextMessageId(prev),
        text: reply,
        isBot: true,
        timestamp: new Date()
      }]);
    }, 1000);

  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div ref={chatboxRef} className="mb-4 w-80 h-96 glass-card overflow-hidden flex flex-col bg-black border-1 border-gray-200">
          <div className="p-4 border-b border-glass-border ">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-primary rounded-full">
                  <Robot size={20} className="text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">AI Assistant</h3>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              <button onClick={toggleChat} className="p-1 hover:bg-muted/20 rounded-full transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${msg.isBot
                    ? 'bg-muted/20 text-foreground'
                    : 'bg-gradient-primary text-foreground'
                    }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-glass-border">
            <div className="flex space-x-2">
              <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="Type a message..." className="flex-1 px-3 py-2 bg-glass border border-glass-border rounded-lg text-sm focus:outline-none focus:border-primary" />
              <button onClick={handleSendMessage} className="p-2 w-8 h-8 bg-gradient-primary rounded-lg hover:scale-105 transition-transform">
                <PaperPlaneTilt size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      <button ref={buttonRef} onClick={toggleChat} className="chatbot w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow-primary hover:scale-110 transition-transform">
        {isOpen ? (
          <X size={24} className="text-foreground" />
        ) : (
          <ChatCircle size={24} className="text-foreground" />
        )}
      </button>
    </div>
  );
};

export default Chatbot;