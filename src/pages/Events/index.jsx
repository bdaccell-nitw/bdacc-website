import EventsList from "./EventsList";

const EventsPage =() => {
    const ongoingEvents = [
        {
            id: 1,
            title: "React Conference 2025",
            date: "2025-09-15",
            description: "Join us for a day of React talks and networking.",
            Status: "Ongoing",
        },
        {
            id: 2,
            title: "JavaScript Summit",
            date: "2025-10-10",
            description: "A summit for JavaScript enthusiasts and professionals.",
            Status: "Ongoing",
        }
    ];

    const upcomingEvents = [
        {
            id: 3,
            title: "React Conference 2025",
            date: "2025-09-15",
            description: "Join us for a day of React talks and networking.",
            Status: "Ongoing",
        },
        {
            id: 4,
            title: "JavaScript Summit",
            date: "2025-10-10",
            description: "A summit for JavaScript enthusiasts and professionals.",
            Status: "Ongoing",
        }
    ];

    const pastEvents = [
        {
            id: 5,
            title: "React Conference 2025",
            date: "2025-09-15",
            description: "Join us for a day of React talks and networking.",
            Status: "Ongoing",
        },
        {
            id: 6,
            title: "JavaScript Summit",
            date: "2025-10-10",
            description: "A summit for JavaScript enthusiasts and professionals.",
            Status: "Ongoing",
        }
    ];
    return (
        <div className="min-h-screen px-6 py-12 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-12">Events</h1>

            <section className="mb-16">
                <h2 className="text-2xl font-semibold mb-6">Ongoing Events</h2>
                <EventsList events={ongoingEvents} />
            </section>
            <section>
                <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2>
                <EventsList events={upcomingEvents} />
            </section>
            <section className="mt-16">
                <h2 className="text-2xl font-semibold mb-6">Past Events</h2>
                <EventsList events={pastEvents} />
            </section>
        </div>
    );
};

export default EventsPage;