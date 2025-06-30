
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

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
  return (
    <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input 
            type="text" 
            placeholder="Search by algorithm, bot, ID or responsible..." 
            className="pl-10 bg-slate-900/50 border-slate-600/50 text-slate-100 placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Operator Filter */}
        <div className="w-full lg:w-auto min-w-[160px]">
          <Select
            value={selectedOperator || 'all'}
            onValueChange={(value) => setSelectedOperator(value === 'all' ? '' : value)}
          >
            <SelectTrigger className="bg-slate-900/50 border-slate-600/50 text-slate-100 hover:bg-slate-800/70 transition-colors">
              <SelectValue placeholder="All Algorithms" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="all" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">All Algorithms</SelectItem>
              <SelectItem value="john-silva" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">John Silva</SelectItem>
              <SelectItem value="maria-santos" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Maria Santos</SelectItem>
              <SelectItem value="pedro-oliveira" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Pedro Oliveira</SelectItem>
              <SelectItem value="ana-costa" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Ana Costa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Forklift Filter */}
        <div className="w-full lg:w-auto min-w-[160px]">
          <Select
            value={selectedForklift || 'all'}
            onValueChange={(value) => setSelectedForklift(value === 'all' ? '' : value)}
          >
            <SelectTrigger className="bg-slate-900/50 border-slate-600/50 text-slate-100 hover:bg-slate-800/70 transition-colors">
              <SelectValue placeholder="All Trading Bots" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="all" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">All Trading Bots</SelectItem>
              <SelectItem value="bot-001" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">BOT-001</SelectItem>
              <SelectItem value="bot-002" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">BOT-002</SelectItem>
              <SelectItem value="bot-003" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">BOT-003</SelectItem>
              <SelectItem value="bot-004" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">BOT-004</SelectItem>
              <SelectItem value="bot-005" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">BOT-005</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location Filter */}
        <div className="w-full lg:w-auto min-w-[160px]">
          <Select
            value={selectedLocation || 'all'}
            onValueChange={(value) => setSelectedLocation(value === 'all' ? '' : value)}
          >
            <SelectTrigger className="bg-slate-900/50 border-slate-600/50 text-slate-100 hover:bg-slate-800/70 transition-colors">
              <SelectValue placeholder="All Markets" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="all" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">All Markets</SelectItem>
              <SelectItem value="nyse" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">NYSE</SelectItem>
              <SelectItem value="nasdaq" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">NASDAQ</SelectItem>
              <SelectItem value="forex" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">FOREX</SelectItem>
              <SelectItem value="crypto" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Crypto</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default OperationsFilters;
