
import * as React from "react";
import { Moon, Sun } from "lucide-react";

const DARK_CLASS = "dark";

function setDarkClass(enabled: boolean) {
  if (enabled) {
    document.documentElement.classList.add(DARK_CLASS);
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove(DARK_CLASS);
    localStorage.setItem("theme", "light");
  }
}

function getInitialTheme(): "light" | "dark" {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      return stored;
    }
    // fallback: prefers-color-scheme
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light";
}

export default function ThemeToggle() {
  const [dark, setDark] = React.useState(() => getInitialTheme() === "dark");

  React.useEffect(() => {
    setDarkClass(dark);
  }, [dark]);

  return (
    <button
      aria-label={dark ? "Ativar modo claro" : "Ativar modo escuro"}
      className={`
        relative inline-flex h-6 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
        ${dark ? 'bg-slate-700' : 'bg-slate-200'}
      `}
      onClick={() => setDark((d) => !d)}
      type="button"
    >
      {/* Toggle circle */}
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-300 flex items-center justify-center
          ${dark ? 'translate-x-8' : 'translate-x-1'}
        `}
      >
        {dark ? (
          <Moon className="w-2 h-2 text-slate-700" />
        ) : (
          <Sun className="w-2 h-2 text-amber-500" />
        )}
      </span>
      
      {/* Background icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
        <Sun className={`w-2 h-2 transition-opacity duration-300 ${dark ? 'opacity-40 text-slate-400' : 'opacity-0'}`} />
        <Moon className={`w-2 h-2 transition-opacity duration-300 ${dark ? 'opacity-0' : 'opacity-40 text-slate-500'}`} />
      </div>
      
      <span className="sr-only">Alternar tema</span>
    </button>
  );
}
