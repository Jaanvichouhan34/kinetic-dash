"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
// Removed Star and Terminal to fix unused variable warnings
import { Activity, ChevronLeft, GitBranch, GitCommit } from "lucide-react";

// 1. Define an Interface to fix "Unexpected any" errors
interface GitHubEvent {
  id: string;
  type: string;
  desc: string;
  time: string;
  repo: string;
}

export default function ActivityPage() {
  // 2. Apply the interface to the state
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHubActivity() {
      try {
        const response = await fetch("https://api.github.com/users/Jaanvichouhan34/events/public");
        const data = await response.json();
        
        // 3. Map the data using explicit types instead of 'any'
        const formattedEvents = data.slice(0, 5).map((githubEvent: { id: string; type: string; created_at: string; repo: { name: string }; payload: { commits?: { message: string }[] } }) => ({
          id: githubEvent.id,
          type: githubEvent.type.replace("Event", "").toUpperCase(),
          desc: githubEvent.payload.commits?.[0]?.message || `Action in ${githubEvent.repo.name}`,
          time: new Date(githubEvent.created_at).toLocaleDateString(),
          repo: githubEvent.repo.name
        }));
        
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Failed to fetch activity", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubActivity();
  }, []);

  return (
    <main className="min-h-screen bg-[#060606] text-white p-8 md:p-24 font-sans relative">
      <div className="relative z-10 max-w-3xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 group w-fit">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-[10px] uppercase tracking-widest">Back to Dash</span>
        </Link>

        <header className="flex items-center gap-4 mb-16">
          <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <Activity className="text-emerald-400" size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tighter italic uppercase">Live_Activity</h1>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Real GitHub Stream</p>
          </div>
        </header>

        <div className="space-y-4">
          {loading ? (
             <p className="text-center font-mono text-zinc-500 animate-pulse">Establishing Connection to GitHub...</p>
          ) : (
            events.map((event, i) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 bg-zinc-900/30 border border-white/5 rounded-3xl backdrop-blur-xl hover:bg-white/5 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-6">
                  <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-emerald-400">
                    {event.type === "PUSH" ? <GitCommit size={14} /> : <GitBranch size={14} />}
                  </div>
                  <div>
                    {/* 4. Fixed the Comment Textnode Error here by putting '//' in curly braces */}
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">{event.type} {"//"} {event.repo}</p>
                    <p className="text-sm font-medium text-zinc-200">{event.desc}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-zinc-600">{event.time}</span>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}