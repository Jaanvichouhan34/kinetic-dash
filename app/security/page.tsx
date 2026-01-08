"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ChevronLeft, Terminal } from "lucide-react";

// Helper component for the typewriter effect
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.p 
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
      transition={{ 
        duration: 0.8, 
        delay: delay, 
        ease: "easeOut" 
      }}
      className="overflow-hidden whitespace-nowrap leading-relaxed border-r-2 border-transparent animate-caret"
    >
      {text}
    </motion.p>
  );
}

export default function SecurityPage() {
  const [isBreachActive, setIsBreachActive] = useState(false);

  return (
    <main className={`min-h-screen transition-colors duration-700 p-8 md:p-24 font-sans relative overflow-hidden ${isBreachActive ? 'bg-red-950' : 'bg-[#060606]'} text-white`}>
      
      {/* Background Alarm Pulse */}
      <AnimatePresence>
        {isBreachActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="fixed inset-0 bg-red-600 pointer-events-none z-0"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-4xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 group w-fit">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-[10px] uppercase tracking-widest">Back to Dash</span>
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl border transition-all duration-500 ${isBreachActive ? 'bg-red-500/20 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'bg-blue-500/10 border-blue-500/20'}`}>
              <Shield className={isBreachActive ? 'text-red-500' : 'text-blue-400'} size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tighter italic uppercase leading-none">Security_Logs</h1>
              <p className={`text-[10px] font-mono mt-2 uppercase tracking-widest ${isBreachActive ? 'text-red-400' : 'text-zinc-500'}`}>
                {isBreachActive ? "Status: Breach Detected" : "Status: Optimal"}
              </p>
            </div>
          </div>

          <button 
            onClick={() => setIsBreachActive(!isBreachActive)}
            className={`px-6 py-3 rounded-xl font-mono text-[10px] uppercase tracking-widest transition-all duration-300 ${
              isBreachActive 
              ? 'bg-white text-red-600 font-bold shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105' 
              : 'bg-red-600/10 text-red-500 border border-red-500/30 hover:bg-red-600 hover:text-white'
            }`}
          >
            {isBreachActive ? "Initialize Reset" : "Simulate Breach"}
          </button>
        </div>

        {/* Dynamic Log Terminal */}
        <div className={`bg-black/60 border rounded-3xl p-8 backdrop-blur-2xl font-mono text-sm min-h-100 transition-colors duration-500 ${isBreachActive ? 'border-red-500/30 shadow-[0_0_40px_rgba(239,68,68,0.1)]' : 'border-white/5'}`}>
          <div className="flex items-center gap-2 mb-6 text-zinc-500 border-b border-white/5 pb-4">
            <Terminal size={14} />
            <span className="text-[10px] uppercase tracking-widest">System_Console v1.0</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-3 text-emerald-500/80">
              <span className="opacity-50">01</span>
              <p>[OK] Initializing security handshake...</p>
            </div>
            <div className="flex gap-3 text-emerald-500/80">
              <span className="opacity-50">02</span>
              <p>[OK] Encryption keys verified.</p>
            </div>
            
            <AnimatePresence>
              {isBreachActive && (
                <div className="space-y-4 mt-4">
                  <div className="flex gap-3 text-red-500 font-bold">
                    <span className="opacity-50 font-normal">03</span>
                    <TypewriterText text="[CRITICAL] UNAUTHORIZED ACCESS DETECTED AT NODE_7" delay={0.2} />
                  </div>
                  <div className="flex gap-3 text-red-400">
                    <span className="opacity-50">04</span>
                    <TypewriterText text="[WARN] Firewall bypass attempted: IP 104.28.14.92" delay={1.2} />
                  </div>
                  <div className="flex gap-3 text-red-400">
                    <span className="opacity-50">05</span>
                    <TypewriterText text="[WARN] Initiating lockdown protocol..." delay={2.2} />
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}