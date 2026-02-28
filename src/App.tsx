import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/store/auth-store";
import { ERPStoreProvider } from "@/store/erp-store";
import { ProtectedRoute } from "@/components/erp/ProtectedRoute";
import { ERPLayout } from "@/components/erp/ERPLayout";
import Login from "@/pages/Login";
import AdminDashboard from "@/pages/AdminDashboard";
import CRMPage from "@/pages/modules/CRMPage";
import SellingPage from "@/pages/modules/SellingPage";
import BuyingPage from "@/pages/modules/BuyingPage";
import DistributionPage from "@/pages/modules/DistributionPage";
import HRPage from "@/pages/modules/HRPage";
import ProjectPage from "@/pages/modules/ProjectPage";
import ServicePage from "@/pages/modules/ServicePage";
import ManufacturingPage from "@/pages/modules/ManufacturingPage";
import AccountsPage from "@/pages/modules/AccountsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <ERPStoreProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route element={<ProtectedRoute><ERPLayout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/crm" element={<ProtectedRoute allowedRoles={['crm']}><CRMPage /></ProtectedRoute>} />
                <Route path="/selling" element={<ProtectedRoute allowedRoles={['selling']}><SellingPage /></ProtectedRoute>} />
                <Route path="/buying" element={<ProtectedRoute allowedRoles={['buying']}><BuyingPage /></ProtectedRoute>} />
                <Route path="/distribution" element={<ProtectedRoute allowedRoles={['distribution']}><DistributionPage /></ProtectedRoute>} />
                <Route path="/hr" element={<ProtectedRoute allowedRoles={['hr']}><HRPage /></ProtectedRoute>} />
                <Route path="/project" element={<ProtectedRoute allowedRoles={['project']}><ProjectPage /></ProtectedRoute>} />
                <Route path="/service" element={<ProtectedRoute allowedRoles={['service']}><ServicePage /></ProtectedRoute>} />
                <Route path="/manufacturing" element={<ProtectedRoute allowedRoles={['manufacturing']}><ManufacturingPage /></ProtectedRoute>} />
                <Route path="/accounts" element={<ProtectedRoute allowedRoles={['accounts']}><AccountsPage /></ProtectedRoute>} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ERPStoreProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
