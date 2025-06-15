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
import { useAppStore } from '@/stores/useAppStore';
import MaintenanceHeader from '@/components/maintenance/MaintenanceHeader';
import MaintenanceFilterBar from '@/components/maintenance/MaintenanceFilterBar';
import MaintenancePendingSection from '@/components/maintenance/MaintenancePendingSection';

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
  // MUDANÇA PRINCIPAL: Usando Zustand como fonte de dados para manutenção
  const maintenanceItems = useAppStore((state) => state.ordemServicos);
  const addOrdemServico = useAppStore((state) => state.addOrdemServico);
  const updateOrdemServico = useAppStore((state) => state.updateOrdemServico);
  const deleteOrdemServico = useAppStore((state) => state.deleteOrdemServico);

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

  // Use the filters hook (filtra a partir da fonte do Zustand)
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

  // Handle add/edit maintenance usando Zustand
  const handleSaveMaintenance = (maintenanceData: OrdemServico) => {
    if (editDialogOpen && selectedMaintenance) {
      updateOrdemServico(maintenanceData.id, maintenanceData);
      toast({
        title: "Manutenção atualizada",
        description: "Os dados da manutenção foram atualizados com sucesso."
      });
    } else {
      addOrdemServico(maintenanceData);
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

  // Handle delete maintenance usando Zustand
  const handleDeleteMaintenance = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este registro de manutenção?")) {
      deleteOrdemServico(id);
      toast({
        title: "Manutenção excluída",
        description: "O registro de manutenção foi excluído com sucesso."
      });
    }
  };

  // Handle status change (usando updateOrdemServico)
  const handleStatusChange = (id: string, newStatus: StatusManutencao) => {
    const item = maintenanceItems.find(m => m.id === id);
    if (!item) return;
    updateOrdemServico(id, { ...item, status: newStatus });
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

  // Get pending and completed maintenance
  const pendingMaintenance = filteredData.filter(m => m.status !== StatusManutencao.CONCLUIDA);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <MaintenanceHeader
        onExport={handleExport}
        onOpenAdd={() => setAddDialogOpen(true)}
      />

      {/* KPI Cards */}
      <MaintenanceKpiCards maintenanceData={maintenanceItems} />

      {/* Filter Bar */}
      <MaintenanceFilterBar
        search={search}
        setSearch={setSearch}
        filters={filters}
        setFilters={setFilters}
        clearFilters={clearFilters}
        filterOptions={filterOptions}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      
      {/* Pending Maintenance Section */}
      <MaintenancePendingSection
        pendingMaintenance={pendingMaintenance}
        onEdit={handleEditMaintenance}
        onDelete={handleDeleteMaintenance}
        onStatusChange={handleStatusChange}
      />
    
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
