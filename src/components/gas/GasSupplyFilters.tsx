
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

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
  return (
    <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input 
            type="text" 
            placeholder="Search by ID or trading pair..." 
            className="pl-10 bg-slate-900/50 border-slate-600/50 text-slate-100 placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <div className="w-full lg:w-auto min-w-[160px]">
          <Select
            value={selectedStatus || 'all'}
            onValueChange={(value) => setSelectedStatus(value === 'all' ? '' : value)}
          >
            <SelectTrigger className="bg-slate-900/50 border-slate-600/50 text-slate-100 hover:bg-slate-800/70 transition-colors">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="all" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">All Status</SelectItem>
              <SelectItem value="available" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Available</SelectItem>
              <SelectItem value="in-use" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">In Use</SelectItem>
              <SelectItem value="maintenance" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Type Filter */}
        <div className="w-full lg:w-auto min-w-[160px]">
          <Select
            value={selectedType || 'all'}
            onValueChange={(value) => setSelectedType(value === 'all' ? '' : value)}
          >
            <SelectTrigger className="bg-slate-900/50 border-slate-600/50 text-slate-100 hover:bg-slate-800/70 transition-colors">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="all" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">All Types</SelectItem>
              <SelectItem value="scalping" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Scalping</SelectItem>
              <SelectItem value="swing" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Swing</SelectItem>
              <SelectItem value="arbitrage" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Arbitrage</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default GasSupplyFilters;
