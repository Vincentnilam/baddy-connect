import { Calendar, MapPin, Users } from "lucide-react";
import { Event } from "../types/Event";
import { formatEventDateRange } from "../utils/formatEventDateRange";

interface EventCardProps {
  event: Event;
  type: "public" | "my";
  onJoin?: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, type, onJoin }) => {

  return (
    <div className="bg-[#1E1E1E] text-white rounded-lg shadow-lg hover:shadow-xl transition p-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <Calendar size={14} /> {formatEventDateRange(event.startDate, event.endDate)}
        </span>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            event.isPublic ? "bg-green-800 text-green-300" : "bg-yellow-800 text-yellow-200"
          }`}
        >
          {event.isPublic ? "Public" : "Private"}
        </span>
      </div>

      <h3 className="text-lg font-bold mb-1">{event.title}</h3>

      {event.description && (
        <p className="text-sm text-gray-400 mb-3 line-clamp-2">{event.description}</p>
      )}

      <div className="flex items-center text-sm text-gray-300 gap-2 mb-2">
        <MapPin size={14} />
        <span>{event.location}</span>
      </div>

      <div className="flex items-center text-sm text-gray-300 gap-2 mb-4">
        <Users size={14} />
        <span>{event.maxPlayers} Players · {event.courtCount} Courts</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">by {event.organizer.username}</span>

        {type === "public" && (
          <button
            onClick={() => onJoin?.(event.id)}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm"
          >
            Join
          </button>
        )}

        {type === "my" && (
          <a
            href={`/events/${event.id}`}
            className="text-blue-400 hover:underline text-sm"
          >
            View
          </a>
        )}
      </div>
    </div>
  );
};

export default EventCard;
