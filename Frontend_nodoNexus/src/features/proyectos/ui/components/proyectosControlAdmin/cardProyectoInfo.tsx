import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';
import './cardProyectoInfo.scss';

import { fetchProyectosVista, fetchAvanceProyecto, seleccionarProyecto } from '../../../infraestructure/redux/proyectoSlice';
import { ProyectoVista } from '../../../domain/entities/ProyectoVista';
import { AppDispatch, RootState } from '../../../../../app/store';
import { FaProjectDiagram } from 'react-icons/fa';

const CardProyectoInfo = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { proyectosVista, proyectoSeleccionado, avanceProyecto, loading, error } = useSelector((state: RootState) => state.proyectosList);

	useEffect(() => {
		dispatch(fetchProyectosVista());
	}, [dispatch]);

	useEffect(() => {
		if (proyectoSeleccionado) {
			dispatch(fetchAvanceProyecto(proyectoSeleccionado.proyecto_id));
		}
	}, [proyectoSeleccionado, dispatch]);

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
			<h3><span></span>Últimos Proyectos</h3>
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
							{avanceProyecto && (
								<div className='detallesEstadisticas'>
									<header>
										<h4>Estadísticas del Proyecto</h4>
									</header>
									<ul>
										{avanceProyecto.fases.map(fase => (
											<li key={fase.id} className='fase'>
												<CircularProgressbarWithChildren
													value={fase.porcentaje}
													strokeWidth={4}
													className='circularProgressbar'>
													<div className="circularProgressbar-innerProgress">
														<div className="porcentaje">{fase.porcentaje.toFixed(1)}%</div>
														<div className="nombreFase">{fase.nombre}</div>
													</div>
												</CircularProgressbarWithChildren>
											</li>
										))}
										<li className='porcentajeProyecto'>
											<div className="innerProgressTotal">
												<span>Avance Total</span>
												<span className="porcentajeTotal">{avanceProyecto.porcentajeProyecto.toFixed(2)}%</span>
											</div>
										</li>
									</ul>
								</div>
							)}
						</div>
					)}
				</div>
			)}
		</section>
	);
};

export default CardProyectoInfo;