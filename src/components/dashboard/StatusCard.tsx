
import React from 'react';
import { cn } from '@/lib/utils';
import AnimatedCounter from '@/components/common/AnimatedCounter';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { StatusCardProps } from '@/types';

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  value,
  icon: Icon,
  status = "info"
}) => {
  const statusClasses = {
    success: "bg-status-operational/10 dark:bg-status-operational/20 text-status-operational border-status-operational/30 dark:border-status-operational/50",
    warning: "bg-status-maintenance/10 dark:bg-status-maintenance/20 text-status-maintenance border-status-maintenance/30 dark:border-status-maintenance/50",
    danger: "bg-status-warning/10 dark:bg-status-warning/20 text-status-warning border-status-warning/30 dark:border-status-warning/50",
    info: "bg-primary/10 dark:bg-primary/20 text-primary border-primary/30 dark:border-primary/40",
    neutral: "bg-muted/70 dark:bg-muted/90 text-muted-foreground border-muted-foreground/30 dark:border-muted-foreground/40"
  };

  const iconClasses = {
    success: "bg-status-operational dark:bg-status-operational/90 text-white",
    warning: "bg-status-maintenance dark:bg-status-maintenance/90 text-white",
    danger: "bg-status-warning dark:bg-status-warning/90 text-white",
    info: "bg-primary dark:bg-primary/95 text-white",
    neutral: "bg-muted-foreground dark:bg-muted-foreground/80 text-white"
  };

  return (
    <div className={cn(
      "glass-card p-5 rounded-2xl overflow-hidden relative shadow-md border flex flex-col items-center gap-2 transition-all duration-300",
      status && statusClasses[status]
    )}>
      <div className={cn(
        "p-2 rounded-lg shadow group-hover:scale-110 transition-transform mb-2",
        status && iconClasses[status]
      )}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-sm text-center font-medium text-foreground/80 dark:text-foreground/90">{title}</div>
    </div>
  );
};

export default StatusCard;
