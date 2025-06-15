import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../../../app/store';
import { webSocketService } from '../../../../../shared/services/websocketService';
import { addSolicitud, fetchSolicitudesPendientes } from '../../../infraestructure/redux/nuevoProyectoSlice';
import { NuevoProyectoResumida } from '../../../domain/entities/NuevoProyecto';
import { openModal } from '../../../../../shared/components/modals/infraestructure/redux/modalGlobalSlice';
import { FaFile, FaUser } from "react-icons/fa6";
import { MdArrowCircleRight } from "react-icons/md";


import './solicitudesPendientes.scss';

const SolicitudesPendientes = () => {
	const dispatch = useDispatch<AppDispatch>();
	const solicitudesPendientes = useSelector((state: RootState) => state.proyectos.solicitudesPendientes);
	const role = useSelector((state: RootState) => state.auth.user?.role);
	const userId = useSelector((state: RootState) => state.auth.user?.id);
	const loading = useSelector((state: RootState) => state.proyectos.loading);
	const error = useSelector((state: RootState) => state.proyectos.error);

	const handleCotizarClick = (solicitudId: number) => {
		console.log('solicitudId en handleCotizarClick:', solicitudId);
		dispatch(
			openModal({
				modalType: 'detallesProyecto',
				title: '',
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
			dispatch(fetchSolicitudesPendientes());
		}
	}, [dispatch, role]);

	useEffect(() => {
		if (role === 'ADMIN' || role === 'ANALYST' && userId) {
			const subscribe = () => {
				if (webSocketService.isConnected()) {
					webSocketService.subscribe(`/topic/notifications/${userId}`, (notification: NuevoProyectoResumida) => {
						if (!solicitudesPendientes.some(s => s.id === notification.id)) {
							dispatch(addSolicitud(notification));
						}
					});
				} else {
					setTimeout(subscribe, 1000);
				}
			};
			subscribe();
		}
	}, [dispatch, role, userId, solicitudesPendientes]);

	if (role !== 'ADMIN' && role !== 'ANALYST') {
		return null;
	}

	const uniqueSolicitudes = Array.from(new Map(solicitudesPendientes.map(s => [s.id, s])).values());

	return (
		<div className='containerSolicitudesPendientes'>
			{loading && <p>Cargando...</p>}
			{error && <p>{error}</p>}
			<ul>
				{uniqueSolicitudes.length === 0 ? (
					<li>No hay solicitudes pendientes.</li>
				) : (
					uniqueSolicitudes.map((solicitud) => (
						<li className='content' key={solicitud.id}>
							<div className='content-icon'>
								<FaFile />

							</div>
							<div className='content-info'>
								<div>
									<h3><span><FaUser />{solicitud.clienteNombre} {solicitud.clienteApellido}</span> {solicitud.nombreProyecto}</h3>
									<p className='date'>{new Date(solicitud.fechaSolicitud).toLocaleString()}</p>
								</div>
								<span>
									{solicitud.estado !== 'EN_PROCESO' && (
										<a className="buttonCotizacion" onClick={() => handleCotizarClick(solicitud.id)}>
											COTIZAR
											<span><MdArrowCircleRight /></span>
										</a>
									)}
								</span>
							</div>
						</li>
					))
				)}
			</ul>
		</div>
	);
};

export default SolicitudesPendientes;