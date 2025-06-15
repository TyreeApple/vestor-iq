
import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from "@/components/ui/button";
import { StatusCertificacao, User, FuncaoOperador } from '@/types';
import { Filter, Search, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import OperatorDialog from '@/components/operators/OperatorDialog';
import OperatorDetails from '@/components/operators/OperatorDetails';
import OperatorCard from '@/components/operators/OperatorCard';
import { useToast } from '@/hooks/use-toast';

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
  const [search, setSearch] = useState('');
  const [role, setRole] = useState<string>('all');
  const [certStatus, setCertStatus] = useState<string>('all');
  const [operators, setOperators] = useState<User[]>(initialOperators);
  
  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState<User | null>(null);
  
  // Filter operators based on search and filters
  const filteredOperators = operators.filter(operator => {
    // Search filter
    const matchesSearch = (operator.name || operator.nome || '').toLowerCase().includes(search.toLowerCase()) || 
                          operator.id.toLowerCase().includes(search.toLowerCase());
    
    // Role filter
    const matchesRole = role === 'all' || 
                       (role === 'operator' && (operator.role === FuncaoOperador.OPERADOR || operator.funcao === FuncaoOperador.OPERADOR)) ||
                       (role === 'supervisor' && (operator.role === FuncaoOperador.SUPERVISOR || operator.funcao === FuncaoOperador.SUPERVISOR));
    
    // Certificate status filter
    const matchesCertStatus = certStatus === 'all' || 
                             (certStatus === 'regular' && 
                              operator.asoStatus === StatusCertificacao.VALIDO && 
                              operator.nrStatus === StatusCertificacao.VALIDO) ||
                             (certStatus === 'warning' && 
                              (operator.asoStatus === StatusCertificacao.VENCENDO || 
                               operator.nrStatus === StatusCertificacao.VENCENDO)) ||
                             (certStatus === 'expired' && 
                              (operator.asoStatus === StatusCertificacao.VENCIDO || 
                               operator.nrStatus === StatusCertificacao.VENCIDO));
    
    return matchesSearch && matchesRole && matchesCertStatus;
  });

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

  return (
    <div className="space-y-6">
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
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleFilterToggle}
          >
            <Filter className="w-4 h-4" />
            Filtrar
          </Button>
          <Button 
            className="gap-2"
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
      
      {/* Filter options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Função</h4>
          <select 
            className="w-full p-2 rounded-md border border-input bg-background"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="operator">Operadores</option>
            <option value="supervisor">Supervisores</option>
          </select>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Status de Certificação</h4>
          <select 
            className="w-full p-2 rounded-md border border-input bg-background"
            value={certStatus}
            onChange={(e) => setCertStatus(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="regular">Regular</option>
            <option value="warning">Próximo do Vencimento</option>
            <option value="expired">Vencido</option>
          </select>
        </div>
      </div>
      
      {/* Operators grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredOperators.map((operator) => (
          <OperatorCard
            key={operator.id}
            operator={operator}
            onClick={() => handleViewDetails(operator)}
            onDelete={() => handleDeleteOperator(operator.id)}
          />
        ))}
      </div>

      {filteredOperators.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum operador encontrado</p>
        </div>
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
