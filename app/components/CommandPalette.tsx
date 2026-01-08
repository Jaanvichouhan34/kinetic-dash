"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Layout, Shield, Activity, X, Zap,Mail } from "lucide-react";
export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Fix: We define COMMANDS inside so it has access to router
  // We memoize COMMANDS so it doesn't trigger unnecessary re-renders
  const COMMANDS = useMemo(() => [
    { 
      id: "dash", 
      name: "Go to Dashboard", 
      icon: <Layout size={14} />, 
      action: () => router.push("/") 
    },
    { 
  id: "contact", 
  name: "Send Secure Message", 
  icon: <Mail size={14} />, 
  action: () => router.push("/contact") 
},
{ 
  id: "act", 
  name: "View Activity Stream", 
  icon: <Activity size={14} />, 
  action: () => router.push("/activity") 
},
    { 
  id: "perf", 
  name: "Check System Performance", 
  icon: <Zap size={14} />, 
  action: () => router.push("/performance") 
},
    { 
      id: "sec", 
      name: "View Security Logs", 
      icon: <Shield size={14} />, 
      action: () => router.push("/security") 
    },
    { 
      id: "stat", 
      name: "System Status", 
      icon: <Activity size={14} />, 
      action: () => alert("Status: Optimal") 
    },
  ], [router]); // Router is a dependency here

  // Now we filter based on the memoized COMMANDS and the query
  const filteredCommands = useMemo(() => {
    return query === "" 
      ? COMMANDS 
      : COMMANDS.filter((cmd) => 
          cmd.name.toLowerCase().includes(query.toLowerCase())
        );
  }, [query, COMMANDS]); // Added COMMANDS to dependencies

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={() => setIsOpen(false)}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center p-5 border-b border-white/5">
              <Search className="mr-3 text-zinc-500" size={20} />
              <input 
                autoFocus
                placeholder="Type a command..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-white w-full text-base"
              />
              <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="p-3 max-h-75 overflow-y-auto">
              <p className="px-3 py-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Navigation_Nodes</p>
              
              {filteredCommands.map((cmd) => (
                <div 
                  key={cmd.id}
                  onClick={() => {
                    cmd.action();
                    setIsOpen(false);
                    setQuery("");
                  }}
                  className="p-4 hover:bg-white/5 rounded-2xl cursor-pointer flex justify-between items-center text-sm transition-all text-white group"
                >
                  <div className="flex items-center gap-4">
                    <span className="p-2 bg-zinc-800 rounded-lg group-hover:bg-yellow-400 group-hover:text-black transition-colors">{cmd.icon}</span>
                    <span className="font-medium">{cmd.name}</span>
                  </div>
                  <kbd className="text-[10px] text-zinc-600 font-mono italic">ENTER</kbd>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}