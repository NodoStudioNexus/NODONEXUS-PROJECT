import EstadoSolicitudes from "../components/cotizaciones/EstadoSolicitudes";
import ListaProyectos from "../components/proyectosFases/ListaProyectos";
import CardProyectoInfo from "../components/proyectosFases/cardProyectoInfo";

import './gestionProyectos.scss';

const GestionProyectos = () => {
	return (
		<>
			<section className="containerGestionProyectos">
				<div className="containerGestionProyectos-containerUno" >
					<CardProyectoInfo />
					<EstadoSolicitudes />
				</div>
				<div className="containerGestionProyectos-containerDos">
					<ListaProyectos />
				</div>
			</section>
		</>
	)
}

export default GestionProyectos;