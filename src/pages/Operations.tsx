import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, Plus, Search, Truck, User, Filter, MapPin, AlertCircle, Play, CheckCircle2, Fuel, Timer, Gauge } from 'lucide-react';
import { Operacao, StatusOperacao, TipoOperacao, PrioridadeOperacao } from '@/types';
import { useToast } from '@/hooks/use-toast';
import OperationDialog from '@/components/operations/OperationDialog';
import OperationDetails from '@/components/operations/OperationDetails';
import AdvancedFilters from '@/components/common/AdvancedFilters';
import { useFilters } from '@/hooks/use-filters';
import PageHeader from '@/components/layout/PageHeader';

// Mock data for operations - using proper Portuguese interface
const initialOperations: Operacao[] = [
  {
    id: 'OP001',
    empilhadeiraId: 'G001',
    empilhadeira: {
      id: 'G001',
      modelo: 'Toyota 8FGU25',
      marca: 'Toyota',
      tipo: 'Gás' as any,
      status: 'Operacional' as any,
      capacidade: 2500,
      anoFabricacao: 2022,
      dataAquisicao: '10/05/2022',
      numeroSerie: 'TOY001',
      horimetro: 12583,
      ultimaManutencao: '15/09/2023',
      proximaManutencao: '15/12/2023',
      localizacaoAtual: 'Setor A',
      setor: 'Armazém',
      custoHora: 45.50,
      eficiencia: 87.5,
      disponibilidade: 92.3,
      qrCode: 'QR001'
    },
    operadorId: 'OP001',
    operador: {
      id: 'OP001',
      nome: 'Carlos Silva',
      cpf: '123.456.789-00',
      email: 'carlos@example.com',
      telefone: '(11) 99999-9999',
      funcao: 'Operador' as any,
      dataAdmissao: '01/01/2020',
      turno: 'Matutino',
      setor: 'Armazém',
      certificacoes: [],
      avaliacoes: [],
      horasTrabalhadas: 2000,
      produtividade: 85,
      status: 'Ativo'
    },
    tipo: TipoOperacao.MOVIMENTACAO,
    status: StatusOperacao.EM_ANDAMENTO,
    prioridade: PrioridadeOperacao.NORMAL,
    setor: 'Armazém A',
    localizacao: 'Setor A',
    dataInicio: '2023-11-20T08:00:00',
    duracaoEstimada: 480,
    consumoGas: 25.5
  },
  {
    id: 'OP002',
    empilhadeiraId: 'E002',
    empilhadeira: {
      id: 'E002',
      modelo: 'Hyster E50XN',
      marca: 'Hyster',
      tipo: 'Elétrica' as any,
      status: 'Operacional' as any,
      capacidade: 2250,
      anoFabricacao: 2021,
      dataAquisicao: '22/11/2021',
      numeroSerie: 'HYS002',
      horimetro: 8452,
      ultimaManutencao: '30/10/2023',
      proximaManutencao: '30/01/2024',
      localizacaoAtual: 'Setor B',
      setor: 'Produção',
      custoHora: 38.75,
      eficiencia: 89.2,
      disponibilidade: 94.1,
      qrCode: 'QR002'
    },
    operadorId: 'OP002',
    operador: {
      id: 'OP002',
      nome: 'Maria Oliveira',
      cpf: '987.654.321-00',
      email: 'maria@example.com',
      telefone: '(11) 88888-8888',
      funcao: 'Operador' as any,
      dataAdmissao: '15/02/2021',
      turno: 'Vespertino',
      setor: 'Produção',
      certificacoes: [],
      avaliacoes: [],
      horasTrabalhadas: 1900,
      produtividade: 88,
      status: 'Ativo'
    },
    tipo: TipoOperacao.CARGA,
    status: StatusOperacao.CONCLUIDA,
    prioridade: PrioridadeOperacao.ALTA,
    setor: 'Expedição',
    localizacao: 'Expedição',
    dataInicio: '2023-11-20T14:00:00',
    dataFim: '2023-11-20T18:00:00',
    duracaoEstimada: 240,
    duracaoReal: 240
  }
];

// Mock data for available operators and forklifts
const availableOperators = [
  { id: 'OP001', name: 'Carlos Silva' },
  { id: 'OP002', name: 'Maria Oliveira' },
  { id: 'OP003', name: 'João Pereira' },
  { id: 'OP004', name: 'Ana Costa' },
  { id: 'OP005', name: 'Pedro Santos' }
];

const availableForklifts = [
  { id: 'G001', model: 'Toyota 8FGU25' },
  { id: 'G004', model: 'Yale GLP050' },
  { id: 'E002', model: 'Hyster E50XN' },
  { id: 'G006', model: 'Caterpillar DP40' }
];

