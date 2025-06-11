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
  FaExclamationTriangle
} from 'react-icons/fa';

interface MenuItem {
  name: string;
  path: string;
  icon: IconType;
}

export const menuItemsByRole: Record<string, MenuItem[]> = {
  ADMIN: [
    { name: 'Inicio', path: '/dashboard/admin/home', icon: FaHome },
    { name: 'Gestión de usuarios', path: '/dashboard/admin/usersControl', icon: FaUsers },
    { name: 'Auditoría del sistema', path: '/dashboard/admin/audit', icon: FaShieldAlt },
    { name: 'Gestión de proyectos', path: '/dashboard/admin/projects', icon: FaProjectDiagram },
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
};
