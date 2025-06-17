import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../app/store';
import { VistaSolicitudUsuario, nuevoProyectoDetallada } from '../../../domain/entities/NuevoProyecto';
import { getSolicitudDetalles, getSolicitudesByUsuarioId } from '../../../infraestructure/api/nuevoProyectoApi';
import { FaEye, FaFilePrescription } from 'react-icons/fa';



const ListaSolicitudesUser = () => {
	const user = useSelector((state: RootState) => state.auth.user);
	const [solicitudes, setSolicitudes] = useState<VistaSolicitudUsuario[]>([]);
	const [loading, setLoading] = useState(true);
	const [detalles, setDetalles] = useState<Record<number, nuevoProyectoDetallada | null>>({});
	const [expanded, setExpanded] = useState<Record<number, boolean>>({});

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
		<div>
			<h2 className="text-xl font-bold mb-4">Tu lista de solicitudes:</h2>
			{loading ? (
				<p>Cargando solicitudes...</p>
			) : solicitudes.length === 0 ? (
				<p>No tienes solicitudes registradas.</p>
			) : (
				<ul className="space-y-4">
					{solicitudes.map((solicitud) => (
						<li key={solicitud.solicitudId} className="border rounded-lg p-4 shadow-sm">
							<div className="flex justify-between items-center">
								<div>
									<strong>{solicitud.nombreProyecto}</strong> - {solicitud.estado}
									<p>{solicitud.descripcion}</p>
									<small>Fecha: {new Date(solicitud.fechaSolicitud).toLocaleDateString()}</small>
								</div>

								<div className="flex gap-2">
									<button
										className="text-blue-600 hover:underline flex items-center gap-1"
										onClick={() => toggleDetalles(solicitud.solicitudId)}
									>
										<FaEye size={16} />
										Ver más
									</button>

									{solicitud.estado === 'EN_PROCESO' && (
										<button
											className="text-green-600 hover:underline flex items-center gap-1"
											onClick={() => alert('Aquí iría la vista de cotización')} // reemplaza con tu lógica
										>
											<FaFilePrescription size={16} />
											Ver cotización
										</button>
									)}
								</div>
							</div>

							{/* Detalles desplegables */}
							{expanded[solicitud.solicitudId] && detalles[solicitud.solicitudId] && (
								<div className="mt-3 p-3 bg-gray-50 rounded text-sm">
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
