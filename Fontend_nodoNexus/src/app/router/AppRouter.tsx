import { BrowserRouter, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { PrivateRoutes, PublicRoutes } from "../../config/routes";
import RoutesWhithNotFound from "../../shared/utils/RoutesWithNotFound.tsx";
import AuthGuard from "../../shared/guards/AuthGuard.tsx";
import { DashboardLayout } from "../../features/dashboard/ui/components/DashboardLayout.tsx";
import RoleGuard from "../../shared/guards/RoleGuard.tsx";

const Login = lazy(() => import('../../features/auth/ui/pages/LoginPage'));
const AdminHome = lazy(() => import('../../features/dashboard/ui/pages/AdminDashboard'));
const ClientHome = lazy(() => import('../../features/dashboard/ui/pages/ClientDashboard'));
const AnalystHome = lazy(() => import('../../features/dashboard/ui/pages/AnalystDashboard'));


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        <RoutesWhithNotFound>
          {/* Redirección inicial al login */}
          <Route path="/" element={<Navigate to={`/${PublicRoutes.LOGIN}`} replace />} />
          {/* Ruta pública para login */}
          <Route path={PublicRoutes.LOGIN} element={<Login />} />
          {/* Rutas privadas protegidas por AuthGuard */}
          <Route element={<AuthGuard privateValidation={true} />}>
            <Route path={PrivateRoutes.DASHBOARD} element={<DashboardLayout />}>

              <Route
                path={PrivateRoutes.ADMINDASHBOARD}
                element={
                  <RoleGuard rol="ADMIN">
                    <AdminHome />
                  </RoleGuard>
                }
              />

              <Route
                path={PrivateRoutes.CLIENTDASHBOARD}
                element={
                  <RoleGuard rol="CLIENT">
                    <ClientHome />
                  </RoleGuard>
                }
              />

              <Route
                path={PrivateRoutes.ANALISTDASHBOARD}
                element={
                  <RoleGuard rol="ANALYST">
                    <AnalystHome />
                  </RoleGuard>
                }
              />

            </Route>
          </Route>
        </RoutesWhithNotFound>
      </Suspense>
    </BrowserRouter>
  );
};

