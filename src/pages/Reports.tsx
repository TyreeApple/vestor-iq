
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, Download, FileBarChart, Filter, Search } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

const ReportsPage = () => {
  const isMobile = useIsMobile();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [reportType, setReportType] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  return (
    <div className="flex min-h-screen bg-background transition-colors duration-300">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
        <Navbar />
        
        <main className="flex-1 px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold text-foreground">Relatórios do Sistema</h1>
            
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2 border-border hover:bg-accent hover:text-accent-foreground">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filtros</span>
              </Button>
              <Button variant="outline" className="gap-2 border-border hover:bg-accent hover:text-accent-foreground">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Exportar</span>
              </Button>
            </div>
          </div>

          {/* Ultra Compact Filter Bar */}
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-2 mb-6">
            <div className="space-y-1.5">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400 w-3 h-3" />
                <Input 
                  type="text" 
                  placeholder="Buscar relatórios..." 
                  className="pl-7 h-7 bg-slate-900/50 border-slate-600/50 text-slate-100 placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 text-xs"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Compact Filters */}
              <div className="flex gap-1.5">
                <select
                  className="px-2 py-1 rounded border border-slate-600/50 bg-slate-900/50 text-slate-100 text-xs h-6 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 flex-1 min-w-0"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <option value="all">Todos os Tipos</option>
                  <option value="operations">Operações</option>
                  <option value="maintenance">Manutenções</option>
                  <option value="gas">Abastecimento</option>
                  <option value="operator">Operadores</option>
                </select>

                <select
                  className="px-2 py-1 rounded border border-slate-600/50 bg-slate-900/50 text-slate-100 text-xs h-6 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 flex-1 min-w-0"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="all">Todos os Períodos</option>
                  <option value="today">Hoje</option>
                  <option value="week">Esta Semana</option>
                  <option value="month">Este Mês</option>
                  <option value="quarter">Este Trimestre</option>
                  <option value="year">Este Ano</option>
                </select>

                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 px-2 text-xs bg-slate-900/50 border-slate-600/50 text-slate-100 hover:bg-slate-800/70"
                >
                  <Filter className="w-3 h-3 mr-1" />
                  Avançado
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card className="bg-card border-border shadow-sm">
                <CardHeader className="border-b border-border pb-2">
                  <CardTitle className="text-card-foreground text-sm">Filtros Detalhados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-3">
                  <div>
                    <h3 className="text-xs font-medium mb-1 text-card-foreground">Período</h3>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border border-border bg-card text-xs"
                    />
                  </div>
                  
                  <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-medium text-card-foreground">Tipos de Relatório</h3>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="w-6 h-6 p-0 hover:bg-accent hover:text-accent-foreground">
                          <ChevronDown className="h-3 w-3" />
                          <span className="sr-only">Toggle</span>
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="space-y-1">
                      <div className="flex items-center space-x-1.5">
                        <Checkbox id="operations" className="h-3 w-3" />
                        <label htmlFor="operations" className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-card-foreground">
                          Operações
                        </label>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Checkbox id="maintenance" className="h-3 w-3" />
                        <label htmlFor="maintenance" className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-card-foreground">
                          Manutenções
                        </label>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Checkbox id="gas" className="h-3 w-3" />
                        <label htmlFor="gas" className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-card-foreground">
                          Abastecimento
                        </label>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Checkbox id="operator" className="h-3 w-3" />
                        <label htmlFor="operator" className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-card-foreground">
                          Operadores
                        </label>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card className="h-full bg-card border-border shadow-sm">
                <CardHeader className="border-b border-border pb-2">
                  <CardTitle className="text-card-foreground text-sm">Relatórios Disponíveis</CardTitle>
                </CardHeader>
                <CardContent className="pt-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Report Cards */}
                    <Card className="hover:bg-muted/50 dark:hover:bg-muted/30 cursor-pointer transition-colors border-border">
                      <CardContent className="p-3 flex gap-3 items-center">
                        <div className="p-1.5 bg-primary/10 dark:bg-primary/20 text-primary rounded-md">
                          <FileBarChart className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-medium text-card-foreground text-sm">Utilização de Empilhadeiras</h3>
                          <p className="text-xs text-muted-foreground">Análise de horas de uso por máquina</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:bg-muted/50 dark:hover:bg-muted/30 cursor-pointer transition-colors border-border">
                      <CardContent className="p-3 flex gap-3 items-center">
                        <div className="p-1.5 bg-primary/10 dark:bg-primary/20 text-primary rounded-md">
                          <FileBarChart className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-medium text-card-foreground text-sm">Consumo de Combustível</h3>
                          <p className="text-xs text-muted-foreground">Consumo de gás por empilhadeira e horímetro</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:bg-muted/50 dark:hover:bg-muted/30 cursor-pointer transition-colors border-border">
                      <CardContent className="p-3 flex gap-3 items-center">
                        <div className="p-1.5 bg-primary/10 dark:bg-primary/20 text-primary rounded-md">
                          <FileBarChart className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-medium text-card-foreground text-sm">Histórico de Manutenções</h3>
                          <p className="text-xs text-muted-foreground">Registros de manutenções realizadas</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:bg-muted/50 dark:hover:bg-muted/30 cursor-pointer transition-colors border-border">
                      <CardContent className="p-3 flex gap-3 items-center">
                        <div className="p-1.5 bg-primary/10 dark:bg-primary/20 text-primary rounded-md">
                          <FileBarChart className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-medium text-card-foreground text-sm">Status dos Operadores</h3>
                          <p className="text-xs text-muted-foreground">Validade de ASO e certificações</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mt-6 text-center text-muted-foreground">
                    <p className="text-sm">Selecione um relatório para visualizar ou exportar</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportsPage;
