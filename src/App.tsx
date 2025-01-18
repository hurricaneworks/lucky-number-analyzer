import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MonthView from "./pages/MonthView";
import Footer from "./components/Footer";
import { GPTEngineerScript } from "./components/GPTEngineerScript";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GPTEngineerScript />
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/month/:year/:month" element={<MonthView />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
