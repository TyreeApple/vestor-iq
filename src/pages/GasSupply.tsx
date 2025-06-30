
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Filter, DollarSign, Plus, Search, TrendingUp, User, TrendingDown, Gauge, Droplets, Clock, MapPin, Wrench, Eye, Edit, Trash2, X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Abastecimento } from '@/types';
import CapitalAllocationDialog from '@/components/capital/CapitalAllocationDialog';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import AdvancedFilters from '@/components/common/AdvancedFilters';
import StandardCard from '@/components/common/StandardCard';
import { useFilters } from '@/hooks/use-filters';
import { useAppStore } from '@/stores/useAppStore';

const CapitalAllocationPage = () => {
  const { toast } = useToast();
  
  // Zustand store usage
  const capitalAllocations = useAppStore((state) => state.abastecimentos);
  const operators = useAppStore((state) => state.operadores);
  const tradingBots = useAppStore((state) => state.empilhadeiras);
  const addAbastecimento = useAppStore((state) => state.addAbastecimento);
  const updateAbastecimento = useAppStore((state) => state.updateAbastecimento);
  const deleteAbastecimento = useAppStore((state) => state.deleteAbastecimento);

  // Quick filter states
  const [quickOperator, setQuickOperator] = useState('');
  const [quickTradingBot, setQuickTradingBot] = useState('');
  const [quickMarket, setQuickMarket] = useState('');

  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCapitalAllocation, setSelectedCapitalAllocation] = useState<Abastecimento | null>(null);

  // Available options from store data
  const availableTradingBots = tradingBots.map(f => ({ id: f.id, model: f.modelo }));
  const availableOperators = operators.map(o => ({ id: o.id, name: o.nome }));

  // Get unique values for filter options
  const operatorNames = [...new Set(capitalAllocations.map(allocation => allocation.operador?.nome).filter(Boolean))];
  const tradingBotIds = [...new Set(capitalAllocations.map(allocation => allocation.empilhadeiraId))];
  const providers = [...new Set(capitalAllocations.map(allocation => allocation.fornecedor).filter(Boolean))];
  const markets = [...new Set(capitalAllocations.map(allocation => allocation.localAbastecimento).filter(Boolean))];

  // Define filter configuration for AdvancedFilters component
  const filterOptions = [
    {
      key: 'empilhadeiraId',
      label: 'Trading Bot',
      type: 'select' as const,
      options: tradingBotIds.map(id => ({ value: id, label: id }))
    },
    {
      key: 'operadorNome',
      label: 'Trader',
      type: 'select' as const,
      options: operatorNames.map(name => ({ value: name, label: name }))
    },
    {
      key: 'fornecedor',
      label: 'Broker',
      type: 'select' as const,
      options: providers.map(provider => ({ value: provider, label: provider }))
    },
    {
      key: 'localAbastecimento',
      label: 'Market',
      type: 'select' as const,
      options: markets.map(market => ({ value: market, label: market }))
    },
    {
      key: 'dataInicial',
      label: 'Start Date',
      type: 'date' as const
    },
    {
      key: 'dataFinal',
      label: 'End Date',
      type: 'date' as const
    },
    {
      key: 'quantidadeMinima',
      label: 'Minimum Amount ($)',
      type: 'number' as const
    },
    {
      key: 'quantidadeMaxima',
      label: 'Maximum Amount ($)',
      type: 'number' as const
    }
  ];

  // Use filters hook
  const {
    search,
    setSearch,
    filters,
    setFilters,
    filteredData: filteredCapitalAllocations,
    clearFilters
  } = useFilters({
    data: capitalAllocations,
    searchFields: ['empilhadeiraId', 'fornecedor', 'localAbastecimento']
  });

  // Apply additional quick filters
  const finalFilteredAllocations = filteredCapitalAllocations.filter(allocation => {
    const matchesQuickOperator = quickOperator === '' || quickOperator === 'all' || 
      allocation.operador?.nome === quickOperator;
    
    const matchesQuickTradingBot = quickTradingBot === '' || quickTradingBot === 'all' || 
      allocation.empilhadeiraId === quickTradingBot;
    
    const matchesQuickMarket = quickMarket === '' || quickMarket === 'all' || 
      allocation.localAbastecimento === quickMarket;
    
    return matchesQuickOperator && matchesQuickTradingBot && matchesQuickMarket;
  });

  // Clear all filters
  const clearAllFilters = () => {
    setSearch('');
    setFilters({});
    setQuickOperator('');
    setQuickTradingBot('');
    setQuickMarket('');
  };

  // Count active filters
  const activeFiltersCount = Object.keys(filters).filter(key => 
    filters[key] && filters[key] !== '' && filters[key] !== 'all'
  ).length + (search ? 1 : 0) + 
  (quickOperator && quickOperator !== 'all' ? 1 : 0) +
  (quickTradingBot && quickTradingBot !== 'all' ? 1 : 0) +
  (quickMarket && quickMarket !== 'all' ? 1 : 0);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  // Calculate KPIs
  const hasRealData = finalFilteredAllocations.length > 0;
  const totalCapitalAllocated = hasRealData
    ? finalFilteredAllocations.reduce((sum, allocation) => sum + allocation.quantidadeLitros, 0)
    : 0;
  const totalInvestment = hasRealData
    ? finalFilteredAllocations.reduce((sum, allocation) => sum + allocation.custoTotal, 0)
    : 0;
  const averageReturn = hasRealData
    ? finalFilteredAllocations.reduce((sum, allocation) => sum + (allocation.eficiencia || 0), 0) / finalFilteredAllocations.length
    : 0;

  const calculateReturn = (allocation: Abastecimento) => {
    const hours = allocation.horimetroFinal - allocation.horimetroInicial;
    return hours > 0 ? allocation.quantidadeLitros / hours : 0;
  };

  // Handle add/edit capital allocation
  const handleSaveCapitalAllocation = (allocationData: Abastecimento) => {
    if (editDialogOpen && selectedCapitalAllocation) {
      updateAbastecimento(allocationData.id, allocationData);
      toast({
        title: "Capital allocation updated",
        description: "The capital allocation has been updated successfully."
      });
    } else {
      addAbastecimento(allocationData);
      toast({
        title: "Capital allocation created",
        description: "New capital allocation registered successfully."
      });
    }
    setAddDialogOpen(false);
    setEditDialogOpen(false);
    setSelectedCapitalAllocation(null);
  };

  // Handle delete capital allocation
  const handleDeleteCapitalAllocation = (id: string) => {
    if (confirm("Are you sure you want to delete this capital allocation?")) {
      deleteAbastecimento(id);
      toast({
        title: "Capital allocation deleted",
        description: "The capital allocation has been deleted successfully."
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Capital Allocation Management
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            Intelligent Capital Distribution Control
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              setSelectedCapitalAllocation(null);
              setAddDialogOpen(true);
            }}
          >
            <Plus className="w-4 h-4" />
            New Capital Allocation
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StandardCard
          title="Total Allocations"
          value={hasRealData ? finalFilteredAllocations.length : 0}
          icon={TrendingUp}
          variant="info"
        />
        
        <StandardCard
          title="Total Capital"
          value={hasRealData ? `$${totalCapitalAllocated.toFixed(0)}` : "$0"}
          icon={DollarSign}
          variant="success"
        />
        
        <StandardCard
          title="Total Investment"
          value={hasRealData ? `$${totalInvestment.toFixed(0)}` : "$0"}
          icon={Gauge}
          variant="warning"
        />
        
        <StandardCard
          title="Average Return"
          value={hasRealData ? `${averageReturn.toFixed(2)}%` : "N/A"}
          icon={TrendingUp}
          variant="default"
        />
      </div>

      {/* Advanced Search and Filters */}
      <Card className="shadow-xl border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg">
        <CardContent className="p-8">
          <div className="flex flex-col gap-6">
            {/* Main Search Bar with Quick Filters */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 min-w-[300px]">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input 
                  type="text" 
                  placeholder="Search by trading bot, broker or market..." 
                  className="pl-12 pr-4 py-4 text-lg bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl shadow-lg transition-all duration-200"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/20"
                    onClick={() => setSearch('')}
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </Button>
                )}
              </div>

              {/* Quick Filter - Trader */}
              <Select value={quickOperator} onValueChange={setQuickOperator}>
                <SelectTrigger className="w-[160px] border-2 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <SelectValue placeholder="Trader" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Traders</SelectItem>
                  {operatorNames.map(operator => (
                    <SelectItem key={operator} value={operator}>
                      {operator}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Quick Filter - Trading Bot */}
              <Select value={quickTradingBot} onValueChange={setQuickTradingBot}>
                <SelectTrigger className="w-[160px] border-2 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <SelectValue placeholder="Trading Bot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Trading Bots</SelectItem>
                  {tradingBotIds.map(bot => (
                    <SelectItem key={bot} value={bot}>
                      {bot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Quick Filter - Market */}
              <Select value={quickMarket} onValueChange={setQuickMarket}>
                <SelectTrigger className="w-[160px] border-2 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <SelectValue placeholder="Market" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Markets</SelectItem>
                  {markets.map(market => (
                    <SelectItem key={market} value={market}>
                      {market}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Advanced Filters */}
              <AdvancedFilters
                filters={filterOptions}
                values={filters}
                onFiltersChange={setFilters}
                onClearFilters={clearFilters}
              />
              
              {/* Clear All Filters Button */}
              {activeFiltersCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllFilters}
                  className="gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:border-red-800 dark:hover:text-red-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear All ({activeFiltersCount})
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Capital Allocations Table */}
      <Card className="shadow-xl border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-200">
            Capital Allocations ({finalFilteredAllocations.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">Trading Bot</th>
                  <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">Trader</th>
                  <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">Amount</th>
                  <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">Market</th>
                  <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">Date</th>
                  <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {finalFilteredAllocations.map((allocation) => (
                  <tr key={allocation.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 text-slate-800 dark:text-slate-200 font-medium">{allocation.empilhadeiraId}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">{allocation.operador?.nome}</td>
                    <td className="p-4 text-slate-800 dark:text-slate-200 font-mono">${allocation.quantidadeLitros.toFixed(0)}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">{allocation.localAbastecimento}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">{formatDate(allocation.dataAbastecimento)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedCapitalAllocation(allocation);
                            setEditDialogOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCapitalAllocation(allocation.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {finalFilteredAllocations.length === 0 && (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <div className="text-6xl mb-4">💰</div>
                <h3 className="text-lg font-medium mb-2">No capital allocations found</h3>
                <p>Create a new capital allocation to get started.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Add/Edit Capital Allocation Dialog */}
      <CapitalAllocationDialog 
        open={addDialogOpen} 
        onOpenChange={setAddDialogOpen}
        onSave={handleSaveCapitalAllocation}
        availableTradingBots={availableTradingBots}
        availableOperators={availableOperators}
      />
      
      <CapitalAllocationDialog 
        open={editDialogOpen} 
        onOpenChange={setEditDialogOpen}
        capitalAllocation={selectedCapitalAllocation || undefined}
        onSave={handleSaveCapitalAllocation}
        availableTradingBots={availableTradingBots}
        availableOperators={availableOperators}
      />
    </div>
  );
};

export default CapitalAllocationPage;
