import { useEffect, useState } from 'react';
import ProjectCard from '../../components/ProjectCard';
import HeroAI from '../../components/HeroAI';
import CyberNav from '../../components/CyberNav';
import LoadingScreen from '../../components/LoadingScreen';

const PROJECTS_DATA = [
  {
    id: 1,
    "Project Title": "BDACC Official Website",
    "Description": "A high-performance, cyber-themed website of the club showcasing our events, blogs, projects, and members",
    "category": "Web Development",
    "Details": "Built using React, Tailwind CSS, and Framer Motion with Three.js integration for neural network visualizations.",
    "Github link": "https://github.com/bdaccell-nitw/bdacc-website.git",
    "live website": "#"
  },
  {
    id: 2,
    "Project Title": "Email Intelligence Agent",
    "Description": "An advanced two-tier system for email analytics and autonomous response generation.",
    "category": "Artificial Intelligence",
    "Details": "Features an Analytics Layer for tracking response metrics and an Agent Layer utilizing LLMs for context-aware drafting and action automation.",
    "Github link": "https://github.com/bdaccell-nitw/email-intelligence-agent.git",
  }
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 1. Loading Layer */}
      {isLoading && <LoadingScreen />}

      <main className={`relative min-h-screen w-full bg-[#050510] text-white font-sans selection:bg-blue-500/30 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Background Layer */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <HeroAI />
        </div>

        {/* Content Layer */}
        <div className='relative z-10 py-20 px-4'>
          <CyberNav />
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
            <p className="mt-8 px-8 py-3 border border-blue-400/50 bg-blue-900/20 backdrop-blur-md rounded-full text-lg md:text-2xl text-white font-light tracking-wide w-fit mx-auto shadow-[0_0_15px_rgba(59,130,246,0.5)] [text-shadow:0_0_10px_#3b82f6]">
              Our Projects
            </p>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {PROJECTS_DATA.map((project) => (
                <div key={project.id} className="w-full max-w-sm">
                  <ProjectCard
                    title={project["Project Title"]}
                    description={project.Description}
                    category={project.category}
                    details={project.Details}
                    githubLink={project["Github link"]}
                    visitLink={project["live website"]}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}