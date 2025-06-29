
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Empilhadeira, StatusEmpilhadeira } from '@/types';
import { Badge } from "@/components/ui/badge";
import { BarChart3, Calendar, Gauge, Info, Settings, Wrench, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ForkliftDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  forklift: Empilhadeira | null;
  onEdit: () => void;
}

const ForkliftDetails = ({ open, onOpenChange, forklift, onEdit }: ForkliftDetailsProps) => {
  if (!forklift) return null;

  // Get status color classes
  const getStatusClass = (status: StatusEmpilhadeira) => {
    switch (status) {
      case StatusEmpilhadeira.OPERACIONAL:
        return 'bg-green-100 text-green-800 border-green-200';
      case StatusEmpilhadeira.EM_MANUTENCAO:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case StatusEmpilhadeira.PARADA:
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-xl">{forklift.modelo}</span>
            <Badge variant="outline" className={cn(getStatusClass(forklift.status))}>
              {forklift.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            ID: {forklift.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">General Information</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Strategy Type</span>
                </div>
                <span className="text-sm font-medium">{forklift.tipo}</span>
              </div>
              
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Capital Capacity</span>
                </div>
                <span className="text-sm font-medium">${forklift.capacidade}</span>
              </div>
              
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Runtime</span>
                </div>
                <span className="text-sm font-medium">{forklift.horimetro} hours</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Important Dates</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm">Deployment Date</span>
                <span className="text-sm font-medium">{forklift.dataAquisicao}</span>
              </div>
              
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm">Last Optimization</span>
                <span className="text-sm font-medium">{forklift.ultimaManutencao}</span>
              </div>
            </div>
            
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-3">
                <Wrench className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Optimization</span>
              </div>
              
              <div className="p-3 bg-muted/20 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Next Algorithm Update</span>
                  <span className="text-sm font-medium text-yellow-600">In 8 days</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Based on current performance metrics and optimization cycle
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 border-t pt-4">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Recent Performance</span>
          </div>
          
          <div className="h-20 bg-muted/20 rounded-md flex items-center justify-center">
            <span className="text-sm text-muted-foreground">Performance data would be displayed here</span>
          </div>
        </div>
        
        <DialogFooter className="gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={onEdit}>
            Edit Trading Bot
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ForkliftDetails;
