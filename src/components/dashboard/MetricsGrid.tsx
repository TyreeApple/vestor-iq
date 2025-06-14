
import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Gauge
} from 'lucide-react';
import { MdForklift } from 'react-icons/md';
import { useAppStore } from '@/stores/useAppStore';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  format?: 'number' | 'currency' | 'percentage' | 'time';
  color: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'indigo';
  delay?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  format = 'number',
  color,
  delay = 0
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

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 shadow-blue-500/25',
    green: 'from-green-500 to-green-600 shadow-green-500/25',
    orange: 'from-orange-500 to-orange-600 shadow-orange-500/25',
    red: 'from-red-500 to-red-600 shadow-red-500/25',
    purple: 'from-purple-500 to-purple-600 shadow-purple-500/25',
    indigo: 'from-indigo-500 to-indigo-600 shadow-indigo-500/25',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative overflow-hidden"
    >
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Background gradient overlay */}
        <div className={cn(
          "absolute top-0 right-0 w-24 h-24 bg-gradient-to-br opacity-10 rounded-full transform translate-x-8 -translate-y-8",
          colorClasses[color]
        )} />
        
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className={cn(
              "p-3 rounded-xl bg-gradient-to-br shadow-lg",
              colorClasses[color]
            )}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            
            {trend && (
              <div className={cn(
                "flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium",
                trend.isPositive 
                  ? "bg-green-100 text-green-700" 
                  : "bg-red-100 text-red-700"
              )}>
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
            <h3 className="text-sm font-medium text-slate-600">{title}</h3>
            <p className="text-2xl font-bold text-slate-900">
              {formatValue(value)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MetricsGrid: React.FC = () => {
  const { metricas } = useAppStore();

  const metrics = [
    {
      title: 'Frota Total',
      value: metricas.frotaTotal,
      icon: MdForklift,
      color: 'blue' as const,
      trend: { value: 8.2, isPositive: true }
    },
    {
      title: 'Operacionais',
      value: metricas.empilhadeirasOperacionais,
      icon: CheckCircle,
      color: 'green' as const,
      trend: { value: 12.5, isPositive: true }
    },
    {
      title: 'Em Manutenção',
      value: metricas.empilhadeirasManutencao,
      icon: AlertTriangle,
      color: 'orange' as const,
      trend: { value: 5.1, isPositive: false }
    },
    {
      title: 'Operadores Ativos',
      value: metricas.operadoresAtivos,
      icon: Activity,
      color: 'purple' as const,
      trend: { value: 3.8, isPositive: true }
    },
    {
      title: 'Eficiência Geral',
      value: metricas.eficienciaGeral,
      icon: Gauge,
      color: 'indigo' as const,
      format: 'percentage' as const,
      trend: { value: 2.3, isPositive: true }
    },
    {
      title: 'Custo Operacional',
      value: metricas.custoOperacionalDia,
      icon: DollarSign,
      color: 'red' as const,
      format: 'currency' as const,
      trend: { value: 1.7, isPositive: false }
    },
    {
      title: 'Tempo Médio/Operação',
      value: metricas.tempoMedioOperacao,
      icon: Clock,
      color: 'orange' as const,
      format: 'time' as const,
      trend: { value: 4.2, isPositive: false }
    },
    {
      title: 'Operações Ativas',
      value: metricas.operacoesAtivas,
      icon: Activity,
      color: 'green' as const,
      trend: { value: 15.8, isPositive: true }
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <MetricCard
          key={metric.title}
          {...metric}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
};

export default MetricsGrid;
