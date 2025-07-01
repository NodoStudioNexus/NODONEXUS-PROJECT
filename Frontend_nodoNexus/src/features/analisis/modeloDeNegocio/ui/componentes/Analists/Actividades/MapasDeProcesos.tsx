import SeccionActividades from "../../../../../../../shared/components/seccionActividades/SeccionActividades";


interface MapasProcesosProps {
	proyectoId: number | null;
}

const MapasDeProcesos: React.FC<MapasProcesosProps> = ({ proyectoId }) => {
	const secciones = [
		{
			title: 'Reconocimiento general del sistema',
			description: 'Contexto y descripción de los procesos existentes.',
		},
		{
			title: 'Estudio de la factibilidad',
			description: 'Análisis inicial de viabilidad técnica, económica, etc.',
		},
		{
			title: 'Análisis de la factibilidad del sistema',
			description: 'Detalles específicos sobre la factibilidad.',
		},
		{
			title: 'Descripción del modelo de negocio',
			description: 'Cómo se integra el sistema en el modelo de negocio.',
		},
		{
			title: 'Mejora / Innovación (Opcional)',
			description: 'Oportunidades para optimizar o innovar.',
		},
	]
	return (
		<>
			<h2>Mapas de Procesos{proyectoId} </h2>
			<div>
				{secciones.map((seccion, index) => (
					<SeccionActividades
						key={index}
						title={seccion.title}
						description={seccion.description}
						proyectoId={proyectoId} onSave={function (): void {
							throw new Error('Function not implemented.');
						}} />
				))}
			</div>
		</>
	)
}
export default MapasDeProcesos;