import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../app/store';
import { nuevoProyectoDetallada } from '../../../domain/entities/NuevoProyecto';
import FormularioCotizacion from './FormularioCotizacion';
import './detallesSolicitud.scss';
import { getSolicitudDetalles } from '../../../infraestructure/api/nuevoProyectoApi';

interface DetalleSolicitudProps {
	solicitudId: number;
}

const DetalleSolicitud: React.FC<DetalleSolicitudProps> = ({ solicitudId }) => {
	const [mostrarForm, setMostrarForm] = useState(false);
	const [detalles, setDetalles] = useState<nuevoProyectoDetallada | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const token = useSelector((state: RootState) => state.auth.user?.token);

	useEffect(() => {
		if (!solicitudId || !token) {
			setError('ID de solicitud o token no válido');
			setLoading(false);
			return;
		}

		const fetchDetalles = async () => {
			try {
				const response = await getSolicitudDetalles(solicitudId);
				setDetalles(response);
				setLoading(false);
			} catch (err) {
				setError('Error al cargar los detalles');
				setLoading(false);
			}
		};
		fetchDetalles();
	}, [solicitudId, token]);

	if (loading) {
		return <p>Cargando detalles...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<>
			{mostrarForm && (
				<div className="formularioCotizar">
					<aside>
						<FormularioCotizacion solicitudId={solicitudId} />
						<button onClick={() => setMostrarForm(false)}>Cerrar</button>
					</aside>
				</div>
			)}
			<section className="containerDetalles">
				<div className="containerDetallesInfo">
					<div className="containerDetallesInfo-containerButtonCotizacion">
						{detalles && detalles.estado !== 'EN_PROCESO' && (
							<button
								className="buttonHacerCotizacion"
								onClick={() => setMostrarForm(true)}
							>
								Hacer cotización
							</button>
						)}
					</div>
					<section className="containerDetallesInfo-detallesModal">
						{detalles ? (
							<div>
								<div>
									<p><strong>ID:</strong> {detalles.id}</p>
									<h3>Detalles de la solicitud</h3>
								</div>
								<div>
									<p><strong>Proyecto:</strong> {detalles.nombreProyecto}</p>
									<span>
										<p>
											<strong>Cliente:</strong> {detalles.usuario.primerNombre}{' '}
											{detalles.usuario.primerApellido}
										</p>
									</span>
									<span>
										<p>
											<strong>Número Telefónico:</strong> {detalles.numeroTelefonico || 'N/A'}
										</p>

										<p><strong>Email del Cliente:</strong> {detalles.usuario.email}</p>

										<p><strong>Tipo de Proyecto:</strong> {detalles.tipoProyecto}</p>
									</span>
								</div>
								<p>
									<strong>Presupuesto:</strong> {detalles.presupuestoMin || 'N/A'} -{' '}
									{detalles.presupuestoMax || 'N/A'}
								</p>
								<p><strong>Descripción:</strong> {detalles.descripcion}</p>
								<p>
									<strong>Plazo Estimado:</strong> {detalles.plazoEstimado || 'N/A'} días
								</p>
								<p>
									<strong>Archivos Adjuntos:</strong> {detalles.archivosAdjuntos || 'Ninguno'}
								</p>
								<p>
									<strong>Fecha de Solicitud:</strong>{' '}
									{new Date(detalles.fechaSolicitud).toLocaleString()}
								</p>
								<p><strong>Estado:</strong> {detalles.estado}</p>

								<p><strong>Rol del Cliente:</strong> {detalles.usuario.role}</p>
							</div>
						) : (
							<p>No hay detalles disponibles.</p>
						)}
					</section>
				</div>
			</section>
		</>
	);
};

export default DetalleSolicitud;