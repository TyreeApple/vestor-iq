import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from '@/components/ui/input';
import { Search, Plus, Users, UserCheck, Clock, Award, TrendingUp, Activity } from 'lucide-react';
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

// Mock data for operators
const initialOperators: Operador[] = [
  {
    id: 'OP001',
    nome: 'Carlos Silva',
    cpf: '123.456.789-00',
    email: 'carlos@example.com',
    telefone: '(11) 99999-9999',
    funcao: FuncaoOperador.OPERADOR,
    dataAdmissao: '01/01/2020',
    turno: 'Matutino',
    setor: 'Armazém',
    certificacoes: [
      {
        id: 'C001',
        tipo: TipoCertificacao.NR11,
        numero: 'NR11-001',
        dataEmissao: '01/01/2023',
        dataVencimento: '01/01/2024',
        orgaoEmissor: 'SENAI',
        status: StatusCertificacao.VALIDO
      },
      {
        id: 'C002',
        tipo: TipoCertificacao.ASO,
        numero: 'ASO-001',
        dataEmissao: '01/06/2023',
        dataVencimento: '01/06/2024',
        orgaoEmissor: 'Clínica Ocupacional',
        status: StatusCertificacao.VALIDO
      }
    ],
    avaliacoes: [
      { id: 'A001', data: '15/10/2023', nota: 8.5, avaliador: 'João Manager', comentarios: 'Excelente desempenho', pontosMelhoria: [] },
      { id: 'A002', data: '15/09/2023', nota: 9.0, avaliador: 'João Manager', comentarios: 'Muito bom', pontosMelhoria: [] }
    ],
    horasTrabalhadas: 2000,
    produtividade: 85,
    status: StatusOperador.ATIVO
  },
  {
    id: 'OP002',
    nome: 'Maria Oliveira',
    cpf: '987.654.321-00',
    email: 'maria@example.com',
    telefone: '(11) 88888-8888',
    funcao: FuncaoOperador.SUPERVISOR,
    dataAdmissao: '15/02/2021',
    turno: 'Vespertino',
    setor: 'Produção',
    certificacoes: [
      {
        id: 'C003',
        tipo: TipoCertificacao.NR11,
        numero: 'NR11-002',
        dataEmissao: '01/01/2023',
        dataVencimento: '01/01/2024',
        orgaoEmissor: 'SENAI',
        status: StatusCertificacao.VALIDO
      },
      {
        id: 'C004',
        tipo: TipoCertificacao.ASO,
        numero: 'ASO-002',
        dataEmissao: '01/06/2023',
        dataVencimento: '01/06/2024',
        orgaoEmissor: 'Clínica Ocupacional',
        status: StatusCertificacao.VALIDO
      },
      {
        id: 'C005',
        tipo: TipoCertificacao.TREINAMENTO,
        numero: 'SUPER-001',
        dataEmissao: '01/03/2023',
        dataVencimento: '01/03/2025',
        orgaoEmissor: 'Empresa',
        status: StatusCertificacao.VALIDO
      }
    ],
    avaliacoes: [
      { id: 'A003', data: '10/10/2023', nota: 9.5, avaliador: 'Diretor RH', comentarios: 'Liderança excepcional', pontosMelhoria: [] }
    ],
    horasTrabalhadas: 1900,
    produtividade: 92,
    status: StatusOperador.ATIVO
  },
  {
    id: 'OP003',
    nome: 'João Pereira',
    cpf: '456.789.123-00',
    email: 'joao@example.com',
    telefone: '(11) 77777-7777',
    funcao: FuncaoOperador.OPERADOR,
    dataAdmissao: '10/06/2022',
    turno: 'Noturno',
    setor: 'Expedição',
    certificacoes: [
      {
        id: 'C006',
        tipo: TipoCertificacao.NR11,
        numero: 'NR11-003',
        dataEmissao: '01/01/2023',
        dataVencimento: '01/01/2024',
        orgaoEmissor: 'SENAI',
        status: StatusCertificacao.VALIDO
      }
    ],
    avaliacoes: [
      { id: 'A004', data: '20/10/2023', nota: 7.8, avaliador: 'Maria Supervisor', comentarios: 'Bom desempenho', pontosMelhoria: ['Agilidade'] }
    ],
    horasTrabalhadas: 1200,
    produtividade: 78,
    status: StatusOperador.ATIVO
  },
  {
    id: 'OP004',
    nome: 'Ana Costa',
    cpf: '321.654.987-00',
    email: 'ana@example.com',
    telefone: '(11) 66666-6666',
    funcao: FuncaoOperador.OPERADOR,
    dataAdmissao: '05/09/2021',
    turno: 'Matutino',
    setor: 'Recebimento',
    certificacoes: [
      {
        id: 'C007',
        tipo: TipoCertificacao.NR11,
        numero: 'NR11-004',
        dataEmissao: '01/01/2023',
        dataVencimento: '01/01/2024',
        orgaoEmissor: 'SENAI',
        status: StatusCertificacao.VALIDO
      },
      {
        id: 'C008',
        tipo: TipoCertificacao.ASO,
        numero: 'ASO-004',
        dataEmissao: '01/06/2023',
        dataVencimento: '01/06/2024',
        orgaoEmissor: 'Clínica Ocupacional',
        status: StatusCertificacao.VALIDO
      }
    ],
    avaliacoes: [
      { id: 'A005', data: '25/10/2023', nota: 8.2, avaliador: 'Carlos Supervisor', comentarios: 'Muito dedicada', pontosMelhoria: [] }
    ],
    horasTrabalhadas: 1800,
    produtividade: 88,
    status: StatusOperador.INATIVO
  },
  {
    id: 'OP005',
    nome: 'Pedro Santos',
    cpf: '159.753.486-00',
    email: 'pedro@example.com',
    telefone: '(11) 55555-5555',
    funcao: FuncaoOperador.OPERADOR,
    dataAdmissao: '20/03/2023',
    turno: 'Vespertino',
    setor: 'Armazém',
    certificacoes: [
      {
        id: 'C009',
        tipo: TipoCertificacao.NR11,
        numero: 'NR11-005',
        dataEmissao: '01/01/2023',
        dataVencimento: '01/01/2024',
        orgaoEmissor: 'SENAI',
        status: StatusCertificacao.VALIDO
      }
    ],
    avaliacoes: [
      { id: 'A006', data: '30/10/2023', nota: 7.5, avaliador: 'Ana Supervisor', comentarios: 'Em desenvolvimento', pontosMelhoria: ['Velocidade', 'Organização'] }
    ],
    horasTrabalhadas: 800,
    produtividade: 75,
    status: StatusOperador.ATIVO
  }
];

