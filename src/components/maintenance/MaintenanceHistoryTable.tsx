
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Badge from "@/components/common/Badge";
import PaginationControls from "@/components/common/PaginationControls";
import { usePagination } from "@/hooks/usePagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  ArrowUpDown, 
  Calendar, 
  DollarSign, 
  Edit, 
  Eye, 
  FileText, 
  Filter, 
  MoreVertical, 
  Search, 
  Trash2, 
  User,
  Wrench
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { OrdemServico, StatusManutencao, TipoManutencao, PrioridadeOperacao } from '@/types';

interface MaintenanceHistoryTableProps {
  data: OrdemServico[];
  onEdit: (maintenance: OrdemServico) => void;
  onDelete: (id: string) => void;
  onView?: (maintenance: OrdemServico) => void;
}

type SortField = 'id' | 'dataAbertura' | 'dataConclusao' | 'custos.total' | 'prioridade';
type SortDirection = 'asc' | 'desc';

const MaintenanceHistoryTable: React.FC<MaintenanceHistoryTableProps> = ({
  data,
  onEdit,
  onDelete,
  onView
}) => {
  const [sortField, setSortField] = useState<SortField>('dataAbertura');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});

  // Filter and sort data
  const filteredAndSortedData = React.useMemo(() => {
    let filtered = data.filter(item => {
      const searchMatch = searchTerm === '' || 
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.empilhadeira?.modelo || item.forkliftModel || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.problema.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.reportedBy || '').toLowerCase().includes(searchTerm.toLowerCase());

      const columnMatch = Object.entries(columnFilters).every(([column, filter]) => {
        if (!filter) return true;
        
        switch (column) {
          case 'status':
            return item.status.toLowerCase().includes(filter.toLowerCase());
          case 'tipo':
            return item.tipo.toLowerCase().includes(filter.toLowerCase());
          case 'prioridade':
            return item.prioridade.toLowerCase().includes(filter.toLowerCase());
          default:
            return true;
        }
      });

      return searchMatch && columnMatch;
    });

    // Sort data
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case 'custos.total':
          aValue = a.custos?.total || 0;
          bValue = b.custos?.total || 0;
          break;
        case 'dataAbertura':
          aValue = new Date(a.dataAbertura || a.reportedDate || '');
          bValue = new Date(b.dataAbertura || b.reportedDate || '');
          break;
        case 'dataConclusao':
          aValue = new Date(a.dataConclusao || '');
          bValue = new Date(b.dataConclusao || '');
          break;
        case 'prioridade':
          const priorityOrder = { 'CRITICA': 4, 'ALTA': 3, 'NORMAL': 2, 'BAIXA': 1 };
          aValue = priorityOrder[a.prioridade as keyof typeof priorityOrder] || 0;
          bValue = priorityOrder[b.prioridade as keyof typeof priorityOrder] || 0;
          break;
        default:
          aValue = (a as any)[sortField] || '';
          bValue = (b as any)[sortField] || '';
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [data, searchTerm, columnFilters, sortField, sortDirection]);

  // Pagination
  const {
    currentPage,
    totalPages,
    paginatedData,
    canGoPrevious,
    canGoNext,
    goToPage,
    startIndex,
    endIndex
  } = usePagination({
    data: filteredAndSortedData,
    itemsPerPage: 10
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    try {
      const dateParts = dateString.split('-');
      return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    } catch (e) {
      return dateString;
    }
  };

  const getStatusVariant = (status: StatusManutencao) => {
    switch (status) {
      case StatusManutencao.ABERTA:
        return 'warning';
      case StatusManutencao.EM_ANDAMENTO:
        return 'info';
      case StatusManutencao.CONCLUIDA:
        return 'success';
      default:
        return 'default';
    }
  };

  const getPriorityVariant = (priority: PrioridadeOperacao) => {
    switch (priority) {
      case PrioridadeOperacao.CRITICA:
        return 'danger';
      case PrioridadeOperacao.ALTA:
        return 'warning';
      case PrioridadeOperacao.NORMAL:
        return 'info';
      default:
        return 'default';
    }
  };

  const getTypeIcon = (type: TipoManutencao) => {
    switch (type) {
      case TipoManutencao.PREVENTIVA:
        return <Calendar className="w-4 h-4" />;
      case TipoManutencao.CORRETIVA:
        return <Wrench className="w-4 h-4" />;
      case TipoManutencao.PREDITIVA:
        return <Eye className="w-4 h-4" />;
      default:
        return <Wrench className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar por ID, modelo, problema ou responsável..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={columnFilters.status || ''}
            onChange={(e) => setColumnFilters({ ...columnFilters, status: e.target.value })}
            className="px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Todos os Status</option>
            <option value="aberta">Aberta</option>
            <option value="andamento">Em Andamento</option>
            <option value="concluida">Concluída</option>
          </select>
          
          <select
            value={columnFilters.tipo || ''}
            onChange={(e) => setColumnFilters({ ...columnFilters, tipo: e.target.value })}
            className="px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Todos os Tipos</option>
            <option value="preventiva">Preventiva</option>
            <option value="corretiva">Corretiva</option>
            <option value="preditiva">Preditiva</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-24">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('id')}
                  className="h-auto p-0 font-medium"
                >
                  ID
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Empilhadeira</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Problema</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('dataAbertura')}
                  className="h-auto p-0 font-medium"
                >
                  Data Abertura
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('dataConclusao')}
                  className="h-auto p-0 font-medium"
                >
                  Data Conclusão
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('custos.total')}
                  className="h-auto p-0 font-medium"
                >
                  Custo
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="w-20">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((maintenance) => (
              <TableRow key={maintenance.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium">#{maintenance.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{maintenance.empilhadeira?.modelo || maintenance.forkliftModel}</p>
                    <p className="text-xs text-muted-foreground">{maintenance.empilhadeiraId || maintenance.forkliftId}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(maintenance.tipo)}
                    <span className="capitalize text-sm">{maintenance.tipo.toLowerCase()}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs">
                    <p className="truncate text-sm" title={maintenance.problema}>
                      {maintenance.problema}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(maintenance.status) as any} size="sm">
                    {maintenance.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getPriorityVariant(maintenance.prioridade) as any} size="sm">
                    {maintenance.prioridade}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{maintenance.reportedBy || 'Sistema'}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{formatDate(maintenance.dataAbertura || maintenance.reportedDate || '')}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{formatDate(maintenance.dataConclusao || '')}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {maintenance.custos?.total ? 
                        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(maintenance.custos.total) : 
                        'R$ 0,00'
                      }
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      {onView && (
                        <DropdownMenuItem onClick={() => onView(maintenance)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Visualizar
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => onEdit(maintenance)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="w-4 h-4 mr-2" />
                        Relatório
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDelete(maintenance.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {paginatedData.length === 0 && (
          <div className="p-8 text-center">
            <Wrench className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">Nenhuma manutenção encontrada</h3>
            <p className="text-sm text-muted-foreground">
              {searchTerm || Object.values(columnFilters).some(f => f) 
                ? "Tente ajustar os filtros de busca" 
                : "Não há registros de manutenção no histórico"
              }
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={filteredAndSortedData.length}
        />
      )}
    </div>
  );
};

export default MaintenanceHistoryTable;
