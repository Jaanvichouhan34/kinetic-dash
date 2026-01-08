"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CommandPalette from "./components/CommandPalette";
import { motion, AnimatePresence, useTransform, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { Activity, Zap, Shield, Smartphone, Github, Linkedin, Instagram, User, X, Code2, Globe, Sun, Moon } from "lucide-react";

export default function Home() {
  const [isBioOpen, setIsBioOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Sync the theme with the HTML element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const bgX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const bgY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  function handleMouseMove({ clientX, clientY }: React.MouseEvent) {
    mouseX.set(clientX);
    mouseY.set(clientY);
  }

  return (
    <main 
      onMouseMove={handleMouseMove}
      className="min-h-screen transition-colors duration-500 bg-white dark:bg-[#060606] text-zinc-900 dark:text-white p-8 md:p-24 font-sans selection:bg-yellow-400 selection:text-black overflow-hidden relative"
    >
      {/* Dynamic Aurora Glow */}
      <motion.div 
        style={{
          background: useMotionTemplate`radial-gradient(650px circle at ${bgX}px ${bgY}px, ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}, transparent 80%)`,
        }}
        className="pointer-events-none fixed inset-0 z-0"
      />

      <div className="relative z-10">
        <CommandPalette />

        {/* Header Section */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl font-bold tracking-tighter italic uppercase"
            >
              KINETIC DASH
            </motion.h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">v1.0 // SENSORY_LINK_ACTIVE</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:scale-105 transition-all shadow-sm"
            >
              {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-blue-600" />}
            </button>

            {[
              { icon: <Github size={18} />, href: "https://github.com/Jaanvichouhan34", hover: "hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black" },
              { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/jaanvi-chouhan", hover: "hover:bg-blue-600 hover:text-white" },
              { icon: <Instagram size={18} />, href: "https://www.instagram.com/jaanvi_chouhan18", hover: "hover:bg-pink-600 hover:text-white" }
            ].map((link, i) => (
              <a 
                key={i}
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-2 bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-lg transition-all border border-zinc-200 dark:border-zinc-800 ${link.hover}`}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
          <Link href="/security" className="h-full">
            <BentoCard 
              title="Security" 
              icon={<Shield className="text-blue-400" />} 
              isDark={isDark}
            />
          </Link>

          <Link href="/performance" className="md:col-span-2 md:row-span-2">
            <BentoCard 
              title="Performance" 
              icon={<Zap className="text-yellow-400" />} 
              isDark={isDark}
              className="h-full"
            >
              <div className="mt-6 h-32 w-full bg-zinc-200 dark:bg-zinc-950/50 rounded-2xl border border-black/5 dark:border-white/5 overflow-hidden relative shadow-inner">
                <motion.div 
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  className="absolute inset-0 bg-linear-to-r from-transparent via-yellow-400/10 to-transparent w-full"
                />
                <div className="p-6 flex items-end h-full">
                  <span className="text-5xl font-mono font-bold tracking-tighter text-yellow-500">99.2<span className="text-xl opacity-50">%</span></span>
                </div>
              </div>
            </BentoCard>
          </Link>

          <Link href="/activity">  
            <BentoCard 
              title="Activity" 
              icon={<Activity className="text-emerald-400" />} 
              isDark={isDark}
            >
              <div className="flex items-end gap-1.5 mt-4 h-8">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [12, 32, 18, 28, 12] }}
                    transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.15 }}
                    className="w-1.5 bg-emerald-500/40 rounded-full"
                  />
                ))}
              </div>
            </BentoCard>
          </Link>

          <Link href="/contact" className="md:col-span-2">
            <BentoCard 
              title="Mobile Access" 
              icon={<Smartphone className="text-purple-400" />} 
              isDark={isDark}
              className="h-full"
            >
              <div className="mt-4 w-full bg-zinc-100 dark:bg-zinc-800/20 p-4 rounded-xl border border-black/5 dark:border-white/5">
                <div className="flex justify-between mb-2">
                  <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">Battery Integrity</span>
                  <span className="text-[10px] font-mono text-purple-500">88%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-900 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "88%" }}
                    transition={{ duration: 1.5, ease: "circOut", delay: 0.5 }}
                    className="h-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]" 
                  />
                </div>
              </div>
            </BentoCard>
          </Link>
        </div>

        {/* Footer Branding */}
        <footer className="mt-24 text-center border-t border-zinc-200 dark:border-zinc-900 pt-10">
          <button 
            onClick={() => setIsBioOpen(true)}
            className="group text-zinc-500 text-[10px] font-mono tracking-[0.3em] uppercase transition-all hover:text-zinc-900 dark:hover:text-white"
          >
            Engineered by <span className="font-bold group-hover:underline decoration-yellow-400 underline-offset-4 text-zinc-900 dark:text-white">Jaanvi Chouhan</span>
          </button>
        </footer>
      </div>

      {/* Bio Modal Overlay */}
      <AnimatePresence>
        {isBioOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md" onClick={() => setIsBioOpen(false)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-[2.5rem] p-8 overflow-hidden shadow-2xl"
            >
              <button onClick={() => setIsBioOpen(false)} className="absolute top-6 right-6 text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
                <X size={20} />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="size-16 rounded-2xl bg-yellow-400 flex items-center justify-center text-black shadow-lg">
                  <User size={32} strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tighter italic text-zinc-900 dark:text-white">Jaanvi Chouhan</h2>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase mt-1">Fullstack_Developer // Designer</p>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-mono">
                  &gt; Specialize in building high-performance sensory interfaces and scalable architectures. I focus on the intersection of physics-based design and code integrity.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/5 rounded-2xl">
                    <Code2 size={16} className="text-yellow-400 mb-2" />
                    <p className="text-[10px] text-zinc-500 uppercase font-mono">Core Tech</p>
                    <p className="text-xs font-bold mt-1 text-zinc-900 dark:text-white">React / Next.js</p>
                  </div>
                  <div className="p-4 bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/5 rounded-2xl">
                    <Globe size={16} className="text-blue-400 mb-2" />
                    <p className="text-[10px] text-zinc-500 uppercase font-mono">Location</p>
                    <p className="text-xs font-bold mt-1 text-zinc-900 dark:text-white">Global / Remote</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <a 
                  href="https://github.com/Jaanvichouhan34" 
                  target="_blank" 
                  className="flex-1 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black text-center text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-yellow-400 hover:text-black transition-colors"
                >
                  GitHub
                </a>
                <button 
                  onClick={() => setIsBioOpen(false)} 
                  className="flex-1 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white text-center text-[10px] font-bold uppercase tracking-widest rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

function BentoCard({ 
  title, 
  icon, 
  className = "", 
  children, 
  isDark 
}: { 
  title: string; 
  icon: React.ReactNode; 
  className?: string; 
  children?: React.ReactNode; 
  isDark: boolean; 
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const cardMouseX = useMotionValue(0);
  const cardMouseY = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  return (
    <div style={{ perspective: "1200px" }} className={`h-full ${className}`}>
      <motion.div 
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - (rect.left + rect.width / 2));
          y.set(e.clientY - (rect.top + rect.height / 2));
          cardMouseX.set(e.clientX - rect.left);
          cardMouseY.set(e.clientY - rect.top);
        }}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX, rotateY }}
        whileTap={{ scale: 0.98 }}
        className="rounded-4xl p-7 flex flex-col justify-between cursor-crosshair relative overflow-hidden group h-full transition-all duration-700 bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/10 backdrop-blur-xl shadow-sm dark:shadow-none"
      >
        <motion.div 
          style={{
            background: useMotionTemplate`radial-gradient(200px circle at ${cardMouseX}px ${cardMouseY}px, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}, transparent 80%)`,
          }}
          className="absolute inset-0 pointer-events-none"
        />

        <div className="relative z-10">
          <div className="size-11 rounded-2xl bg-zinc-100 dark:bg-black/40 flex items-center justify-center border border-zinc-200 dark:border-white/10 group-hover:border-yellow-500 transition-all duration-500 shadow-lg">
            {icon}
          </div>
          {children}
        </div>
        
        <div className="z-10 mt-4 text-left">
          <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white group-hover:text-yellow-500 transition-colors duration-500">{title}</h3>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1.5 font-mono">Sensory_Node: Active</p>
        </div>
      </motion.div>
    </div>
  );
}