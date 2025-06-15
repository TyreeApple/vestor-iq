import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Filter, Fuel, Plus, Search, Truck, User, TrendingUp, TrendingDown, Gauge, Droplets, Clock, MapPin, Wrench, Eye, Edit, Trash2, X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Abastecimento, StatusOperador } from '@/types';
import GasSupplyDialog from '@/components/gas/GasSupplyDialog';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import AdvancedFilters from '@/components/common/AdvancedFilters';

// Mock data for gas supplies - fixed to match Portuguese interface
const initialGasSupplies: Abastecimento[] = [
  {
    id: 'GS001',
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
      status: StatusOperador.ATIVO
    },
    dataAbastecimento: '2023-11-20',
    horimetroInicial: 12500,
    horimetroFinal: 12583,
    quantidadeLitros: 30.5,
    custoTotal: 150.50,
    precoLitro: 4.93,
    fornecedor: 'Petrobras',
    localAbastecimento: 'Posto interno',
    eficiencia: 0.37,
    // Legacy properties for compatibility
    date: '2023-11-20',
    forkliftId: 'G001',
    forkliftModel: 'Toyota 8FGU25',
    quantity: 30.5,
    hourMeterBefore: 12500,
    hourMeterAfter: 12583,
    operator: 'Carlos Silva'
  },
  {
    id: 'GS002',
    empilhadeiraId: 'G004',
    empilhadeira: {
      id: 'G004',
      modelo: 'Yale GLP050',
      marca: 'Yale',
      tipo: 'Gás' as any,
      status: 'Operacional' as any,
      capacidade: 2200,
      anoFabricacao: 2021,
      dataAquisicao: '15/08/2021',
      numeroSerie: 'YAL004',
      horimetro: 6782,
      ultimaManutencao: '10/10/2023',
      proximaManutencao: '10/01/2024',
      localizacaoAtual: 'Setor B',
      setor: 'Produção',
      custoHora: 42.00,
      eficiencia: 88.1,
      disponibilidade: 91.5,
      qrCode: 'QR004'
    },
    operadorId: 'OP003',
    operador: {
      id: 'OP003',
      nome: 'João Pereira',
      cpf: '321.654.987-00',
      email: 'joao@example.com',
      telefone: '(11) 88888-8888',
      funcao: 'Operador' as any,
      dataAdmissao: '15/03/2021',
      turno: 'Noturno',
      setor: 'Produção',
      certificacoes: [],
      avaliacoes: [],
      horasTrabalhadas: 1800,
      produtividade: 82,
      status: StatusOperador.ATIVO
    },
    dataAbastecimento: '2023-11-18',
    horimetroInicial: 6700,
    horimetroFinal: 6782,
    quantidadeLitros: 25.2,
    custoTotal: 124.24,
    precoLitro: 4.93,
    fornecedor: 'Shell',
    localAbastecimento: 'Posto externo',
    eficiencia: 0.31,
    // Legacy properties for compatibility
    date: '2023-11-18',
    forkliftId: 'G004',
    forkliftModel: 'Yale GLP050',
    quantity: 25.2,
    hourMeterBefore: 6700,
    hourMeterAfter: 6782,
    operator: 'João Pereira'
  }
];

// Mock data for available forklifts and operators
const availableForklifts = [
  { id: 'G001', model: 'Toyota 8FGU25' },
  { id: 'G004', model: 'Yale GLP050' },
  { id: 'E002', model: 'Hyster E50XN' },
  { id: 'G006', model: 'Caterpillar DP40' }
];

const availableOperators = [
  { id: 'OP001', name: 'Carlos Silva' },
  { id: 'OP002', name: 'Maria Oliveira' },
  { id: 'OP003', name: 'João Pereira' },
  { id: 'OP004', name: 'Ana Costa' },
  { id: 'SV001', name: 'Pedro Santos' }
];

