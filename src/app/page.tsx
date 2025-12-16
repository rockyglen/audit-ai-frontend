"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Database, Cpu, FileSearch, Layers, BrainCircuit, Lock, Terminal, Code2, Network } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#020617] text-white font-sans selection:bg-emerald-500/30 relative overflow-hidden">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div style={{ y: yBg }} className="absolute inset-0 bg-[linear-gradient(to_right,#064e3b_1px,transparent_1px),linear-gradient(to_bottom,#064e3b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-emerald-600/20 rounded-full blur-[120px] opacity-40" />
      </div>

      {/* --- NAVBAR --- */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto border-b border-white/5 bg-[#020617]/50 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-emerald-600 to-teal-600 rounded-lg shadow-lg shadow-emerald-500/20">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">AuditAI</span>
        </div>
        <div className="flex gap-6 items-center">
            <Link href="https://github.com/rockyglen/audit-ai-backend" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                View Source Code
            </Link>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center pt-20 pb-32 px-4">
        
        {/* --- HERO SECTION --- */}
        <div className="text-center max-w-5xl mx-auto space-y-8 mb-16">
            
            {/* PROMINENT BADGE */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md"
            >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Powered by LangGraph & Llama-3
            </motion.div>

            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-2xl"
            >
                The Instant NIST CSF 2.0 <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                    Compliance Expert
                </span>
            </motion.h1>

            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
                A production-grade <strong>Agentic RAG System</strong> that doesn't just search—it <em>reasons</em>. 
                Verify compliance rules instantly with zero hallucinations.
            </motion.p>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
                <Link href="/chat">
                    <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-xl shadow-emerald-500/20 flex items-center gap-3">
                        <span>Launch Console</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </Link>
            </motion.div>
        </div>

        {/* --- TECH STACK BANNER --- */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="w-full max-w-4xl border-y border-white/5 bg-white/[0.02] py-6 mb-24 backdrop-blur-sm"
        >
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <TechItem name="LangGraph" icon={<Network size={18} className="text-orange-400"/>} />
                <TechItem name="Llama 3" icon={<BrainCircuit size={18} className="text-blue-400"/>} />
                <TechItem name="Qdrant" icon={<Database size={18} className="text-red-400"/>} />
                <TechItem name="FastAPI" icon={<Cpu size={18} className="text-teal-400"/>} />
                <TechItem name="Docker" icon={<Layers size={18} className="text-blue-500"/>} />
            </div>
            <p className="text-center text-[10px] text-gray-600 mt-4 uppercase tracking-widest font-semibold">Built on Modern Agentic Architecture</p>
        </motion.div>

        {/* --- 3D APP PREVIEW --- */}
        <motion.div 
            initial={{ opacity: 0, y: 100, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring" }}
            className="relative w-full max-w-5xl mx-auto mb-32 perspective-1000"
        >
            <div className="relative rounded-xl border border-white/10 bg-[#0f172a]/80 shadow-2xl backdrop-blur-sm overflow-hidden transform transition-all hover:scale-[1.01] duration-500 group">
                {/* Browser Toolbar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#020617]">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="ml-4 px-3 py-1 rounded bg-white/5 text-[10px] text-gray-500 font-mono w-64 text-center">
                        https://audit-ai-frontend-pi.vercel.app/
                    </div>
                </div>
                {/* UI Preview */}
                <div className="p-8 grid grid-cols-4 gap-6 h-[400px] opacity-80 pointer-events-none">
                    <div className="col-span-1 border-r border-white/5 space-y-3">
                        <div className="h-8 bg-emerald-600/20 rounded w-3/4" />
                        <div className="h-4 bg-white/5 rounded w-1/2" />
                        <div className="h-4 bg-white/5 rounded w-2/3" />
                        <div className="h-4 bg-white/5 rounded w-1/2" />
                    </div>
                    <div className="col-span-3 space-y-4 pt-10 px-10">
                        <div className="flex gap-4 flex-row-reverse">
                            <div className="w-10 h-10 rounded-full bg-gray-700/50" />
                            <div className="px-4 py-2 bg-emerald-600 rounded-2xl text-xs text-white flex items-center">
                                What is the Recover function?
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-600/20" />
                            <div className="space-y-2 w-full">
                                <div className="h-4 bg-white/5 rounded w-3/4" />
                                <div className="h-4 bg-white/5 rounded w-1/2" />
                                <div className="flex gap-2 mt-2">
                                    <div className="h-8 w-32 bg-teal-900/30 border border-teal-500/30 rounded flex items-center justify-center text-[10px] text-teal-300">NIST CSF 2.0</div>
                                    <div className="h-8 w-32 bg-teal-900/30 border border-teal-500/30 rounded flex items-center justify-center text-[10px] text-teal-300">Page 42</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
            </div>
            <div className="absolute -inset-4 bg-emerald-500/20 blur-3xl -z-10 rounded-[3rem]" />
        </motion.div>

        {/* --- ARCHITECTURE FLOW --- */}
        <div className="w-full max-w-6xl mb-32">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
                <p className="text-gray-400">The Modern RAG Pipeline</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 -z-10" />

                <ArchitectureStep 
                    icon={<Layers size={24} />} 
                    step="01" 
                    title="Ingestion" 
                    desc="We load the NIST CSF 2.0 PDF and split it into 1000-character semantic chunks." 
                />
                <ArchitectureStep 
                    icon={<Database size={24} />} 
                    step="02" 
                    title="Vector Store" 
                    desc="Chunks are embedded using Google Gemini and stored in Qdrant Cloud." 
                />
                <ArchitectureStep 
                    icon={<BrainCircuit size={24} />} 
                    step="03" 
                    title="Reasoning" 
                    desc="Llama-3 synthesizes the answer from valid chunks." 
                />
                <ArchitectureStep 
                    icon={<Lock size={24} />} 
                    step="04" 
                    title="Verification" 
                    desc="Sources are cited with page-level accuracy." 
                />
            </div>
        </div>

        {/* --- BENTO GRID FEATURES (HIGHLIGHTING LANGGRAPH) --- */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. Vector Search */}
            <div className="p-8 rounded-3xl bg-[#0f172a]/50 border border-white/5 hover:border-emerald-500/30 transition-all group relative overflow-hidden flex flex-col justify-between">
                <div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-400">
                        <Database size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Vector Search</h3>
                    <p className="text-gray-400 text-sm">Powered by Qdrant & Gemini Embeddings for high-precision retrieval.</p>
                </div>
            </div>

            {/* 2. THE LANGGRAPH HIGHLIGHT (The "Best Thing") */}
            <div className="md:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-teal-900/30 via-[#0f172a] to-[#0f172a] border border-teal-500/30 hover:border-teal-400/50 transition-all relative overflow-hidden group">
                
                {/* Background Animation for prominence */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-teal-500/20 flex items-center justify-center text-teal-300 border border-teal-500/30 shadow-[0_0_15px_rgba(45,212,191,0.3)]">
                        <Network size={32} className="animate-pulse" />
                    </div>
                    <div>
                        <div className="inline-block px-3 py-1 mb-2 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider border border-teal-500/20">
                            Core Brain
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Autonomous LangGraph Agent</h3>
                        <p className="text-gray-300 text-base max-w-md">
                            A cyclical graph state machine that manages chat history, self-corrects hallucinations, and intelligently routes non-compliance queries.
                        </p>
                    </div>
                </div>
            </div>

            {/* 3. Citations */}
            <div className="md:col-span-3 p-8 rounded-3xl bg-[#0f172a]/50 border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col md:flex-row items-center justify-between gap-8">
                 <div className="text-left">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-400">
                        <FileSearch size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Strict Citation Protocol</h3>
                    <p className="text-gray-400 text-sm max-w-xl">
                        AuditAI forces the LLM to provide page-level citations for every claim, ensuring zero hallucinations.
                    </p>
                 </div>
                 {/* Visual Citation */}
                 <div className="hidden sm:flex gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                    <div className="bg-emerald-900/30 p-3 rounded-lg border border-emerald-500/30 w-32 text-center">
                        <span className="text-emerald-200 text-xs font-bold">NIST CSF 2.0</span>
                    </div>
                    <div className="bg-emerald-900/30 p-3 rounded-lg border border-emerald-500/30 w-32 text-center">
                        <span className="text-emerald-200 text-xs font-bold">Page 42</span>
                    </div>
                 </div>
            </div>
        </div>

        {/* --- FOOTER --- */}
        <footer className="mt-32 pt-10 border-t border-white/5 w-full max-w-6xl flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
                <ShieldCheck className="w-5 h-5 text-gray-600" />
                <span>AuditAI Project</span>
            </div>
            <div className="flex gap-6">
                <Link href="https://github.com/rockyglen/audit-ai-backend" className="hover:text-white cursor-pointer transition-colors">
                    GitHub
                </Link>
            </div>
        </footer>

      </main>
    </div>
  );
}

function TechItem({ name, icon }: { name: string, icon: React.ReactNode }) {
    return (
        <span className="text-sm font-bold text-gray-300 flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
            {icon} {name}
        </span>
    )
}

function ArchitectureStep({ icon, step, title, desc }: { icon: React.ReactNode, step: string, title: string, desc: string }) {
    return (
        <div className="relative p-6 rounded-2xl bg-[#0f172a] border border-white/5 hover:border-emerald-500/30 transition-all text-center group z-10">
            <div className="w-12 h-12 mx-auto rounded-full bg-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors mb-4 border-4 border-[#020617]">
                {icon}
            </div>
            <div className="absolute top-4 right-4 text-xs font-bold text-gray-700 group-hover:text-emerald-500/50">
                {step}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
        </div>
    )
}