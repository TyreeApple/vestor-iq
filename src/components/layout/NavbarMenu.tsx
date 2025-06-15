
import React from "react";
import { NavLink } from "react-router-dom";
import {
  BarChart3, Users, Activity, Wrench, Fuel, FileText, Gauge
} from "lucide-react";
import { MdForklift } from "react-icons/md";
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

  const operacoesAtivas = operacoes.filter(
    op => op.status === StatusOperacao.EM_ANDAMENTO
  ).length;
  const manutencoesPendentes = ordemServicos.filter(os =>
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
      badge: operacoesAtivas > 0 ? operacoesAtivas : undefined
    },
    {
      id: 'manutencao',
      label: 'Manutenção',
      icon: Wrench,
      path: '/manutencao',
      badge: manutencoesPendentes > 0 ? manutencoesPendentes : undefined
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

  return (
    <>
      {/* Desktop Navigation 
        - Ajuste: Desktop nav só aparece em telas xl+ (>=1280px)
        - Em menor largura, menu móvel é exibido.
      */}
      <nav className="hidden xl:flex items-center space-x-1">
        {menuItems.map(item => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              cn(
                // Padding menor para caber mais itens
                "flex items-center space-x-2 px-2 py-1 rounded-lg transition-all duration-200 text-sm font-medium relative",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )
            }
          >
            <item.icon className="w-4 h-4" />
            <span className="hidden 2xl:inline">{item.label}</span>
            {/* Em xl mostra só ícones; a partir de 2xl (1536px) mostra texto também */}
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
          className="xl:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={cn(
          "xl:hidden fixed top-16 left-0 right-0 bg-card border-b border-border shadow-lg z-40 transition-all duration-300",
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        {/* Mobile Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map(item => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 relative",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {typeof item.badge === "number" && item.badge > 0 && (
                <span className="bg-error text-white text-xs px-2 py-1 rounded-full min-w-[20px] h-[20px] flex items-center justify-center font-semibold ml-auto">
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
