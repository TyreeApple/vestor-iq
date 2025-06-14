import React, { useState } from 'react';
import { Forklift, StatusEmpilhadeira, TipoEmpilhadeira } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Search, Grid, List, Download, Upload, Truck, CheckCircle, Wrench, AlertTriangle } from 'lucide-react';
import ForkliftList from '@/components/forklift/ForkliftList';
import ForkliftCard from '@/components/forklift/ForkliftCard';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import ForkliftDialog from '@/components/forklift/ForkliftDialog';
import ForkliftDetails from '@/components/forklift/ForkliftDetails';
import AdvancedFilters from '@/components/common/AdvancedFilters';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PageHeader from '@/components/layout/PageHeader';
import PremiumSummaryCard from '@/components/dashboard/PremiumSummaryCard';

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
  }
];

const ForkliftsPage = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [forklifts, setForklifts] = useState<Forklift[]>(initialForklifts);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [statusFilter, setStatusFilter] = useState<StatusEmpilhadeira | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<TipoEmpilhadeira | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [advancedFilters, setAdvancedFilters] = useState<Record<string, any>>({});
  
  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedForklift, setSelectedForklift] = useState<Forklift | null>(null);

  // Advanced filter options
  const filterOptions = [
    {
      key: 'capacidadeMin',
      label: 'Capacidade Mínima',
      type: 'number' as const,
    },
    {
      key: 'capacidadeMax',
      label: 'Capacidade Máxima',
      type: 'number' as const,
    },
    {
      key: 'anoFabricacao',
      label: 'Ano de Fabricação',
      type: 'select' as const,
      options: [
        { value: '2021', label: '2021' },
        { value: '2022', label: '2022' },
        { value: '2023', label: '2023' },
      ],
    },
    {
      key: 'setor',
      label: 'Setor',
      type: 'select' as const,
      options: [
        { value: 'Armazém', label: 'Armazém' },
        { value: 'Produção', label: 'Produção' },
        { value: 'Manutenção', label: 'Manutenção' },
      ],
    },
  ];

  // Filter forklifts based on all filters
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

    // Advanced filters
    if (advancedFilters.capacidadeMin && forklift.capacidade < parseInt(advancedFilters.capacidadeMin)) {
      return false;
    }
    if (advancedFilters.capacidadeMax && forklift.capacidade > parseInt(advancedFilters.capacidadeMax)) {
      return false;
    }
    if (advancedFilters.anoFabricacao && forklift.anoFabricacao.toString() !== advancedFilters.anoFabricacao) {
      return false;
    }
    if (advancedFilters.setor && forklift.setor !== advancedFilters.setor) {
      return false;
    }
    
    return true;
  });

  // Calculate summary statistics
  const stats = {
    total: forklifts.length,
    operational: forklifts.filter(f => f.status === StatusEmpilhadeira.OPERACIONAL).length,
    maintenance: forklifts.filter(f => f.status === StatusEmpilhadeira.EM_MANUTENCAO).length,
    stopped: forklifts.filter(f => f.status === StatusEmpilhadeira.PARADA).length,
  };

  // Handle add/edit forklift
  const handleSaveForklift = (forkliftData: Forklift) => {
    if (editDialogOpen) {
      setForklifts(prev => 
        prev.map(f => f.id === forkliftData.id ? forkliftData : f)
      );
      toast({
        title: "Empilhadeira atualizada",
        description: "A empilhadeira foi atualizada com sucesso."
      });
    } else {
      setForklifts(prev => [...prev, forkliftData]);
      toast({
        title: "Empilhadeira adicionada",
        description: "A empilhadeira foi adicionada com sucesso."
      });
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

  // Handle export data
  const handleExportData = () => {
    toast({
      title: "Exportando dados",
      description: "Funcionalidade de exportação será implementada em breve."
    });
  };

  // Handle import data
  const handleImportData = () => {
    toast({
      title: "Importando dados",
      description: "Funcionalidade de importação será implementada em breve."
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader 
        title="Gerenciamento de Empilhadeiras"
        subtitle="Gerencie sua frota de empilhadeiras de forma inteligente"
      >
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleImportData}>
            <Upload className="w-4 h-4 mr-2" />
            Importar
          </Button>
          <Button variant="outline" onClick={handleExportData}>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button onClick={() => {
            setSelectedForklift(null);
            setAddDialogOpen(true);
          }}>
            <Plus className="w-4 h-4 mr-2" />
            Nova Empilhadeira
          </Button>
        </div>
      </PageHeader>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <PremiumSummaryCard
          title="Total"
          value={stats.total}
          icon={Truck}
          colorFrom="from-blue-900"
          colorTo="to-blue-600"
          info="Empilhadeiras"
        />
        
        <PremiumSummaryCard
          title="Operacionais"
          value={stats.operational}
          icon={CheckCircle}
          colorFrom="from-green-900"
          colorTo="to-green-600"
          info="Ativas"
        />
        
        <PremiumSummaryCard
          title="Em Manutenção"
          value={stats.maintenance}
          icon={Wrench}
          colorFrom="from-yellow-900"
          colorTo="to-yellow-600"
          info="Manutenção"
        />
        
        <PremiumSummaryCard
          title="Paradas"
          value={stats.stopped}
          icon={AlertTriangle}
          colorFrom="from-red-900"
          colorTo="to-red-600"
          info="Inativas"
        />
      </div>
      
      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-lg">Filtros e Busca</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
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
            
            {/* Type filter */}
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

            {/* Advanced filters */}
            <AdvancedFilters
              filters={filterOptions}
              values={advancedFilters}
              onFiltersChange={setAdvancedFilters}
              onClearFilters={() => setAdvancedFilters({})}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Results */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              Empilhadeiras ({filteredForklifts.length} de {forklifts.length})
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredForklifts.map((forklift) => (
                <ForkliftCard
                  key={forklift.id}
                  forklift={forklift}
                  onClick={() => handleForkliftClick(forklift.id)}
                />
              ))}
            </div>
          ) : (
            <ForkliftList 
              forklifts={filteredForklifts}
              onForkliftClick={handleForkliftClick}
              onDeleteForklift={handleDeleteForklift}
            />
          )}
          
          {filteredForklifts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-medium mb-2">Nenhuma empilhadeira encontrada</h3>
              <p>Tente ajustar os filtros ou adicionar uma nova empilhadeira.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Pagination */}
      {filteredForklifts.length > 0 && (
        <div className="flex justify-center">
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
      )}
      
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
