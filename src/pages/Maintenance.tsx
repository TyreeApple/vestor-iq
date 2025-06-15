
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Calendar, Plus, Search, Filter, Grid, List, Download, FileText, Moon, Sun, MoreVertical, Play, Pause, CheckCircle, Edit, Trash2, Eye, ArrowRight, Timer, MapPin, User } from 'lucide-react';
import { OrdemServico, StatusManutencao, TipoManutencao, PrioridadeOperacao } from '@/types';
import MaintenanceDialog from '@/components/maintenance/MaintenanceDialog';
import MaintenanceKpiCards from '@/components/maintenance/MaintenanceKpiCards';
import PendingMaintenanceCard from '@/components/maintenance/PendingMaintenanceCard';
import MaintenanceHistoryTable from '@/components/maintenance/MaintenanceHistoryTable';
import { useToast } from '@/hooks/use-toast';
import AdvancedFilters from '@/components/common/AdvancedFilters';
import { useFilters } from '@/hooks/use-filters';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoadingSpinner from '@/components/maintenance/LoadingSpinner';
import EmptyState from '@/components/maintenance/EmptyState';
import StatusBadge from '@/components/maintenance/StatusBadge';

// Mock data for maintenance - enhanced with more realistic data
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
    problema: 'Vazamento de óleo hidráulico detectado no sistema principal',
    dataAbertura: '2023-11-15',
    custos: {
      pecas: 350,
      maoObra: 200,
      terceiros: 0,
      total: 550
    },
    pecasUtilizadas: [],
    anexos: [],
    forkliftId: 'G001',
    forkliftModel: 'Toyota 8FGU25',
    issue: 'Vazamento de óleo hidráulico detectado no sistema principal',
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
    problema: 'Motor de tração apresentando ruído anormal e vibração excessiva',
    dataAbertura: '2023-11-10',
    dataInicio: '2023-11-12',
    custos: {
      pecas: 800,
      maoObra: 400,
      terceiros: 150,
      total: 1350
    },
    pecasUtilizadas: [],
    anexos: [],
    forkliftId: 'R003',
    forkliftModel: 'Crown RR5725',
    issue: 'Motor de tração apresentando ruído anormal e vibração excessiva',
    reportedBy: 'João Pereira',
    reportedDate: '2023-11-10'
  },
  {
    id: 'M003',
    empilhadeiraId: 'E002',
    empilhadeira: {
      id: 'E002',
      modelo: 'Hyster E50XN',
      marca: 'Hyster',
      tipo: 'Elétrica' as any,
      status: 'Operacional' as any,
      capacidade: 2500,
      anoFabricacao: 2023,
      dataAquisicao: '15/01/2023',
      numeroSerie: 'HYS002',
      horimetro: 8456,
      ultimaManutencao: '20/10/2023',
      proximaManutencao: '20/01/2024',
      localizacaoAtual: 'Setor B',
      setor: 'Expedição',
      custoHora: 38.75,
      eficiencia: 91.2,
      disponibilidade: 94.8,
      qrCode: 'QR002'
    },
    tipo: TipoManutencao.PREVENTIVA,
    status: StatusManutencao.CONCLUIDA,
    prioridade: PrioridadeOperacao.NORMAL,
    problema: 'Manutenção preventiva programada - 8000h',
    dataAbertura: '2023-11-05',
    dataInicio: '2023-11-06',
    dataConclusao: '2023-11-06',
    custos: {
      pecas: 180,
      maoObra: 120,
      terceiros: 0,
      total: 300
    },
    pecasUtilizadas: [],
    anexos: [],
    forkliftId: 'E002',
    forkliftModel: 'Hyster E50XN',
    issue: 'Manutenção preventiva programada - 8000h',
    reportedBy: 'Sistema Automático',
    reportedDate: '2023-11-05'
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
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isLoading, setIsLoading] = useState(false);
  
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

  // Theme toggle
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

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
        description: "O registro de manutenção foi excluído com sucesso.",
        variant: "destructive"
      });
    }
  };

  // Handle status change
  const handleStatusChange = (id: string, newStatus: StatusManutencao) => {
    setMaintenanceItems(prev => 
      prev.map(m => m.id === id ? { 
        ...m, 
        status: newStatus,
        dataInicio: newStatus === StatusManutencao.EM_ANDAMENTO && !m.dataInicio ? new Date().toISOString().split('T')[0] : m.dataInicio,
        dataConclusao: newStatus === StatusManutencao.CONCLUIDA ? new Date().toISOString().split('T')[0] : undefined
      } : m)
    );
    
    const statusLabels = {
      [StatusManutencao.ABERTA]: 'Aberta',
      [StatusManutencao.EM_ANDAMENTO]: 'Em Andamento',
      [StatusManutencao.CONCLUIDA]: 'Concluída'
    };
    
    toast({
      title: "Status atualizado",
      description: `Status da manutenção alterado para ${statusLabels[newStatus]}.`
    });
  };

  // Handle export
  const handleExport = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Exportação concluída",
        description: "O relatório foi gerado com sucesso."
      });
    }, 2000);
  };

  // Format date helper
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('pt-BR');
    } catch (e) {
      return dateString;
    }
  };

  // Get priority configuration
  const getPriorityConfig = (priority: PrioridadeOperacao) => {
    switch (priority) {
      case PrioridadeOperacao.CRITICA:
        return { 
          color: 'border-l-red-500', 
          badge: 'bg-red-500/10 text-red-400 border-red-500/20',
          label: 'Crítica',
          indicator: 'bg-red-500'
        };
      case PrioridadeOperacao.ALTA:
        return { 
          color: 'border-l-orange-500', 
          badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
          label: 'Alta',
          indicator: 'bg-orange-500'
        };
      case PrioridadeOperacao.NORMAL:
        return { 
          color: 'border-l-blue-500', 
          badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
          label: 'Normal',
          indicator: 'bg-blue-500'
        };
      default:
        return { 
          color: 'border-l-gray-500', 
          badge: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
          label: 'Baixa',
          indicator: 'bg-gray-500'
        };
    }
  };

  // Get pending maintenance items
  const pendingMaintenance = filteredData.filter(m => m.status !== StatusManutencao.CONCLUIDA);
  const completedMaintenance = filteredData.filter(m => m.status === StatusManutencao.CONCLUIDA);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 space-y-6 font-['Inter'] text-white">
      {/* Enhanced Header */}
      <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Gestão de Manutenção Avançada
          </h1>
          <p className="text-slate-400 mt-1">
            Sistema inteligente para controle completo de ordens de serviço e manutenções
          </p>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-slate-500">Sistema em tempo real</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            onClick={handleExport}
            disabled={isLoading}
            className="gap-2 border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <Download className="w-4 h-4" />
            {isLoading ? 'Exportando...' : 'Exportar'}
          </Button>
          <Button
            onClick={() => setAddDialogOpen(true)}
            className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="w-4 h-4" />
            Nova OS
          </Button>
        </div>
      </header>

      {/* Enhanced KPI Cards */}
      <MaintenanceKpiCards maintenanceData={maintenanceItems} />

      {/* Advanced Filter Bar */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-slate-200">Filtros Inteligentes</h2>
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-4 shadow-lg border border-slate-700">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Enhanced Search */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input 
                type="text" 
                placeholder="Buscar por problema, equipamento, OS ou responsável..." 
                className="pl-10 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Enhanced Filters */}
            <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
              <div className="grid grid-cols-2 sm:flex gap-3">
                <select 
                  className="px-3 py-2 rounded-lg border border-slate-600 bg-slate-800 text-white text-sm h-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-w-[140px]"
                  value={filters.status || 'all'}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value === 'all' ? '' : e.target.value })}
                >
                  <option value="all">Todos os Status</option>
                  <option value={StatusManutencao.ABERTA}>Aberta</option>
                  <option value={StatusManutencao.EM_ANDAMENTO}>Em Andamento</option>
                  <option value={StatusManutencao.CONCLUIDA}>Concluída</option>
                </select>

                <select 
                  className="px-3 py-2 rounded-lg border border-slate-600 bg-slate-800 text-white text-sm h-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-w-[140px]"
                  value={filters.tipo || 'all'}
                  onChange={(e) => setFilters({ ...filters, tipo: e.target.value === 'all' ? '' : e.target.value })}
                >
                  <option value="all">Todos os Tipos</option>
                  <option value={TipoManutencao.PREVENTIVA}>Preventiva</option>
                  <option value={TipoManutencao.CORRETIVA}>Corretiva</option>
                  <option value={TipoManutencao.PREDITIVA}>Preditiva</option>
                </select>

                <select 
                  className="px-3 py-2 rounded-lg border border-slate-600 bg-slate-800 text-white text-sm h-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-w-[140px]"
                  value={filters.prioridade || 'all'}
                  onChange={(e) => setFilters({ ...filters, prioridade: e.target.value === 'all' ? '' : e.target.value })}
                >
                  <option value="all">Todas as Prioridades</option>
                  <option value={PrioridadeOperacao.CRITICA}>Crítica</option>
                  <option value={PrioridadeOperacao.ALTA}>Alta</option>
                  <option value={PrioridadeOperacao.NORMAL}>Normal</option>
                  <option value={PrioridadeOperacao.BAIXA}>Baixa</option>
                </select>
              </div>

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

                {/* Enhanced View Toggle */}
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
          
          <div className="mt-3 text-sm text-slate-400">
            {filteredData.length} resultado{filteredData.length !== 1 ? 's' : ''} encontrado{filteredData.length !== 1 ? 's' : ''} 
            {pendingMaintenance.length > 0 && (
              <span className="ml-2 text-orange-400">• {pendingMaintenance.length} pendente{pendingMaintenance.length !== 1 ? 's' : ''}</span>
            )}
          </div>
        </div>
      </section>
      
      {/* Enhanced Pending Maintenance Section */}
      {pendingMaintenance.length > 0 ? (
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Manutenções Pendentes</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                <span className="text-sm text-slate-400">
                  {pendingMaintenance.length} {pendingMaintenance.length === 1 ? 'manutenção aguardando' : 'manutenções aguardando'} atenção
                </span>
              </div>
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
        </section>
      ) : (
        <EmptyState
          title="Nenhuma manutenção pendente"
          description="Todas as manutenções estão em dia! Crie uma nova ordem de serviço se necessário."
          actionLabel="Nova Ordem de Serviço"
          onAction={() => setAddDialogOpen(true)}
          icon={<CheckCircle className="w-12 h-12" />}
        />
      )}
      
      {/* Enhanced Maintenance History */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Histórico Completo</h2>
            <p className="text-slate-400">
              Registro detalhado de todas as manutenções realizadas
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 border-slate-600 text-slate-300 hover:bg-slate-700">
              <Filter className="w-4 h-4" />
              Filtros Avançados
            </Button>
            <Button variant="outline" className="gap-2 border-slate-600 text-slate-300 hover:bg-slate-700">
              <FileText className="w-4 h-4" />
              Gerar Relatório
            </Button>
          </div>
        </div>
        
        <MaintenanceHistoryTable
          data={maintenanceItems}
          onEdit={handleEditMaintenance}
          onDelete={handleDeleteMaintenance}
        />
      </section>
      
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
