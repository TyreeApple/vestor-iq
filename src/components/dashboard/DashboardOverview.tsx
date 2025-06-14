
import React from "react";
import { Truck, Settings, Clock, ClipboardList, Users } from "lucide-react";
import ModernKpiCard from "./ModernKpiCard";
import FleetBarChart from "./FleetBarChart";
import PremiumSummaryCard from "./PremiumSummaryCard";
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
        <ModernKpiCard
          title="Operacionais"
          value={stats.operationalForklifts}
          icon={Truck}
          colorFrom="from-green-500"
          colorTo="to-green-800"
          trend="up"
          trendValue={3}
        />
        <ModernKpiCard
          title="Manutenção"
          value={stats.maintenanceForklifts}
          icon={Settings}
          colorFrom="from-yellow-400"
          colorTo="to-yellow-700"
          trend="down"
          trendValue={-1}
        />
        <ModernKpiCard
          title="Paradas"
          value={stats.stoppedForklifts}
          icon={Clock}
          colorFrom="from-red-400"
          colorTo="to-red-700"
          trend="down"
          trendValue={-1}
        />
        <ModernKpiCard
          title="Ativas"
          value={stats.activeOperations}
          icon={ClipboardList}
          colorFrom="from-blue-500"
          colorTo="to-violet-800"
          trend="up"
          trendValue={2}
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
        <PremiumSummaryCard
          title="Empilhadeiras Totais"
          value={stats.totalForklifts}
          icon={Truck}
          colorFrom="from-fuchsia-700"
          colorTo="to-purple-900"
        />
        <PremiumSummaryCard
          title="Total de Operadores"
          value={stats.totalOperators}
          icon={Users}
          colorFrom="from-blue-800"
          colorTo="to-cyan-900"
        />
        <PremiumSummaryCard
          title="Pendências de Manutenção"
          value={stats.pendingMaintenances}
          icon={Settings}
          colorFrom="from-yellow-700"
          colorTo="to-yellow-800"
        />
      </div>
    </section>
  );
};

export default DashboardOverview;
