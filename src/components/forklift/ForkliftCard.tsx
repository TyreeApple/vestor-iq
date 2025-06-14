
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
  // Get status color classes with gradients
  const getStatusBadge = (status: StatusEmpilhadeira) => {
    switch (status) {
      case StatusEmpilhadeira.OPERACIONAL:
        return (
          <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0 font-semibold tracking-wide shadow-lg shadow-emerald-500/25">
            ✓ Operacional
          </Badge>
        );
      case StatusEmpilhadeira.EM_MANUTENCAO:
        return (
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 font-semibold tracking-wide shadow-lg shadow-amber-500/25 animate-pulse">
            🔧 Em Manutenção
          </Badge>
        );
      case StatusEmpilhadeira.PARADA:
        return (
          <Badge className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 font-semibold tracking-wide shadow-lg shadow-red-500/25">
            ⚠ Parada
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gradient-to-r from-slate-500 to-slate-600 text-white border-0 font-semibold tracking-wide">
            {status}
          </Badge>
        );
    }
  };

  // Get type color for badge
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
      className="group relative bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 cursor-pointer transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-slate-900/40 hover:scale-102 hover:-translate-y-1 hover:border-slate-600/60 animate-fade-in"
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
          className="absolute top-4 right-4 h-8 w-8 p-0 text-slate-400 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1 tracking-wide" style={{ fontSize: '20px', fontWeight: 700 }}>
            {forklift.id}
          </h3>
          <p className="text-slate-400 font-medium tracking-wide" style={{ fontSize: '16px', fontWeight: 500, color: '#94a3b8' }}>
            {forklift.modelo}
          </p>
          <p className="text-slate-500 text-sm tracking-wide" style={{ color: '#64748b' }}>
            {forklift.marca}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          {getStatusBadge(forklift.status)}
        </div>
      </div>

      {/* Type Badge */}
      <div className="mb-4">
        <Badge variant="outline" className={cn("border font-semibold text-xs tracking-wider", getTypeBadge(forklift.tipo))}>
          {forklift.tipo}
        </Badge>
      </div>

      {/* Capacity Highlight */}
      <div className="bg-slate-800/40 rounded-lg p-4 mb-4 border border-slate-700/30">
        <div className="text-center">
          <div className="text-slate-400 text-sm font-medium tracking-wider uppercase mb-1" style={{ color: '#64748b', letterSpacing: '0.5px' }}>
            CAPACIDADE
          </div>
          <div className="text-3xl font-extrabold tracking-tight" style={{ fontSize: '24px', fontWeight: 800, color: '#3b82f6' }}>
            {forklift.capacidade.toLocaleString()}
            <span className="text-lg font-semibold text-slate-300 ml-1">kg</span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-slate-400" style={{ color: '#64748b' }}>
            <Clock className="w-4 h-4" />
            <span className="font-medium tracking-wide">Horímetro</span>
          </div>
          <span className="font-mono font-semibold text-slate-200 bg-slate-700/50 px-2 py-1 rounded text-xs" style={{ color: '#e2e8f0' }}>
            {forklift.horimetro?.toString().padStart(5, '0') || 'N/A'}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-slate-400" style={{ color: '#64748b' }}>
            <Calendar className="w-4 h-4" />
            <span className="font-medium tracking-wide">Últ. Manutenção</span>
          </div>
          <span className="font-semibold text-slate-200" style={{ color: '#e2e8f0' }}>
            {forklift.ultimaManutencao || 'N/A'}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-slate-400" style={{ color: '#64748b' }}>
            <MapPin className="w-4 h-4" />
            <span className="font-medium tracking-wide">Localização</span>
          </div>
          <span className="font-semibold text-slate-200" style={{ color: '#e2e8f0' }}>
            {forklift.localizacaoAtual || forklift.setor || 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForkliftCard;
