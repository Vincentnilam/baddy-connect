import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";
import { Event } from "../types/Event";
import { User } from "../types/User";

const Dashboard: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [msg, setMsg] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }
            
            try {
                // fetch user data
                const response = await fetch(`${import.meta.env.VITE_BACKEND_APP_URL}/auth/me`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                    // setMsg(userData.message || "Welcome");
                } else {
                    setError("Failed to fetch user data. Please re-login");
                    localStorage.removeItem("token");
                    navigate("/login");
                }

                // fetch event data
                const eventsRes = await fetch(`${import.meta.env.VITE_BACKEND_APP_URL}/events`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                const eventData = await eventsRes.json();
                if (!eventsRes.ok) throw new Error("Events fetch failed");
                setEvents(eventData);

            } catch (err) {
                console.log(err);
                setError("An error occurred. Please try again.");
            }
        };

        fetchData();
    }, [navigate]);

    const handleJoin = (eventId: string) => {
        console.log("Joining event:", eventId);
        // You’ll later replace this with an API call
    };

    const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

    // can see my events if it's created by organizer
    const myEvents = events.filter(e => e.organizer.id === user?.id);
    const publicEvents = events.filter(e => e.isPublic && e.organizer.id !== user?.id);

    if (error) {
		return (
			<div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#121212] to-[#1E1E1E]">
				<div className="text-center">
					<p className="text-red-500 mb-4">{error}</p>
					<button
						onClick={() => navigate("/login")}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
					>
						Go to Login
					</button>
				</div>
			</div>
		);
	}

	return (
        <>
          <Navbar />
          <div className="pt-24 px-4 max-w-4xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">Dashboard, {user?.username}</h2>
      
            {/* My Events only for Admins or Organizers */}
            {(user?.role === "admin" || user?.role === "organizer") && (
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-2 text-gray-300">My Events</h3>
                    {myEvents.length === 0 ? (
                        <p className="text-gray-400">You haven’t created any events.</p>
                    ) : (
                        <ul className="space-y-6">
                            {myEvents.map(e => (
                                <li key={e.id} className="bg-[#2A2A2A] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all ease-in-out">
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="font-semibold text-lg">{e.title}</p>
                                            <p className="text-sm text-gray-400">{new Date(e.datetime).toLocaleString()}</p>
                                        </div>
                                        <button
                                            onClick={() => navigate(`/events/${e.id}`)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200"
                                        >
                                            View
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
      
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-300">Public Events</h3>
              {publicEvents.length === 0 ? (
                <p className="text-gray-400">No public events available right now.</p>
              ) : (
                <ul className="space-y-6">
                  {publicEvents.map(e => (
                    <li key={e.id} className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all ease-in-out">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-semibold text-lg">{e.title}</p>
                          <p className="text-sm text-gray-400">
                            Hosted by {e.organizer.username} • {new Date(e.datetime).toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleJoin(e.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200"
                        >
                          Join
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      );
};

export default Dashboard;