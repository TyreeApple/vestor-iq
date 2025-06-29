
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Abastecimento } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon } from 'lucide-react';

interface GasSupplyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gasSupply?: Abastecimento;
  onSave: (gasSupply: Abastecimento) => void;
  availableForklifts: { id: string; model: string }[];
  availableOperators: { id: string; name: string }[];
}

const GasSupplyDialog = ({ 
  open, 
  onOpenChange, 
  gasSupply, 
  onSave,
  availableForklifts,
  availableOperators 
}: GasSupplyDialogProps) => {
  const { toast } = useToast();
  const isEditing = !!gasSupply;
  
  const [formData, setFormData] = useState<Partial<Abastecimento>>(
    gasSupply || {
      id: `CP${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`,
      dataAbastecimento: format(new Date(), 'yyyy-MM-dd'),
      empilhadeiraId: '',
      quantidadeLitros: 0,
      horimetroInicial: 0,
      horimetroFinal: 0,
      operadorId: ''
    }
  );

  // Handle bot selection
  const handleForkliftChange = (empilhadeiraId: string) => {
    const selectedForklift = availableForklifts.find(f => f.id === empilhadeiraId);
    setFormData(prev => ({ 
      ...prev, 
      empilhadeiraId
    }));
  };

  // Handle trader selection
  const handleOperatorChange = (operatorId: string) => {
    setFormData(prev => ({ ...prev, operadorId: operatorId }));
  };

  // Handle form field changes
  const handleChange = (field: keyof Abastecimento, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Format date for display
  const formatDateForDisplay = (dateString: string) => {
    try {
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    } catch (e) {
      return dateString;
    }
  };

  // Parse date string to Date object
  const parseDate = (dateStr: string): Date => {
    try {
      const [year, month, day] = dateStr.split('-').map(Number);
      return new Date(year, month - 1, day);
    } catch (e) {
      return new Date();
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.empilhadeiraId || !formData.quantidadeLitros || !formData.horimetroInicial || !formData.horimetroFinal || !formData.operadorId) {
      toast({
        title: "Error saving",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (formData.horimetroFinal! <= formData.horimetroInicial!) {
      toast({
        title: "Validation error",
        description: "Final runtime must be greater than initial runtime",
        variant: "destructive"
      });
      return;
    }
    
    // Save capital allocation
    onSave(formData as Abastecimento);
    
    // Reset form and close dialog
    if (!isEditing) {
      setFormData({
        id: `CP${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`,
        dataAbastecimento: format(new Date(), 'yyyy-MM-dd'),
        empilhadeiraId: '',
        quantidadeLitros: 0,
        horimetroInicial: 0,
        horimetroFinal: 0,
        operadorId: ''
      });
    }
    
    onOpenChange(false);
    
    toast({
      title: isEditing ? "Capital allocation updated" : "Capital allocation recorded",
      description: `Capital allocation ${isEditing ? 'updated' : 'recorded'} successfully!`
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Capital Allocation' : 'New Capital Allocation'}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Edit the capital allocation information in the fields below.' 
              : 'Fill in the new capital allocation information in the fields below.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dataAbastecimento">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formatDateForDisplay(formData.dataAbastecimento || '')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={parseDate(formData.dataAbastecimento || '')}
                    onSelect={(date) => handleChange('dataAbastecimento', format(date || new Date(), 'yyyy-MM-dd'))}
                    locale={ptBR}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="empilhadeiraId">Trading Bot</Label>
              <Select 
                value={formData.empilhadeiraId} 
                onValueChange={handleForkliftChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select trading bot" />
                </SelectTrigger>
                <SelectContent>
                  {availableForklifts.map(forklift => (
                    <SelectItem key={forklift.id} value={forklift.id}>
                      {forklift.model} ({forklift.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quantidadeLitros">Capital Amount ($)</Label>
              <Input 
                id="quantidadeLitros" 
                type="number"
                step="0.01"
                min="0"
                value={formData.quantidadeLitros} 
                onChange={(e) => handleChange('quantidadeLitros', parseFloat(e.target.value))}
                placeholder="0.00"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="operadorId">Trader</Label>
              <Select 
                value={formData.operadorId} 
                onValueChange={handleOperatorChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select trader" />
                </SelectTrigger>
                <SelectContent>
                  {availableOperators.map(operator => (
                    <SelectItem key={operator.id} value={operator.id}>
                      {operator.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="horimetroInicial">Initial Runtime</Label>
              <Input 
                id="horimetroInicial" 
                type="number"
                min="0"
                value={formData.horimetroInicial} 
                onChange={(e) => handleChange('horimetroInicial', parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="horimetroFinal">Final Runtime</Label>
              <Input 
                id="horimetroFinal" 
                type="number"
                min="0"
                value={formData.horimetroFinal} 
                onChange={(e) => handleChange('horimetroFinal', parseInt(e.target.value))}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{isEditing ? 'Save Changes' : 'Record Allocation'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GasSupplyDialog;
