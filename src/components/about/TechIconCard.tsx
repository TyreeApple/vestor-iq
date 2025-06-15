
import React from "react";
import { IconType } from "react-icons";
import { cn } from "@/lib/utils";

/**
 * Props:
 * - icon: Componente do react-icons
 * - name: nome visível
 * - url: link para a tecnologia
 * - bg: cor de fundo custom
 */
interface TechIconCardProps {
  icon: IconType;
  name: string;
  url: string;
  bg?: string;
  gradient?: boolean;
  extra?: React.ReactNode;
}
const gradientDefault =
  "bg-gradient-to-tr from-[#1d2340] via-[#30204e] to-[#182139] dark:from-blue-800/40 dark:via-purple-700/45 dark:to-indigo-800/25";

const TechIconCard: React.FC<TechIconCardProps> = ({
  icon: Icon,
  name,
  url,
  bg = gradientDefault,
  gradient = true,
  extra,
}) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      "group transform duration-300 relative rounded-3xl p-1 shadow-2xl hover:scale-105 hover:shadow-3xl bg-opacity-45 card-hover-effect",
      "focus-ring-premium transition-all"
    )}
    style={{
      minWidth: 172,
      minHeight: 172,
      maxWidth: 220,
      maxHeight: 220,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl px-6 py-8 gap-4 border border-border w-full h-full bg-background/60",
        gradient ? gradientDefault : bg,
        "transition-all duration-300 relative overflow-hidden"
      )}
      style={{
        minHeight: 160,
        minWidth: 160,
      }}
    >
      <div
        className={cn(
          "w-16 h-16 flex items-center justify-center rounded-full shadow-inner border-2 border-border mb-1 bg-[#212558]/80",
          "backdrop-blur"
        )}
      >
        <Icon size={46} className="drop-shadow-glow text-indigo-200 group-hover:text-primary transition-colors duration-500" />
      </div>
      <span className="font-extrabold text-[17px] text-indigo-100 tracking-tight text-center w-full truncate group-hover:text-primary transition-colors duration-150 drop-shadow-sm">
        {name}
      </span>
      {extra}
      <div className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 animate-fade-in z-10 bg-gradient-to-br from-primary/15 via-accent/10 to-pink-300/5 blur-[2.5px]" />
    </div>
  </a>
);

export default TechIconCard;
