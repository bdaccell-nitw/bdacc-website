import ProjectCard from '@/components/ui/ProjectCard';
import { createClient } from '@supabase/supabase-js';


export default async function ProjectsPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data: projects, error } = await supabase.from('Projects').select('*');

  if (error) {
    console.error('Supabase error:', error);
  }

  return (
    <main className="max-w-7xl mx-auto py-20 flex flex-col items-center gap-12 px-4">
      <h1 className="text-4xl font-bold">Our Projects</h1>
      <div className="flex flex-wrap gap-8 justify-center ">
        {projects?.map((project) => (
          <ProjectCard
            key={project.id}
            title={project["Project Title"]}
            description={project.Description}
            category={project.category}
            details={project.Details}
            githubLink={project["Github link"]}
            visitLink={project["live website"]}
          />
        ))}
      </div>
    </main>
  );
}