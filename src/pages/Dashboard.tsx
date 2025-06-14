
import React from 'react';
import { motion } from 'framer-motion';
import MetricsGrid from '@/components/dashboard/MetricsGrid';
import { AlertTriangle, TrendingUp, Activity, Clock } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Dashboard: React.FC = () => {
  const { metricas, alertas } = useAppStore();

  const alertasRecentes = [
    {
      id: '1',
      tipo: 'Manutenção',
      titulo: 'Manutenção Vencida',
      descricao: 'Empilhadeira EMP-001 com manutenção preventiva vencida há 3 dias',
      nivel: 'Alto',
      tempo: '2h atrás'
    },
    {
      id: '2',
      tipo: 'Certificação',
      titulo: 'Certificação Expirando',
      descricao: 'NR-11 do operador João Silva vence em 7 dias',
      nivel: 'Médio',
      tempo: '4h atrás'
    },
    {
      id: '3',
      tipo: 'Operação',
      titulo: 'Operação Atrasada',
      descricao: 'Operação no Setor A está 25 minutos atrasada',
      nivel: 'Baixo',
      tempo: '1h atrás'
    }
  ];

  const operacoesRecentes = [
    {
      id: 'OP-2024-001',
      empilhadeira: 'EMP-001',
      operador: 'Carlos Silva',
      setor: 'Armazém A',
      inicio: '08:30',
      status: 'Em Andamento'
    },
    {
      id: 'OP-2024-002',
      empilhadeira: 'EMP-003',
      operador: 'Maria Santos',
      setor: 'Expedição',
      inicio: '09:15',
      status: 'Concluída'
    },
    {
      id: 'OP-2024-003',
      empilhadeira: 'EMP-007',
      operador: 'João Pereira',
      setor: 'Recebimento',
      inicio: '10:00',
      status: 'Em Andamento'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Dashboard de Controle
            </h1>
            <p className="text-slate-600 mt-1">
              Visão geral completa das operações da frota
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Relatório</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Nova Operação</span>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <MetricsGrid />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Alertas Críticos */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Alertas Críticos
                  </h2>
                  <p className="text-sm text-slate-500">
                    Itens que precisam de atenção imediata
                  </p>
                </div>
              </div>
              <Badge variant="destructive">
                {alertasRecentes.length}
              </Badge>
            </div>

            <div className="space-y-4">
              {alertasRecentes.map((alerta) => (
                <div
                  key={alerta.id}
                  className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <div className={`p-2 rounded-lg ${
                    alerta.nivel === 'Alto' ? 'bg-red-100 text-red-600' :
                    alerta.nivel === 'Médio' ? 'bg-orange-100 text-orange-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-slate-900">
                        {alerta.titulo}
                      </h3>
                      <span className="text-xs text-slate-500">
                        {alerta.tempo}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                      {alerta.descricao}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {alerta.tipo}
                      </Badge>
                      <Badge 
                        variant={alerta.nivel === 'Alto' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {alerta.nivel}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200">
              <Button variant="outline" className="w-full">
                Ver Todos os Alertas
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Operações Recentes */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Operações Recentes
                </h2>
                <p className="text-sm text-slate-500">
                  Últimas atividades da frota
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {operacoesRecentes.map((operacao) => (
                <div
                  key={operacao.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-slate-900 text-sm">
                        {operacao.id}
                      </h4>
                      <Badge 
                        variant={operacao.status === 'Em Andamento' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {operacao.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      {operacao.empilhadeira} • {operacao.operador}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-slate-500">
                        {operacao.setor}
                      </span>
                      <div className="flex items-center space-x-1 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        <span>{operacao.inicio}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200">
              <Button variant="outline" className="w-full">
                Ver Todas as Operações
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
