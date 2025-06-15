import React from "react";
import { SiLucide } from "react-icons/si";
import { Settings } from "lucide-react";
import { 
  SiVite, SiTypescript, SiTailwindcss, SiReact, SiShadcnui, SiReacthookform, 
  SiReactrouter, SiZod, SiGithub, SiLucide 
} from "react-icons/si";
import { FaGithub, FaRegSmile, FaReact } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { PiTableDuotone } from "react-icons/pi";
import { TbBrandRadixUi } from "react-icons/tb";
import { BarChart3, Activity } from "lucide-react";
import { GiBearHead } from "react-icons/gi";
import AboutProjectCard from "@/components/about/AboutProjectCard";
import TechSection from "@/components/about/TechSection";

// Definições otimizadas com ícones proeminentes
const tecnologias = [
  {
    name: "React",
    icon: SiReact,
    url: "https://react.dev/"
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    url: "https://www.typescriptlang.org/"
  },
  {
    name: "Vite",
    icon: SiVite,
    url: "https://vitejs.dev/"
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    url: "https://tailwindcss.com/"
  },
  {
    name: "shadcn/ui",
    icon: SiShadcnui,
    url: "https://ui.shadcn.com/"
  },
  {
    name: "GitHub (integração)",
    icon: FaGithub,
    url: "https://github.com/"
  },
];

const bibliotecas = [
  {
    name: "React Hook Form",
    icon: SiReacthookform,
    url: "https://react-hook-form.com/"
  },
  {
    name: "React Router",
    icon: SiReactrouter,
    url: "https://reactrouter.com/"
  },
  {
    name: "Zustand",
    icon: GiBearHead,
    url: "https://docs.pmnd.rs/zustand"
  },
  {
    name: "Zod",
    icon: SiZod,
    url: "https://zod.dev/"
  },
  {
    name: "Lucide (ícones)",
    icon: SiLucide,
    url: "https://lucide.dev/"
  },
  {
    name: "Tanstack Query",
    icon: PiTableDuotone,
    url: "https://tanstack.com/query"
  },
  {
    name: "Recharts",
    icon: BarChart3,
    url: "https://recharts.org/"
  },
  {
    name: "Radix UI",
    icon: TbBrandRadixUi,
    url: "https://www.radix-ui.com/"
  },
];

const Configuracao: React.FC = () => {
  return (
    <section className="max-w-[110rem] mx-auto my-10 px-2 sm:px-10 py-12 bg-card rounded-2xl border border-border shadow-lg flex flex-col gap-10 animate-fade-in">
      <div className="flex flex-col items-center gap-4 mb-5 sm:mb-8">
        <div className="flex items-center gap-3">
          <Settings className="w-8 h-8 text-primary animate-pulse-glow" />
          <h2 className="text-3xl md:text-4xl font-extrabold gradient-text tracking-tight drop-shadow-sm">
            Configurações
          </h2>
        </div>
        <p className="text-muted-foreground max-w-2xl text-base md:text-lg font-medium text-center">
          Gerencie suas preferências da conta e personalizações do sistema neste painel.
        </p>
      </div>
      {/* Layout principal super responsivo */}
      <div className="flex flex-col xl:flex-row gap-8 xl:gap-14 animate-fade-in-scale duration-500">
        {/* SOBRE O PROJETO */}
        <div className="xl:w-[340px] shrink-0 flex flex-col gap-4 mb-6 xl:mb-0 mx-auto xl:mx-0">
          <AboutProjectCard />
        </div>
        {/* TECNOLOGIAS & BIBLIOTECAS */}
        <div className="flex-1 flex flex-col gap-10">
          <TechSection title="Tecnologias Utilizadas" items={tecnologias} />
          <TechSection title="Bibliotecas Utilizadas" items={bibliotecas} />
        </div>
      </div>
    </section>
  );
};

export default Configuracao;
