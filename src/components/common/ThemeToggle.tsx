
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const DARK_CLASS = "dark";

function setDarkClass(enabled: boolean) {
  if (enabled) {
    document.documentElement.classList.add(DARK_CLASS);
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove(DARK_CLASS);
    localStorage.setItem("theme", "light");
  }
}

function getInitialTheme(): "light" | "dark" {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      return stored;
    }
    // fallback: prefers-color-scheme
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "dark"; // Força dark mode como padrão
}

export default function ThemeToggle() {
  const [dark, setDark] = React.useState(() => getInitialTheme() === "dark");
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    setDarkClass(dark);
  }, [dark]);

  const handleToggle = () => {
    if (dark) {
      // Tentando mudar para modo claro - mostrar modal
      setShowModal(true);
    } else {
      // Já está no modo claro, pode voltar para escuro
      setDark(true);
    }
  };

  const handleConfirmLightMode = () => {
    setDark(false);
    setShowModal(false);
  };

  return (
    <>
      <button
        aria-label={dark ? "Ativar modo claro" : "Ativar modo escuro"}
        className={`
          relative inline-flex h-6 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
          ${dark ? 'bg-slate-700' : 'bg-slate-200'}
        `}
        onClick={handleToggle}
        type="button"
      >
        {/* Toggle circle */}
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-300 flex items-center justify-center
            ${dark ? 'translate-x-8' : 'translate-x-1'}
          `}
        >
          {dark ? (
            <Moon className="w-2 h-2 text-slate-700" />
          ) : (
            <Sun className="w-2 h-2 text-amber-500" />
          )}
        </span>
        
        {/* Background icons */}
        <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
          <Sun className={`w-2 h-2 transition-opacity duration-300 ${dark ? 'opacity-40 text-slate-400' : 'opacity-0'}`} />
          <Moon className={`w-2 h-2 transition-opacity duration-300 ${dark ? 'opacity-0' : 'opacity-40 text-slate-500'}`} />
        </div>
        
        <span className="sr-only">Alternar tema</span>
      </button>

      <AlertDialog open={showModal} onOpenChange={setShowModal}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-warning">
              <Sun className="w-5 h-5" />
              Modo Claro Não Recomendado
            </AlertDialogTitle>
            <AlertDialogDescription className="text-left space-y-2">
              <p>
                O modo claro ainda não está totalmente configurado para esta aplicação e pode ocasionar:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2">
                <li>Irritação e fadiga ocular</li>
                <li>Dificuldade na leitura prolongada</li>
                <li>Contraste inadequado em alguns elementos</li>
                <li>Experiência visual inconsistente</li>
              </ul>
              <p className="text-sm font-medium text-foreground">
                Recomendamos fortemente o uso do modo escuro para uma melhor experiência.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-2">
            <AlertDialogAction
              onClick={() => setShowModal(false)}
              className="bg-background hover:bg-muted border border-input"
            >
              Manter Modo Escuro
            </AlertDialogAction>
            <AlertDialogAction
              onClick={handleConfirmLightMode}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Ativar Mesmo Assim
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
