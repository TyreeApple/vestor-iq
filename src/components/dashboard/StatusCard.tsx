
import React from 'react';
import { cn } from '@/lib/utils';
import AnimatedCounter from '@/components/common/AnimatedCounter';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { StatusCardProps } from '@/types';

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  value,
  icon: Icon,
  status = 'info',
  change
}) => {
  const statusClasses = {
    success: "bg-status-operational/10 text-status-operational border-status-operational/30",
    warning: "bg-status-maintenance/10 text-status-maintenance border-status-maintenance/30",
    danger: "bg-status-warning/10 text-status-warning border-status-warning/30",
    info: "bg-primary/10 text-primary border-primary/30",
    neutral: "bg-muted/70 text-muted-foreground border-muted-foreground/30"
  };

  const iconClasses = {
    success: "bg-status-operational text-white",
    warning: "bg-status-maintenance text-white",
    danger: "bg-status-warning text-white",
    info: "bg-primary text-white",
    neutral: "bg-muted-foreground text-white"
  };

  return (
    <div className={cn(
      "glass-card glass-card-hover p-4 md:p-6 rounded-xl overflow-hidden relative shadow-lg border border-border transition-all duration-200 hover:scale-[1.03] hover:shadow-glass-hover",
      status && statusClasses[status],
      "group"
    )}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm md:text-base font-semibold mb-1">{title}</h3>
          <div className="text-2xl md:text-3xl font-bold tracking-tight">
            <AnimatedCounter value={value} />
          </div>
          
          {change && (
            <div className={cn(
              "flex items-center mt-2 text-xs font-medium",
              change.trend === 'up' && "text-status-operational",
              change.trend === 'down' && "text-status-warning"
            )}>
              {change.trend === 'up' && <TrendingUp className="w-3 h-3 mr-1" />}
              {change.trend === 'down' && <TrendingDown className="w-3 h-3 mr-1" />}
              {change.trend === 'neutral' && <Minus className="w-3 h-3 mr-1" />}
              {change.value}% {change.trend === 'up' ? 'aumento' : change.trend === 'down' ? 'redução' : ''}
            </div>
          )}
        </div>
        
        <div className={cn(
          "p-2 rounded-lg shadow-md group-hover:scale-110 transition-transform",
          status && iconClasses[status]
        )}>
          <Icon className="w-6 h-6 md:w-8 md:h-8" />
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-current opacity-10"></div>
      <div className="absolute right-8 -bottom-6 w-10 h-10 rounded-full bg-current opacity-5"></div>
    </div>
  );
};

export default StatusCard;
