
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  Activity, 
  Search,
  Filter,
  RefreshCw,
  Eye,
  Plus,
  AlertCircle
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import ModernKpiCard from '@/components/dashboard/ModernKpiCard';

// Mock market data
const marketData = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 175.84,
    change: 2.45,
    changePercent: 1.41,
    volume: '52.3M',
    marketCap: '2.8T',
    sector: 'Technology'
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 142.56,
    change: -1.23,
    changePercent: -0.86,
    volume: '28.1M',
    marketCap: '1.8T',
    sector: 'Technology'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    price: 378.91,
    change: 5.67,
    changePercent: 1.52,
    volume: '31.4M',
    marketCap: '2.9T',
    sector: 'Technology'
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 248.73,
    change: -8.45,
    changePercent: -3.29,
    volume: '89.2M',
    marketCap: '791B',
    sector: 'Automotive'
  }
];

const MarketDataPage = () => {
  const [search, setSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedSort, setSelectedSort] = useState('symbol');

  const filteredData = marketData.filter(stock => 
    stock.symbol.toLowerCase().includes(search.toLowerCase()) ||
    stock.name.toLowerCase().includes(search.toLowerCase())
  ).filter(stock => 
    !selectedSector || stock.sector === selectedSector
  );

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  const formatChange = (change: number) => change > 0 ? `+$${change.toFixed(2)}` : `-$${Math.abs(change).toFixed(2)}`;
  const formatPercent = (percent: number) => percent > 0 ? `+${percent.toFixed(2)}%` : `${percent.toFixed(2)}%`;

  const stats = {
    totalStocks: marketData.length,
    gainers: marketData.filter(s => s.change > 0).length,
    losers: marketData.filter(s => s.change < 0).length,
    avgChange: parseFloat((marketData.reduce((sum, s) => sum + s.changePercent, 0) / marketData.length).toFixed(2))
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
        title="Market Data"
        description="Real-time market data and trading insights"
        icon={BarChart3}
      >
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh Data
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="w-4 h-4" />
            Add Watchlist
          </Button>
        </div>
      </PageHeader>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ModernKpiCard
          title="Total Stocks"
          value={stats.totalStocks}
          icon={Activity}
          variant="default"
        />
        
        <ModernKpiCard
          title="Gainers"
          value={stats.gainers}
          icon={TrendingUp}
          variant="success"
        />
        
        <ModernKpiCard
          title="Losers"
          value={stats.losers}
          icon={TrendingDown}
          variant="danger"
        />
        
        <ModernKpiCard
          title="Avg Change"
          value={stats.avgChange}
          icon={BarChart3}
          variant="info"
        />
      </div>

      {/* Filters */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input 
                type="text" 
                placeholder="Search stocks by symbol or name..." 
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Sector Filter */}
            <div className="w-full lg:w-auto min-w-[160px]">
              <Select
                value={selectedSector || 'all'}
                onValueChange={(value) => setSelectedSector(value === 'all' ? '' : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Sectors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Automotive">Automotive</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <div className="w-full lg:w-auto min-w-[140px]">
              <Select
                value={selectedSort}
                onValueChange={setSelectedSort}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="symbol">Symbol</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="change">Change</SelectItem>
                  <SelectItem value="volume">Volume</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Data Table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" />
            Live Market Data
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Change %</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Market Cap</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((stock) => (
                <TableRow key={stock.symbol} className="hover:bg-muted/50">
                  <TableCell className="font-mono font-bold text-blue-600">
                    {stock.symbol}
                  </TableCell>
                  <TableCell>{stock.name}</TableCell>
                  <TableCell className="font-medium">
                    {formatPrice(stock.price)}
                  </TableCell>
                  <TableCell className={stock.change > 0 ? 'text-green-600' : 'text-red-600'}>
                    {formatChange(stock.change)}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={stock.changePercent > 0 ? 'default' : 'destructive'}
                      className={stock.changePercent > 0 ? 'bg-green-600' : 'bg-red-600'}
                    >
                      {formatPercent(stock.changePercent)}
                    </Badge>
                  </TableCell>
                  <TableCell>{stock.volume}</TableCell>
                  <TableCell>{stock.marketCap}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{stock.sector}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Market Alerts */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            Market Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="font-medium">High Volume Alert</p>
                  <p className="text-sm text-muted-foreground">TSLA volume 3x above average</p>
                </div>
              </div>
              <Badge variant="outline">Active</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">Price Breakout</p>
                  <p className="text-sm text-muted-foreground">AAPL broke resistance at $175</p>
                </div>
              </div>
              <Badge variant="outline">Triggered</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketDataPage;
