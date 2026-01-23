import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient'; // Corrected import
import ProjectCard from '../../components/ProjectCard';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from('Projects').select('*');
      if (error) {
        console.error('Supabase error:', error);
      } else {
        setProjects(data);
      }
    };

    fetchProjects();
  }, []);

  return (
    <main className="min-h-screen bg-[#050510] py-20 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
        <h1 className="text-4xl font-bold text-white">Our Projects</h1>
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
    </main>
  );
}