import {
  House,
  SquarePlus,
  ChartColumn,
  Search,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function BottomNavbar() {
  const navlinkPath = [
    { path: "/", name: "Home", icon: House },
    { path: "/add", name: "Add", icon: SquarePlus },
    { path: "/analitics", name: "Analytics", icon: ChartColumn },
    { path: "/search", name: "Search", icon: Search },
    { path: "/setting", name: "Settings", icon: Settings },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-24px)] max-w-md -translate-x-1/2">
      <div className="flex h-[70px] items-center justify-around rounded-[28px] border border-white/60 bg-white/90 px-2 shadow-[0_10px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl">
        {navlinkPath.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `group relative flex h-14 min-w-[58px] flex-col items-center justify-center rounded-2xl px-2 transition-all duration-300 ${isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                  : "text-gray-500 hover:bg-indigo-50 hover:text-indigo-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={21}
                    strokeWidth={isActive ? 2.5 : 2}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5"
                  />

                  <span
                    className={`text-[10px] font-semibold ${isActive ? "mt-1" : "mt-1"
                      }`}
                  >
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}