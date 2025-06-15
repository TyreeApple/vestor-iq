
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
  Notificacao,
  StatusEmpilhadeira,
  TipoEmpilhadeira,
  StatusOperador,
  FuncaoOperador,
  StatusOperacao,
  TipoOperacao,
  PrioridadeOperacao,
  StatusManutencao,
  TipoManutencao
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
  
  // Empilhadeiras Actions
  addEmpilhadeira: (empilhadeira: Empilhadeira) => void;
  updateEmpilhadeira: (id: string, empilhadeira: Partial<Empilhadeira>) => void;
  deleteEmpilhadeira: (id: string) => void;
  
  // Operadores Actions
  addOperador: (operador: Operador) => void;
  updateOperador: (id: string, operador: Partial<Operador>) => void;
  deleteOperador: (id: string) => void;
  
  // Operações Actions
  addOperacao: (operacao: Operacao) => void;
  updateOperacao: (id: string, operacao: Partial<Operacao>) => void;
  deleteOperacao: (id: string) => void;
  finalizarOperacao: (id: string) => void;
  
  // Manutenção Actions
  addOrdemServico: (ordem: OrdemServico) => void;
  updateOrdemServico: (id: string, ordem: Partial<OrdemServico>) => void;
  deleteOrdemServico: (id: string) => void;
  
  // Abastecimento Actions
  addAbastecimento: (abastecimento: Abastecimento) => void;
  updateAbastecimento: (id: string, abastecimento: Partial<Abastecimento>) => void;
  deleteAbastecimento: (id: string) => void;
  
  // Utility Actions
  recalculateMetrics: () => void;
  generateAlerts: () => void;
}

// Dados iniciais realísticos
const empilhadeirasIniciais: Empilhadeira[] = [
  {
    id: 'EMP-001',
    modelo: 'Toyota 8FBE20',
    marca: 'Toyota',
    tipo: TipoEmpilhadeira.ELETRICA,
    status: StatusEmpilhadeira.OPERACIONAL,
    capacidade: 2000,
    anoFabricacao: 2022,
    dataAquisicao: '2022-03-15',
    numeroSerie: 'TY2022001',
    horimetro: 1250,
    ultimaManutencao: '2024-11-01',
    proximaManutencao: '2024-12-15',
    localizacaoAtual: 'Setor A - Doca 1',
    setor: 'Almoxarifado',
    operadorAtual: 'OP-001',
    custoHora: 45.50,
    eficiencia: 94.5,
    disponibilidade: 97.2,
    qrCode: 'QR001',
    observacoes: 'Empilhadeira em ótimo estado'
  },
  {
    id: 'EMP-002',
    modelo: 'Hyster H50FT',
    marca: 'Hyster',
    tipo: TipoEmpilhadeira.GAS,
    status: StatusEmpilhadeira.EM_MANUTENCAO,
    capacidade: 2500,
    anoFabricacao: 2021,
    dataAquisicao: '2021-08-22',
    numeroSerie: 'HY2021002',
    horimetro: 2180,
    ultimaManutencao: '2024-12-01',
    proximaManutencao: '2024-12-20',
    localizacaoAtual: 'Oficina',
    setor: 'Manutenção',
    custoHora: 52.30,
    eficiencia: 0,
    disponibilidade: 0,
    qrCode: 'QR002',
    observacoes: 'Em manutenção preventiva'
  },
  {
    id: 'EMP-003',
    modelo: 'Crown RC 5500',
    marca: 'Crown',
    tipo: TipoEmpilhadeira.RETRATIL,
    status: StatusEmpilhadeira.OPERACIONAL,
    capacidade: 1800,
    anoFabricacao: 2023,
    dataAquisicao: '2023-01-10',
    numeroSerie: 'CR2023003',
    horimetro: 890,
    ultimaManutencao: '2024-10-15',
    proximaManutencao: '2025-01-15',
    localizacaoAtual: 'Setor B - Corredor 3',
    setor: 'Expedição',
    operadorAtual: 'OP-002',
    custoHora: 48.75,
    eficiencia: 96.8,
    disponibilidade: 98.5,
    qrCode: 'QR003',
    observacoes: 'Nova aquisição'
  }
];

