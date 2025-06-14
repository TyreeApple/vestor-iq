
import React from "react";
import { cn } from "@/lib/utils";
import AnimatedCounter from "../common/AnimatedCounter";

interface ModernKpiCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  trend?: "up" | "down" | null;
  trendValue?: number;
  colorFrom?: string;
  colorTo?: string;
  className?: string;
  onClick?: () => void;
}

const ModernKpiCard: React.FC<ModernKpiCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  colorFrom = "from-blue-500",
  colorTo = "to-violet-600",
  className,
  onClick
}) => {
  return (
    <button
      className={cn(
        "relative overflow-hidden w-full min-w-[0px] p-4 rounded-2xl text-left shadow-xl group focus:ring-2 focus:ring-primary transition duration-300 flex flex-col bg-gradient-to-br",
        colorFrom, colorTo, className
      )}
      style={{
        background: `linear-gradient(120deg, var(--tw-gradient-from), var(--tw-gradient-to))`,
      }}
      onClick={onClick}
      type="button"
    >
      {/* SVG pattern overlay */}
      <svg className="absolute right-1 top-1 w-20 h-20 opacity-15 pointer-events-none" viewBox="0 0 64 64" fill="none">
        <defs>
          <pattern id="dots" patternUnits="userSpaceOnUse" width="8" height="8">
            <circle cx="1" cy="1" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="64" height="64" fill="url(#dots)" />
      </svg>
      {/* Glassy icon bubble */}
      <span className={cn(
        "inline-flex items-center justify-center w-12 h-12 rounded-full shadow-lg z-10 mb-1",
        "bg-white/25 backdrop-blur-sm border border-white/30 ring-2 ring-white/25 ring-inset group-hover:scale-110 group-hover:ring-primary/40 transition-transform"
      )}>
        <Icon className="w-7 h-7 text-white drop-shadow" />
      </span>
      {/* Animated value + trend */}
      <div className="flex items-baseline mt-1 gap-2">
        <span
          className="text-3xl font-extrabold text-gray-50 drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] 
                     [text-shadow:_0_2px_6px_rgba(0,0,0,0.7),0_1px_0_#ffffff20]"
        >
          <AnimatedCounter value={value} />
        </span>
        {trend !== undefined && trend !== null && (
          <span className={cn(
            "flex items-center px-2 py-0.5 rounded-full text-xs ml-2 font-bold shadow",
            "bg-white/40 backdrop-blur-xs border border-white/40",
            trend === "up"
              ? "text-green-100 drop-shadow-[0_2px_8px_rgba(34,197,94,0.30)]"
              : "text-red-100 drop-shadow-[0_2px_8px_rgba(239,68,68,0.30)]"
          )}>
            {trend === "up" ? (
              <svg width="14" height="14" className="mr-1" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 19V5M5 12l7-7 7 7" /></svg>
            ) : (
              <svg width="14" height="14" className="mr-1" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 5v14m-7-7 7 7 7-7" /></svg>
            )}
            {trendValue ? `${trendValue}%` : ""}
          </span>
        )}
      </div>
      <div className="text-md font-medium text-white/90 mt-2">{title}</div>
      {/* Animated border on hover */}
      <span className="absolute inset-0 pointer-events-none rounded-2xl bg-white/10 opacity-0 group-hover:opacity-80 transition-all duration-400" />
    </button>
  );
};

export default ModernKpiCard;
