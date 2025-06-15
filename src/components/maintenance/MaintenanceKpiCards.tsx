
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Wrench, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Play,
  Pause
} from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedCounter from '@/components/common/AnimatedCounter';
import { OrdemServico, StatusManutencao, PrioridadeOperacao } from '@/types';

interface MaintenanceKpiCardsProps {
  maintenanceData: OrdemServico[];
}

const MaintenanceKpiCards: React.FC<MaintenanceKpiCardsProps> = ({ maintenanceData }) => {
  // Calculate advanced metrics
  const totalMaintenance = maintenanceData.length;
  const pendingMaintenance = maintenanceData.filter(m => m.status === StatusManutencao.ABERTA).length;
  const inProgressMaintenance = maintenanceData.filter(m => m.status === StatusManutencao.EM_ANDAMENTO).length;
  const completedMaintenance = maintenanceData.filter(m => m.status === StatusManutencao.CONCLUIDA).length;
  
  const totalCosts = maintenanceData.reduce((sum, m) => sum + (m.custos?.total || 0), 0);
  const avgCost = totalMaintenance > 0 ? totalCosts / totalMaintenance : 0;
  
  const urgentMaintenance = maintenanceData.filter(m => 
    m.prioridade === PrioridadeOperacao.CRITICA || m.prioridade === PrioridadeOperacao.ALTA
  ).length;

  // Calculate completion rate
  const completionRate = totalMaintenance > 0 ? (completedMaintenance / totalMaintenance) * 100 : 0;

  const kpis = [
    {
      title: 'Total de Manutenções',
      value: totalMaintenance,
      icon: Wrench,
      color: 'from-blue-500 to-blue-600',
      trend: { value: 12, isPositive: true },
      subtitle: 'Este mês'
    },
    {
      title: 'Pendentes',
      value: pendingMaintenance,
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      trend: { value: 8, isPositive: false },
      subtitle: 'Aguardando início'
    },
    {
      title: 'Em Andamento',
      value: inProgressMaintenance,
      icon: Play,
      color: 'from-blue-500 to-purple-600',
      trend: { value: 25, isPositive: true },
      subtitle: 'Executando agora'
    },
    {
      title: 'Concluídas',
      value: completedMaintenance,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      trend: { value: 15, isPositive: true },
      subtitle: `${completionRate.toFixed(1)}% do total`
    },
    {
      title: 'Custo Médio',
      value: avgCost,
      icon: DollarSign,
      color: 'from-red-500 to-red-600',
      format: 'currency',
      trend: { value: 5, isPositive: false },
      subtitle: 'Por manutenção'
    },
    {
      title: 'Urgentes',
      value: urgentMaintenance,
      icon: AlertTriangle,
      color: 'from-pink-500 to-pink-600',
      trend: { value: 10, isPositive: false },
      subtitle: 'Alta prioridade'
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
    <section>
      <h2 className="text-xl font-semibold mb-4 text-slate-200">Indicadores de Performance</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {kpis.map((kpi) => (
          <Card 
            key={kpi.title} 
            className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-90",
              kpi.color
            )} />
            
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full blur-xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
            
            <CardHeader className="relative pb-2 p-4">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-white/15 rounded-lg backdrop-blur-sm shadow-lg">
                  <kpi.icon className="w-5 h-5 text-white" />
                </div>
                {kpi.trend && (
                  <div className={cn(
                    "flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm border border-white/20",
                    kpi.trend.isPositive ? "text-green-100" : "text-red-100"
                  )}>
                    {kpi.trend.isPositive ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span>{kpi.trend.isPositive ? '+' : ''}{kpi.trend.value}%</span>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="relative pt-0 p-4">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-white drop-shadow-sm">
                  {formatValue(kpi.value, kpi.format)}
                </p>
                <p className="text-xs text-white/90 font-medium leading-tight">
                  {kpi.title}
                </p>
                {kpi.subtitle && (
                  <p className="text-xs text-white/70 leading-tight">
                    {kpi.subtitle}
                  </p>
                )}
              </div>
            </CardContent>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Card>
        ))}
      </div>
    </section>
  );
};

export default MaintenanceKpiCards;
