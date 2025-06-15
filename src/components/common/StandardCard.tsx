
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedCounter from './AnimatedCounter';

interface StandardCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
  onClick?: () => void;
}

const StandardCard: React.FC<StandardCardProps> = ({
  title,
  value,
  icon: Icon,
  variant = 'default',
  className,
  onClick
}) => {
  const variantClasses = {
    default: 'bg-slate-600 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-orange-500 text-white', 
    danger: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white'
  };

  const config = variantClasses[variant];

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={cn(
            "p-3 rounded-lg",
            config
          )}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-2xl font-bold text-foreground">
            {typeof value === 'number' ? <AnimatedCounter value={value} /> : value}
          </p>
          <h3 className="text-sm font-medium text-muted-foreground">
            {title}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default StandardCard;
