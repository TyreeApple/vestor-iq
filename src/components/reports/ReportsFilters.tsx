
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Calendar as CalendarIcon } from 'lucide-react';

interface ReportsFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedPeriod: string;
  setSelectedPeriod: (value: string) => void;
  selectedForklift: string;
  setSelectedForklift: (value: string) => void;
}

const ReportsFilters: React.FC<ReportsFiltersProps> = ({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  selectedPeriod,
  setSelectedPeriod,
  selectedForklift,
  setSelectedForklift
}) => {
  return (
    <Card className="overflow-hidden bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-white/20 shadow-2xl">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Buscar relatórios inteligentes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-12 bg-white/50 border-white/20 backdrop-blur-sm focus:bg-white/70 transition-all duration-300"
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40 h-12 bg-white/50 border-white/20 backdrop-blur-sm">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-xl border-white/20">
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="operacoes">Operações</SelectItem>
                <SelectItem value="manutencao">Manutenção</SelectItem>
                <SelectItem value="abastecimento">Abastecimento</SelectItem>
                <SelectItem value="operadores">Operadores</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-36 h-12 bg-white/50 border-white/20 backdrop-blur-sm">
                <CalendarIcon className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-xl border-white/20">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="hoje">Hoje</SelectItem>
                <SelectItem value="semana">Esta Semana</SelectItem>
                <SelectItem value="mes">Este Mês</SelectItem>
                <SelectItem value="trimestre">Trimestre</SelectItem>
                <SelectItem value="ano">Este Ano</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedForklift} onValueChange={setSelectedForklift}>
              <SelectTrigger className="w-40 h-12 bg-white/50 border-white/20 backdrop-blur-sm">
                <SelectValue placeholder="Empilhadeira" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-xl border-white/20">
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="emp-001">EMP-001</SelectItem>
                <SelectItem value="emp-002">EMP-002</SelectItem>
                <SelectItem value="emp-003">EMP-003</SelectItem>
                <SelectItem value="emp-004">EMP-004</SelectItem>
                <SelectItem value="emp-005">EMP-005</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsFilters;
