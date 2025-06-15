
import React from "react";
import { Settings } from "lucide-react";

const Configuracao: React.FC = () => {
  return (
    <section className="max-w-2xl mx-auto mt-10 p-6 bg-card rounded-lg border border-border shadow">
      <div className="flex items-center gap-3 mb-4">
        <Settings className="w-7 h-7 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Configurações</h2>
      </div>
      <p className="text-muted-foreground mb-2">
        Gerencie suas preferências da conta e personalizações do sistema neste painel.
      </p>
      <div className="text-sm text-muted-foreground italic border border-dashed border-border p-6 rounded-lg bg-background/70">
        Este módulo de configurações está em desenvolvimento.<br />
        Em breve você poderá editar preferências de conta, sistema e notificações.
      </div>
    </section>
  );
};

export default Configuracao;

