
import {
  TipoEmpilhadeira,
  StatusEmpilhadeira,
  FuncaoOperador,
  StatusOperador,
  StatusOperacao,
  TipoOperacao,
  TipoManutencao,
  StatusManutencao,
  PrioridadeOperacao
} from "@/types";

export const empilhadeiras = [
  {
    id: "BOT-001",
    modelo: "Alpha Scalper Pro",
    marca: "TradeTech",
    tipo: TipoEmpilhadeira.GAS,
    status: StatusEmpilhadeira.OPERACIONAL,
    capacidade: 100000,
    anoFabricacao: 2023,
    dataAquisicao: "2023-06-10",
    numeroSerie: "ATP-PRO-0001",
    horimetro: 3700,
    ultimaManutencao: "2024-05-10",
    proximaManutencao: "2024-11-10",
    localizacaoAtual: "Trading Floor A",
    setor: "High Frequency Trading",
    operadorAtual: "O-001",
    custoHora: 120,
    eficiencia: 87,
    disponibilidade: 98,
    qrCode: "QRBOT001",
    observacoes: "Primary scalping bot for the trading floor.",
  },
  {
    id: "BOT-002",
    modelo: "Beta Swing Master",
    marca: "AlgoTrade",
    tipo: TipoEmpilhadeira.GAS,
    status: StatusEmpilhadeira.PARADA,
    capacidade: 75000,
    anoFabricacao: 2023,
    dataAquisicao: "2023-01-15",
    numeroSerie: "BSM-ALG-0002",
    horimetro: 1200,
    ultimaManutencao: "2024-05-21",
    proximaManutencao: "2024-12-21",
    localizacaoAtual: "Trading Floor B",
    setor: "Swing Trading",
    eficiencia: 76,
    disponibilidade: 77,
    custoHora: 110,
    qrCode: "QRBOT002",
    observacoes: "Awaiting algorithm optimization.",
  }
];

export const operadores = [
  {
    id: "O-001",
    nome: "Ana Silva",
    cpf: "123.456.789-00",
    email: "ana.silva@email.com",
    telefone: "11999999999",
    funcao: FuncaoOperador.OPERADOR,
    dataAdmissao: "2022-02-17",
    turno: "Morning",
    setor: "High Frequency Trading",
    certificacoes: [],
    avaliacoes: [],
    horasTrabalhadas: 1800,
    produtividade: 97,
    status: StatusOperador.ATIVO,
  },
  {
    id: "O-002",
    nome: "Carlos Dias",
    cpf: "987.654.321-00",
    email: "carlos.dias@email.com",
    telefone: "11988888888",
    funcao: FuncaoOperador.OPERADOR,
    dataAdmissao: "2021-11-02",
    turno: "Night",
    setor: "Swing Trading",
    certificacoes: [],
    avaliacoes: [],
    horasTrabalhadas: 2100,
    produtividade: 92,
    status: StatusOperador.ATIVO,
  }
];

export const operacoes = [
  {
    id: "OP-101",
    empilhadeiraId: "BOT-001",
    empilhadeira: empilhadeiras[0],
    operadorId: "O-001",
    operador: operadores[0],
    tipo: TipoOperacao.MOVIMENTACAO,
    status: StatusOperacao.EM_ANDAMENTO,
    prioridade: PrioridadeOperacao.NORMAL,
    setor: "High Frequency Trading",
    localizacao: "Trading Floor A",
    dataInicio: new Date().toISOString(),
    duracaoEstimada: 40,
    produtividade: 90,
  }
];

export const ordemServicos = [
  {
    id: "OS-001",
    empilhadeiraId: "BOT-002",
    empilhadeira: empilhadeiras[1],
    tipo: TipoManutencao.CORRETIVA,
    status: StatusManutencao.EM_ANDAMENTO,
    prioridade: PrioridadeOperacao.CRITICA,
    problema: "Algorithm performance degradation",
    dataAbertura: new Date().toISOString(),
    custos: {
      pecas: 200,
      maoObra: 400,
      terceiros: 0,
      total: 600
    },
    pecasUtilizadas: [],
    anexos: [],
  },
];

export const abastecimentos = [
  {
    id: "AB-001",
    empilhadeiraId: "BOT-001",
    empilhadeira: empilhadeiras[0],
    operadorId: "O-001",
    operador: operadores[0],
    dataAbastecimento: new Date().toISOString(),
    horimetroInicial: 3700,
    quantidadeLitros: 25,
    custoTotal: 160,
    precoLitro: 6.40,
    fornecedor: "Cloud Computing Services",
    localAbastecimento: "Data Center"
  }
];
