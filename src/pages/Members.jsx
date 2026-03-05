// // React hooks for state management and lifecycle
// import { useEffect, useState } from "react";

// // Reusable card component for displaying each member
// import MemberCard from "../components/MemberCard";

// // Supabase client instance
// import { supabase } from "../services/supabase";

// export default function Members() {
//   // State to store members fetched from Supabase
//   const [members, setMembers] = useState([]);

//   // State to handle loading UI
//   const [loading, setLoading] = useState(true);

//   // Fetch members data when the component mounts
//   useEffect(() => {
//     async function fetchMembers() {
//       // Query Supabase table "members"
//       // - Fetch all columns
//       // - Only approved members
//       // - Ordered by creation time
//       const { data, error } = await supabase
//         .from("members")
//         .select("*")
//         .eq("approved", true)
//         .order("created_at", { ascending: true });

//       // Handle error if any
//       if (error) {
//         console.error("Error fetching members:", error);
//       } else {
//         // Store fetched members in state
//         setMembers(data);
//       }

//       // Stop loading once fetch is complete
//       setLoading(false);
//     }

//     fetchMembers();
//   }, []);

//   // Show loading screen while data is being fetched
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-600">
//         Loading members...
//       </div>
//     );
//   }

//   // Separate members based on their role
//   const coreTeam = members.filter(m => m.role === "Core Team");
//   const leads = members.filter(m => m.role === "Lead");
//   const regularMembers = members.filter(m => m.role === "Member");

//   return (
//     <div className="min-h-screen bg-gray-50 px-6 py-12">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Page heading */}
//         <h1 className="text-4xl font-bold text-blue-900 text-center mb-12">
//           Our Team
//         </h1>

//         {/* Core Team Section */}
//         <Section title="Core Team">
//           {coreTeam.map(member => (
//             <MemberCard
//               key={member.id}
//               name={member.name}
//               role={member.role}
//               image={member.image_url}
//               linkedin={member.linkedin}
//               github={member.github}
//             />
//           ))}
//         </Section>

//         {/* Leads Section */}
//         <Section title="Leads">
//           {leads.map(member => (
//             <MemberCard
//               key={member.id}
//               name={member.name}
//               role={member.role}
//               image={member.image_url}
//               linkedin={member.linkedin}
//               github={member.github}
//             />
//           ))}
//         </Section>

//         {/* Members Section */}
//         <Section title="Members">
//           {regularMembers.map(member => (
//             <MemberCard
//               key={member.id}
//               name={member.name}
//               role={member.role}
//               image={member.image_url}
//               linkedin={member.linkedin}
//               github={member.github}
//             />
//           ))}
//         </Section>

//       </div>
//     </div>
//   );
// }

// // Reusable section component for each role group
// function Section({ title, children }) {
//   // Do not render section if there are no members
//   if (!children.length) return null;

//   return (
//     <section className="mb-16">
//       {/* Section title */}
//       <h2 className="text-2xl font-semibold text-blue-800 mb-6">
//         {title}
//       </h2>

//       {/* Responsive grid layout */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//         {children}
//       </div>
//     </section>
//   );
// }



