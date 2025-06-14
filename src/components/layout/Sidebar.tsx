
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
      "fixed left-0 top-0 h-full bg-white border-r border-slate-200 shadow-xl z-50 flex flex-col transition-all duration-300",
      sidebarCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-indigo-600">
        {!sidebarCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Gauge className="w-6 h-6 text-white" />
            </div>
            <div className="text-white">
              <h1 className="font-bold text-lg">FleetPro</h1>
              <p className="text-xs text-blue-100">Gestão de Frotas</p>
            </div>
          </div>
        )}
        
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-2 rounded-lg hover:bg-white/20 transition-colors text-white"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors group relative",
              isActive
                ? "bg-blue-50 text-blue-700 border border-blue-200"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && (
              <>
                <span className="font-medium truncate">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
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
