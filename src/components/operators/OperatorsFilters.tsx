
import React from 'react';
import StandardFilters, { FilterOption } from '@/components/common/StandardFilters';

interface OperatorsFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  selectedFunction: string;
  setSelectedFunction: (value: string) => void;
}

const OperatorsFilters: React.FC<OperatorsFiltersProps> = ({
  search,
  setSearch,
  selectedStatus,
  setSelectedStatus,
  selectedFunction,
  setSelectedFunction
}) => {
  const filters: FilterOption[] = [
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'ativo', label: 'Ativo' },
        { value: 'inativo', label: 'Inativo' },
        { value: 'treinamento', label: 'Em Treinamento' }
      ]
    },
    {
      key: 'function',
      label: 'Função',
      type: 'select',
      options: [
        { value: 'operador-senior', label: 'Operador Sênior' },
        { value: 'operador-junior', label: 'Operador Júnior' },
        { value: 'supervisor', label: 'Supervisor' },
        { value: 'trainee', label: 'Trainee' }
      ]
    }
  ];

  const filterValues = {
    status: selectedStatus,
    function: selectedFunction
  };

  const handleFilterChange = (key: string, value: string) => {
    switch (key) {
      case 'status':
        setSelectedStatus(value);
        break;
      case 'function':
        setSelectedFunction(value);
        break;
    }
  };

  const handleClearFilters = () => {
    setSearch('');
    setSelectedStatus('all');
    setSelectedFunction('all');
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

export default OperatorsFilters;
