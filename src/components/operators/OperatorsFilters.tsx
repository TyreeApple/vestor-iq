
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

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
  return (
    <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input 
            type="text" 
            placeholder="Search by ID or name..." 
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
              <SelectItem value="active" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Active</SelectItem>
              <SelectItem value="inactive" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Inactive</SelectItem>
              <SelectItem value="training" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">In Training</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Function Filter */}
        <div className="w-full lg:w-auto min-w-[160px]">
          <Select
            value={selectedFunction || 'all'}
            onValueChange={(value) => setSelectedFunction(value === 'all' ? '' : value)}
          >
            <SelectTrigger className="bg-slate-900/50 border-slate-600/50 text-slate-100 hover:bg-slate-800/70 transition-colors">
              <SelectValue placeholder="All Functions" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="all" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">All Functions</SelectItem>
              <SelectItem value="senior-trader" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Senior Trader</SelectItem>
              <SelectItem value="junior-trader" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Junior Trader</SelectItem>
              <SelectItem value="supervisor" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Supervisor</SelectItem>
              <SelectItem value="trainee" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Trainee</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default OperatorsFilters;
