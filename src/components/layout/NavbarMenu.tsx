
import React from "react";
import { NavLink } from "react-router-dom";
import {
  BarChart3, Users, Activity, Wrench, TrendingUp, FileText, Settings
} from "lucide-react";
import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusOperacao, StatusManutencao } from "@/types";
import { useAppStore } from "@/stores/useAppStore";

type MobileMenuProps = {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
};

const NavbarMenu: React.FC<MobileMenuProps> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) => {
  const operacoes = useAppStore((state) => state.operacoes);
  const ordemServicos = useAppStore((state) => state.ordemServicos);

  const activePositions = operacoes.filter(
    op => op.status === StatusOperacao.EM_ANDAMENTO
  ).length;
  const systemIssues = ordemServicos.filter(os =>
    [StatusManutencao.ABERTA, StatusManutencao.EM_ANDAMENTO].includes(os.status)
  ).length;

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      path: '/'
    },
    {
      id: 'trading-bots',
      label: 'Trading Bots',
      icon: Bot,
      path: '/trading-bots'
    },
    {
      id: 'traders',
      label: 'Traders',
      icon: Users,
      path: '/traders'
    },
    {
      id: 'positions',
      label: 'Positions',
      icon: Activity,
      path: '/positions',
      badge: activePositions > 0 ? activePositions : undefined
    },
    {
      id: 'system-health',
      label: 'System Health',
      icon: Wrench,
      path: '/system-health',
      badge: systemIssues > 0 ? systemIssues : undefined
    },
    {
      id: 'market-data',
      label: 'Market Data',
      icon: TrendingUp,
      path: '/market-data'
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      path: '/reports'
    }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
        {menuItems.map(item => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center space-x-2 px-2 xl:px-3 py-2 rounded-lg transition-all duration-200 text-xs xl:text-sm font-medium relative whitespace-nowrap",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )
            }
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            <span className="hidden xl:block">{item.label}</span>
            {typeof item.badge === "number" && item.badge > 0 && (
              <span className="bg-error text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-semibold">
                {item.badge > 99 ? '99+' : item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed top-14 sm:top-16 left-0 right-0 bg-card/95 backdrop-blur-md border-b border-border shadow-lg z-40 transition-all duration-300 max-h-[80vh] overflow-y-auto",
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        {/* Mobile Navigation */}
        <nav className="p-3 sm:p-4 space-y-1">
          {menuItems.map(item => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 relative text-sm",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium flex-grow">{item.label}</span>
              {typeof item.badge === "number" && item.badge > 0 && (
                <span className="bg-error text-white text-xs px-2 py-1 rounded-full min-w-[20px] h-[20px] flex items-center justify-center font-semibold">
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default NavbarMenu;
