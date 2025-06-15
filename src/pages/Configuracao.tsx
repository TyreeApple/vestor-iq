
import React from "react";
import { Settings } from "lucide-react";
import { 
  SiVite, SiTypescript, SiTailwindcss, SiReact, SiShadcnui, SiReacthookform, 
  SiReactrouter, SiZod, SiGithub 
} from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { PiTableDuotone } from "react-icons/pi";
import { TbBrandRadixUi } from "react-icons/tb";
import { BarChart3 } from "lucide-react";
import { GiBearHead } from "react-icons/gi";
import AboutProjectCard from "@/components/about/AboutProjectCard";
import TechSection from "@/components/about/TechSection";

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
    icon: BsStars,
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
    <section className="max-w-7xl mx-auto my-10 px-1 sm:px-6 py-12 bg-card rounded-3xl border border-border shadow-2xl flex flex-col gap-10 animate-fade-in relative">
      <div className="flex flex-col items-center gap-4 mb-7">
        <div className="flex items-center gap-3">
          <Settings className="w-9 h-9 text-primary animate-pulse-glow" />
          <h2 className="text-4xl md:text-5xl font-extrabold gradient-text tracking-tight drop-shadow-2xl">
            Configurações
          </h2>
        </div>
        <p className="text-muted-foreground max-w-2xl text-lg md:text-xl font-medium text-center">
          Gerencie suas preferências da conta e personalizações do sistema neste painel.
        </p>
      </div>
      {/* Layout principal super responsivo */}
      <div className="flex flex-col xl:flex-row gap-10 animate-fade-in-scale duration-500">
        {/* SOBRE O PROJETO */}
        <div className="xl:w-[400px] shrink-0 flex flex-col gap-4 mb-10 xl:mb-0 mx-auto xl:mx-0">
          <AboutProjectCard />
        </div>
        {/* TECNOLOGIAS & BIBLIOTECAS */}
        <div className="flex-1 flex flex-col gap-14">
          <TechSection title="Tecnologias Utilizadas" items={tecnologias} />
          <TechSection title="Bibliotecas Utilizadas" items={bibliotecas} />
        </div>
      </div>
    </section>
  );
};

export default Configuracao;
