"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, FileText, ChevronRight, ArrowLeft, StopCircle, RefreshCcw, ShieldCheck } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// --- Types ---
type Source = {
  file: string;
  page: number;
  text: string;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  isStreaming?: boolean;
};

export default function ChatInterface() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello. I am AuditAI. I'm ready to audit your internal policies against the NIST CSF 2.0 framework.",
      isStreaming: false
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async () => {
    if (!query.trim()) return;

    const userQuery = query;
    setQuery("");
    setIsLoading(true);

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: userQuery };
    setMessages((prev) => [...prev, userMsg]);

    const assistantId = (Date.now() + 1).toString();
    const assistantMsg: Message = { 
      id: assistantId, 
      role: "assistant", 
      content: "", 
      isStreaming: true 
    };
    setMessages((prev) => [...prev, assistantMsg]);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      
      const response = await fetch(`${apiUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userQuery, history: [] }),
      });

      if (!response.body) throw new Error("ReadableStream not supported.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedContent = "";
      let buffer = "";

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;
        
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.trim()) continue;
            try {
              const data = JSON.parse(line);

              if (data.type === "token") {
                accumulatedContent += data.content;
                setMessages((prev) => 
                  prev.map((msg) => 
                    msg.id === assistantId ? { ...msg, content: accumulatedContent } : msg
                  )
                );
              }

              if (data.type === "sources") {
                setMessages((prev) => 
                  prev.map((msg) => 
                    msg.id === assistantId ? { ...msg, sources: data.content, isStreaming: false } : msg
                  )
                );
              }
            } catch (e) { console.warn("Parse error", e); }
          }
        }
      }
    } catch (error) {
      setMessages((prev) => prev.map(msg => msg.id === assistantId ? { ...msg, content: "Network Error: Could not reach the server.", isStreaming: false } : msg));
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
      setMessages([messages[0]]);
      setQuery("");
  };

  return (
    <div className="flex flex-col h-full bg-[#09090b] text-gray-100 font-sans rounded-xl border border-white/10 shadow-2xl overflow-hidden">
      
      {/* --- HEADER --- */}
      <header className="flex items-center justify-between px-6 py-4 bg-[#18181b] border-b border-white/5 z-20">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-600/20 rounded-lg border border-emerald-500/20">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
                <h1 className="font-bold text-base text-white">AuditAI Console</h1>
                <p className="text-xs text-gray-400">NIST CSF 2.0 • Live Agent</p>
            </div>
        </div>
        
        <div className="flex items-center gap-2">
            <button 
                onClick={handleReset} 
                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                title="Reset Chat"
            >
                <RefreshCcw size={18} />
            </button>
            <Link href="/">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg transition-all">
                    <ArrowLeft size={16} />
                    <span>Exit</span>
                </button>
            </Link>
        </div>
      </header>

      {/* --- MESSAGES AREA --- */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              
              {/* Avatar */}
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border
                ${msg.role === "assistant" 
                  ? "bg-[#18181b] border-white/10 text-emerald-500" 
                  : "bg-emerald-600 border-emerald-500 text-white"}
              `}>
                {msg.role === "assistant" ? <Bot size={20} /> : <User size={20} />}
              </div>

              {/* Message Bubble */}
              <div className={`flex flex-col max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                
                <div className={`
                  px-6 py-4 rounded-2xl text-[16px] leading-relaxed shadow-sm
                  ${msg.role === "user" 
                    ? "bg-emerald-600 text-white" 
                    : "bg-[#27272a] text-gray-100 border border-white/5"}
                `}>
                  
                  {/* Markdown Content */}
                  <div className="prose prose-invert prose-p:my-2 prose-headings:text-white prose-strong:text-white max-w-none">
                    <ReactMarkdown
                       components={{
                        ul: ({node, ...props}) => <ul className="list-disc pl-6 space-y-2 mb-4" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-6 space-y-2 mb-4" {...props} />,
                        li: ({children}) => <li className="pl-1">{children}</li>,
                        h3: ({node, ...props}) => <h3 className="text-sm font-bold text-emerald-400 mt-6 mb-2 uppercase tracking-wide" {...props} />,
                        code: ({node, ...props}) => <code className="bg-black/30 px-1.5 py-0.5 rounded text-sm font-mono text-emerald-300" {...props} />,
                        p: ({children}) => (
                            <p className="mb-2 last:mb-0">
                                {children}
                                {msg.isStreaming && msg.role === "assistant" && (
                                    <span className="inline-block w-2 h-5 ml-1 align-bottom bg-emerald-500 animate-pulse" />
                                )}
                            </p>
                        ),
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>

                  {/* Thinking Indicator */}
                  {msg.role === "assistant" && msg.content === "" && msg.isStreaming && (
                    <div className="flex gap-1.5 h-6 items-center">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></span>
                    </div>
                  )}

                </div>

                {/* --- FIXED SOURCES CAROUSEL --- */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-4 w-full border-t border-white/5 pt-4">
                    <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <FileText size={12} /> Verified Citations
                    </p>
                    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                      {msg.sources.map((source, idx) => {
                        
                        // FIX: Force correct name and URL for NIST-only mode
                        const displayName = "NIST CSF 2.0"; 
                        const officialUrl = `https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf#page=${source.page}`;

                        return (
                        <a 
                          key={idx}
                          href={officialUrl} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            flex-shrink-0 w-72 p-4 rounded-xl border border-white/10 bg-[#18181b] 
                            hover:border-emerald-500/50 hover:bg-[#202025] transition-all cursor-pointer group
                            flex flex-col justify-between h-full
                          "
                        >
                          <div>
                            <div className="flex justify-between items-center mb-3 border-b border-white/5 pb-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-emerald-400">
                                        {displayName}
                                    </span>
                                </div>
                                <span className="text-xs font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded group-hover:text-white">
                                    Pg {source.page}
                                </span>
                            </div>
                            <p className="text-xs text-gray-300 leading-relaxed line-clamp-3 italic">
                            "{source.text}"
                            </p>
                          </div>
                          
                          <div className="mt-3 flex items-center gap-1 text-[10px] text-emerald-600 font-bold uppercase tracking-wide group-hover:text-emerald-400">
                            <span>View Source PDF</span>
                            <ChevronRight size={10} />
                          </div>
                        </a>
                      )})}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* --- INPUT AREA --- */}
      <div className="p-6 bg-[#09090b] border-t border-white/10 z-20">
        <div className="max-w-4xl mx-auto relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
              placeholder="Ask a compliance question..."
              disabled={isLoading}
              className="w-full bg-[#18181b] text-gray-100 border border-white/10 rounded-xl px-5 py-4 pr-16 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all placeholder-gray-500 shadow-lg"
            />
            
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !query.trim()}
              className={`
                absolute right-2 p-2.5 rounded-lg transition-all
                ${query.trim() 
                    ? "bg-emerald-600 text-white hover:bg-emerald-500 shadow-md" 
                    : "bg-transparent text-gray-600 cursor-not-allowed"}
              `}
            >
              {isLoading ? <StopCircle size={20} className="animate-pulse" /> : <Send size={20} />}
            </button>
        </div>
        <div className="text-center mt-3">
             <p className="text-[11px] text-gray-500">
                AI generated responses can be inaccurate. Always verify against the official NIST PDF.
             </p>
        </div>
      </div>

    </div>
  );
}