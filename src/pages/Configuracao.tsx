
import React from "react";
import { Settings } from "lucide-react";
import {
  SiVite, SiTypescript, SiTailwindcss, SiReact,
  SiShadcnui, SiReacthookform, SiReactrouter, SiZustand, SiZod,
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
    icon: SiZustand,
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
    <section className="min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-[#101826] via-[#0b1120] to-[#181F30] py-12 px-3">
      <div className="max-w-[105rem] w-full rounded-2xl flex flex-col xl:flex-row gap-16 xl:gap-24 shadow-2xl bg-transparent">
        {/* Card lateral */}
        <div className="w-full max-w-md xl:w-[355px] flex flex-col">
          <div className="flex-1 flex flex-col gap-0 !bg-transparent">
            <div className="relative overflow-hidden rounded-2xl border border-[#222d42] bg-[#111725]/80 shadow-[0_0_0_1.5px_#1d263a,0_3px_36px_0_rgba(36,46,68,0.50)] p-8 flex flex-col items-center min-h-[370px]">
              <span className="mb-3">
                <Settings className="w-10 h-10 text-blue-400 drop-shadow-glow" />
              </span>
              <h3 className="text-2xl font-extrabold text-blue-400 tracking-tight mb-2">
                Sobre o Projeto
              </h3>
              <p className="text-blue-100/90 font-medium text-base mb-6 text-center leading-relaxed" style={{ textWrap: "pretty" }}>
                Projeto feito sem fins de implementação real para funcionamento. Foi apenas um projeto para brincar com a IA e testar a real capacidade da IA.
              </p>
              <a
                href="https://github.com/olucasmf"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-auto transition-all duration-200
                  inline-flex items-center gap-2 rounded-full px-6 py-2
                  bg-blue-950/70 hover:bg-blue-900/90 border border-blue-700/40
                  text-blue-200 hover:text-white font-bold shadow
                  active:scale-95 focus-ring-premium text-base
                "
              >
                <FaGithub className="w-5 h-5" />
                github.com/olucasmf
              </a>
            </div>
          </div>
        </div>
        {/* Centro: Conteúdo e grids */}
        <div className="flex-1 flex flex-col gap-14">
          <header className="mb-2 flex flex-col items-center text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-blue-400 gradient-text mb-2 drop-shadow" style={{ fontFamily: "Inter, sans-serif"}}>
              Configurações
            </h2>
            <p className="text-blue-200/80 max-w-2xl text-lg font-medium mb-1">
              Gerencie suas preferências da conta e personalizações do sistema neste painel.
            </p>
          </header>
          {/* Tecnologias Utilizadas */}
          <TechSection title="Tecnologias Utilizadas" items={tecnologias} />
          {/* Bibliotecas Utilizadas */}
          <TechSection title="Bibliotecas Utilizadas" items={bibliotecas} />
        </div>
      </div>
    </section>
  );
};

export default Configuracao;
