"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Send, Bot, User, FileText, ArrowLeft, RefreshCcw, ShieldCheck } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
type Source = {
  page: number;
  text: string;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  isThinking?: boolean;
};

export default function ChatPage() {
  // --- State ---
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I am your NIST Compliance Auditor. I can help you verify rules against the CSF 2.0 framework. What would you like to check today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  // --- Auto-Scroll Logic ---
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // --- Handlers ---
  const handleSearch = async () => {
    if (!query.trim()) return;

    // 1. Add User Message immediately
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: query,
    };
    
    // 2. Add temporary "Thinking" placeholder
    const thinkingMsg: Message = {
        id: "thinking",
        role: "assistant",
        content: "",
        isThinking: true
    };

    setMessages((prev) => [...prev, userMsg, thinkingMsg]);
    
    const currentQuery = query;
    setQuery(""); // Clear input instantly
    setIsLoading(true);

    try {
      // 🚀 CONNECT TO RENDER BACKEND
      const res = await fetch("https://audit-ai-backend.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: currentQuery }),
      });

      if (!res.ok) throw new Error("Network error");

      const data = await res.json();

      // 3. Replace "Thinking" bubble with Real Answer
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === "thinking" 
            ? { 
                id: Date.now().toString(), 
                role: "assistant", 
                content: data.answer, 
                sources: data.sources 
              } 
            : msg
        )
      );

    } catch (err) {
      // Handle Error gracefully
      setMessages((prev) => 
        prev.map((msg) => 
            msg.id === "thinking" 
            ? { 
                id: Date.now().toString(), 
                role: "assistant", 
                content: "I'm having trouble connecting to the Audit Brain right now. Please try again." 
                } 
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  // --- Render ---
  return (
    <div className="flex flex-col h-screen bg-[#020617] text-gray-100 font-sans selection:bg-blue-500/30">
      
      {/* HEADER */}
      <header className="flex items-center justify-between px-6 py-4 bg-[#0B1120]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30">
             <ShieldCheck className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-white">AuditAI</h1>
            <p className="text-xs text-blue-400 font-medium">NIST Compliance Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
             {/* Reset Chat Button */}
            <button 
                onClick={() => setMessages([messages[0]])}
                className="p-2 hover:bg-white/5 rounded-full text-gray-400 transition"
                title="Reset Chat"
            >
                <RefreshCcw className="w-4 h-4" />
            </button>

            {/* HOME LINK */}
            <Link 
                href="/"
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-all hover:scale-105 active:scale-95"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Home</span>
            </Link>
        </div>
      </header>

      {/* CHAT HISTORY AREA */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scroll-smooth">
        <div className="max-w-3xl mx-auto space-y-6 pb-4">
          
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div className={`
                    flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center 
                    ${msg.role === "assistant" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}
                `}>
                    {msg.role === "assistant" ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>

                {/* Bubble */}
                <div className={`
                    max-w-[85%] rounded-2xl p-4 shadow-sm border
                    ${msg.role === "user" 
                        ? "bg-blue-600 border-blue-500 text-white" 
                        : "bg-[#111827] border-gray-800 text-gray-200"
                    }
                `}>
                    {msg.isThinking ? (
                        /* Bouncing Dots Animation */
                        <div className="flex space-x-2 h-6 items-center px-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        </div>
                    ) : (
                        /* Real Text with Markdown */
                        <div className="prose prose-invert prose-p:leading-relaxed prose-sm max-w-none">
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                    )}

                    {/* Source Citations */}
                    {/* Sources (Only for Assistant) */}
{msg.sources && msg.sources.length > 0 && (
    <div className="mt-4 pt-3 border-t border-gray-700/50 space-y-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <FileText className="w-3 h-3" /> Cited Sources
        </p>
        <div className="grid grid-cols-1 gap-2">
            {msg.sources.map((source, idx) => (
                <a 
                    key={idx} 
                    href={`https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf#page=${source.page}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-black/20 p-2 rounded border border-white/5 text-xs hover:border-blue-500/50 hover:bg-blue-500/10 transition-all cursor-pointer"
                >
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-blue-400 font-bold group-hover:underline">
                            Page {source.page}
                        </span>
                        <span className="text-[10px] text-gray-600 group-hover:text-blue-300">
                            External PDF ↗
                        </span>
                    </div>
                    <span className="text-gray-400 line-clamp-2 italic group-hover:text-gray-300">
                        "{source.text}"
                    </span>
                </a>
            ))}
        </div>
    </div>
)}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Scroll Anchor */}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* INPUT AREA */}
      <div className="p-4 bg-[#020617]/80 backdrop-blur-lg border-t border-white/10">
        <div className="max-w-3xl mx-auto relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSearch()}
            placeholder="Ask about compliance (e.g., 'What is the govern function?')"
            disabled={isLoading}
            className="w-full pl-5 pr-14 py-4 bg-[#0F172A] border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-gray-200 placeholder-gray-500 shadow-xl disabled:opacity-50 transition-all"
          />
          <button
            onClick={handleSearch}
            disabled={isLoading || !query.trim()}
            className="absolute right-3 top-3 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-center text-xs text-gray-600 mt-3 font-medium">
          Powered by Llama-3, Google Gemini & Qdrant
        </p>
      </div>
    </div>
  );
}