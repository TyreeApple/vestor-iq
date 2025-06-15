
import React, { useState } from 'react';
import { Bug, ChevronDown, ChevronUp } from 'lucide-react';
import { useConnectivity } from '@/hooks/useConnectivity';
import { useAppStore } from '@/stores/useAppStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const DebugPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isOnline, isSyncing, lastSync, syncError, retrySyncData } = useConnectivity();
  const { metricas, empilhadeiras, operadores, operacoes } = useAppStore();

  // Só mostra em desenvolvimento
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-card border rounded-lg shadow-lg max-w-sm">
      {/* Header */}
      <div 
        className="flex items-center justify-between p-3 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2">
          <Bug className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Debug Panel</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </div>

      {/* Content */}
      {isOpen && (
        <div className="border-t p-3 space-y-3">
          {/* Connectivity Status */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground mb-1">CONECTIVIDADE</h4>
            <div className="text-xs space-y-1">
              <div className="flex justify-between">
                <span>Status:</span>
                <span className={cn(
                  "font-medium",
                  isOnline ? "text-green-600" : "text-red-600"
                )}>
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Sincronizando:</span>
                <span className={cn(
                  "font-medium",
                  isSyncing ? "text-blue-600" : "text-gray-600"
                )}>
                  {isSyncing ? 'Sim' : 'Não'}
                </span>
              </div>
              {lastSync && (
                <div className="flex justify-between">
                  <span>Última Sync:</span>
                  <span className="text-xs">{lastSync.toLocaleTimeString()}</span>
                </div>
              )}
              {syncError && (
                <div className="text-red-500 text-xs">{syncError}</div>
              )}
            </div>
          </div>

          {/* Data Status */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground mb-1">DADOS</h4>
            <div className="text-xs space-y-1">
              <div className="flex justify-between">
                <span>Empilhadeiras:</span>
                <span className="font-medium">{empilhadeiras.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Operadores:</span>
                <span className="font-medium">{operadores.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Operações:</span>
                <span className="font-medium">{operacoes.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Operacionais:</span>
                <span className="font-medium text-green-600">{metricas.empilhadeirasOperacionais}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={retrySyncData}
              disabled={!isOnline || isSyncing}
              className="w-full text-xs h-7"
            >
              Forçar Sincronização
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebugPanel;
