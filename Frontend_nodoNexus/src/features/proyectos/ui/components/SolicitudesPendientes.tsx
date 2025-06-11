import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../../app/store';

import { Link } from 'react-router-dom';
import { webSocketService } from '../../../../shared/services/websocketService';
import { addSolicitud, fetchSolicitudesPendientes } from '../../infraestructure/redux/nuevoProyectoSlice';
import { NuevoProyectoResumida } from '../../domain/entities/NuevoProyecto';


const SolicitudesPendientes = () => {
	const dispatch = useDispatch<AppDispatch>();
	const solicitudesPendientes = useSelector((state: RootState) => state.proyectos.solicitudesPendientes);
	const role = useSelector((state: RootState) => state.auth.user?.role);
	const userId = useSelector((state: RootState) => state.auth.user?.id);
	const loading = useSelector((state: RootState) => state.proyectos.loading);
	const error = useSelector((state: RootState) => state.proyectos.error);

	useEffect(() => {
		if (role === 'ADMIN' || role === 'ANALYST') {
			dispatch(fetchSolicitudesPendientes());
		}
	}, [dispatch, role]);

	useEffect(() => {
		if (role === 'ADMIN' || role === 'ANALYST' && userId) {
			webSocketService.subscribe(`/topic/notifications/${userId}`, (notification: NuevoProyectoResumida) => {
				dispatch(addSolicitud(notification));
			});
		}
	}, [dispatch, role, userId]);

	if (role !== 'ADMIN' && role !== 'ANALYST') {
		return null;
	}

	return (
		<div>
			<h3>Solicitudes Pendientes</h3>
			{loading && <p>Cargando...</p>}
			{error && <p>{error}</p>}
			<ul>
				{solicitudesPendientes.length === 0 ? (
					<li>No hay solicitudes pendientes.</li>
				) : (
					solicitudesPendientes.map((solicitud) => (
						<li key={solicitud.id}>
							<p>Proyecto: {solicitud.nombreProyecto}</p>
							<p>Descripción: {solicitud.descripcion}</p>
							<p>Cliente: {solicitud.clienteNombre} {solicitud.clienteApellido}</p>
							<p>Fecha: {new Date(solicitud.fechaSolicitud).toLocaleString()}</p>
							<Link to={`/cotizar/${solicitud.id}`}>Cotizar</Link>
						</li>
					))
				)}
			</ul>
		</div>
	);
};

export default SolicitudesPendientes;