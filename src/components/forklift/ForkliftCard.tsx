
import React from 'react';
import { cn } from '@/lib/utils';
import { Forklift, StatusEmpilhadeira } from '@/types';
import { Calendar, MapPin, Clock, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ForkliftCardProps {
  forklift: Forklift;
  onClick: () => void;
  onDelete?: () => void;
}

const ForkliftCard: React.FC<ForkliftCardProps> = ({ forklift, onClick, onDelete }) => {
  // Get status color classes with gradients - More compact versions
  const getStatusBadge = (status: StatusEmpilhadeira) => {
    switch (status) {
      case StatusEmpilhadeira.OPERACIONAL:
        return (
          <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0 font-semibold tracking-wide shadow-lg shadow-emerald-500/25 text-xs px-2 py-0.5 whitespace-nowrap">
            ✓ OK
          </Badge>
        );
      case StatusEmpilhadeira.EM_MANUTENCAO:
        return (
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 font-semibold tracking-wide shadow-lg shadow-amber-500/25 animate-pulse text-xs px-2 py-0.5 whitespace-nowrap">
            🔧 Manutenção
          </Badge>
        );
      case StatusEmpilhadeira.PARADA:
        return (
          <Badge className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 font-semibold tracking-wide shadow-lg shadow-red-500/25 text-xs px-2 py-0.5 whitespace-nowrap">
            ⚠ Parada
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gradient-to-r from-slate-500 to-slate-600 text-white border-0 font-semibold tracking-wide text-xs px-2 py-0.5 whitespace-nowrap">
            {status}
          </Badge>
        );
    }
  };

  // Get type color for badge - More compact
  const getTypeBadge = (tipo: string) => {
    const colors = {
      'Gás': 'bg-blue-500/20 text-blue-300 border-blue-400/30',
      'Elétrica': 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
      'Retrátil': 'bg-purple-500/20 text-purple-300 border-purple-400/30'
    };
    
    return colors[tipo as keyof typeof colors] || 'bg-slate-500/20 text-slate-300 border-slate-400/30';
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div 
      className="group relative bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-3 cursor-pointer transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-slate-900/40 hover:scale-102 hover:-translate-y-1 hover:border-slate-600/60 animate-fade-in"
      onClick={onClick}
      style={{
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.25)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      }}
    >
      {/* Delete button */}
      {onDelete && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          className="absolute top-2 right-2 h-6 w-6 p-0 text-slate-400 hover:text-red-400 hover:bg-red-500/20 transition-all duration-200 z-20 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 rounded-full opacity-80 hover:opacity-100"
          title="Excluir empilhadeira"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      )}

      {/* Header - Improved layout for better responsiveness */}
      <div className="flex flex-col gap-2 mb-3 pr-8">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-white mb-0.5 tracking-wide truncate">
              {forklift.id}
            </h3>
            <p className="text-slate-400 font-medium tracking-wide text-sm truncate" style={{ color: '#94a3b8' }}>
              {forklift.modelo}
            </p>
            <p className="text-slate-500 text-xs tracking-wide truncate" style={{ color: '#64748b' }}>
              {forklift.marca}
            </p>
          </div>
        </div>
        
        {/* Status Badge - Now in a separate row for better spacing */}
        <div className="flex justify-end">
          {getStatusBadge(forklift.status)}
        </div>
      </div>

      {/* Type Badge */}
      <div className="mb-3">
        <Badge variant="outline" className={cn("border font-semibold text-xs tracking-wider whitespace-nowrap", getTypeBadge(forklift.tipo))}>
          {forklift.tipo}
        </Badge>
      </div>

      {/* Capacity Highlight */}
      <div className="bg-slate-800/40 rounded-lg p-2.5 mb-3 border border-slate-700/30">
        <div className="text-center">
          <div className="text-slate-400 text-xs font-medium tracking-wider uppercase mb-0.5" style={{ color: '#64748b', letterSpacing: '0.5px' }}>
            CAPACIDADE
          </div>
          <div className="text-lg font-extrabold tracking-tight" style={{ color: '#3b82f6' }}>
            {forklift.capacidade.toLocaleString()}
            <span className="text-sm font-semibold text-slate-300 ml-1">kg</span>
          </div>
        </div>
      </div>

      {/* Details - Improved spacing and responsiveness */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-400 min-w-0 flex-1" style={{ color: '#64748b' }}>
            <Clock className="w-3 h-3 flex-shrink-0" />
            <span className="font-medium tracking-wide truncate">Horímetro</span>
          </div>
          <span className="font-mono font-semibold text-slate-200 bg-slate-700/50 px-1.5 py-0.5 rounded text-xs flex-shrink-0" style={{ color: '#e2e8f0' }}>
            {forklift.horimetro?.toString().padStart(5, '0') || 'N/A'}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-400 min-w-0 flex-1" style={{ color: '#64748b' }}>
            <Calendar className="w-3 h-3 flex-shrink-0" />
            <span className="font-medium tracking-wide truncate">Últ. Manutenção</span>
          </div>
          <span className="font-semibold text-slate-200 text-xs flex-shrink-0" style={{ color: '#e2e8f0' }}>
            {forklift.ultimaManutencao || 'N/A'}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-400 min-w-0 flex-1" style={{ color: '#64748b' }}>
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="font-medium tracking-wide truncate">Localização</span>
          </div>
          <span className="font-semibold text-slate-200 text-xs flex-shrink-0 truncate max-w-[80px]" style={{ color: '#e2e8f0' }}>
            {forklift.localizacaoAtual || forklift.setor || 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForkliftCard;