const operadoresIniciais: Operador[] = [
  {
    id: 'OP-001',
    nome: 'João Silva Santos',
    cpf: '123.456.789-01',
    email: 'joao.santos@empresa.com',
    telefone: '(11) 99999-1234',
    funcao: FuncaoOperador.OPERADOR,
    dataAdmissao: '2020-03-15',
    turno: 'Manhã (06:00-14:00)',
    setor: 'Almoxarifado',
    certificacoes: [],
    avaliacoes: [],
    horasTrabalhadas: 3240,
    produtividade: 94.2,
    status: StatusOperador.ATIVO
  },
  {
    id: 'OP-002',
    nome: 'Maria Oliveira Costa',
    cpf: '987.654.321-02',
    email: 'maria.costa@empresa.com',
    telefone: '(11) 99999-5678',
    funcao: FuncaoOperador.SUPERVISOR,
    dataAdmissao: '2019-07-22',
    turno: 'Tarde (14:00-22:00)',
    setor: 'Expedição',
    certificacoes: [],
    avaliacoes: [],
    horasTrabalhadas: 4680,
    produtividade: 97.8,
    status: StatusOperador.ATIVO
  },
  {
    id: 'OP-003',
    nome: 'Carlos Roberto Lima',
    cpf: '456.789.123-03',
    email: 'carlos.lima@empresa.com',
    telefone: '(11) 99999-9876',
    funcao: FuncaoOperador.TECNICO,
    dataAdmissao: '2021-11-08',
    turno: 'Noite (22:00-06:00)',
    setor: 'Manutenção',
    certificacoes: [],
    avaliacoes: [],
    horasTrabalhadas: 2890,
    produtividade: 92.5,
    status: StatusOperador.ATIVO
  }
];

const operacoesIniciais: Operacao[] = [
  {
    id: 'OP-2024-001',
    empilhadeiraId: 'EMP-001',
    empilhadeira: empilhadeirasIniciais[0],
    operadorId: 'OP-001',
    operador: operadoresIniciais[0],
    tipo: TipoOperacao.CARGA,
    status: StatusOperacao.EM_ANDAMENTO,
    prioridade: PrioridadeOperacao.ALTA,
    setor: 'Almoxarifado',
    localizacao: 'Doca 1',
    dataInicio: '2024-12-15T08:30:00',
    duracaoEstimada: 120,
    produtividade: 85.5,
    observacoes: 'Carga de pallets para expedição',
    consumoGas: 0,
    custoOperacional: 91.00
  },
  {
    id: 'OP-2024-002',
    empilhadeiraId: 'EMP-003',
    empilhadeira: empilhadeirasIniciais[2],
    operadorId: 'OP-002',
    operador: operadoresIniciais[1],
    tipo: TipoOperacao.DESCARGA,
    status: StatusOperacao.CONCLUIDA,
    prioridade: PrioridadeOperacao.NORMAL,
    setor: 'Expedição',
    localizacao: 'Corredor 3',
    dataInicio: '2024-12-15T06:00:00',
    dataFim: '2024-12-15T07:45:00',
    duracaoEstimada: 90,
    duracaoReal: 105,
    produtividade: 92.3,
    observacoes: 'Descarga de mercadorias recebidas',
    consumoGas: 0,
    custoOperacional: 85.50
  }
];

const ordensServicoIniciais: OrdemServico[] = [
  {
    id: 'OS-2024-001',
    empilhadeiraId: 'EMP-002',
    empilhadeira: empilhadeirasIniciais[1],
    tipo: TipoManutencao.PREVENTIVA,
    status: StatusManutencao.EM_ANDAMENTO,
    prioridade: PrioridadeOperacao.NORMAL,
    problema: 'Manutenção preventiva programada - 2000h',
    diagnostico: 'Troca de óleo hidráulico, filtros e verificação geral',
    tecnicoId: 'OP-003',
    tecnico: operadoresIniciais[2],
    dataAbertura: '2024-12-01',
    dataInicio: '2024-12-01',
    horimetroInicio: 2180,
    custos: {
      pecas: 450.00,
      maoObra: 300.00,
      terceiros: 0,
      total: 750.00
    },
    pecasUtilizadas: [
      {
        id: 'PC-001',
        nome: 'Óleo Hidráulico',
        codigo: 'OH-15W40',
        quantidade: 20,
        valorUnitario: 15.50,
        valorTotal: 310.00
      }
    ],
    anexos: [],
    observacoes: 'Manutenção conforme cronograma'
  }
];

