
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAppStore } from '@/stores/useAppStore';

const MainLayout: React.FC = () => {
  const { sidebarCollapsed } = useAppStore();

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-background transition-colors duration-300">
      <Sidebar />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <Navbar />
        <main className="flex-1 overflow-auto bg-slate-50 dark:bg-background">
          <div className="min-h-full flex flex-col">
            <div className="flex-1 p-6">
              <div className="w-full px-[15px]">
                <Outlet />
              </div>
            </div>
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
