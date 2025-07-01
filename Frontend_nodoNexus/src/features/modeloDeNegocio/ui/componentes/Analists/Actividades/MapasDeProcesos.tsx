interface MapasProcesosProps {
	proyectoId: number | null;
}

const MapasDeProcesos: React.FC<MapasProcesosProps> = ({ proyectoId }) => {
	return (
		<>
			<h2>Mapas de Procesos{proyectoId} </h2>
			<div>
				<h3>Reconocimiento general del sistema</h3>
				<p>Contexto y descripción de los procesos existentes.</p>
				<h3>Estudio de la factibilidad</h3>
				<p>Análisis inicial de viabilidad técnica, económica, etc.</p>
				<h3>Análisis de la factibilidad del sistema</h3>
				<p>Detalles específicos sobre la factibilidad.</p>
				<h3>Descripción del modelo de negocio</h3>
				<p>Cómo se integra el sistema en el modelo de negocio.</p>
				<h3>Mejora / Innovación (Opcional)</h3>
				<p>Oportunidades para optimizar o innovar.</p>
			</div>
		</>
	)
}
export default MapasDeProcesos;