const OperatorsPage = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [operators, setOperators] = useState<Operador[]>(initialOperators);
  
  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState<Operador | null>(null);

  // Use filters hook
  const {
    search,
    setSearch,
    filters,
    setFilters,
    filteredData: filteredOperators,
    clearFilters
  } = useFilters({
    data: operators,
    searchFields: ['nome', 'cpf', 'email', 'setor']
  });

  // Filter configuration for advanced filters
  const filterOptions = [
    {
      key: 'status',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: StatusOperador.ATIVO, label: 'Ativo' },
        { value: StatusOperador.INATIVO, label: 'Inativo' },
        { value: StatusOperador.FERIAS, label: 'Férias' },
        { value: StatusOperador.AFASTADO, label: 'Afastado' }
      ]
    },
    {
      key: 'funcao',
      label: 'Função',
      type: 'select' as const,
      options: [
        { value: FuncaoOperador.OPERADOR, label: 'Operador' },
        { value: FuncaoOperador.SUPERVISOR, label: 'Supervisor' },
        { value: FuncaoOperador.COORDENADOR, label: 'Coordenador' },
        { value: FuncaoOperador.GERENTE, label: 'Gerente' }
      ]
    },
    {
      key: 'setor',
      label: 'Setor',
      type: 'select' as const,
      options: [
        { value: 'Armazém', label: 'Armazém' },
        { value: 'Produção', label: 'Produção' },
        { value: 'Expedição', label: 'Expedição' },
        { value: 'Recebimento', label: 'Recebimento' },
        { value: 'Manutenção', label: 'Manutenção' }
      ]
    },
    {
      key: 'turno',
      label: 'Turno',
      type: 'select' as const,
      options: [
        { value: 'Matutino', label: 'Matutino' },
        { value: 'Vespertino', label: 'Vespertino' },
        { value: 'Noturno', label: 'Noturno' }
      ]
    },
    {
      key: 'produtividade',
      label: 'Produtividade Mínima (%)',
      type: 'number' as const
    }
  ];

  // Handle save operator
  const handleSaveOperator = (operatorData: Operador) => {
    const isNewOperator = !operators.some(op => op.id === operatorData.id);
    
    if (isNewOperator) {
      setOperators(prev => [operatorData, ...prev]);
      toast({
        title: "Operador criado",
        description: "O operador foi criado com sucesso."
      });
    } else {
      setOperators(prev => 
        prev.map(op => op.id === operatorData.id ? operatorData : op)
      );
      toast({
        title: "Operador atualizado",
        description: "O operador foi atualizado com sucesso."
      });
    }
  };

  // Open details dialog
  const handleViewDetails = (operator: Operador) => {
    setSelectedOperator(operator);
    setDetailsDialogOpen(true);
  };

  // Open edit dialog from details
  const handleEditFromDetails = () => {
    setDetailsDialogOpen(false);
    setEditDialogOpen(true);
  };

  // Open edit dialog directly
  const handleEdit = (operator: Operador) => {
    setSelectedOperator(operator);
    setEditDialogOpen(true);
  };

  // Delete operator
  const handleDeleteOperator = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este operador?")) {
      setOperators(prev => prev.filter(op => op.id !== id));
      toast({
        title: "Operador excluído",
        description: "O operador foi excluído com sucesso."
      });
    }
  };

  // Get statistics
  const stats = {
    total: operators.length,
    active: operators.filter(op => op.status === StatusOperador.ATIVO).length,
    avgProductivity: operators.length > 0 ? Math.round(operators.reduce((sum, op) => sum + op.produtividade, 0) / operators.length) : 0,
    totalHours: operators.reduce((sum, op) => sum + op.horasTrabalhadas, 0)
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <PageHeader
        title="Operadores"
        description="Gestão completa da equipe de operadores"
      >
        <Button 
          className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          onClick={() => {
            setSelectedOperator(null);
            setAddDialogOpen(true);
          }}
        >
          <Plus className="w-4 h-4" />
          Novo Operador
        </Button>
      </PageHeader>

      {/* Modern Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ModernKpiCard
          title="Total de Operadores"
          value={stats.total}
          icon={Users}
          colorFrom="from-slate-600"
          colorTo="to-slate-800"
        />
        
        <ModernKpiCard
          title="Operadores Ativos"
          value={stats.active}
          icon={UserCheck}
          trend="up"
          trendValue={8}
          colorFrom="from-green-500"
          colorTo="to-emerald-600"
        />
        
        <ModernKpiCard
          title="Produtividade Média"
          value={stats.avgProductivity}
          icon={TrendingUp}
          trend="up"
          trendValue={3}
          colorFrom="from-blue-500"
          colorTo="to-cyan-600"
        />
        
        <ModernKpiCard
          title="Horas Trabalhadas"
          value={stats.totalHours}
          icon={Clock}
          colorFrom="from-orange-500"
          colorTo="to-red-600"
        />
      </div>

      {/* Enhanced Search and Filter Section */}
      <Card className="glass-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Search className="w-5 h-5" />
            Busca e Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Buscar Operador</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  type="text" 
                  placeholder="Buscar por nome, CPF, email ou setor..." 
                  className="pl-10 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <AdvancedFilters
                filters={filterOptions}
                values={filters}
                onFiltersChange={setFilters}
                onClearFilters={clearFilters}
                triggerProps={{
                  variant: "outline",
                  className: "border-border/50 text-foreground hover:bg-accent/50 hover:text-accent-foreground shadow-sm"
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operators Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            Equipe de Operadores
          </h2>
          <span className="text-sm text-muted-foreground">
            {filteredOperators.length} operador{filteredOperators.length !== 1 ? 'es' : ''} encontrado{filteredOperators.length !== 1 ? 's' : ''}
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
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Nenhum operador encontrado
              </h3>
              <p className="text-muted-foreground mb-6">
                Não há operadores que correspondam aos critérios de busca.
              </p>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="hover:bg-accent/50"
              >
                Limpar Filtros
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Operator Dialog */}
      <OperatorDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSave={handleSaveOperator}
      />
      
      {/* Edit Operator Dialog */}
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
