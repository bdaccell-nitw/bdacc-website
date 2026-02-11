// React hooks for state management and lifecycle
import { useEffect, useState } from "react";

// Reusable card component for displaying each member
import MemberCard from "../components/MemberCard";

// Supabase client instance
import { supabase } from "../services/supabase";

export default function Members() {
  // State to store members fetched from Supabase
  const [members, setMembers] = useState([]);

  // State to handle loading UI
  const [loading, setLoading] = useState(true);

  // Fetch members data when the component mounts
  useEffect(() => {
    async function fetchMembers() {
      // Query Supabase table "members"
      // - Fetch all columns
      // - Only approved members
      // - Ordered by creation time
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .eq("approved", true)
        .order("created_at", { ascending: true });

      // Handle error if any
      if (error) {
        console.error("Error fetching members:", error);
      } else {
        // Store fetched members in state
        setMembers(data);
      }

      // Stop loading once fetch is complete
      setLoading(false);
    }

    fetchMembers();
  }, []);

  // Show loading screen while data is being fetched
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading members...
      </div>
    );
  }

  // Separate members based on their role
  const coreTeam = members.filter(m => m.role === "Core Team");
  const leads = members.filter(m => m.role === "Lead");
  const regularMembers = members.filter(m => m.role === "Member");

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Page heading */}
        <h1 className="text-4xl font-bold text-blue-900 text-center mb-12">
          Our Team
        </h1>

        {/* Core Team Section */}
        <Section title="Core Team">
          {coreTeam.map(member => (
            <MemberCard
              key={member.id}
              name={member.name}
              role={member.role}
              image={member.image_url}
              linkedin={member.linkedin}
              github={member.github}
            />
          ))}
        </Section>

        {/* Leads Section */}
        <Section title="Leads">
          {leads.map(member => (
            <MemberCard
              key={member.id}
              name={member.name}
              role={member.role}
              image={member.image_url}
              linkedin={member.linkedin}
              github={member.github}
            />
          ))}
        </Section>

        {/* Members Section */}
        <Section title="Members">
          {regularMembers.map(member => (
            <MemberCard
              key={member.id}
              name={member.name}
              role={member.role}
              image={member.image_url}
              linkedin={member.linkedin}
              github={member.github}
            />
          ))}
        </Section>

      </div>
    </div>
  );
}

// Reusable section component for each role group
function Section({ title, children }) {
  // Do not render section if there are no members
  if (!children.length) return null;

  return (
    <section className="mb-16">
      {/* Section title */}
      <h2 className="text-2xl font-semibold text-blue-800 mb-6">
        {title}
      </h2>

      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {children}
      </div>
    </section>
  );
}



