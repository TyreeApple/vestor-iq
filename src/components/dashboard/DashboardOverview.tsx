import React from "react";
import { CheckCircle, AlertTriangle, Users, Activity } from "lucide-react";
import { MetricasDashboard } from "@/types";
import StandardCard from "@/components/common/StandardCard";

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
  return (
    <section className="w-full max-w-screen-xl mx-auto px-2 md:px-0 mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <StandardCard
          title="Total Frota"
          value={stats.frotaTotal}
          icon={Activity}
          variant="info"
        />
        <StandardCard
          title="Operacionais"
          value={stats.empilhadeirasOperacionais}
          icon={CheckCircle}
          variant="success"
        />
        <StandardCard
          title="Manutenção"
          value={stats.empilhadeirasManutencao}
          icon={AlertTriangle}
          variant="warning"
        />
        <StandardCard
          title="Operadores"
          value={stats.operadoresAtivos}
          icon={Users}
          variant="info"
        />
      </div>
    </section>
  );
};

export default DashboardOverview;
