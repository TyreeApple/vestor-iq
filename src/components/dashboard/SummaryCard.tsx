
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
      "flex flex-col items-start gap-2 rounded-2xl shadow border border-border hover:shadow-xl transition-all duration-300 group min-h-[110px] text-left bg-card text-card-foreground",
      "p-5",
      className
    )}
    onClick={onClick}
    tabIndex={0}
    type="button"
  >
    <div className="flex items-center gap-3">
      <span className="p-2 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary">
        <Icon className="w-6 h-6" />
      </span>
      <span className="text-lg font-semibold text-card-foreground">{title}</span>
    </div>
    <div className="text-3xl font-bold mb-1 text-card-foreground">{value}</div>
    {children}
  </button>
);

export default SummaryCard;
