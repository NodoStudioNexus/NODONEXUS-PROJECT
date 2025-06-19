import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './cardProyectoInfo.scss';

import { fetchProyectosVista, seleccionarProyecto } from '../../../infraestructure/redux/proyectoSlice';
import { ProyectoVista } from '../../../domain/entities/ProyectoVista';
import { AppDispatch, RootState } from '../../../../../app/store';

const CardProyectoInfo = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { proyectosVista, proyectoSeleccionado, loading, error } = useSelector((state: RootState) => state.proyectosList);

	useEffect(() => {
		dispatch(fetchProyectosVista());
	}, [dispatch]);

	if (loading) {
		return (
			<section className='containerCardProyecto'>
				<h3>Últimos Proyectos</h3>
				<div>Cargando...</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className='containerCardProyecto'>
				<h3>Últimos Proyectos</h3>
				<div>{error}</div>
			</section>
		);
	}

	return (
		<section className='containerCardProyecto'>
			<h3>Últimos Proyectos</h3>
			{proyectosVista.length === 0 ? (
				<p>No hay proyectos disponibles</p>
			) : (
				<div className='containerCardInfo'>
					<div className='listaProyectos'>
						{proyectosVista.map((proyecto: ProyectoVista) => (
							<div
								key={proyecto.proyecto_id}
								className={`proyectoCard ${proyectoSeleccionado?.proyecto_id === proyecto.proyecto_id ? 'selected' : ''}`}
								onClick={() => dispatch(seleccionarProyecto(proyecto))}
							>
								<header>
									<h4>{proyecto.nombre_proyecto}</h4>
									<progress value={proyecto.porcentaje_avance} max={100} />
								</header>
								<p>{proyecto.cliente_nombre}</p>
							</div>
						))}
					</div>
					{proyectoSeleccionado && (
						<div className='detallesProyecto'>
							<section>
								<div className='contenedorDetalles'>
									<h4>Detalles Generales</h4>
									<p>Nombre: {proyectoSeleccionado.nombre_proyecto}</p>
									<p>Descripción: {proyectoSeleccionado.documentacion_url}</p>
									<p>Inicio: {new Date(proyectoSeleccionado.fecha_inicio).toLocaleDateString()}</p>
								</div>
								<div className='contenedorEstado'>
									<h4>Estado y Avance</h4>
									<p>Estado: {proyectoSeleccionado.proyecto_estado}</p>
									<p>Porcentaje de avance: {proyectoSeleccionado.porcentaje_avance}%</p>
								</div>
							</section>
							<div className='contenedorCliente'>
								<h4>Información del Cliente</h4>
								<p>Nombre: {proyectoSeleccionado.cliente_nombre} {proyectoSeleccionado.cliente_apellido}</p>
								<p>Email: {proyectoSeleccionado.cliente_email}</p>
								<h2><p>{proyectoSeleccionado.porcentaje_avance}%</p></h2>
							</div>
						</div>
					)}
				</div>
			)}
		</section>
	);
};

export default CardProyectoInfo;