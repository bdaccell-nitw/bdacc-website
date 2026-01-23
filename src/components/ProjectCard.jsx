import { useState } from 'react';
import { Globe } from 'lucide-react';

export default function ProjectCard({ title, description, category, details, githubLink, visitLink }) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Note: I'm using [#06b6d4] as a substitute for your brand-accent. 
  // Change this hex code to your specific brand color if it's different!

  return (
    <div
      className="group h-[400px] w-80 [perspective:1000px] cursor-pointer hover:scale-[1.02] transition-all shadow-lg"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative h-full w-full rounded-xl transition-all duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* FRONT SIDE */}
        {/* Changed border-brand-accent/30 to border-[#06b6d4]/30 */}
        <div className="absolute inset-0 rounded-2xl bg-slate-900 border border-[#06b6d4]/30 p-8 shadow-lg [backface-visibility:hidden] flex flex-col justify-between">
          <div>
            <span className="text-[#06b6d4] font-bold uppercase tracking-widest text-xs">
              {category}
            </span>
            <h3 className="text-white text-2xl font-bold mt-2">{title}</h3>
            {/* Added break-words to prevent the gibberish text from overflowing horizontally */}
            <p className="text-slate-300 mt-4 overflow-y-auto max-h-32 scrollbar-hide break-words">
              {description}
            </p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <a 
              href={githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} 
              className="flex"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
            </a>
            {visitLink ? (
              <a 
                href={visitLink} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Globe className="ml-4 text-white" />
              </a>
            ) : null}
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="absolute inset-0 rounded-2xl bg-slate-900 border border-[#06b6d4]/30 p-8 text-white shadow-xl [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between">
          <div>
            <h4 className="text-[#06b6d4] font-bold mb-2">Details</h4>
            <p className="text-slate-300 overflow-y-auto max-h-40 scrollbar-hide break-words">
              {details}
            </p>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <a 
              href={githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} 
              className="flex"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
            </a>
            {visitLink ? (
              <a 
                href={visitLink} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Globe className="ml-4 text-white" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}