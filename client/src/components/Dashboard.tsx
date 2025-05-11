import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router";
import { Event } from "../types/Event";
import { User } from "../types/User";
import LayoutShell from "./LayoutShell";
import EventCard from "./EventCard";

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
        <LayoutShell>
          <div className="px-6 py-10 max-w-6xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-10">Dashboard, {user?.username}</h2>

            {/* My Events */}
            {(user?.role === "admin" || user?.role === "organizer") && (
              <section className="mb-12">
                <h3 className="text-2xl font-semibold mb-4 text-gray-300 tracking-wide">
                  My Events
                </h3>
                {myEvents.length === 0 ? (
                  <p className="text-gray-500">You haven’t created any events.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myEvents.map((e) => (
                      <EventCard key={e.id} event={e} type="my" />
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Public Events */}
            <section>
              <h3 className="text-2xl font-semibold mb-4 text-gray-300 tracking-wide">
                Public Events
              </h3>
              {publicEvents.length === 0 ? (
                <p className="text-gray-500">No public events available right now.</p>
              ) : (
                <div className="space-y-6">
                  {publicEvents.map((e) => (
                    <EventCard key={e.id} event={e} type="public" onJoin={handleJoin} />
                  ))}
                </div>
              )}
            </section>
          </div>
        </LayoutShell>
      </>
    );
};

export default Dashboard;