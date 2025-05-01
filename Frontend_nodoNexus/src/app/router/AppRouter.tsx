import { BrowserRouter, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { PrivateRoutes, PublicRoutes } from "../../config/routes";
import RoutesWithNotFound from "../../shared/utils/RoutesWithNotFound.tsx";
import AuthGuard from "../../shared/guards/AuthGuard.tsx";
import { DashboardLayout } from "../../features/dashboard/ui/components/DashboardLayout.tsx";
import RoleGuard from "../../shared/guards/RoleGuard.tsx";
import GlobalModal from "../../shared/components/modals/ui/GlobalModals.tsx";

// Componentes lazy-loaded
const Login = lazy(() => import('../../features/auth/ui/pages/LoginPage'));
const AdminHome = lazy(() => import('../../features/dashboard/ui/pages/AdminDashboard'));
const ClientHome = lazy(() => import('../../features/dashboard/ui/pages/ClientDashboard'));
const AnalystHome = lazy(() => import('../../features/dashboard/ui/pages/AnalystDashboard'));

// Placeholder para subrutas (puedes crear componentes reales después)
const Placeholder = ({ name }: { name: string }) => <div>{name}</div>;

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        <GlobalModal />
        <RoutesWithNotFound>
          <Route path="/" element={<Navigate to={`/${PublicRoutes.LOGIN}`} replace />} />
          <Route path={PublicRoutes.LOGIN} element={<Login />} />
          <Route element={<AuthGuard privateValidation={true} />}>
            <Route path={PrivateRoutes.DASHBOARD} element={<DashboardLayout />}>
              {/* Rutas Admin */}
              <Route
                path={PrivateRoutes.ADMINDASHBOARD}
                element={<RoleGuard rol="ADMIN"><AdminHome /></RoleGuard>}
              />
              <Route
                path={PrivateRoutes.ADMIN_HOME}
                element={<RoleGuard rol="ADMIN"><Placeholder name="Inicio aaa" /></RoleGuard>}
              />
              <Route
                path={PrivateRoutes.ADMIN_USERS_PERMISSIONS}
                element={<RoleGuard rol="ADMIN"><Placeholder name="Gestión de usuarios y permisos" /></RoleGuard>}
              />
              <Route
                path={PrivateRoutes.ADMIN_AUDIT}
                element={<RoleGuard rol="ADMIN"><Placeholder name="Auditoría del sistema" /></RoleGuard>}
              />
              <Route
                path={PrivateRoutes.ADMIN_PROJECTS}
                element={<RoleGuard rol="ADMIN"><Placeholder name="Gestión de proyectos" /></RoleGuard>}
              />
              <Route
                path={PrivateRoutes.ADMIN_MONITORING}
                element={<RoleGuard rol="ADMIN"><Placeholder name="Monitoreo en tiempo real" /></RoleGuard>}
              />
              <Route
                path={PrivateRoutes.ADMIN_BACKUP}
                element={<RoleGuard rol="ADMIN"><Placeholder name="Respaldo y recuperación de datos" /></RoleGuard>}
              />

              {/* Rutas Analyst */}
              <Route
                path={PrivateRoutes.ANALISTDASHBOARD}
                element={<RoleGuard rol="ANALYST"><AnalystHome /></RoleGuard>}
              />
              <Route
                path={PrivateRoutes.ANALYST_HOME}
                element={<RoleGuard rol="ANALYST"><Placeholder name="Inicio" /></RoleGuard>}
              />
              <Route
                path={PrivateRoutes.ANALYST_ANALYSIS_PHASE}
                element={<RoleGuard rol="ANALYST"><Placeholder name="Gestión de la fase de análisis" /></RoleGuard>}
              />
              <Route
                path={PrivateRoutes.ANALYST_BUSINESS_MODELING}
                element={<RoleGuard rol="ANALYST"><Placeholder name="Modelado de negocio" /></RoleGuard>}
              />
              <Route
                path={PrivateRoutes.ANALYST_REQUIREMENTS}
                element={<RoleGuard rol="ANALYST"><Placeholder name="Gestión de requerimientos" /></RoleGuard>}
              />
              <Route
                path={PrivateRoutes.ANALYST_RISKS_REPORTS}
                element={<RoleGuard rol="ANALYST"><Placeholder name="Riesgos y reportes" /></RoleGuard>}
              />

              {/* Ruta Client (placeholder por ahora porque estamos utilizando el de admins) */}
              <Route
                path={PrivateRoutes.CLIENTDASHBOARD}
                element={<RoleGuard rol="CLIENT"><ClientHome /></RoleGuard>}
              />
            </Route>
          </Route>
        </RoutesWithNotFound>
      </Suspense>
    </BrowserRouter>
  );
};
