
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Wrench, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedCounter from '@/components/common/AnimatedCounter';
import { OrdemServico, StatusManutencao, PrioridadeOperacao } from '@/types';

interface MaintenanceKpiCardsProps {
  maintenanceData: OrdemServico[];
}

const MaintenanceKpiCards: React.FC<MaintenanceKpiCardsProps> = ({ maintenanceData }) => {
  // Calculate metrics
  const totalMaintenance = maintenanceData.length;
  const pendingMaintenance = maintenanceData.filter(m => m.status !== StatusManutencao.CONCLUIDA).length;
  const completedMaintenance = maintenanceData.filter(m => m.status === StatusManutencao.CONCLUIDA).length;
  
  const totalCosts = maintenanceData.reduce((sum, m) => sum + (m.custos?.total || 0), 0);
  
  const urgentMaintenance = maintenanceData.filter(m => 
    m.prioridade === PrioridadeOperacao.CRITICA || m.prioridade === PrioridadeOperacao.ALTA
  ).length;

  const kpis = [
    {
      title: 'Total de Manutenções',
      value: totalMaintenance,
      icon: Wrench,
      color: 'from-blue-500 to-blue-600',
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Pendentes',
      value: pendingMaintenance,
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      trend: { value: 8, isPositive: false }
    },
    {
      title: 'Concluídas',
      value: completedMaintenance,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      trend: { value: 25, isPositive: true }
    },
    {
      title: 'Custo Total',
      value: totalCosts,
      icon: DollarSign,
      color: 'from-red-500 to-red-600',
      format: 'currency',
      trend: { value: 5, isPositive: false }
    },
    {
      title: 'Urgentes',
      value: urgentMaintenance,
      icon: AlertTriangle,
      color: 'from-pink-500 to-pink-600',
      trend: { value: 10, isPositive: false }
    }
  ];

  const formatValue = (value: number, format?: string) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(value);
      default:
        return <AnimatedCounter value={value} />;
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
      {kpis.map((kpi) => (
        <Card key={kpi.title} className="relative overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-90",
            kpi.color
          )} />
          
          <CardHeader className="relative pb-2 p-4">
            <div className="flex items-center justify-between">
              <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                <kpi.icon className="w-4 h-4 text-white" />
              </div>
              {kpi.trend && (
                <div className={cn(
                  "flex items-center space-x-1 px-1.5 py-0.5 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm",
                  kpi.trend.isPositive ? "text-green-100" : "text-red-100"
                )}>
                  <span>{kpi.trend.isPositive ? '+' : ''}{kpi.trend.value}%</span>
                </div>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="relative pt-0 p-4">
            <div className="space-y-1">
              <p className="text-xl font-bold text-white">
                {formatValue(kpi.value, kpi.format)}
              </p>
              <p className="text-xs text-white/90 font-medium leading-tight">
                {kpi.title}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MaintenanceKpiCards;
