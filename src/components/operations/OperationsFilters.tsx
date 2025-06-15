
import React from 'react';
import StandardFilters, { FilterOption } from '@/components/common/StandardFilters';

interface OperationsFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  selectedOperator: string;
  setSelectedOperator: (value: string) => void;
  selectedForklift: string;
  setSelectedForklift: (value: string) => void;
  selectedLocation: string;
  setSelectedLocation: (value: string) => void;
}

const OperationsFilters: React.FC<OperationsFiltersProps> = ({
  search,
  setSearch,
  selectedOperator,
  setSelectedOperator,
  selectedForklift,
  setSelectedForklift,
  selectedLocation,
  setSelectedLocation
}) => {
  const filters: FilterOption[] = [
    {
      key: 'operator',
      label: 'Operador',
      type: 'select',
      options: [
        { value: 'joao-silva', label: 'João Silva' },
        { value: 'maria-santos', label: 'Maria Santos' },
        { value: 'pedro-oliveira', label: 'Pedro Oliveira' },
        { value: 'ana-costa', label: 'Ana Costa' }
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
    },
    {
      key: 'location',
      label: 'Local',
      type: 'select',
      options: [
        { value: 'armazem-a', label: 'Armazém A' },
        { value: 'armazem-b', label: 'Armazém B' },
        { value: 'area-externa', label: 'Área Externa' },
        { value: 'docas', label: 'Docas' }
      ]
    }
  ];

  const filterValues = {
    operator: selectedOperator,
    forklift: selectedForklift,
    location: selectedLocation
  };

  const handleFilterChange = (key: string, value: string) => {
    switch (key) {
      case 'operator':
        setSelectedOperator(value);
        break;
      case 'forklift':
        setSelectedForklift(value);
        break;
      case 'location':
        setSelectedLocation(value);
        break;
    }
  };

  const handleClearFilters = () => {
    setSearch('');
    setSelectedOperator('all');
    setSelectedForklift('all');
    setSelectedLocation('all');
  };

  return (
    <StandardFilters
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Buscar por empilhadeira, operador, ID ou responsável..."
      filters={filters}
      filterValues={filterValues}
      onFilterChange={handleFilterChange}
      onClearFilters={handleClearFilters}
    />
  );
};

export default OperationsFilters;
