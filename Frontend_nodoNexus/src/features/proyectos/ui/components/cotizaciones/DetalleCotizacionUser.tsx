import { useEffect, useState } from 'react';
import { Cotizacion } from '../../../domain/entities/Cotizacion';
import { aprobarCotizacion, getCotizacionUser } from '../../../infraestructure/api/nuevoProyectoApi';

interface Props {
	solicitudId: number;
}

const DetalleCotizacionUser = ({ solicitudId }: Props) => {
	const [cotizacion, setCotizacion] = useState<Cotizacion | null>(null);
	const [loading, setLoading] = useState(true);
	const [aprobando, setAprobando] = useState(false);

	useEffect(() => {
		const fetchCotizacion = async () => {
			try {
				const data = await getCotizacionUser(solicitudId);
				setCotizacion(data);
			} catch (error) {
				console.error('Error al obtener cotización', error);
			} finally {
				setLoading(false);
			}
		};

		fetchCotizacion();
	}, [solicitudId]);

	const handleAprobar = async () => {
		if (!cotizacion) return;

		try {
			setAprobando(true);
			await aprobarCotizacion(cotizacion.id);
			// Refrescar cotización después de aprobarla
			const actualizada = await getCotizacionUser(cotizacion.id);
			setCotizacion(actualizada);
		} catch (error) {
			console.error('No se pudo aprobar la cotización');
		} finally {
			setAprobando(false);
		}
	};

	return (
		<div>
			{loading ? (
				<p>Cargando cotización...</p>
			) : cotizacion ? (
				<>
					<h3>Detalles de la Cotización</h3>
					<p><strong>ID:</strong> {cotizacion.id}</p>
					<p><strong>Solicitud ID:</strong> {cotizacion.solicitudId}</p>
					<p><strong>Costo Total:</strong> ${cotizacion.costoTotal}</p>
					<p><strong>Estado:</strong> aqui {cotizacion.estado}</p>

					{cotizacion.estado !== 'APROBADA' && (
						<button onClick={handleAprobar} disabled={aprobando}>
							{aprobando ? 'Aprobando...' : 'Aprobar Cotización'}
						</button>
					)}
				</>
			) : (
				<p>No se encontró la cotización.</p>
			)}
		</div>
	);
};

export default DetalleCotizacionUser;