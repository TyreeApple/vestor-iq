
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, Download, FileBarChart, Search, Calendar as CalendarIcon, TrendingUp, Users, Wrench, Fuel, BarChart3 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const ReportsPage = () => {
  const isMobile = useIsMobile();
  const [search, setSearch] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedForklift, setSelectedForklift] = useState('');
  const [selectedOperator, setSelectedOperator] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const reportCategories = [
    {
      id: 'operacoes',
      title: 'Operações',
      icon: BarChart3,
      color: 'bg-blue-500',
      reports: [
        { name: 'Utilização de Empilhadeiras', description: 'Análise de horas de uso por máquina', type: 'Operacional' },
        { name: 'Produtividade por Operador', description: 'Eficiência e desempenho dos operadores', type: 'Performance' },
        { name: 'Movimentações por Período', description: 'Volume de operações realizadas', type: 'Operacional' }
      ]
    },
    {
      id: 'manutencao',
      title: 'Manutenção',
      icon: Wrench,
      color: 'bg-orange-500',
      reports: [
        { name: 'Histórico de Manutenções', description: 'Registros completos de manutenções realizadas', type: 'Histórico' },
        { name: 'Preventivas Programadas', description: 'Cronograma de manutenções preventivas', type: 'Preventivo' },
        { name: 'Custos de Manutenção', description: 'Análise financeira dos custos', type: 'Financeiro' }
      ]
    },
    {
      id: 'abastecimento',
      title: 'Abastecimento',
      icon: Fuel,
      color: 'bg-green-500',
      reports: [
        { name: 'Consumo de Combustível', description: 'Consumo de gás por empilhadeira e horímetro', type: 'Consumo' },
        { name: 'Eficiência Energética', description: 'Análise de eficiência por máquina', type: 'Eficiência' },
        { name: 'Histórico de Abastecimentos', description: 'Registro de todos os abastecimentos', type: 'Histórico' }
      ]
    },
    {
      id: 'operadores',
      title: 'Operadores',
      icon: Users,
      color: 'bg-purple-500',
      reports: [
        { name: 'Status dos Operadores', description: 'Validade de ASO e certificações', type: 'Certificação' },
        { name: 'Horas Trabalhadas', description: 'Controle de jornada de trabalho', type: 'Operacional' },
        { name: 'Treinamentos', description: 'Status de treinamentos e capacitações', type: 'Treinamento' }
      ]
    }
  ];

  const quickStats = [
    { label: 'Relatórios Gerados', value: '1,247', change: '+12%', trend: 'up' },
    { label: 'Downloads Hoje', value: '89', change: '+5%', trend: 'up' },
    { label: 'Relatórios Agendados', value: '23', change: '0%', trend: 'neutral' },
    { label: 'Última Atualização', value: '2min', change: 'agora', trend: 'neutral' }
  ];

  const filteredCategories = reportCategories.filter(category => {
    if (selectedCategory && selectedCategory !== 'all' && category.id !== selectedCategory) return false;
    if (search) {
      return category.title.toLowerCase().includes(search.toLowerCase()) ||
             category.reports.some(report => 
               report.name.toLowerCase().includes(search.toLowerCase()) ||
               report.description.toLowerCase().includes(search.toLowerCase())
             );
    }
    return true;
  });

  return (
    <div className="flex min-h-screen bg-background transition-colors duration-300">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
        <Navbar />
        
        <main className="flex-1 px-6 py-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Relatórios do Sistema</h1>
                <p className="text-muted-foreground mt-1">Análises e insights da sua operação</p>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" className="gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Agendar Relatório
                </Button>
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4" />
                  Exportar Selecionados
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickStats.map((stat, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {stat.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                      <span className={cn(
                        "text-sm font-medium",
                        stat.trend === 'up' ? "text-green-500" : "text-muted-foreground"
                      )}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar relatórios por nome ou descrição..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="operacoes">Operações</SelectItem>
                    <SelectItem value="manutencao">Manutenção</SelectItem>
                    <SelectItem value="abastecimento">Abastecimento</SelectItem>
                    <SelectItem value="operadores">Operadores</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hoje">Hoje</SelectItem>
                    <SelectItem value="semana">Esta Semana</SelectItem>
                    <SelectItem value="mes">Este Mês</SelectItem>
                    <SelectItem value="trimestre">Trimestre</SelectItem>
                    <SelectItem value="ano">Este Ano</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedForklift} onValueChange={setSelectedForklift}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Empilhadeira" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="emp-001">EMP-001</SelectItem>
                    <SelectItem value="emp-002">EMP-002</SelectItem>
                    <SelectItem value="emp-003">EMP-003</SelectItem>
                    <SelectItem value="emp-004">EMP-004</SelectItem>
                    <SelectItem value="emp-005">EMP-005</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedOperator} onValueChange={setSelectedOperator}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Operador" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="joao-silva">João Silva</SelectItem>
                    <SelectItem value="maria-santos">Maria Santos</SelectItem>
                    <SelectItem value="pedro-oliveira">Pedro Oliveira</SelectItem>
                    <SelectItem value="ana-costa">Ana Costa</SelectItem>
                    <SelectItem value="carlos-souza">Carlos Souza</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Reports Categories */}
          <div className="space-y-6">
            {filteredCategories.map((category) => (
              <Card key={category.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
                  <div className="flex items-center gap-4">
                    <div className={cn("p-3 rounded-lg text-white", category.color)}>
                      <category.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <p className="text-muted-foreground">
                        {category.reports.length} relatórios disponíveis
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {category.reports.map((report, index) => (
                      <Card key={index} className="group hover:shadow-md transition-all duration-200 cursor-pointer border-2 hover:border-blue-200 dark:hover:border-blue-800">
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground group-hover:text-blue-600 transition-colors">
                                {report.name}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {report.description}
                              </p>
                            </div>
                            <FileBarChart className="w-5 h-5 text-blue-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="text-xs">
                              {report.type}
                            </Badge>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
                                Visualizar
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
                                <Download className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <Card className="p-12 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <FileBarChart className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Nenhum relatório encontrado</h3>
                  <p className="text-muted-foreground">
                    Tente ajustar os filtros ou termo de busca para encontrar relatórios.
                  </p>
                </div>
                <Button variant="outline" onClick={() => {
                  setSearch('');
                  setSelectedCategory('');
                  setSelectedPeriod('');
                  setSelectedForklift('');
                  setSelectedOperator('');
                }}>
                  Limpar Filtros
                </Button>
              </div>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default ReportsPage;
