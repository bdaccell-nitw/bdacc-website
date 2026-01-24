import { Link } from 'react-router-dom';

export default function CyberNav() {
  return (
    <nav className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20 border-b border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="text-xl font-bold tracking-widest text-blue-400 font-mono">
        BDACC
      </div>
      <div className="hidden md:flex gap-8 text-xs font-mono tracking-widest text-slate-400">
        <a href="#" className="hover:text-blue-400 transition-colors">[EVENTS]</a>
        <a href="#" className="hover:text-blue-400 transition-colors">[BLOGS]</a>
        <a href="/projects" className="hover:text-blue-400 transition-colors">
          [PROJECTS]
        </a>
        <a href="#" className="hover:text-blue-400 transition-colors">[MEMBERS]</a>
        <a href="#" className="hover:text-blue-400 transition-colors">[CONTACT]</a>
      </div>
    </nav>
  )
}