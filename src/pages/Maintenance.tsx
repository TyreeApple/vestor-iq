
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import { OrdemServico, StatusManutencao, TipoManutencao, PrioridadeOperacao } from '@/types';
import MaintenanceDialog from '@/components/maintenance/MaintenanceDialog';
import MaintenanceKpiCards from '@/components/maintenance/MaintenanceKpiCards';
import MaintenanceHistorySection from '@/components/maintenance/MaintenanceHistorySection';
import { useToast } from '@/hooks/use-toast';
import AdvancedFilters from '@/components/common/AdvancedFilters';
import { useFilters } from '@/hooks/use-filters';
import { useAppStore } from '@/stores/useAppStore';
import MaintenanceHeader from '@/components/maintenance/MaintenanceHeader';
import MaintenanceFilterBar from '@/components/maintenance/MaintenanceFilterBar';
import MaintenancePendingSection from '@/components/maintenance/MaintenancePendingSection';

const MaintenancePage = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  // Zustand store usage
  const maintenanceItems = useAppStore((state) => state.ordemServicos);
  const operators = useAppStore((state) => state.operadores);
  const forklifts = useAppStore((state) => state.empilhadeiras);
  const addOrdemServico = useAppStore((state) => state.addOrdemServico);
  const updateOrdemServico = useAppStore((state) => state.updateOrdemServico);
  const deleteOrdemServico = useAppStore((state) => state.deleteOrdemServico);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState<OrdemServico | null>(null);
  
  // Available options from store data
  const availableForklifts = forklifts.map(f => ({ id: f.id, model: f.modelo }));
  const availableOperators = operators.map(o => ({ id: o.id, name: o.nome }));
  
  // Filter configuration
  const filterOptions = [
    {
      key: 'status',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: StatusManutencao.ABERTA, label: 'Open' },
        { value: StatusManutencao.EM_ANDAMENTO, label: 'In Progress' },
        { value: StatusManutencao.CONCLUIDA, label: 'Completed' }
      ]
    },
    {
      key: 'tipo',
      label: 'Type',
      type: 'select' as const,
      options: [
        { value: TipoManutencao.PREVENTIVA, label: 'Preventive' },
        { value: TipoManutencao.CORRETIVA, label: 'Corrective' },
        { value: TipoManutencao.PREDITIVA, label: 'Predictive' }
      ]
    },
    {
      key: 'prioridade',
      label: 'Priority',
      type: 'select' as const,
      options: [
        { value: PrioridadeOperacao.BAIXA, label: 'Low' },
        { value: PrioridadeOperacao.NORMAL, label: 'Normal' },
        { value: PrioridadeOperacao.ALTA, label: 'High' },
        { value: PrioridadeOperacao.CRITICA, label: 'Critical' }
      ]
    },
    {
      key: 'dataAbertura',
      label: 'Opening Date',
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
    searchFields: ['problema', 'empilhadeiraId', 'reportedBy']
  });

  // Handle add/edit maintenance
  const handleSaveMaintenance = (maintenanceData: OrdemServico) => {
    if (editDialogOpen && selectedMaintenance) {
      updateOrdemServico(maintenanceData.id, maintenanceData);
      toast({
        title: "Maintenance updated",
        description: "The maintenance data has been updated successfully."
      });
    } else {
      addOrdemServico(maintenanceData);
      toast({
        title: "Maintenance created",
        description: "New service order created successfully."
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
    if (confirm("Are you sure you want to delete this maintenance record?")) {
      deleteOrdemServico(id);
      toast({
        title: "Maintenance deleted",
        description: "The maintenance record has been deleted successfully."
      });
    }
  };

  // Handle status change
  const handleStatusChange = (id: string, newStatus: StatusManutencao) => {
    const item = maintenanceItems.find(m => m.id === id);
    if (!item) return;
    updateOrdemServico(id, { ...item, status: newStatus });
    toast({
      title: "Status updated",
      description: `Maintenance status changed to ${newStatus}.`
    });
  };

  // Handle export
  const handleExport = () => {
    toast({
      title: "Exporting data",
      description: "The report will be generated shortly."
    });
  };

  // Handle report
  const handleGenerateReport = () => {
    toast({
      title: "Report generated",
      description: "The complete maintenance report has been generated."
    });
  };

  // Get pending maintenance
  const pendingMaintenance = filteredData.filter(m => m.status !== StatusManutencao.CONCLUIDA);

  return (
    <div className="space-y-8">
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

      {/* Maintenance History Section */}
      <MaintenanceHistorySection
        data={maintenanceItems}
        onEdit={handleEditMaintenance}
        onDelete={handleDeleteMaintenance}
        onReport={handleGenerateReport}
      />
      
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
