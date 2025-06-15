import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Calendar, Plus, Search, Filter, Grid, List, Download, FileText } from 'lucide-react';
import { OrdemServico, StatusManutencao, TipoManutencao, PrioridadeOperacao } from '@/types';
import MaintenanceDialog from '@/components/maintenance/MaintenanceDialog';
import MaintenanceKpiCards from '@/components/maintenance/MaintenanceKpiCards';
import PendingMaintenanceCard from '@/components/maintenance/PendingMaintenanceCard';
import MaintenanceHistoryTable from '@/components/maintenance/MaintenanceHistoryTable';
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

  // Handle add/edit maintenance
  const handleSaveMaintenance = (maintenanceData: OrdemServico) => {
    if (editDialogOpen) {
      setMaintenanceItems(prev => 
        prev.map(m => m.id === maintenanceData.id ? maintenanceData : m)
      );
      toast({
        title: "Manutenção atualizada",
        description: "Os dados da manutenção foram atualizados com sucesso."
      });
    } else {
      setMaintenanceItems(prev => [...prev, maintenanceData]);
      toast({
        title: "Manutenção criada",
        description: "Nova ordem de serviço criada com sucesso."
      });
    }
    setAddDialogOpen(false);
    setEditDialogOpen(false);
    setSelectedMaintenance(null);
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

  // Handle status change
  const handleStatusChange = (id: string, newStatus: StatusManutencao) => {
    setMaintenanceItems(prev => 
      prev.map(m => m.id === id ? { ...m, status: newStatus } : m)
    );
    toast({
      title: "Status atualizado",
      description: `Status da manutenção alterado para ${newStatus}.`
    });
  };

  // Handle export
  const handleExport = () => {
    toast({
      title: "Exportando dados",
      description: "O relatório será gerado em breve."
    });
  };

  // Get pending maintenance items
  const pendingMaintenance = filteredData.filter(m => m.status !== StatusManutencao.CONCLUIDA);
  const completedMaintenance = filteredData.filter(m => m.status === StatusManutencao.CONCLUIDA);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Gestão de Manutenção
          </h1>
          <p className="text-muted-foreground mt-1">
            Controle completo das ordens de serviço e manutenções
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleExport}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Exportar
          </Button>
          <Button
            onClick={() => setAddDialogOpen(true)}
            className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="w-4 h-4" />
            Nova Manutenção
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <MaintenanceKpiCards maintenanceData={maintenanceItems} />

      {/* Compact Filter Bar */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-4 shadow-lg border border-slate-700">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search - Full width on mobile, flexible on desktop */}
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input 
              type="text" 
              placeholder="Buscar por problema, empilhadeira ou responsável..." 
              className="pl-10 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filters - Stack on mobile, inline on desktop */}
          <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
            <div className="grid grid-cols-2 sm:flex gap-3">
              <select 
                className="px-3 py-2 rounded-lg border border-slate-600 bg-slate-800 text-white text-sm h-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-w-[120px]"
                value={filters.status || 'all'}
                onChange={(e) => setFilters({ ...filters, status: e.target.value === 'all' ? '' : e.target.value })}
              >
                <option value="all">Status</option>
                <option value={StatusManutencao.ABERTA}>Aberta</option>
                <option value={StatusManutencao.EM_ANDAMENTO}>Em Andamento</option>
                <option value={StatusManutencao.CONCLUIDA}>Concluída</option>
              </select>

              <select 
                className="px-3 py-2 rounded-lg border border-slate-600 bg-slate-800 text-white text-sm h-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-w-[120px]"
                value={filters.tipo || 'all'}
                onChange={(e) => setFilters({ ...filters, tipo: e.target.value === 'all' ? '' : e.target.value })}
              >
                <option value="all">Tipos</option>
                <option value={TipoManutencao.PREVENTIVA}>Preventiva</option>
                <option value={TipoManutencao.CORRETIVA}>Corretiva</option>
                <option value={TipoManutencao.PREDITIVA}>Preditiva</option>
              </select>

              <select 
                className="px-3 py-2 rounded-lg border border-slate-600 bg-slate-800 text-white text-sm h-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-w-[120px]"
                value={filters.prioridade || 'all'}
                onChange={(e) => setFilters({ ...filters, prioridade: e.target.value === 'all' ? '' : e.target.value })}
              >
                <option value="all">Prioridades</option>
                <option value={PrioridadeOperacao.CRITICA}>Crítica</option>
                <option value={PrioridadeOperacao.ALTA}>Alta</option>
                <option value={PrioridadeOperacao.NORMAL}>Normal</option>
                <option value={PrioridadeOperacao.BAIXA}>Baixa</option>
              </select>
            </div>

            {/* Advanced Filters and View Toggle */}
            <div className="flex gap-2">
              <AdvancedFilters
                filters={filterOptions}
                values={filters}
                onFiltersChange={setFilters}
                onClearFilters={clearFilters}
                triggerProps={{
                  className: "bg-slate-700 border-slate-600 text-white hover:bg-slate-600 hover:text-white flex-shrink-0"
                }}
              />

              {/* View Toggle */}
              <div className="flex border border-slate-600 rounded-lg bg-slate-800">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "rounded-r-none px-3",
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
                    "rounded-l-none px-3",
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
        </div>
      </div>
      
      {/* Pending Maintenance Section */}
      {pendingMaintenance.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Manutenções Pendentes</h2>
              <p className="text-muted-foreground">
                {pendingMaintenance.length} {pendingMaintenance.length === 1 ? 'manutenção aguardando' : 'manutenções aguardando'} atenção
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">Atualizando em tempo real</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {pendingMaintenance.map((maintenance) => (
              <PendingMaintenanceCard
                key={maintenance.id}
                maintenance={maintenance}
                onEdit={handleEditMaintenance}
                onDelete={handleDeleteMaintenance}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Maintenance History */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Histórico Completo</h2>
            <p className="text-muted-foreground">
              Todas as manutenções registradas no sistema
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <FileText className="w-4 h-4" />
            Gerar Relatório
          </Button>
        </div>
        
        <MaintenanceHistoryTable
          data={maintenanceItems}
          onEdit={handleEditMaintenance}
          onDelete={handleDeleteMaintenance}
        />
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
