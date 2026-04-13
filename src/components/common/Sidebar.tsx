import { useState } from "react";
import { Thermometer, Droplet, Wind, Info } from 'lucide-react';

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    label: "Predictions",
    href: "/predictions",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-4 4 4 5-5" />
      </svg>
    ),
  },
  {
    label: "Temperature",
    href: "/temperature",
    icon: (
       <Thermometer />
    ),
  },
  {
    label: "Humidity",
    href: "/humidity",
    icon: (
        <Droplet />
    ),
  },
  {
    label: "Air",
    href: "/air",
    icon: (
        <Wind />
    ),
  },
  {
    label: "About",
    href: "/about",
    icon: (
        <Info />
    ),
  },
];

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <aside className="flex flex-col items-center h-screen w-[72px] py-5 bg-[#13151a] border-r border-white/[0.06]">
  
      <div className="mb-7">
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          <circle cx="17" cy="17" r="16" fill="rgba(126,184,247,0.12)" stroke="rgba(126,184,247,0.3)" strokeWidth="1" />
          <path d="M10 17 L17 9 L24 17" stroke="#7eb8f7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M10 21 L17 13 L24 21" stroke="rgba(126,184,247,0.4)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>

     
      <nav className="flex flex-col items-center gap-1 flex-1 w-full px-[13px]">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => { setActive(item.label) }}
            onMouseEnter={() => setHovered(item.label)}
            onMouseLeave={() => setHovered(null)}
            className={`
              relative flex items-center justify-center w-[46px] h-[46px] rounded-xl transition-all duration-200
              ${active === item.label
                ? "bg-white/[0.09] text-white"
                : "text-white/35 hover:bg-white/[0.07] hover:text-white/70"
              }
            `}
          >
          
            {active === item.label && (
              <span className="absolute -left-[13px] top-1/2 -translate-y-1/2 w-[3px] h-[22px] bg-[#7eb8f7] rounded-r" />
            )}

            {item.icon}

        
            {hovered === item.label && (
              <span className="absolute left-[54px] z-50 px-[10px] py-[5px] bg-[#1e2028] border border-white/10 rounded-lg text-xs text-white/80 whitespace-nowrap pointer-events-none">
                {item.label}
              </span>
            )}
          </a>
        ))}
      </nav>

     
      <div className="flex flex-col items-center gap-3 px-[13px]">
       
        <button className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.07] text-white/50 hover:bg-white/[0.12] transition-colors duration-200">
          <span className="absolute top-[6px] right-[6px] w-[7px] h-[7px] bg-[#f76b6b] rounded-full border-[1.5px] border-[#13151a]" />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>

      
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rgba(31, 41, 235, 0.43) to-rgba(126, 185, 247, 0.69) flex items-center justify-center text-[13px] font-semibold text-white cursor-pointer select-none tracking-wide">
          SX
        </div>
      </div>
    </aside>
  );
}