import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Calendar, Filter, Fuel, Plus, Search, Truck, User } from 'lucide-react';
import { Abastecimento } from '@/types';
import GasSupplyDialog from '@/components/gas/GasSupplyDialog';
import { useToast } from '@/hooks/use-toast';

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
  const isMobile = useIsMobile();
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

  // Handle filter toggle
  const handleFilterToggle = () => {
    // This would normally open a more complex filter dialog
    toast({
      title: "Filtros",
      description: "Esta funcionalidade permitiria filtros mais avançados."
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64" // Offset for sidebar when not mobile
      )}>
        <Navbar />
        
        <main className="flex-1 px-6 py-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Abastecimento</h1>
            <p className="text-muted-foreground">Controle de Abastecimento de Gás</p>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card border rounded-lg p-4 shadow">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Total de Abastecimentos</h3>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">{filteredGasSupplies.length}</p>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
              </div>
            </div>
            
            <div className="bg-card border rounded-lg p-4 shadow">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Consumo Total (L)</h3>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">{totalConsumption.toFixed(2)}</p>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Fuel className="w-5 h-5 text-primary" />
                </div>
              </div>
            </div>
            
            <div className="bg-card border rounded-lg p-4 shadow">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Média por Abastecimento (L)</h3>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">{averageConsumption.toFixed(2)}</p>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Fuel className="w-5 h-5 text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Filter section */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                type="text" 
                placeholder="Buscar abastecimento..." 
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleFilterToggle}
                >
                  <Filter className="w-4 h-4" />
                  Filtrar
                </Button>
              </div>
              <Button 
                className="gap-2"
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
          
          {/* Filter options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Empilhadeira</h4>
              <select 
                className="w-full p-2 rounded-md border border-input bg-background"
                value={forkliftFilter}
                onChange={(e) => setForkliftFilter(e.target.value)}
              >
                <option value="all">Todas</option>
                {forklifts.map((forkliftId) => (
                  <option key={forkliftId} value={forkliftId}>{forkliftId}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Data</h4>
              <Input 
                type="date" 
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          
          {/* Gas Supply List */}
          <div className="bg-card rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="p-4 text-left font-medium text-muted-foreground">ID</th>
                    <th className="p-4 text-left font-medium text-muted-foreground">Data</th>
                    <th className="p-4 text-left font-medium text-muted-foreground">Empilhadeira</th>
                    <th className="p-4 text-left font-medium text-muted-foreground">Quantidade (L)</th>
                    <th className="p-4 text-left font-medium text-muted-foreground">Horímetro Inicial</th>
                    <th className="p-4 text-left font-medium text-muted-foreground">Horímetro Final</th>
                    <th className="p-4 text-left font-medium text-muted-foreground">Operador</th>
                    <th className="p-4 text-left font-medium text-muted-foreground">Eficiência (L/h)</th>
                    <th className="p-4 text-left font-medium text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredGasSupplies.map((supply) => (
                    <tr key={supply.id} className="hover:bg-muted/50 transition-colors">
                      <td className="p-4">{supply.id}</td>
                      <td className="p-4">{formatDate(supply.dataAbastecimento || supply.date || '')}</td>
                      <td className="p-4">
                        <div>{supply.empilhadeira?.modelo || supply.forkliftModel}</div>
                        <div className="text-xs text-muted-foreground">{supply.empilhadeiraId || supply.forkliftId}</div>
                      </td>
                      <td className="p-4">{(supply.quantidadeLitros || supply.quantity || 0).toFixed(1)}</td>
                      <td className="p-4">{supply.horimetroInicial || supply.hourMeterBefore}</td>
                      <td className="p-4">{supply.horimetroFinal || supply.hourMeterAfter}</td>
                      <td className="p-4">{supply.operador?.nome || supply.operator}</td>
                      <td className="p-4">{calculateEfficiency(supply).toFixed(2)}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedGasSupply(supply);
                              setEditDialogOpen(true);
                            }}
                          >
                            Editar
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteGasSupply(supply.id)}
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
            
            {filteredGasSupplies.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">Nenhum abastecimento encontrado</p>
              </div>
            )}
          </div>
        </main>
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
