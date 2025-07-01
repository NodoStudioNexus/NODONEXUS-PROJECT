import { useNavigate } from "react-router";
import { PrivateRoutes } from "../../../../config/routes";
import { FaClipboardList, FaExclamationTriangle, FaFileAlt, FaSitemap } from "react-icons/fa";
import './analystDashboard.scss'; // Asegúrate de crear este archivo

const AnalystDashboard = () => {
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Gestión Fase Análisis', path: `/dashboard/${PrivateRoutes.ANALYST_ANALYSIS_PHASE}`, icon: FaClipboardList },
    { name: 'Modelado de Negocio', path: `/dashboard/${PrivateRoutes.ANALYST_BUSINESS_MODELING}`, icon: FaSitemap },
    { name: 'Gestión de Requerimientos', path: `/dashboard/${PrivateRoutes.ANALYST_REQUIREMENTS}`, icon: FaFileAlt },
    { name: 'Riesgos y Reportes', path: `/dashboard/${PrivateRoutes.ANALYST_RISKS_REPORTS}`, icon: FaExclamationTriangle },
  ];

  return (
    <section className="containerSeguimiento">
      <header>
        <h2>Bienvenido, Analista</h2>
        <h3>Selecciona una opción para comenzar</h3>
      </header>
      <section className="containerSeguimiento-content">
        {menuItems.map((item) => (
          <button
            key={item.path}
            className="relative"
            onClick={() => navigate(item.path)}
          >
            <span><item.icon /></span>
            {item.name}
          </button>
        ))}
      </section>
    </section>
  );
};

export default AnalystDashboard;