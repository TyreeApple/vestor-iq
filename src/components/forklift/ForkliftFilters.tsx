
import React from 'react';
import StandardFilters, { FilterOption } from '@/components/common/StandardFilters';

interface ForkliftFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
}

const ForkliftFilters: React.FC<ForkliftFiltersProps> = ({
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
        { value: 'operacional', label: 'Operacional' },
        { value: 'manutencao', label: 'Manutenção' },
        { value: 'inativo', label: 'Inativo' }
      ]
    },
    {
      key: 'type',
      label: 'Tipo',
      type: 'select',
      options: [
        { value: 'eletrica', label: 'Elétrica' },
        { value: 'gas', label: 'Gás' },
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
    setSelectedStatus('all');
    setSelectedType('all');
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

export default ForkliftFilters;
