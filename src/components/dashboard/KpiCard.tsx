
import React from "react";
import AnimatedCounter from "../common/AnimatedCounter";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  color?: string;
  onClick?: () => void;
  className?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  icon: Icon,
  color = "bg-primary text-primary-foreground",
  onClick,
  className = "",
}) => (
  <button
    className={cn(
      "flex flex-col items-center justify-center gap-2 rounded-xl shadow-md p-4 min-w-[110px] transition transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary",
      color,
      className
    )}
    onClick={onClick}
    tabIndex={0}
    type="button"
  >
    <div className="p-2 rounded-full bg-white/10 mb-1">
      <Icon className="w-7 h-7" />
    </div>
    <div className="text-2xl font-bold">
      <AnimatedCounter value={value} />
    </div>
    <span className="text-xs font-medium opacity-80">{title}</span>
  </button>
);

export default KpiCard;