import { useEffect, useState } from "react";
import MemberCard from "../components/MemberCard";
import HeroAI from "../components/HeroAI";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const normalizeProfileUrl = (value) => {
    if (!value || typeof value !== "string") return "";
    const trimmed = value.trim();
    if (!trimmed) return "";
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }
    return `https://${trimmed}`;
  };

  useEffect(() => {
    async function fetchFromSheet() {
      try {
        const response = await fetch(
          "https://docs.google.com/spreadsheets/d/1P8w1QZY4TaAEs-EkUgyn_YugIOxfHM87I47xTo3v0hs/gviz/tq?tqx=out:json"
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch sheet: ${response.status}`);
        }

        const text = await response.text();

        // Strip the JS wrapper from Google Visualization API response
        const json = JSON.parse(
          text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1)
        );

        const cols = json.table.cols.map((col) => col.label);
        const rows = json.table.rows || [];

        const parsedMembers = rows
          .map((row, index) => {
            const obj = {};
            cols.forEach((label, colIndex) => {
              obj[label] = row.c[colIndex]?.v ?? "";
            });

            return {
              id: index + 1,
              name: obj["Name"],
              rollNumber: obj["ROLL NUMBER"],
              role: obj["Role"],
              teamLead: obj["Are you lead of a team? If yes, mention it"],
              image: obj["Image(YOUR PHOTO)"],
              linkedin: normalizeProfileUrl(obj["LINKEDIN URL"]),
              github: normalizeProfileUrl(obj["GITHUB URL"]),
            };
          })
          .filter((m) => m.name); // filter out completely empty rows

        setMembers(parsedMembers);
        console.log("Loaded members from sheet:", parsedMembers);
      } catch (err) {
        console.error("Error loading members from sheet:", err);
        setError("Unable to load members right now.");
      } finally {
        setLoading(false);
      }
    }

    fetchFromSheet();
  }, []);

  if (loading) {
    return (
      <main className="relative min-h-screen w-full bg-[#050510] text-white overflow-hidden font-sans selection:bg-blue-500/30">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-slate-300">
          Loading members...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="relative min-h-screen w-full bg-[#050510] text-white overflow-hidden font-sans selection:bg-blue-500/30">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-red-300">
          {error}
        </div>
      </main>
    );
  }

  const normalizeRole = (role) => (role || "").toLowerCase().trim();

  const genSecs = members.filter(
    (m) => normalizeRole(m.role) === "gen sec"
  );
  const additionalSecs = members.filter(
    (m) => normalizeRole(m.role) === "additional secs(4th years)"
  );
  const jointSecs = members.filter(
    (m) => normalizeRole(m.role) === "joint secs(3rd years)"
  );
  const executives = members.filter(
    (m) => normalizeRole(m.role) === "executives(2nd years)"
  );
  const volunteers = members.filter(
    (m) => normalizeRole(m.role) === "volunteers(1st years)"
  );

  return (
    <main className="relative min-h-screen w-full bg-[#050510] text-white overflow-hidden font-sans selection:bg-blue-500/30">
      <HeroAI />
      <Navbar />

      <div className="relative z-10 flex flex-col items-center min-h-screen px-4 pt-32 pb-16">
        <div className="max-w-6xl w-full">
          <p className="text-xs font-mono tracking-[0.4em] text-slate-400 text-center">
            // MEMBERS
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-center">
            Meet the <span className="text-blue-400">BDACC Team</span>
          </h1>
          <p className="mt-4 text-sm md:text-base text-slate-300 text-center max-w-2xl mx-auto">
            The people behind BDACC&apos;s projects, events, and community.
          </p>

          <div className="mt-12 space-y-12">
            <Section title="GEN SEC">
              {genSecs.map((member) => (
                <MemberCard key={member.id} {...member} />
              ))}
            </Section>

            <Section title="Additional secs (4th years)">
              {additionalSecs.map((member) => (
                <MemberCard key={member.id} {...member} />
              ))}
            </Section>

            <Section title="Joint secs (3rd years)">
              {jointSecs.map((member) => (
                <MemberCard key={member.id} {...member} />
              ))}
            </Section>

            <Section title="Executives (2nd years)">
              {executives.map((member) => (
                <MemberCard key={member.id} {...member} />
              ))}
            </Section>

            <Section title="Volunteers (1st years)">
              {volunteers.map((member) => (
                <MemberCard key={member.id} {...member} />
              ))}
            </Section>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#050510] via-[#050510]/80 to-transparent pointer-events-none" />
    </main>
  );
}

function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20 border-b border-white/5 bg-black/20 backdrop-blur-sm">
      <a
        href="/"
        className="text-xl font-bold tracking-widest text-blue-400 font-mono hover:text-blue-300 transition-colors"
      >
        BDACC
      </a>
      <div className="hidden md:flex gap-8 text-xs font-mono tracking-widest text-slate-400">
        <a href="/events" className="hover:text-blue-400 transition-colors">
          [EVENTS]
        </a>
        <a href="#" className="hover:text-blue-400 transition-colors">
          [BLOGS]
        </a>
        <a href="#" className="hover:text-blue-400 transition-colors">
          [PROJECTS]
        </a>
        <a href="/members" className="hover:text-blue-400 transition-colors">
          [MEMBERS]
        </a>
        <a href="/#contact" className="hover:text-blue-400 transition-colors">
          [CONTACT]
        </a>
      </div>
    </nav>
  );
}

function Section({ title, children }) {
  if (!children.length) return null;

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-semibold text-blue-800 mb-6">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {children}
      </div>
    </section>
  );
}