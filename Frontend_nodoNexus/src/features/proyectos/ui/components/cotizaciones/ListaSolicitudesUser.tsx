import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../app/store';
import { VistaSolicitudUsuario, nuevoProyectoDetallada } from '../../../domain/entities/NuevoProyecto';
import { getSolicitudDetalles, getSolicitudesByUsuarioId } from '../../../infraestructure/api/nuevoProyectoApi';
import { FaEye, FaFilePrescription } from 'react-icons/fa';
import DetalleCotizacionUser from './DetalleCotizacionUser';

import './listaSolicitudesUser.scss';

const ListaSolicitudesUser = () => {
	const user = useSelector((state: RootState) => state.auth.user);
	const [solicitudes, setSolicitudes] = useState<VistaSolicitudUsuario[]>([]);
	const [loading, setLoading] = useState(true);
	const [detalles, setDetalles] = useState<Record<number, nuevoProyectoDetallada | null>>({});
	const [expanded, setExpanded] = useState<Record<number, boolean>>({});
	const [activeButton, setActiveButton] = useState<number | null>(null);

	useEffect(() => {
		const fetchSolicitudes = async () => {
			if (!user?.id) return;

			try {
				const data = await getSolicitudesByUsuarioId(user.id);
				setSolicitudes(data);
			} catch (error) {
				console.error('Error al obtener solicitudes del usuario', error);
			} finally {
				setLoading(false);
			}
		};

		fetchSolicitudes();
	}, [user?.id]);

	const toggleDetalles = async (id: number) => {
		// Ya estaban abiertos -> cerrar
		if (expanded[id]) {
			setExpanded((prev) => ({ ...prev, [id]: false }));
			return;
		}

		// Si no lo tenemos, lo pedimos
		if (!detalles[id]) {
			try {
				const detalle = await getSolicitudDetalles(id);
				setDetalles((prev) => ({ ...prev, [id]: detalle }));
			} catch (error) {
				console.error('Error al cargar detalles');
			}
		}

		// Expandir
		setExpanded((prev) => ({ ...prev, [id]: true }));
	};

	return (
		<div className='containerListaUser'>
			<h2>Tu lista de solicitudes:</h2>
			{loading ? (
				<p>Cargando solicitudes...</p>
			) : solicitudes.length === 0 ? (
				<p>No tienes solicitudes registradas.</p>
			) : (
				<ul>
					{solicitudes.map((solicitud) => (
						<li key={solicitud.solicitudId} >
							<div className='containerInfo'>
								<div className='containerInfo-liTitle' >
									<span>
										<strong>{solicitud.nombreProyecto}</strong> - {solicitud.estado}
									</span>
									<small>Fecha: {new Date(solicitud.fechaSolicitud).toLocaleDateString()}</small>
								</div>
								<div className='containerInfo-liInfo' >
									<p>{solicitud.descripcion}</p>
								</div>
								<div className='containerInfo-button' >
									<button onClick={() => toggleDetalles(solicitud.solicitudId)}>
										<FaEye size={16} />
										Ver más
									</button>
									{solicitud.estado === 'EN_PROCESO' && (
										<button onClick={() => setActiveButton(solicitud.solicitudId)}>
											<FaFilePrescription size={16} />
											Ver cotización
										</button>
									)}
									{activeButton === solicitud.solicitudId && (
										<DetalleCotizacionUser solicitudId={solicitud.solicitudId} />
									)}

								</div>
							</div>

							{/* Detalles desplegables */}
							{expanded[solicitud.solicitudId] && detalles[solicitud.solicitudId] && (
								<div className='containerDesplegable' >
									<p><strong>ID:</strong> {detalles[solicitud.solicitudId]?.id}</p>
									<p><strong>Nombre del proyecto:</strong> {detalles[solicitud.solicitudId]?.nombreProyecto}</p>
									<p><strong>Descripción:</strong> {detalles[solicitud.solicitudId]?.descripcion}</p>
									<p><strong>Estado:</strong> {detalles[solicitud.solicitudId]?.estado}</p>
									{/* Agrega más campos si deseas */}
								</div>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default ListaSolicitudesUser;
