
import React from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, children, className }) => {
  return (
    <div className={cn("flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6", className)}>
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-muted-foreground text-sm md:text-base">{subtitle}</p>
        )}
      </div>
      {children && (
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {children}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
