
import React from "react";
import { CheckCircle, AlertTriangle, Users, Activity } from "lucide-react";
import { MetricasDashboard } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

const initialStats: MetricasDashboard = {
  frotaTotal: 15,
  empilhadeirasOperacionais: 9,
  empilhadeirasParadas: 3,
  empilhadeirasManutencao: 3,
  operadoresAtivos: 20,
  operacoesAtivas: 7,
  operacoesConcluidas: 147,
  eficienciaGeral: 87.5,
  disponibilidadeGeral: 92.3,
  consumoGasTotal: 2450.8,
  custoOperacionalDia: 15420.50,
  produtividadeMedia: 94.2,
  tempoMedioOperacao: 45,
  alertasCriticos: 3
};

interface DashboardOverviewProps {
  stats?: MetricasDashboard;
}

interface OverviewCard {
  title: string;
  value: (stats: MetricasDashboard) => number;
  icon: React.ElementType;
  status: 'success' | 'warning' | 'info' | 'danger';
}

const CARDS: OverviewCard[] = [
  {
    title: "Total Frota",
    value: (stats: MetricasDashboard) => stats.frotaTotal,
    icon: Activity,
    status: "info",
  },
  {
    title: "Operacionais",
    value: (stats: MetricasDashboard) => stats.empilhadeirasOperacionais,
    icon: CheckCircle,
    status: "success",
  },
  {
    title: "Manutenção",
    value: (stats: MetricasDashboard) => stats.empilhadeirasManutencao,
    icon: AlertTriangle,
    status: "warning",
  },
  {
    title: "Operadores",
    value: (stats: MetricasDashboard) => stats.operadoresAtivos,
    icon: Users,
    status: "info",
  },
];

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  stats = initialStats,
}) => {
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

  return (
    <section className="w-full max-w-screen-xl mx-auto px-2 md:px-0 mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {CARDS.map((card) => {
          const config = statusConfig[card.status];
          const Icon = card.icon;
          
          return (
            <Card key={card.title} className="p-6">
              <CardContent className="p-0">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`p-3 rounded-lg ${config.iconBg}`}>
                    <Icon className={`w-6 h-6 ${config.iconColor}`} />
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-foreground">
                      {card.value(stats)}
                    </p>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      {card.title}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default DashboardOverview;
