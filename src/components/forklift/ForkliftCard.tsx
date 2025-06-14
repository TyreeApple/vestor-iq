
import React from 'react';
import { Forklift, StatusEmpilhadeira, TipoEmpilhadeira } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Clock, Settings, Calendar, Gauge, MapPin, CheckCircle, Wrench } from 'lucide-react';

interface ForkliftCardProps {
  forklift: Forklift;
  onClick?: () => void;
}

const ForkliftCard: React.FC<ForkliftCardProps> = ({ forklift, onClick }) => {
  // Determine the status color and icon
  const getStatusConfig = (status: StatusEmpilhadeira) => {
    switch (status) {
      case StatusEmpilhadeira.OPERACIONAL:
        return {
          color: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-emerald-500/20',
          icon: CheckCircle,
          pulse: false
        };
      case StatusEmpilhadeira.EM_MANUTENCAO:
        return {
          color: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white border-amber-500/20 animate-pulse',
          icon: Wrench,
          pulse: true
        };
      case StatusEmpilhadeira.PARADA:
        return {
          color: 'bg-gradient-to-r from-red-500 to-red-600 text-white border-red-500/20',
          icon: Wrench,
          pulse: false
        };
      default:
        return {
          color: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white border-gray-500/20',
          icon: Settings,
          pulse: false
        };
    }
  };

  // Get type color
  const getTypeColor = (tipo: TipoEmpilhadeira) => {
    switch (tipo) {
      case TipoEmpilhadeira.GAS:
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case TipoEmpilhadeira.ELETRICA:
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      case TipoEmpilhadeira.RETRATIL:
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  const statusConfig = getStatusConfig(forklift.status);
  const StatusIcon = statusConfig.icon;
  const formattedHourMeter = forklift.horimetro.toString().padStart(5, '0');

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10",
        "bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm",
        "shadow-lg hover:shadow-2xl transition-all duration-300 ease-out",
        "cursor-pointer hover:scale-102 hover:-translate-y-1",
        "focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:outline-none",
        "active:scale-98",
        "p-6"
      )}
      onClick={onClick}
      tabIndex={0}
      role="button"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Header with ID and Status */}
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-white tracking-tight">{forklift.id}</h3>
            <Badge className={cn(
              "text-xs font-semibold tracking-wide border px-2.5 py-1",
              "flex items-center gap-1.5",
              statusConfig.color
            )}>
              <StatusIcon className="w-3 h-3" />
              {forklift.status}
            </Badge>
          </div>
          <p className="text-base font-medium text-slate-300 mb-1">{forklift.modelo}</p>
          <p className="text-sm text-slate-500">{forklift.marca}</p>
        </div>
      </div>

      {/* Type Badge */}
      <div className="relative z-10 mb-4">
        <Badge className={cn(
          "text-xs font-medium border px-2.5 py-1 flex items-center gap-1.5 w-fit",
          getTypeColor(forklift.tipo)
        )}>
          <Settings className="w-3 h-3" />
          {forklift.tipo}
        </Badge>
      </div>
      
      {/* Key Information Grid */}
      <div className="relative z-10 space-y-3 mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-slate-400">
            <Gauge className="w-4 h-4 mr-2 text-blue-400" />
            <span className="text-sm font-medium">Horímetro</span>
          </div>
          <span className="font-mono font-bold text-slate-200 bg-slate-700/50 px-2.5 py-1 rounded-md text-sm border border-slate-600/50">
            {formattedHourMeter}h
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-slate-400">
            <Calendar className="w-4 h-4 mr-2 text-emerald-400" />
            <span className="text-sm font-medium">Últ. Manutenção</span>
          </div>
          <span className="text-sm font-semibold text-slate-300">{forklift.ultimaManutencao}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-slate-400">
            <MapPin className="w-4 h-4 mr-2 text-amber-400" />
            <span className="text-sm font-medium">Localização</span>
          </div>
          <span className="text-sm font-semibold text-slate-300">{forklift.localizacaoAtual}</span>
        </div>
      </div>
      
      {/* Capacity Highlight Section */}
      <div className="relative z-10 pt-4 border-t border-slate-700/50">
        <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-600/30">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-400 tracking-wide">CAPACIDADE</span>
            <div className="text-right">
              <span className="text-2xl font-black text-blue-400 tracking-tight">
                {forklift.capacidade.toLocaleString()}
              </span>
              <span className="text-sm font-semibold text-slate-400 ml-1">kg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
      
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-xl" />
    </div>
  );
};

export default ForkliftCard;
