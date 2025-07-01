import { useSelector, useDispatch } from 'react-redux';
import { FaFile, FaHeadset, FaPlus, FaProjectDiagram } from 'react-icons/fa';
import './clientDashboard.scss';
import { RootState } from '../../../../app/store';
import { openModal } from '../../../../shared/components/modals/infraestructure/redux/modalGlobalSlice';


const ClientDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleSolicitudesClick = () => {
    dispatch(
      openModal({
        modalType: 'misSolicitudes',
        title: '',
        message: '',
        autoClose: false,
        variant: 'detallesModal',
        extraClasses: 'modalDetalles',
        payload: {},
      })
    );
  };

  const handleCotizacionesClick = () => {
    if (user) {
      // Placeholder para fetch de cotizaciones relacionadas con solicitudes del usuario
      // Ejemplo: dispatch(fetchCotizaciones(user.id));
      alert('Mostrando cotizaciones relacionadas...');
    }
  };

  const handleProyectosClick = () => {
    if (user) {
      // Placeholder para fetch de proyectos aprobados del usuario
      // Ejemplo: dispatch(fetchProyectos(user.id));
      alert('Mostrando proyectos aprobados...');
    }
  };

  const handleCrearProyectoClick = () => {
    // Lógica para crear un proyecto
    alert('Creando un nuevo proyecto...');
  };

  return (
    <>
      <section className="containerSeguimiento">
        <header>
          <h2>¡Hola {user?.primerNombre}!</h2>
          <h3>Aquí podrás llevar el seguimiento de tus proyectos</h3>
        </header>
        <section className="containerSeguimiento-content">
          <button onClick={() => handleSolicitudesClick()} className="relative">
            <span><FaFile /> </span> Solicitudes<span className="notification-dot"></span>
          </button>
          <button onClick={handleCotizacionesClick} className="relative">
            <span><FaProjectDiagram /></span> Proyectos <span className="notification-dot"></span>
          </button>
          <button onClick={handleProyectosClick} className="relative">
            <span><FaHeadset /></span> Contactanos<span className="notification-dot"></span>
          </button>
          <button onClick={handleCrearProyectoClick} className="relative">
            <span><FaPlus /></span> Crear Proyecto
          </button>
        </section>
      </section>
    </>
  );
};

export default ClientDashboard;