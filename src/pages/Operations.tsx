
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, Plus, Search, Truck, User } from 'lucide-react';
import { Operation } from '@/types';
import { useToast } from '@/hooks/use-toast';
import OperationDialog from '@/components/operations/OperationDialog';
import OperationDetails from '@/components/operations/OperationDetails';
import AdvancedFilters from '@/components/common/AdvancedFilters';
import { useFilters } from '@/hooks/use-filters';

// Mock data for operations
const initialOperations: Operation[] = [
  {
    id: 'OP001',
    operatorId: 'OP001',
    operatorName: 'Carlos Silva',
    forkliftId: 'G001',
    forkliftModel: 'Toyota 8FGU25',
    sector: 'Armazém A',
    initialHourMeter: 12500,
    currentHourMeter: 12583,
    gasConsumption: 25.5,
    startTime: '2023-11-20T08:00:00',
    status: 'active'
  },
  {
    id: 'OP002',
    operatorId: 'OP002',
    operatorName: 'Maria Oliveira',
    forkliftId: 'E002',
    forkliftModel: 'Hyster E50XN',
    sector: 'Expedição',
    initialHourMeter: 8400,
    currentHourMeter: 8452,
    startTime: '2023-11-20T14:00:00',
    status: 'active'
  },
  {
    id: 'OP003',
    operatorId: 'OP003',
    operatorName: 'João Pereira',
    forkliftId: 'G004',
    forkliftModel: 'Yale GLP050',
    sector: 'Recebimento',
    initialHourMeter: 6700,
    currentHourMeter: 6782,
    gasConsumption: 18.2,
    startTime: '2023-11-19T22:00:00',
    endTime: '2023-11-20T06:00:00',
    status: 'completed'
  },
  {
    id: 'OP004',
    operatorId: 'OP004',
    operatorName: 'Ana Costa',
    forkliftId: 'E002',
    forkliftModel: 'Hyster E50XN',
    sector: 'Armazém B',
    initialHourMeter: 8350,
    currentHourMeter: 8400,
    startTime: '2023-11-19T08:00:00',
    endTime: '2023-11-19T16:00:00',
    status: 'completed'
  },
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
  const [operations, setOperations] = useState<Operation[]>(initialOperations);
  
  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);
  
  // Use filters hook
  const {
    search,
    setSearch,
    filters,
    setFilters,
    filteredData: filteredOperations,
    clearFilters
  } = useFilters({
    data: operations,
    searchFields: ['operatorName', 'forkliftModel', 'sector', 'id']
  });

  // Filter configuration for advanced filters
  const filterOptions = [
    {
      key: 'status',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: 'active', label: 'Em Andamento' },
        { value: 'completed', label: 'Concluídas' }
      ]
    },
    {
      key: 'sector',
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
      key: 'operatorName',
      label: 'Operador',
      type: 'select' as const,
      options: availableOperators.map(op => ({ value: op.name, label: op.name }))
    },
    {
      key: 'forkliftModel',
      label: 'Empilhadeira',
      type: 'select' as const,
      options: availableForklifts.map(f => ({ value: f.model, label: f.model }))
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
  const calculateDuration = (operation: Operation) => {
    const startTime = new Date(operation.startTime);
    const endTime = operation.endTime ? new Date(operation.endTime) : new Date();
    const diff = endTime.getTime() - startTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m${!operation.endTime ? ' (em andamento)' : ''}`;
  };

  // Handle save operation
  const handleSaveOperation = (operationData: Operation) => {
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
  const handleViewDetails = (operation: Operation) => {
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
    active: operations.filter(op => op.status === 'active').length,
    completed: operations.filter(op => op.status === 'completed').length,
    totalGasConsumption: operations
      .filter(op => op.gasConsumption)
      .reduce((sum, op) => sum + (op.gasConsumption || 0), 0)
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
        <Navbar 
          title="Operações" 
          subtitle="Controle de Operações"
        />
        
        <main className="flex-1 px-6 py-6">
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
                .filter(op => op.status === 'active')
                .map((operation) => (
                  <div key={operation.id} className="bg-card border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium">{operation.operatorName}</h3>
                          <p className="text-sm text-muted-foreground">ID: {operation.id}</p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                          Em Andamento
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{operation.forkliftModel} ({operation.forkliftId})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{operation.operatorName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{formatDate(operation.startTime)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">Duração: {calculateDuration(operation)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t px-4 py-3 bg-muted/30 flex justify-between">
                      <span className="text-sm">Setor: {operation.sector}</span>
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
              
              {filteredOperations.filter(op => op.status === 'active').length === 0 && (
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
                      .filter(op => op.status === 'completed')
                      .map((operation) => (
                        <tr key={operation.id} className="hover:bg-muted/50 transition-colors">
                          <td className="p-4">{operation.id}</td>
                          <td className="p-4">{operation.operatorName}</td>
                          <td className="p-4">
                            <div>{operation.forkliftModel}</div>
                            <div className="text-xs text-muted-foreground">{operation.forkliftId}</div>
                          </td>
                          <td className="p-4">{operation.sector}</td>
                          <td className="p-4">{formatDate(operation.startTime)}</td>
                          <td className="p-4">{calculateDuration(operation)}</td>
                          <td className="p-4">{operation.gasConsumption?.toFixed(1) || '-'}</td>
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
              
              {filteredOperations.filter(op => op.status === 'completed').length === 0 && (
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
