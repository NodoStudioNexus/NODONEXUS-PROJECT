import SeccionActividades from '../../../../../../../shared/components/seccionActividades/SeccionActividades';
import './propuestaValor.scss';

interface PropuestaValorProps {
	proyectoId: number | null;
}

const PropuestaValor: React.FC<PropuestaValorProps> = ({ proyectoId }) => {
	const secciones = [
		{
			title: 'Definición del sistema',
			description: 'Describe qué es el sistema y su propósito principal.',
		},
		{
			title: 'Perspectiva del producto',
			description: 'Explica cómo el sistema se alinea con la visión del producto.',
		},
		{
			title: 'Funcionalidad del sistema',
			description: 'Detalla las funcionalidades clave que aportan valor.',
		},
		{
			title: 'Evaluación',
			description: 'Métodos para evaluar si la propuesta de valor es viable.',
		},
	];

	return (
		<section className="containerPropuestaValor">
			<div className='containerPropuestaValor-actividades'>
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
		</section>
	);
};

export default PropuestaValor;