import { Outlet } from "react-router";
import EstadoSolicitudes from "../components/cotizaciones/EstadoSolicitudes";
import ListaProyectos from "../components/proyectosControlAdmin/ListaProyectos";
import CardProyectoInfo from "../components/proyectosControlAdmin/cardProyectoInfo";

import './gestionProyectos.scss';

const GestionProyectos = () => {
	return (
		<>
			<section className="containerGestionProyectos">
				<div className="containerGestionProyectos-containerDos">
					<ListaProyectos />
				</div>
				<div className="containerGestionProyectos-containerUno" >
					<EstadoSolicitudes />
					<CardProyectoInfo />
				</div>
				<Outlet />
			</section>
		</>
	)
}

export default GestionProyectos;