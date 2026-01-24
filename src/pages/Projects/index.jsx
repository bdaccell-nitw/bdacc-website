import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import ProjectCard from '../../components/ProjectCard';
import HeroAI from '../../components/HeroAI';
import CyberNav from '../../components/CyberNav';
import LoadingScreen from '../../components/LoadingScreen';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from('Projects').select('*');
        if (error) throw error;
        setProjects(data);
      } catch (err) {
        console.error('Supabase error:', err);
      } finally {
        // Add a slight delay (e.g., 1.5s) so the loader doesn't "flash" too fast
        // and Three.js has a moment to initialize
        setTimeout(() => setIsLoading(false), 600);
      }
    };

    fetchData();
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
              {projects?.map((project) => (
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