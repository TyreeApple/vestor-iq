
import React from "react";
import { Settings } from "lucide-react";
import {
  SiVite, SiTypescript, SiTailwindcss, SiReact,
  SiShadcnui, SiReacthookform, SiReactrouter, SiZod,
  SiGithub, SiLucide
} from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { PiTableDuotone } from "react-icons/pi";
import { TbBrandRadixUi } from "react-icons/tb";
import { BarChart3 } from "lucide-react";
import { GiBearHead } from "react-icons/gi";
import AboutProjectCard from "@/components/about/AboutProjectCard";
import TechSection from "@/components/about/TechSection";

// Definições dos ícones com fundos exclusivos
const tecnologias = [
  {
    name: "React",
    icon: SiReact,
    url: "https://react.dev/",
    bg: "bg-[#0a1728]"
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    url: "https://www.typescriptlang.org/",
    bg: "bg-[#0a1728]"
  },
  {
    name: "Vite",
    icon: SiVite,
    url: "https://vitejs.dev/",
    bg: "bg-[#0a1728]"
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    url: "https://tailwindcss.com/",
    bg: "bg-[#0a1728]"
  },
  {
    name: "shadcn/ui",
    icon: SiShadcnui,
    url: "https://ui.shadcn.com/",
    bg: "bg-[#0a1728]"
  },
];

const bibliotecas = [
  {
    name: "React-Hook Form",
    icon: SiReacthookform,
    url: "https://react-hook-form.com/",
    bg: "bg-[#101b2f]"
  },
  {
    name: "React Router",
    icon: SiReactrouter,
    url: "https://reactrouter.com/",
    bg: "bg-[#101b2f]"
  },
  {
    name: "Zustand",
    icon: GiBearHead,
    url: "https://docs.pmnd.rs/zustand",
    bg: "bg-[#101b2f]"
  },
  {
    name: "Zod",
    icon: SiZod,
    url: "https://zod.dev/",
    bg: "bg-[#101b2f]"
  },
  {
    name: "Tanstack (ícones)",
    icon: PiTableDuotone,
    url: "https://tanstack.com/query",
    bg: "bg-[#101b2f]"
  },
  {
    name: "Recharts",
    icon: BarChart3,
    url: "https://recharts.org/",
    bg: "bg-[#101b2f]"
  },
  {
    name: "Radix UI",
    icon: TbBrandRadixUi,
    url: "https://www.radix-ui.com/",
    bg: "bg-[#101b2f]"
  },
  {
    name: "Lucide",
    icon: SiLucide,
    url: "https://lucide.dev/",
    bg: "bg-[#101b2f]"
  },
];

const Configuracao: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#111725] via-[#0d1321] to-[#181F30] py-6 px-1">
      <div className="w-full max-w-5xl mx-auto rounded-xl flex flex-col xl:flex-row gap-7 xl:gap-10 shadow-2xl bg-transparent">
        {/* Card lateral */}
        <div className="w-full max-w-xs xl:w-[280px] flex flex-col">
          <div className="flex-1 flex flex-col !bg-transparent">
            <div className="relative overflow-hidden rounded-xl border border-[#20293c] bg-[#101623]/80 shadow-[0_0_0_1px_#131b29,0_1px_10px_0_rgba(36,46,68,0.23)] p-6 flex flex-col items-center min-h-[260px]">
              <span className="mb-2">
                <Settings className="w-8 h-8 text-blue-400 drop-shadow-glow" />
              </span>
              <h3 className="text-lg font-bold text-blue-400 tracking-tight mb-1">
                Sobre o Projeto
              </h3>
              <p className="text-blue-100/90 font-medium text-sm mb-3 text-center leading-snug" style={{ textWrap: "pretty" }}>
                Projeto feito apenas para brincar com IA e testar sua capacidade.
              </p>
              <a
                href="https://github.com/olucasmf"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-auto transition-all duration-200
                  inline-flex items-center gap-2 rounded-full px-4 py-1.5
                  bg-blue-950/60 hover:bg-blue-900/80 border border-blue-700/30
                  text-blue-200 hover:text-white font-bold shadow
                  active:scale-95 focus-ring-premium text-sm
                "
              >
                <FaGithub className="w-4 h-4" />
                github.com/olucasmf
              </a>
            </div>
          </div>
        </div>
        {/* Centro: Conteúdo e grids */}
        <div className="flex-1 flex flex-col gap-7">
          <header className="mb-0 flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold tracking-tight text-blue-400 gradient-text mb-1 drop-shadow" style={{ fontFamily: "Inter, sans-serif"}}>
              Configurações
            </h2>
            <p className="text-blue-200/80 max-w-lg text-base font-medium mb-0">
              Gerencie suas preferências da conta e personalizações do sistema.
            </p>
          </header>
          {/* Tecnologias Utilizadas */}
          <div>
            <TechSection title="Tecnologias Utilizadas" items={tecnologias} />
          </div>
          {/* Bibliotecas Utilizadas */}
          <div>
            <TechSection title="Bibliotecas Utilizadas" items={bibliotecas} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Configuracao;
