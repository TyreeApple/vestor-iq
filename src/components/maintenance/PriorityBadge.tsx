
import React from 'react';
import { cn } from '@/lib/utils';

interface PriorityBadgeProps {
  priority: 'critical' | 'high' | 'medium' | 'low';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ 
  priority, 
  size = 'md', 
  showLabel = true 
}) => {
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'critical':
        return { 
          color: 'bg-red-500', 
          bgColor: 'bg-red-500/10',
          textColor: 'text-red-400',
          borderColor: 'border-red-500/20',
          label: 'Crítica',
          pulse: true
        };
      case 'high':
        return { 
          color: 'bg-orange-500', 
          bgColor: 'bg-orange-500/10',
          textColor: 'text-orange-400',
          borderColor: 'border-orange-500/20',
          label: 'Alta',
          pulse: false
        };
      case 'medium':
        return { 
          color: 'bg-blue-500', 
          bgColor: 'bg-blue-500/10',
          textColor: 'text-blue-400',
          borderColor: 'border-blue-500/20',
          label: 'Média',
          pulse: false
        };
      default:
        return { 
          color: 'bg-gray-500', 
          bgColor: 'bg-gray-500/10',
          textColor: 'text-gray-400',
          borderColor: 'border-gray-500/20',
          label: 'Baixa',
          pulse: false
        };
    }
  };

  const config = getPriorityConfig(priority);
  
  const sizeClasses = {
    sm: {
      container: 'px-2 py-1 text-xs',
      dot: 'w-1.5 h-1.5'
    },
    md: {
      container: 'px-2 py-1 text-xs',
      dot: 'w-1.5 h-1.5'
    },
    lg: {
      container: 'px-3 py-2 text-sm',
      dot: 'w-2 h-2'
    }
  };

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 rounded-full font-medium border",
      config.bgColor,
      config.textColor,
      config.borderColor,
      sizeClasses[size].container
    )}>
      <div className={cn(
        "rounded-full",
        config.color,
        sizeClasses[size].dot,
        config.pulse && "animate-pulse"
      )} />
      {showLabel && (
        <span>Prioridade {config.label}</span>
      )}
    </div>
  );
};

export default PriorityBadge;
