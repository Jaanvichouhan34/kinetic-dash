"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, ChevronLeft, BarChart as  Cpu, Database } from "lucide-react";

export default function PerformancePage() {
  const [metrics, setMetrics] = useState({ cpu: 0, ram: 0 });

  // Simulate real-time data fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * (99 - 90 + 1) + 90),
        ram: Math.floor(Math.random() * (75 - 70 + 1) + 70),
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#060606] text-white p-8 md:p-24 font-sans relative">
      <div className="relative z-10 max-w-5xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 group w-fit">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-[10px] uppercase tracking-widest">Back to Dash</span>
        </Link>

        <header className="flex items-center gap-4 mb-16">
          <div className="p-4 bg-yellow-400/10 rounded-2xl border border-yellow-400/20">
            <Zap className="text-yellow-400" size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tighter italic uppercase">Core_Performance</h1>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Real-time Thread Monitoring</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CPU Metric Card */}
          <MetricCard 
            label="CPU Load" 
            value={metrics.cpu} 
            unit="%" 
            icon={<Cpu size={20} />} 
            color="text-yellow-400"
            barColor="bg-yellow-400"
          />

          {/* RAM Metric Card */}
          <MetricCard 
            label="Memory Usage" 
            value={metrics.ram} 
            unit="%" 
            icon={<Database size={20} />} 
            color="text-blue-400"
            barColor="bg-blue-400"
          />
        </div>
        

        <div className="mt-12 p-8 bg-zinc-900/30 border border-white/5 rounded-4xl backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="size-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">Live Optimization Log</span>
          </div>
          <div className="space-y-3 font-mono text-xs text-zinc-500">
            <p>{">"} Thread_01: Optimizing background cache...</p>
            <p>{">"} Thread_04: Load balancing across Node_Cluster_A</p>
            <p>{">"} System: Thermal status stable at 42°C</p>
          </div>
        </div>
      </div>
    </main>
  );
}
interface MetricProps {
  label: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  color: string;
  barColor: string;
}
function MetricCard({ label, value, unit, icon, color, barColor }: MetricProps) {
  return (
    <div className="p-8 bg-zinc-900/30 border border-white/5 rounded-[2.5rem] backdrop-blur-xl">
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 bg-black/40 rounded-xl border border-white/5 ${color}`}>
          {icon}
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">{label}</span>
      </div>
      
      <div className="flex items-baseline gap-1 mb-4">
        <motion.span 
          key={value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold tracking-tighter italic"
        >
          {value}
        </motion.span>
        <span className="text-xl text-zinc-600 font-bold">{unit}</span>
      </div>

      <div className="h-1.5 w-full bg-zinc-800/50 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          className={`h-full ${barColor} shadow-[0_0_15px_rgba(250,204,21,0.3)]`}
        />
      </div>
    </div>
  );
}