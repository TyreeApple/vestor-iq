import React from 'react';
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
import { StatusCertificacao, Operador, FuncaoOperador, StatusOperador, TipoCertificacao } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon } from 'lucide-react';

interface OperatorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  operator?: Operador;
  onSave: (operator: Operador) => void;
}

const OperatorDialog = ({ open, onOpenChange, operator, onSave }: OperatorDialogProps) => {
  const { toast } = useToast();
  const isEditing = !!operator;
  
  const [formData, setFormData] = React.useState<Partial<Operador>>(
    operator || {
      id: `OP${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`,
      name: '',
      nome: '',
      role: FuncaoOperador.OPERADOR,
      funcao: FuncaoOperador.OPERADOR,
      cpf: '',
      contact: '',
      telefone: '',
      shift: 'Morning',
      turno: 'Morning',
      registrationDate: format(new Date(), 'dd/MM/yyyy'),
      dataAdmissao: format(new Date(), 'dd/MM/yyyy'),
      asoExpirationDate: format(new Date(new Date().setMonth(new Date().getMonth() + 12)), 'dd/MM/yyyy'),
      nrExpirationDate: format(new Date(new Date().setMonth(new Date().getMonth() + 12)), 'dd/MM/yyyy'),
      asoStatus: StatusCertificacao.VALIDO,
      nrStatus: StatusCertificacao.VALIDO,
      certificacoes: [],
      avaliacoes: [],
      horasTrabalhadas: 0,
      produtividade: 0,
      status: StatusOperador.ATIVO,
      email: '',
      setor: ''
    }
  );

  // Convert date string to Date object for Calendar
  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  // Handle form field changes
  const handleChange = (field: keyof Operador, value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: value,
      // Keep both Portuguese and English properties in sync
      ...(field === 'name' && { nome: value }),
      ...(field === 'nome' && { name: value }),
      ...(field === 'role' && { funcao: value as FuncaoOperador }),
      ...(field === 'funcao' && { role: value as FuncaoOperador }),
      ...(field === 'contact' && { telefone: value }),
      ...(field === 'telefone' && { contact: value }),
      ...(field === 'shift' && { turno: value }),
      ...(field === 'turno' && { shift: value }),
      ...(field === 'registrationDate' && { dataAdmissao: value }),
      ...(field === 'dataAdmissao' && { registrationDate: value })
    }));
  };

  // Handle date changes
  const handleDateChange = (field: 'asoExpirationDate' | 'nrExpirationDate', date: Date | undefined) => {
    if (!date) return;
    
    const formattedDate = format(date, 'dd/MM/yyyy');
    setFormData(prev => ({ ...prev, [field]: formattedDate }));
    
    // Update certificate status based on date
    const today = new Date();
    const expirationDate = date;
    const diffTime = expirationDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
    
    let status: StatusCertificacao;
    if (diffDays < 0) {
      status = StatusCertificacao.VENCIDO;
    } else if (diffDays <= 30) {
      status = StatusCertificacao.VENCENDO;
    } else {
      status = StatusCertificacao.VALIDO;
    }
    
    const statusField = field === 'asoExpirationDate' ? 'asoStatus' : 'nrStatus';
    setFormData(prev => ({ ...prev, [statusField]: status }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.nome || !formData.cpf || !formData.telefone) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Create certificates based on form data
    const certificates = [
      {
        id: `cert-aso-${formData.id}`,
        tipo: TipoCertificacao.ASO,
        numero: `ASO-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
        dataEmissao: format(new Date(), 'dd/MM/yyyy'),
        dataVencimento: formData.asoExpirationDate || '',
        status: formData.asoStatus || StatusCertificacao.VALIDO,
        orgaoEmissor: 'Medical Department'
      },
      {
        id: `cert-nr11-${formData.id}`,
        tipo: TipoCertificacao.NR11,
        numero: `NR11-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
        dataEmissao: format(new Date(), 'dd/MM/yyyy'),
        dataVencimento: formData.nrExpirationDate || '',
        status: formData.nrStatus || StatusCertificacao.VALIDO,
        orgaoEmissor: 'Safety Department'
      }
    ];

    const operatorData: Operador = {
      ...formData as Operador,
      certificacoes: certificates,
      avaliacoes: formData.avaliacoes || []
    };

    onSave(operatorData);
    onOpenChange(false);
    
    toast({
      title: isEditing ? "Operator Updated" : "Operator Created",
      description: isEditing ? "The operator has been updated successfully." : "New operator has been created successfully."
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Operator' : 'New Operator'}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? 'Edit the operator information below.' : 'Fill in the information to create a new operator.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="id">ID *</Label>
              <Input
                id="id"
                value={formData.id}
                onChange={(e) => handleChange('id', e.target.value)}
                disabled={isEditing}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nome">Name *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => handleChange('nome', e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF *</Label>
              <Input
                id="cpf"
                value={formData.cpf}
                onChange={(e) => handleChange('cpf', e.target.value)}
                placeholder="000.000.000-00"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="telefone">Phone *</Label>
              <Input
                id="telefone"
                value={formData.telefone}
                onChange={(e) => handleChange('telefone', e.target.value)}
                placeholder="(00) 00000-0000"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="funcao">Role</Label>
              <Select 
                value={formData.funcao} 
                onValueChange={(value) => handleChange('funcao', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={FuncaoOperador.OPERADOR}>Operator</SelectItem>
                  <SelectItem value={FuncaoOperador.SUPERVISOR}>Supervisor</SelectItem>
                  <SelectItem value={FuncaoOperador.TECNICO}>Technician</SelectItem>
                  <SelectItem value={FuncaoOperador.COORDENADOR}>Coordinator</SelectItem>
                  <SelectItem value={FuncaoOperador.GERENTE}>Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="turno">Shift</Label>
              <Select 
                value={formData.turno} 
                onValueChange={(value) => handleChange('turno', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a shift" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Morning">Morning</SelectItem>
                  <SelectItem value="Afternoon">Afternoon</SelectItem>
                  <SelectItem value="Night">Night</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Certifications</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Medical Exam (ASO) - Expiration Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.asoExpirationDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.asoExpirationDate || "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.asoExpirationDate ? parseDate(formData.asoExpirationDate) : undefined}
                      onSelect={(date) => handleDateChange('asoExpirationDate', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label>Safety Training (NR-11) - Expiration Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.nrExpirationDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.nrExpirationDate || "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.nrExpirationDate ? parseDate(formData.nrExpirationDate) : undefined}
                      onSelect={(date) => handleDateChange('nrExpirationDate', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OperatorDialog;
