'use client';
import React from 'react';
import { Target, BrainCircuit, Coffee, Zap, BellRing } from 'lucide-react';

// Simplified illustration style (CSS-only for efficiency)
const StudyIllustration = () => (
  <div className="relative w-full h-[300px] bg-sky-100 border-4 border-black shadow-[8px_8px_0_0_#000]">
    {/* Floating "Book" shape */}
    <div className="absolute top-10 left-10 w-24 h-32 bg-orange-400 border-4 border-black rotate-[-15deg] flex flex-col p-3 gap-2 shadow-[4px_4px_0_0_#000]">
      <div className="h-2 w-full bg-black/20"></div>
      <div className="h-2 w-full bg-black/20"></div>
      <div className="h-2 w-2/3 bg-black/20"></div>
    </div>

    {/* Floating "Clock" shape */}
    <div className="absolute top-24 right-16 w-20 h-20 bg-yellow-300 rounded-full border-4 border-black flex items-center justify-center shadow-[4px_4px_0_0_#000]">
      <div className="w-1.5 h-8 bg-black rotate-45 origin-bottom"></div>
      <div className="absolute w-2 h-2 bg-black rounded-full"></div>
    </div>

    {/* Center "Person Studying" abstract shape */}
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 h-16 bg-blue-500 border-4 border-black flex items-center justify-center font-bold text-white uppercase text-xs tracking-widest shadow-[4px_4px_0_0_#000]">
      <Zap className="w-5 h-5 mr-2 text-yellow-300" /> Winding Deep Work
    </div>

    {/* Background Grid Pattern (Simulates graph paper) */}
    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
  </div>
);

const featureData = [
  { icon: Target, title: "Context Swapping", desc: "Instantly adjust for lectures, seminars, or labs." },
  { icon: BrainCircuit, title: "Neural Breaks", desc: "AI-scheduled rest to prevent exam burnout." },
  { icon: Coffee, title: "Social Weaving", desc: "Integrates study groups and friend time naturally." }
];

const ChronoWeaveStudent = () => {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-orange-300">
      
      {/* Cool Student Nav */}
      <nav className="border-b-4 border-black bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black flex items-center justify-center">
              <Zap className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter">Chrono<span className="text-blue-600">Weave</span></span>
          </div>

          <div className="hidden md:flex gap-8 font-bold text-sm uppercase tracking-wider">
            <a href="#" className="hover:text-blue-600 transition-colors">How it works</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Curriculum AI</a>
            <button className="text-orange-600 font-extrabold text-sm uppercase group relative">
              Login
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </button>
          </div>

        </div>
      </nav>

      {/* Hero: The Casual Pitch */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-block bg-yellow-300 border-2 border-black px-4 py-1 font-mono text-xs mb-6 font-bold shadow-[2px_2px_0_0_#000]">
            AI-POWERED STUDENT ROUTINES V1.2
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter leading-none mb-8">
            Stop making lists. <br />
            Start <span className="text-orange-500 underline decoration-black/10 decoration-8 underline-offset-[-1px]">Weaving.</span>
          </h1>
          <p className="text-lg text-black/80 mb-12 max-w-lg leading-relaxed">
            ChronoWeave takes your chaotic semester—lectures, deadlines, and social life—and turns it into a smooth, effortless routine. Zero stress, maximum results.
          </p>
          <div className="flex gap-4">
            <button className="group relative bg-blue-600 text-white px-10 py-5 text-lg font-bold uppercase shadow-[8px_8px_0_0_#000] hover:bg-blue-500 transition-colors">
              <span className="group-active:translate-y-px">Generate My Routine</span>
            </button>
          </div>
        </div>

        {/* Hero Illustration Block */}
        <div className="relative group">
          <div className="absolute inset-0 bg-black shadow-[20px_20px_0_0_#000] border-4 border-black group-hover:shadow-[10px_10px_0_0_#000] transition-all"></div>
          <div className="relative transform group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform">
            <StudyIllustration />
          </div>
        </div>
      </section>

      {/* Features: Neo-Cards */}
      <section className="py-20 bg-stone-50 border-t-4 border-black px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          {featureData.map((f, i) => (
            <div key={i} className="bg-white border-4 border-black p-10 shadow-[8px_8px_0_0_#000] group hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 bg-black flex items-center justify-center mb-8 border-4 border-black shadow-[4px_4px_0_0_#3b82f6]">
                 <f.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight mb-4">{f.title}</h3>
              <p className="text-black/70 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Casual Social Proof / Footer */}
      <footer className="py-16 text-center border-t-4 border-black">
        <div className="font-mono text-xs uppercase text-stone-500 mb-6 tracking-widest">Woven by Students, for Students</div>
        <div className="w-16 h-1 w-16 bg-black mx-auto mb-12"></div>
        <p className="text-xs text-stone-500">© 2026 ChronoWeave. Built on caffeine and AI.</p>
      </footer>

    </div>
  );
};

export default ChronoWeaveStudent;