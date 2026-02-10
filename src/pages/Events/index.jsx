import React, { useMemo, useState } from "react";
import EventsList from "./EventsList";

const EVENTS = [
  {
    id: 1,
    title: "SQL knowledge and project",
    category: "workshop",
    date: "2025-10-09",
    time: "6:00 PM",
    venue: "NAB, NIT WARANGAL",
    image: "/events/sql.jpg",
    shortDescription:
      "Hands-on SQL workshop for beginners. ALSO YOU CAN BRING YOUR LAPTOPS TO PRACTICE SQL QUERIES AND WORK ON A MINI PROJECT TO APPLY YOUR LEARNING IN REAL-WORLD SCENARIOS.",
    status: "closed",
  },
  {
    id: 2,
    title: "Freshers' Orientation 2025",
    category: "workshop",
    date: "2025-09-22",
    time: "6:00 PM – 8:00 PM",
    venue: "cs 302, nit warangal",
    image: "/events/freshers.jpg",
    shortDescription:
      "Welcome session for incoming students to explore big data and analytics club.",
    longDescription:
      "Calling all aspiring engineers and innovators! Join Big Data and Analytics Club NIT Warangal's Freshers' Orientation and discover how to participate in competitions, workshops, and projects while building lifelong friendships.",
    status: "closed",
  },
  {
    id: 3,
    title: "Importance of AI in the modern world",
    category: "competition",
    date: "2025-03-10",
    time: "All Day",
    venue: "NIT Warangal",
    image: "/events/Importance of AI.jpg",
    shortDescription:
      "How AI is changing the modern world.",
    status: "open",
  },
];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents = useMemo(() => {
    if (activeTab === "all") return EVENTS;
    return EVENTS.filter((e) => e.category === activeTab);
  }, [activeTab]);

  const upcomingEvents = filteredEvents.filter((e) => new Date(e.date) >= new Date());
  const pastEvents = filteredEvents.filter((e) => new Date(e.date) < new Date());

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020b1c] via-[#04132d] to-[#020b1c] px-6 py-20 text-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-16">
          <h1 className="text-4xl font-bold tracking-wide text-[#6fffe9]">
            Events
          </h1>

          {/* Filter Tabs */}
          <div className="w-full flex justify-center mt-10">
            <div className="flex gap-4">
            {["all", "workshop", "competition"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full border transition-all ${
                  activeTab === tab
                    ? "bg-[#1de9b6] text-black border-[#1de9b6]"
                    : "border-[#1de9b6] text-[#1de9b6] hover:bg-[#1de9b6]/20"
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
          </div>
        </div>

        {/* Upcoming */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold text-[#6fffe9] mb-10">
            Upcoming Events
          </h2>
          <EventsList events={upcomingEvents} onSelect={setSelectedEvent} />
        </section>

        {/* Past */}
        <section>
          <h2 className="text-3xl font-semibold text-[#6fffe9] mb-10">
            Past Events
          </h2>
          <EventsList events={pastEvents} onSelect={setSelectedEvent} />
        </section>
      </div>

      {/* Pop up section on clicking the card */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="relative bg-[#0b1b34] max-w-xl w-full rounded-xl border border-[#1de9b6] shadow-[0_0_40px_#1de9b660] overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-3 right-3 text-white text-xl hover:text-[#1de9b6]"
            >
              ✕
            </button>

            {/* Image */}
            <div className="h-60 overflow-hidden">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-4">
              <h3 className="text-2xl font-semibold text-[#6fffe9]">
                {selectedEvent.title}
              </h3>

              <div className="text-sm text-gray-300 space-y-1">
                <p>📅 {selectedEvent.date}</p>
                <p>⏰ {selectedEvent.time}</p>
                <p>📍 {selectedEvent.venue}</p>
              </div>

              <div className="max-h-48 overflow-y-auto pr-2 text-gray-400 custom-scroll">
                {selectedEvent.longDescription}
              </div>

              <button
                className={`mt-4 py-3 rounded-lg font-semibold transition ${
                  selectedEvent.status === "open"
                    ? "bg-[#1de9b6] text-black hover:bg-[#6fffe9]"
                    : "bg-[#1de9b6]/40 text-black cursor-not-allowed"
                }`}
                disabled={selectedEvent.status !== "open"}
              >
                {selectedEvent.status === "open"
                  ? "Register Now"
                  : "Registration Closed"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
