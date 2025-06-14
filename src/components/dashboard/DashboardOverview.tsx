
import React from "react";
import StatusCard from "./StatusCard";
import FleetBarChart from "./FleetBarChart";
import { Truck, Settings, Clock } from "lucide-react";
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
    <section className="flex flex-col gap-10 px-2 md:px-0">
      {/* HERO GRID */}
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <StatusCard
          title="Em Operação"
          value={stats.operationalForklifts}
          icon={Truck}
          status="success"
        />
        <StatusCard
          title="Em Manutenção"
          value={stats.maintenanceForklifts}
          icon={Settings}
          status="warning"
        />
        <div className="md:col-span-2 flex items-center justify-center bg-card rounded-2xl p-0 md:p-2 shadow">
          <FleetBarChart />
        </div>
      </div>
      {/* KPIs ADICIONAIS EM GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <StatusCard
          title="Paradas"
          value={stats.stoppedForklifts}
          icon={Clock}
          status="neutral"
        />
        <StatusCard
          title="Total de Empilhadeiras"
          value={stats.totalForklifts}
          icon={Truck}
          status="info"
        />
        <StatusCard
          title="Total de Operadores"
          value={stats.totalOperators}
          icon={Truck}
          status="info"
        />
        <StatusCard
          title="Operações Ativas"
          value={stats.activeOperations}
          icon={Truck}
          status="success"
        />
      </div>
      {/* BOTÃO DE DETALHES */}
      <div className="flex justify-center mt-4">
        <button className="px-6 py-2 text-base rounded-lg bg-primary text-white font-semibold shadow hover:scale-105 transition">
          Visualizar Detalhes da Frota
        </button>
      </div>
    </section>
  );
};

export default DashboardOverview;
