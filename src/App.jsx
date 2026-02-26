
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroAI from "./components/HeroAI";
import Contact from "./components/contact";
import Members from "./pages/Members";
import Events from "./pages/Events";
import Blogs from "./pages/Blogs";
import ProjectsPage from "./pages/Projects";

/* ---------------- HOME ---------------- */

function Home() {
  return (
    <main className="relative min-h-screen w-full bg-[#050510] text-white overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* HERO COMPONENT */}
      <HeroAI />

      {/* Cyber-Nav */}
      <nav className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20 border-b border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="text-xl font-bold tracking-widest text-blue-400 font-mono">
          BDACC
        </div>
        <div className="hidden md:flex gap-8 text-xs font-mono tracking-widest text-slate-400">
          <a href="/events" className="hover:text-blue-400 transition-colors">[EVENTS]</a>
          <a href="/blogs" className="hover:text-blue-400 transition-colors">[BLOGS]</a>
          <a href="/projects" className="hover:text-blue-400 transition-colors">[PROJECTS]</a>
          <a href="/members" className="hover:text-blue-400 transition-colors">[MEMBERS]</a>
          <a href="#contact" className="hover:text-blue-400 transition-colors">[CONTACT]</a>
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 flex flex-col items-center justify-between min-h-screen px-4 pointer-events-none">
        
        <div className="h-20 shrink-0"></div>

        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl w-full">
          
          <div className="mb-6 px-3 py-1 border border-blue-500/30 bg-blue-900/10 text-blue-300 text-[10px] font-mono tracking-[0.3em] uppercase backdrop-blur-md">
            Neural Network Online
          </div>

          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white 
          [text-shadow:0_0_10px_#3b82f6,0_0_20px_#3b82f6,0_0_40px_#3b82f6,0_0_80px_#3b82f6]">
            BDACC
          </h1>

          <p className="mt-8 px-8 py-3 border border-blue-400/50 bg-blue-900/20 backdrop-blur-md rounded-full text-lg md:text-2xl text-white font-light tracking-wide w-fit mx-auto shadow-[0_0_15px_rgba(59,130,246,0.5)] [text-shadow:0_0_10px_#3b82f6]">
            Data <span className="text-blue-300 px-2">•</span> Analytics <span className="text-blue-300 px-2">•</span> Consulting
          </p>

        </div>

        <div className="w-full max-w-5xl pb-12 shrink-0">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 w-full border-t border-white/10 pt-8">
            <StatItem number="6" label="Active Projects" />
            <StatItem number="18" label="Members" />
            <StatItem number="2019" label="Founded" />
          </div>
        </div>
      </div>

      <div id="contact" className="relative z-10 pointer-events-auto">
        <Contact />
      </div>

      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#050510] via-[#050510]/80 to-transparent pointer-events-none"></div>
    </main>
  );
}

/* ---------------- STATS ---------------- */

function StatItem({ number, label }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 border border-white/5 bg-white/5 backdrop-blur-sm">
      <span className="text-3xl font-black font-mono">{number}</span>
      <span className="text-xs text-blue-400 uppercase tracking-widest mt-1 font-mono text-center">{label}</span>
    </div>
  );
}

/* ---------------- APP ROUTER ---------------- */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<Members />} />
        <Route path="/events" element={<Events />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

