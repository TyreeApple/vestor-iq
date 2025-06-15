
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useRealTimeSync } from '@/hooks/useRealTimeSync';
import FloatingMockDataButton from "@/components/FloatingMockDataButton";

const MainLayout: React.FC = () => {
  // Ativa sincronização em tempo real para toda a aplicação
  useRealTimeSync();

  return (
    <div className="relative min-h-screen flex flex-col bg-background transition-colors duration-300 overflow-x-hidden">
      <FloatingMockDataButton />
      <Navbar />
      <main className="flex-grow overflow-y-auto overflow-x-hidden bg-secondary w-full">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-4 flex flex-col min-h-full">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default MainLayout;
