
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useRealTimeSync } from '@/hooks/useRealTimeSync';

const MainLayout: React.FC = () => {
  // Ativa sincronização em tempo real para toda a aplicação
  useRealTimeSync();

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-background transition-colors duration-300">
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto bg-slate-50 dark:bg-background">
          <div className="flex-1 flex flex-col">
            {/* Adiciona container global responsivo com margens */}
            <div className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4 py-4">
              <Outlet />
            </div>
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

