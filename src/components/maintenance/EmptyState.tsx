
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Search } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel = "Nova Ação",
  onAction,
  icon = <Search className="w-12 h-12" />
}) => {
  return (
    <div className="text-center py-12 px-4">
      <div className="mx-auto w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-6">
        <div className="text-slate-400">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 mb-6 max-w-md mx-auto">
        {description}
      </p>
      {onAction && (
        <Button 
          onClick={onAction}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
