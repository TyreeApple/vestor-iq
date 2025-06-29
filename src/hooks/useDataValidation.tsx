
import { useCallback } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { useToast } from '@/hooks/use-toast';
import { 
  Empilhadeira, 
  Operador, 
  Operacao, 
  OrdemServico, 
  Abastecimento,
  StatusEmpilhadeira,
  StatusOperacao,
  StatusManutencao 
} from '@/types';

export const useDataValidation = () => {
  const { toast } = useToast();
  const { empilhadeiras, operadores, operacoes, ordemServicos } = useAppStore();

  const validateEmpilhadeira = useCallback((empilhadeira: Partial<Empilhadeira>): string[] => {
    const errors: string[] = [];
    
    if (!empilhadeira.modelo?.trim()) {
      errors.push('Bot name is required');
    }
    
    if (!empilhadeira.marca?.trim()) {
      errors.push('Brand is required');
    }
    
    if (!empilhadeira.capacidade || empilhadeira.capacidade <= 0) {
      errors.push('Capital capacity must be greater than zero');
    }
    
    if (!empilhadeira.numeroSerie?.trim()) {
      errors.push('Serial number is required');
    }
    
    // Check for duplicate serial number
    if (empilhadeira.numeroSerie) {
      const existingBot = empilhadeiras.find(e => 
        e.numeroSerie === empilhadeira.numeroSerie && e.id !== empilhadeira.id
      );
      if (existingBot) {
        errors.push('Serial number already exists for another trading bot');
      }
    }
    
    return errors;
  }, [empilhadeiras]);

  const validateOperador = useCallback((operador: Partial<Operador>): string[] => {
    const errors: string[] = [];
    
    if (!operador.nome?.trim()) {
      errors.push('Name is required');
    }
    
    if (!operador.cpf?.trim()) {
      errors.push('CPF is required');
    } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(operador.cpf)) {
      errors.push('CPF must be in format 000.000.000-00');
    }
    
    if (!operador.email?.trim()) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(operador.email)) {
      errors.push('Email must have valid format');
    }
    
    // Check for duplicate CPF
    if (operador.cpf) {
      const existingTrader = operadores.find(o => 
        o.cpf === operador.cpf && o.id !== operador.id
      );
      if (existingTrader) {
        errors.push('CPF already registered for another trader');
      }
    }
    
    // Check for duplicate email
    if (operador.email) {
      const existingTrader = operadores.find(o => 
        o.email === operador.email && o.id !== operador.id
      );
      if (existingTrader) {
        errors.push('Email already registered for another trader');
      }
    }
    
    return errors;
  }, [operadores]);

  const validateOperacao = useCallback((operacao: Partial<Operacao>): string[] => {
    const errors: string[] = [];
    
    if (!operacao.empilhadeiraId) {
      errors.push('Trading bot is required');
    } else {
      // Check if bot exists and is available
      const empilhadeira = empilhadeiras.find(e => e.id === operacao.empilhadeiraId);
      if (!empilhadeira) {
        errors.push('Trading bot not found');
      } else if (empilhadeira.status !== StatusEmpilhadeira.OPERACIONAL) {
        errors.push('Trading bot is not operational');
      } else if (operacao.status === StatusOperacao.EM_ANDAMENTO) {
        // Check if bot is already in use
        const activeOperation = operacoes.find(o => 
          o.empilhadeiraId === operacao.empilhadeiraId && 
          o.status === StatusOperacao.EM_ANDAMENTO &&
          o.id !== operacao.id
        );
        if (activeOperation) {
          errors.push('Trading bot is already in use in another operation');
        }
      }
    }
    
    if (!operacao.operadorId) {
      errors.push('Trader is required');
    } else {
      // Check if trader exists and is active
      const operador = operadores.find(o => o.id === operacao.operadorId);
      if (!operador) {
        errors.push('Trader not found');
      } else if (operador.status !== 'Ativo') {
        errors.push('Trader is not active');
      }
    }
    
    if (!operacao.tipo) {
      errors.push('Operation type is required');
    }
    
    if (!operacao.setor?.trim()) {
      errors.push('Trading floor is required');
    }
    
    if (!operacao.duracaoEstimada || operacao.duracaoEstimada <= 0) {
      errors.push('Estimated duration must be greater than zero');
    }
    
    return errors;
  }, [empilhadeiras, operadores, operacoes]);

  const validateOrdemServico = useCallback((ordem: Partial<OrdemServico>): string[] => {
    const errors: string[] = [];
    
    if (!ordem.empilhadeiraId) {
      errors.push('Trading bot is required');
    } else {
      const empilhadeira = empilhadeiras.find(e => e.id === ordem.empilhadeiraId);
      if (!empilhadeira) {
        errors.push('Trading bot not found');
      }
    }
    
    if (!ordem.problema?.trim()) {
      errors.push('Problem description is required');
    }
    
    if (!ordem.tecnicoId) {
      errors.push('Responsible technician is required');
    } else {
      const tecnico = operadores.find(o => o.id === ordem.tecnicoId);
      if (!tecnico) {
        errors.push('Technician not found');
      }
    }
    
    if (!ordem.tipo) {
      errors.push('Optimization type is required');
    }
    
    if (!ordem.dataAbertura) {
      errors.push('Opening date is required');
    }
    
    // If status is completed, must have completion date
    if (ordem.status === StatusManutencao.CONCLUIDA && !ordem.dataConclusao) {
      errors.push('Completion date is required for completed orders');
    }
    
    return errors;
  }, [empilhadeiras, operadores]);

  const validateAbastecimento = useCallback((abastecimento: Partial<Abastecimento>): string[] => {
    const errors: string[] = [];
    
    if (!abastecimento.empilhadeiraId) {
      errors.push('Trading bot is required');
    } else {
      const empilhadeira = empilhadeiras.find(e => e.id === abastecimento.empilhadeiraId);
      if (!empilhadeira) {
        errors.push('Trading bot not found');
      }
    }
    
    if (!abastecimento.operadorId) {
      errors.push('Trader is required');
    } else {
      const operador = operadores.find(o => o.id === abastecimento.operadorId);
      if (!operador) {
        errors.push('Trader not found');
      }
    }
    
    if (!abastecimento.quantidadeLitros || abastecimento.quantidadeLitros <= 0) {
      errors.push('Capital amount must be greater than zero');
    }
    
    if (!abastecimento.precoLitro || abastecimento.precoLitro <= 0) {
      errors.push('Price per unit must be greater than zero');
    }
    
    if (!abastecimento.fornecedor?.trim()) {
      errors.push('Provider is required');
    }
    
    if (!abastecimento.dataAbastecimento) {
      errors.push('Allocation date is required');
    }
    
    return errors;
  }, [empilhadeiras, operadores]);

  const showValidationErrors = useCallback((errors: string[]) => {
    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join('\n'),
        variant: "destructive"
      });
      return false;
    }
    return true;
  }, [toast]);

  return {
    validateEmpilhadeira,
    validateOperador,
    validateOperacao,
    validateOrdemServico,
    validateAbastecimento,
    showValidationErrors
  };
};
