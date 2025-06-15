
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/useAppStore";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";

export default function EducationalModal() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const addMockData = useAppStore((s) => s.addMockData);

  useEffect(() => {
    // Apenas exibe se não apareceu ainda na sessão
    if (!sessionStorage.getItem("edu-modal-shown")) {
      setOpen(true);
      sessionStorage.setItem("edu-modal-shown", "1");
    }
  }, []);

  const handleLoadMockData = () => {
    addMockData();
    setOpen(false);
    toast({
      title: "Dados fictícios carregados!",
      description: "Você pode navegar livremente pelo sistema.",
      duration: 3500,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md p-6 px-5 rounded-2xl text-center shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center gap-2">
            <Sparkles className="mx-auto mb-1 text-blue-400" size={30} />
            Bem-vindo ao sistema!
          </DialogTitle>
        </DialogHeader>
        <div className="text-sm text-muted-foreground py-2 px-1">
          Este sistema foi desenvolvido apenas para fins educativos e de demonstração de IA.<br />
          Não utilize informações reais. Clique abaixo para carregar dados fictícios e testar livremente todas as funções!
        </div>
        <DialogFooter>
          <Button
            onClick={handleLoadMockData}
            className="w-full mt-3 font-semibold bg-primary hover:bg-primary/80 transition"
          >
            Carregar dados fictícios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
