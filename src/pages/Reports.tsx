import React, { useState } from 'react';
import ModernKpiCard from '@/components/dashboard/ModernKpiCard';
import ReportsHeader from '@/components/reports/ReportsHeader';
import ReportsFilters from '@/components/reports/ReportsFilters';
import ReportCategorySection from '@/components/reports/ReportCategorySection';
import ReportsEmptyState from '@/components/reports/ReportsEmptyState';
import { FileBarChart, Download, Calendar as CalendarIcon, Clock, TrendingUp, Users, Wrench, Fuel, BarChart3, Sparkles, Activity, Zap, Target } from 'lucide-react';

const ReportsPage = () => {
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
      gradient: 'from-blue-500 via-blue-600 to-indigo-700',
      bgPattern: 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/50 dark:to-indigo-900/50',
      iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      reports: [
        { 
          name: 'Utilização de Empilhadeiras', 
          description: 'Análise completa de horas de uso por máquina com insights de produtividade', 
          type: 'Operacional',
          icon: Activity,
          trend: '+15%',
          lastUpdate: '2 min',
          priority: 'high'
        },
        { 
          name: 'Produtividade por Operador', 
          description: 'Dashboard detalhado de eficiência e desempenho individual', 
          type: 'Performance',
          icon: Target,
          trend: '+8%',
          lastUpdate: '5 min',
          priority: 'medium'
        },
        { 
          name: 'Movimentações por Período', 
          description: 'Volume de operações com análise temporal avançada', 
          type: 'Operacional',
          icon: TrendingUp,
          trend: '+12%',
          lastUpdate: '1 min',
          priority: 'high'
        }
      ]
    },
    {
      id: 'manutencao',
      title: 'Manutenção',
      icon: Wrench,
      gradient: 'from-orange-500 via-red-500 to-pink-600',
      bgPattern: 'bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-950/50 dark:to-red-900/50',
      iconBg: 'bg-gradient-to-br from-orange-500 to-red-600',
      reports: [
        { 
          name: 'Histórico de Manutenções', 
          description: 'Timeline completo com análise de custos e padrões', 
          type: 'Histórico',
          icon: Clock,
          trend: '-5%',
          lastUpdate: '10 min',
          priority: 'medium'
        },
        { 
          name: 'Preventivas Programadas', 
          description: 'Cronograma inteligente com alertas e notificações', 
          type: 'Preventivo',
          icon: CalendarIcon,
          trend: '0%',
          lastUpdate: '3 min',
          priority: 'high'
        },
        { 
          name: 'Análise de Custos', 
          description: 'Dashboard financeiro com projeções e otimizações', 
          type: 'Financeiro',
          icon: TrendingUp,
          trend: '-8%',
          lastUpdate: '15 min',
          priority: 'low'
        }
      ]
    },
    {
      id: 'abastecimento',
      title: 'Abastecimento',
      icon: Fuel,
      gradient: 'from-green-500 via-emerald-500 to-teal-600',
      bgPattern: 'bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/50 dark:to-emerald-900/50',
      iconBg: 'bg-gradient-to-br from-green-500 to-emerald-600',
      reports: [
        { 
          name: 'Consumo Inteligente', 
          description: 'AI-powered análise de consumo com previsões precisas', 
          type: 'Consumo',
          icon: Zap,
          trend: '-12%',
          lastUpdate: '1 min',
          priority: 'high'
        },
        { 
          name: 'Eficiência Energética', 
          description: 'Otimização automática com recomendações personalizadas', 
          type: 'Eficiência',
          icon: Activity,
          trend: '+18%',
          lastUpdate: '2 min',
          priority: 'high'
        },
        { 
          name: 'Histórico Avançado', 
          description: 'Machine learning para padrões de abastecimento', 
          type: 'Histórico',
          icon: BarChart3,
          trend: '+5%',
          lastUpdate: '8 min',
          priority: 'medium'
        }
      ]
    },
    {
      id: 'operadores',
      title: 'Operadores',
      icon: Users,
      gradient: 'from-purple-500 via-violet-500 to-indigo-600',
      bgPattern: 'bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950/50 dark:to-violet-900/50',
      iconBg: 'bg-gradient-to-br from-purple-500 to-violet-600',
      reports: [
        { 
          name: 'Certificações Smart', 
          description: 'Monitoramento automático de ASO e certificações', 
          type: 'Certificação',
          icon: Users,
          trend: '+3%',
          lastUpdate: '30 min',
          priority: 'medium'
        },
        { 
          name: 'Performance Analytics', 
          description: 'Dashboard avançado de produtividade individual', 
          type: 'Operacional',
          icon: Target,
          trend: '+22%',
          lastUpdate: '5 min',
          priority: 'high'
        },
        { 
          name: 'Treinamentos 4.0', 
          description: 'Plataforma digital de capacitação com gamificação', 
          type: 'Treinamento',
          icon: Sparkles,
          trend: '+35%',
          lastUpdate: '12 min',
          priority: 'high'
        }
      ]
    }
  ];

  const quickStats = [
    { 
      title: 'Relatórios Gerados', 
      value: 1247, 
      icon: FileBarChart,
      trend: 'up',
      trendValue: 12
    },
    { 
      title: 'Downloads Hoje', 
      value: 89, 
      icon: Download,
      trend: 'up',
      trendValue: 5
    },
    { 
      title: 'Relatórios Agendados', 
      value: 23, 
      icon: CalendarIcon,
      trend: null,
      trendValue: 0
    },
    { 
      title: 'Última Atualização', 
      value: '2min', 
      icon: Clock,
      trend: null,
      trendValue: 0
    }
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

  const handleClearFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedPeriod('');
    setSelectedForklift('');
    setSelectedOperator('');
  };

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen">
      <ReportsHeader />

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <ModernKpiCard
            key={index}
            title={stat.title}
            value={typeof stat.value === 'string' ? 0 : stat.value}
            icon={stat.icon}
            variant="info"
            className="hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>

      <ReportsFilters
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        selectedForklift={selectedForklift}
        setSelectedForklift={setSelectedForklift}
      />

      {/* Ultra-Premium Report Categories */}
      <div className="space-y-8">
        {filteredCategories.map((category) => (
          <ReportCategorySection key={category.id} category={category} />
        ))}
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <ReportsEmptyState onClearFilters={handleClearFilters} />
      )}
    </div>
  );
};

export default ReportsPage;
