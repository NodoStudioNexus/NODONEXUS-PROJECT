import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../app/store';
import {
	fetchProyectosVista,
	seleccionarProyecto,
	fetchAvanceProyecto,
	limpiarAvanceProyecto,
} from '../../../infraestructure/redux/proyectoSlice';
import { FaChevronRight, FaCircle, FaFolder } from 'react-icons/fa';

import './proyectoDetalles.scss';

const ProyectoDetalles = () => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate(); // Agrega useNavigate
	const [activate, setActivate] = useState('');
	const { proyectosVista, proyectoSeleccionado, avanceProyecto, loading, error } = useSelector(
		(state: RootState) => state.proyectosList
	);

	const ordenFases = ['analisis', 'planificacion', 'modelado', 'implementacion', 'revision', 'pruebas'];

	const handleBack = () => {
		navigate(-1);
	};

	useEffect(() => {
		// Paso 1: Cargar los proyectos si aún no están cargados
		if (proyectosVista.length === 0) {
			dispatch(fetchProyectosVista());
		}
	}, [dispatch, proyectosVista.length]);

	useEffect(() => {
		// Paso 2: Limpiar el avance anterior cada vez que cambia el ID
		dispatch(limpiarAvanceProyecto());
		setActivate(''); // también resetea la fase activa
	}, [id, dispatch]);

	useEffect(() => {
		// Paso 3: Seleccionar el nuevo proyecto basado en el ID
		if (id && proyectosVista.length > 0) {
			const proyecto = proyectosVista.find((p) => p.proyecto_id === Number(id));
			if (proyecto) {
				dispatch(seleccionarProyecto(proyecto));
			}
		}
	}, [id, proyectosVista, dispatch]);

	useEffect(() => {
		// Paso 4: Cargar el avance del proyecto seleccionado (cuando ya esté seteado)
		if (proyectoSeleccionado) {
			dispatch(fetchAvanceProyecto(proyectoSeleccionado.proyecto_id));
		}
	}, [proyectoSeleccionado, dispatch]);

	useEffect(() => {
		return () => {
			dispatch(limpiarAvanceProyecto());
		};
	}, [dispatch]);

	if (loading) return <div>Cargando...</div>;
	if (error) return <div>Error: {error}</div>;
	if (!proyectoSeleccionado) return <div>No se encontró el proyecto.</div>;

	const fasesOrdenadas = avanceProyecto?.fases
		.slice()
		.sort((a, b) => ordenFases.indexOf(a.nombre) - ordenFases.indexOf(b.nombre));

	return (
		<section className="containerDetalleProyecto">
			<div className="containerDetalleProyecto-left">
				<header className="containerDetalleProyecto-left-header">
					<div className="containerDetalleProyecto-left-header-icon">
						<FaFolder />
					</div>
					<div className="containerDetalleProyecto-header-info">
						<h2>{proyectoSeleccionado.nombre_proyecto}</h2>
						<p>
							Cliente: {proyectoSeleccionado.cliente_nombre}{' '}
							{proyectoSeleccionado.cliente_apellido}
						</p>
						<p>Estado: {proyectoSeleccionado.proyecto_estado}</p>
						<p>Fecha inicio: {new Date(proyectoSeleccionado.fecha_inicio).toLocaleDateString()}</p>
						<progress value={proyectoSeleccionado.porcentaje_avance} max={100}></progress>
					</div>
				</header>
				<section className="containerDetalleProyecto-left-buttons">
					<h3>
						<span>
							<FaFolder />
						</span>
						Proyecto
					</h3>
					<ul>
						{fasesOrdenadas?.map((fase) => (
							<li
								key={fase.id}
								onClick={() => setActivate(fase.nombre)}
								className={activate === fase.nombre ? 'active' : ''}
							>
								<div className="buttonFaseNombre">
									<span>
										<FaCircle />
									</span>
									<p>{fase.nombre}</p>
								</div>
								<div className="buttonFasePorciento">
									<span>{fase.porcentaje.toFixed(2)} %</span>
									<progress value={fase.porcentaje} max={100} />
								</div>
								{activate === fase.nombre && <FaChevronRight className="selection-icon" />}
							</li>
						))}
					</ul>
				</section>
			</div>

			<div className="containerDetalleProyecto-right">
				{activate === 'analisis' && (
					<div>
						<h4>Documentación de Análisis</h4>
						<p>Contenido específico para la fase de análisis...</p>
					</div>
				)}
				{activate === 'planificacion' && (
					<div>
						<h4>Documentación de Planificación</h4>
						<p>Contenido específico para la fase de planificación...</p>
					</div>
				)}
				{activate === 'modelado' && (
					<div>
						<h4>Documentación de Modelado</h4>
						<p>Contenido específico para la fase de modelado...</p>
					</div>
				)}
				{activate === 'implementacion' && (
					<div>
						<h4>Documentación de Implementación</h4>
						<p>Contenido específico para la fase de implementación...</p>
					</div>
				)}
				{activate === 'revision' && (
					<div>
						<h4>Documentación de Revisión</h4>
						<p>Contenido específico para la fase de revisión...</p>
					</div>
				)}
				{activate === 'pruebas' && (
					<div>
						<h4>Documentación de Pruebas</h4>
						<p>Contenido específico para la fase de pruebas...</p>
					</div>
				)}
				{!activate && <p>Selecciona una fase para ver su contenido.</p>}
			</div>
			<button onClick={handleBack} className="btnVolver">
				Volver a la lista
			</button>
		</section>
	);
};

export default ProyectoDetalles;