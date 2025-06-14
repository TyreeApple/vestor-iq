
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
      "fixed left-0 top-0 h-full bg-white dark:bg-card border-r border-slate-200 dark:border-border shadow-xl z-50 flex flex-col transition-all duration-300",
      sidebarCollapsed ? "w-20" : "w-64"
    )}>
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-border bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-slate-800 dark:to-slate-900">
        {!sidebarCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 dark:bg-white/10 rounded-lg">
              <Gauge className="w-6 h-6 text-white" />
            </div>
            <div className="text-white">
              <h1 className="font-bold text-lg">FleetPro</h1>
              <p className="text-xs text-blue-100 dark:text-slate-300">Gestão de Frotas</p>
            </div>
          </div>
        )}
        
        {sidebarCollapsed && (
          <div className="flex items-center justify-center w-full">
            <div className="p-2 bg-white/20 dark:bg-white/10 rounded-lg">
              <Gauge className="w-6 h-6 text-white" />
            </div>
          </div>
        )}
        
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={cn(
            "p-2 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-colors text-white",
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
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center rounded-lg transition-all duration-200 group relative",
              sidebarCollapsed ? "justify-center p-3 mx-auto w-14 h-14" : "space-x-3 px-3 py-3",
              isActive
                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
            )}
            title={sidebarCollapsed ? item.label : undefined}
          >
            <div className="flex items-center justify-center flex-shrink-0 relative">
              <item.icon className="w-5 h-5" />
              {sidebarCollapsed && item.badge && (
                <span className="absolute -top-2 -right-2 bg-red-500 dark:bg-red-600 text-white text-xs min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 font-medium shadow-sm border-2 border-white dark:border-slate-800">
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </div>
            
            {!sidebarCollapsed && (
              <>
                <span className="font-medium truncate flex-1">{item.label}</span>
                {item.badge && (
                  <span className="bg-red-500 dark:bg-red-600 text-white text-xs px-2.5 py-1 rounded-full flex-shrink-0 min-w-[24px] h-6 flex items-center justify-center font-medium shadow-sm">
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
