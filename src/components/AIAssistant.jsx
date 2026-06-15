import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Sparkles } from "lucide-react";
import { playClick, playHover, playSuccess } from "../utils/soundManager";

export default function AIAssistant() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I am Nexnam's AI Assistant. How can I help you navigate our services, pricing, projects, or contact options today?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);

  // Auto-scroll chat history
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const toggleChat = () => {
    playClick();
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (textToSend = null) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    playClick();

    // Append User Message
    const userMsg = {
      sender: "user",
      text: text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    setMessages((prev) => [...prev, userMsg]);
    
    if (!textToSend) {
      setInputVal("");
    }

    // Trigger typing state
    setIsTyping(true);

    // AI Intent Processing
    setTimeout(() => {
      setIsTyping(false);
      const lower = text.toLowerCase();
      let botResponse = "";
      let redirectPath = null;

      // 1. SMART BUSINESS ANSWERS
      if (
        lower.includes("salon") || 
        lower.includes("cafe") || 
        lower.includes("coaching") || 
        lower.includes("school") || 
        lower.includes("clinic") || 
        lower.includes("gym") || 
        lower.includes("local business")
      ) {
        botResponse = "Yes, Nexnam builds websites for salons, cafes, coaching classes, schools, clinics, gyms and local businesses. I can open our services page for more details.";
        redirectPath = "/services";
      } else if (
        lower.includes("how much for landing page") || 
        (lower.includes("landing page") && (lower.includes("price") || lower.includes("cost") || lower.includes("much") || lower.includes("package")))
      ) {
        botResponse = "Our landing page package starts from ₹3,999. I’ll open the pricing page for full package details.";
        redirectPath = "/pricing";
      } else if (
        lower.includes("can i see your work") || 
        lower.includes("see your work") ||
        (lower.includes("see") && lower.includes("work"))
      ) {
        botResponse = "Yes, I’ll open our Projects page where you can view our work and sample website concepts.";
        redirectPath = "/projects";
      } else if (
        lower.includes("i want to start a project") || 
        lower.includes("start a project") || 
        lower.includes("start project")
      ) {
        botResponse = "Great! I’ll open the Contact page where you can share your project requirement.";
        redirectPath = "/contact";
      }
      
      // 2. GENERAL INTENTS (Admin check first to block redirection)
      else if (
        lower.includes("admin") || 
        lower.includes("dashboard") || 
        lower.includes("login panel")
      ) {
        botResponse = "Admin access is private and not available from the public assistant.";
        redirectPath = null;
      } else if (
        lower.includes("services") || 
        lower.includes("service") || 
        lower.includes("what do you provide") || 
        lower.includes("website development") || 
        lower.includes("app development") || 
        lower.includes("landing page") || 
        lower.includes("seo") || 
        lower.includes("automation")
      ) {
        botResponse = "Sure, I’ll open our Services page where you can explore website development, landing pages, apps, SEO and automation services.";
        redirectPath = "/services";
      } else if (
        lower.includes("price") || 
        lower.includes("pricing") || 
        lower.includes("package") || 
        lower.includes("cost") || 
        lower.includes("charges") || 
        lower.includes("rate") || 
        lower.includes("website price") || 
        lower.includes("landing page price")
      ) {
        botResponse = "Sure, I’ll open our Pricing page so you can check packages and starting prices.";
        redirectPath = "/pricing";
      } else if (
        lower.includes("project") || 
        lower.includes("portfolio") || 
        lower.includes("work") || 
        lower.includes("demo") || 
        lower.includes("sample") || 
        lower.includes("case study") || 
        lower.includes("previous work")
      ) {
        botResponse = "Opening our Projects page where you can see Nexnam’s work and sample website concepts.";
        redirectPath = "/projects";
      } else if (
        lower.includes("contact") || 
        lower.includes("call") || 
        lower.includes("phone") || 
        lower.includes("email") || 
        lower.includes("inquiry") || 
        lower.includes("start project") || 
        lower.includes("discuss project") || 
        lower.includes("hire") || 
        lower.includes("whatsapp")
      ) {
        botResponse = "Opening the Contact page where you can send an inquiry or connect with Nexnam on WhatsApp.";
        redirectPath = "/contact";
      } else if (
        lower.includes("about") || 
        lower.includes("company") || 
        lower.includes("nexnam") || 
        lower.includes("who are you") || 
        lower.includes("team") || 
        lower.includes("mission")
      ) {
        botResponse = "Sure, I’ll open the About page so you can learn more about Nexnam.";
        redirectPath = "/about";
      } else if (
        lower.includes("home") || 
        lower.includes("main page") || 
        lower.includes("website")
      ) {
        botResponse = "Sure, taking you to the homepage.";
        redirectPath = "/";
      } else {
        botResponse = "I can help you explore Nexnam services, pricing, projects, contact details, or website packages. What would you like to see?";
        redirectPath = null;
      }

      // Append Bot Message
      const botMsg = {
        sender: "bot",
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, botMsg]);
      playSuccess();

      // Handle redirect after 700ms
      if (redirectPath !== null) {
        setTimeout(() => {
          navigate(redirectPath);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 700);
      }
    }, 700);
  };

  const handleQuickAction = (action) => {
    playClick();
    if (action.action === "whatsapp") {
      // Open WhatsApp in new tab
      const whatsappUrl = "https://wa.me/919770169100?text=Hello%20Nexnam%21%20I%27d%20like%20to%20inquire%20about%20starting%20a%20project%20with%20you.";
      
      // Append user click message
      const userMsg = {
        sender: "user",
        text: "Connect on WhatsApp",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, userMsg]);
      
      // Typing effect
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const botMsg = {
          sender: "bot",
          text: "Opening WhatsApp in a new tab so you can discuss your project directly with us!",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };
        setMessages((prev) => [...prev, botMsg]);
        playSuccess();
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      }, 700);
    } else {
      handleSendMessage(action.text);
    }
  };

  const QUICK_ACTIONS = [
    { label: "💡 Services", text: "Services" },
    { label: "💰 Pricing", text: "Pricing" },
    { label: "💻 Projects", text: "Projects" },
    { label: "📞 Contact", text: "Contact" },
    { label: "🏢 About Nexnam", text: "About Nexnam" },
    { label: "💬 WhatsApp", text: "WhatsApp", action: "whatsapp" }
  ];

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        onClick={toggleChat}
        onMouseEnter={playHover}
        className="fixed bottom-24 right-6 z-50 p-3.5 rounded-full glass-card border border-white/10 text-white/70 hover:text-brand-cyan hover:border-brand-cyan/40 hover:shadow-[0_0_20px_rgba(0,245,255,0.2)] transition-all duration-300 pointer-events-auto flex items-center justify-center cursor-pointer group"
        aria-label="AI Assistant Chatbot"
      >
        <Bot className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 text-brand-cyan" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap text-xs pl-0 group-hover:pl-2 font-mono text-brand-cyan font-bold">
          AI Assistant
        </span>
      </button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-36 right-4 sm:right-6 z-50 w-[calc(100%-2rem)] sm:w-[380px] h-[480px] max-h-[70vh] sm:max-h-[600px] glass-card rounded-3xl border border-white/10 flex flex-col overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.8)]"
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-white/5 bg-gradient-to-r from-brand-dark to-brand-black flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-cyan/10 border border-brand-cyan/25 flex items-center justify-center relative">
                  <Bot className="w-5 h-5 text-brand-cyan" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-500 border border-brand-black" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-none mb-1 flex items-center gap-1 font-mono">
                    Nexnam AI Assistant
                    <Sparkles className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
                  </h3>
                  <span className="text-[10px] text-white/40 font-mono tracking-wider uppercase">
                    Ask about services, pricing, projects or contact
                  </span>
                </div>
              </div>
              <button
                onClick={toggleChat}
                onMouseEnter={playHover}
                className="p-1.5 rounded-lg border border-white/5 hover:border-brand-cyan/20 bg-white/5 text-white/50 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-brand-cyan to-brand-blue text-brand-black font-semibold rounded-tr-none"
                        : "bg-white/5 border border-white/5 text-white/80 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-white/30 font-mono mt-1 px-1">{msg.time}</span>
                </div>
              ))}
              
              {/* Animated Typing Indicator */}
              {isTyping && (
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-1.5 px-4 py-3 bg-white/5 border border-white/5 text-white/50 rounded-2xl rounded-tl-none w-16">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Suggestions & Form */}
            <div className="p-3 border-t border-white/5 bg-brand-black/60 backdrop-blur-md">
              {/* Suggested Quick Actions */}
              <div className="flex flex-wrap gap-2 mb-3">
                {QUICK_ACTIONS.map((action, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickAction(action)}
                    onMouseEnter={playHover}
                    className="px-2.5 py-1.5 rounded-full border border-white/5 bg-white/5 hover:border-brand-cyan/35 hover:bg-brand-cyan/5 text-[10px] text-white/70 hover:text-white font-mono transition-all duration-300 cursor-pointer"
                  >
                    {action.label}
                  </button>
                ))}
              </div>

              {/* Text Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask a question..."
                  aria-label="Ask a question"
                  className="flex-grow px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-brand-cyan transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim()}
                  className="p-2.5 rounded-xl bg-brand-cyan hover:bg-brand-blue disabled:opacity-50 text-brand-black transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                  aria-label="Send Message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
