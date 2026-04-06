export default function Navbar() {
  return (
    <header className="flex items-center justify-between h-[60px] px-6 bg-[#13151a] border-b border-white/[0.06]">
   
      <div className="flex items-center gap-[10px]">
        <span className="text-[17px] font-semibold text-white tracking-tight">
          StratoX
        </span>
        <span className="text-[10px] font-medium text-[#7eb8f7] bg-[#7eb8f7]/[0.12] border border-[#7eb8f7]/20 rounded-[5px] px-[7px] py-[2px] uppercase tracking-[0.5px]">
          Dashboard
        </span>
      </div>

     
      <div className="flex items-center gap-5">
        
        <span className="text-xs text-white/30 tracking-[0.2px]">
          Last update:{" "}
          <span className="text-white/55">12:45 PM</span>
        </span>

        
        <div className="flex items-center gap-[7px] bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-[5px]">
          <span className="w-[7px] h-[7px] rounded-full bg-[#4ade80] shadow-[0_0_6px_rgba(74,222,128,0.6)] animate-pulse" />
          <span className="text-xs font-medium text-white/60">Device Online</span>
        </div>

        {/* Search button - nu face nimic momentan*/}
        <button className="flex items-center justify-center w-[34px] h-[34px] rounded-[10px] bg-white/[0.06] border border-white/[0.08] text-white/45 hover:bg-white/10 hover:text-white transition-all duration-200">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>
    </header>
  );
}