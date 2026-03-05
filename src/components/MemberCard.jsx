import { Linkedin, Github } from "lucide-react";

export default function MemberCard({ name, role, image, linkedin, github }) {

  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name || "BDACC Member"
  )}&background=020617&color=38bdf8`;

  // Convert Google Drive links to direct image links
  const convertDriveLink = (url) => {
    if (!url) return null;

    if (url.includes("drive.google.com")) {

      // Case 1: /file/d/FILE_ID/view
      let match = url.match(/\/file\/d\/([^/]+)/);
      if (match) {
        return `https://lh3.googleusercontent.com/d/${match[1]}`;
      }

      // Case 2: open?id=FILE_ID
      match = url.match(/[?&]id=([^&]+)/);
      if (match) {
        return `https://lh3.googleusercontent.com/d/${match[1]}`;
      }
    }

    return url;
  };

  const src = image && image.trim()
    ? convertDriveLink(image)
    : fallbackAvatar;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-blue-400/50 hover:bg-white/10 transition">
      
      <img
        src={src}
        alt={name}
        loading="lazy"
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border border-white/20"
        onError={(e) => {
          if (e.currentTarget.src !== fallbackAvatar) {
            e.currentTarget.src = fallbackAvatar;
          }
        }}
      />

      <h3 className="text-lg font-semibold text-white">
        {name}
      </h3>

      <p className="text-xs font-mono tracking-widest text-slate-400 mb-4 uppercase">
        {role}
      </p>

      <div className="flex justify-center gap-4 mt-2">

        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-200 transition"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        )}

        {github && (
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-slate-700/40 text-slate-200 hover:bg-slate-600/60 hover:text-white transition"
          >
            <Github className="w-4 h-4" />
          </a>
        )}

      </div>
    </div>
  );
}