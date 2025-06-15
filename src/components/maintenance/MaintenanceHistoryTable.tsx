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
  MoreVertical, 
  Search, 
  Trash2, 
  User,
  Wrench,
  Filter,
  SortAsc,
  SortDesc,
  Clock,
  CheckCircle,
  AlertTriangle,
  Play
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
          const priorityOrder: Record<string, number> = {};
          priorityOrder[PrioridadeOperacao.CRITICA] = 4;
          priorityOrder[PrioridadeOperacao.ALTA] = 3;
          priorityOrder[PrioridadeOperacao.NORMAL] = 2;
          priorityOrder[PrioridadeOperacao.BAIXA] = 1;
          aValue = priorityOrder[a.prioridade] || 0;
          bValue = priorityOrder[b.prioridade] || 0;
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

  const getStatusIcon = (status: StatusManutencao) => {
    switch (status) {
      case StatusManutencao.ABERTA:
        return <Clock className="w-3 h-3" />;
      case StatusManutencao.EM_ANDAMENTO:
        return <Play className="w-3 h-3" />;
      case StatusManutencao.CONCLUIDA:
        return <CheckCircle className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
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

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="ml-1 h-3 w-3 opacity-50" />;
    return sortDirection === 'asc' ? 
      <SortAsc className="ml-1 h-3 w-3 text-blue-500" /> : 
      <SortDesc className="ml-1 h-3 w-3 text-blue-500" />;
  };

  return (
    <div className="space-y-3">
      {/* Ultra Compact Search and Filters */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg p-3 shadow-lg border border-slate-700">
        <div className="space-y-2">
          {/* Compact Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Buscar por ID, modelo, problema ou responsável..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-8 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>
          
          {/* Ultra Compact Filter Controls */}
          <div className="grid grid-cols-3 gap-2">
            <select
              value={columnFilters.status || ''}
              onChange={(e) => setColumnFilters({ ...columnFilters, status: e.target.value })}
              className="w-full px-2 py-1 border border-slate-600 bg-slate-800 text-white rounded text-xs h-7 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Todos os Status</option>
              <option value="aberta">Aberta</option>
              <option value="andamento">Em Andamento</option>
              <option value="concluida">Concluída</option>
            </select>
            
            <select
              value={columnFilters.tipo || ''}
              onChange={(e) => setColumnFilters({ ...columnFilters, tipo: e.target.value })}
              className="w-full px-2 py-1 border border-slate-600 bg-slate-800 text-white rounded text-xs h-7 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Todos os Tipos</option>
              <option value="preventiva">Preventiva</option>
              <option value="corretiva">Corretiva</option>
              <option value="preditiva">Preditiva</option>
            </select>

            <select
              value={columnFilters.prioridade || ''}
              onChange={(e) => setColumnFilters({ ...columnFilters, prioridade: e.target.value })}
              className="w-full px-2 py-1 border border-slate-600 bg-slate-800 text-white rounded text-xs h-7 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Todas as Prioridades</option>
              <option value="critica">Crítica</option>
              <option value="alta">Alta</option>
              <option value="normal">Normal</option>
              <option value="baixa">Baixa</option>
            </select>
          </div>
        </div>
      </div>

      {/* Enhanced Table */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl overflow-hidden shadow-2xl border border-slate-700">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600 hover:bg-slate-700/50">
              <TableHead className="text-slate-200 font-semibold">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('id')}
                  className="h-auto p-0 font-semibold text-slate-200 hover:text-white"
                >
                  ID
                  {getSortIcon('id')}
                </Button>
              </TableHead>
              <TableHead className="text-slate-200 font-semibold">Empilhadeira</TableHead>
              <TableHead className="text-slate-200 font-semibold">Tipo</TableHead>
              <TableHead className="text-slate-200 font-semibold">Problema</TableHead>
              <TableHead className="text-slate-200 font-semibold">Status</TableHead>
              <TableHead className="text-slate-200 font-semibold">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('prioridade')}
                  className="h-auto p-0 font-semibold text-slate-200 hover:text-white"
                >
                  Prioridade
                  {getSortIcon('prioridade')}
                </Button>
              </TableHead>
              <TableHead className="text-slate-200 font-semibold">Responsável</TableHead>
              <TableHead className="text-slate-200 font-semibold">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('dataAbertura')}
                  className="h-auto p-0 font-semibold text-slate-200 hover:text-white"
                >
                  Abertura
                  {getSortIcon('dataAbertura')}
                </Button>
              </TableHead>
              <TableHead className="text-slate-200 font-semibold">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('dataConclusao')}
                  className="h-auto p-0 font-semibold text-slate-200 hover:text-white"
                >
                  Conclusão
                  {getSortIcon('dataConclusao')}
                </Button>
              </TableHead>
              <TableHead className="text-slate-200 font-semibold">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('custos.total')}
                  className="h-auto p-0 font-semibold text-slate-200 hover:text-white"
                >
                  Custo
                  {getSortIcon('custos.total')}
                </Button>
              </TableHead>
              <TableHead className="text-slate-200 font-semibold w-20">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((maintenance, index) => (
              <TableRow 
                key={maintenance.id} 
                className={cn(
                  "transition-all duration-200 border-slate-700/50",
                  index % 2 === 0 ? "bg-slate-800/30" : "bg-slate-800/50",
                  "hover:bg-slate-700/50 hover:scale-[1.01] hover:shadow-lg"
                )}
              >
                <TableCell className="font-bold text-blue-400">#{maintenance.id}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-semibold text-white">{maintenance.empilhadeira?.modelo || maintenance.forkliftModel}</p>
                    <p className="text-xs text-slate-400">{maintenance.empilhadeiraId || maintenance.forkliftId}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-slate-300">
                    {getTypeIcon(maintenance.tipo)}
                    <span className="capitalize font-medium">{maintenance.tipo.toLowerCase()}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs">
                    <p className="truncate text-slate-200 font-medium" title={maintenance.problema}>
                      {maintenance.problema}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(maintenance.status) as any} size="sm" className="gap-1">
                    {getStatusIcon(maintenance.status)}
                    {maintenance.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getPriorityVariant(maintenance.prioridade) as any} size="sm">
                    {maintenance.prioridade}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-slate-300">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{maintenance.reportedBy || 'Sistema'}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">{formatDate(maintenance.dataAbertura || maintenance.reportedDate || '')}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">{formatDate(maintenance.dataConclusao || '')}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="font-bold text-green-400">
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
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-600">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-slate-800 border-slate-700">
                      {onView && (
                        <DropdownMenuItem onClick={() => onView(maintenance)} className="text-slate-300 hover:text-white hover:bg-slate-700">
                          <Eye className="w-4 h-4 mr-2" />
                          Visualizar
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => onEdit(maintenance)} className="text-slate-300 hover:text-white hover:bg-slate-700">
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                        <FileText className="w-4 h-4 mr-2" />
                        Relatório
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDelete(maintenance.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
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
          <div className="p-12 text-center bg-slate-800/50">
            <div className="w-16 h-16 mx-auto mb-4 bg-slate-700 rounded-full flex items-center justify-center">
              <Wrench className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">Nenhuma manutenção encontrada</h3>
            <p className="text-slate-400">
              {searchTerm || Object.values(columnFilters).some(f => f) 
                ? "Tente ajustar os filtros de busca" 
                : "Não há registros de manutenção no histórico"
              }
            </p>
          </div>
        )}
      </div>

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
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
        </div>
      )}
    </div>
  );
};

export default MaintenanceHistoryTable;
