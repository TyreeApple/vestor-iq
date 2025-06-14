
// ===== SISTEMA AVANÇADO DE GESTÃO DE FROTAS =====
// Tipos TypeScript completos e robustos

export enum StatusEmpilhadeira {
  OPERACIONAL = "Operacional",
  EM_MANUTENCAO = "Em Manutenção",
  PARADA = "Parada",
  EM_REPARO = "Em Reparo",
  DISPONIVEL = "Disponível"
}

export enum TipoEmpilhadeira {
  GAS = "Gás",
  ELETRICA = "Elétrica",
  RETRATIL = "Retrátil",
  REACH_TRUCK = "Reach Truck",
  CONTRA_BALANCEADA = "Contra-balanceada"
}

export enum TipoOperacao {
  CARGA = "Carga",
  DESCARGA = "Descarga",
  MOVIMENTACAO = "Movimentação",
  ESTOQUE = "Estoque",
  PICKING = "Picking"
}

export enum StatusOperacao {
  PLANEJADA = "Planejada",
  EM_ANDAMENTO = "Em Andamento",
  PAUSADA = "Pausada",
  CONCLUIDA = "Concluída",
  CANCELADA = "Cancelada"
}

export enum PrioridadeOperacao {
  BAIXA = "Baixa",
  NORMAL = "Normal",
  ALTA = "Alta",
  CRITICA = "Crítica"
}

export enum TipoManutencao {
  PREVENTIVA = "Preventiva",
  CORRETIVA = "Corretiva",
  PREDITIVA = "Preditiva",
  URGENTE = "Urgente"
}

export enum StatusManutencao {
  ABERTA = "Aberta",
  EM_ANDAMENTO = "Em Andamento",
  AGUARDANDO_PECAS = "Aguardando Peças",
  CONCLUIDA = "Concluída",
  CANCELADA = "Cancelada"
}

export enum TipoCertificacao {
  NR11 = "NR-11",
  ASO = "ASO",
  TREINAMENTO = "Treinamento",
  HABILITACAO = "Habilitação",
  RENOVACAO = "Renovação"
}

export enum StatusCertificacao {
  VALIDO = "Válido",
  VENCENDO = "Vencendo",
  VENCIDO = "Vencido",
  SUSPENSO = "Suspenso"
}

export enum FuncaoOperador {
  OPERADOR = "Operador",
  SUPERVISOR = "Supervisor",
  TECNICO = "Técnico",
  COORDENADOR = "Coordenador",
  GERENTE = "Gerente"
}

// Legacy type aliases for backward compatibility
export type ForkliftStatus = StatusEmpilhadeira;
export type ForkliftType = TipoEmpilhadeira;
export type MaintenanceStatus = StatusManutencao;
export type CertificateStatus = StatusCertificacao;
export type UserRole = FuncaoOperador;

// ===== INTERFACES PRINCIPAIS =====

export interface Empilhadeira {
  id: string;
  modelo: string;
  marca: string;
  tipo: TipoEmpilhadeira;
  status: StatusEmpilhadeira;
  capacidade: number; // em kg
  anoFabricacao: number;
  dataAquisicao: string;
  numeroSerie: string;
  horimetro: number;
  ultimaManutencao: string;
  proximaManutencao: string;
  localizacaoAtual: string;
  setor: string;
  operadorAtual?: string;
  custoHora: number;
  eficiencia: number; // %
  disponibilidade: number; // %
  foto?: string;
  qrCode: string;
  observacoes?: string;
  coordenadas?: [number, number];
}

// Legacy alias
export type Forklift = Empilhadeira;

export interface Operador {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  funcao: FuncaoOperador;
  dataAdmissao: string;
  turno: string;
  setor: string;
  foto?: string;
  certificacoes: Certificacao[];
  avaliacoes: Avaliacao[];
  horasTrabalhadas: number;
  produtividade: number;
  status: 'Ativo' | 'Inativo' | 'Férias' | 'Licença';
  observacoes?: string;
}

// Legacy alias
export type User = Operador;

export interface Certificacao {
  id: string;
  tipo: TipoCertificacao;
  numero: string;
  dataEmissao: string;
  dataVencimento: string;
  orgaoEmissor: string;
  status: StatusCertificacao;
  arquivo?: string;
  observacoes?: string;
}

export interface Avaliacao {
  id: string;
  data: string;
  nota: number;
  avaliador: string;
  comentarios: string;
  pontosMelhoria: string[];
}

export interface Operacao {
  id: string;
  empilhadeiraId: string;
  empilhadeira: Empilhadeira;
  operadorId: string;
  operador: Operador;
  tipo: TipoOperacao;
  status: StatusOperacao;
  prioridade: PrioridadeOperacao;
  setor: string;
  localizacao: string;
  dataInicio: string;
  dataFim?: string;
  duracaoEstimada: number; // em minutos
  duracaoReal?: number;
  produtividade?: number;
  observacoes?: string;
  coordenadas?: [number, number];
  consumoGas?: number;
  custoOperacional?: number;
}

