const EventCard = ({title,date, description, Status}) => {
    return (
        <div className="border rounded-lg p-4 shadow-sm transition-all duration-400 hover:shadow-lg hover:-translate-y-2">
            <p className="text-sm text-gray-500">{date}</p>
            <h3 className="text-lg font-semibold mt-1">{title}</h3>
            <p className="text-gray-700 mt-2">{description}</p>
            
            {Status &&(
                <span className="inline-block mt-3 text-xs bg-gray-100 px-2 py-1 rounded">
                    {Status}
                </span>
            )}
        </div>
    );
};

export default EventCard;


