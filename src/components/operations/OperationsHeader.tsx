
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface OperationsHeaderProps {
  onAdd: () => void;
}

const OperationsHeader: React.FC<OperationsHeaderProps> = ({ onAdd }) => (
  <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h1 className="text-3xl font-bold text-foreground">Operações</h1>
      <p className="text-muted-foreground">
        Controle e monitoramento de operações em tempo real
      </p>
    </div>
    <Button
      className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
      onClick={onAdd}
    >
      <Plus className="w-4 h-4" />
      Nova Operação
    </Button>
  </div>
);

export default OperationsHeader;
