
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
import StandardCard from '@/components/common/StandardCard';

const MetricsGrid: React.FC = () => {
  const { metricas } = useAppStore();

  const metrics = [
    {
      title: 'Frota Total',
      value: metricas.frotaTotal,
      icon: Activity,
      variant: 'info' as const
    },
    {
      title: 'Operacionais',
      value: metricas.empilhadeirasOperacionais,
      icon: CheckCircle,
      variant: 'success' as const
    },
    {
      title: 'Em Manutenção',
      value: metricas.empilhadeirasManutencao,
      icon: AlertTriangle,
      variant: 'warning' as const
    },
    {
      title: 'Operadores Ativos',
      value: metricas.operadoresAtivos,
      icon: Users,
      variant: 'info' as const
    },
    {
      title: 'Eficiência Geral',
      value: `${metricas.eficienciaGeral}%`,
      icon: Gauge,
      variant: 'info' as const
    },
    {
      title: 'Custo Operacional',
      value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(metricas.custoOperacionalDia),
      icon: DollarSign,
      variant: 'danger' as const
    },
    {
      title: 'Tempo Médio/Operação',
      value: `${metricas.tempoMedioOperacao}min`,
      icon: Clock,
      variant: 'warning' as const
    },
    {
      title: 'Operações Ativas',
      value: metricas.operacoesAtivas,
      icon: Activity,
      variant: 'success' as const
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <StandardCard
          key={metric.title}
          title={metric.title}
          value={metric.value}
          icon={metric.icon}
          variant={metric.variant}
        />
      ))}
    </div>
  );
};

export default MetricsGrid;
