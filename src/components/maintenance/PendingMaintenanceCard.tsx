
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Badge from "@/components/common/Badge";
import { 
  AlertTriangle, 
  Calendar, 
  Clock, 
  DollarSign, 
  Edit, 
  MoreVertical, 
  Trash2, 
  User, 
  Wrench,
  Truck,
  Play,
  Pause,
  CheckCircle,
  ArrowRight,
  Timer
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { OrdemServico, StatusManutencao, PrioridadeOperacao, TipoManutencao } from '@/types';

interface PendingMaintenanceCardProps {
  maintenance: OrdemServico;
  onEdit: (maintenance: OrdemServico) => void;
  onDelete: (id: string) => void;
  onStatusChange?: (id: string, status: StatusManutencao) => void;
}

const PendingMaintenanceCard: React.FC<PendingMaintenanceCardProps> = ({
  maintenance,
  onEdit,
  onDelete,
  onStatusChange
}) => {
  const formatDate = (dateString: string) => {
    try {
      const dateParts = dateString.split('-');
      return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    } catch (e) {
      return dateString;
    }
  };

  const getPriorityConfig = (priority: PrioridadeOperacao) => {
    switch (priority) {
      case PrioridadeOperacao.CRITICA:
        return { 
          color: 'bg-red-500', 
          textColor: 'text-red-700', 
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          label: 'Alta',
          accentColor: 'border-l-red-500',
          glowColor: 'shadow-red-500/20'
        };
      case PrioridadeOperacao.ALTA:
        return { 
          color: 'bg-orange-500', 
          textColor: 'text-orange-700', 
          bgColor: 'bg-orange-50 dark:bg-orange-900/20',
          label: 'Alta',
          accentColor: 'border-l-orange-500',
          glowColor: 'shadow-orange-500/20'
        };
      case PrioridadeOperacao.NORMAL:
        return { 
          color: 'bg-blue-500', 
          textColor: 'text-blue-700', 
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          label: 'Normal',
          accentColor: 'border-l-blue-500',
          glowColor: 'shadow-blue-500/20'
        };
      default:
        return { 
          color: 'bg-gray-500', 
          textColor: 'text-gray-700', 
          bgColor: 'bg-gray-50 dark:bg-gray-900/20',
          label: 'Baixa',
          accentColor: 'border-l-gray-500',
          glowColor: 'shadow-gray-500/20'
        };
    }
  };

  const getStatusConfig = (status: StatusManutencao) => {
    switch (status) {
      case StatusManutencao.ABERTA:
        return { variant: 'warning' as const, label: 'Aberta', icon: Clock };
      case StatusManutencao.EM_ANDAMENTO:
        return { variant: 'info' as const, label: 'Em Andamento', icon: Timer };
      default:
        return { variant: 'default' as const, label: status, icon: Clock };
    }
  };

  const getMaintenanceTypeIcon = (type: TipoManutencao) => {
    switch (type) {
      case TipoManutencao.PREVENTIVA:
        return <Calendar className="w-4 h-4" />;
      case TipoManutencao.CORRETIVA:
        return <Wrench className="w-4 h-4" />;
      case TipoManutencao.PREDITIVA:
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Wrench className="w-4 h-4" />;
    }
  };

  const priorityConfig = getPriorityConfig(maintenance.prioridade);
  const statusConfig = getStatusConfig(maintenance.status);

  return (
    <Card className={cn(
      "group relative overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-pointer",
      "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
      "border-l-4 shadow-xl hover:shadow-2xl",
      priorityConfig.accentColor,
      priorityConfig.glowColor
    )}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent" />
      
      {/* Priority Pulse Effect */}
      {maintenance.prioridade === PrioridadeOperacao.CRITICA && (
        <div className="absolute top-3 right-3">
          <div className="relative">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
            <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full" />
          </div>
        </div>
      )}

      <CardHeader className="pb-4 relative">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                #{maintenance.id}
              </span>
              <Badge variant={statusConfig.variant} size="sm" className="gap-1">
                <statusConfig.icon className="w-3 h-3" />
                {statusConfig.label}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              {getMaintenanceTypeIcon(maintenance.tipo)}
              <span className="text-sm font-medium capitalize">{maintenance.tipo.toLowerCase()}</span>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10 opacity-70 group-hover:opacity-100 transition-all"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-slate-800 border-slate-700">
              <DropdownMenuItem onClick={() => onEdit(maintenance)} className="text-gray-300 hover:text-white hover:bg-slate-700">
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </DropdownMenuItem>
              {maintenance.status === StatusManutencao.ABERTA && onStatusChange && (
                <DropdownMenuItem onClick={() => onStatusChange(maintenance.id, StatusManutencao.EM_ANDAMENTO)} className="text-green-400 hover:text-green-300 hover:bg-slate-700">
                  <Play className="w-4 h-4 mr-2" />
                  Iniciar
                </DropdownMenuItem>
              )}
              {maintenance.status === StatusManutencao.EM_ANDAMENTO && onStatusChange && (
                <>
                  <DropdownMenuItem onClick={() => onStatusChange(maintenance.id, StatusManutencao.ABERTA)} className="text-yellow-400 hover:text-yellow-300 hover:bg-slate-700">
                    <Pause className="w-4 h-4 mr-2" />
                    Pausar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onStatusChange(maintenance.id, StatusManutencao.CONCLUIDA)} className="text-green-400 hover:text-green-300 hover:bg-slate-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Concluir
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuItem 
                onClick={() => onDelete(maintenance.id)}
                className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Priority Badge */}
        <div className={cn(
          "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm",
          "bg-gradient-to-r from-white/10 to-white/5 border border-white/20"
        )}>
          <div className={cn("w-2 h-2 rounded-full animate-pulse", priorityConfig.color)} />
          <span className="text-white">Prioridade {priorityConfig.label}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 relative">
        {/* Problem Description */}
        <div className="relative">
          <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-orange-500 to-red-500 rounded-full" />
          <div className="pl-4">
            <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm font-medium text-gray-200 leading-relaxed">{maintenance.problema}</p>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1 p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 text-gray-400">
              <Truck className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wide">Empilhadeira</span>
            </div>
            <p className="font-bold text-white">{maintenance.empilhadeiraId || maintenance.forkliftId}</p>
            <p className="text-xs text-gray-400">{maintenance.empilhadeira?.modelo || maintenance.forkliftModel}</p>
          </div>
          
          <div className="space-y-1 p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 text-gray-400">
              <User className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wide">Responsável</span>
            </div>
            <p className="font-bold text-white">{maintenance.reportedBy || 'Sistema'}</p>
            <p className="text-xs text-gray-400">Reportado por</p>
          </div>
          
          <div className="space-y-1 p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wide">Abertura</span>
            </div>
            <p className="font-bold text-white">{formatDate(maintenance.dataAbertura || maintenance.reportedDate || '')}</p>
            <p className="text-xs text-gray-400">Data de criação</p>
          </div>
          
          <div className="space-y-1 p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 text-gray-400">
              <DollarSign className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wide">Custo</span>
            </div>
            <p className="font-bold text-white">
              {maintenance.custos?.total ? 
                new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(maintenance.custos.total) : 
                'R$ 0,00'
              }
            </p>
            <p className="text-xs text-gray-400">Valor atual</p>
          </div>
        </div>

        {/* Progress Bar for In-Progress Items */}
        {maintenance.status === StatusManutencao.EM_ANDAMENTO && (
          <div className="space-y-3 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-300">Progresso estimado</span>
              <span className="text-sm font-bold text-blue-400">65%</span>
            </div>
            <div className="relative">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-700 ease-out relative overflow-hidden"
                  style={{ width: '65%' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <Button 
          onClick={() => onEdit(maintenance)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-300 group"
        >
          <span>Ver Detalhes</span>
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default PendingMaintenanceCard;
