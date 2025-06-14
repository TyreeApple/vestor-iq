
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Search, 
  User, 
  Settings, 
  LogOut,
  ChevronDown,
  Sun,
  Moon
} from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const { notificacoes } = useAppStore();
  const [searchFocused, setSearchFocused] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  const notificacoesNaoLidas = notificacoes.filter(n => !n.lida).length;

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm">
      {/* Título da Página */}
      <div className="flex items-center space-x-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">
            Dashboard de Controle
          </h1>
          <p className="text-sm text-slate-500">
            {new Date().toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Barra de Busca */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${
            searchFocused ? 'text-blue-500' : 'text-slate-400'
          }`} />
          <input
            type="text"
            placeholder="Buscar empilhadeiras, operadores, operações..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setDarkMode(!darkMode)}
          className="p-2"
        >
          {darkMode ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </Button>

        {/* Notificações */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative p-2">
              <Bell className="w-4 h-4" />
              {notificacoesNaoLidas > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
                >
                  {notificacoesNaoLidas}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notificações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notificacoes.length === 0 ? (
              <div className="p-4 text-center text-slate-500">
                Nenhuma notificação
              </div>
            ) : (
              notificacoes.slice(0, 5).map((notificacao) => (
                <DropdownMenuItem key={notificacao.id} className="flex flex-col items-start p-4">
                  <div className="font-medium">{notificacao.titulo}</div>
                  <div className="text-sm text-slate-500">{notificacao.mensagem}</div>
                  <div className="text-xs text-slate-400 mt-1">
                    {new Date(notificacao.dataCreacao).toLocaleString('pt-BR')}
                  </div>
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 p-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium">Administrador</div>
                <div className="text-xs text-slate-500">admin@fleetpro.com</div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
