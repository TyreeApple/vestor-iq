import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Calendar, Plus, Search, Truck, User, AlertOctagon, Grid, List, Filter } from 'lucide-react';
import { OrdemServico, StatusManutencao, TipoManutencao, PrioridadeOperacao } from '@/types';
import MaintenanceDialog from '@/components/maintenance/MaintenanceDialog';
import { useToast } from '@/hooks/use-toast';
import AdvancedFilters from '@/components/common/AdvancedFilters';
import { useFilters } from '@/hooks/use-filters';

// Mock data for maintenance
const initialMaintenance: OrdemServico[] = [
  {
    id: 'M001',
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
    tipo: TipoManutencao.CORRETIVA,
    status: StatusManutencao.ABERTA,
    prioridade: PrioridadeOperacao.ALTA,
    problema: 'Vazamento de óleo hidráulico',
    dataAbertura: '2023-11-15',
    custos: {
      pecas: 0,
      maoObra: 0,
      terceiros: 0,
      total: 0
    },
    pecasUtilizadas: [],
    anexos: [],
    forkliftId: 'G001',
    forkliftModel: 'Toyota 8FGU25',
    issue: 'Vazamento de óleo hidráulico',
    reportedBy: 'Carlos Silva',
    reportedDate: '2023-11-15'
  },
  {
    id: 'M002',
    empilhadeiraId: 'R003',
    empilhadeira: {
      id: 'R003',
      modelo: 'Crown RR5725',
      marca: 'Crown',
      tipo: 'Retrátil' as any,
      status: 'Em Manutenção' as any,
      capacidade: 1800,
      anoFabricacao: 2022,
      dataAquisicao: '04/03/2022',
      numeroSerie: 'CRW003',
      horimetro: 10974,
      ultimaManutencao: '12/08/2023',
      proximaManutencao: '12/11/2023',
      localizacaoAtual: 'Oficina',
      setor: 'Manutenção',
      custoHora: 42.30,
      eficiencia: 85.1,
      disponibilidade: 88.7,
      qrCode: 'QR003'
    },
    tipo: TipoManutencao.CORRETIVA,
    status: StatusManutencao.EM_ANDAMENTO,
    prioridade: PrioridadeOperacao.ALTA,
    problema: 'Motor de tração com ruído anormal',
    dataAbertura: '2023-11-10',
    dataInicio: '2023-11-12',
    custos: {
      pecas: 500,
      maoObra: 200,
      terceiros: 0,
      total: 700
    },
    pecasUtilizadas: [],
    anexos: [],
    forkliftId: 'R003',
    forkliftModel: 'Crown RR5725',
    issue: 'Motor de tração com ruído anormal',
    reportedBy: 'João Pereira',
    reportedDate: '2023-11-10'
  }
];

// Mock data for available forklifts and operators
const availableForklifts = [
  { id: 'G001', model: 'Toyota 8FGU25' },
  { id: 'G004', model: 'Yale GLP050' },
  { id: 'E002', model: 'Hyster E50XN' },
  { id: 'R003', model: 'Crown RR5725' },
  { id: 'E005', model: 'Toyota 8FBMT30' }
];

const availableOperators = [
  { id: 'OP001', name: 'Carlos Silva' },
  { id: 'OP002', name: 'Maria Oliveira' },
  { id: 'OP003', name: 'João Pereira' },
  { id: 'OP004', name: 'Ana Costa' },
  { id: 'SV001', name: 'Pedro Santos' }
];

