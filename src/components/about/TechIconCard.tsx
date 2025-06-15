
import React from "react";
import { IconType } from "react-icons";
import { cn } from "@/lib/utils";

/**
 * Props:
 * - icon: o componente icone React vindo do react-icons
 * - name: nome visível da tecnologia
 * - url: site para redirect
 * - bg: classes de cor do círculo
 */
interface TechIconCardProps {
  icon: IconType;
  name: string;
  url: string;
  bg?: string;
  gradient?: boolean;
  extra?: React.ReactNode;
}
const gradientDefault = "bg-gradient-to-tr from-blue-100 via-purple-100 to-orange-50 dark:from-blue-800/40 dark:via-purple-700/25 dark:to-orange-700/20";

const TechIconCard: React.FC<TechIconCardProps> = ({
  icon: Icon,
  name,
  url,
  bg = gradientDefault,
  gradient = true,
  extra
}) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      "group transform duration-300 relative rounded-2xl p-0.5 shadow-xl hover:scale-105 hover:shadow-2xl card-hover-effect",
      "focus-ring-premium transition-all"
    )}
  >
    <div className={cn(
      "flex flex-col items-center justify-center bg-background rounded-2xl px-4 py-6 md:py-5 gap-3 border border-border w-full h-full",
      "transition-all duration-300 min-w-[118px] sm:min-w-0"
    )}>
      {/* Ícone sem box/círculo */}
      <div className="mb-1 flex items-center justify-center">
        <Icon size={38} className="drop-shadow-glow text-[2.2rem] transition-colors duration-500 group-hover:text-primary" />
      </div>
      <span className="font-bold text-foreground text-[1rem] tracking-tight text-center w-full truncate group-hover:text-primary transition-colors duration-150">
        {name}
      </span>
      {extra}
    </div>
    {/* Efeito glow animado ao hover */}
    <div className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-80 transition duration-500 animate-fade-in z-0 bg-gradient-to-br from-primary/10 via-accent/10 to-pink-300/5 blur-[2px]" />
  </a>
);

export default TechIconCard;
