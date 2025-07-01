import SeccionActividades from "../../../../../../../shared/components/seccionActividades/SeccionActividades";


interface SegmentacionProps {
	proyectoId: number | null;
}

const SegmentacionUsuarios: React.FC<SegmentacionProps> = ({ proyectoId }) => {
	const secciones = [
		{
			title: 'Identificación de roles y stakeholders',
			description: 'Lista de usuarios y partes interesadas del sistema.',
		},
		{
			title: 'Definición de las actividades',
			description: 'Descripción de las acciones que realizan los usuarios.',
		},]

	return (
		<>
			<h2>Segmentacion Usuarios {proyectoId}</h2>
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
export default SegmentacionUsuarios;