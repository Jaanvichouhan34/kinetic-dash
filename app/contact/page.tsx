"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ChevronLeft, Send, MessageSquare, User } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulating API call
    setTimeout(() => setStatus("sent"), 2000);
  };

  return (
    <main className="min-h-screen bg-[#060606] text-white p-8 md:p-24 font-sans relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-2xl mx-auto"
      >
        {/* Navigation Link */}
        <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 group w-fit">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-[10px] uppercase tracking-widest">Back to Dash</span>
        </Link>

        {/* Page Header */}
        <header className="flex items-center gap-4 mb-12">
          <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20">
            <Mail className="text-purple-400" size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tighter italic uppercase leading-none">Signal_Transmission</h1>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-2">Direct Secure Line</p>
          </div>
        </header>

        {/* Transmission Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-zinc-500 uppercase ml-2">Identifier</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                <input required type="text" placeholder="Your Name" className="w-full bg-zinc-900/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-purple-500/50 transition-colors font-mono text-sm" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-zinc-500 uppercase ml-2">Return Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                <input required type="email" placeholder="email@example.com" className="w-full bg-zinc-900/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-purple-500/50 transition-colors font-mono text-sm" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-zinc-500 uppercase ml-2">Message Payload</label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-6 text-zinc-600" size={16} />
              <textarea required rows={5} placeholder="Type your message here..." className="w-full bg-zinc-900/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-purple-500/50 transition-colors font-mono text-sm resize-none" />
            </div>
          </div>

          <button 
            disabled={status !== "idle"}
            className="w-full py-4 bg-white text-black rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-purple-400 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {status === "idle" && <><Send size={16} /> Send Signal</>}
            {status === "sending" && <span className="animate-pulse">Transmitting...</span>}
            {status === "sent" && "Signal Delivered"}
          </button>
        </form>
      </motion.div>
    </main>
  );
}