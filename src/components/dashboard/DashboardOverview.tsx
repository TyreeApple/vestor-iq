
import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdEngineering, MdPeopleAlt, MdForklift } from "react-icons/md";
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
  pendingMaintenances: 4,
};

interface DashboardOverviewProps {
  stats?: DashboardStats;
}

const CARDS = [
  {
    title: "Total Frota",
    value: (stats: DashboardStats) => stats.totalForklifts,
    icon: MdForklift,
    cardBg: "bg-gradient-to-br from-[#b8caf8] to-[#66a9f7]",
    iconBg: "bg-white/50 border-2 border-blue-200",
    shadow: "shadow-[0_2px_24px_0_rgba(102,169,247,0.12)]",
    iconColor: "text-blue-600",
    ring: "ring-2 ring-blue-100/80",
  },
  {
    title: "Operacionais",
    value: (stats: DashboardStats) => stats.operationalForklifts,
    icon: AiOutlineCheckCircle,
    cardBg: "bg-gradient-to-br from-green-100 to-green-300",
    iconBg: "bg-white/50 border-2 border-green-100",
    shadow: "shadow-[0_2px_16px_0_rgba(34,197,94,0.14)]",
    iconColor: "text-green-600",
    ring: "ring-2 ring-green-100/80",
  },
  {
    title: "Manutenção",
    value: (stats: DashboardStats) => stats.maintenanceForklifts,
    icon: MdEngineering,
    cardBg: "bg-gradient-to-br from-orange-100 to-orange-300",
    iconBg: "bg-white/50 border-2 border-orange-100",
    shadow: "shadow-[0_2px_16px_0_rgba(253,186,116,0.13)]",
    iconColor: "text-orange-500",
    ring: "ring-2 ring-orange-100/70",
  },
  {
    title: "Operadores",
    value: (stats: DashboardStats) => stats.totalOperators,
    icon: MdPeopleAlt,
    cardBg: "bg-gradient-to-br from-slate-50 to-slate-200",
    iconBg: "bg-white/40 border-2 border-slate-100",
    shadow: "shadow-[0_2px_16px_0_rgba(100,116,139,0.10)]",
    iconColor: "text-slate-600",
    ring: "ring-2 ring-slate-100/70",
  },
];

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  stats = initialStats,
}) => {
  return (
    <section className="w-full max-w-screen-xl mx-auto px-2 md:px-0 mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {CARDS.map((card, idx) => (
          <div
            key={card.title}
            className={cn(
              "relative rounded-2xl p-5 md:p-6 flex flex-col min-h-[140px] items-center justify-between transition-shadow hover:shadow-xl duration-300",
              card.cardBg,
              card.shadow
            )}
            tabIndex={0}
          >
            {/* Overlay sutil para efeito glass */}
            <span className="absolute inset-0 bg-white/10 rounded-2xl pointer-events-none" />
            {/* Overlay SVG bolinhas, harmonioso */}
            <svg
              className="absolute right-3 top-3 w-12 h-12 opacity-15 pointer-events-none z-0"
              viewBox="0 0 64 64"
              fill="none"
            >
              <defs>
                <pattern
                  id={`dots-${card.title}`}
                  patternUnits="userSpaceOnUse"
                  width="8"
                  height="8"
                >
                  <circle cx="1" cy="1" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="64" height="64" fill={`url(#dots-${card.title})`} />
            </svg>
            {/* Ícone central destacado com aro duplo */}
            <div className="relative flex flex-col items-center">
              <span
                className={cn(
                  "relative flex items-center justify-center w-14 h-14 mb-3 rounded-full shadow-md border backdrop-blur-xl transition-all",
                  card.iconBg,
                  card.ring
                )}
                style={{
                  boxShadow: idx === 0
                    ? "0 0 0 8px rgba(102,169,247,0.06), 0 2px 24px 0 rgba(102,169,247,0.12)"
                    : undefined,
                  background: idx === 0
                    ? "rgba(200,220,255,0.30)"
                    : undefined,
                }}
              >
                {/* Aro circular extra para o exemplo da Frota */}
                {idx === 0 && (
                  <span className="absolute inset-0 rounded-full border-2 border-blue-200/50 animate-pulse opacity-60" />
                )}
                <card.icon
                  className={cn(
                    "z-10 w-8 h-8",
                    card.iconColor,
                    idx === 0
                      ? "drop-shadow-[0_2px_10px_rgba(102,169,247,0.25)]"
                      : "drop-shadow"
                  )}
                  style={{
                    filter:
                      idx === 0
                        ? "drop-shadow(0 2px 10px #66a9f779)"
                        : undefined,
                  }}
                />
              </span>
            </div>
            {/* Valor e título */}
            <span className="z-10 text-3xl font-black text-slate-900 mt-1" style={idx === 0 ? { color: "#222b3a" } : {}}>
              {card.value(stats)}
            </span>
            <span className="z-10 text-base font-semibold text-slate-700/90 mb-2" style={idx === 0 ? { color: "#222b3a" } : {}}>
              {card.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DashboardOverview;

