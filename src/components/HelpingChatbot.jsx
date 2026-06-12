import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Star, Sparkles, RefreshCw } from "lucide-react";
import { playClick, playHover, playSuccess } from "../utils/soundManager";
import { supabase } from "../lib/supabaseClient";

export default function HelpingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("chat"); // chat, feedback, feedback_success
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I am Nexnam's AI assistant. How can I help you build your digital product today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  
  // Feedback Form States
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackComment, setFeedbackComment] = useState("");
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto-scroll chat history
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, mode]);

  const toggleChat = () => {
    playClick();
    setIsOpen(!isOpen);
    // Reset to chat mode on close
    if (isOpen) {
      setMode("chat");
    }
  };

  // Chat Responses Logic
  const handleSendMessage = (textToSend = null) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    playClick();

    // Append User Message
    const userMsg = {
      sender: "user",
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal("");

    // Generate AI Bot Response after delay
    setTimeout(() => {
      let botResponse = "";
      const lower = text.toLowerCase();

      if (lower.includes("price") || lower.includes("cost") || lower.includes("much") || lower.includes("rate")) {
        botResponse = "We build custom websites and landing pages starting under ₹5,000. Mobile apps and custom software solutions are estimated depending on project complexity. Contact us for a free precise quote!";
      } else if (lower.includes("time") || lower.includes("duration") || lower.includes("long") || lower.includes("days") || lower.includes("week")) {
        botResponse = "Standard landing pages and portfolio websites are delivered in 1-2 weeks. Complex custom dashboards, web apps, or mobile app MVPs typically take 4-6 weeks.";
      } else if (lower.includes("tech") || lower.includes("stack") || lower.includes("code") || lower.includes("use") || lower.includes("framework")) {
        botResponse = "We utilize high-performance, modern frameworks including React.js, Tailwind CSS, Vite, Next.js, Node.js, and serverless databases like Supabase or Firebase.";
      } else if (lower.includes("seo") || lower.includes("google") || lower.includes("rank") || lower.includes("visibility")) {
        botResponse = "Yes! All our web builds include technical SEO, optimized Lighthouse scores, semantic schema markups, and structured robots/sitemap setup to ensure Google indices rank your pages higher.";
      } else if (lower.includes("contact") || lower.includes("hire") || lower.includes("project") || lower.includes("start")) {
        botResponse = "To start your project, navigate to our Contact page to fill in the project brief details, or click the WhatsApp widget on the bottom-left to discuss details directly with our lead architect.";
      } else if (lower.includes("feedback") || lower.includes("review") || lower.includes("star") || lower.includes("rate us")) {
        setMode("feedback");
        return;
      } else {
        botResponse = "That's a great question! For specific startup queries, architecture options, or detailed pricing estimates, we recommend submitting an inquiry on our Contact page or connecting with us on WhatsApp.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      playSuccess();
    }, 800);
  };

  // Feedback Submission handler
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    playClick();

    if (rating === 0) {
      alert("Please select a rating of at least 1 star.");
      return;
    }

    setIsSubmittingFeedback(true);

    try {
      // Insert to Supabase feedbacks table (if it exists)
      const { error } = await supabase
        .from("feedbacks")
        .insert([
          {
            name: feedbackName.trim() || "Anonymous Client",
            rating: rating,
            comment: feedbackComment.trim(),
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;
    } catch (err) {
      console.warn("Supabase feedbacks table not initialized. Falling back to LocalStorage:", err.message);
      
      // Fallback: LocalStorage
      const localFeedbacks = JSON.parse(localStorage.getItem("nexnam_feedbacks") || "[]");
      localFeedbacks.push({
        id: Date.now(),
        name: feedbackName.trim() || "Anonymous Client",
        rating: rating,
        comment: feedbackComment.trim(),
        created_at: new Date().toISOString()
      });
      localStorage.setItem("nexnam_feedbacks", JSON.stringify(localFeedbacks));
    } finally {
      setIsSubmittingFeedback(false);
      setMode("feedback_success");
      playSuccess();
      
      // Clear feedback inputs
      setFeedbackName("");
      setFeedbackComment("");
      setRating(0);

      // Return to chat after brief success screen
      setTimeout(() => {
        setMode("chat");
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Thank you again for your rating! What else can I assist you with today?",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 3000);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        onClick={toggleChat}
        onMouseEnter={playHover}
        className="fixed bottom-24 right-6 z-50 p-3.5 rounded-full glass-card border border-white/10 text-white/70 hover:text-brand-cyan hover:border-brand-cyan/40 hover:shadow-[0_0_20px_rgba(0,245,255,0.2)] transition-all duration-300 pointer-events-auto flex items-center justify-center cursor-pointer group"
        aria-label="Help Assistant"
      >
        <MessageSquare className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap text-xs pl-0 group-hover:pl-2 font-mono text-brand-cyan font-bold">
          ASSISTANT
        </span>
      </button>

      {/* Chat Window Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-36 right-6 z-50 w-[320px] sm:w-[380px] h-[460px] glass-card rounded-3xl border border-white/10 flex flex-col overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.8)]"
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-white/5 bg-gradient-to-r from-brand-dark to-brand-black flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-cyan/10 border border-brand-cyan/25 flex items-center justify-center relative">
                  <Bot className="w-5 h-5 text-brand-cyan" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-500 border border-brand-black" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-none mb-1 flex items-center gap-1">
                    Nexnam Guide
                    <Sparkles className="w-3 h-3 text-brand-cyan animate-pulse" />
                  </h3>
                  <span className="text-[10px] text-white/40 font-mono tracking-wider uppercase">Online Agent</span>
                </div>
              </div>
              <button
                onClick={toggleChat}
                onMouseEnter={playHover}
                className="p-1.5 rounded-lg border border-white/5 hover:border-brand-cyan/20 bg-white/5 text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
              {mode === "chat" && (
                <>
                  {/* Message Bubbles */}
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
                      <span className="text-[9px] text-white/30 font-mono mt-1 px-1">
                        {msg.time}
                      </span>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}

              {/* Feedback Form Panel */}
              {mode === "feedback" && (
                <motion.form
                  key="feedback-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleFeedbackSubmit}
                  className="flex flex-col gap-4 py-2"
                >
                  <div className="text-center mb-2">
                    <h4 className="text-sm font-bold text-white mb-1">Rate Your Experience</h4>
                    <p className="text-[11px] text-white/50">Your rating helps us improve digital deliveries.</p>
                  </div>

                  {/* Star rating component */}
                  <div className="flex justify-center items-center gap-2 py-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => {
                          playClick();
                          setRating(star);
                        }}
                        onMouseEnter={() => {
                          playHover();
                          setHoverRating(star);
                        }}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-125 cursor-pointer text-white/20"
                        aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${
                            star <= (hoverRating || rating)
                              ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
                              : "text-white/20"
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  {/* Name Input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="feedbackName" className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-wider">Your Name (Optional)</label>
                    <input
                      type="text"
                      id="feedbackName"
                      value={feedbackName}
                      onChange={(e) => setFeedbackName(e.target.value)}
                      placeholder="e.g. Naman Sable"
                      className="w-full px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-brand-cyan transition-colors"
                    />
                  </div>

                  {/* Comment Input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="feedbackComment" className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-wider">Comments *</label>
                    <textarea
                      required
                      id="feedbackComment"
                      value={feedbackComment}
                      onChange={(e) => setFeedbackComment(e.target.value)}
                      rows={3}
                      placeholder="Share your thoughts or recommendations..."
                      className="w-full px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-brand-cyan transition-colors resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        playClick();
                        setMode("chat");
                      }}
                      className="py-2.5 rounded-lg border border-white/10 bg-white/5 text-xs text-white font-mono hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmittingFeedback}
                      className="py-2.5 rounded-lg bg-gradient-to-r from-brand-cyan to-brand-blue text-xs text-brand-black font-bold uppercase tracking-wider font-mono hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      {isSubmittingFeedback ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        "Submit Feedback"
                      )}
                    </button>
                  </div>
                </motion.form>
              )}

              {/* Feedback Success State */}
              {mode === "feedback_success" && (
                <motion.div
                  key="feedback-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center h-full py-10"
                >
                  <div className="w-12 h-12 rounded-full bg-brand-cyan/10 border border-brand-cyan/25 flex items-center justify-center text-brand-cyan mb-4 animate-bounce">
                    <Star className="w-6 h-6 fill-brand-cyan" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Thank you!</h4>
                  <p className="text-xs text-white/60 max-w-xs leading-relaxed">
                    Nexnam team will contact you soon. Your valuable feedback has been registered.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Chat Footer QuickPrompts & Inputs */}
            {mode === "chat" && (
              <div className="p-3 border-t border-white/5 bg-brand-black/60 backdrop-blur-md">
                {/* Quick Prompts Options */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {[
                    { label: "💡 Services", text: "What services do you offer?" },
                    { label: "💻 Tech Stack", text: "What tech stack do you use?" },
                    { label: "📅 Timeline", text: "How long do projects take?" },
                    { label: "💬 Rate Us", action: () => setMode("feedback") }
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (p.action) {
                          playClick();
                          p.action();
                        } else {
                          handleSendMessage(p.text);
                        }
                      }}
                      onMouseEnter={playHover}
                      className="px-2.5 py-1.5 rounded-full border border-white/5 bg-white/5 hover:border-brand-cyan/35 hover:bg-brand-cyan/5 text-[10px] text-white/70 hover:text-white font-mono transition-all duration-300 cursor-pointer"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Input Text Form */}
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
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
