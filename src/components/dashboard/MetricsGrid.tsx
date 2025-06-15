
import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Gauge,
  Users
} from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { Card, CardContent } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  format?: 'number' | 'currency' | 'percentage' | 'time';
  status: 'success' | 'warning' | 'danger' | 'info';
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  format = 'number',
  status
}) => {
  const formatValue = (val: number | string) => {
    if (typeof val === 'string') return val;
    
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(val);
      case 'percentage':
        return `${val}%`;
      case 'time':
        return `${val}min`;
      default:
        return new Intl.NumberFormat('pt-BR').format(val);
    }
  };

  const statusConfig = {
    success: {
      iconBg: 'bg-green-500',
      iconColor: 'text-white'
    },
    warning: {
      iconBg: 'bg-orange-500',
      iconColor: 'text-white'
    },
    danger: {
      iconBg: 'bg-red-500',
      iconColor: 'text-white'
    },
    info: {
      iconBg: 'bg-blue-500',
      iconColor: 'text-white'
    }
  };

  const config = statusConfig[status];

  return (
    <Card className="p-6">
      <CardContent className="p-0">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg ${config.iconBg}`}>
            <Icon className={`w-5 h-5 ${config.iconColor}`} />
          </div>
          
          {trend && (
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
              trend.isPositive 
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            }`}>
              {trend.isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <p className="text-2xl font-bold text-foreground">
            {formatValue(value)}
          </p>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
      </CardContent>
    </Card>
  );
};

const MetricsGrid: React.FC = () => {
  const { metricas } = useAppStore();

  const metrics = [
    {
      title: 'Frota Total',
      value: metricas.frotaTotal,
      icon: Activity,
      status: 'info' as const,
      trend: { value: 8.2, isPositive: true }
    },
    {
      title: 'Operacionais',
      value: metricas.empilhadeirasOperacionais,
      icon: CheckCircle,
      status: 'success' as const,
      trend: { value: 12.5, isPositive: true }
    },
    {
      title: 'Em Manutenção',
      value: metricas.empilhadeirasManutencao,
      icon: AlertTriangle,
      status: 'warning' as const,
      trend: { value: 5.1, isPositive: false }
    },
    {
      title: 'Operadores Ativos',
      value: metricas.operadoresAtivos,
      icon: Users,
      status: 'info' as const,
      trend: { value: 3.8, isPositive: true }
    },
    {
      title: 'Eficiência Geral',
      value: metricas.eficienciaGeral,
      icon: Gauge,
      status: 'info' as const,
      format: 'percentage' as const,
      trend: { value: 2.3, isPositive: true }
    },
    {
      title: 'Custo Operacional',
      value: metricas.custoOperacionalDia,
      icon: DollarSign,
      status: 'danger' as const,
      format: 'currency' as const,
      trend: { value: 1.7, isPositive: false }
    },
    {
      title: 'Tempo Médio/Operação',
      value: metricas.tempoMedioOperacao,
      icon: Clock,
      status: 'warning' as const,
      format: 'time' as const,
      trend: { value: 4.2, isPositive: false }
    },
    {
      title: 'Operações Ativas',
      value: metricas.operacoesAtivas,
      icon: Activity,
      status: 'success' as const,
      trend: { value: 15.8, isPositive: true }
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <MetricCard
          key={metric.title}
          {...metric}
        />
      ))}
    </div>
  );
};

export default MetricsGrid;
