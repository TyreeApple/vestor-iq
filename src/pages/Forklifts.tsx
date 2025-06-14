import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Forklift, StatusEmpilhadeira, TipoEmpilhadeira } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Search } from 'lucide-react';
import ForkliftList from '@/components/forklift/ForkliftList';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import ForkliftDialog from '@/components/forklift/ForkliftDialog';
import ForkliftDetails from '@/components/forklift/ForkliftDetails';
import { useToast } from '@/hooks/use-toast';

// Mock data for the forklifts
const initialForklifts: Forklift[] = [
  {
    id: 'G001',
    modelo: 'Toyota 8FGU25',
    marca: 'Toyota',
    tipo: TipoEmpilhadeira.GAS,
    status: StatusEmpilhadeira.OPERACIONAL,
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
    qrCode: 'QR001',
    // Legacy properties for compatibility
    model: 'Toyota 8FGU25',
    type: TipoEmpilhadeira.GAS,
    capacity: '2.500 kg',
    acquisitionDate: '10/05/2022',
    lastMaintenance: '15/09/2023',
    hourMeter: 12583,
  },
  {
    id: 'E002',
    modelo: 'Hyster E50XN',
    marca: 'Hyster',
    tipo: TipoEmpilhadeira.ELETRICA,
    status: StatusEmpilhadeira.OPERACIONAL,
    capacidade: 2250,
    anoFabricacao: 2021,
    dataAquisicao: '22/11/2021',
    numeroSerie: 'HYS002',
    horimetro: 8452,
    ultimaManutencao: '30/10/2023',
    proximaManutencao: '30/01/2024',
    localizacaoAtual: 'Setor B',
    setor: 'Produção',
    custoHora: 38.75,
    eficiencia: 89.2,
    disponibilidade: 94.1,
    qrCode: 'QR002',
    // Legacy properties for compatibility
    model: 'Hyster E50XN',
    type: TipoEmpilhadeira.ELETRICA,
    capacity: '2.250 kg',
    acquisitionDate: '22/11/2021',
    lastMaintenance: '30/10/2023',
    hourMeter: 8452,
  },
  {
    id: 'R003',
    modelo: 'Crown RR5725',
    marca: 'Crown',
    tipo: TipoEmpilhadeira.RETRATIL,
    status: StatusEmpilhadeira.EM_MANUTENCAO,
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
    qrCode: 'QR003',
    // Legacy properties for compatibility
    model: 'Crown RR5725',
    type: TipoEmpilhadeira.RETRATIL,
    capacity: '1.800 kg',
    acquisitionDate: '04/03/2022',
    lastMaintenance: '12/08/2023',
    hourMeter: 10974,
  },
  {
    id: 'G004',
    modelo: 'Yale GLP050',
    marca: 'Yale',
    tipo: TipoEmpilhadeira.GAS,
    status: StatusEmpilhadeira.PARADA,
    capacidade: 2200,
    anoFabricacao: 2022,
    dataAquisicao: '18/07/2022',
    numeroSerie: 'YAL004',
    horimetro: 6782,
    ultimaManutencao: '05/11/2023',
    proximaManutencao: '05/14/2024',
    localizacaoAtual: 'Setor C',
    setor: 'Armazém',
    custoHora: 40.25,
    eficiencia: 86.8,
    disponibilidade: 91.5,
    qrCode: 'QR004',
    // Legacy properties for compatibility
    model: 'Yale GLP050',
    type: TipoEmpilhadeira.GAS,
    capacity: '2.200 kg',
    acquisitionDate: '18/07/2022',
    lastMaintenance: '05/11/2023',
    hourMeter: 6782,
  },
  {
    id: 'E005',
    modelo: 'Toyota 8FBMT30',
    marca: 'Toyota',
    tipo: TipoEmpilhadeira.ELETRICA,
    status: StatusEmpilhadeira.OPERACIONAL,
    capacidade: 3000,
    anoFabricacao: 2023,
    dataAquisicao: '25/02/2023',
    numeroSerie: 'TOY005',
    horimetro: 3209,
    ultimaManutencao: '10/11/2023',
    proximaManutencao: '10/14/2024',
    localizacaoAtual: 'Setor D',
    setor: 'Produção',
    custoHora: 42.50,
    eficiencia: 88.1,
    disponibilidade: 93.2,
    qrCode: 'QR005',
    // Legacy properties for compatibility
    model: 'Toyota 8FBMT30',
    type: TipoEmpilhadeira.ELETRICA,
    capacity: '3.000 kg',
    acquisitionDate: '25/02/2023',
    lastMaintenance: '10/11/2023',
    hourMeter: 3209,
  },
  {
    id: 'G006',
    modelo: 'Caterpillar DP40',
    marca: 'Caterpillar',
    tipo: TipoEmpilhadeira.GAS,
    status: StatusEmpilhadeira.OPERACIONAL,
    capacidade: 4000,
    anoFabricacao: 2021,
    dataAquisicao: '12/08/2021',
    numeroSerie: 'CAT006',
    horimetro: 15842,
    ultimaManutencao: '22/09/2023',
    proximaManutencao: '22/12/2024',
    localizacaoAtual: 'Oficina',
    setor: 'Manutenção',
    custoHora: 45.00,
    eficiencia: 89.0,
    disponibilidade: 95.0,
    qrCode: 'QR006',
    // Legacy properties for compatibility
    model: 'Caterpillar DP40',
    type: TipoEmpilhadeira.GAS,
    capacity: '4.000 kg',
    acquisitionDate: '12/08/2021',
    lastMaintenance: '22/09/2023',
    hourMeter: 15842,
  },
  {
    id: 'R007',
    modelo: 'Jungheinrich ETR340',
    marca: 'Jungheinrich',
    tipo: TipoEmpilhadeira.RETRATIL,
    status: StatusEmpilhadeira.PARADA,
    capacidade: 1400,
    anoFabricacao: 2022,
    dataAquisicao: '30/05/2022',
    numeroSerie: 'JUN007',
    horimetro: 7632,
    ultimaManutencao: '17/10/2023',
    proximaManutencao: '17/12/2024',
    localizacaoAtual: 'Setor E',
    setor: 'Armazém',
    custoHora: 39.00,
    eficiencia: 84.5,
    disponibilidade: 90.0,
    qrCode: 'QR007',
    // Legacy properties for compatibility
    model: 'Jungheinrich ETR340',
    type: TipoEmpilhadeira.RETRATIL,
    capacity: '1.400 kg',
    acquisitionDate: '30/05/2022',
    lastMaintenance: '17/10/2023',
    hourMeter: 7632,
  },
  {
    id: 'E008',
    modelo: 'Linde E20PH',
    marca: 'Linde',
    tipo: TipoEmpilhadeira.ELETRICA,
    status: StatusEmpilhadeira.MAINTENANCE,
    capacidade: 2000,
    anoFabricacao: 2022,
    dataAquisicao: '05/11/2022',
    numeroSerie: 'LIN008',
    horimetro: 5216,
    ultimaManutencao: '01/11/2023',
    proximaManutencao: '01/14/2024',
    localizacaoAtual: 'Setor F',
    setor: 'Produção',
    custoHora: 41.00,
    eficiencia: 87.0,
    disponibilidade: 92.0,
    qrCode: 'QR008',
    // Legacy properties for compatibility
    model: 'Linde E20PH',
    type: TipoEmpilhadeira.ELETRICA,
    capacity: '2.000 kg',
    acquisitionDate: '05/11/2022',
    lastMaintenance: '01/11/2023',
    hourMeter: 5216,
  },
];