const MaintenancePage = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [maintenanceItems, setMaintenanceItems] = useState<OrdemServico[]>(initialMaintenance);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState<OrdemServico | null>(null);
  
  // Filter configuration
  const filterOptions = [
    {
      key: 'status',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: StatusManutencao.ABERTA, label: 'Aberta' },
        { value: StatusManutencao.EM_ANDAMENTO, label: 'Em Andamento' },
        { value: StatusManutencao.CONCLUIDA, label: 'Concluída' }
      ]
    },
    {
      key: 'tipo',
      label: 'Tipo',
      type: 'select' as const,
      options: [
        { value: TipoManutencao.PREVENTIVA, label: 'Preventiva' },
        { value: TipoManutencao.CORRETIVA, label: 'Corretiva' },
        { value: TipoManutencao.PREDITIVA, label: 'Preditiva' }
      ]
    },
    {
      key: 'prioridade',
      label: 'Prioridade',
      type: 'select' as const,
      options: [
        { value: PrioridadeOperacao.BAIXA, label: 'Baixa' },
        { value: PrioridadeOperacao.NORMAL, label: 'Normal' },
        { value: PrioridadeOperacao.ALTA, label: 'Alta' },
        { value: PrioridadeOperacao.CRITICA, label: 'Crítica' }
      ]
    },
    {
      key: 'dataAbertura',
      label: 'Data de Abertura',
      type: 'date' as const
    }
  ];

  // Use the filters hook
  const {
    search,
    setSearch,
    filters,
    setFilters,
    filteredData,
    clearFilters
  } = useFilters({
    data: maintenanceItems,
    searchFields: ['problema', 'empilhadeiraId', 'forkliftModel', 'reportedBy']
  });

  // Format date
  const formatDate = (dateString: string) => {
    try {
      const dateParts = dateString.split('-');
      return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    } catch (e) {
      return dateString;
    }
  };

  // Get status classes
  const getStatusClass = (status: StatusManutencao) => {
    switch (status) {
      case StatusManutencao.ABERTA:
        return 'bg-status-warning/10 text-status-warning';
      case StatusManutencao.EM_ANDAMENTO:
        return 'bg-status-maintenance/10 text-status-maintenance';
      case StatusManutencao.CONCLUIDA:
        return 'bg-status-operational/10 text-status-operational';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // Handle add/edit maintenance
  const handleSaveMaintenance = (maintenanceData: OrdemServico) => {
    if (editDialogOpen) {
      setMaintenanceItems(prev => 
        prev.map(m => m.id === maintenanceData.id ? maintenanceData : m)
      );
    } else {
      setMaintenanceItems(prev => [...prev, maintenanceData]);
    }
  };

  // Handle edit maintenance
  const handleEditMaintenance = (maintenance: OrdemServico) => {
    setSelectedMaintenance(maintenance);
    setEditDialogOpen(true);
  };

  // Handle delete maintenance
  const handleDeleteMaintenance = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este registro de manutenção?")) {
      setMaintenanceItems(prev => prev.filter(m => m.id !== id));
      toast({
        title: "Manutenção excluída",
        description: "O registro de manutenção foi excluído com sucesso."
      });
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Manutenção</h1>
        <p className="text-muted-foreground">Gestão de Manutenções</p>
      </div>

      {/* Dark Filter Bar - Compact spacing */}
      <div className="bg-slate-800 rounded-lg p-4 mb-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[250px] max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input 
              type="text" 
              placeholder="Buscar por ID ou modelo..." 
              className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="min-w-[150px]">
            <select 
              className="w-full px-3 py-2 rounded-md border border-slate-600 bg-slate-700 text-white text-sm h-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={filters.status || 'all'}
              onChange={(e) => setFilters({ ...filters, status: e.target.value === 'all' ? '' : e.target.value })}
            >
              <option value="all">Todos os Status</option>
              <option value={StatusManutencao.ABERTA}>Aberta</option>
              <option value={StatusManutencao.EM_ANDAMENTO}>Em Andamento</option>
              <option value={StatusManutencao.CONCLUIDA}>Concluída</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="min-w-[150px]">
            <select 
              className="w-full px-3 py-2 rounded-md border border-slate-600 bg-slate-700 text-white text-sm h-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={filters.tipo || 'all'}
              onChange={(e) => setFilters({ ...filters, tipo: e.target.value === 'all' ? '' : e.target.value })}
            >
              <option value="all">Todos os Tipos</option>
              <option value={TipoManutencao.PREVENTIVA}>Preventiva</option>
              <option value={TipoManutencao.CORRETIVA}>Corretiva</option>
              <option value={TipoManutencao.PREDITIVA}>Preditiva</option>
            </select>
          </div>

          {/* Advanced Filters */}
          <Button 
            variant="outline" 
            className="gap-2 bg-slate-700 border-slate-600 text-white hover:bg-slate-600 hover:text-white"
            onClick={() => {
              // You can expand this to open a more detailed filter dialog
            }}
          >
            <Filter className="w-4 h-4" />
            Filtros Avançados
          </Button>

          {/* View Toggle */}
          <div className="flex border border-slate-600 rounded-md bg-slate-700">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={cn(
                "rounded-r-none",
                viewMode === 'grid' 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-transparent text-slate-300 hover:bg-slate-600 hover:text-white"
              )}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={cn(
                "rounded-l-none",
                viewMode === 'list' 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-transparent text-slate-300 hover:bg-slate-600 hover:text-white"
              )}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Maintenance Cards - Waiting & In Progress */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Manutenções Pendentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData
            .filter(m => m.status !== StatusManutencao.CONCLUIDA)
            .map((maintenance) => (
              <div key={maintenance.id} className="bg-card border rounded-lg overflow-hidden shadow">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium">Manutenção #{maintenance.id}</h3>
                      <p className="text-sm text-muted-foreground">{maintenance.empilhadeira?.modelo || maintenance.forkliftModel}</p>
                    </div>
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs",
                      getStatusClass(maintenance.status)
                    )}>
                      {maintenance.status}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-muted/30 rounded-md">
                      <div className="flex items-start gap-2">
                        <AlertOctagon className="w-4 h-4 text-status-warning mt-0.5" />
                        <p className="text-sm">{maintenance.problema}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{maintenance.empilhadeiraId || maintenance.forkliftId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Reportado: {maintenance.reportedBy || 'Sistema'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Data: {formatDate(maintenance.dataAbertura || maintenance.reportedDate || '')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t px-4 py-3 bg-muted/30 flex justify-between">
                  <span className="text-sm">ID: {maintenance.id}</span>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditMaintenance(maintenance)}
                    >
                      Editar
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeleteMaintenance(maintenance.id)}
                    >
                      Excluir
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          
          {filteredData.filter(m => m.status !== StatusManutencao.CONCLUIDA).length === 0 && (
            <div className="col-span-full p-8 text-center bg-card border rounded-lg">
              <p className="text-muted-foreground">Nenhuma manutenção pendente</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Maintenance History */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Histórico de Manutenções</h2>
        <div className="bg-card rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-4 text-left font-medium text-muted-foreground">ID</th>
                  <th className="p-4 text-left font-medium text-muted-foreground">Empilhadeira</th>
                  <th className="p-4 text-left font-medium text-muted-foreground">Problema</th>
                  <th className="p-4 text-left font-medium text-muted-foreground">Reportado por</th>
                  <th className="p-4 text-left font-medium text-muted-foreground">Data Reportada</th>
                  <th className="p-4 text-left font-medium text-muted-foreground">Data Concluída</th>
                  <th className="p-4 text-left font-medium text-muted-foreground">Status</th>
                  <th className="p-4 text-left font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredData
                  .filter(m => m.status === StatusManutencao.CONCLUIDA)
                  .map((maintenance) => (
                    <tr key={maintenance.id} className="hover:bg-muted/50 transition-colors">
                      <td className="p-4">{maintenance.id}</td>
                      <td className="p-4">
                        <div>{maintenance.empilhadeira?.modelo || maintenance.forkliftModel}</div>
                        <div className="text-xs text-muted-foreground">{maintenance.empilhadeiraId || maintenance.forkliftId}</div>
                      </td>
                      <td className="p-4">{maintenance.problema}</td>
                      <td className="p-4">{maintenance.reportedBy || 'Sistema'}</td>
                      <td className="p-4">{formatDate(maintenance.dataAbertura || maintenance.reportedDate || '')}</td>
                      <td className="p-4">{maintenance.dataConclusao ? formatDate(maintenance.dataConclusao) : '-'}</td>
                      <td className="p-4">
                        <span className={cn(
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs",
                          getStatusClass(maintenance.status)
                        )}>
                          {maintenance.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditMaintenance(maintenance)}
                          >
                            Editar
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteMaintenance(maintenance.id)}
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
          
          {filteredData.filter(m => m.status === StatusManutencao.CONCLUIDA).length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">Nenhuma manutenção concluída</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Add/Edit Maintenance Dialog */}
      <MaintenanceDialog 
        open={addDialogOpen} 
        onOpenChange={setAddDialogOpen}
        onSave={handleSaveMaintenance}
        availableForklifts={availableForklifts}
        availableOperators={availableOperators}
      />
      
      <MaintenanceDialog 
        open={editDialogOpen} 
        onOpenChange={setEditDialogOpen}
        maintenance={selectedMaintenance || undefined}
        onSave={handleSaveMaintenance}
        availableForklifts={availableForklifts}
        availableOperators={availableOperators}
      />
    </div>
  );
};

export default MaintenancePage;
