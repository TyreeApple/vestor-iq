
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Filter, Fuel, Plus, Search, Truck, User, TrendingUp, TrendingDown, Gauge, Droplets, Clock, MapPin, Wrench, Eye, Edit, Trash2 } from 'lucide-react';
import { Abastecimento, StatusOperador } from '@/types';
import GasSupplyDialog from '@/components/gas/GasSupplyDialog';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  const [forkliftFilter, setForkliftFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [gasSupplies, setGasSupplies] = useState<Abastecimento[]>(initialGasSupplies);

  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedGasSupply, setSelectedGasSupply] = useState<Abastecimento | null>(null);
  
  // Filter gas supplies based on search and filters
  const filteredGasSupplies = gasSupplies.filter(supply => {
    // Search filter - using both Portuguese and legacy properties
    const matchesSearch = (supply.empilhadeira?.modelo || supply.forkliftModel || '').toLowerCase().includes(search.toLowerCase()) || 
                          (supply.operador?.nome || supply.operator || '').toLowerCase().includes(search.toLowerCase()) ||
                          supply.id.toLowerCase().includes(search.toLowerCase());
    
    // Forklift filter
    const matchesForklift = forkliftFilter === 'all' || supply.empilhadeiraId === forkliftFilter || supply.forkliftId === forkliftFilter;
    
    // Date filter
    const matchesDate = !dateFilter || supply.dataAbastecimento === dateFilter || supply.date === dateFilter;
    
    return matchesSearch && matchesForklift && matchesDate;
  });

  // Format date
  const formatDate = (dateString: string) => {
    const dateParts = dateString.split('-');
    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
  };
  
  // Get unique forklifts for filter
  const forklifts = [...new Set(gasSupplies.map(supply => supply.empilhadeiraId || supply.forkliftId))];

  // Calculate total consumption and average
  const totalConsumption = filteredGasSupplies.reduce((sum, supply) => sum + (supply.quantidadeLitros || supply.quantity || 0), 0);
  const averageConsumption = filteredGasSupplies.length > 0 
    ? totalConsumption / filteredGasSupplies.length 
    : 0;
  const totalCost = filteredGasSupplies.reduce((sum, supply) => sum + (supply.custoTotal || 0), 0);
  const averageEfficiency = filteredGasSupplies.length > 0
    ? filteredGasSupplies.reduce((sum, supply) => sum + (supply.eficiencia || 0), 0) / filteredGasSupplies.length
    : 0;

  // Calculate efficiency (liters per hour)
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
            variant="outline" 
            className="gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 shadow-md"
          >
            <Filter className="w-4 h-4" />
            Filtros Avançados
          </Button>
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

      {/* Advanced Filters */}
      <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                type="text" 
                placeholder="Buscar por empilhadeira, operador ou ID..." 
                className="pl-10 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3 items-center">
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Empilhadeira</label>
                <Select value={forkliftFilter} onValueChange={setForkliftFilter}>
                  <SelectTrigger className="w-40 bg-white dark:bg-slate-900">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {forklifts.map((forkliftId) => (
                      <SelectItem key={forkliftId} value={forkliftId}>{forkliftId}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Data</label>
                <Input 
                  type="date" 
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-40 bg-white dark:bg-slate-900"
                />
              </div>
            </div>
          </div>
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
