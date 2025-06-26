
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from '@/components/ui/input';
import { Search, Plus, Bot, CheckCircle, Clock, Award, TrendingUp, Activity, Filter, Grid3X3, List } from 'lucide-react';
import { Operador, FuncaoOperador, StatusOperador, TipoCertificacao, StatusCertificacao } from '@/types';
import { useToast } from '@/hooks/use-toast';
import OperatorDialog from '@/components/operators/OperatorDialog';
import OperatorDetails from '@/components/operators/OperatorDetails';
import OperatorCard from '@/components/operators/OperatorCard';
import AdvancedFilters from '@/components/common/AdvancedFilters';
import { useFilters } from '@/hooks/use-filters';
import PageHeader from '@/components/layout/PageHeader';
import ModernKpiCard from '@/components/dashboard/ModernKpiCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppStore } from '@/stores/useAppStore';

const AlgorithmsPage = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Use Zustand for AI algorithms data
  const operadores = useAppStore((state) => state.operadores);
  const addOperador = useAppStore((state) => state.addOperador);
  const updateOperador = useAppStore((state) => state.updateOperador);
  const deleteOperador = useAppStore((state) => state.deleteOperador);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState<Operador | null>(null);

  // Use filters hook for AI algorithms
  const {
    search,
    setSearch,
    filters,
    setFilters,
    filteredData: filteredOperators,
    clearFilters
  } = useFilters({
    data: operadores,
    searchFields: ['nome', 'cpf', 'email', 'setor']
  });

  const filterOptions = [
    {
      key: 'setor',
      label: 'Market Focus',
      type: 'select' as const,
      options: [
        { value: 'Equities', label: 'Equities' },
        { value: 'Options', label: 'Options' },
        { value: 'Forex', label: 'Forex' },
        { value: 'Crypto', label: 'Crypto' },
        { value: 'Futures', label: 'Futures' }
      ]
    },
    {
      key: 'turno',
      label: 'Trading Session',
      type: 'select' as const,
      options: [
        { value: 'Pre-Market', label: 'Pre-Market' },
        { value: 'Regular Hours', label: 'Regular Hours' },
        { value: 'After Hours', label: 'After Hours' },
        { value: '24/7', label: '24/7' }
      ]
    },
    {
      key: 'produtividade',
      label: 'Minimum Success Rate (%)',
      type: 'number' as const
    }
  ];

  // Updated handlers for AI algorithms
  const handleSaveOperator = (operatorData: Operador) => {
    const operadorExistente = operadores.some(op => op.id === operatorData.id);

    if (operadorExistente) {
      updateOperador(operatorData.id, operatorData);
      toast({
        title: "Algorithm updated",
        description: "The trading algorithm has been updated successfully."
      });
    } else {
      addOperador(operatorData);
      toast({
        title: "Algorithm deployed",
        description: "New trading algorithm has been deployed successfully."
      });
    }
  };

  const handleViewDetails = (operator: Operador) => {
    setSelectedOperator(operator);
    setDetailsDialogOpen(true);
  };

  const handleEditFromDetails = () => {
    setDetailsDialogOpen(false);
    setEditDialogOpen(true);
  };

  const handleEdit = (operator: Operador) => {
    setSelectedOperator(operator);
    setEditDialogOpen(true);
  };

  const handleDeleteOperator = (id: string) => {
    if (confirm("Are you sure you want to deactivate this algorithm?")) {
      deleteOperador(id);
      toast({
        title: "Algorithm deactivated",
        description: "The trading algorithm has been deactivated successfully."
      });
    }
  };

  // Statistics based on AI algorithms
  const stats = {
    total: operadores.length,
    active: operadores.filter(op => op.status === StatusOperador.ATIVO).length,
    avgProductivity: operadores.length > 0 ? Math.round(operadores.reduce((sum, op) => sum + op.produtividade, 0) / operadores.length) : 0,
    totalHours: operadores.reduce((sum, op) => sum + op.horasTrabalhadas, 0)
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <PageHeader
        title="AI Trading Algorithms"
        description="Manage your automated trading strategies and AI models"
      >
        <Button 
          className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          onClick={() => {
            setSelectedOperator(null);
            setAddDialogOpen(true);
          }}
        >
          <Plus className="w-4 h-4" />
          Deploy Algorithm
        </Button>
      </PageHeader>

      {/* Modern Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ModernKpiCard
          title="Total Algorithms"
          value={stats.total}
          icon={Bot}
          variant="default"
        />
        
        <ModernKpiCard
          title="Active Models"
          value={stats.active}
          icon={CheckCircle}
          variant="success"
        />
        
        <ModernKpiCard
          title="Avg Success Rate"
          value={stats.avgProductivity}
          icon={TrendingUp}
          variant="info"
        />
        
        <ModernKpiCard
          title="Runtime Hours"
          value={stats.totalHours}
          icon={Clock}
          variant="warning"
        />
      </div>

      {/* Enhanced Inline Filter Section */}
      <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input 
              type="text" 
              placeholder="Search by algorithm name or strategy..." 
              className="pl-10 bg-slate-900/50 border-slate-600/50 text-slate-100 placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="w-full lg:w-auto min-w-[160px]">
            <Select
              value={filters.status || 'all'}
              onValueChange={(value) => setFilters({ ...filters, status: value === 'all' ? '' : value })}
            >
              <SelectTrigger className="bg-slate-900/50 border-slate-600/50 text-slate-100 hover:bg-slate-800/70 transition-colors">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="all" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">All Statuses</SelectItem>
                <SelectItem value={StatusOperador.ATIVO} className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Active</SelectItem>
                <SelectItem value={StatusOperador.INATIVO} className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Inactive</SelectItem>
                <SelectItem value={StatusOperador.FERIAS} className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Paused</SelectItem>
                <SelectItem value={StatusOperador.AFASTADO} className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Function Filter */}
          <div className="w-full lg:w-auto min-w-[160px]">
            <Select
              value={filters.funcao || 'all'}
              onValueChange={(value) => setFilters({ ...filters, funcao: value === 'all' ? '' : value })}
            >
              <SelectTrigger className="bg-slate-900/50 border-slate-600/50 text-slate-100 hover:bg-slate-800/70 transition-colors">
                <SelectValue placeholder="All Algorithm Types" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="all" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">All Types</SelectItem>
                <SelectItem value={FuncaoOperador.OPERADOR} className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Basic Algorithm</SelectItem>
                <SelectItem value={FuncaoOperador.SUPERVISOR} className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Advanced AI</SelectItem>
                <SelectItem value={FuncaoOperador.COORDENADOR} className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">ML Model</SelectItem>
                <SelectItem value={FuncaoOperador.GERENTE} className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Master Strategy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Advanced Filters Button */}
          <AdvancedFilters
            filters={filterOptions}
            values={filters}
            onFiltersChange={setFilters}
            onClearFilters={clearFilters}
            triggerProps={{
              variant: "outline",
              className: "bg-slate-900/50 border-slate-600/50 text-slate-100 hover:bg-slate-800/70 hover:text-slate-100 transition-colors"
            }}
          />

          {/* View Toggle */}
          <div className="flex gap-1 p-1 bg-slate-900/50 rounded-lg border border-slate-600/50">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'text-slate-300 hover:text-slate-100 hover:bg-slate-700/50'
              }
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'text-slate-300 hover:text-slate-100 hover:bg-slate-700/50'
              }
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Algorithms Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            AI Trading Algorithms
          </h2>
          <span className="text-sm text-muted-foreground">
            {filteredOperators.length} algorithm{filteredOperators.length !== 1 ? 's' : ''} found
          </span>
        </div>

        {filteredOperators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredOperators.map((operator) => (
              <OperatorCard
                key={operator.id}
                operator={operator}
                onEdit={handleEdit}
                onViewDetails={handleViewDetails}
                onDelete={() => handleDeleteOperator(operator.id)}
              />
            ))}
          </div>
        ) : (
          <Card className="glass-card">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/30 flex items-center justify-center">
                <Bot className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No algorithms found
              </h3>
              <p className="text-muted-foreground mb-6">
                No trading algorithms match your search criteria.
              </p>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="hover:bg-accent/50"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Algorithm Dialog */}
      <OperatorDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSave={handleSaveOperator}
      />
      
      {/* Edit Algorithm Dialog */}
      <OperatorDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        operator={selectedOperator || undefined}
        onSave={handleSaveOperator}
      />
      
      {/* Algorithm Details Dialog */}
      <OperatorDetails
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        operator={selectedOperator}
        onEdit={handleEditFromDetails}
      />
    </div>
  );
};

export default AlgorithmsPage;
