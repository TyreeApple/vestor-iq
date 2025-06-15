
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-background transition-colors duration-300">
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto bg-slate-50 dark:bg-background">
          <div className="min-h-full flex flex-col">
            <div className="flex-1 p-6">
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
