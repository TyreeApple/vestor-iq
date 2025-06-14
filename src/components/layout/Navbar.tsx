
import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ThemeToggle from '@/components/common/ThemeToggle';

const Navbar: React.FC = () => {
  return (
    <header className="h-16 bg-white dark:bg-card border-b border-slate-200 dark:border-border flex items-center justify-between px-6">
      {/* Left spacer */}
      <div className="min-w-0">
      </div>

      {/* Centered Search */}
      <div className="flex-1 flex justify-center max-w-2xl mx-auto">
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar empilhadeiras, operadores..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-1 -right-1 px-1 py-0 text-xs min-w-[18px] h-[18px] bg-red-500">
            3
          </Badge>
        </Button>

        {/* User menu */}
        <Button variant="ghost" size="icon">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
