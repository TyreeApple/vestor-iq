
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Operation } from '@/types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { Badge } from "@/components/ui/badge";

interface OperationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  operation?: Operation;
  onSave: (operation: Operation) => void;
  availableOperators: { id: string; name: string }[];
  availableForklifts: { id: string; model: string }[];
}

const OperationDialog = ({ 
  open, 
  onOpenChange, 
  operation, 
  onSave,
  availableOperators,
  availableForklifts
}: OperationDialogProps) => {
  const { toast } = useToast();
  const isEditing = !!operation;
  
  // Form state
  const [formData, setFormData] = useState<Partial<Operation>>({
    operatorId: '',
    operatorName: '',
    forkliftId: '',
    forkliftModel: '',
    sector: '',
    initialHourMeter: 0,
    currentHourMeter: 0,
    gasConsumption: 0,
    startTime: new Date().toISOString().slice(0, 16),
    status: 'active'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form with operation data if editing
  useEffect(() => {
    if (operation) {
      setFormData({
        ...operation,
        startTime: new Date(operation.startTime).toISOString().slice(0, 16),
        endTime: operation.endTime ? new Date(operation.endTime).toISOString().slice(0, 16) : undefined
      });
    } else {
      // Reset form for new operation
      setFormData({
        operatorId: '',
        operatorName: '',
        forkliftId: '',
        forkliftModel: '',
        sector: '',
        initialHourMeter: 0,
        currentHourMeter: 0,
        gasConsumption: 0,
        startTime: new Date().toISOString().slice(0, 16),
        status: 'active'
      });
    }
    setErrors({});
  }, [operation, open]);

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.operatorId) {
      newErrors.operatorId = 'Operador é obrigatório';
    }
    if (!formData.forkliftId) {
      newErrors.forkliftId = 'Empilhadeira é obrigatória';
    }
    if (!formData.sector?.trim()) {
      newErrors.sector = 'Setor é obrigatório';
    }
    if (!formData.startTime) {
      newErrors.startTime = 'Data/hora de início é obrigatória';
    }
    if (formData.initialHourMeter === undefined || formData.initialHourMeter < 0) {
      newErrors.initialHourMeter = 'Horímetro inicial deve ser maior ou igual a 0';
    }
    if (formData.currentHourMeter !== undefined && formData.currentHourMeter < (formData.initialHourMeter || 0)) {
      newErrors.currentHourMeter = 'Horímetro atual deve ser maior ou igual ao inicial';
    }
    if (formData.gasConsumption !== undefined && formData.gasConsumption < 0) {
      newErrors.gasConsumption = 'Consumo de combustível deve ser maior ou igual a 0';
    }
    if (formData.endTime && formData.startTime && new Date(formData.endTime) <= new Date(formData.startTime)) {
      newErrors.endTime = 'Data/hora de término deve ser posterior ao início';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle operator selection
  const handleOperatorChange = (operatorId: string) => {
    const selectedOperator = availableOperators.find(op => op.id === operatorId);
    if (selectedOperator) {
      setFormData(prev => ({
        ...prev,
        operatorId,
        operatorName: selectedOperator.name
      }));
      if (errors.operatorId) {
        setErrors(prev => ({ ...prev, operatorId: '' }));
      }
    }
  };

  // Handle forklift selection
  const handleForkliftChange = (forkliftId: string) => {
    const selectedForklift = availableForklifts.find(f => f.id === forkliftId);
    if (selectedForklift) {
      setFormData(prev => ({
        ...prev,
        forkliftId,
        forkliftModel: selectedForklift.model
      }));
      if (errors.forkliftId) {
        setErrors(prev => ({ ...prev, forkliftId: '' }));
      }
    }
  };

  // Handle sector change
  const handleSectorChange = (value: string) => {
    setFormData(prev => ({ ...prev, sector: value }));
    if (errors.sector) {
      setErrors(prev => ({ ...prev, sector: '' }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Erro de validação",
        description: "Por favor, corrija os erros no formulário.",
        variant: "destructive"
      });
      return;
    }

    // Generate ID for new operations
    const operationData: Operation = {
      id: operation?.id || `OP${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      ...formData as Operation
    };

    // Save the operation
    onSave(operationData);
    
    // Close the dialog
    onOpenChange(false);
  };

  // Calculate if the operation can be completed
  const canComplete = isEditing && operation?.status === 'active';

  // Complete the operation
  const handleComplete = () => {
    if (!validateForm()) {
      return;
    }

    const now = new Date();
    const completedOperation: Operation = {
      ...formData as Operation,
      status: 'completed',
      endTime: now.toISOString(),
      currentHourMeter: formData.currentHourMeter || formData.initialHourMeter
    };
    
    onSave(completedOperation);
    onOpenChange(false);
    
    toast({
      title: "Operação concluída",
      description: "A operação foi finalizada com sucesso."
    });
  };

  // Predefined sectors
  const sectors = [
    'Armazém A',
    'Armazém B', 
    'Armazém C',
    'Expedição',
    'Recebimento',
    'Produção',
    'Estoque',
    'Doca 1',
    'Doca 2',
    'Pátio'
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isEditing ? 'Editar Operação' : 'Nova Operação'}
            {isEditing && (
              <Badge 
                variant={operation?.status === 'active' ? 'default' : 'secondary'}
                className={operation?.status === 'active' ? 'bg-green-500 text-white' : ''}
              >
                {operation?.status === 'active' ? 'Em Andamento' : 'Concluída'}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="operatorId">Operador *</Label>
              <Select 
                value={formData.operatorId} 
                onValueChange={handleOperatorChange}
              >
                <SelectTrigger id="operatorId" className={errors.operatorId ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Selecione um operador" />
                </SelectTrigger>
                <SelectContent>
                  {availableOperators.map(operator => (
                    <SelectItem key={operator.id} value={operator.id}>
                      {operator.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.operatorId && <p className="text-sm text-red-500">{errors.operatorId}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="forkliftId">Empilhadeira *</Label>
              <Select 
                value={formData.forkliftId}
                onValueChange={handleForkliftChange}
              >
                <SelectTrigger id="forkliftId" className={errors.forkliftId ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Selecione uma empilhadeira" />
                </SelectTrigger>
                <SelectContent>
                  {availableForklifts.map(forklift => (
                    <SelectItem key={forklift.id} value={forklift.id}>
                      {forklift.model} ({forklift.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.forkliftId && <p className="text-sm text-red-500">{errors.forkliftId}</p>}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sector">Setor *</Label>
            <Select value={formData.sector} onValueChange={handleSectorChange}>
              <SelectTrigger className={errors.sector ? 'border-red-500' : ''}>
                <SelectValue placeholder="Selecione um setor" />
              </SelectTrigger>
              <SelectContent>
                {sectors.map(sector => (
                  <SelectItem key={sector} value={sector}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.sector && <p className="text-sm text-red-500">{errors.sector}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="initialHourMeter">Horímetro Inicial *</Label>
              <Input
                id="initialHourMeter"
                name="initialHourMeter"
                type="number"
                min="0"
                value={formData.initialHourMeter}
                onChange={handleChange}
                className={errors.initialHourMeter ? 'border-red-500' : ''}
              />
              {errors.initialHourMeter && <p className="text-sm text-red-500">{errors.initialHourMeter}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currentHourMeter">Horímetro Atual</Label>
              <Input
                id="currentHourMeter"
                name="currentHourMeter"
                type="number"
                min={formData.initialHourMeter || 0}
                value={formData.currentHourMeter || formData.initialHourMeter}
                onChange={handleChange}
                className={errors.currentHourMeter ? 'border-red-500' : ''}
              />
              {errors.currentHourMeter && <p className="text-sm text-red-500">{errors.currentHourMeter}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Data/Hora de Início *</Label>
              <Input
                id="startTime"
                name="startTime"
                type="datetime-local"
                value={formData.startTime}
                onChange={handleChange}
                className={errors.startTime ? 'border-red-500' : ''}
              />
              {errors.startTime && <p className="text-sm text-red-500">{errors.startTime}</p>}
            </div>
            
            {isEditing && (
              <div className="space-y-2">
                <Label htmlFor="endTime">Data/Hora de Término</Label>
                <Input
                  id="endTime"
                  name="endTime"
                  type="datetime-local"
                  value={formData.endTime || ''}
                  onChange={handleChange}
                  disabled={formData.status === 'active'}
                  className={errors.endTime ? 'border-red-500' : ''}
                />
                {errors.endTime && <p className="text-sm text-red-500">{errors.endTime}</p>}
              </div>
            )}
          </div>
          
          {isEditing && (
            <div className="space-y-2">
              <Label htmlFor="gasConsumption">Consumo de Combustível (L)</Label>
              <Input
                id="gasConsumption"
                name="gasConsumption"
                type="number"
                step="0.1"
                min="0"
                value={formData.gasConsumption || ''}
                onChange={handleChange}
                placeholder="Opcional"
                className={errors.gasConsumption ? 'border-red-500' : ''}
              />
              {errors.gasConsumption && <p className="text-sm text-red-500">{errors.gasConsumption}</p>}
            </div>
          )}
          
          <DialogFooter className="pt-4">
            {canComplete && (
              <Button 
                type="button" 
                variant="outline" 
                className="mr-auto" 
                onClick={handleComplete}
              >
                Finalizar Operação
              </Button>
            )}
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {isEditing ? 'Salvar Alterações' : 'Criar Operação'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OperationDialog;
