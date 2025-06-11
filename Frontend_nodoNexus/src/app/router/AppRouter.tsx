import { BrowserRouter, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { PrivateRoutes, PublicRoutes } from "../../config/routes";
import RoutesWithNotFound from "../../shared/utils/RoutesWithNotFound.tsx";
import AuthGuard from "../../shared/guards/AuthGuard.tsx";
import { DashboardLayout } from "../../features/dashboard/ui/components/DashboardLayout.tsx";
import RoleGuard from "../../shared/guards/RoleGuard.tsx";
import GlobalModal from "../../shared/components/modals/ui/GlobalModals.tsx";
import ProfileView from "../../shared/components/profile/ui/ProfileView.tsx";
import ProfileEdit from "../../shared/components/profile/ui/ProfileEdit.tsx";
import SolicitudProyectoPage from "../../features/solicitarProyecto/ui/pages/SolicitudProyectoPage.tsx";
import UserControl from "../../features/userControl/ui/pages/UserControlPage.tsx";
import AdminDashboard from "../../features/dashboard/ui/pages/AdminDashboard";
import GestionProyectos from "../../features/proyectos/ui/pages/GestionProyectos.tsx";


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
          <Route path={PublicRoutes.SOLICITUD} element={<SolicitudProyectoPage />} />
          <Route path={PublicRoutes.LOGIN} element={<Login />} />
          <Route element={<AuthGuard privateValidation={true} />}>
            <Route path={PrivateRoutes.DASHBOARD} element={<DashboardLayout />}>
              <Route path={PrivateRoutes.PROFILE} element={<ProfileView />} />
              <Route path={PrivateRoutes.PROFILE_EDIT} element={<ProfileEdit />} />
              {/* Rutas Admin */}
              <Route
                path={PrivateRoutes.ADMINDASHBOARD}
                element={<RoleGuard rol="ADMIN"><AdminDashboard /></RoleGuard>}
              />
              <Route
                path={PrivateRoutes.ADMIN_HOME}
                element={<RoleGuard rol="ADMIN"><AdminDashboard /></RoleGuard>}
              />
              <Route
                path={PrivateRoutes.ADMIN_USERS_CONTROL}
                element={<RoleGuard rol="ADMIN"><UserControl /></RoleGuard>}
              />
              <Route
                path={PrivateRoutes.ADMIN_AUDIT}
                element={<RoleGuard rol="ADMIN"><Placeholder name="Auditoría del sistema" /></RoleGuard>}
              />
              <Route
                path={PrivateRoutes.ADMIN_PROJECTS}
                element={<RoleGuard rol="ADMIN"><GestionProyectos /></RoleGuard>}
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

              {/* Ruta Client ( por ahora porque estamos utilizando el de admins) */}
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