const ForkliftsPage = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [forklifts, setForklifts] = useState<Forklift[]>(initialForklifts);
  const [currentDate, setCurrentDate] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<StatusEmpilhadeira | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<TipoEmpilhadeira | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedForklift, setSelectedForklift] = useState<Forklift | null>(null);
  
  React.useEffect(() => {
    // Set current date in Brazilian format
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    const dateStr = now.toLocaleDateString('pt-BR', options);
    // First letter uppercase
    setCurrentDate(dateStr.charAt(0).toUpperCase() + dateStr.slice(1));
  }, []);

  // Filter forklifts based on status, type, and search query
  const filteredForklifts = forklifts.filter(forklift => {
    // Status filter
    if (statusFilter !== 'all' && forklift.status !== statusFilter) {
      return false;
    }
    
    // Type filter
    if (typeFilter !== 'all' && forklift.tipo !== typeFilter) {
      return false;
    }
    
    // Search query
    if (searchQuery && !forklift.id.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !forklift.modelo.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Handle add/edit forklift
  const handleSaveForklift = (forkliftData: Forklift) => {
    if (editDialogOpen) {
      // Update existing forklift
      setForklifts(prev => 
        prev.map(f => f.id === forkliftData.id ? forkliftData : f)
      );
    } else {
      // Add new forklift
      setForklifts(prev => [...prev, forkliftData]);
    }
  };

  // Handle forklift click
  const handleForkliftClick = (id: string) => {
    const forklift = forklifts.find(f => f.id === id);
    if (forklift) {
      setSelectedForklift(forklift);
      setDetailsDialogOpen(true);
    }
  };

  // Handle edit from details view
  const handleEditFromDetails = () => {
    setDetailsDialogOpen(false);
    setEditDialogOpen(true);
  };

  // Handle delete forklift
  const handleDeleteForklift = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta empilhadeira?")) {
      setForklifts(prev => prev.filter(f => f.id !== id));
      toast({
        title: "Empilhadeira excluída",
        description: "A empilhadeira foi excluída com sucesso."
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64" // Offset for sidebar when not mobile
      )}>
        <Navbar 
          title="Empilhadeiras" 
          subtitle={currentDate}
        />
        
        <main className="flex-1 px-6 py-6">
          {/* Header with actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold">Gerenciamento de Empilhadeiras</h1>
              <p className="text-muted-foreground">Gerencie sua frota de empilhadeiras</p>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex gap-2 items-center"
                onClick={() => toast({
                  title: "Filtros avançados",
                  description: "Esta funcionalidade permitiria filtros mais avançados."
                })}
              >
                <Filter size={16} />
                Filtrar
              </Button>
              <Button 
                className="flex gap-2 items-center"
                onClick={() => {
                  setSelectedForklift(null);
                  setAddDialogOpen(true);
                }}
              >
                <Plus size={16} />
                Nova Empilhadeira
              </Button>
            </div>
          </div>
          
          {/* Search and filters */}
          <div className="glass-card p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="text"
                  placeholder="Buscar por ID ou modelo..."
                  className="pl-10 h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Status filter */}
              <div>
                <select 
                  className="h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as StatusEmpilhadeira | 'all')}
                >
                  <option value="all">Todos os Status</option>
                  <option value={StatusEmpilhadeira.OPERACIONAL}>{StatusEmpilhadeira.OPERACIONAL}</option>
                  <option value={StatusEmpilhadeira.EM_MANUTENCAO}>{StatusEmpilhadeira.EM_MANUTENCAO}</option>
                  <option value={StatusEmpilhadeira.PARADA}>{StatusEmpilhadeira.PARADA}</option>
                </select>
              </div>
              
              {/* Type filter */}
              <div>
                <select 
                  className="h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as TipoEmpilhadeira | 'all')}
                >
                  <option value="all">Todos os Tipos</option>
                  <option value={TipoEmpilhadeira.GAS}>{TipoEmpilhadeira.GAS}</option>
                  <option value={TipoEmpilhadeira.ELETRICA}>{TipoEmpilhadeira.ELETRICA}</option>
                  <option value={TipoEmpilhadeira.RETRATIL}>{TipoEmpilhadeira.RETRATIL}</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Forklift list */}
          <div className="slide-enter">
            <ForkliftList 
              forklifts={filteredForklifts}
              onForkliftClick={handleForkliftClick}
              onDeleteForklift={handleDeleteForklift}
            />
            
            {/* Pagination */}
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </main>
      </div>
      
      {/* Add/Edit Forklift Dialog */}
      <ForkliftDialog 
        open={addDialogOpen} 
        onOpenChange={setAddDialogOpen}
        onSave={handleSaveForklift}
      />
      
      <ForkliftDialog 
        open={editDialogOpen} 
        onOpenChange={setEditDialogOpen}
        forklift={selectedForklift || undefined}
        onSave={handleSaveForklift}
      />
      
      {/* Forklift Details Dialog */}
      <ForkliftDetails
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        forklift={selectedForklift}
        onEdit={handleEditFromDetails}
      />
    </div>
  );
};

export default ForkliftsPage;
