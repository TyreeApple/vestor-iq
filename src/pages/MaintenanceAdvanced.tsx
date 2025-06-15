
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  Download, 
  Filter,
  Wrench,
  Clock,
  CheckCircle,
  DollarSign,
  Play,
  AlertTriangle,
  Moon,
  Sun,
  Edit,
  MoreVertical,
  MapPin,
  Eye,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface KPIData {
  id: string;
  title: string;
  value: string | number;
  icon: any;
  gradient: string;
  trend: string;
}

interface MaintenanceItem {
  id: string;
  equipment: string;
  type: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'progress' | 'completed';
  dueDate: string;
  technician: string;
  estimatedHours: number;
  description: string;
  location: string;
  cost?: string;
  completedDate?: string;
  duration?: string;
}

const MaintenanceAdvanced = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [equipmentFilter, setEquipmentFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock KPI Data
  const kpiData: KPIData[] = [
    {
      id: 'total',
      title: 'Total de Equipamentos',
      value: 45,
      icon: Wrench,
      gradient: 'blue',
      trend: '+5%'
    },
    {
      id: 'pending',
      title: 'Manutenções Pendentes',
      value: 8,
      icon: Clock,
      gradient: 'orange',
      trend: '-2%'
    },
    {
      id: 'progress',
      title: 'Em Andamento',
      value: 3,
      icon: Play,
      gradient: 'blue',
      trend: '+1'
    },
    {
      id: 'completed',
      title: 'Concluídas (Mês)',
      value: 24,
      icon: CheckCircle,
      gradient: 'green',
      trend: '+12%'
    },
    {
      id: 'cost',
      title: 'Custo Médio',
      value: 'R$ 1.250',
      icon: DollarSign,
      gradient: 'pink',
      trend: '-8%'
    }
  ];

  // Mock Pending Maintenance Data
  const [pendingMaintenance, setPendingMaintenance] = useState<MaintenanceItem[]>([
    {
      id: 'OS-001',
      equipment: 'Empilhadeira Toyota 7FBR15',
      type: 'Preventiva',
      priority: 'critical',
      status: 'pending',
      dueDate: '2025-06-16',
      technician: 'João Silva',
      estimatedHours: 4,
      description: 'Troca de óleo hidráulico e filtros',
      location: 'Galpão A - Setor 3'
    },
    {
      id: 'OS-002',
      equipment: 'Empilhadeira Hyster H50FT',
      type: 'Corretiva',
      priority: 'high',
      status: 'progress',
      dueDate: '2025-06-17',
      technician: 'Maria Santos',
      estimatedHours: 6,
      description: 'Reparo no sistema de freios',
      location: 'Galpão B - Setor 1'
    },
    {
      id: 'OS-003',
      equipment: 'Empilhadeira Yale ERP040VT',
      type: 'Preventiva',
      priority: 'medium',
      status: 'pending',
      dueDate: '2025-06-18',
      technician: 'Carlos Oliveira',
      estimatedHours: 3,
      description: 'Inspeção geral e lubrificação',
      location: 'Galpão C - Setor 2'
    }
  ]);

  // Mock History Data
  const maintenanceHistory: MaintenanceItem[] = [
    {
      id: 'OS-098',
      equipment: 'Empilhadeira Toyota 7FBR15',
      type: 'Preventiva',
      priority: 'medium',
      status: 'completed',
      dueDate: '2025-06-10',
      completedDate: '2025-06-10',
      technician: 'João Silva',
      estimatedHours: 3.5,
      duration: '3.5h',
      cost: 'R$ 850,00',
      description: 'Manutenção preventiva completa',
      location: 'Galpão A'
    },
    {
      id: 'OS-097',
      equipment: 'Empilhadeira Hyster H50FT',
      type: 'Corretiva',
      priority: 'high',
      status: 'completed',
      dueDate: '2025-06-08',
      completedDate: '2025-06-08',
      technician: 'Maria Santos',
      estimatedHours: 5.2,
      duration: '5.2h',
      cost: 'R$ 1.200,00',
      description: 'Reparo sistema hidráulico',
      location: 'Galpão B'
    }
  ];

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'critical':
        return { 
          color: 'border-l-red-500', 
          badge: 'bg-red-500/10 text-red-400 border-red-500/20',
          label: 'Crítica' 
        };
      case 'high':
        return { 
          color: 'border-l-orange-500', 
          badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
          label: 'Alta' 
        };
      case 'medium':
        return { 
          color: 'border-l-blue-500', 
          badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
          label: 'Média' 
        };
      default:
        return { 
          color: 'border-l-gray-500', 
          badge: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
          label: 'Baixa' 
        };
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { variant: 'secondary' as const, label: 'Pendente', icon: Clock };
      case 'progress':
        return { variant: 'default' as const, label: 'Em Andamento', icon: Play };
      case 'completed':
        return { variant: 'default' as const, label: 'Concluída', icon: CheckCircle };
      default:
        return { variant: 'secondary' as const, label: status, icon: Clock };
    }
  };

  const getGradientClass = (gradient: string) => {
    switch (gradient) {
      case 'blue':
        return 'from-blue-500 to-blue-600';
      case 'orange':
        return 'from-orange-500 to-orange-600';
      case 'green':
        return 'from-green-500 to-green-600';
      case 'pink':
        return 'from-pink-500 to-pink-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const filteredMaintenance = pendingMaintenance.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const startMaintenance = (id: string) => {
    setPendingMaintenance(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, status: 'progress' as const }
          : item
      )
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando sistema de manutenção...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 space-y-6 font-['Inter'] text-white">
      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Gestão de Manutenção
          </h1>
          <p className="text-slate-400 mt-1">
            Sistema completo para controle de ordens de serviço e manutenções
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button variant="outline" className="gap-2 border-slate-600 text-slate-300 hover:bg-slate-700">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="w-4 h-4" />
            Nova OS
          </Button>
        </div>
      </header>

      {/* KPI Cards */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-slate-200">Indicadores de Performance</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {kpiData.map((kpi) => (
            <Card 
              key={kpi.id} 
              className={cn(
                "relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer",
                "bg-gradient-to-br", 
                getGradientClass(kpi.gradient)
              )}
            >
              <CardHeader className="pb-2 p-4">
                <div className="flex items-center justify-between">
                  <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                    <kpi.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="px-1.5 py-0.5 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white">
                    {kpi.trend}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 p-4">
                <div className="space-y-1">
                  <p className="text-xl font-bold text-white">{kpi.value}</p>
                  <p className="text-xs text-white/90 font-medium leading-tight">{kpi.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Compact Filter Bar */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-slate-200">Filtros de Busca</h2>
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-4 shadow-lg border border-slate-700">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input 
                type="text" 
                placeholder="Buscar por equipamento, OS ou descrição..." 
                className="pl-10 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
              <div className="grid grid-cols-2 sm:flex gap-3">
                <select 
                  className="px-3 py-2 rounded-lg border border-slate-600 bg-slate-800 text-white text-sm h-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-w-[120px]"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Todos os Status</option>
                  <option value="pending">Pendente</option>
                  <option value="progress">Em Andamento</option>
                  <option value="completed">Concluída</option>
                </select>

                <select 
                  className="px-3 py-2 rounded-lg border border-slate-600 bg-slate-800 text-white text-sm h-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-w-[120px]"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="all">Todas as Prioridades</option>
                  <option value="critical">Crítica</option>
                  <option value="high">Alta</option>
                  <option value="medium">Média</option>
                  <option value="low">Baixa</option>
                </select>

                <select 
                  className="px-3 py-2 rounded-lg border border-slate-600 bg-slate-800 text-white text-sm h-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-w-[120px]"
                  value={equipmentFilter}
                  onChange={(e) => setEquipmentFilter(e.target.value)}
                >
                  <option value="all">Todos os Equipamentos</option>
                  <option value="toyota">Toyota</option>
                  <option value="hyster">Hyster</option>
                  <option value="yale">Yale</option>
                </select>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-3 text-sm text-slate-400">
            {filteredMaintenance.length} resultado{filteredMaintenance.length !== 1 ? 's' : ''} encontrado{filteredMaintenance.length !== 1 ? 's' : ''}
          </div>
        </div>
      </section>

      {/* Pending Maintenance */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Manutenções Pendentes</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-sm text-slate-400">
                {filteredMaintenance.length} {filteredMaintenance.length === 1 ? 'manutenção aguardando' : 'manutenções aguardando'} atenção
              </span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMaintenance.map((item) => {
            const priorityConfig = getPriorityConfig(item.priority);
            const statusConfig = getStatusConfig(item.status);
            
            return (
              <Card 
                key={item.id} 
                className={cn(
                  "group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer",
                  "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
                  "border-l-4 shadow-lg hover:shadow-xl",
                  priorityConfig.color
                )}
              >
                {/* Critical priority indicator */}
                {item.priority === 'critical' && (
                  <div className="absolute top-2 right-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                  </div>
                )}

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                          #{item.id}
                        </span>
                        <Badge variant={statusConfig.variant} className="gap-1 text-xs">
                          <statusConfig.icon className="w-2.5 h-2.5" />
                          {statusConfig.label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <Wrench className="w-3 h-3" />
                        <span className="text-xs font-medium">{item.type}</span>
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 text-gray-400 hover:text-white hover:bg-white/10"
                        >
                          <MoreVertical className="w-3 h-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 bg-slate-800 border-slate-700">
                        <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-slate-700">
                          <Edit className="w-3 h-3 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        {item.status === 'pending' && (
                          <DropdownMenuItem 
                            onClick={() => startMaintenance(item.id)}
                            className="text-green-400 hover:text-green-300 hover:bg-slate-700"
                          >
                            <Play className="w-3 h-3 mr-2" />
                            Iniciar
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                          <Trash2 className="w-3 h-3 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Priority Badge */}
                  <div className={cn(
                    "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium w-fit",
                    priorityConfig.badge
                  )}>
                    <div className={cn("w-1.5 h-1.5 rounded-full", 
                      item.priority === 'critical' ? 'bg-red-500' :
                      item.priority === 'high' ? 'bg-orange-500' :
                      item.priority === 'medium' ? 'bg-blue-500' : 'bg-gray-500'
                    )} />
                    <span>Prioridade {priorityConfig.label}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  {/* Problem Description */}
                  <div className="p-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-200 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* Compact Details Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                        <Wrench className="w-3 h-3" />
                        <span className="text-xs uppercase tracking-wide">Equipamento</span>
                      </div>
                      <p className="text-sm font-bold text-white truncate">{item.equipment}</p>
                    </div>
                    
                    <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs uppercase tracking-wide">Prazo</span>
                      </div>
                      <p className="text-sm font-bold text-white">{formatDate(item.dueDate)}</p>
                    </div>
                    
                    <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                        <MapPin className="w-3 h-3" />
                        <span className="text-xs uppercase tracking-wide">Local</span>
                      </div>
                      <p className="text-sm font-bold text-white truncate">{item.location}</p>
                    </div>
                    
                    <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs uppercase tracking-wide">Est. Tempo</span>
                      </div>
                      <p className="text-sm font-bold text-white">{item.estimatedHours}h</p>
                    </div>
                  </div>

                  {/* Progress Bar for In-Progress Items */}
                  {item.status === 'progress' && (
                    <div className="space-y-2 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-300">Progresso estimado</span>
                        <span className="text-xs font-bold text-blue-400">65%</span>
                      </div>
                      <div className="relative">
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-1.5 rounded-full transition-all duration-700 ease-out"
                            style={{ width: '65%' }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 rounded-lg transition-all duration-300 text-sm"
                    >
                      <Eye className="w-3 h-3 mr-2" />
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* History Table */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Histórico Completo</h2>
            <p className="text-slate-400">Todas as manutenções registradas no sistema</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 border-slate-600 text-slate-300 hover:bg-slate-700">
              <Filter className="w-4 h-4" />
              Filtros Avançados
            </Button>
            <Button variant="outline" className="gap-2 border-slate-600 text-slate-300 hover:bg-slate-700">
              <Download className="w-4 h-4" />
              Exportar Histórico
            </Button>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-200">OS</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-200">Equipamento</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-200">Tipo</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-200">Status</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-200">Data</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-200">Técnico</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-200">Duração</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-200">Custo</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-200">Ações</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceHistory.map((item, index) => (
                  <tr 
                    key={item.id} 
                    className={cn(
                      "transition-all duration-200 hover:bg-slate-700/50 hover:scale-[1.01] hover:shadow-lg border-b border-slate-700/50",
                      index % 2 === 0 ? "bg-slate-800/30" : "bg-slate-800/50"
                    )}
                  >
                    <td className="px-4 py-3 text-sm text-white font-medium">{item.id}</td>
                    <td className="px-4 py-3 text-sm text-white">{item.equipment}</td>
                    <td className="px-4 py-3 text-sm text-slate-300">{item.type}</td>
                    <td className="px-4 py-3">
                      <Badge variant="default" className="bg-green-500/10 text-green-400 border-green-500/20">
                        <CheckCircle className="w-2.5 h-2.5 mr-1" />
                        Concluída
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">{formatDate(item.completedDate!)}</td>
                    <td className="px-4 py-3 text-sm text-slate-300">{item.technician}</td>
                    <td className="px-4 py-3 text-sm text-slate-300">{item.duration}</td>
                    <td className="px-4 py-3 text-sm text-white font-medium">{item.cost}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white hover:bg-slate-600">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white hover:bg-slate-600">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MaintenanceAdvanced;
