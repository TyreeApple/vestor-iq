
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Truck, Users, ClipboardList, Fuel,
  Settings, FileText, LayoutDashboard, Menu, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSidebarGlobal } from './SidebarContext';

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  collapsed: boolean;
  onClick?: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  to, icon: Icon, label, isActive, collapsed, onClick
}) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group relative",
      isActive
        ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
        : "text-sidebar-foreground/90 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    )}
    onClick={onClick}
    tabIndex={0}
  >
    <span className="w-5 h-5 flex items-center justify-center">
      <Icon className="w-5 h-5" />
    </span>
    {!collapsed && <span className="whitespace-nowrap">{label}</span>}
    {collapsed &&
      <span className="absolute left-full top-1/2 -translate-y-1/2 ml-3 pointer-events-none z-50 bg-sidebar text-sidebar-foreground text-xs px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition">
        {label}
      </span>
    }
  </Link>
);

const Sidebar: React.FC = () => {
  const { state, toggle } = useSidebarGlobal();
  const location = useLocation();
  const isMobile = useIsMobile();
  const collapsed = !isMobile && state === 'collapsed';

  const links = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/forklifts", icon: Truck, label: "Empilhadeiras" },
    { to: "/operators", icon: Users, label: "Operadores" },
    { to: "/operations", icon: ClipboardList, label: "Operações" },
    { to: "/maintenance", icon: Settings, label: "Manutenção" },
    { to: "/gas-supply", icon: Fuel, label: "Abastecimento" },
    { to: "/reports", icon: FileText, label: "Relatórios" },
  ];

  // MOBILE DRAWER - Mantém comportamento original
  if (isMobile) {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary text-primary-foreground"
          aria-label="Abrir Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        {open && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setOpen(false)}
            />
            <aside
              className="fixed top-0 left-0 z-50 h-full w-64 bg-sidebar transition-transform duration-300 animate-slide-in-right"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-4 py-5">
                  <h1 className="text-xl font-bold text-sidebar-foreground">Forklift Manager</h1>
                  <button onClick={() => setOpen(false)} className="p-1 rounded-lg text-sidebar-foreground">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>
                <nav className="flex-1 px-3 py-4 space-y-1">
                  {links.map((link) => (
                    <SidebarLink
                      key={link.to}
                      to={link.to}
                      icon={link.icon}
                      label={link.label}
                      isActive={location.pathname === link.to}
                      collapsed={false}
                      onClick={() => setOpen(false)}
                    />
                  ))}
                </nav>
              </div>
            </aside>
          </>
        )}
      </>
    );
  }

  // DESKTOP EXPANDIDA/COLAPSADA
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-40 h-full bg-sidebar transition-all duration-300 flex flex-col border-r border-sidebar-border",
        collapsed ? "w-16" : "w-64"
      )}
      style={{ minWidth: collapsed ? 64 : 256 }}
    >
      <div className="flex items-center justify-between px-4 py-5">
        {!collapsed ?
          <h1 className="text-xl font-bold text-sidebar-foreground truncate">Forklift Manager</h1>
          : <span className="text-xl font-bold text-sidebar-foreground">F</span>
        }
        <button
          onClick={toggle}
          className={cn(
            "p-1 rounded-lg text-sidebar-foreground transition hover:bg-sidebar-accent relative",
            "ml-auto"
          )}
          aria-label="Alternar tamanho do menu"
        >
          {collapsed
            ? <ChevronRight className="w-5 h-5" />
            : <ChevronLeft className="w-5 h-5" />
          }
        </button>
      </div>
      <nav className={cn("flex-1 px-1 py-2 space-y-1")}>
        {links.map((link) => (
          <SidebarLink
            key={link.to}
            to={link.to}
            icon={link.icon}
            label={link.label}
            isActive={location.pathname === link.to}
            collapsed={collapsed}
          />
        ))}
      </nav>
      <div className={cn(
        "p-3 border-t border-sidebar-border transition-all",
        collapsed && "justify-center flex"
      )}>
        <div className="flex items-center gap-3">
          <div className={cn(
            "rounded-full bg-sidebar-accent flex items-center justify-center",
            collapsed ? "w-8 h-8" : "w-8 h-8"
          )}>
            <Users className="w-4 h-4 text-sidebar-accent-foreground" />
          </div>
          {!collapsed &&
            <div>
              <p className="text-sm font-medium text-sidebar-foreground">Administrador</p>
              <p className="text-xs text-sidebar-foreground/70">v1.0.0</p>
            </div>
          }
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
