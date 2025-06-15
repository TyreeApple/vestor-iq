
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Wrench, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Calendar,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedCounter from '@/components/common/AnimatedCounter';
import { OrdemServico, StatusManutencao } from '@/types';

interface MaintenanceKpiCardsProps {
  maintenanceData: OrdemServico[];
}

const MaintenanceKpiCards: React.FC<MaintenanceKpiCardsProps> = ({ maintenanceData }) => {
  // Calculate metrics
  const totalMaintenance = maintenanceData.length;
  const pendingMaintenance = maintenanceData.filter(m => m.status !== StatusManutencao.CONCLUIDA).length;
  const completedMaintenance = maintenanceData.filter(m => m.status === StatusManutencao.CONCLUIDA).length;
  const inProgressMaintenance = maintenanceData.filter(m => m.status === StatusManutencao.EM_ANDAMENTO).length;
  
  const totalCosts = maintenanceData.reduce((sum, m) => sum + (m.custos?.total || 0), 0);
  const avgCostPerMaintenance = totalMaintenance > 0 ? totalCosts / totalMaintenance : 0;
  
  const completionRate = totalMaintenance > 0 ? (completedMaintenance / totalMaintenance) * 100 : 0;
  
  const urgentMaintenance = maintenanceData.filter(m => 
    m.prioridade === 'CRITICA' || m.prioridade === 'ALTA'
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
      title: 'Em Andamento',
      value: inProgressMaintenance,
      icon: Activity,
      color: 'from-yellow-500 to-yellow-600',
      trend: { value: 15, isPositive: true }
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
      title: 'Custo Médio',
      value: avgCostPerMaintenance,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      format: 'currency',
      trend: { value: 3, isPositive: true }
    },
    {
      title: 'Taxa de Conclusão',
      value: completionRate,
      icon: Calendar,
      color: 'from-indigo-500 to-indigo-600',
      format: 'percentage',
      trend: { value: 7, isPositive: true }
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
      case 'percentage':
        return `${value.toFixed(1)}%`;
      default:
        return <AnimatedCounter value={value} />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {kpis.map((kpi) => (
        <Card key={kpi.title} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-90",
            kpi.color
          )} />
          
          <CardHeader className="relative pb-2">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <kpi.icon className="w-5 h-5 text-white" />
              </div>
              {kpi.trend && (
                <div className={cn(
                  "flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm",
                  kpi.trend.isPositive ? "text-green-100" : "text-red-100"
                )}>
                  {kpi.trend.isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingUp className="w-3 h-3 rotate-180" />
                  )}
                  <span>{kpi.trend.value}%</span>
                </div>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="relative pt-0">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-white">
                {formatValue(kpi.value, kpi.format)}
              </p>
              <p className="text-sm text-white/90 font-medium">
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
