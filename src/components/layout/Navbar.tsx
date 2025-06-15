
import React from 'react';
import { Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/common/ThemeToggle';

const Navbar: React.FC = () => {
  return (
    <header className="h-16 bg-card dark:bg-card border-b border-slate-200 dark:border-border flex items-center justify-between px-6 shadow-premium dark:shadow-premium-dark">
      {/* Left spacer */}
      <div className="min-w-0">
      </div>

      {/* Centered Search */}
      <div className="flex-1 flex justify-center max-w-2xl mx-auto">
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar empilhadeiras, operadores..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-card dark:bg-background text-foreground shadow-sm transition-all duration-200 hover:shadow-md"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* User menu */}
        <Button variant="ghost" size="icon" className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
