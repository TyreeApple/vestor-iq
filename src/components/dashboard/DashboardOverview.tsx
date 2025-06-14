
import React from "react";
import { Truck, Settings, Clock, ClipboardList, Users, FileText } from "lucide-react";
import KpiCard from "./KpiCard";
import FleetBarChart from "./FleetBarChart";
import SummaryCard from "./SummaryCard";
import QuickActions from "./QuickActions";
import { DashboardStats } from "@/types";

const initialStats: DashboardStats = {
  totalForklifts: 15,
  operationalForklifts: 9,
  stoppedForklifts: 3,
  maintenanceForklifts: 3,
  totalOperators: 20,
  operatorsWithValidCertificates: 16,
  operatorsWithWarningCertificates: 3,
  operatorsWithExpiredCertificates: 1,
  activeOperations: 7,
  pendingMaintenances: 4
};

interface DashboardOverviewProps {
  stats?: DashboardStats;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  stats = initialStats
}) => {
  return (
    <section className="flex flex-col gap-10 px-2 md:px-0 max-w-screen-xl mx-auto animate-fade-in">
      {/* KPIs Linha Superior */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-2">
        <KpiCard
          title="Operacionais"
          value={stats.operationalForklifts}
          icon={Truck}
          color="bg-status-operational/90 text-white"
        />
        <KpiCard
          title="Manutenção"
          value={stats.maintenanceForklifts}
          icon={Settings}
          color="bg-status-maintenance/90 text-white"
        />
        <KpiCard
          title="Paradas"
          value={stats.stoppedForklifts}
          icon={Clock}
          color="bg-status-warning/80 text-white"
        />
        <KpiCard
          title="Ativas"
          value={stats.activeOperations}
          icon={ClipboardList}
          color="bg-primary"
        />
      </div>

      {/* Gráfico Central */}
      <div className="bg-card rounded-2xl shadow-lg p-4">
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-foreground mb-1">Status da Frota</h3>
        </div>
        <FleetBarChart />
      </div>

      {/* Atalhos Ações Rápidas */}
      <QuickActions />

      {/* Cards Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-2">
        <SummaryCard
          title="Empilhadeiras Totais"
          value={stats.totalForklifts}
          icon={Truck}
          color="bg-accent/30"
        />
        <SummaryCard
          title="Total de Operadores"
          value={stats.totalOperators}
          icon={Users}
          color="bg-accent/30"
        />
        <SummaryCard
          title="Pendências de Manutenção"
          value={stats.pendingMaintenances}
          icon={Settings}
          color="bg-status-maintenance/15"
        />
      </div>
    </section>
  );
};

export default DashboardOverview;
