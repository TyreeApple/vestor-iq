
import React from "react";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Configuracao() {
  return (
    <div className="w-full min-h-[40vh] flex items-center justify-center px-2">
      <Button
        asChild
        className="bg-muted text-foreground font-semibold shadow transition-colors hover:bg-muted/80 px-6 py-3 text-base"
      >
        <a
          href="https://github.com/olucasmf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="w-5 h-5 mr-2" /> Profile DEV
        </a>
      </Button>
    </div>
  );
}
