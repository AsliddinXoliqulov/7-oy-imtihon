import {
  Home,
  Users,
  Shield,
  GraduationCap,
  BookUser,
  Users2,
  BookOpen,
  CreditCard,
  Settings,
  User,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const menuItems = [
  { label: "Asosiy", icon: <Home className="w-5 h-5" />, path: "/" },
  { label: "Managerlar", icon: <Users className="w-5 h-5" />, path: "/managerlar" },
  { label: "Adminlar", icon: <Shield className="w-5 h-5" />, path: "/adminlar" },
  { label: "Ustozlar", icon: <GraduationCap className="w-5 h-5" />, path: "/ustozlar" },
  { label: "Studentlar", icon: <BookUser className="w-5 h-5" />, path: "/studentlar" },
  { label: "Guruhlar", icon: <Users2 className="w-5 h-5" />, path: "/guruhlar" },
  { label: "Kurslar", icon: <BookOpen className="w-5 h-5" />, path: "/kurslar" },
  { label: "Payment", icon: <CreditCard className="w-5 h-5" />, path: "/payment" },
];

const others = [
  { label: "Sozlamalar", icon: <Settings className="w-5 h-5" />, path: "/sozlamalar" },
  { label: "Profile", icon: <User className="w-5 h-5" />, path: "/profile" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); 
  };

  return (
    <aside className="w-60 h-screen bg-white border-r flex flex-col justify-between">
      <div>
        <div className="px-4 py-5 font-bold text-lg">Admin CRM</div>

        <nav className="mt-4">
          <p className="text-xs text-muted-foreground px-4 mb-1 font-semibold uppercase">Menu</p>
          {menuItems.map((item, idx) => (
            <NavLink
              to={item.path}
              key={idx}
              className={({ isActive }) =>
                `flex items-center w-full px-4 py-2 text-sm gap-2 rounded-md transition ${
                  isActive ? "bg-muted font-semibold" : "hover:bg-muted"
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}

          <p className="text-xs text-muted-foreground px-4 mt-6 mb-1 font-semibold uppercase">Boshqalar</p>
          {others.map((item, idx) => (
            <NavLink
              to={item.path}
              key={idx}
              className={({ isActive }) =>
                `flex items-center w-full px-4 py-2 text-sm gap-2 rounded-md transition ${
                  isActive ? "bg-muted font-semibold" : "hover:bg-muted"
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm gap-2 rounded-md transition hover:bg-muted text-left"
          >
            <LogOut className="w-5 h-5" />
            Chiqish
          </button>
        </nav>
      </div>
    </aside>
  );
}
