
import React from 'react';
import { Wifi, WifiOff, RefreshCw, AlertTriangle } from 'lucide-react';
import { useConnectivity } from '@/hooks/useConnectivity';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ConnectivityStatus: React.FC = () => {
  const { isOnline, isSyncing, lastSync, syncError, retrySyncData } = useConnectivity();

  if (isOnline && !isSyncing && !syncError) {
    return null; // Não mostra nada quando está tudo ok
  }

  return (
    <div className={cn(
      "fixed bottom-4 right-4 z-50 bg-card border rounded-lg shadow-lg p-3 transition-all duration-300",
      "max-w-sm animate-fade-in"
    )}>
      <div className="flex items-center space-x-3">
        {/* Status Icon */}
        <div className={cn(
          "p-2 rounded-full",
          isOnline ? "bg-blue-500/10" : "bg-red-500/10"
        )}>
          {isSyncing ? (
            <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
          ) : !isOnline ? (
            <WifiOff className="w-4 h-4 text-red-500" />
          ) : syncError ? (
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
          ) : (
            <Wifi className="w-4 h-4 text-green-500" />
          )}
        </div>

        {/* Status Message */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">
            {isSyncing ? 'Sincronizando...' :
             !isOnline ? 'Offline' :
             syncError ? 'Erro na sincronização' :
             'Sincronizado'}
          </p>
          {lastSync && !isSyncing && (
            <p className="text-xs text-muted-foreground">
              Última sync: {lastSync.toLocaleTimeString()}
            </p>
          )}
          {syncError && (
            <p className="text-xs text-red-500 truncate">
              {syncError}
            </p>
          )}
        </div>

        {/* Retry Button */}
        {syncError && isOnline && (
          <Button
            variant="ghost"
            size="sm"
            onClick={retrySyncData}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className="w-3 h-3" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ConnectivityStatus;
