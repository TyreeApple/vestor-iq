
import { useState, useEffect } from 'react';

export interface ConnectivityStatus {
  isOnline: boolean;
  isSyncing: boolean;
  lastSync: Date | null;
  syncError: string | null;
}

export const useConnectivity = () => {
  const [status, setStatus] = useState<ConnectivityStatus>({
    isOnline: navigator.onLine,
    isSyncing: false,
    lastSync: null,
    syncError: null
  });

  useEffect(() => {
    const handleOnline = () => {
      setStatus(prev => ({ 
        ...prev, 
        isOnline: true, 
        syncError: null 
      }));
      // Simular sincronização automática quando volta online
      syncData();
    };

    const handleOffline = () => {
      setStatus(prev => ({ 
        ...prev, 
        isOnline: false,
        isSyncing: false
      }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const syncData = async () => {
    setStatus(prev => ({ ...prev, isSyncing: true, syncError: null }));
    
    try {
      // Simular delay de sincronização
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular erro ocasional (10% de chance)
      if (Math.random() < 0.1) {
        throw new Error('Falha na sincronização');
      }

      setStatus(prev => ({
        ...prev,
        isSyncing: false,
        lastSync: new Date(),
        syncError: null
      }));
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        isSyncing: false,
        syncError: error instanceof Error ? error.message : 'Erro desconhecido'
      }));
    }
  };

  const retrySyncData = () => {
    if (status.isOnline && !status.isSyncing) {
      syncData();
    }
  };

  return {
    ...status,
    syncData,
    retrySyncData
  };
};
