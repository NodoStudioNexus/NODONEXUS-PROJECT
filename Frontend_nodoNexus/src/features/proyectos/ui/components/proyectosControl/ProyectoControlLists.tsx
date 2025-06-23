import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TbTrash } from 'react-icons/tb';
import { BsEye, BsViewList, BsGrid } from 'react-icons/bs';
import { AppDispatch, RootState } from '../../../../../app/store';
import { addProyecto, fetchProyectosVista } from '../../../infraestructure/redux/proyectoSlice';
import { webSocketService } from '../../../../../shared/services/websocketService';
import { ProyectoVista } from '../../../domain/entities/ProyectoVista';

import './proyectoControlLists.scss';
import { FaFolder } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { PrivateRoutes } from '../../../../../config/routes';

const ProyectoControlLists = () => {
	const dispatch = useDispatch<AppDispatch>();
	const proyectos = useSelector((state: RootState) => state.proyectosList.proyectosVista);
	const token = useSelector((state: RootState) => state.auth.user?.token);
	const [expandedProyecto, setExpandedProyecto] = useState<number | null>(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('');
	const [sortOrder, setSortOrder] = useState('desc');
	const [viewMode, setViewMode] = useState('list');

	const navigate = useNavigate();


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

	const handleEyeClick = (proyectoId: number) => {
		setExpandedProyecto(expandedProyecto === proyectoId ? null : proyectoId);
	};


	const filteredProyectos = proyectos.filter((proyecto: ProyectoVista) => {
		const nombre = proyecto.nombre_proyecto.toLowerCase();
		const matchesName = nombre.includes(searchTerm.toLowerCase());
		const matchesStatus = statusFilter
			? proyecto.proyecto_estado === statusFilter
			: true;
		return matchesName && matchesStatus;
	});

	const sortedProyectos = [...filteredProyectos].sort((a: ProyectoVista, b: ProyectoVista) => {
		const dateA = new Date(a.fecha_inicio).getTime();
		const dateB = new Date(b.fecha_inicio).getTime();
		return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
	});

	const handleViewProyecto = (proyectoId: number) => {
		navigate(`/${PrivateRoutes.DASHBOARD}/${PrivateRoutes.ADMIN_PROJECTS}/proyectoDetalles/${proyectoId}`);
		console.log(`Ver proyecto con ID: ${proyectoId}`);
	};

	return (
		<section className="containerProyectoControl">
			<header className="containerProyectoControl-header">
				<h2>Control de proyectos</h2>
				<div className="filterProyectos">
					<input
						type="text"
						placeholder="Buscar por nombre..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<select
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
					>
						<option value="">Todos los estados</option>
						<option value="EN_PROGRESO">En Progreso</option>
						<option value="COMPLETADO">Completado</option>
					</select>
					<select
						value={sortOrder}
						onChange={(e) => setSortOrder(e.target.value)}
					>
						<option value="desc">Más reciente primero</option>
						<option value="asc">Más antiguo primero</option>
					</select>
					<button
						onClick={() => setViewMode(viewMode === 'list' ? 'card' : 'list')}
						title={viewMode === 'list' ? 'Vista de cards' : 'Vista de lista'}
					>
						{viewMode === 'list' ? <BsGrid /> : <BsViewList />}
					</button>
				</div>
			</header>
			<div className={`containerProyectoControl-content ${viewMode}`}>
				{sortedProyectos.length === 0 ? (
					<p className="noResults">No se encontraron coincidencias</p>
				) : (
					<div className={viewMode === 'list' ? 'listView' : 'cardView'}>
						{sortedProyectos.map((proyecto: ProyectoVista) => (
							<div key={proyecto.proyecto_id} className={viewMode === 'list' ? 'proyectoItem' : 'proyectoCard'}>
								{viewMode === 'list' ? (
									<div className="infoLists">
										<input type="checkbox" />
										<FaFolder className='infoLists-icon' />
										<div className="infoProyecto">
											<span>
												<p>Nombre</p>
												<h4>{proyecto.nombre_proyecto} </h4>
											</span>
											<span>
												<p>Estado</p>
												<h4>{proyecto.proyecto_estado}</h4>
											</span>
											<span>
												<p>Cliente</p>
												<h4>{proyecto.cliente_nombre} {proyecto.cliente_apellido}</h4>
											</span>
											<span className="estadoProyecto">
												<p>{proyecto.proyecto_estado}</p>
											</span>
											<span className="estadoProyecto">
												<p>{proyecto.porcentaje_avance}%</p>
												<h4><progress value={proyecto.porcentaje_avance} max={100} /></h4>
											</span>
										</div>
										<div className="iconsControl">
											<TbTrash />
											<BsViewList />
											<BsEye onClick={() => handleEyeClick(proyecto.proyecto_id)} style={{ cursor: 'pointer' }} />
											<button onClick={() => handleViewProyecto(proyecto.proyecto_id)}>
												Proyecto
											</button>
										</div>
									</div>
								) : (
									<div className="cardContent">
										<h4>{proyecto.nombre_proyecto}</h4>
										<p>Estado: {proyecto.proyecto_estado}</p>
										<p>Cliente: {proyecto.cliente_nombre} {proyecto.cliente_apellido}</p>
										<p>{proyecto.proyecto_estado}</p>
										<button onClick={() => handleViewProyecto(proyecto.proyecto_id)}>
											Proyecto
										</button>
									</div>
								)}
								{expandedProyecto === proyecto.proyecto_id && (
									<div className="proyecto-details-expanded">
										<p>Información adicional del proyecto</p>
										<p>Fecha de inicio: {new Date(proyecto.fecha_inicio).toLocaleString()}</p>
										<p>Descripción: {proyecto.descripcion || 'N/A'}</p>
									</div>
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default ProyectoControlLists;