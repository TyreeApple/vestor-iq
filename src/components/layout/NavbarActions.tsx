
import React from "react";
import { Search, User, Menu, X, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type Props = {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
};

const NavbarActions: React.FC<Props> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="
        flex flex-1 justify-center
        items-center 
        gap-4
        min-w-0
        max-w-xs
        md:gap-6
      "
      style={{ minWidth: 0 }}
    >
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-accent transition-colors shrink-0"
        aria-label="Buscar"
      >
        <Search className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-accent transition-colors shrink-0"
        onClick={() => navigate("/configuracao")}
        aria-label="Configurações"
      >
        <Settings className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-accent transition-colors shrink-0"
      >
        <User className="w-5 h-5" />
      </Button>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden shrink-0"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </Button>
    </div>
  );
};

export default NavbarActions;
