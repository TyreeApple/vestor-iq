import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, Plus, Search, Truck, User, Filter, MapPin, AlertCircle, Play, CheckCircle2, Fuel, Timer, Gauge, Activity, TrendingUp } from 'lucide-react';
import { Operacao, StatusOperacao, TipoOperacao, PrioridadeOperacao } from '@/types';
import { useToast } from '@/hooks/use-toast';
import OperationDialog from '@/components/operations/OperationDialog';
import OperationDetails from '@/components/operations/OperationDetails';
import AdvancedFilters from '@/components/common/AdvancedFilters';
import { useFilters } from '@/hooks/use-filters';
import PageHeader from '@/components/layout/PageHeader';
import ModernKpiCard from '@/components/dashboard/ModernKpiCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    },
    {
      key: 'tipo',
      label: 'Tipo',
      type: 'select' as const,
      options: [
        { value: TipoOperacao.MOVIMENTACAO, label: 'Movimentação' },
        { value: TipoOperacao.CARGA, label: 'Carga' },
        { value: TipoOperacao.DESCARGA, label: 'Descarga' },
        { value: TipoOperacao.ESTOQUE, label: 'Estoque' },
        { value: TipoOperacao.PICKING, label: 'Picking' }
      ]
    },
    {
      key: 'prioridade',
      label: 'Prioridade',
      type: 'select' as const,
      options: [
        { value: PrioridadeOperacao.ALTA, label: 'Alta' },
        { value: PrioridadeOperacao.NORMAL, label: 'Normal' },
        { value: PrioridadeOperacao.BAIXA, label: 'Baixa' }
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
      setOperations(prev => [operationData, ...prev]);
      toast({
        title: "Operação criada",
        description: "A operação foi criada com sucesso."
      });
    } else {
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

  // Open edit dialog directly
  const handleEdit = (operation: Operacao) => {
    setSelectedOperation(operation);
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
    <div className="space-y-8">
      {/* Enhanced Header */}
      <PageHeader
        title="Operações"
        description="Controle e monitoramento de operações em tempo real"
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

      {/* Modern Statistics Cards using ModernKpiCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ModernKpiCard
          title="Total de Operações"
          value={stats.total}
          icon={Activity}
          colorFrom="from-slate-600"
          colorTo="to-slate-800"
        />
        
        <ModernKpiCard
          title="Em Andamento"
          value={stats.active}
          icon={Play}
          trend="up"
          trendValue={12}
          colorFrom="from-green-500"
          colorTo="to-emerald-600"
        />
        
        <ModernKpiCard
          title="Concluídas"
          value={stats.completed}
          icon={CheckCircle2}
          colorFrom="from-blue-500"
          colorTo="to-cyan-600"
        />
        
        <ModernKpiCard
          title="Consumo Total (L)"
          value={stats.totalGasConsumption}
          icon={Fuel}
          trend="down"
          trendValue={8}
          colorFrom="from-orange-500"
          colorTo="to-red-600"
        />
      </div>

      {/* Enhanced Search and Filter Section */}
      <Card className="glass-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Search className="w-5 h-5" />
            Busca e Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Buscar Operação</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  type="text" 
                  placeholder="Buscar por ID, operador ou setor..." 
                  className="pl-10 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
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
                  className: "border-border/50 text-foreground hover:bg-accent/50 hover:text-accent-foreground shadow-sm"
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Compact Active Operations */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            Operações em Andamento
          </h2>
          <span className="text-sm text-muted-foreground">
            {filteredOperations.filter(op => op.status === StatusOperacao.EM_ANDAMENTO).length} ativas
          </span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredOperations
            .filter(op => op.status === StatusOperacao.EM_ANDAMENTO)
            .map((operation) => {
              const priorityInfo = getPriorityInfo(operation.prioridade);
              const typeInfo = getOperationTypeInfo(operation.tipo);
              const progress = calculateProgress(operation);
              
              return (
                <Card key={operation.id} className="glass-card-hover group relative overflow-hidden">
                  {/* Priority indicator */}
                  <div className={cn("absolute top-0 left-0 w-1 h-full", priorityInfo.bgColor)} />
                  
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <div>
                          <h3 className="font-semibold text-foreground text-sm">{operation.operador?.nome}</h3>
                          <p className="text-xs text-muted-foreground">#{operation.id}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                          Em Andamento
                        </span>
                        <span className={cn(
                          "inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium border",
                          priorityInfo.bgColor, priorityInfo.color, priorityInfo.borderColor
                        )}>
                          {operation.prioridade}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0 space-y-3">
                    {/* Type and Progress */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className={cn("text-xs font-medium", typeInfo.color)}>
                          {typeInfo.label}
                        </span>
                        <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full bg-secondary/50 rounded-full h-1.5">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1 p-2 bg-accent/30 rounded">
                        <Truck className="w-3 h-3 text-muted-foreground" />
                        <span className="text-foreground truncate">{operation.empilhadeira?.modelo}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 p-2 bg-accent/30 rounded">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-foreground truncate">{operation.setor}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 p-2 bg-accent/30 rounded">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-foreground">{formatTime(operation.dataInicio)}</span>
                      </div>
                      
                      {operation.consumoGas && (
                        <div className="flex items-center gap-1 p-2 bg-accent/30 rounded">
                          <Fuel className="w-3 h-3 text-orange-400" />
                          <span className="text-foreground">{operation.consumoGas}L</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-2 border-t border-border/50">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-7 px-3 text-xs hover:bg-accent/50"
                        onClick={() => handleViewDetails(operation)}
                      >
                        Detalhes
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-7 px-3 text-xs text-primary hover:text-primary/80 hover:bg-primary/10"
                        onClick={() => handleEdit(operation)}
                      >
                        Editar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          
          {filteredOperations.filter(op => op.status === StatusOperacao.EM_ANDAMENTO).length === 0 && (
            <Card className="col-span-full glass-card">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/30 flex items-center justify-center">
                  <Clock className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-lg">Nenhuma operação em andamento</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      {/* Enhanced Completed Operations Table */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-primary" />
            Operações Concluídas
          </h2>
          <span className="text-sm text-muted-foreground">
            {filteredOperations.filter(op => op.status === StatusOperacao.CONCLUIDA).length} concluídas
          </span>
        </div>
        
        <Card className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-accent/30">
                <tr>
                  <th className="p-4 text-left font-semibold text-foreground">ID</th>
                  <th className="p-4 text-left font-semibold text-foreground">Tipo</th>
                  <th className="p-4 text-left font-semibold text-foreground">Operador</th>
                  <th className="p-4 text-left font-semibold text-foreground">Empilhadeira</th>
                  <th className="p-4 text-left font-semibold text-foreground">Setor</th>
                  <th className="p-4 text-left font-semibold text-foreground">Data</th>
                  <th className="p-4 text-left font-semibold text-foreground">Duração</th>
                  <th className="p-4 text-left font-semibold text-foreground">Prioridade</th>
                  <th className="p-4 text-left font-semibold text-foreground">Consumo (L)</th>
                  <th className="p-4 text-left font-semibold text-foreground">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredOperations
                  .filter(op => op.status === StatusOperacao.CONCLUIDA)
                  .map((operation) => {
                    const priorityInfo = getPriorityInfo(operation.prioridade);
                    const typeInfo = getOperationTypeInfo(operation.tipo);
                    
                    return (
                      <tr key={operation.id} className="hover:bg-accent/20 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                            <span className="text-foreground font-medium">{operation.id}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={cn("text-sm font-medium", typeInfo.color)}>
                            {typeInfo.label}
                          </span>
                        </td>
                        <td className="p-4 text-foreground">{operation.operador?.nome}</td>
                        <td className="p-4">
                          <div className="text-foreground">{operation.empilhadeira?.modelo}</div>
                          <div className="text-xs text-muted-foreground">{operation.empilhadeiraId}</div>
                        </td>
                        <td className="p-4 text-foreground">{operation.setor}</td>
                        <td className="p-4">
                          <div className="text-foreground">{formatDate(operation.dataInicio)}</div>
                          <div className="text-xs text-muted-foreground">{formatTime(operation.dataInicio)} - {operation.dataFim ? formatTime(operation.dataFim) : 'N/A'}</div>
                        </td>
                        <td className="p-4 text-foreground">{calculateDuration(operation)}</td>
                        <td className="p-4">
                          <span className={cn(
                            "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border",
                            priorityInfo.bgColor, priorityInfo.color, priorityInfo.borderColor
                          )}>
                            <priorityInfo.icon className="w-3 h-3 mr-1" />
                            {operation.prioridade}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Fuel className="w-4 h-4 text-orange-400" />
                            <span className="text-foreground">{(operation.consumoGas || 0).toFixed(1)}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-muted-foreground hover:text-foreground hover:bg-accent/50"
                              onClick={() => handleViewDetails(operation)}
                            >
                              Detalhes
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
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
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/30 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg">Nenhuma operação concluída</p>
            </CardContent>
          )}
        </Card>
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
