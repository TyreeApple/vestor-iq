
import React from 'react';
import MetricsGrid from '@/components/dashboard/MetricsGrid';
import { useAppStore } from '@/stores/useAppStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { alertas } = useAppStore();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard de Controle</h1>
          <p className="text-slate-600 mt-1">
            Visão geral da operação em tempo real
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Sistema Online
          </Badge>
          <div className="flex items-center text-sm text-slate-500">
            <Clock className="w-4 h-4 mr-1" />
            Atualizado agora
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <MetricsGrid />

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Operations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Operações Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">Operação #{item}234</p>
                    <p className="text-sm text-slate-600">Empilhadeira EMP-{item}5 • Setor A</p>
                  </div>
                  <Badge variant="secondary">Em Andamento</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
              Alertas do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alertas.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  <p>Nenhum alerta crítico</p>
                </div>
              ) : (
                alertas.slice(0, 3).map((alerta) => (
                  <div key={alerta.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                    <div>
                      <p className="font-medium text-red-900">{alerta.titulo}</p>
                      <p className="text-sm text-red-700">{alerta.descricao}</p>
                    </div>
                    <Badge variant="destructive">{alerta.nivel}</Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
