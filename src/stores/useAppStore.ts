
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { 
  MetricasDashboard, 
  Empilhadeira, 
  Operador, 
  Operacao, 
  OrdemServico, 
  Abastecimento,
  AlertaCritico,
  Notificacao
} from '@/types';

interface AppState {
  // Dashboard
  metricas: MetricasDashboard;
  alertas: AlertaCritico[];
  
  // Entidades principais
  empilhadeiras: Empilhadeira[];
  operadores: Operador[];
  operacoes: Operacao[];
  ordemServicos: OrdemServico[];
  abastecimentos: Abastecimento[];
  
  // UI State
  sidebarCollapsed: boolean;
  notificacoes: Notificacao[];
  loading: boolean;
  
  // Actions
  setSidebarCollapsed: (collapsed: boolean) => void;
  addNotificacao: (notificacao: Notificacao) => void;
  markNotificacaoAsRead: (id: string) => void;
  updateMetricas: (metricas: Partial<MetricasDashboard>) => void;
  setLoading: (loading: boolean) => void;
}

const initialMetricas: MetricasDashboard = {
  frotaTotal: 24,
  empilhadeirasOperacionais: 18,
  empilhadeirasManutencao: 4,
  empilhadeirasParadas: 2,
  operadoresAtivos: 32,
  operacoesAtivas: 12,
  operacoesConcluidas: 147,
  eficienciaGeral: 87.5,
  disponibilidadeGeral: 92.3,
  consumoGasTotal: 2450.8,
  custoOperacionalDia: 15420.50,
  produtividadeMedia: 94.2,
  tempoMedioOperacao: 45,
  alertasCriticos: 3
};

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // Estado inicial
        metricas: initialMetricas,
        alertas: [],
        empilhadeiras: [],
        operadores: [],
        operacoes: [],
        ordemServicos: [],
        abastecimentos: [],
        sidebarCollapsed: false,
        notificacoes: [],
        loading: false,
        
        // Actions
        setSidebarCollapsed: (collapsed) => 
          set({ sidebarCollapsed: collapsed }, false, 'setSidebarCollapsed'),
          
        addNotificacao: (notificacao) =>
          set(
            (state) => ({ 
              notificacoes: [notificacao, ...state.notificacoes].slice(0, 50) 
            }),
            false,
            'addNotificacao'
          ),
          
        markNotificacaoAsRead: (id) =>
          set(
            (state) => ({
              notificacoes: state.notificacoes.map(n => 
                n.id === id ? { ...n, lida: true } : n
              )
            }),
            false,
            'markNotificacaoAsRead'
          ),
          
        updateMetricas: (metricas) =>
          set(
            (state) => ({ 
              metricas: { ...state.metricas, ...metricas } 
            }),
            false,
            'updateMetricas'
          ),
          
        setLoading: (loading) => 
          set({ loading }, false, 'setLoading'),
      }),
      {
        name: 'fleet-management-storage',
        partialize: (state) => ({ 
          sidebarCollapsed: state.sidebarCollapsed,
          notificacoes: state.notificacoes.slice(0, 10)
        }),
      }
    ),
    { name: 'FleetManagementStore' }
  )
);
