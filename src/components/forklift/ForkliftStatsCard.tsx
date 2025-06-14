
import React from "react";
import { cn } from "@/lib/utils";
import AnimatedCounter from "../common/AnimatedCounter";

interface ForkliftStatsCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  info: string;
  colorFrom?: string;
  colorTo?: string;
  textColor?: string;
  onClick?: () => void;
}

const ForkliftStatsCard: React.FC<ForkliftStatsCardProps> = ({
  title,
  value,
  icon: Icon,
  info,
  colorFrom = "from-blue-600",
  colorTo = "to-blue-800",
  textColor = "text-white",
  onClick,
}) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl p-6 shadow-xl transition-all duration-300 cursor-pointer",
        "bg-gradient-to-br", colorFrom, colorTo,
        "hover:shadow-2xl hover:scale-105 focus-within:scale-105",
        "border border-white/10"
      )}
      style={{ padding: '25px' }}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute right-3 top-3 w-16 h-16 rounded-full bg-white/5 blur-xl animate-pulse" />
      <div className="absolute left-1 bottom-1 w-12 h-12 rounded-full bg-white/5 blur-lg" />

      {/* Icon Container */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <div className={cn(
          "flex items-center justify-center w-12 h-12 rounded-xl",
          "bg-white/20 backdrop-blur-sm border border-white/30",
          "shadow-lg group-hover:scale-110 transition-transform duration-300"
        )}>
          <Icon className={cn("w-6 h-6", textColor, "drop-shadow-sm")} />
        </div>
        
        {/* Decorative element */}
        <div className="flex space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-1.5 h-1.5 rounded-full bg-white/30",
                "animate-pulse",
                `animation-delay-${i * 100}ms`
              )}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-baseline space-x-2 mb-2">
          <span className={cn(
            "text-3xl font-black tracking-tight",
            textColor,
            "drop-shadow-lg [text-shadow:_0_2px_8px_rgba(0,0,0,0.3)]"
          )}>
            <AnimatedCounter value={value} />
          </span>
        </div>
        
        <h3 className={cn(
          "text-base font-semibold mb-1",
          textColor,
          "drop-shadow-sm"
        )}>
          {title}
        </h3>
        
        <p className={cn(
          "text-sm font-medium opacity-90",
          textColor
        )}>
          {info}
        </p>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/20 via-white/40 to-white/20" />
    </div>
  );
};

export default ForkliftStatsCard;
