import React from "react";
import EventCard from "./EventCard";

export default function EventsList({ events, onSelect }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onClick={() => onSelect(event)}
        />
      ))}
    </div>
  );
}
