
import React from "react";
import { Truck, Users, Check, Triangle } from "lucide-react";
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

const TOP_CARDS = [
  {
    title: "Total Frota",
    value: (stats: DashboardStats) => stats.totalForklifts,
    icon: Truck,
    color: "bg-blue-600",
  },
  {
    title: "Operacionais",
    value: (stats: DashboardStats) => stats.operationalForklifts,
    icon: Check,
    color: "bg-green-600",
  },
  {
    title: "Manutenção",
    value: (stats: DashboardStats) => stats.maintenanceForklifts,
    icon: Triangle,
    color: "bg-orange-600",
  },
  {
    title: "Operadores",
    value: (stats: DashboardStats) => stats.totalOperators,
    icon: Users,
    color: "bg-violet-600",
  },
];

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  stats = initialStats
}) => {
  return (
    <section className="w-full max-w-screen-xl mx-auto px-2 md:px-0 mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {TOP_CARDS.map(card => (
          <div
            key={card.title}
            className={`flex justify-between items-center rounded-xl shadow-md p-5 md:p-6 ${card.color}`}
          >
            <div>
              <div className="text-white text-base font-normal mb-0.5">{card.title}</div>
              <div className="text-white text-3xl font-bold leading-snug">{card.value(stats)}</div>
            </div>
            <div>
              <card.icon className="w-10 h-10 text-white opacity-95" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DashboardOverview;

