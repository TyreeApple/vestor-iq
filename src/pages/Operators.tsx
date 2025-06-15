
import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from "@/components/ui/button";
import { StatusCertificacao, User, FuncaoOperador } from '@/types';
import { Search, UserPlus, Phone, Trash2, Edit, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OperatorDialog from '@/components/operators/OperatorDialog';
import OperatorDetails from '@/components/operators/OperatorDetails';
import AdvancedFilters from '@/components/common/AdvancedFilters';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import PaginationControls from '@/components/common/PaginationControls';
import { useFilters } from '@/hooks/use-filters';

// Mock data for operators
const initialOperators: User[] = [
  {
    id: 'OP001',
    nome: 'Carlos Silva',
    name: 'Carlos Silva',
    funcao: FuncaoOperador.OPERADOR,
    role: FuncaoOperador.OPERADOR,
    cpf: '123.456.789-10',
    telefone: '(11) 98765-4321',
    contact: '(11) 98765-4321',
    turno: 'Manhã',
    shift: 'Manhã',
    dataAdmissao: '15/03/2022',
    registrationDate: '15/03/2022',
    asoExpirationDate: '15/03/2024',
    nrExpirationDate: '20/05/2024',
    asoStatus: StatusCertificacao.VALIDO,
    nrStatus: StatusCertificacao.VALIDO,
    email: 'carlos.silva@empresa.com',
    setor: 'Armazém',
    certificacoes: [],
    avaliacoes: [],
    horasTrabalhadas: 1200,
    produtividade: 92.5,
    status: 'Ativo'
  },
  {
    id: 'OP002',
    nome: 'Maria Oliveira',
    name: 'Maria Oliveira',
    funcao: FuncaoOperador.OPERADOR,
    role: FuncaoOperador.OPERADOR,
    cpf: '987.654.321-00',
    telefone: '(11) 91234-5678',
    contact: '(11) 91234-5678',
    turno: 'Tarde',
    shift: 'Tarde',
    dataAdmissao: '10/06/2022',
    registrationDate: '10/06/2022',
    asoExpirationDate: '10/06/2023',
    nrExpirationDate: '15/08/2023',
    asoStatus: StatusCertificacao.VENCIDO,
    nrStatus: StatusCertificacao.VENCIDO,
    email: 'maria.oliveira@empresa.com',
    setor: 'Produção',
    certificacoes: [],
    avaliacoes: [],
    horasTrabalhadas: 980,
    produtividade: 88.3,
    status: 'Ativo'
  },
  {
    id: 'OP003',
    nome: 'João Pereira',
    name: 'João Pereira',
    funcao: FuncaoOperador.OPERADOR,
    role: FuncaoOperador.OPERADOR,
    cpf: '456.789.123-45',
    telefone: '(11) 97654-3210',
    contact: '(11) 97654-3210',
    turno: 'Noite',
    shift: 'Noite',
    dataAdmissao: '05/01/2023',
    registrationDate: '05/01/2023',
    asoExpirationDate: '05/01/2024',
    nrExpirationDate: '10/02/2024',
    asoStatus: StatusCertificacao.VENCENDO,
    nrStatus: StatusCertificacao.VALIDO,
    email: 'joao.pereira@empresa.com',
    setor: 'Logística',
    certificacoes: [],
    avaliacoes: [],
    horasTrabalhadas: 756,
    produtividade: 95.1,
    status: 'Ativo'
  },
  {
    id: 'OP004',
    nome: 'Ana Costa',
    name: 'Ana Costa',
    funcao: FuncaoOperador.OPERADOR,
    role: FuncaoOperador.OPERADOR,
    cpf: '789.123.456-78',
    telefone: '(11) 94321-8765',
    contact: '(11) 94321-8765',
    turno: 'Manhã',
    shift: 'Manhã',
    dataAdmissao: '20/04/2023',
    registrationDate: '20/04/2023',
    asoExpirationDate: '20/04/2024',
    nrExpirationDate: '25/06/2023',
    asoStatus: StatusCertificacao.VALIDO,
    nrStatus: StatusCertificacao.VENCENDO,
    email: 'ana.costa@empresa.com',
    setor: 'Expedição',
    certificacoes: [],
    avaliacoes: [],
    horasTrabalhadas: 420,
    produtividade: 91.7,
    status: 'Ativo'
  },
  {
    id: 'SV001',
    nome: 'Pedro Santos',
    name: 'Pedro Santos',
    funcao: FuncaoOperador.SUPERVISOR,
    role: FuncaoOperador.SUPERVISOR,
    cpf: '321.654.987-00',
    telefone: '(11) 95678-1234',
    contact: '(11) 95678-1234',
    turno: 'Integral',
    shift: 'Integral',
    dataAdmissao: '12/11/2021',
    registrationDate: '12/11/2021',
    asoExpirationDate: '12/11/2023',
    nrExpirationDate: '20/01/2024',
    asoStatus: StatusCertificacao.VENCENDO,
    nrStatus: StatusCertificacao.VENCENDO,
    email: 'pedro.santos@empresa.com',
    setor: 'Supervisão',
    certificacoes: [],
    avaliacoes: [],
    horasTrabalhadas: 1850,
    produtividade: 97.2,
    status: 'Ativo'
  }
];

const OperatorsPage = () => {
  const { toast } = useToast();
  const [operators, setOperators] = useState<User[]>(initialOperators);
  
  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState<User | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter configuration
  const filterOptions = [
    {
      key: 'role',
      label: 'Função',
      type: 'select' as const,
      options: [
        { value: 'OPERADOR', label: 'Operador' },
        { value: 'SUPERVISOR', label: 'Supervisor' },
        { value: 'TECNICO', label: 'Técnico' },
        { value: 'COORDENADOR', label: 'Coordenador' },
        { value: 'GERENTE', label: 'Gerente' }
      ]
    },
    {
      key: 'shift',
      label: 'Turno',
      type: 'select' as const,
      options: [
        { value: 'Manhã', label: 'Manhã' },
        { value: 'Tarde', label: 'Tarde' },
        { value: 'Noite', label: 'Noite' },
        { value: 'Integral', label: 'Integral' }
      ]
    },
    {
      key: 'setor',
      label: 'Setor',
      type: 'select' as const,
      options: [
        { value: 'Armazém', label: 'Armazém' },
        { value: 'Produção', label: 'Produção' },
        { value: 'Logística', label: 'Logística' },
        { value: 'Expedição', label: 'Expedição' },
        { value: 'Supervisão', label: 'Supervisão' }
      ]
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: 'Ativo', label: 'Ativo' },
        { value: 'Inativo', label: 'Inativo' },
        { value: 'Licença', label: 'Licença' }
      ]
    }
  ];

  // Use filters hook
  const {
    search,
    setSearch,
    filters,
    setFilters,
    filteredData: baseFilteredData,
    clearFilters,
    hasActiveFilters
  } = useFilters({
    data: operators,
    searchFields: ['name', 'nome', 'id', 'cpf', 'email']
  });

  // Additional certification status filter
  const [certStatus, setCertStatus] = useState<string>('all');

  // Apply certification status filter
  const filteredOperators = baseFilteredData.filter(operator => {
    if (certStatus === 'all') return true;
    
    if (certStatus === 'regular') {
      return operator.asoStatus === StatusCertificacao.VALIDO && 
             operator.nrStatus === StatusCertificacao.VALIDO;
    }
    
    if (certStatus === 'warning') {
      return operator.asoStatus === StatusCertificacao.VENCENDO || 
             operator.nrStatus === StatusCertificacao.VENCENDO;
    }
    
    if (certStatus === 'expired') {
      return operator.asoStatus === StatusCertificacao.VENCIDO || 
             operator.nrStatus === StatusCertificacao.VENCIDO;
    }
    
    return true;
  });

  // Get status color classes
  const getStatusBadge = (status: StatusCertificacao) => {
    switch (status) {
      case StatusCertificacao.VALIDO:
        return (
          <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 font-semibold text-xs px-2 py-1 rounded-full">
            ✓ Válido
          </Badge>
        );
      case StatusCertificacao.VENCENDO:
        return (
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 font-semibold text-xs px-2 py-1 rounded-full animate-pulse">
            ⚠ Vencendo
          </Badge>
        );
      case StatusCertificacao.VENCIDO:
        return (
          <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 font-semibold text-xs px-2 py-1 rounded-full">
            ✗ Vencido
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gradient-to-r from-slate-500 to-slate-600 text-white border-0 font-semibold text-xs px-2 py-1 rounded-full">
            {status}
          </Badge>
        );
    }
  };

  // Get role color for badge
  const getRoleBadge = (role: FuncaoOperador) => {
    const colors = {
      [FuncaoOperador.OPERADOR]: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
      [FuncaoOperador.SUPERVISOR]: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
      [FuncaoOperador.TECNICO]: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
      [FuncaoOperador.COORDENADOR]: 'bg-orange-500/20 text-orange-300 border-orange-400/30',
      [FuncaoOperador.GERENTE]: 'bg-red-500/20 text-red-300 border-red-400/30'
    };
    
    return colors[role] || 'bg-slate-500/20 text-slate-300 border-slate-400/30';
  };

  // Handle add/edit operator
  const handleSaveOperator = (operatorData: User) => {
    if (editDialogOpen) {
      // Update existing operator
      setOperators(prev => 
        prev.map(op => op.id === operatorData.id ? operatorData : op)
      );
    } else {
      // Add new operator
      setOperators(prev => [...prev, operatorData]);
    }
  };

  // Handle view operator details
  const handleViewDetails = (operator: User) => {
    setSelectedOperator(operator);
    setDetailsDialogOpen(true);
  };

  // Handle edit from details view
  const handleEditFromDetails = () => {
    setDetailsDialogOpen(false);
    setEditDialogOpen(true);
  };

  // Handle delete operator
  const handleDeleteOperator = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este operador?")) {
      setOperators(prev => prev.filter(op => op.id !== id));
      toast({
        title: "Operador excluído",
        description: "O operador foi excluído com sucesso."
      });
    }
  };

  // Handle filter toggle
  const handleFilterToggle = () => {
    toast({
      title: "Filtros",
      description: "Esta funcionalidade permitiria filtros mais avançados."
    });
  };

  // Handle clear all filters
  const handleClearAllFilters = () => {
    clearFilters();
    setCertStatus('all');
  };

  // Pagination calculations
  const totalItems = filteredOperators.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);
  const paginatedOperators = filteredOperators.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full space-y-6">
      <PageHeader
        title="Gestão de Operadores"
        subtitle="Gerencie operadores de empilhadeiras e suas certificações"
      >
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              type="text" 
              placeholder="Buscar operador..." 
              className="pl-10 bg-slate-800/60 border-slate-700/50 text-white placeholder:text-slate-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <AdvancedFilters
            filters={filterOptions}
            values={filters}
            onFiltersChange={setFilters}
            onClearFilters={handleClearAllFilters}
          />
          <Button 
            className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            onClick={() => {
              setSelectedOperator(null);
              setAddDialogOpen(true);
            }}
          >
            <UserPlus className="w-4 h-4" />
            Novo Operador
          </Button>
        </div>
      </PageHeader>
      
      {/* Enhanced filter options - using full width */}
      <div className="w-full bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-slate-200">Função</h4>
            <Select value={filters.role || 'all'} onValueChange={(value) => setFilters({...filters, role: value === 'all' ? '' : value})}>
              <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-white">
                <SelectValue placeholder="Selecione função" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="OPERADOR">Operador</SelectItem>
                <SelectItem value="SUPERVISOR">Supervisor</SelectItem>
                <SelectItem value="TECNICO">Técnico</SelectItem>
                <SelectItem value="COORDENADOR">Coordenador</SelectItem>
                <SelectItem value="GERENTE">Gerente</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-slate-200">Status de Certificação</h4>
            <Select value={certStatus} onValueChange={setCertStatus}>
              <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-white">
                <SelectValue placeholder="Status certificação" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="warning">Próximo do Vencimento</SelectItem>
                <SelectItem value="expired">Vencido</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-slate-200">Turno</h4>
            <Select value={filters.shift || 'all'} onValueChange={(value) => setFilters({...filters, shift: value === 'all' ? '' : value})}>
              <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-white">
                <SelectValue placeholder="Selecione turno" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Manhã">Manhã</SelectItem>
                <SelectItem value="Tarde">Tarde</SelectItem>
                <SelectItem value="Noite">Noite</SelectItem>
                <SelectItem value="Integral">Integral</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-slate-200">Setor</h4>
            <Select value={filters.setor || 'all'} onValueChange={(value) => setFilters({...filters, setor: value === 'all' ? '' : value})}>
              <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-white">
                <SelectValue placeholder="Selecione setor" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Armazém">Armazém</SelectItem>
                <SelectItem value="Produção">Produção</SelectItem>
                <SelectItem value="Logística">Logística</SelectItem>
                <SelectItem value="Expedição">Expedição</SelectItem>
                <SelectItem value="Supervisão">Supervisão</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-slate-200">Status</h4>
            <Select value={filters.status || 'all'} onValueChange={(value) => setFilters({...filters, status: value === 'all' ? '' : value})}>
              <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-white">
                <SelectValue placeholder="Selecione status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
                <SelectItem value="Licença">Licença</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            {(hasActiveFilters || certStatus !== 'all') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAllFilters}
                className="text-slate-400 hover:text-white hover:bg-slate-700/50 w-full"
              >
                Limpar Filtros
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Operators table - using full width */}
      <div className="w-full bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700/50">
                <TableHead className="text-slate-200 font-semibold whitespace-nowrap">ID / Nome</TableHead>
                <TableHead className="text-slate-200 font-semibold whitespace-nowrap">Função</TableHead>
                <TableHead className="text-slate-200 font-semibold whitespace-nowrap">Contato</TableHead>
                <TableHead className="text-slate-200 font-semibold whitespace-nowrap">Turno</TableHead>
                <TableHead className="text-slate-200 font-semibold whitespace-nowrap">Setor</TableHead>
                <TableHead className="text-slate-200 font-semibold whitespace-nowrap">ASO</TableHead>
                <TableHead className="text-slate-200 font-semibold whitespace-nowrap">NR-11</TableHead>
                <TableHead className="text-slate-200 font-semibold whitespace-nowrap">Admissão</TableHead>
                <TableHead className="text-slate-200 font-semibold whitespace-nowrap">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOperators.map((operator) => (
                <TableRow 
                  key={operator.id} 
                  className="border-slate-700/30 hover:bg-slate-800/40 transition-colors"
                >
                  <TableCell className="whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="font-bold text-white text-sm">{operator.id}</div>
                      <div className="text-slate-400 text-sm">{operator.name || operator.nome}</div>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge 
                      variant="outline" 
                      className={cn("border font-semibold text-xs px-2 py-1 rounded-full", getRoleBadge(operator.role || operator.funcao))}
                    >
                      {operator.role || operator.funcao}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-2 text-blue-400 text-sm">
                      <Phone className="w-3 h-3" />
                      {operator.contact || operator.telefone}
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <span className="text-slate-200 text-sm font-medium">
                      {operator.shift || operator.turno}
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <span className="text-slate-200 text-sm">
                      {operator.setor}
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="space-y-1">
                      {getStatusBadge(operator.asoStatus || StatusCertificacao.VALIDO)}
                      <div className="text-xs text-slate-400">
                        {operator.asoExpirationDate || 'N/A'}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="space-y-1">
                      {getStatusBadge(operator.nrStatus || StatusCertificacao.VALIDO)}
                      <div className="text-xs text-slate-400">
                        {operator.nrExpirationDate || 'N/A'}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <span className="text-slate-200 text-sm">
                      {operator.registrationDate || operator.dataAdmissao}
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(operator)}
                        className="h-8 w-8 p-0 text-slate-400 hover:text-blue-400 hover:bg-blue-500/20"
                        title="Ver detalhes"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedOperator(operator);
                          setEditDialogOpen(true);
                        }}
                        className="h-8 w-8 p-0 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/20"
                        title="Editar"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteOperator(operator.id)}
                        className="h-8 w-8 p-0 text-slate-400 hover:text-red-400 hover:bg-red-500/20"
                        title="Excluir"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {paginatedOperators.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400">Nenhum operador encontrado</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          canGoPrevious={currentPage > 1}
          canGoNext={currentPage < totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={totalItems}
        />
      )}
      
      {/* Add/Edit Operator Dialog */}
      <OperatorDialog 
        open={addDialogOpen} 
        onOpenChange={setAddDialogOpen}
        onSave={handleSaveOperator}
      />
      
      <OperatorDialog 
        open={editDialogOpen} 
        onOpenChange={setEditDialogOpen}
        operator={selectedOperator || undefined}
        onSave={handleSaveOperator}
      />
      
      {/* Operator Details Dialog */}
      <OperatorDetails
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        operator={selectedOperator}
        onEdit={handleEditFromDetails}
      />
    </div>
  );
};

export default OperatorsPage;
