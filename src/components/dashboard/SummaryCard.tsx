
import React from "react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  color?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon: Icon,
  color = "bg-card",
  onClick,
  children,
  className,
}) => (
  <button
    className={cn(
      "flex flex-col items-start gap-2 rounded-2xl shadow p-5 border hover:shadow-xl transition group min-h-[110px] text-left",
      color,
      className
    )}
    onClick={onClick}
    tabIndex={0}
    type="button"
  >
    <div className="flex items-center gap-3">
      <span className="p-2 rounded-xl bg-primary/10 text-primary">
        <Icon className="w-6 h-6" />
      </span>
      <span className="text-lg font-semibold">{title}</span>
    </div>
    <div className="text-3xl font-bold mb-1">{value}</div>
    {children}
  </button>
);

export default SummaryCard;
