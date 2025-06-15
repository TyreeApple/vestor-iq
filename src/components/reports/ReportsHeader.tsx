
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileBarChart, Download, Calendar as CalendarIcon } from 'lucide-react';

const ReportsHeader: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 rounded-3xl" />
      <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <FileBarChart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Relatórios do Sistema
                </h1>
                <p className="text-lg text-muted-foreground font-medium">
                  Análises inteligentes e insights da sua operação
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2 bg-white/50 backdrop-blur-sm border-white/20 hover:bg-white/70 transition-all duration-300 shadow-lg">
              <CalendarIcon className="w-4 h-4" />
              Agendar Relatório
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <Download className="w-4 h-4" />
              Exportar Selecionados
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsHeader;
