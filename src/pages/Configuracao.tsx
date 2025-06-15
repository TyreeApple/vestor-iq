
import React from "react";
import { Settings } from "lucide-react";
import { SiVite, SiTypescript, SiTailwindcss, SiReact, SiShadcnui } from "react-icons/si";
import { FaGithub } from "react-icons/fa";

const tecnologias = [
  {
    nome: "React",
    icon: <SiReact className="text-sky-400 w-7 h-7" />,
    url: "https://react.dev/"
  },
  {
    nome: "TypeScript",
    icon: <SiTypescript className="text-blue-600 w-7 h-7" />,
    url: "https://www.typescriptlang.org/"
  },
  {
    nome: "Vite",
    icon: <SiVite className="text-violet-500 w-7 h-7" />,
    url: "https://vitejs.dev/"
  },
  {
    nome: "Tailwind CSS",
    icon: <SiTailwindcss className="text-cyan-400 w-7 h-7" />,
    url: "https://tailwindcss.com/"
  },
  {
    nome: "shadcn/ui",
    icon: <SiShadcnui className="text-black dark:text-white w-7 h-7" />,
    url: "https://ui.shadcn.com/"
  },
  {
    nome: "Github (integração)",
    icon: <FaGithub className="text-slate-800 dark:text-white w-7 h-7" />,
    url: "https://github.com/"
  },
];

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
      <div className="text-sm text-muted-foreground italic border border-dashed border-border p-6 rounded-lg bg-background/70 mb-8">
        Este módulo de configurações está em desenvolvimento.<br />
        Em breve você poderá editar preferências de conta, sistema e notificações.
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          Tecnologias Utilizadas
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tecnologias.map((tec) => (
            <a
              key={tec.nome}
              href={tec.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 border border-border rounded-lg bg-background hover:bg-accent transition-all shadow"
            >
              <span>{tec.icon}</span>
              <span className="font-medium text-foreground">{tec.nome}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Configuracao;
