
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
      className="p-2 rounded-lg hover-scale bg-muted/70 dark:bg-accent transition-colors duration-200 text-muted-foreground dark:text-accent-foreground shadow focus:outline-none focus:ring-2 focus:ring-primary"
      onClick={() => setDark((d) => !d)}
      type="button"
    >
      {dark ? (
        <Sun className="w-5 h-5 transition-transform rotate-0 dark:-rotate-90" />
      ) : (
        <Moon className="w-5 h-5 transition-transform rotate-0 dark:rotate-90" />
      )}
      <span className="sr-only">Alternar tema</span>
    </button>
  );
}
