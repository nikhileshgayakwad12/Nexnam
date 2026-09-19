import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Sparkles } from "lucide-react";
import { playClick, playHover, playSuccess } from "../utils/soundManager";
import WhatsAppWidget from "./WhatsAppWidget";
import SoundToggle from "./SoundToggle";

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
      const whatsappUrl = "https://wa.me/919329584097?text=Hello%20Nexnam%21%20I%27d%20like%20to%20inquire%20about%20starting%20a%20project%20with%20you.";
      
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
      {/* Floating Action Utility System (Bottom-Right Cluster) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-[calc(16px+env(safe-area-inset-bottom))] right-3.5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2 sm:gap-2.5 pointer-events-auto select-none"
      >
        {/* Primary AI Assistant Launcher */}
        <button
          onClick={toggleChat}
          onMouseEnter={playHover}
          className="h-11 sm:h-12 px-3.5 sm:px-[18px] py-2 sm:py-2.5 rounded-full bg-[#111318] hover:bg-[#1f222a] border border-white/10 text-white shadow-[0_8px_30px_rgba(15,23,42,0.14)] hover:shadow-[0_12px_36px_rgba(15,23,42,0.22)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 flex items-center gap-2 sm:gap-2.5 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B5CF6]"
          aria-label={isOpen ? "Close AI Assistant" : "Ask Nexnam AI Assistant"}
        >
          <div className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-[#5B5CF6]/15 border border-[#5B5CF6]/30 flex items-center justify-center shrink-0">
            {isOpen ? (
              <X className="w-3.5 h-3.5 text-white" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-[#5B5CF6]" />
            )}
          </div>
          <span className="text-xs font-semibold tracking-wide text-white whitespace-nowrap">
            {isOpen ? "Close Chat" : "Ask Nexnam AI"}
          </span>
          <span className="w-2 h-2 rounded-full bg-[#5B5CF6] shrink-0" aria-hidden="true" />
        </button>

        {/* Secondary Utility Row: WhatsApp & Sound */}
        <div className="flex items-center gap-2 sm:gap-2.5 justify-end">
          <WhatsAppWidget />
          <SoundToggle />
        </div>
      </motion.div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-[125px] sm:bottom-[135px] right-3 sm:right-6 z-50 w-[calc(100%-1.5rem)] sm:w-[380px] h-[460px] sm:h-[480px] max-h-[68vh] sm:max-h-[600px] bg-white/95 dark:bg-[#111318]/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/[0.08] flex flex-col overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.14)]"
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-100 dark:border-white/[0.08] bg-slate-50/90 dark:bg-[#15171D]/90 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-[#7C7DFF]/10 border border-indigo-100 dark:border-[#7C7DFF]/20 flex items-center justify-center relative shadow-2xs">
                  <Bot className="w-5 h-5 text-indigo-600 dark:text-[#7C7DFF]" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-white dark:border-[#15171D]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC] leading-none mb-1 flex items-center gap-1 font-mono">
                    Nexnam AI Assistant
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-[#7C7DFF] animate-pulse" />
                  </h3>
                  <span className="text-[10px] text-slate-500 dark:text-[#9CA3AF] font-mono tracking-wider uppercase">
                    Ask about services, pricing, projects or contact
                  </span>
                </div>
              </div>
              <button
                onClick={toggleChat}
                onMouseEnter={playHover}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-white/[0.12] hover:border-indigo-300 dark:hover:border-[#7C7DFF] bg-white dark:bg-[#15171D] text-slate-500 dark:text-[#9CA3AF] hover:text-slate-900 dark:hover:text-[#F8FAFC] transition-colors cursor-pointer shadow-2xs"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-slate-50/30 dark:bg-[#090A0D]/50">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-[#7C7DFF] dark:to-[#6869E8] text-white font-medium rounded-tr-none shadow-xs"
                        : "bg-white dark:bg-[#15171D] border border-slate-200/80 dark:border-white/[0.08] text-slate-800 dark:text-[#F8FAFC] rounded-tl-none shadow-2xs"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono mt-1 px-1">{msg.time}</span>
                </div>
              ))}
              
              {/* Animated Typing Indicator */}
              {isTyping && (
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-1.5 px-4 py-3 bg-white dark:bg-[#15171D] border border-slate-200/80 dark:border-white/[0.08] text-slate-400 dark:text-slate-500 rounded-2xl rounded-tl-none w-16 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-[#7C7DFF] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-[#7C7DFF] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-[#7C7DFF] animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Suggestions & Form */}
            <div className="p-3 border-t border-slate-100 dark:border-white/[0.08] bg-white dark:bg-[#111318]">
              {/* Suggested Quick Actions */}
              <div className="flex flex-wrap gap-2 mb-3">
                {QUICK_ACTIONS.map((action, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickAction(action)}
                    onMouseEnter={playHover}
                    className="px-2.5 py-1.5 rounded-full border border-slate-200 dark:border-white/[0.12] bg-slate-50 dark:bg-[#15171D] hover:border-indigo-300 dark:hover:border-[#7C7DFF] hover:bg-indigo-50/60 dark:hover:bg-[#7C7DFF]/10 text-[10px] text-slate-700 dark:text-slate-300 font-mono transition-all duration-300 cursor-pointer shadow-2xs"
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
                  className="flex-grow px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#16181E] border border-slate-200 dark:border-white/[0.08] text-xs text-slate-900 dark:text-[#F8FAFC] placeholder-slate-400 dark:placeholder-[#717784] focus:outline-none focus:border-indigo-500 dark:focus:border-[#7C7DFF] transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim()}
                  className="p-2.5 rounded-xl bg-indigo-600 dark:bg-[#7C7DFF] hover:bg-indigo-700 dark:hover:bg-[#6869E8] disabled:opacity-50 text-white transition-colors flex items-center justify-center shrink-0 cursor-pointer shadow-xs"
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
