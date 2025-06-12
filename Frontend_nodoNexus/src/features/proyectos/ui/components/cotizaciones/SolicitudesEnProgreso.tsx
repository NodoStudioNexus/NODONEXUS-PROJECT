import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../app/store";
import { openModal } from "../../../../../shared/components/modals/infraestructure/redux/modalGlobalSlice";
import { useEffect } from "react";
import { fetchSolicitudesEnProgreso } from '../../../infraestructure/redux/nuevoProyectoSlice';

const SolicitudesEnProgreso = () => {
	const dispatch = useDispatch<AppDispatch>();
	const solicitudesEnProgreso = useSelector((state: RootState) => state.proyectos.solicitudesEnProgreso);
	const role = useSelector((state: RootState) => state.auth.user?.role);
	const loading = useSelector((state: RootState) => state.proyectos.loading);
	const error = useSelector((state: RootState) => state.proyectos.error);

	const handleCotizarClick = (solicitudId: number) => {
		dispatch(
			openModal({
				modalType: 'detallesProyecto',
				title: 'Detalles de la solicitud en progreso',
				message: '',
				autoClose: false,
				variant: 'detallesModal',
				extraClasses: 'modalDetalles',
				payload: { solicitudId },
			})
		);
	};

	useEffect(() => {
		if (role === 'ADMIN' || role === 'ANALYST') {
			dispatch(fetchSolicitudesEnProgreso());
		}
	}, [dispatch, role]);

	if (role !== 'ADMIN' && role !== 'ANALYST') {
		return null;
	}

	return (
		<div className='containerSolicitudesEnProgreso'>
			<h3>Solicitudes en Progreso</h3>
			{loading && <p>Cargando...</p>}
			{error && <p>{error}</p>}
			<ul>
				{solicitudesEnProgreso.length === 0 ? (
					<li>No hay solicitudes en progreso.</li>
				) : (
					solicitudesEnProgreso.map((solicitud) => (
						<li key={solicitud.id}>
							<p>Proyecto: {solicitud.nombreProyecto}</p>
							<p>Descripción: {solicitud.descripcion}</p>
							<p>Cliente: {solicitud.clienteNombre} {solicitud.clienteApellido}</p>
							<p>Fecha: {new Date(solicitud.fechaSolicitud).toLocaleString()}</p>
							<a className="buttonCotizacion" onClick={() => handleCotizarClick(solicitud.id)}>
								VER DETALLES
							</a>
						</li>
					))
				)}
			</ul>
		</div>
	);
};

export default SolicitudesEnProgreso;