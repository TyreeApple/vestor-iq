
import React from 'react';
import { Gauge, Github, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card dark:bg-card border-t border-slate-200 dark:border-border mt-auto">
      <div className="w-full px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-primary rounded-xl">
                <Gauge className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground">FleetPro</h3>
                <p className="text-xs text-muted-foreground">Gestão de Frotas</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Sistema completo para gestão e monitoramento de frotas de empilhadeiras, 
              oferecendo controle total sobre operações, manutenção e performance.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/empilhadeiras" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Empilhadeiras
                </a>
              </li>
              <li>
                <a href="/operadores" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Operadores
                </a>
              </li>
              <li>
                <a href="/relatorios" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Relatórios
                </a>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Suporte</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Documentação
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">contato@fleetpro.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">São Paulo, SP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Linha divisória e copyright */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 FleetPro. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
