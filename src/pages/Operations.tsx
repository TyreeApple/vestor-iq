
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, Plus, Search, Truck, User } from 'lucide-react';
import { Operacao, StatusOperacao, TipoOperacao, PrioridadeOperacao } from '@/types';
import { useToast } from '@/hooks/use-toast';
import OperationDialog from '@/components/operations/OperationDialog';
import OperationDetails from '@/components/operations/OperationDetails';
import AdvancedFilters from '@/components/common/AdvancedFilters';
import { useFilters } from '@/hooks/use-filters';

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

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
        <Navbar />
        
        <main className="flex-1 px-6 py-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Operações</h1>
            <p className="text-muted-foreground">Controle de Operações</p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-card border rounded-lg p-4 shadow">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Total de Operações</h3>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="bg-card border rounded-lg p-4 shadow">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Em Andamento</h3>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <div className="bg-card border rounded-lg p-4 shadow">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Concluídas</h3>
              <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
            </div>
            <div className="bg-card border rounded-lg p-4 shadow">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Consumo Total (L)</h3>
              <p className="text-2xl font-bold">{stats.totalGasConsumption.toFixed(1)}</p>
            </div>
          </div>

          {/* Filter section */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                type="text" 
                placeholder="Buscar operação..." 
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <AdvancedFilters
                filters={filterOptions}
                values={filters}
                onFiltersChange={setFilters}
                onClearFilters={clearFilters}
              />
              <Button 
                className="gap-2"
                onClick={() => {
                  setSelectedOperation(null);
                  setAddDialogOpen(true);
                }}
              >
                <Plus className="w-4 h-4" />
                Nova Operação
              </Button>
            </div>
          </div>
          
          {/* Active Operations */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Operações em Andamento</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredOperations
                .filter(op => op.status === StatusOperacao.EM_ANDAMENTO)
                .map((operation) => (
                  <div key={operation.id} className="bg-card border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium">{operation.operador?.nome}</h3>
                          <p className="text-sm text-muted-foreground">ID: {operation.id}</p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                          Em Andamento
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{operation.empilhadeira?.modelo} ({operation.empilhadeiraId})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{operation.operador?.nome}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{formatDate(operation.dataInicio)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">Duração: {calculateDuration(operation)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t px-4 py-3 bg-muted/30 flex justify-between">
                      <span className="text-sm">Setor: {operation.setor}</span>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewDetails(operation)}
                        >
                          Detalhes
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
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
                ))}
              
              {filteredOperations.filter(op => op.status === StatusOperacao.EM_ANDAMENTO).length === 0 && (
                <div className="col-span-full p-8 text-center bg-card border rounded-lg">
                  <p className="text-muted-foreground">Nenhuma operação em andamento</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Completed Operations */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Operações Concluídas</h2>
            <div className="bg-card rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="p-4 text-left font-medium text-muted-foreground">ID</th>
                      <th className="p-4 text-left font-medium text-muted-foreground">Operador</th>
                      <th className="p-4 text-left font-medium text-muted-foreground">Empilhadeira</th>
                      <th className="p-4 text-left font-medium text-muted-foreground">Setor</th>
                      <th className="p-4 text-left font-medium text-muted-foreground">Data</th>
                      <th className="p-4 text-left font-medium text-muted-foreground">Duração</th>
                      <th className="p-4 text-left font-medium text-muted-foreground">Consumo (L)</th>
                      <th className="p-4 text-left font-medium text-muted-foreground">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredOperations
                      .filter(op => op.status === StatusOperacao.CONCLUIDA)
                      .map((operation) => (
                        <tr key={operation.id} className="hover:bg-muted/50 transition-colors">
                          <td className="p-4">{operation.id}</td>
                          <td className="p-4">{operation.operador?.nome}</td>
                          <td className="p-4">
                            <div>{operation.empilhadeira?.modelo}</div>
                            <div className="text-xs text-muted-foreground">{operation.empilhadeiraId}</div>
                          </td>
                          <td className="p-4">{operation.setor}</td>
                          <td className="p-4">{formatDate(operation.dataInicio)}</td>
                          <td className="p-4">{calculateDuration(operation)}</td>
                          <td className="p-4">{(operation.consumoGas || 0).toFixed(1)}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleViewDetails(operation)}
                              >
                                Detalhes
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleDeleteOperation(operation.id)}
                              >
                                Excluir
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              
              {filteredOperations.filter(op => op.status === StatusOperacao.CONCLUIDA).length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">Nenhuma operação concluída</p>
                </div>
              )}
            </div>
          </div>
        </main>
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