const GasSupplyPage = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [gasSupplies, setGasSupplies] = useState<Abastecimento[]>(initialGasSupplies);
  const [filters, setFilters] = useState<Record<string, any>>({});

  // Quick filter states
  const [quickOperator, setQuickOperator] = useState('');
  const [quickForklift, setQuickForklift] = useState('');
  const [quickLocation, setQuickLocation] = useState('');

  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedGasSupply, setSelectedGasSupply] = useState<Abastecimento | null>(null);

  // Get unique values for filter options
  const forklifts = [...new Set(gasSupplies.map(supply => supply.empilhadeiraId || supply.forkliftId))];
  const operators = [...new Set(gasSupplies.map(supply => supply.operador?.nome || supply.operator))];
  const suppliers = [...new Set(gasSupplies.map(supply => supply.fornecedor).filter(Boolean))];
  const locations = [...new Set(gasSupplies.map(supply => supply.localAbastecimento).filter(Boolean))];

  // Define filter configuration for AdvancedFilters component
  const filterOptions = [
    {
      key: 'empilhadeiraId',
      label: 'Empilhadeira',
      type: 'select' as const,
      options: forklifts.map(id => ({ value: id, label: id }))
    },
    {
      key: 'operadorNome',
      label: 'Operador',
      type: 'select' as const,
      options: operators.map(name => ({ value: name, label: name }))
    },
    {
      key: 'fornecedor',
      label: 'Fornecedor',
      type: 'select' as const,
      options: suppliers.map(supplier => ({ value: supplier, label: supplier }))
    },
    {
      key: 'localAbastecimento',
      label: 'Local',
      type: 'select' as const,
      options: locations.map(location => ({ value: location, label: location }))
    },
    {
      key: 'dataInicial',
      label: 'Data Inicial',
      type: 'date' as const
    },
    {
      key: 'dataFinal',
      label: 'Data Final',
      type: 'date' as const
    },
    {
      key: 'quantidadeMinima',
      label: 'Quantidade Mínima (L)',
      type: 'number' as const
    },
    {
      key: 'quantidadeMaxima',
      label: 'Quantidade Máxima (L)',
      type: 'number' as const
    },
    {
      key: 'custoMinimo',
      label: 'Custo Mínimo (R$)',
      type: 'number' as const
    },
    {
      key: 'custoMaximo',
      label: 'Custo Máximo (R$)',
      type: 'number' as const
    }
  ];

  // Filter gas supplies based on search, quick filters and advanced filters
  const filteredGasSupplies = gasSupplies.filter(supply => {
    // Search filter
    const matchesSearch = search === '' || 
      (supply.empilhadeira?.modelo || supply.forkliftModel || '').toLowerCase().includes(search.toLowerCase()) || 
      (supply.operador?.nome || supply.operator || '').toLowerCase().includes(search.toLowerCase()) ||
      supply.id.toLowerCase().includes(search.toLowerCase()) ||
      (supply.fornecedor || '').toLowerCase().includes(search.toLowerCase()) ||
      (supply.dataAbastecimento || supply.date || '').toLowerCase().includes(search.toLowerCase());
    
    // Quick filters
    const matchesQuickOperator = quickOperator === '' || quickOperator === 'all' || 
      (supply.operador?.nome || supply.operator) === quickOperator;
    
    const matchesQuickForklift = quickForklift === '' || quickForklift === 'all' || 
      (supply.empilhadeiraId || supply.forkliftId) === quickForklift;
    
    const matchesQuickLocation = quickLocation === '' || quickLocation === 'all' || 
      supply.localAbastecimento === quickLocation;
    
    // Advanced filters
    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      if (!value || value === '' || value === 'all') return true;
      
      switch (key) {
        case 'empilhadeiraId':
          return supply.empilhadeiraId === value || supply.forkliftId === value;
        case 'operadorNome':
          return supply.operador?.nome === value || supply.operator === value;
        case 'fornecedor':
          return supply.fornecedor === value;
        case 'localAbastecimento':
          return supply.localAbastecimento === value;
        case 'dataInicial':
          const supplyDate = supply.dataAbastecimento || supply.date || '';
          return supplyDate >= value;
        case 'dataFinal':
          const supplyDate2 = supply.dataAbastecimento || supply.date || '';
          return supplyDate2 <= value;
        case 'quantidadeMinima':
          const quantity = supply.quantidadeLitros || supply.quantity || 0;
          return quantity >= parseFloat(value);
        case 'quantidadeMaxima':
          const quantity2 = supply.quantidadeLitros || supply.quantity || 0;
          return quantity2 <= parseFloat(value);
        case 'custoMinimo':
          return (supply.custoTotal || 0) >= parseFloat(value);
        case 'custoMaximo':
          return (supply.custoTotal || 0) <= parseFloat(value);
        default:
          return true;
      }
    });

    return matchesSearch && matchesQuickOperator && matchesQuickForklift && matchesQuickLocation && matchesFilters;
  });

  // Clear all filters
  const clearAllFilters = () => {
    setSearch('');
    setFilters({});
    setQuickOperator('');
    setQuickForklift('');
    setQuickLocation('');
  };

  // Count active filters
  const activeFiltersCount = Object.keys(filters).filter(key => 
    filters[key] && filters[key] !== '' && filters[key] !== 'all'
  ).length + (search ? 1 : 0) + 
  (quickOperator && quickOperator !== 'all' ? 1 : 0) +
  (quickForklift && quickForklift !== 'all' ? 1 : 0) +
  (quickLocation && quickLocation !== 'all' ? 1 : 0);

  // Format date
  const formatDate = (dateString: string) => {
    const dateParts = dateString.split('-');
    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
  };
  
  // Calculate KPIs
  const totalConsumption = filteredGasSupplies.reduce((sum, supply) => sum + (supply.quantidadeLitros || supply.quantity || 0), 0);
  const totalCost = filteredGasSupplies.reduce((sum, supply) => sum + (supply.custoTotal || 0), 0);
  const averageEfficiency = filteredGasSupplies.length > 0
    ? filteredGasSupplies.reduce((sum, supply) => sum + (supply.eficiencia || 0), 0) / filteredGasSupplies.length
    : 0;

  const calculateEfficiency = (supply: Abastecimento) => {
    const initialHour = supply.horimetroInicial || supply.hourMeterBefore || 0;
    const finalHour = supply.horimetroFinal || supply.hourMeterAfter || 0;
    const quantity = supply.quantidadeLitros || supply.quantity || 0;
    const hours = finalHour - initialHour;
    return hours > 0 ? quantity / hours : 0;
  };

  // Handle add/edit gas supply
  const handleSaveGasSupply = (supplyData: Abastecimento) => {
    if (editDialogOpen) {
      // Update existing supply
      setGasSupplies(prev => 
        prev.map(s => s.id === supplyData.id ? supplyData : s)
      );
    } else {
      // Add new supply
      setGasSupplies(prev => [...prev, supplyData]);
    }
  };

  // Handle delete gas supply
  const handleDeleteGasSupply = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este abastecimento?")) {
      setGasSupplies(prev => prev.filter(s => s.id !== id));
      toast({
        title: "Abastecimento excluído",
        description: "O abastecimento foi excluído com sucesso."
      });
    }
  };

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Gestão de Abastecimento
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            Controle Inteligente de Abastecimento de Combustível
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              setSelectedGasSupply(null);
              setAddDialogOpen(true);
            }}
          >
            <Plus className="w-4 h-4" />
            Novo Abastecimento
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 border-0 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium opacity-90">Total de Abastecimentos</CardTitle>
              <Truck className="w-5 h-5 opacity-80" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{filteredGasSupplies.length}</div>
            <div className="flex items-center gap-1 mt-2 text-xs opacity-80">
              <TrendingUp className="w-3 h-3" />
              +2 esta semana
            </div>
          </CardContent>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-600 border-0 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium opacity-90">Consumo Total</CardTitle>
              <Fuel className="w-5 h-5 opacity-80" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalConsumption.toFixed(1)}L</div>
            <div className="flex items-center gap-1 mt-2 text-xs opacity-80">
              <TrendingDown className="w-3 h-3" />
              -5% vs mês anterior
            </div>
          </CardContent>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600 border-0 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium opacity-90">Custo Total</CardTitle>
              <Gauge className="w-5 h-5 opacity-80" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">R$ {totalCost.toFixed(0)}</div>
            <div className="flex items-center gap-1 mt-2 text-xs opacity-80">
              <TrendingUp className="w-3 h-3" />
              +3% vs período anterior
            </div>
          </CardContent>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-purple-600 border-0 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium opacity-90">Eficiência Média</CardTitle>
              <Droplets className="w-5 h-5 opacity-80" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{averageEfficiency.toFixed(2)}</div>
            <div className="flex items-center gap-1 mt-2 text-xs opacity-80">
              <TrendingUp className="w-3 h-3" />
              L/h por operação
            </div>
          </CardContent>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
        </Card>
      </div>

      {/* Advanced Search and Filters */}
      <Card className="shadow-xl border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg">
        <CardContent className="p-8">
          <div className="flex flex-col gap-6">
            {/* Main Search Bar */}
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                type="text" 
                placeholder="Buscar por empilhadeira, operador, ID ou fornecedor..." 
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
            
            {/* Quick Filters and Advanced Filters */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Quick Filter - Operador */}
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-green-600" />
                <Select value={quickOperator} onValueChange={setQuickOperator}>
                  <SelectTrigger className="w-[180px] border-2 border-slate-200 dark:border-slate-700 hover:border-green-300 dark:hover:border-green-600 transition-colors">
                    <SelectValue placeholder="Operador" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos Operadores</SelectItem>
                    {operators.map(operator => (
                      <SelectItem key={operator} value={operator}>
                        {operator}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {quickOperator && quickOperator !== 'all' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuickOperator('')}
                    className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/20"
                  >
                    <X className="w-3 h-3 text-red-500" />
                  </Button>
                )}
              </div>

              {/* Quick Filter - Empilhadeira */}
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600" />
                <Select value={quickForklift} onValueChange={setQuickForklift}>
                  <SelectTrigger className="w-[180px] border-2 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                    <SelectValue placeholder="Empilhadeira" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas Empilhadeiras</SelectItem>
                    {forklifts.map(forklift => (
                      <SelectItem key={forklift} value={forklift}>
                        {forklift}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {quickForklift && quickForklift !== 'all' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuickForklift('')}
                    className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/20"
                  >
                    <X className="w-3 h-3 text-red-500" />
                  </Button>
                )}
              </div>

              {/* Quick Filter - Local */}
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-600" />
                <Select value={quickLocation} onValueChange={setQuickLocation}>
                  <SelectTrigger className="w-[180px] border-2 border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600 transition-colors">
                    <SelectValue placeholder="Local" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos Locais</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {quickLocation && quickLocation !== 'all' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuickLocation('')}
                    className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/20"
                  >
                    <X className="w-3 h-3 text-red-500" />
                  </Button>
                )}
              </div>

              {/* Advanced Filters */}
              <AdvancedFilters
                filters={filterOptions}
                values={filters}
                onFiltersChange={setFilters}
                onClearFilters={() => setFilters({})}
                triggerProps={{
                  className: "gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 shadow-md border-2 border-slate-200 dark:border-slate-700"
                }}
              />
              
              {/* Clear All Filters */}
              {activeFiltersCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 shadow-md"
                  onClick={clearAllFilters}
                >
                  <X className="w-4 h-4" />
                  Limpar Todos ({activeFiltersCount})
                </Button>
              )}
            </div>
          </div>

          {/* Filter Summary */}
          {activeFiltersCount > 0 && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    {activeFiltersCount} filtro{activeFiltersCount > 1 ? 's' : ''} ativo{activeFiltersCount > 1 ? 's' : ''} • {filteredGasSupplies.length} resultado{filteredGasSupplies.length !== 1 ? 's' : ''} encontrado{filteredGasSupplies.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Gas Supply Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            Registros de Abastecimento
          </h2>
          <div className="text-sm text-muted-foreground bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            {filteredGasSupplies.length} registros encontrados
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredGasSupplies.map((supply) => (
            <Card key={supply.id} className="group hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-0 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {supply.id.slice(-2)}
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-200">
                        {supply.id}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(supply.dataAbastecimento || supply.date || '')}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      onClick={() => {
                        setSelectedGasSupply(supply);
                        setEditDialogOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4 text-blue-600" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={() => handleDeleteGasSupply(supply.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <Truck className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        {supply.empilhadeira?.modelo || supply.forkliftModel}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ID: {supply.empilhadeiraId || supply.forkliftId}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <User className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        {supply.operador?.nome || supply.operator}
                      </p>
                      <p className="text-xs text-muted-foreground">Operador</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                    <Fuel className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                      {(supply.quantidadeLitros || supply.quantity || 0).toFixed(1)}
                    </p>
                    <p className="text-xs text-muted-foreground">Litros</p>
                  </div>
                  
                  <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                    <Gauge className="w-5 h-5 mx-auto mb-1 text-green-600" />
                    <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                      {calculateEfficiency(supply).toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">L/h</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {supply.horimetroInicial || supply.hourMeterBefore} → {supply.horimetroFinal || supply.hourMeterAfter}h
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      R$ {supply.custoTotal?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredGasSupplies.length === 0 && (
          <Card className="p-12 text-center border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400">
                  Nenhum abastecimento encontrado
                </h3>
                <p className="text-muted-foreground mt-1">
                  Tente ajustar os filtros ou adicione um novo registro de abastecimento
                </p>
              </div>
              <Button 
                className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => {
                  setSelectedGasSupply(null);
                  setAddDialogOpen(true);
                }}
              >
                <Plus className="w-4 h-4" />
                Novo Abastecimento
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Add/Edit Gas Supply Dialog */}
      <GasSupplyDialog 
        open={addDialogOpen} 
        onOpenChange={setAddDialogOpen}
        onSave={handleSaveGasSupply}
        availableForklifts={availableForklifts}
        availableOperators={availableOperators}
      />
      
      <GasSupplyDialog 
        open={editDialogOpen} 
        onOpenChange={setEditDialogOpen}
        gasSupply={selectedGasSupply || undefined}
        onSave={handleSaveGasSupply}
        availableForklifts={availableForklifts}
        availableOperators={availableOperators}
      />
    </div>
  );
};

export default GasSupplyPage;
