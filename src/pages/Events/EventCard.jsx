import React from "react";

export default function EventCard({ event, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-[#0b1b34] rounded-xl overflow-hidden border border-[#1de9b6]/20 hover:border-[#1de9b6] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_#1de9b650]"
    >
      {/* Image for the event used and hovering of image also */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Category badge as seggregated to all, workshops and competitions */}
        <span className="absolute top-3 right-3 bg-[#1de9b6] text-black text-xs font-bold px-3 py-1 rounded-full">
          {event.category.toUpperCase()}
        </span>
      </div>

      {/* class for the Content of the card */}
      <div className="p-4 text-white flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-[#6fffe9]">
          {event.title}
        </h3>

        <div className="text-sm text-gray-300 flex flex-col gap-1">
          <p>📅 {event.date}</p>
          <p>⏰ {event.time}</p>
          <p>📍 {event.venue}</p>
        </div>

        {/* Scrollable description */}
        <div className="text-sm text-gray-400 max-h-20 overflow-y-auto pr-1 custom-scroll">
          {event.shortDescription}
        </div>
      </div>
    </div>
  );
}
