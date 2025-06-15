
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, Users, Activity, Wrench, Fuel, FileText, ChevronLeft, ChevronRight, Gauge } from 'lucide-react';
import { MdForklift } from 'react-icons/md';
import { useAppStore } from '@/stores/useAppStore';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: BarChart3,
    path: '/'
  },
  {
    id: 'empilhadeiras',
    label: 'Empilhadeiras',
    icon: MdForklift,
    path: '/empilhadeiras'
  },
  {
    id: 'operadores',
    label: 'Operadores',
    icon: Users,
    path: '/operadores'
  },
  {
    id: 'operacoes',
    label: 'Operações',
    icon: Activity,
    path: '/operacoes',
    badge: 12
  },
  {
    id: 'manutencao',
    label: 'Manutenção',
    icon: Wrench,
    path: '/manutencao',
    badge: 4
  },
  {
    id: 'abastecimento',
    label: 'Abastecimento',
    icon: Fuel,
    path: '/abastecimento'
  },
  {
    id: 'relatorios',
    label: 'Relatórios',
    icon: FileText,
    path: '/relatorios'
  }
];

const Sidebar: React.FC = () => {
  const { sidebarCollapsed, setSidebarCollapsed } = useAppStore();

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-card dark:bg-card border-r border-slate-200 dark:border-border shadow-premium dark:shadow-premium-dark z-50 flex flex-col transition-all duration-300",
      sidebarCollapsed ? "w-20" : "w-64"
    )}>
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-border bg-gradient-primary">
        {!sidebarCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
              <Gauge className="w-6 h-6 text-white" />
            </div>
            <div className="text-white">
              <h1 className="font-bold text-lg tracking-tight">FleetPro</h1>
              <p className="text-xs text-white/80 font-medium">Gestão de Frotas</p>
            </div>
          </div>
        )}
        
        {sidebarCollapsed && (
          <div className="flex items-center justify-center w-full">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
              <Gauge className="w-6 h-6 text-white" />
            </div>
          </div>
        )}
        
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={cn(
            "p-2 rounded-xl hover:bg-white/20 backdrop-blur-sm transition-all duration-200 text-white border border-white/30 hover:border-white/50",
            sidebarCollapsed && "absolute top-4 right-2"
          )}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center rounded-xl transition-all duration-200 group relative modern-card",
              sidebarCollapsed ? "justify-center p-3 mx-auto w-12 h-12" : "space-x-3 px-4 py-3",
              isActive
                ? "bg-primary/10 dark:bg-primary/20 text-primary border-primary/30 shadow-premium"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 border-transparent"
            )}
            title={sidebarCollapsed ? item.label : undefined}
          >
            <div className="flex items-center justify-center flex-shrink-0 relative">
              <item.icon className="w-5 h-5" />
              {sidebarCollapsed && item.badge && (
                <span className="absolute -top-2 -right-2 bg-error text-white text-xs min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 font-semibold shadow-premium border-2 border-card">
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </div>
            
            {!sidebarCollapsed && (
              <>
                <span className="font-semibold truncate flex-1">{item.label}</span>
                {item.badge && (
                  <span className="bg-error text-white text-xs px-2.5 py-1 rounded-full flex-shrink-0 min-w-[24px] h-6 flex items-center justify-center font-semibold shadow-sm">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
