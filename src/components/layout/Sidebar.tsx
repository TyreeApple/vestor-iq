
import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Truck, 
  Users, 
  Activity, 
  Wrench, 
  Fuel, 
  FileText,
  ChevronLeft,
  ChevronRight,
  Gauge
} from 'lucide-react';
import { MdForklift } from 'react-icons/md';
import { useAppStore } from '@/stores/useAppStore';
import { cn } from '@/lib/utils';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  badge?: number;
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/' },
  { id: 'empilhadeiras', label: 'Empilhadeiras', icon: MdForklift, path: '/empilhadeiras' },
  { id: 'operadores', label: 'Operadores', icon: Users, path: '/operadores' },
  { id: 'operacoes', label: 'Operações', icon: Activity, path: '/operacoes', badge: 12 },
  { id: 'manutencao', label: 'Manutenção', icon: Wrench, path: '/manutencao', badge: 4 },
  { id: 'abastecimento', label: 'Abastecimento', icon: Fuel, path: '/abastecimento' },
  { id: 'relatorios', label: 'Relatórios', icon: FileText, path: '/relatorios' },
];

const Sidebar: React.FC = () => {
  const { sidebarCollapsed, setSidebarCollapsed } = useAppStore();

  const sidebarVariants = {
    expanded: { width: 256 },
    collapsed: { width: 64 }
  };

  return (
    <motion.div
      initial={false}
      animate={sidebarCollapsed ? 'collapsed' : 'expanded'}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-full bg-white border-r border-slate-200 shadow-xl z-50 flex flex-col"
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-indigo-600">
        <AnimatePresence mode="wait">
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-3"
            >
              <div className="p-2 bg-white/20 rounded-lg">
                <Gauge className="w-6 h-6 text-white" />
              </div>
              <div className="text-white">
                <h1 className="font-bold text-lg">FleetPro</h1>
                <p className="text-xs text-blue-100">Gestão de Frotas</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
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
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1 px-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon 
                    className={cn(
                      "flex-shrink-0 w-5 h-5 transition-colors",
                      isActive ? "text-blue-700" : "text-slate-400 group-hover:text-slate-600"
                    )} 
                  />
                  
                  <AnimatePresence mode="wait">
                    {!sidebarCollapsed && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="ml-3 flex items-center justify-between w-full"
                      >
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            {item.badge}
                          </span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200">
        <AnimatePresence mode="wait">
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-center"
            >
              <p className="text-xs text-slate-500">
                v2.1.0 - 2024
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Sidebar;
