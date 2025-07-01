import SeccionActividades from "../../../../../../../shared/components/seccionActividades/SeccionActividades";


interface CasosDeUsoProps {
	proyectoId: number | null;
}

const CasosDeUso: React.FC<CasosDeUsoProps> = ({ proyectoId }) => {
	const secciones = [
		{
			title: 'Funcionalidad del sistema (casos de uso)',
			description: 'Describe cómo los usuarios interactúan con el sistema.',
		},
		{
			title: 'Análisis de riesgos',
			description: 'Identifica posibles problemas en los casos de uso.',
		},]
	return (
		<>
			<h2>Casos De uso</h2>
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
export default CasosDeUso;