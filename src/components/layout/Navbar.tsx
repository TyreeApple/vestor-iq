
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, User, Menu, X, BarChart3, Users, Activity, Wrench, Fuel, FileText, Gauge } from 'lucide-react';
import { MdForklift } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/common/ThemeToggle';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/stores/useAppStore';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Obter dados do Zustand
  const operacoes = useAppStore((state) => state.operacoes);
  const ordemServicos = useAppStore((state) => state.ordemServicos);

  // Calcular quantidade dinâmica
  const operacoesAtivas = operacoes.filter(op => op.status === 'EM_ANDAMENTO').length;
  const manutencoesPendentes = ordemServicos.filter(os => ['ABERTA', 'EM_ANDAMENTO'].includes(os.status)).length;

  // Montar o menu com valores dinâmicos
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
      <header className="h-16 bg-card dark:bg-card border-b border-slate-200 dark:border-border flex items-center justify-between px-6 shadow-premium dark:shadow-premium-dark relative z-50">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Gauge className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg tracking-tight text-foreground">FleetPro</h1>
              <p className="text-xs text-muted-foreground font-medium">Gestão de Frotas</p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium relative",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
              {item.badge && (
                <span className="bg-error text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-semibold">
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Search - Hidden on mobile */}
        <div className="hidden md:flex flex-1 justify-center max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar empilhadeiras, operadores..."
              className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground text-sm transition-all duration-200"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* User menu */}
          <Button variant="ghost" size="icon" className="hover:bg-accent transition-colors">
            <User className="w-5 h-5" />
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden fixed top-16 left-0 right-0 bg-card border-b border-border shadow-lg z-40 transition-all duration-300",
        isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      )}>
        {/* Mobile Search */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar empilhadeiras, operadores..."
              className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground text-sm"
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 relative",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {item.badge && (
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

export default Navbar;
