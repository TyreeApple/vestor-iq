
import React from 'react';
import StandardFilters, { FilterOption } from '@/components/common/StandardFilters';

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
  const filters: FilterOption[] = [
    {
      key: 'category',
      label: 'Categoria',
      type: 'select',
      options: [
        { value: 'operacoes', label: 'Operações' },
        { value: 'manutencao', label: 'Manutenção' },
        { value: 'abastecimento', label: 'Abastecimento' },
        { value: 'operadores', label: 'Operadores' }
      ]
    },
    {
      key: 'period',
      label: 'Período',
      type: 'select',
      options: [
        { value: 'hoje', label: 'Hoje' },
        { value: 'semana', label: 'Esta Semana' },
        { value: 'mes', label: 'Este Mês' },
        { value: 'trimestre', label: 'Trimestre' },
        { value: 'ano', label: 'Este Ano' }
      ]
    },
    {
      key: 'forklift',
      label: 'Empilhadeira',
      type: 'select',
      options: [
        { value: 'emp-001', label: 'EMP-001' },
        { value: 'emp-002', label: 'EMP-002' },
        { value: 'emp-003', label: 'EMP-003' },
        { value: 'emp-004', label: 'EMP-004' },
        { value: 'emp-005', label: 'EMP-005' }
      ]
    }
  ];

  const filterValues = {
    category: selectedCategory,
    period: selectedPeriod,
    forklift: selectedForklift
  };

  const handleFilterChange = (key: string, value: string) => {
    switch (key) {
      case 'category':
        setSelectedCategory(value);
        break;
      case 'period':
        setSelectedPeriod(value);
        break;
      case 'forklift':
        setSelectedForklift(value);
        break;
    }
  };

  const handleClearFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedPeriod('all');
    setSelectedForklift('all');
  };

  return (
    <StandardFilters
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Buscar relatórios inteligentes..."
      filters={filters}
      filterValues={filterValues}
      onFilterChange={handleFilterChange}
      onClearFilters={handleClearFilters}
    />
  );
};

export default ReportsFilters;
