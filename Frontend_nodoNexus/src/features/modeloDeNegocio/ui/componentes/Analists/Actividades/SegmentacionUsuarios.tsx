interface SegmentacionProps {
	proyectoId: number | null;
}

const SegmentacionUsuarios: React.FC<SegmentacionProps> = ({ proyectoId }) => {
	return (
		<>
			<h2>Segmentacion Usuarios {proyectoId}</h2>
			<div>
				<h3>Identificación de roles y stakeholders</h3>
				<p>Lista de usuarios y partes interesadas del sistema.</p>
				<h3>Definición de las actividades</h3>
				<p>Descripción de las acciones que realizan los usuarios.</p>
			</div>
		</>
	)
}
export default SegmentacionUsuarios;