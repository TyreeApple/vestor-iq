
import React from 'react';
import { Bell, Search, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import Badge from '@/components/common/Badge';

interface NavbarProps {
  title: string;
  subtitle?: string;
}

const Navbar: React.FC<NavbarProps> = ({ title, subtitle }) => {
  return (
    <header className="w-full py-4 px-4 md:px-8 flex items-center justify-between bg-background/80 backdrop-blur-xl border-b border-border sticky top-0 z-20 shadow-sm transition-all duration-200">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-primary leading-tight transition-colors">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="py-2 pl-10 pr-4 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:bg-card w-full max-w-xs transition-all duration-300 shadow-sm"
          />
        </div>
        
        {/* Notifications */}
        <div className="relative">
          <button className="p-2 rounded-lg bg-primary/90 hover:bg-primary transition-colors duration-200 text-primary-foreground shadow hover:scale-105 focus:scale-100 focus:outline-none focus:ring-2 focus:ring-primary">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-status-warning border-2 border-background animate-pulse"></span>
          </button>
        </div>
        
        {/* User Menu */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shadow">
            A
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-muted-foreground">Administrador</p>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
