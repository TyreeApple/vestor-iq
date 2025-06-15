
import React from 'react';
import StandardFilters, { FilterOption } from '@/components/common/StandardFilters';

interface GasSupplyFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
}

const GasSupplyFilters: React.FC<GasSupplyFiltersProps> = ({
  search,
  setSearch,
  selectedStatus,
  setSelectedStatus,
  selectedType,
  setSelectedType
}) => {
  const filters: FilterOption[] = [
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'todos-status', label: 'Todos os Status' },
        { value: 'disponivel', label: 'Disponível' },
        { value: 'em-uso', label: 'Em Uso' },
        { value: 'manutencao', label: 'Manutenção' }
      ]
    },
    {
      key: 'type',
      label: 'Tipo',
      type: 'select',
      options: [
        { value: 'todos-tipos', label: 'Todos os Tipos' },
        { value: 'glp', label: 'GLP' },
        { value: 'gnv', label: 'GNV' },
        { value: 'diesel', label: 'Diesel' }
      ]
    }
  ];

  const filterValues = {
    status: selectedStatus,
    type: selectedType
  };

  const handleFilterChange = (key: string, value: string) => {
    switch (key) {
      case 'status':
        setSelectedStatus(value);
        break;
      case 'type':
        setSelectedType(value);
        break;
    }
  };

  const handleClearFilters = () => {
    setSearch('');
    setSelectedStatus('todos-status');
    setSelectedType('todos-tipos');
  };

  return (
    <StandardFilters
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Buscar por ID ou modelo..."
      filters={filters}
      filterValues={filterValues}
      onFilterChange={handleFilterChange}
      onClearFilters={handleClearFilters}
    />
  );
};

export default GasSupplyFilters;
