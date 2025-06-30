
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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Abastecimento } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CapitalAllocationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  capitalAllocation?: Abastecimento;
  onSave: (allocation: Abastecimento) => void;
  availableTradingBots: { id: string; model: string }[];
  availableOperators: { id: string; name: string }[];
}

const CapitalAllocationDialog: React.FC<CapitalAllocationDialogProps> = ({
  open,
  onOpenChange,
  capitalAllocation,
  onSave,
  availableTradingBots,
  availableOperators
}) => {
  const { toast } = useToast();
  const isEditing = !!capitalAllocation;
  
  const [formData, setFormData] = useState<Partial<Abastecimento>>({
    id: '',
    empilhadeiraId: '',
    operadorId: '',
    dataAbastecimento: new Date().toISOString(),
    horimetroInicial: 0,
    quantidadeLitros: 0,
    custoTotal: 0,
    precoLitro: 0,
    fornecedor: '',
    localAbastecimento: '',
    observacoes: ''
  });

  const [allocationDate, setAllocationDate] = useState<Date>(new Date());

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open) {
      if (capitalAllocation) {
        setFormData(capitalAllocation);
        setAllocationDate(new Date(capitalAllocation.dataAbastecimento));
      } else {
        const newId = `CA-${Date.now().toString().slice(-6)}`;
        setFormData({
          id: newId,
          empilhadeiraId: '',
          operadorId: '',
          dataAbastecimento: new Date().toISOString(),
          horimetroInicial: 0,
          quantidadeLitros: 0,
          custoTotal: 0,
          precoLitro: 0,
          fornecedor: '',
          localAbastecimento: '',
          observacoes: ''
        });
        setAllocationDate(new Date());
      }
    }
  }, [open, capitalAllocation]);

  // Handle form field changes
  const handleChange = (field: keyof Abastecimento, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-calculate total cost when amount or price changes
    if (field === 'quantidadeLitros' || field === 'precoLitro') {
      const amount = field === 'quantidadeLitros' ? value : formData.quantidadeLitros || 0;
      const price = field === 'precoLitro' ? value : formData.precoLitro || 0;
      setFormData(prev => ({ ...prev, custoTotal: amount * price }));
    }
  };

  // Handle date change
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setAllocationDate(date);
      setFormData(prev => ({ ...prev, dataAbastecimento: date.toISOString() }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.empilhadeiraId || !formData.operadorId || !formData.quantidadeLitros || !formData.precoLitro) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Save allocation
    const allocationData: Abastecimento = {
      ...formData,
      dataAbastecimento: allocationDate.toISOString(),
      custoTotal: (formData.quantidadeLitros || 0) * (formData.precoLitro || 0)
    } as Abastecimento;
    
    onSave(allocationData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Capital Allocation' : 'New Capital Allocation'}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Update the capital allocation details below.' 
              : 'Add a new capital allocation to the trading bot.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Trading Bot Selection */}
            <div className="space-y-2">
              <Label htmlFor="tradingBot">Trading Bot *</Label>
              <Select 
                value={formData.empilhadeiraId} 
                onValueChange={(value) => handleChange('empilhadeiraId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select trading bot" />
                </SelectTrigger>
                <SelectContent>
                  {availableTradingBots.map(bot => (
                    <SelectItem key={bot.id} value={bot.id}>
                      {bot.id} - {bot.model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Trader Selection */}
            <div className="space-y-2">
              <Label htmlFor="trader">Trader *</Label>
              <Select 
                value={formData.operadorId} 
                onValueChange={(value) => handleChange('operadorId', value)}
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

            {/* Capital Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Capital Amount ($) *</Label>
              <Input 
                id="amount"
                type="number"
                min="0"
                step="1"
                value={formData.quantidadeLitros || ''} 
                onChange={(e) => handleChange('quantidadeLitros', parseFloat(e.target.value) || 0)}
                placeholder="Enter capital amount"
              />
            </div>

            {/* Price per Unit */}
            <div className="space-y-2">
              <Label htmlFor="price">Price per Unit ($) *</Label>
              <Input 
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.precoLitro || ''} 
                onChange={(e) => handleChange('precoLitro', parseFloat(e.target.value) || 0)}
                placeholder="Enter price per unit"
              />
            </div>

            {/* Total Investment (Auto-calculated) */}
            <div className="space-y-2">
              <Label htmlFor="total">Total Investment ($)</Label>
              <Input 
                id="total"
                type="number"
                value={formData.custoTotal || 0} 
                disabled
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>

            {/* Initial Hours */}
            <div className="space-y-2">
              <Label htmlFor="initialHours">Initial Hours</Label>
              <Input 
                id="initialHours"
                type="number"
                min="0"
                value={formData.horimetroInicial || ''} 
                onChange={(e) => handleChange('horimetroInicial', parseInt(e.target.value) || 0)}
                placeholder="Enter initial hours"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Broker */}
            <div className="space-y-2">
              <Label htmlFor="broker">Broker</Label>
              <Input 
                id="broker"
                value={formData.fornecedor || ''} 
                onChange={(e) => handleChange('fornecedor', e.target.value)}
                placeholder="Enter broker name"
              />
            </div>

            {/* Market */}
            <div className="space-y-2">
              <Label htmlFor="market">Market</Label>
              <Input 
                id="market"
                value={formData.localAbastecimento || ''} 
                onChange={(e) => handleChange('localAbastecimento', e.target.value)}
                placeholder="Enter market name"
              />
            </div>
          </div>

          {/* Allocation Date */}
          <div className="space-y-2">
            <Label>Allocation Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !allocationDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {allocationDate ? format(allocationDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={allocationDate}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Observations */}
          <div className="space-y-2">
            <Label htmlFor="observations">Observations</Label>
            <Textarea 
              id="observations"
              value={formData.observacoes || ''} 
              onChange={(e) => handleChange('observacoes', e.target.value)}
              placeholder="Enter any additional notes or observations..."
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? 'Update Allocation' : 'Create Allocation'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CapitalAllocationDialog;
