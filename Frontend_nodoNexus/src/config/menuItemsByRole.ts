import { IconType } from 'react-icons';
import {
  FaHome,
  FaUsers,
  FaShieldAlt,
  FaProjectDiagram,
  FaChartLine,
  FaDatabase,
  FaClipboardList,
  FaSitemap,
  FaFileAlt,
  FaExclamationTriangle,
  FaUser,
  FaCalendar,
  FaTools,
  FaTasks,
  FaBug,
  FaClipboardCheck,
  FaCheckCircle,
} from 'react-icons/fa';
import { FaDiagramProject } from 'react-icons/fa6';

interface MenuItem {
  name: string;
  path: string;
  icon: IconType;
}

export const menuItemsByRole: Record<string, MenuItem[]> = {
  ADMIN: [
    { name: 'Inicio', path: '/dashboard/admin/home', icon: FaHome },
    { name: 'Gestión de usuarios', path: '/dashboard/admin/usersControl', icon: FaUsers },
    { name: 'Gestión de proyectos', path: '/dashboard/admin/projects', icon: FaProjectDiagram },
    // { name: 'Auditoría del sistema', path: '/dashboard/admin/audit', icon: FaShieldAlt },
    { name: 'Monitoreo en tiempo real', path: '/dashboard/admin/monitoring', icon: FaChartLine },
    { name: 'Respaldo', path: '/dashboard/admin/backup', icon: FaDatabase },
  ],
  ANALYST: [
    { name: 'Inicio', path: '/dashboard/analyst/home', icon: FaHome },
    { name: 'Gestión fase análisis', path: '/dashboard/analyst/analysis-phase', icon: FaClipboardList },
    { name: 'Modelado de negocio', path: '/dashboard/analyst/business-modeling', icon: FaSitemap },
    { name: 'Gestión de requerimientos', path: '/dashboard/analyst/requirements', icon: FaFileAlt },
    { name: 'Riesgos y reportes', path: '/dashboard/analyst/risks-reports', icon: FaExclamationTriangle },
  ],
  CLIENT: [
    { name: 'Mis Solicitudes', path: '/dashboard/client/solicitudes', icon: FaFileAlt },
    { name: 'Perfil', path: '/dashboard/client/profile', icon: FaUser },
  ],
  PLANNER: [
    { name: 'Planificación de Proyectos', path: '/dashboard/planner/projects', icon: FaProjectDiagram },
    { name: 'Calendario', path: '/dashboard/planner/calendar', icon: FaCalendar },
  ],
  MODELING: [
    { name: 'Modelado de Proyectos', path: '/dashboard/modeling/projects', icon: FaSitemap },
    { name: 'Diagramas', path: '/dashboard/modeling/diagrams', icon: FaDiagramProject },
  ],
  IMPLEMENTATION: [
    { name: 'Implementación de Proyectos', path: '/dashboard/implementation/projects', icon: FaTools },
    { name: 'Tareas', path: '/dashboard/implementation/tasks', icon: FaTasks },
  ],
  TESTER: [
    { name: 'Pruebas de Proyectos', path: '/dashboard/tester/projects', icon: FaBug },
    { name: 'Resultados de Pruebas', path: '/dashboard/tester/results', icon: FaClipboardCheck },
  ],
  VALIDATION: [
    { name: 'Validación de Proyectos', path: '/dashboard/validation/projects', icon: FaCheckCircle },
    { name: 'Reportes de Validación', path: '/dashboard/validation/reports', icon: FaFileAlt },
  ],
};