import { House, SquarePlus, ChartColumn, Search, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
export default function BottomNavbar() {
  const navlinkPath = [
    { path: "/", name: "home", icon: House },
    { path: "/add", name: "add", icon: SquarePlus },
    { path: "/analitics", name: "analitics", icon: ChartColumn },
    { path: "/search", name: "search", icon: Search },
    { path: "/setting", name: "setting", icon: Settings },
  ];
  return (
    <nav className="fixed bottom-0 left-0 w-full border-t bg-white shadow-lg z-50">
      <div className="max-w-md mx-auto flex items-center justify-around h-16">
        {navlinkPath.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 transition-colors duration-200 ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`
              }
            >
              <Icon size={20} />
              <p>{item.name}</p>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
