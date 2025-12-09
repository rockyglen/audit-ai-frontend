import Link from "next/link";
import { 
  Bot, 
  Database, 
  ShieldCheck, 
  Cpu, 
  ArrowRight, 
  Search, 
  Zap, 
  Server,
  GitBranch,
  MessageSquare,
  FileText
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="p-2 bg-blue-600 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span>AuditAI</span>
          </div>
          <div className="flex gap-6 text-sm font-medium text-gray-400">
            <a href="#architecture" className="hover:text-blue-400 transition">System Design</a>
            <a href="#stack" className="hover:text-blue-400 transition">Tech Stack</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            System Online
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            Automated Compliance <br />
            <span className="text-blue-500">Auditing Engine</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            An autonomous RAG system that audits regulatory documents against the NIST Cybersecurity Framework using Semantic Routing and Vector Search.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/chat"
              className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-blue-500/20"
            >
              Launch Auditor
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="https://github.com"
              target="_blank"
              className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl font-semibold transition-all flex items-center gap-2"
            >
              View Source Code
            </a>
          </div>
        </div>
      </section>

      {/* --- LIVE ARCHITECTURE DIAGRAM --- */}
      <section id="architecture" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">System Architecture</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            A visual breakdown of how AuditAI processes queries using a Router-First RAG pipeline.
          </p>
        </div>

        {/* Diagram Container */}
        <div className="relative max-w-4xl mx-auto">
            
          {/* Connecting Line (Vertical Spine) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0 hidden md:block" />

          <div className="space-y-12 relative z-10">
            
            {/* Node 1: User Input */}
            <div className="flex flex-col items-center">
                <div className="p-4 bg-[#0B1120] border border-blue-500/30 rounded-2xl shadow-lg shadow-blue-900/20 w-64 text-center relative group hover:scale-105 transition duration-300">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">Input</div>
                    <div className="w-10 h-10 bg-gray-800 rounded-full mx-auto mb-3 flex items-center justify-center group-hover:bg-blue-600 transition">
                        <Search className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-white">User Query</h3>
                    <p className="text-xs text-gray-400 mt-1">"What is the Govern function?"</p>
                </div>
                <ArrowRight className="w-6 h-6 text-blue-500 rotate-90 mt-4 hidden md:block" />
            </div>

            {/* Node 2: Semantic Router */}
            <div className="flex flex-col items-center">
                <div className="p-6 bg-[#0B1120] border border-purple-500/30 rounded-2xl shadow-lg shadow-purple-900/20 w-80 text-center relative hover:scale-105 transition duration-300">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">Decision Layer</div>
                    <div className="w-12 h-12 bg-purple-900/30 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <GitBranch className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="font-bold text-purple-100 text-lg">Semantic Router (AI)</h3>
                    <p className="text-xs text-gray-400 mt-2">Analyzes intent: Is this a greeting or a compliance question?</p>
                </div>
            </div>

            {/* Split Paths */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24">
                
                {/* Path A: Chat */}
                <div className="flex flex-col items-center relative">
                    <div className="absolute -top-8 left-1/2 w-px h-8 bg-purple-500/30 hidden md:block origin-bottom -rotate-45" style={{ transformOrigin: 'bottom center', height: '40px', top: '-40px', left: '50%'}}></div>
                    <div className="p-5 bg-[#0B1120] border border-green-500/30 rounded-2xl w-full max-w-sm hover:border-green-500/60 transition">
                        <div className="flex items-center gap-3 mb-2">
                            <MessageSquare className="w-5 h-5 text-green-400" />
                            <span className="text-sm font-bold text-green-400">Path A: Casual Chat</span>
                        </div>
                        <p className="text-xs text-gray-400">Instant response for greetings. Bypasses database to save cost & latency.</p>
                    </div>
                </div>

                {/* Path B: RAG */}
                <div className="flex flex-col items-center relative">
                    <div className="absolute -top-8 left-1/2 w-px h-8 bg-purple-500/30 hidden md:block origin-bottom rotate-45" style={{ transformOrigin: 'bottom center', height: '40px', top: '-40px', left: '50%'}}></div>
                    <div className="p-5 bg-[#0B1120] border border-blue-500/30 rounded-2xl w-full max-w-sm hover:border-blue-500/60 transition">
                        <div className="flex items-center gap-3 mb-2">
                            <Database className="w-5 h-5 text-blue-400" />
                            <span className="text-sm font-bold text-blue-400">Path B: Vector Search</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-3">1. Embed Query (Google Gemini)<br/>2. Retrieve Top-3 Chunks (Qdrant)<br/>3. Re-Rank Results</p>
                        
                        {/* Sub-node for Data */}
                        <div className="flex items-center gap-2 p-2 bg-blue-900/10 rounded border border-blue-500/20">
                            <FileText className="w-3 h-3 text-gray-400" />
                            <span className="text-[10px] text-gray-400">NIST_Framework_2.0.pdf</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Node 3: Synthesis */}
            <div className="flex flex-col items-center pt-8">
                <ArrowRight className="w-6 h-6 text-gray-600 rotate-90 mb-4 hidden md:block" />
                <div className="p-6 bg-gradient-to-br from-[#0B1120] to-blue-900/10 border border-white/10 rounded-2xl w-80 text-center relative shadow-xl hover:shadow-blue-500/10 transition">
                     <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">Synthesis</div>
                    <div className="w-12 h-12 bg-white/5 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <Bot className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="font-bold text-white text-lg">Llama-3 Reasoning</h3>
                    <p className="text-xs text-gray-400 mt-2">Combines user query + retrieved NIST contexts to generate a fact-checked audit report.</p>
                </div>
            </div>

          </div>
        </div>
      </section>

      {/* Tech Stack Strip */}
      <section id="stack" className="py-20 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-10 text-center text-gray-500 uppercase tracking-widest text-sm">
            Powered by Modern Infrastructure
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center opacity-70">
             <div className="flex flex-col items-center gap-3 hover:text-blue-400 transition hover:scale-110 duration-300">
                <Search className="w-8 h-8" />
                <span className="font-semibold">Google Gemini</span>
             </div>
             <div className="flex flex-col items-center gap-3 hover:text-red-400 transition hover:scale-110 duration-300">
                <Database className="w-8 h-8" />
                <span className="font-semibold">Qdrant Cloud</span>
             </div>
             <div className="flex flex-col items-center gap-3 hover:text-orange-400 transition hover:scale-110 duration-300">
                <Cpu className="w-8 h-8" />
                <span className="font-semibold">Groq LPU</span>
             </div>
             <div className="flex flex-col items-center gap-3 hover:text-purple-400 transition hover:scale-110 duration-300">
                <Server className="w-8 h-8" />
                <span className="font-semibold">Render</span>
             </div>
             <div className="flex flex-col items-center gap-3 hover:text-white transition hover:scale-110 duration-300">
                <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold">N</div>
                <span className="font-semibold">Next.js 14</span>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5">
        <p>© 2025 AuditAI. Built for specific regulatory compliance auditing.</p>
      </footer>
    </div>
  );
}