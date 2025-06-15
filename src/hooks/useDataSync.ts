
import { useEffect } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { useConnectivity } from './useConnectivity';

export const useDataSync = () => {
  const { recalculateMetrics, generateAlerts } = useAppStore();
  const { isOnline, isSyncing } = useConnectivity();

  useEffect(() => {
    // Atualiza métricas a cada 30 segundos
    const metricsInterval = setInterval(() => {
      if (isOnline && !isSyncing) {
        recalculateMetrics();
        generateAlerts();
      }
    }, 30000);

    return () => clearInterval(metricsInterval);
  }, [isOnline, isSyncing, recalculateMetrics, generateAlerts]);

  useEffect(() => {
    // Simula atualizações automáticas dos dados a cada 2 minutos
    const dataUpdateInterval = setInterval(() => {
      if (isOnline && !isSyncing) {
        // Simula pequenas mudanças nos dados
        const stores = useAppStore.getState();
        
        // Atualiza horímeto das empilhadeiras operacionais
        stores.empilhadeiras.forEach(emp => {
          if (emp.status === 'Operacional' && emp.operadorAtual) {
            const incremento = Math.floor(Math.random() * 5) + 1;
            stores.updateEmpilhadeira(emp.id, {
              horimetro: emp.horimetro + incremento
            });
          }
        });

        // Recalcula métricas após atualizações
        recalculateMetrics();
      }
    }, 120000); // 2 minutos

    return () => clearInterval(dataUpdateInterval);
  }, [isOnline, isSyncing, recalculateMetrics]);
};
