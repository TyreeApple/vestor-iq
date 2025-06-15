
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
  SiZod,
  SiGithub
} from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { PiTableDuotone } from "react-icons/pi";
import { TbBrandRadixUi } from "react-icons/tb";
import { BarChart3, Activity } from "lucide-react";
import AboutProjectCard from "@/components/about/AboutProjectCard";

// Crie estilos de cor para os ícones principais
const iconBg = {
  react: "bg-sky-100 text-sky-500",
  typescript: "bg-blue-100 text-blue-700",
  vite: "bg-violet-100 text-violet-500",
  tailwind: "bg-cyan-100 text-cyan-400",
  shadcn: "bg-black/10 dark:bg-white/10 text-black dark:text-white",
  github: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-white",
  rhf: "bg-pink-100 text-pink-500",
  rr: "bg-red-100 text-red-500",
  zustand: "bg-orange-100 text-orange-500",
  zod: "bg-purple-100 text-purple-600",
  lucide: "bg-yellow-100 text-yellow-500",
  tanstack: "bg-green-100 text-green-600",
  recharts: "bg-blue-50 text-blue-400",
  radix: "bg-indigo-100 dark:bg-indigo-200 text-indigo-700 dark:text-indigo-400",
};

// Seções com reaproveitamento
const tecnologias = [
  {
    nome: "React",
    icon: <SiReact size={32} className={`${iconBg.react}`} />,
    bg: iconBg.react,
    url: "https://react.dev/"
  },
  {
    nome: "TypeScript",
    icon: <SiTypescript size={32} className={`${iconBg.typescript}`} />,
    bg: iconBg.typescript,
    url: "https://www.typescriptlang.org/"
  },
  {
    nome: "Vite",
    icon: <SiVite size={32} className={`${iconBg.vite}`} />,
    bg: iconBg.vite,
    url: "https://vitejs.dev/"
  },
  {
    nome: "Tailwind CSS",
    icon: <SiTailwindcss size={32} className={`${iconBg.tailwind}`} />,
    bg: iconBg.tailwind,
    url: "https://tailwindcss.com/"
  },
  {
    nome: "shadcn/ui",
    icon: <SiShadcnui size={32} className={`${iconBg.shadcn}`} />,
    bg: iconBg.shadcn,
    url: "https://ui.shadcn.com/"
  },
  {
    nome: "Github (integração)",
    icon: <FaGithub size={32} className={`${iconBg.github}`} />,
    bg: iconBg.github,
    url: "https://github.com/"
  },
];

const bibliotecas = [
  {
    nome: "React Hook Form",
    icon: <SiReacthookform size={32} className={`${iconBg.rhf}`} />,
    bg: iconBg.rhf,
    url: "https://react-hook-form.com/"
  },
  {
    nome: "React Router",
    icon: <SiReactrouter size={32} className={`${iconBg.rr}`} />,
    bg: iconBg.rr,
    url: "https://reactrouter.com/"
  },
  {
    nome: "Zustand",
    icon: <Activity size={32} className={`${iconBg.zustand}`} />,
    bg: iconBg.zustand,
    url: "https://docs.pmnd.rs/zustand"
  },
  {
    nome: "Zod",
    icon: <SiZod size={32} className={`${iconBg.zod}`} />,
    bg: iconBg.zod,
    url: "https://zod.dev/"
  },
  {
    nome: "Lucide (ícones)",
    icon: <BsStars size={32} className={`${iconBg.lucide}`} />,
    bg: iconBg.lucide,
    url: "https://lucide.dev/"
  },
  {
    nome: "Tanstack Query",
    icon: <PiTableDuotone size={32} className={`${iconBg.tanstack}`} />,
    bg: iconBg.tanstack,
    url: "https://tanstack.com/query"
  },
  {
    nome: "Recharts",
    icon: <BarChart3 size={32} className={`${iconBg.recharts}`} />,
    bg: iconBg.recharts,
    url: "https://recharts.org/"
  },
  {
    nome: "Radix UI",
    icon: <TbBrandRadixUi size={32} className={`${iconBg.radix}`} />,
    bg: iconBg.radix,
    url: "https://www.radix-ui.com/"
  },
];

const Configuracao: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto my-8 px-2 sm:px-6 py-6 bg-card rounded-lg border border-border shadow">
      <div className="flex items-center gap-3 mb-1 sm:mb-4">
        <Settings className="w-7 h-7 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">
          Configurações
        </h2>
      </div>
      <p className="text-muted-foreground mb-6 sm:mb-12 text-sm sm:text-base">
        Gerencie suas preferências da conta e personalizações do sistema neste painel.
      </p>

      {/* Layout principal responsivo*/}
      <div className="flex flex-col md:flex-row gap-8">
        {/* SOBRE O PROJETO */}
        <div className="md:w-1/3 flex flex-col gap-4">
          <AboutProjectCard />
        </div>

        {/* TECNOLOGIAS & BIBLIOTECAS */}
        <div className="md:w-2/3 flex flex-col gap-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              Tecnologias Utilizadas
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5">
              {tecnologias.map((tec) => (
                <a
                  key={tec.nome}
                  href={tec.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 p-4 bg-background rounded-xl border border-border hover:shadow-2xl transition-all hover:bg-accent/60 focus-visible:ring-2 focus-visible:ring-primary outline-none duration-200 cursor-pointer"
                >
                  <div className="flex items-center justify-center rounded-full w-14 h-14 mb-1 shadow-inner border bg-gradient-to-br from-background via-white/80 dark:via-black/30 to-background group-hover:scale-105 transition-transform">
                    {tec.icon}
                  </div>
                  <span className="font-medium text-foreground text-center text-sm truncate w-full group-hover:text-primary">
                    {tec.nome}
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              Bibliotecas Utilizadas
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {bibliotecas.map((lib) => (
                <a
                  key={lib.nome}
                  href={lib.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 p-4 bg-background rounded-xl border border-border hover:shadow-2xl transition-all hover:bg-accent/60 focus-visible:ring-2 focus-visible:ring-primary outline-none duration-200 cursor-pointer"
                >
                  <div className="flex items-center justify-center rounded-full w-14 h-14 mb-1 shadow-inner border bg-gradient-to-br from-background via-white/80 dark:via-black/30 to-background group-hover:scale-105 transition-transform">
                    {lib.icon}
                  </div>
                  <span className="font-medium text-foreground text-center text-sm truncate w-full group-hover:text-primary">
                    {lib.nome}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Configuracao;
