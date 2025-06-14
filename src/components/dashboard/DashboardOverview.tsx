
import React from 'react';
import StatusCard from './StatusCard';
import { 
  Truck, Users, AlertTriangle, CheckCircle, 
  Clock, Fuel, Settings, Calendar
} from 'lucide-react';
import { DashboardStats } from '@/types';

// Mock data for initial rendering
const initialStats: DashboardStats = {
  totalForklifts: 15,
  operationalForklifts: 9,
  stoppedForklifts: 3,
  maintenanceForklifts: 3,
  totalOperators: 20,
  operatorsWithValidCertificates: 16,
  operatorsWithWarningCertificates: 3,
  operatorsWithExpiredCertificates: 1,
  activeOperations: 7,
  pendingMaintenances: 4
};

interface DashboardOverviewProps {
  stats?: DashboardStats;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ 
  stats = initialStats 
}) => {
  return (
    <section className="space-y-8 md:space-y-10 px-2 md:px-0 transition-colors duration-300">
      <div className="slide-enter animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary dark:text-primary">Status da Frota</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <StatusCard 
            title="Total de Empilhadeiras" 
            value={stats.totalForklifts} 
            icon={Truck} 
            status="info" 
          />
          <StatusCard 
            title="Em Operação" 
            value={stats.operationalForklifts} 
            icon={CheckCircle} 
            status="success"
            change={{ value: 12, trend: 'up' }}
          />
          <StatusCard 
            title="Em Manutenção" 
            value={stats.maintenanceForklifts} 
            icon={Settings} 
            status="warning" 
          />
          <StatusCard 
            title="Paradas" 
            value={stats.stoppedForklifts} 
            icon={Clock} 
            status="neutral" 
          />
        </div>
      </div>

      <div className="slide-enter animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary dark:text-primary">Status dos Operadores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <StatusCard 
            title="Total de Operadores" 
            value={stats.totalOperators} 
            icon={Users} 
            status="info" 
          />
          <StatusCard 
            title="ASO e NR Regulares" 
            value={stats.operatorsWithValidCertificates} 
            icon={CheckCircle} 
            status="success" 
          />
          <StatusCard 
            title="Próximo do Vencimento" 
            value={stats.operatorsWithWarningCertificates} 
            icon={AlertTriangle} 
            status="warning" 
          />
          <StatusCard 
            title="ASO/NR Vencidos" 
            value={stats.operatorsWithExpiredCertificates} 
            icon={AlertTriangle} 
            status="danger" 
          />
        </div>
      </div>

      <div className="slide-enter animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary dark:text-primary">Operação Atual</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <StatusCard 
            title="Operações Ativas" 
            value={stats.activeOperations} 
            icon={Truck} 
            status="success"
            change={{ value: 5, trend: 'up' }}
          />
          <StatusCard 
            title="Manutenções Pendentes" 
            value={stats.pendingMaintenances} 
            icon={Settings} 
            status="warning" 
          />
          <StatusCard 
            title="Abastecimentos Hoje" 
            value={3} 
            icon={Fuel} 
            status="info" 
          />
          <StatusCard 
            title="ASOs a Vencer (30d)" 
            value={4} 
            icon={Calendar} 
            status="warning" 
          />
        </div>
      </div>
    </section>
  );
};

export default DashboardOverview;
