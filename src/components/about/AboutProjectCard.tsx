
import React from "react";
import { BsStars } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

const AboutProjectCard: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl w-full shadow-lg border-0 glass-card animate-fade-in p-0">
      {/* Animated Gradient Glow */}
      <div className="pointer-events-none absolute -inset-2 z-0 opacity-70 blur-2xl [mask-image:radial-gradient(white,transparent_85%)]">
        <div className="animate-[spin_12s_linear_infinite] w-full h-full bg-gradient-to-tr from-indigo-500/50 via-purple-400/40 to-pink-400/40" />
      </div>
      
      {/* Card Content */}
      <div className="relative z-10 px-7 py-7 flex flex-col items-center text-center">
        <span className="mb-2 flex items-center justify-center animate-float">
          <BsStars className="w-10 h-10 text-purple-400 drop-shadow-glow animate-pulse-glow"/>
        </span>
        <h3 className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 bg-clip-text text-transparent mb-2 drop-shadow">
          Sobre o Projeto
        </h3>
        <p className="text-muted-foreground text-base font-medium mb-6 max-w-xs">
          Projeto feito sem fins de implementação real para funcionamento, foi apenas um projeto para brincar com a IA e testar a real capacidade da IA.
        </p>
        <a
          href="https://github.com/olucasmf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-gradient-to-r from-slate-800/85 to-blue-900/80 text-blue-300 hover:bg-gradient-to-tr hover:from-blue-600 hover:to-indigo-600 border border-slate-700 hover:shadow-2xl transition-all duration-300 text-sm font-semibold focus-ring-premium shadow-md backdrop-blur-md"
        >
          <FaGithub className="w-5 h-5 animate-float" />
          github.com/olucasmf
        </a>
      </div>
    </div>
  );
};
export default AboutProjectCard;
