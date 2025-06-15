
import React from "react";
import { Settings } from "lucide-react";
import {
  SiVite,
  SiTypescript,
  SiTailwindcss,
  SiReact,
  SiShadcnui,
  SiReacthookform,
  SiReactrouter,
  SiZustand,
  SiZod,
  SiGithub,
  SiRecharts
} from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { PiTableDuotone } from "react-icons/pi";
import { TbBrandRadixUi } from "react-icons/tb";

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

const bibliotecas = [
  {
    nome: "React Hook Form",
    icon: <SiReacthookform className="text-pink-500 w-7 h-7" />,
    url: "https://react-hook-form.com/"
  },
  {
    nome: "React Router",
    icon: <SiReactrouter className="text-red-500 w-7 h-7" />,
    url: "https://reactrouter.com/"
  },
  {
    nome: "Zustand",
    icon: <SiZustand className="text-orange-500 w-7 h-7" />,
    url: "https://docs.pmnd.rs/zustand"
  },
  {
    nome: "Zod",
    icon: <SiZod className="text-purple-600 w-7 h-7" />,
    url: "https://zod.dev/"
  },
  {
    nome: "Lucide (ícones)",
    icon: <BsStars className="text-yellow-400 w-7 h-7" />,
    url: "https://lucide.dev/"
  },
  {
    nome: "Tanstack Query",
    icon: <PiTableDuotone className="text-green-500 w-7 h-7" />,
    url: "https://tanstack.com/query"
  },
  {
    nome: "Recharts",
    icon: <SiRecharts className="text-blue-400 w-7 h-7" />,
    url: "https://recharts.org/"
  },
  {
    nome: "Radix UI",
    icon: <TbBrandRadixUi className="text-indigo-700 dark:text-indigo-400 w-7 h-7" />,
    url: "https://www.radix-ui.com/"
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
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          Tecnologias Utilizadas
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
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
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          Bibliotecas Utilizadas
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {bibliotecas.map((lib) => (
            <a
              key={lib.nome}
              href={lib.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 border border-border rounded-lg bg-background hover:bg-accent transition-all shadow"
            >
              <span>{lib.icon}</span>
              <span className="font-medium text-foreground">{lib.nome}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Configuracao;
