import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { User } from "../types/User";
import {
  PlusCircle,
  LayoutDashboard,
  User as UserIcon,
  LogOut,
  X
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (val: boolean) => void }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_APP_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Auth failed");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        window.innerWidth < 640
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside
      ref={sidebarRef}
      className={`${
        isOpen ? "block" : "hidden"
      } sm:block w-64 bg-[#1A1A1A] text-white flex flex-col justify-between p-6 border-r border-gray-800 fixed h-full z-50`}
    >
      <div>
        <div className="mb-10 flex items-center gap-3">
          <img
            src="/src/assets/logo.jpg"
            alt="BaddyConnect Logo"
            className="w-10 h-10 object-contain rounded-md"
          />
          <h1 className="text-xl font-bold tracking-tight">BaddyConnect</h1>
          <button onClick={() => setIsOpen(false)} className="text-white sm:hidden">
            <X size={20} />
          </button>
        </div>

        {user && (
          <div className="mb-8 flex items-center gap-3">
            <div className="bg-gray-700 w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold uppercase">
              {user.username[0]}
            </div>
            <div className="text-sm leading-tight">
              <p className="text-gray-300">Welcome,</p>
              <p className="font-semibold">{user.username}</p>
            </div>
          </div>
        )}

        <nav className="space-y-4">
          {(user?.role === "organizer" || user?.role === "admin") && (
            <SidebarButton
              label="Create Event"
              icon={<PlusCircle size={18} />}
              onClick={() => navigate("/events/create")}
            />
          )}
          <SidebarButton
            label="Dashboard"
            icon={<LayoutDashboard size={18} />}
            onClick={() => navigate("/dashboard")}
          />
          <SidebarButton
            label="Profile"
            icon={<UserIcon size={18} />}
            onClick={() => navigate("/profile")}
          />
        </nav>
      </div>
      <div className="absolute bottom-6 left-6 right-6">
      <SidebarButton
        label="Logout"
        icon={<LogOut size={18} />}
        onClick={handleLogout}
        danger
      />
      </div>
    </aside>
  );
};

const SidebarButton = ({ icon, label, onClick, danger }: { icon: React.ReactNode; label: string; onClick: () => void; danger?: boolean }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full px-4 py-2 rounded-md transition text-sm ${
      danger ? "text-red-400 hover:bg-red-600/20" : "hover:bg-[#2A2A2A] text-gray-200"
    }`}
  >
    {icon}
    {label}
  </button>
);

export default Sidebar;
