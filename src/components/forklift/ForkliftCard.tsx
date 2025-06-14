
import React from 'react';
import { Forklift, StatusEmpilhadeira, TipoEmpilhadeira } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Clock, Settings, Calendar, Gauge, MapPin } from 'lucide-react';

interface ForkliftCardProps {
  forklift: Forklift;
  onClick?: () => void;
}

const ForkliftCard: React.FC<ForkliftCardProps> = ({ forklift, onClick }) => {
  // Determine the status color
  const getStatusColor = (status: StatusEmpilhadeira) => {
    switch (status) {
      case StatusEmpilhadeira.OPERACIONAL:
        return 'bg-emerald-500/10 text-emerald-700 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-800';
      case StatusEmpilhadeira.EM_MANUTENCAO:
        return 'bg-amber-500/10 text-amber-700 border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-800';
      case StatusEmpilhadeira.PARADA:
        return 'bg-red-500/10 text-red-700 border-red-200 dark:bg-red-500/20 dark:text-red-400 dark:border-red-800';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-200 dark:bg-gray-500/20 dark:text-gray-400 dark:border-gray-800';
    }
  };

  // Get type color
  const getTypeColor = (tipo: TipoEmpilhadeira) => {
    switch (tipo) {
      case TipoEmpilhadeira.GAS:
        return 'bg-blue-500/10 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400';
      case TipoEmpilhadeira.ELETRICA:
        return 'bg-green-500/10 text-green-700 border-green-200 dark:bg-green-500/20 dark:text-green-400';
      case TipoEmpilhadeira.RETRATIL:
        return 'bg-purple-500/10 text-purple-700 border-purple-200 dark:bg-purple-500/20 dark:text-purple-400';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  // Status indicator dot
  const getStatusDot = (status: StatusEmpilhadeira) => {
    switch (status) {
      case StatusEmpilhadeira.OPERACIONAL:
        return 'bg-emerald-500';
      case StatusEmpilhadeira.EM_MANUTENCAO:
        return 'bg-amber-500';
      case StatusEmpilhadeira.PARADA:
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formattedHourMeter = forklift.horimetro.toString().padStart(5, '0');

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm",
        "transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1",
        "cursor-pointer backdrop-blur-sm border-border/50",
        "p-4"
      )}
      onClick={onClick}
    >
      {/* Header with ID and Status */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-foreground">{forklift.id}</h3>
            <div className={cn("w-2 h-2 rounded-full", getStatusDot(forklift.status))} />
          </div>
          <p className="text-sm font-medium text-muted-foreground">{forklift.modelo}</p>
          <p className="text-xs text-muted-foreground">{forklift.marca}</p>
        </div>
        <Badge variant="outline" className={cn("text-xs font-medium", getStatusColor(forklift.status))}>
          {forklift.status}
        </Badge>
      </div>

      {/* Type Badge */}
      <div className="mb-3">
        <Badge variant="outline" className={cn("text-xs", getTypeColor(forklift.tipo))}>
          <Settings className="w-3 h-3 mr-1" />
          {forklift.tipo}
        </Badge>
      </div>
      
      {/* Key Information Grid */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-muted-foreground">
            <Gauge className="w-4 h-4 mr-2" />
            <span>Horímetro</span>
          </div>
          <span className="font-mono font-semibold bg-muted/50 px-2 py-1 rounded text-xs">
            {formattedHourMeter}h
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Últ. Manutenção</span>
          </div>
          <span className="text-xs font-medium">{forklift.ultimaManutencao}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2" />
            <span>Localização</span>
          </div>
          <span className="text-xs font-medium">{forklift.localizacaoAtual}</span>
        </div>
      </div>
      
      {/* Capacity Footer */}
      <div className="pt-3 border-t border-border/50">
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Capacidade</span>
          <span className="font-bold text-sm bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {forklift.capacidade} kg
          </span>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
    </div>
  );
};

export default ForkliftCard;
