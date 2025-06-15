
import React from "react";
import {
  Github,
  Code,
  Code2,
  Palette,
  Zap,
  Component,
  Blocks,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const techs = [
  { name: "React", icon: Code },
  { name: "TypeScript", icon: Code2 },
  { name: "Tailwind CSS", icon: Palette },
  { name: "Vite", icon: Zap },
  { name: "Lucide React", icon: Component },
  { name: "Radix UI", icon: Blocks },
];

export default function Configuracao() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 py-8 px-2">
      {/* Informações do Sistema */}
      <section className="rounded-xl border border-slate-600/40 bg-card/80 dark:bg-card/80 p-6 md:p-7 shadow-md">
        <div className="flex items-center gap-2 mb-3">
          <Github className="w-5 h-5 opacity-80" />
          <span className="font-semibold text-lg md:text-xl">Informações do Sistema</span>
        </div>
        <div className="space-y-1 pl-1 text-sm md:text-base">
          <div>
            <span className="text-slate-400">Nome do Sistema:</span><br />
            <span className="font-semibold text-base text-white">Formatte</span>
          </div>
          <div>
            <span className="text-slate-400">Versão:</span><br />
            <span className="text-base">v1.0.3</span>
          </div>
          <div>
            <span className="text-slate-400">Descrição:</span><br />
            <span>
              Sistema para processamento e formatação de dados de arquivos Excel, com foco em extração de dados de lotes e produtos.
            </span>
          </div>
        </div>
      </section>

      {/* Desenvolvedor */}
      <section className="rounded-xl border border-slate-600/40 bg-card/80 dark:bg-card/80 p-6 md:p-7 shadow-md flex flex-col items-start">
        <div className="flex items-center gap-2 mb-3">
          <Github className="w-5 h-5 opacity-80" />
          <span className="font-semibold text-lg md:text-xl">Desenvolvedor</span>
        </div>
        <span className="mb-4 text-sm md:text-base pl-1 block">
          Este sistema foi desenvolvido com foco em UX avançada e processamento eficiente de dados Excel.
        </span>
        <Button
          asChild
          className="mb-2 bg-muted text-foreground font-semibold shadow transition-colors hover:bg-muted/80"
        >
          <a href="https://github.com/olucasmf" target="_blank" rel="noopener noreferrer">
            <Github className="w-5 h-5 mr-2" /> Ver no GitHub
          </a>
        </Button>
        <a
          href="https://github.com/olucasmf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs md:text-sm text-muted-foreground pl-1 hover:underline"
        >
          github.com/olucasmf
        </a>
      </section>

      {/* Tecnologias Utilizadas */}
      <section className="rounded-xl border border-slate-600/40 bg-card/80 dark:bg-card/80 p-6 md:p-7 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-semibold text-lg md:text-xl">Tecnologias Utilizadas</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
          {techs.map(({ name, icon: Icon }) => (
            <div
              key={name}
              className="flex flex-col items-center justify-center bg-slate-800/90 rounded-lg p-4 min-h-[90px] transition border border-slate-700/50"
            >
              <Icon className="w-8 h-8 mb-2 text-blue-400" />
              <span className="text-blue-100 text-[13px] font-semibold text-center">{name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
