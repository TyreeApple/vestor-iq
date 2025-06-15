import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ForkliftsPage from "./pages/Forklifts";
import ReportsPage from "./pages/Reports";
import OperatorsPage from "./pages/Operators";
import OperationsPage from "./pages/Operations";
import MaintenancePage from "./pages/Maintenance";
import GasSupplyPage from "./pages/GasSupply";
import MainLayout from "./components/layout/MainLayout";
import Configuracao from "./pages/Configuracao";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="empilhadeiras" element={<ForkliftsPage />} />
            <Route path="operadores" element={<OperatorsPage />} />
            <Route path="operacoes" element={<OperationsPage />} />
            <Route path="manutencao" element={<MaintenancePage />} />
            <Route path="abastecimento" element={<GasSupplyPage />} />
            <Route path="relatorios" element={<ReportsPage />} />
            {/* <Route path="configuracao" element={<Configuracao />} /> REMOVIDO */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
