
import React from "react";
import { AiOutlineCar, AiOutlineCheckCircle } from "react-icons/ai";
import { MdEngineering, MdPeopleAlt } from "react-icons/md";
import { DashboardStats } from "@/types";
import { cn } from "@/lib/utils";

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

const CARDS = [
  {
    title: "Total Frota",
    value: (stats: DashboardStats) => stats.totalForklifts,
    icon: AiOutlineCar,
    colorFrom: "from-blue-200",
    colorTo: "to-blue-500",
    iconBg: "bg-blue-100/70 border-blue-300/60",
    shadow: "shadow-[0_2px_16px_0_rgba(64,132,230,0.13)]",
    iconColor: "text-blue-700 group-hover:text-blue-900"
  },
  {
    title: "Operacionais",
    value: (stats: DashboardStats) => stats.operationalForklifts,
    icon: AiOutlineCheckCircle,
    colorFrom: "from-green-200",
    colorTo: "to-green-400",
    iconBg: "bg-green-100/70 border-green-300/60",
    shadow: "shadow-[0_2px_16px_0_rgba(54,180,99,0.12)]",
    iconColor: "text-green-700 group-hover:text-green-900"
  },
  {
    title: "Manutenção",
    value: (stats: DashboardStats) => stats.maintenanceForklifts,
    icon: MdEngineering,
    colorFrom: "from-orange-200",
    colorTo: "to-orange-400",
    iconBg: "bg-orange-50/70 border-orange-200/60",
    shadow: "shadow-[0_2px_16px_0_rgba(255,180,70,0.10)]",
    iconColor: "text-orange-700 group-hover:text-orange-900"
  },
  {
    title: "Operadores",
    value: (stats: DashboardStats) => stats.totalOperators,
    icon: MdPeopleAlt,
    colorFrom: "from-slate-100",
    colorTo: "to-slate-300",
    iconBg: "bg-slate-50/80 border-slate-200/60",
    shadow: "shadow-[0_2px_16px_0_rgba(100,125,148,0.12)]",
    iconColor: "text-slate-700 group-hover:text-slate-900"
  },
];

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  stats = initialStats
}) => {
  return (
    <section className="w-full max-w-screen-xl mx-auto px-2 md:px-0 mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {CARDS.map(card => (
          <div
            key={card.title}
            className={cn(
              "group relative rounded-2xl p-5 md:p-6 flex flex-col justify-between min-h-[140px] overflow-hidden",
              "bg-gradient-to-br transition-transform duration-300",
              card.colorFrom, card.colorTo, card.shadow,
              "hover:scale-105 hover:shadow-xl"
            )}
            tabIndex={0}
          >
            {/* Sutil overlay glass */}
            <span className="absolute inset-0 bg-white/30 dark:bg-white/10 opacity-70 rounded-2xl pointer-events-none mix-blend-lighten" />
            {/* SVG pattern de bolinhas */}
            <svg className="absolute right-2 top-2 w-20 h-20 opacity-15 pointer-events-none z-0" viewBox="0 0 64 64" fill="none">
              <defs>
                <pattern id={`dots-${card.title}`} patternUnits="userSpaceOnUse" width="8" height="8">
                  <circle cx="1" cy="1" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="64" height="64" fill={`url(#dots-${card.title})`} />
            </svg>
            {/* Ícone sofisticado */}
            <span
              className={cn(
                "relative z-10 flex items-center justify-center w-14 h-14 mb-3 rounded-full border shadow-md backdrop-blur-lg ring-2 ring-white/40 group-hover:ring-4 transition",
                card.iconBg
              )}
            >
              <card.icon className={cn("w-9 h-9 drop-shadow-xl transition-all duration-300", card.iconColor)} />
            </span>
            {/* Valor e título */}
            <span className="z-10 text-3xl font-bold text-slate-900 drop-shadow-sm">
              {card.value(stats)}
            </span>
            <span className="z-10 text-base font-medium text-slate-700/90">{card.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DashboardOverview;