const abastecimentosIniciais: Abastecimento[] = [
  {
    id: 'AB-2024-001',
    empilhadeiraId: 'EMP-002',
    empilhadeira: empilhadeirasIniciais[1],
    operadorId: 'OP-003',
    operador: operadoresIniciais[2],
    dataAbastecimento: '2024-12-14T10:30:00',
    horimetroInicial: 2165,
    horimetroFinal: 2180,
    quantidadeLitros: 45.5,
    custoTotal: 273.00,
    precoLitro: 6.00,
    fornecedor: 'Ultragaz',
    localAbastecimento: 'Pátio interno',
    eficiencia: 3.03,
    observacoes: 'Abastecimento completo'
  }
];

const initialMetricas: MetricasDashboard = {
  frotaTotal: 3,
  empilhadeirasOperacionais: 2,
  empilhadeirasManutencao: 1,
  empilhadeirasParadas: 0,
  operadoresAtivos: 3,
  operacoesAtivas: 1,
  operacoesConcluidas: 1,
  eficienciaGeral: 94.2,
  disponibilidadeGeral: 98.5,
  consumoGasTotal: 45.5,
  custoOperacionalDia: 1024.50,
  produtividadeMedia: 88.9,
  tempoMedioOperacao: 97.5,
  alertasCriticos: 1
};

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // Estado inicial
        metricas: initialMetricas,
        alertas: [],
        empilhadeiras: empilhadeirasIniciais,
        operadores: operadoresIniciais,
        operacoes: operacoesIniciais,
        ordemServicos: ordensServicoIniciais,
        abastecimentos: abastecimentosIniciais,
        sidebarCollapsed: false,
        notificacoes: [],
        loading: false,
        
        // UI Actions
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

        // Empilhadeiras Actions
        addEmpilhadeira: (empilhadeira) =>
          set(
            (state) => ({
              empilhadeiras: [...state.empilhadeiras, empilhadeira]
            }),
            false,
            'addEmpilhadeira'
          ),

        updateEmpilhadeira: (id, empilhadeiraData) =>
          set(
            (state) => ({
              empilhadeiras: state.empilhadeiras.map(emp => 
                emp.id === id ? { ...emp, ...empilhadeiraData } : emp
              )
            }),
            false,
            'updateEmpilhadeira'
          ),

        deleteEmpilhadeira: (id) =>
          set(
            (state) => ({
              empilhadeiras: state.empilhadeiras.filter(emp => emp.id !== id),
              operacoes: state.operacoes.filter(op => op.empilhadeiraId !== id),
              ordemServicos: state.ordemServicos.filter(os => os.empilhadeiraId !== id),
              abastecimentos: state.abastecimentos.filter(ab => ab.empilhadeiraId !== id)
            }),
            false,
            'deleteEmpilhadeira'
          ),

        // Operadores Actions
        addOperador: (operador) =>
          set(
            (state) => ({
              operadores: [...state.operadores, operador]
            }),
            false,
            'addOperador'
          ),

        updateOperador: (id, operadorData) =>
          set(
            (state) => ({
              operadores: state.operadores.map(op => 
                op.id === id ? { ...op, ...operadorData } : op
              )
            }),
            false,
            'updateOperador'
          ),

        deleteOperador: (id) =>
          set(
            (state) => ({
              operadores: state.operadores.filter(op => op.id !== id),
              operacoes: state.operacoes.filter(operacao => operacao.operadorId !== id)
            }),
            false,
            'deleteOperador'
          ),

        // Operações Actions
        addOperacao: (operacao) =>
          set(
            (state) => {
              // Atualiza status da empilhadeira para ocupada se a operação está em andamento
              let empilhadeirasAtualizadas = state.empilhadeiras;
              if (operacao.status === StatusOperacao.EM_ANDAMENTO) {
                empilhadeirasAtualizadas = state.empilhadeiras.map(emp =>
                  emp.id === operacao.empilhadeiraId 
                    ? { ...emp, operadorAtual: operacao.operadorId }
                    : emp
                );
              }
              
              return {
                operacoes: [...state.operacoes, operacao],
                empilhadeiras: empilhadeirasAtualizadas
              };
            },
            false,
            'addOperacao'
          ),

        updateOperacao: (id, operacaoData) =>
          set(
            (state) => ({
              operacoes: state.operacoes.map(op => 
                op.id === id ? { ...op, ...operacaoData } : op
              )
            }),
            false,
            'updateOperacao'
          ),

        deleteOperacao: (id) =>
          set(
            (state) => ({
              operacoes: state.operacoes.filter(op => op.id !== id)
            }),
            false,
            'deleteOperacao'
          ),

        finalizarOperacao: (id) =>
          set(
            (state) => {
              const operacao = state.operacoes.find(op => op.id === id);
              if (!operacao) return state;

              const operacaoAtualizada = {
                ...operacao,
                status: StatusOperacao.CONCLUIDA,
                dataFim: new Date().toISOString(),
                duracaoReal: Math.floor((new Date().getTime() - new Date(operacao.dataInicio).getTime()) / (1000 * 60))
              };

              // Libera a empilhadeira
              const empilhadeirasAtualizadas = state.empilhadeiras.map(emp =>
                emp.id === operacao.empilhadeiraId 
                  ? { ...emp, operadorAtual: undefined }
                  : emp
              );

              return {
                operacoes: state.operacoes.map(op => 
                  op.id === id ? operacaoAtualizada : op
                ),
                empilhadeiras: empilhadeirasAtualizadas
              };
            },
            false,
            'finalizarOperacao'
          ),

        // Manutenção Actions
        addOrdemServico: (ordem) =>
          set(
            (state) => {
              // Atualiza status da empilhadeira se necessário
              let empilhadeirasAtualizadas = state.empilhadeiras;
              if (ordem.status === StatusManutencao.EM_ANDAMENTO) {
                empilhadeirasAtualizadas = state.empilhadeiras.map(emp =>
                  emp.id === ordem.empilhadeiraId 
                    ? { ...emp, status: StatusEmpilhadeira.EM_MANUTENCAO }
                    : emp
                );
              }
              
              return {
                ordemServicos: [...state.ordemServicos, ordem],
                empilhadeiras: empilhadeirasAtualizadas
              };
            },
            false,
            'addOrdemServico'
          ),

        updateOrdemServico: (id, ordemData) =>
          set(
            (state) => {
              const ordem = state.ordemServicos.find(os => os.id === id);
              if (!ordem) return state;

              const ordemAtualizada = { ...ordem, ...ordemData };
              
              // Atualiza status da empilhadeira baseado no status da ordem
              let empilhadeirasAtualizadas = state.empilhadeiras;
              if (ordemData.status === StatusManutencao.CONCLUIDA) {
                empilhadeirasAtualizadas = state.empilhadeiras.map(emp =>
                  emp.id === ordem.empilhadeiraId 
                    ? { ...emp, status: StatusEmpilhadeira.OPERACIONAL }
                    : emp
                );
              }

              return {
                ordemServicos: state.ordemServicos.map(os => 
                  os.id === id ? ordemAtualizada : os
                ),
                empilhadeiras: empilhadeirasAtualizadas
              };
            },
            false,
            'updateOrdemServico'
          ),

        deleteOrdemServico: (id) =>
          set(
            (state) => ({
              ordemServicos: state.ordemServicos.filter(os => os.id !== id)
            }),
            false,
            'deleteOrdemServico'
          ),

        // Abastecimento Actions
        addAbastecimento: (abastecimento) =>
          set(
            (state) => ({
              abastecimentos: [...state.abastecimentos, abastecimento]
            }),
            false,
            'addAbastecimento'
          ),

        updateAbastecimento: (id, abastecimentoData) =>
          set(
            (state) => ({
              abastecimentos: state.abastecimentos.map(ab => 
                ab.id === id ? { ...ab, ...abastecimentoData } : ab
              )
            }),
            false,
            'updateAbastecimento'
          ),

        deleteAbastecimento: (id) =>
          set(
            (state) => ({
              abastecimentos: state.abastecimentos.filter(ab => ab.id !== id)
            }),
            false,
            'deleteAbastecimento'
          ),

        // Utility Actions
        recalculateMetrics: () =>
          set(
            (state) => {
              const { empilhadeiras, operacoes, ordemServicos, abastecimentos } = state;
              
              const frotaTotal = empilhadeiras.length;
              const empilhadeirasOperacionais = empilhadeiras.filter(e => e.status === StatusEmpilhadeira.OPERACIONAL).length;
              const empilhadeirasManutencao = empilhadeiras.filter(e => e.status === StatusEmpilhadeira.EM_MANUTENCAO).length;
              const empilhadeirasParadas = empilhadeiras.filter(e => e.status === StatusEmpilhadeira.PARADA).length;
              
              const operacoesAtivas = operacoes.filter(o => o.status === StatusOperacao.EM_ANDAMENTO).length;
              const operacoesConcluidas = operacoes.filter(o => o.status === StatusOperacao.CONCLUIDA).length;
              
              const consumoGasTotal = abastecimentos.reduce((sum, ab) => sum + ab.quantidadeLitros, 0);
              const custoOperacionalDia = abastecimentos.reduce((sum, ab) => sum + ab.custoTotal, 0) + 
                                          ordemServicos.reduce((sum, os) => sum + (os.custos?.total || 0), 0);
              
              const eficienciaGeral = empilhadeiras.reduce((sum, e) => sum + e.eficiencia, 0) / frotaTotal;
              const disponibilidadeGeral = empilhadeiras.reduce((sum, e) => sum + e.disponibilidade, 0) / frotaTotal;
              
              const produtividadeMedia = operacoes.reduce((sum, o) => sum + (o.produtividade || 0), 0) / operacoes.length || 0;
              const tempoMedioOperacao = operacoes
                .filter(o => o.duracaoReal)
                .reduce((sum, o) => sum + (o.duracaoReal || 0), 0) / operacoesConcluidas || 0;

              const alertasCriticos = ordemServicos.filter(os => 
                os.prioridade === PrioridadeOperacao.CRITICA && 
                os.status !== StatusManutencao.CONCLUIDA
              ).length;

              return {
                metricas: {
                  frotaTotal,
                  empilhadeirasOperacionais,
                  empilhadeirasManutencao,
                  empilhadeirasParadas,
                  operadoresAtivos: state.operadores.filter(o => o.status === StatusOperador.ATIVO).length,
                  operacoesAtivas,
                  operacoesConcluidas,
                  eficienciaGeral,
                  disponibilidadeGeral,
                  consumoGasTotal,
                  custoOperacionalDia,
                  produtividadeMedia,
                  tempoMedioOperacao,
                  alertasCriticos
                }
              };
            },
            false,
            'recalculateMetrics'
          ),

        generateAlerts: () =>
          set(
            (state) => {
              const alertas: AlertaCritico[] = [];
              
              // Alertas de manutenção
              state.ordemServicos
                .filter(os => os.prioridade === PrioridadeOperacao.CRITICA && os.status !== StatusManutencao.CONCLUIDA)
                .forEach(os => {
                  alertas.push({
                    id: `alert-${os.id}`,
                    tipo: 'Manutenção',
                    nivel: 'Crítico',
                    titulo: `Manutenção Crítica - ${os.empilhadeiraId}`,
                    descricao: os.problema,
                    dataOcorrencia: os.dataAbertura,
                    responsavel: os.tecnico?.nome,
                    status: 'Pendente'
                  });
                });

              // Alertas de eficiência
              state.empilhadeiras
                .filter(e => e.eficiencia < 80)
                .forEach(e => {
                  alertas.push({
                    id: `alert-eff-${e.id}`,
                    tipo: 'Operação',
                    nivel: 'Médio',
                    titulo: `Baixa Eficiência - ${e.id}`,
                    descricao: `Eficiência de ${e.eficiencia}% abaixo do esperado`,
                    dataOcorrencia: new Date().toISOString().split('T')[0],
                    status: 'Pendente'
                  });
                });

              return { alertas };
            },
            false,
            'generateAlerts'
          ),
      }),
      {
        name: 'fleet-management-storage',
        partialize: (state) => ({ 
          sidebarCollapsed: state.sidebarCollapsed,
          empilhadeiras: state.empilhadeiras,
          operadores: state.operadores,
          operacoes: state.operacoes,
          ordemServicos: state.ordemServicos,
          abastecimentos: state.abastecimentos,
          notificacoes: state.notificacoes.slice(0, 10)
        }),
      }
    ),
    { name: 'FleetManagementStore' }
  )
);
