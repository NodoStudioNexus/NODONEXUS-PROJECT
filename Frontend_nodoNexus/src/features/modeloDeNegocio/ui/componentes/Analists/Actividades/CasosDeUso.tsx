interface CasosDeUsoProps {
	proyectoId: number | null;
}

const CasosDeUso: React.FC<CasosDeUsoProps> = ({ proyectoId }) => {
	return (
		<>
			<h2>Casos De uso</h2>
			<div>
				<h3>Funcionalidad del sistema (casos de uso)</h3>
				<p>Describe cómo los usuarios interactúan con el sistema.</p>
				<h3>Análisis de riesgos</h3>
				<p>Identifica posibles problemas en los casos de uso.</p>
			</div>
		</>
	)
}
export default CasosDeUso;