// Legacy alias
export type Operation = Operacao;

export interface OrdemServico {
  id: string;
  empilhadeiraId: string;
  empilhadeira: Empilhadeira;
  tipo: TipoManutencao;
  status: StatusManutencao;
  prioridade: PrioridadeOperacao;
  problema: string;
  diagnostico?: string;
  solucao?: string;
  tecnicoId?: string;
  tecnico?: Operador;
  dataAbertura: string;
  dataInicio?: string;
  dataConclusao?: string;
  horimetroInicio?: number;
  horimetroFim?: number;
  custos: CustosManutencao;
  pecasUtilizadas: PecaUtilizada[];
  anexos: string[];
  observacoes?: string;
}

// Legacy alias
export type Maintenance = OrdemServico;

export interface CustosManutencao {
  pecas: number;
  maoObra: number;
  terceiros: number;
  total: number;
}

export interface PecaUtilizada {
  id: string;
  nome: string;
  codigo: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}

export interface Abastecimento {
  id: string;
  empilhadeiraId: string;
  empilhadeira: Empilhadeira;
  operadorId: string;
  operador: Operador;
  dataAbastecimento: string;
  horimetroInicial: number;
  horimetroFinal?: number;
  quantidadeLitros: number;
  custoTotal: number;
  precoLitro: number;
  fornecedor: string;
  localAbastecimento: string;
  eficiencia?: number; // L/h
  observacoes?: string;
  foto?: string;
}

// Legacy alias
export type GasSupply = Abastecimento;

export interface Setor {
  id: string;
  nome: string;
  descricao: string;
  responsavel: string;
  area: number; // em m²
  capacidadeMaxima: number;
  empilhadeirasAlocadas: string[];
  observacoes?: string;
}

// ===== DASHBOARD E MÉTRICAS =====

export interface MetricasDashboard {
  frotaTotal: number;
  empilhadeirasOperacionais: number;
  empilhadeirasManutencao: number;
  empilhadeirasParadas: number;
  operadoresAtivos: number;
  operacoesAtivas: number;
  operacoesConcluidas: number;
  eficienciaGeral: number;
  disponibilidadeGeral: number;
  consumoGasTotal: number;
  custoOperacionalDia: number;
  produtividadeMedia: number;
  tempoMedioOperacao: number;
  alertasCriticos: number;
}

// Legacy alias
export type DashboardStats = MetricasDashboard;

export interface AlertaCritico {
  id: string;
  tipo: 'Manutenção' | 'Certificação' | 'Operação' | 'Sistema';
  nivel: 'Baixo' | 'Médio' | 'Alto' | 'Crítico';
  titulo: string;
  descricao: string;
  dataOcorrencia: string;
  responsavel?: string;
  acao?: string;
  status: 'Pendente' | 'Em Andamento' | 'Resolvido';
}

// ===== RELATÓRIOS =====

export interface RelatorioTemplate {
  id: string;
  nome: string;
  categoria: 'Operacional' | 'Financeiro' | 'Manutenção' | 'Compliance' | 'Ambiental';
  descricao: string;
  parametros: ParametroRelatorio[];
  formato: 'PDF' | 'Excel' | 'Dashboard' | 'CSV';
  agendamento?: AgendamentoRelatorio;
  ultimaExecucao?: string;
}

export interface ParametroRelatorio {
  nome: string;
  tipo: 'data' | 'periodo' | 'lista' | 'numero' | 'texto';
  obrigatorio: boolean;
  valorPadrao?: any;
  opcoes?: string[];
}

export interface AgendamentoRelatorio {
  frequencia: 'Diário' | 'Semanal' | 'Mensal' | 'Trimestral';
  diasSemana?: number[];
  diaMes?: number;
  hora: string;
  emails: string[];
  ativo: boolean;
}

// ===== FILTROS E BUSCA =====

export interface FiltrosAvancados {
  busca?: string;
  status?: string[];
  tipo?: string[];
  setor?: string[];
  periodo?: {
    inicio: string;
    fim: string;
  };
  capacidade?: {
    min: number;
    max: number;
  };
  horimetro?: {
    min: number;
    max: number;
  };
  eficiencia?: {
    min: number;
    max: number;
  };
}

// ===== NOTIFICAÇÕES =====

export interface Notificacao {
  id: string;
  tipo: 'Info' | 'Sucesso' | 'Aviso' | 'Erro';
  titulo: string;
  mensagem: string;
  dataCreacao: string;
  lida: boolean;
  acao?: {
    texto: string;
    url: string;
  };
}

export interface ConfiguracaoNotificacao {
  inApp: boolean;
  email: boolean;
  sms: boolean;
  push: boolean;
  webhook?: string;
}

// ===== LEGACY COMPONENT PROPS =====

export interface StatusCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType;
  color: string;
}
