
import React from "react";
import { cn } from "@/lib/utils";

interface PremiumSummaryCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  colorFrom?: string;
  colorTo?: string;
  info?: string;
  className?: string;
  onClick?: () => void;
}

const PremiumSummaryCard: React.FC<PremiumSummaryCardProps> = ({
  title,
  value,
  icon: Icon,
  colorFrom = "from-zinc-900",
  colorTo = "to-blue-800",
  info,
  className,
  onClick,
}) => (
  <div
    className={cn(
      "group relative bg-gradient-to-br", colorFrom, colorTo,
      "rounded-2xl shadow-2xl p-5 md:p-6 flex items-center min-h-[120px] overflow-hidden transition duration-400 cursor-pointer hover:scale-105 focus-within:scale-105",
      className
    )}
    tabIndex={0}
    onClick={onClick}
    role="button"
  >
    {/* Bottom-right blurred circle */}
    <div className="absolute right-0 bottom-0 w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/10 blur-2xl pointer-events-none animate-pulse opacity-80" />
    {/* Inline icon (with unique layered bg) */}
    <span className="relative z-10 flex items-center justify-center mr-5">
      <span className="bg-white/15 rounded-lg p-3 shadow-neo border border-white/20">
        <Icon className="w-8 h-8 text-white/80" />
      </span>
    </span>
    <div className="z-10 flex flex-col items-start">
      <span className="text-2xl md:text-3xl font-black tracking-tight text-white drop-shadow-sm">
        {typeof value === "number" ? value.toLocaleString("pt-BR") : value}
      </span>
      <span className="text-sm text-white/80 font-medium mt-1">{title}</span>
      {!!info && <span className="text-xs mt-1 text-white/50">{info}</span>}
    </div>
    {/* Custom top pattern */}
    <svg className="absolute left-0 top-0 w-24 h-6 pointer-events-none opacity-35" viewBox="0 0 120 14" fill="none">
      <rect x="0" y="0" width="120" height="14" fill="url(#summarypattern)"/>
      <defs>
        <linearGradient id="summarypattern" x1="0" y1="0" x2="120" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity="0.07" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export default PremiumSummaryCard;
