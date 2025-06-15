
import React from "react";
import { Operacao, StatusOperacao, PrioridadeOperacao, TipoOperacao } from "@/types";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Calendar, Fuel } from "lucide-react";
import { Button } from "@/components/ui/button";

type CompletedOperationsSectionProps = {
  operations: Operacao[];
  onDetails: (operation: Operacao) => void;
  onDelete: (id: string) => void;
  formatDate: (date: string) => string;
  formatTime: (date: string) => string;
  calculateDuration: (operation: Operacao) => string;
  getPriorityInfo: (prioridade: PrioridadeOperacao) => any;
  getOperationTypeInfo: (tipo: TipoOperacao) => any;
};

const CompletedOperationsSection: React.FC<CompletedOperationsSectionProps> = ({
  operations,
  onDetails,
  onDelete,
  formatDate,
  formatTime,
  calculateDuration,
  getPriorityInfo,
  getOperationTypeInfo,
}) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
        <CheckCircle2 className="w-6 h-6 text-primary" />
        Operações Concluídas
      </h2>
      <span className="text-sm text-muted-foreground">
        {operations.length} concluídas
      </span>
    </div>

    <Card className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary/50">
            <tr>
              <th className="p-4 text-left font-semibold text-foreground">ID</th>
              <th className="p-4 text-left font-semibold text-foreground">Tipo</th>
              <th className="p-4 text-left font-semibold text-foreground">Operador</th>
              <th className="p-4 text-left font-semibold text-foreground">Empilhadeira</th>
              <th className="p-4 text-left font-semibold text-foreground">Setor</th>
              <th className="p-4 text-left font-semibold text-foreground">Data</th>
              <th className="p-4 text-left font-semibold text-foreground">Duração</th>
              <th className="p-4 text-left font-semibold text-foreground">Prioridade</th>
              <th className="p-4 text-left font-semibold text-foreground">Consumo (L)</th>
              <th className="p-4 text-left font-semibold text-foreground">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {operations.map((operation) => {
              const priorityInfo = getPriorityInfo(operation.prioridade);
              const typeInfo = getOperationTypeInfo(operation.tipo);

              return (
                <tr key={operation.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-foreground font-medium">{operation.id}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={cn("text-sm font-medium", typeInfo.color)}>
                      {typeInfo.label}
                    </span>
                  </td>
                  <td className="p-4 text-foreground">{operation.operador?.nome}</td>
                  <td className="p-4">
                    <div className="text-foreground">{operation.empilhadeira?.modelo}</div>
                    <div className="text-xs text-muted-foreground">{operation.empilhadeiraId}</div>
                  </td>
                  <td className="p-4 text-foreground">{operation.setor}</td>
                  <td className="p-4">
                    <div className="text-foreground">{formatDate(operation.dataInicio)}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatTime(operation.dataInicio)} - {operation.dataFim ? formatTime(operation.dataFim) : "N/A"}
                    </div>
                  </td>
                  <td className="p-4 text-foreground">{calculateDuration(operation)}</td>
                  <td className="p-4">
                    <span className={cn(
                      "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border",
                      priorityInfo.bgColor, priorityInfo.color, priorityInfo.borderColor
                    )}>
                      <priorityInfo.icon className="w-3 h-3 mr-1" />
                      {operation.prioridade}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Fuel className="w-4 h-4 text-orange-400" />
                      <span className="text-foreground">{(operation.consumoGas || 0).toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        onClick={() => onDetails(operation)}
                      >
                        Detalhes
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                        onClick={() => onDelete(operation.id)}
                      >
                        Excluir
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {operations.length === 0 && (
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/30 flex items-center justify-center">
            <Calendar className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-lg">Nenhuma operação concluída</p>
        </CardContent>
      )}
    </Card>
  </div>
);

export default CompletedOperationsSection;
