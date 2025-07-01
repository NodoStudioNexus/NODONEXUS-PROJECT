import ButtonAction from '../../../../../../shared/components/Buttons/ButtonAction';
import './propuestaValor.scss';
interface PropuestaValorProps {
	proyectoId: number | null;
}
const PropuestaValor: React.FC<PropuestaValorProps> = ({ proyectoId }) => {
	return (
		<>
			<section className="containerPropuestaValor">
				<h2>Propuesta Valor {proyectoId}</h2>
				<div className='containerPropuestaValor-actividades'>
					<div className='containerPropuestaValor-definicion'>
						<span>
							<h3>Definición del sistema</h3>
							<p>Describe qué es el sistema y su propósito principal.</p>
						</span>
						<span className='containerPropuestaValor-info'>
							<ButtonAction proyectoId={proyectoId} />
						</span>
					</div>
					<div className='containerPropuestaValor-definicion'>
						<span>
							<h3>Perspectiva del producto</h3>
							<p>Explica cómo el sistema se alinea con la visión del producto.</p>
						</span>
						<span className='containerPropuestaValor-info'>
							<ButtonAction proyectoId={proyectoId} />
						</span>
					</div>
					<div className='containerPropuestaValor-definicion'>
						<span>
							<h3>Funcionalidad del sistema</h3>
							<p>Detalla las funcionalidades clave que aportan valor.</p>
						</span>
						<span className='containerPropuestaValor-info'>
							<ButtonAction proyectoId={proyectoId} />
						</span>
					</div>
					<div className='containerPropuestaValor-definicion'>
						<span>
							<h3>Evaluación</h3>
							<p>Métodos para evaluar si la propuesta de valor es viable.</p>
						</span>
						<span className='containerPropuestaValor-info'>
							<ButtonAction proyectoId={proyectoId} />
						</span>
					</div>

				</div>
			</section>
		</>
	)
}

export default PropuestaValor;