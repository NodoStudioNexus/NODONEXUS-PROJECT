import { useState } from 'react';
import { FaLightbulb, FaUsers, FaListAlt, FaSitemap, FaFileAlt, FaGavel, FaCheckCircle } from 'react-icons/fa';
import './gestionFaseAnalisis.scss';

// Datos simulados (mock)
const mockData = {
	proyectos: [
		{
			id: 1,
			nombre: "Proyecto Alpha",
			esNuevo: true,
			encargados: [
				{ id: 1, nombre: "Ana López", imagen: "https://images.unsplash.com/photo-1614204424926-196a80bf0be8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
				{ id: 2, nombre: "Carlos Pérez", imagen: "https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=723&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
			],
			cliente: "Cliente XYZ",
			pasos: [
				{ id: 1, nombre: "Análisis de la Propuesta de Valor", completado: false, icon: <FaLightbulb /> },
				{ id: 2, nombre: "Segmentación de Usuarios", completado: false, icon: <FaUsers /> },
				{ id: 3, nombre: "Casos de Uso", completado: false, icon: <FaListAlt /> },
				{ id: 4, nombre: "Mapas de Procesos", completado: false, icon: <FaSitemap /> },
			],
			requisitos: [],
		},
		{
			id: 2,
			nombre: "Proyecto Beta",
			esNuevo: false,
			encargados: [
				{ id: 3, nombre: "María Gómez", imagen: "https://images.unsplash.com/photo-1514626585111-9aa86183ac98?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
			],
			cliente: "Cliente ABC",
			pasos: [
				{ id: 5, nombre: "Análisis de la Propuesta de Valor", completado: true, icon: <FaLightbulb /> },
				{ id: 6, nombre: "Segmentación de Usuarios", completado: true, icon: <FaUsers /> },
				{ id: 7, nombre: "Casos de Uso", completado: true, icon: <FaListAlt /> },
				{ id: 8, nombre: "Mapas de Procesos", completado: false, icon: <FaSitemap /> },
			],
			requisitos: [],
		},
	],
	requisitosIndependientes: [
		{
			id: 101,
			nombre: "Guardar Datos del Cliente",
			descripcion: "Permitir al usuario guardar información del cliente en la base de datos.",
			proyectoId: 1,
			documentos: [
				{ id: 1001, nombre: "Casos de Uso Específicos", completado: false, icon: <FaFileAlt /> },
				{ id: 1002, nombre: "Reglas de Negocio", completado: false, icon: <FaGavel /> },
				{ id: 1003, nombre: "Criterios de Aceptación", completado: false, icon: <FaCheckCircle /> },
			],
		},
		{
			id: 102,
			nombre: "Actualizar Datos del Cliente",
			descripcion: "Permitir al usuario actualizar la información del cliente en la base de datos.",
			proyectoId: 1,
			documentos: [
				{ id: 1004, nombre: "Casos de Uso Específicos", completado: true, icon: <FaFileAlt /> },
				{ id: 1005, nombre: "Reglas de Negocio", completado: false, icon: <FaGavel /> },
				{ id: 1006, nombre: "Criterios de Aceptación", completado: false, icon: <FaCheckCircle /> },
			],
		},
		{
			id: 103,
			nombre: "Eliminar Datos del Cliente",
			descripcion: "Permitir al usuario eliminar la información del cliente de la base de datos.",
			proyectoId: 1,
			documentos: [
				{ id: 1007, nombre: "Casos de Uso Específicos", completado: true, icon: <FaFileAlt /> },
				{ id: 1008, nombre: "Reglas de Negocio", completado: true, icon: <FaGavel /> },
				{ id: 1009, nombre: "Criterios de Aceptación", completado: true, icon: <FaCheckCircle /> },
			],
		},
		{
			id: 104,
			nombre: "Visualizar Datos del Cliente",
			descripcion: "Permitir al usuario visualizar la información del cliente almacenada.",
			proyectoId: 2,
			documentos: [
				{ id: 1010, nombre: "Casos de Uso Específicos", completado: false, icon: <FaFileAlt /> },
				{ id: 1011, nombre: "Reglas de Negocio", completado: false, icon: <FaGavel /> },
				{ id: 1012, nombre: "Criterios de Aceptación", completado: false, icon: <FaCheckCircle /> },
			],
		},
	],
};

const GestionFaseAnalisis = () => {
	const [expandedProject, setExpandedProject] = useState<number | null>(null);
	const [expandedRequisito, setExpandedRequisito] = useState<number | null>(null);

	const handleToggleProject = (id: number) => {
		setExpandedProject(expandedProject === id ? null : id);
	};

	const handleToggleRequisito = (id: number) => {
		setExpandedRequisito(expandedRequisito === id ? null : id);
	};

	const getProjectStatus = (pasos: { completado: boolean }[]) => {
		const completedSteps = pasos.filter(paso => paso.completado).length;
		if (completedSteps === 0) return "Sin Pasos Completados";
		if (completedSteps < pasos.length) return "En Progreso";
		return "Completado";
	};

	const getRequisitoStatus = (documentos: { completado: boolean }[]) => {
		const completedDocs = documentos.filter(doc => doc.completado).length;
		if (completedDocs === 0) return "Pendiente";
		if (completedDocs < documentos.length) return "En Progreso";
		return "Completado";
	};

	return (
		<div className="gestion-fase-analisis">
			<h1 className="gestion-title">Gestión Fase Análisis</h1>
			<div className="gestion-sections">
				{mockData.proyectos.map((proyecto) => (
					<div key={proyecto.id} className="proyecto-item">
						<div className="proyecto-item-header">
							<div className="proyecto-info-header">
								<p><span>Proyecto</span>{proyecto.nombre}</p>
								<p><span>Cliente</span>{proyecto.cliente}</p>
							</div>
							<div className="proyecto-button-header">
								<div className="proyecto-figure-header">
									{proyecto.encargados.map((encargado) => (
										<img key={encargado.id} src={encargado.imagen} alt={encargado.nombre} />
									))}
								</div>
								<span className={`status ${getProjectStatus(proyecto.pasos).replace(' ', '-').toLowerCase()}`}>
									{getProjectStatus(proyecto.pasos)}
								</span>
								<button onClick={() => handleToggleProject(proyecto.id)}>
									{expandedProject === proyecto.id ? 'Ocultar Detalles' : 'Ver Detalles'}
								</button>
							</div>
						</div>
						{expandedProject === proyecto.id && (
							<div className="detalles">
								<h3>Documentación Inicial</h3>
								<div className="pasos-horizontal">
									{proyecto.pasos.map((paso, index) => (
										<div
											key={paso.id}
											className={`paso ${paso.completado ? 'completado' : ''} ${index < proyecto.pasos.length - 1 && proyecto.pasos[index + 1].completado ? 'next-completado' : ''
												}`}
										>
											<div className="paso-circle">
												<div className="paso-icon">{paso.icon}</div>
											</div>
											<p>{paso.nombre}</p>
											<div className="paso-check">
												{paso.completado ? (
													<FaCheckCircle className="check-icon" />
												) : (
													<input type="checkbox" checked={false} readOnly />
												)}
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				))}
				<div className="requisitos-container">
					<h2>Requisitos Independientes</h2>
					{mockData.requisitosIndependientes.map((requisito) => (
						<div key={requisito.id} className="requisito-item">
							<div className="proyecto-item-header">
								<div className="proyecto-info-header">
									<p><span>ID</span>RF {requisito.id} </p>
									<p><span>Requisito</span>{requisito.nombre}</p>
									<p><span>Proyecto</span>{mockData.proyectos.find(p => p.id === requisito.proyectoId)?.nombre || "Sin Proyecto"}</p>
								</div>
								<div className="proyecto-button-header">
									<span className={`status ${getRequisitoStatus(requisito.documentos).replace(' ', '-').toLowerCase()}`}>
										{getRequisitoStatus(requisito.documentos)}
									</span>
									<button onClick={() => handleToggleRequisito(requisito.id)}>
										{expandedRequisito === requisito.id ? 'Ocultar Detalles' : 'Ver Detalles'}
									</button>
								</div>
							</div>
							{expandedRequisito === requisito.id && (
								<div className="detalles-requisito">
									<h4>Descripción: {requisito.descripcion}</h4>
									<h5>Documentos:</h5>
									<div className="pasos-horizontal">
										{requisito.documentos.map((doc, index) => (
											<div
												key={doc.id}
												className={`paso ${doc.completado ? 'completado' : ''} ${index < requisito.documentos.length - 1 && requisito.documentos[index + 1].completado ? 'next-completado' : ''
													}`}
											>
												<div className="paso-circle">
													<div className="paso-icon">{doc.icon}</div>
												</div>
												<p>{doc.nombre}</p>
												<div className="paso-check">
													{doc.completado ? (
														<FaCheckCircle className="check-icon" />
													) : (
														<input type="checkbox" checked={false} readOnly />
													)}
												</div>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default GestionFaseAnalisis;