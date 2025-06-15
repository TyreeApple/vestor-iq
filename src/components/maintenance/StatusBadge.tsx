
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, Play, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'pending' | 'progress' | 'completed' | 'cancelled';
  size?: 'sm' | 'md' | 'lg';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { 
          variant: 'secondary' as const, 
          label: 'Pendente', 
          icon: Clock,
          className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
        };
      case 'progress':
        return { 
          variant: 'default' as const, 
          label: 'Em Andamento', 
          icon: Play,
          className: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
        };
      case 'completed':
        return { 
          variant: 'default' as const, 
          label: 'Concluída', 
          icon: CheckCircle,
          className: 'bg-green-500/10 text-green-400 border-green-500/20'
        };
      case 'cancelled':
        return { 
          variant: 'destructive' as const, 
          label: 'Cancelada', 
          icon: XCircle,
          className: 'bg-red-500/10 text-red-400 border-red-500/20'
        };
      default:
        return { 
          variant: 'secondary' as const, 
          label: status, 
          icon: Clock,
          className: 'bg-gray-500/10 text-gray-400 border-gray-500/20'
        };
    }
  };

  const config = getStatusConfig(status);
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  };

  return (
    <Badge 
      variant={config.variant} 
      className={cn(
        "gap-1 inline-flex items-center font-medium border",
        config.className,
        sizeClasses[size]
      )}
    >
      <config.icon className={cn(
        size === 'sm' ? 'w-2.5 h-2.5' : 
        size === 'md' ? 'w-3 h-3' : 'w-4 h-4'
      )} />
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
