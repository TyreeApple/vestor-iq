
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
  CheckCircle
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
          label: 'Crítica',
          pulseColor: 'bg-red-500'
        };
      case PrioridadeOperacao.ALTA:
        return { 
          color: 'bg-orange-500', 
          textColor: 'text-orange-700', 
          bgColor: 'bg-orange-50 dark:bg-orange-900/20',
          label: 'Alta',
          pulseColor: 'bg-orange-500'
        };
      case PrioridadeOperacao.NORMAL:
        return { 
          color: 'bg-blue-500', 
          textColor: 'text-blue-700', 
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          label: 'Normal',
          pulseColor: 'bg-blue-500'
        };
      default:
        return { 
          color: 'bg-gray-500', 
          textColor: 'text-gray-700', 
          bgColor: 'bg-gray-50 dark:bg-gray-900/20',
          label: 'Baixa',
          pulseColor: 'bg-gray-500'
        };
    }
  };

  const getStatusConfig = (status: StatusManutencao) => {
    switch (status) {
      case StatusManutencao.ABERTA:
        return { variant: 'warning' as const, label: 'Aberta' };
      case StatusManutencao.EM_ANDAMENTO:
        return { variant: 'info' as const, label: 'Em Andamento' };
      default:
        return { variant: 'default' as const, label: status };
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
    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 dark:from-card dark:to-card/80">
      {/* Priority indicator stripe */}
      <div className={cn("absolute top-0 left-0 w-1 h-full", priorityConfig.color)} />
      
      {/* Pulse animation for critical priority */}
      {maintenance.prioridade === PrioridadeOperacao.CRITICA && (
        <div className="absolute top-2 right-2">
          <div className={cn("w-3 h-3 rounded-full animate-pulse", priorityConfig.pulseColor)} />
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">#{maintenance.id}</h3>
              <Badge variant={statusConfig.variant} size="sm">
                {statusConfig.label}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              {getMaintenanceTypeIcon(maintenance.tipo)}
              <span className="text-sm capitalize">{maintenance.tipo.toLowerCase()}</span>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => onEdit(maintenance)}>
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </DropdownMenuItem>
              {maintenance.status === StatusManutencao.ABERTA && onStatusChange && (
                <DropdownMenuItem onClick={() => onStatusChange(maintenance.id, StatusManutencao.EM_ANDAMENTO)}>
                  <Play className="w-4 h-4 mr-2" />
                  Iniciar
                </DropdownMenuItem>
              )}
              {maintenance.status === StatusManutencao.EM_ANDAMENTO && onStatusChange && (
                <>
                  <DropdownMenuItem onClick={() => onStatusChange(maintenance.id, StatusManutencao.ABERTA)}>
                    <Pause className="w-4 h-4 mr-2" />
                    Pausar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onStatusChange(maintenance.id, StatusManutencao.CONCLUIDA)}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Concluir
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuItem 
                onClick={() => onDelete(maintenance.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Priority Badge */}
        <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium", priorityConfig.bgColor, priorityConfig.textColor)}>
          <div className={cn("w-2 h-2 rounded-full", priorityConfig.color)} />
          Prioridade {priorityConfig.label}
        </div>

        {/* Problem description */}
        <div className="p-3 bg-muted/30 rounded-lg border-l-4 border-l-orange-400">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm font-medium leading-relaxed">{maintenance.problema}</p>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <div>
              <p className="font-medium">{maintenance.empilhadeiraId || maintenance.forkliftId}</p>
              <p className="text-xs text-muted-foreground">{maintenance.empilhadeira?.modelo || maintenance.forkliftModel}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <div>
              <p className="font-medium">{maintenance.reportedBy || 'Sistema'}</p>
              <p className="text-xs text-muted-foreground">Reportado</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <div>
              <p className="font-medium">{formatDate(maintenance.dataAbertura || maintenance.reportedDate || '')}</p>
              <p className="text-xs text-muted-foreground">Abertura</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <div>
              <p className="font-medium">
                {maintenance.custos?.total ? 
                  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(maintenance.custos.total) : 
                  'R$ 0,00'
                }
              </p>
              <p className="text-xs text-muted-foreground">Custo atual</p>
            </div>
          </div>
        </div>

        {/* Progress indicator for in-progress items */}
        {maintenance.status === StatusManutencao.EM_ANDAMENTO && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progresso estimado</span>
              <span>65%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: '65%' }} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PendingMaintenanceCard;
