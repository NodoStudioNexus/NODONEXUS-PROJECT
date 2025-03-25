import { BrowserRouter, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { PrivateRoutes, PublicRoutes } from "../../config/routes";
import RoutesWhithNotFound from "../../shared/utils/RoutesWithNotFound.tsx";
import AuthGuard from "../../shared/guards/AuthGuard.tsx";
import { DashboardLayout } from "../../features/dashboard/ui/components/DashboardLayout.tsx";
import RoleGuard from "../../shared/guards/RoleGuard.tsx";
import GlobalModal from "../../shared/components/modals/ui/GlobalModals.tsx";

const Login = lazy(() => import('../../features/auth/ui/pages/LoginPage'));
const AdminHome = lazy(() => import('../../features/dashboard/ui/pages/AdminDashboard'));
const ClientHome = lazy(() => import('../../features/dashboard/ui/pages/ClientDashboard'));
const AnalystHome = lazy(() => import('../../features/dashboard/ui/pages/AnalystDashboard'));


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        <GlobalModal />
        <RoutesWhithNotFound>
          <Route path="/" element={<Navigate to={`/${PublicRoutes.LOGIN}`} replace />} />
          <Route path={PublicRoutes.LOGIN} element={<Login />} />
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

