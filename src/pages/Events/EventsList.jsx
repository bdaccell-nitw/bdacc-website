import EventCard from "./EventCard";

const EventsList =({events}) => {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((Event) => (
                <EventCard
                    key={Event.id}
                    title={Event.title}
                    date={Event.date}
                    description={Event.description}
                    Status={Event.Status}
                />
            ))}
        </div>
    );
};

export default EventsList;