
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

  // Handle add/edit optimization
  const handleSaveOptimization = (maintenanceData: OrdemServico) => {
    if (editDialogOpen && selectedMaintenance) {
      updateOrdemServico(maintenanceData.id, maintenanceData);
      toast({
        title: "Optimization updated",
        description: "The optimization data has been updated successfully."
      });
    } else {
      addOrdemServico(maintenanceData);
      toast({
        title: "Optimization created",
        description: "New optimization order created successfully."
      });
    }
    setAddDialogOpen(false);
    setEditDialogOpen(false);
    setSelectedMaintenance(null);
  };

  // Handle edit optimization
  const handleEditOptimization = (maintenance: OrdemServico) => {
    setSelectedMaintenance(maintenance);
    setEditDialogOpen(true);
  };

  // Handle delete optimization
  const handleDeleteOptimization = (id: string) => {
    if (confirm("Are you sure you want to delete this optimization record?")) {
      deleteOrdemServico(id);
      toast({
        title: "Optimization deleted",
        description: "The optimization record has been deleted successfully."
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
      description: `Optimization status changed to ${newStatus}.`
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
      description: "The complete optimization report has been generated."
    });
  };

  // Get pending optimizations
  const pendingOptimizations = filteredData.filter(m => m.status !== StatusManutencao.CONCLUIDA);

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
      
      {/* Pending Optimizations Section */}
      <MaintenancePendingSection
        pendingMaintenance={pendingOptimizations}
        onEdit={handleEditOptimization}
        onDelete={handleDeleteOptimization}
        onStatusChange={handleStatusChange}
      />

      {/* Optimization History Section */}
      <MaintenanceHistorySection
        data={maintenanceItems}
        onEdit={handleEditOptimization}
        onDelete={handleDeleteOptimization}
        onReport={handleGenerateReport}
      />
      
      {/* Add/Edit Optimization Dialog */}
      <MaintenanceDialog 
        open={addDialogOpen} 
        onOpenChange={setAddDialogOpen}
        onSave={handleSaveOptimization}
        availableForklifts={availableForklifts}
        availableOperators={availableOperators}
      />
      <MaintenanceDialog 
        open={editDialogOpen} 
        onOpenChange={setEditDialogOpen}
        maintenance={selectedMaintenance || undefined}
        onSave={handleSaveOptimization}
        availableForklifts={availableForklifts}
        availableOperators={availableOperators}
      />
    </div>
  );
};

export default MaintenancePage;
