import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import './modeladoNegocioAnalist.scss';

import { FaAngleDown, FaFolder, FaGripHorizontal } from "react-icons/fa";
import { GoProject } from "react-icons/go";
import DocumentacionModeladoAnalist from "../componentes/Analists/DocumentacionModeladoAnalist";
import { AppDispatch, RootState } from "../../../../../app/store";
import { addProyecto, fetchProyectosVista } from "../../../../proyectos/infraestructure/redux/proyectoSlice";
import { webSocketService } from "../../../../../shared/services/websocketService";
import { ProyectoVista } from "../../../../proyectos/domain/entities/ProyectoVista";


const ModeladoNegocioAnalist = () => {
	const dispatch = useDispatch<AppDispatch>();
	const proyectos = useSelector((state: RootState) => state.proyectosList.proyectosVista);
	const token = useSelector((state: RootState) => state.auth.user?.token);
	const [selectedProyectoId, setSelectedProyectoId] = useState<number | null>(null);
	const [isInfoVisible, setIsInfoVisible] = useState(true);
	const [isCollapsed, setIsCollapsed] = useState(false);

	const toggleLayout = () => {
		setIsCollapsed(!isCollapsed);
	};

	useEffect(() => {
		dispatch(fetchProyectosVista());
		if (token) {
			webSocketService.initialize(dispatch, token, () => {
				webSocketService.subscribe('/topic/proyectos', (newProyecto: ProyectoVista) => {
					console.log('Nuevo proyecto recibido:', newProyecto);
					dispatch(addProyecto(newProyecto));
				});
			});
		}
		return () => {
			webSocketService.disconnect();
		};
	}, [dispatch, token]);

	// Filtrar proyectos nuevos y últimos (por ejemplo, los últimos 5 como "últimos proyectos")
	const proyectosNuevos = proyectos.filter((proyecto: { estado: string; }) => proyecto.estado === 'nuevo');
	const ultimosProyectos = proyectos.slice(0, 5);
	const proyectosMostrados = [...proyectosNuevos, ...ultimosProyectos].reduce((unique, proyecto) => {
		// Eliminar duplicados basados en proyecto_id
		return unique.some((p) => p.proyecto_id === proyecto.proyecto_id) ? unique : [...unique, proyecto];
	}, [] as ProyectoVista[]);

	// Proyecto seleccionado para mostrar detalles
	const selectedProyecto = proyectos.find((proyecto) => proyecto.proyecto_id === selectedProyectoId);

	return (
		<>
			<section className={`container-proyectosModelado ${isCollapsed ? 'is-collapsed' : ''}`}>
				<div className="containerProyectosButtons">
					<span className="containerProyectosButtons-header">
						<h2>PROYECTOS</h2>

						<button onClick={() => toggleLayout()}>
							<FaGripHorizontal />

						</button>
					</span>
					{proyectosMostrados.length === 0 ? (
						<p>No hay proyectos disponibles</p>
					) : (
						proyectosMostrados.map((proyecto) => (
							<a
								key={proyecto.proyecto_id}
								onClick={() => setSelectedProyectoId(proyecto.proyecto_id)}
								className={selectedProyectoId === proyecto.proyecto_id ? 'active' : ''}
							>
								<span className="icon"><FaFolder /></span>
								<span className="info">
									<h4>{proyecto.porcentaje_avance.toFixed()}%</h4>
									{proyecto.nombre_proyecto}
								</span>
							</a>
						))
					)}
				</div>
				<div className="containerProyectosContent">
					{selectedProyecto ? (
						<>
							<div className="proyectoDetails">
								<div
									className={`proyectoDetails-header ${isInfoVisible ? 'is-open' : ''}`}
									onClick={() => setIsInfoVisible(!isInfoVisible)}
								>
									<h3><span><GoProject />
									</span>{selectedProyecto.nombre_proyecto}</h3>
									<span><FaAngleDown /></span>
								</div>
								<div className={`proyectoDetails-info ${isInfoVisible ? '' : 'is-hidden'}`}>
									<span className="proyectoDetails-infoDetails">
										<span className="icon"><FaFolder /></span>
										<span className="info" >
											<p>
												<strong>Estado:</strong> {selectedProyecto.proyecto_estado}
											</p>
											<p>
												<strong>Cliente:</strong> {selectedProyecto.cliente_nombre}{' '}
												{selectedProyecto.cliente_apellido}
											</p>

											<p>
												<strong>Fecha de inicio:</strong>{' '}
												{new Date(selectedProyecto.fecha_inicio).toLocaleString()}
											</p>
											<p>
												<strong>Descripción:</strong>{' '}
												{selectedProyecto.descripcion || 'No disponible'}
											</p>
										</span>
									</span>
									<span className="proyectoDetails-barProgress">
										<span>
											{selectedProyecto.porcentaje_avance.toFixed(1)}%
										</span>
										<progress value={selectedProyecto.porcentaje_avance} max={100} />
									</span>
								</div>
							</div>
							<DocumentacionModeladoAnalist proyectoId={selectedProyectoId} />
						</>
					) : (
						<p>Selecciona un proyecto para ver sus detalles</p>
					)}
				</div>
			</section>
		</>
	);
};

export default ModeladoNegocioAnalist;