
import React, { useEffect } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { useDataSync } from '@/hooks/useDataSync';
import MetricsGrid from '@/components/dashboard/MetricsGrid';
import FleetBarChart from '@/components/dashboard/FleetBarChart';
import QuickActionsIntegrated from '@/components/dashboard/QuickActionsIntegrated';

const Dashboard: React.FC = () => {
  const { recalculateMetrics, generateAlerts } = useAppStore();
  
  // Usa o hook de sincronização de dados
  useDataSync();

  useEffect(() => {
    // Inicializa as métricas e alertas
    recalculateMetrics();
    generateAlerts();
  }, [recalculateMetrics, generateAlerts]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Visão geral da sua frota de empilhadeiras
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <MetricsGrid />

      {/* Charts and Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart takes 2/3 of the space */}
        <div className="lg:col-span-2">
          <FleetBarChart />
        </div>
        
        {/* Quick Actions takes 1/3 of the space */}
        <div className="lg:col-span-1">
          <QuickActionsIntegrated />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