const OperationsPage = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [operations, setOperations] = useState<Operacao[]>(initialOperations);
  
  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState<Operacao | null>(null);
  
  // Use filters hook with corrected search fields
  const {
    search,
    setSearch,
    filters,
    setFilters,
    filteredData: filteredOperations,
    clearFilters
  } = useFilters({
    data: operations,
    searchFields: ['id', 'setor']
  });

  // Filter configuration for advanced filters
  const filterOptions = [
    {
      key: 'status',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: StatusOperacao.EM_ANDAMENTO, label: 'Em Andamento' },
        { value: StatusOperacao.CONCLUIDA, label: 'Concluídas' }
      ]
    },
    {
      key: 'setor',
      label: 'Setor',
      type: 'select' as const,
      options: [
        { value: 'Armazém A', label: 'Armazém A' },
        { value: 'Armazém B', label: 'Armazém B' },
        { value: 'Expedição', label: 'Expedição' },
        { value: 'Recebimento', label: 'Recebimento' },
        { value: 'Produção', label: 'Produção' }
      ]
    }
  ];

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate operation duration
  const calculateDuration = (operation: Operacao) => {
    const startTime = new Date(operation.dataInicio);
    const endTime = operation.dataFim ? new Date(operation.dataFim) : new Date();
    const diff = endTime.getTime() - startTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m${!operation.dataFim ? ' (em andamento)' : ''}`;
  };

  // Handle save operation
  const handleSaveOperation = (operationData: Operacao) => {
    const isNewOperation = !operations.some(op => op.id === operationData.id);
    
    if (isNewOperation) {
      // Add new operation
      setOperations(prev => [operationData, ...prev]);
      toast({
        title: "Operação criada",
        description: "A operação foi criada com sucesso."
      });
    } else {
      // Update existing operation
      setOperations(prev => 
        prev.map(op => op.id === operationData.id ? operationData : op)
      );
      toast({
        title: "Operação atualizada",
        description: "A operação foi atualizada com sucesso."
      });
    }
  };

  // Open details dialog
  const handleViewDetails = (operation: Operacao) => {
    setSelectedOperation(operation);
    setDetailsDialogOpen(true);
  };

  // Open edit dialog from details
  const handleEditFromDetails = () => {
    setDetailsDialogOpen(false);
    setEditDialogOpen(true);
  };

  // Delete operation
  const handleDeleteOperation = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta operação?")) {
      setOperations(prev => prev.filter(op => op.id !== id));
      toast({
        title: "Operação excluída",
        description: "A operação foi excluída com sucesso."
      });
    }
  };

  // Get statistics
  const stats = {
    total: operations.length,
    active: operations.filter(op => op.status === StatusOperacao.EM_ANDAMENTO).length,
    completed: operations.filter(op => op.status === StatusOperacao.CONCLUIDA).length,
    totalGasConsumption: operations
      .filter(op => op.consumoGas)
      .reduce((sum, op) => sum + (op.consumoGas || 0), 0)
  };

  // Get priority color and icon
  const getPriorityInfo = (prioridade: PrioridadeOperacao) => {
    switch (prioridade) {
      case PrioridadeOperacao.ALTA:
        return { color: 'text-red-400', bgColor: 'bg-red-500/20', borderColor: 'border-red-500/30', icon: AlertCircle };
      case PrioridadeOperacao.NORMAL:
        return { color: 'text-blue-400', bgColor: 'bg-blue-500/20', borderColor: 'border-blue-500/30', icon: CheckCircle2 };
      case PrioridadeOperacao.BAIXA:
        return { color: 'text-green-400', bgColor: 'bg-green-500/20', borderColor: 'border-green-500/30', icon: CheckCircle2 };
      default:
        return { color: 'text-gray-400', bgColor: 'bg-gray-500/20', borderColor: 'border-gray-500/30', icon: CheckCircle2 };
    }
  };

  // Get operation type info
  const getOperationTypeInfo = (tipo: TipoOperacao) => {
    switch (tipo) {
      case TipoOperacao.MOVIMENTACAO:
        return { label: 'Movimentação', color: 'text-blue-400' };
      case TipoOperacao.CARGA:
        return { label: 'Carga', color: 'text-green-400' };
      case TipoOperacao.DESCARGA:
        return { label: 'Descarga', color: 'text-orange-400' };
      case TipoOperacao.ESTOQUE:
        return { label: 'Estoque', color: 'text-purple-400' };
      case TipoOperacao.PICKING:
        return { label: 'Picking', color: 'text-yellow-400' };
      default:
        return { label: 'Outro', color: 'text-gray-400' };
    }
  };

  // Calculate progress percentage for active operations
  const calculateProgress = (operation: Operacao) => {
    if (operation.status !== StatusOperacao.EM_ANDAMENTO) return 100;
    
    const startTime = new Date(operation.dataInicio);
    const now = new Date();
    const elapsed = now.getTime() - startTime.getTime();
    const estimatedDuration = (operation.duracaoEstimada || 480) * 60 * 1000; // Convert minutes to milliseconds
    
    return Math.min((elapsed / estimatedDuration) * 100, 95);
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <PageHeader
        title="Operações"
        description="Controle de Operações"
      >
        <Button 
          className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          onClick={() => {
            setSelectedOperation(null);
            setAddDialogOpen(true);
          }}
        >
          <Plus className="w-4 h-4" />
          Nova Operação
        </Button>
      </PageHeader>

      {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="group relative overflow-hidden bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <h3 className="text-sm font-medium text-slate-400 mb-2">Total de Operações</h3>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
          </div>
        </div>
        
        <div className="group relative overflow-hidden bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <h3 className="text-sm font-medium text-slate-400 mb-2">Em Andamento</h3>
            <p className="text-3xl font-bold text-green-400">{stats.active}</p>
          </div>
        </div>
        
        <div className="group relative overflow-hidden bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <h3 className="text-sm font-medium text-slate-400 mb-2">Concluídas</h3>
            <p className="text-3xl font-bold text-blue-400">{stats.completed}</p>
          </div>
        </div>
        
        <div className="group relative overflow-hidden bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <h3 className="text-sm font-medium text-slate-400 mb-2">Consumo Total (L)</h3>
            <p className="text-3xl font-bold text-orange-400">{stats.totalGasConsumption.toFixed(1)}</p>
          </div>
        </div>
      </div>

      {/* Enhanced Search and Filter Section */}
      <div className="w-full bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 mb-8 shadow-xl">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium text-slate-200">Buscar Operação</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input 
                type="text" 
                placeholder="Buscar por ID ou setor..." 
                className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:ring-blue-500 focus:border-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <AdvancedFilters
              filters={filterOptions}
              values={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
              triggerProps={{
                variant: "outline",
                className: "border-slate-600 text-slate-200 hover:bg-slate-700/50 hover:text-white"
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Enhanced Active Operations */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-white">Operações em Andamento</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOperations
            .filter(op => op.status === StatusOperacao.EM_ANDAMENTO)
            .map((operation) => {
              const priorityInfo = getPriorityInfo(operation.prioridade);
              const typeInfo = getOperationTypeInfo(operation.tipo);
              const progress = calculateProgress(operation);
              
              return (
                <div key={operation.id} className="group relative overflow-hidden bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Header with Status and Priority */}
                  <div className="relative p-6 pb-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-lg">{operation.operador?.nome}</h3>
                          <p className="text-sm text-slate-400">ID: {operation.id}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                          <Play className="w-3 h-3 mr-1" />
                          Em Andamento
                        </span>
                        
                        <span className={cn(
                          "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium",
                          priorityInfo.bgColor, priorityInfo.color, priorityInfo.borderColor, "border"
                        )}>
                          <priorityInfo.icon className="w-3 h-3 mr-1" />
                          {operation.prioridade}
                        </span>
                      </div>
                    </div>
                    
                    {/* Operation Type */}
                    <div className="mb-4">
                      <span className={cn("text-sm font-medium", typeInfo.color)}>
                        {typeInfo.label}
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-slate-400">Progresso Estimado</span>
                        <span className="text-xs text-slate-300">{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full bg-slate-700/50 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* Details Grid */}
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center gap-2 p-2 bg-slate-800/30 rounded-lg">
                        <Truck className="w-4 h-4 text-slate-400" />
                        <div className="flex-1">
                          <span className="text-sm text-slate-300">{operation.empilhadeira?.modelo}</span>
                          <p className="text-xs text-slate-500">{operation.empilhadeiraId}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 p-2 bg-slate-800/30 rounded-lg">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <div className="flex-1">
                          <span className="text-sm text-slate-300">{operation.setor}</span>
                          <p className="text-xs text-slate-500">{operation.localizacao}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2 p-2 bg-slate-800/30 rounded-lg">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <div>
                            <span className="text-xs text-slate-300">{formatDate(operation.dataInicio)}</span>
                            <p className="text-xs text-slate-500">{formatTime(operation.dataInicio)}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 p-2 bg-slate-800/30 rounded-lg">
                          <Timer className="w-4 h-4 text-slate-400" />
                          <div>
                            <span className="text-xs text-slate-300">{calculateDuration(operation)}</span>
                            <p className="text-xs text-slate-500">Duração</p>
                          </div>
                        </div>
                      </div>
                      
                      {operation.consumoGas && (
                        <div className="flex items-center gap-2 p-2 bg-slate-800/30 rounded-lg">
                          <Fuel className="w-4 h-4 text-slate-400" />
                          <div className="flex-1">
                            <span className="text-sm text-slate-300">{operation.consumoGas}L</span>
                            <p className="text-xs text-slate-500">Consumo de combustível</p>
                          </div>
                          <Gauge className="w-4 h-4 text-orange-400" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Actions Footer */}
                  <div className="border-t border-slate-700/50 px-6 py-4 bg-slate-800/30 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-slate-400">Ativo</span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-slate-300 hover:text-white hover:bg-slate-700/50"
                        onClick={() => handleViewDetails(operation)}
                      >
                        Detalhes
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                        onClick={() => {
                          setSelectedOperation(operation);
                          setEditDialogOpen(true);
                        }}
                      >
                        Editar
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          
          {filteredOperations.filter(op => op.status === StatusOperacao.EM_ANDAMENTO).length === 0 && (
            <div className="col-span-full p-12 text-center bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm border border-slate-700/30 rounded-xl">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center">
                <Clock className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-400 text-lg">Nenhuma operação em andamento</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Enhanced Completed Operations Table */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-white">Operações Concluídas</h2>
        <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/80">
                <tr>
                  <th className="p-4 text-left font-semibold text-slate-200">ID</th>
                  <th className="p-4 text-left font-semibold text-slate-200">Tipo</th>
                  <th className="p-4 text-left font-semibold text-slate-200">Operador</th>
                  <th className="p-4 text-left font-semibold text-slate-200">Empilhadeira</th>
                  <th className="p-4 text-left font-semibold text-slate-200">Setor</th>
                  <th className="p-4 text-left font-semibold text-slate-200">Data</th>
                  <th className="p-4 text-left font-semibold text-slate-200">Duração</th>
                  <th className="p-4 text-left font-semibold text-slate-200">Prioridade</th>
                  <th className="p-4 text-left font-semibold text-slate-200">Consumo (L)</th>
                  <th className="p-4 text-left font-semibold text-slate-200">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredOperations
                  .filter(op => op.status === StatusOperacao.CONCLUIDA)
                  .map((operation) => {
                    const priorityInfo = getPriorityInfo(operation.prioridade);
                    const typeInfo = getOperationTypeInfo(operation.tipo);
                    
                    return (
                      <tr key={operation.id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                            <span className="text-white font-medium">{operation.id}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={cn("text-sm font-medium", typeInfo.color)}>
                            {typeInfo.label}
                          </span>
                        </td>
                        <td className="p-4 text-slate-300">{operation.operador?.nome}</td>
                        <td className="p-4">
                          <div className="text-slate-300">{operation.empilhadeira?.modelo}</div>
                          <div className="text-xs text-slate-500">{operation.empilhadeiraId}</div>
                        </td>
                        <td className="p-4 text-slate-300">{operation.setor}</td>
                        <td className="p-4">
                          <div className="text-slate-300">{formatDate(operation.dataInicio)}</div>
                          <div className="text-xs text-slate-500">{formatTime(operation.dataInicio)} - {operation.dataFim ? formatTime(operation.dataFim) : 'N/A'}</div>
                        </td>
                        <td className="p-4 text-slate-300">{calculateDuration(operation)}</td>
                        <td className="p-4">
                          <span className={cn(
                            "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium",
                            priorityInfo.bgColor, priorityInfo.color, priorityInfo.borderColor, "border"
                          )}>
                            <priorityInfo.icon className="w-3 h-3 mr-1" />
                            {operation.prioridade}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Fuel className="w-4 h-4 text-orange-400" />
                            <span className="text-slate-300">{(operation.consumoGas || 0).toFixed(1)}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-slate-400 hover:text-white hover:bg-slate-700/50"
                              onClick={() => handleViewDetails(operation)}
                            >
                              Detalhes
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                              onClick={() => handleDeleteOperation(operation.id)}
                            >
                              Excluir
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          
          {filteredOperations.filter(op => op.status === StatusOperacao.CONCLUIDA).length === 0 && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-400 text-lg">Nenhuma operação concluída</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Operation Dialog */}
      <OperationDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSave={handleSaveOperation}
        availableOperators={availableOperators}
        availableForklifts={availableForklifts}
      />
      
      {/* Edit Operation Dialog */}
      <OperationDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        operation={selectedOperation || undefined}
        onSave={handleSaveOperation}
        availableOperators={availableOperators}
        availableForklifts={availableForklifts}
      />
      
      {/* Operation Details Dialog */}
      <OperationDetails
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        operation={selectedOperation}
        onEdit={handleEditFromDetails}
      />
    </div>
  );
};

export default OperationsPage;
