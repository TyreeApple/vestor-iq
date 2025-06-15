
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

// Dados dos cards conforme mockup
const tecnologias = [
  { name: "React", icon: SiReact, url: "https://react.dev/" },
  { name: "TypeScript", icon: SiTypescript, url: "https://www.typescriptlang.org/" },
  { name: "Vite", icon: SiVite, url: "https://vitejs.dev/" },
  { name: "Tailwind CSS", icon: SiTailwindcss, url: "https://tailwindcss.com/" },
  { name: "shadcn/ui", icon: SiShadcnui, url: "https://ui.shadcn.com/" },
];

const bibliotecas = [
  { name: "React-Hook Form", icon: SiReacthookform, url: "https://react-hook-form.com/" },
  { name: "React Router", icon: SiReactrouter, url: "https://reactrouter.com/" },
  { name: "Zustand", icon: GiBearHead, url: "https://docs.pmnd.rs/zustand" },
  { name: "Zod", icon: SiZod, url: "https://zod.dev/" },
  { name: "Tanstack (ícones)", icon: PiTableDuotone, url: "https://tanstack.com/query" },
  { name: "Recharts", icon: BarChart3, url: "https://recharts.org/" },
  { name: "Radix UI", icon: TbBrandRadixUi, url: "https://www.radix-ui.com/" },
  { name: "Lucide", icon: SiLucide, url: "https://lucide.dev/" },
];

const cardClass =
  "relative rounded-xl border border-[#22304B] bg-[#131d33c7] flex flex-col items-center justify-center py-4 px-1 min-w-[102px] h-[108px] sm:h-[112px] md:h-[118px] mx-auto shadow-lg transition hover:scale-[1.04] hover:shadow-blue-900 focus:ring-[2px] focus:ring-blue-400/70 outline-none";

const iconClass = "mb-2";
const nameClass = "text-sm sm:text-base font-semibold text-blue-100";

const gridClass =
  "grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4";

const tituloClass = "text-xl md:text-2xl font-extrabold gradient-text drop-shadow mb-2";
const sectionClass = "mb-1";

const Configuracao: React.FC = () => {
  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-[#161E2E] via-[#101729] to-[#171F31] flex items-start justify-center px-1 py-4">
      <div
        className="w-full max-w-[1080px] mx-auto rounded-lg flex flex-col md:flex-row gap-4 md:gap-7 bg-transparent"
      >
        {/* Sidebar curta lateral */}
        <aside className="min-w-[234px] max-w-[265px] w-full flex flex-col">
          <div className="rounded-xl border border-[#293956] bg-[#101624] shadow-md py-5 px-5 flex flex-col items-center min-h-[170px]">
            <span>
              <Settings className="w-7 h-7 text-blue-400 mb-1" />
            </span>
            <h3 className="text-base font-extrabold text-blue-200 tracking-tight mb-1 text-center">
              Sobre o Projeto
            </h3>
            <p className="text-blue-100/80 text-xs text-center font-medium leading-normal mb-2">
              Projeto feito apenas para brincar com IA e testar sua capacidade.
            </p>
            <a
              href="https://github.com/olucasmf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto transition-all duration-150 flex items-center gap-1 rounded-full px-3 py-1 bg-[#18213B] hover:bg-blue-900 border border-blue-700/30 text-blue-200 hover:text-white font-bold shadow text-xs"
            >
              <FaGithub className="w-4 h-4" />
              github.com/olucasmf
            </a>
          </div>
        </aside>

        <main className="flex-1 flex flex-col max-w-full overflow-x-auto">
          <header className="mb-3 flex flex-col items-center text-center md:text-left md:items-start">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-0 gradient-text" style={{ lineHeight: 1 }}>
              Configurações
            </h2>
            <p className="text-blue-100/80 text-sm md:text-base mb-1 font-medium max-w-[570px]">
              Gerencie suas preferências da conta e personalizações do sistema.
            </p>
          </header>

          {/* Tecnologias Utilizadas */}
          <section className={sectionClass}>
            <h3
              className={tituloClass + " text-[#6f44e9] drop-shadow"}
              style={{ color: "#7c3aed", textShadow: "0 2px 10px #181e33" }}
            >
              Tecnologias Utilizadas
            </h3>
            <div className={gridClass}>
              {tecnologias.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClass + " group"}
                  tabIndex={0}
                  aria-label={item.name}
                >
                  <item.icon
                    size={36}
                    className={iconClass + " text-blue-400 group-hover:text-blue-500"}
                  />
                  <span className={nameClass}>{item.name}</span>
                </a>
              ))}
            </div>
          </section>

          {/* Bibliotecas Utilizadas */}
          <section className={sectionClass + " mt-5"}>
            <h3
              className={tituloClass + " text-[#6f44e9] drop-shadow"}
              style={{ color: "#7c3aed", textShadow: "0 2px 10px #181e33" }}
            >
              Bibliotecas Utilizadas
            </h3>
            <div
              className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
            >
              {bibliotecas.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClass + " group"}
                  tabIndex={0}
                  aria-label={item.name}
                >
                  <item.icon
                    size={32}
                    className={iconClass + " text-blue-400 group-hover:text-blue-500"}
                  />
                  <span className={nameClass + " text-xs sm:text-base"}>{item.name}</span>
                </a>
              ))}
            </div>
          </section>
        </main>
      </div>
    </section>
  );
};

export default Configuracao;
