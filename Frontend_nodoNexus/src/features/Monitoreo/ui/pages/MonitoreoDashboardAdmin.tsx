import { FaUser } from 'react-icons/fa';
import './MonitoreoDashboardAdmin.scss';

const mockData = {
	usuariosConectados: [
		{ id: 1, nombre: 'Admin', rol: 'ADMIN', ip: '192.168.1.1' },
		{ id: 2, nombre: 'User1', rol: 'USER', ip: '192.168.1.2' },
		{ id: 3, nombre: 'User2', rol: 'USER', ip: '192.168.1.3' },
	],
	solicitudesEnCurso: [
		{ id: 101, tipo: 'CREAR_PROYECTO', estado: 'PENDIENTE', usuario: 'User1' },
		{ id: 102, tipo: 'ACTUALIZAR_USUARIO', estado: 'EN_PROCESO', usuario: 'Admin' },
		{ id: 103, tipo: 'ELIMINAR_RECURSO', estado: 'PENDIENTE', usuario: 'User2' },
	],
	estadoServidor: {
		cpu: '25%',
		memoria: '50%',
		disco: '30%',
		tiempoActivo: '2d 3h 45m',
	},
	alertasSeguridad: [
		{ id: 1, mensaje: 'Intento de acceso no autorizado desde IP 192.168.1.3', timestamp: '2023-10-01T10:00:00Z' },
		{ id: 2, mensaje: 'Fallo en la autenticación para usuario "User2"', timestamp: '2023-10-01T10:05:00Z' },
		{ id: 3, mensaje: 'Actividad sospechosa detectada en el sistema', timestamp: '2023-10-01T10:10:00Z' },
		{ id: 4, mensaje: 'Intento de acceso a recurso restringido', timestamp: '2023-10-01T10:15:00Z' },
	],
};

const MonitoreoDashboardAdmin = () => {
	return (
		<div className="monitoreo-dashboard">
			<div className="monitoreo-sections">
				{/* Usuarios Conectados */}
				<div className="section usuarios-conectados">
					<h2 className="section-title">Usuarios Conectados</h2>
					<ul className="usuarios-list">
						{mockData.usuariosConectados.map((usuario) => (
							<li key={usuario.id} className="usuario-item">
								<span>
									<FaUser />
									{usuario.nombre}
								</span>
								{usuario.rol} ({usuario.ip})
							</li>
						))}
					</ul>
				</div>

				{/* Contenedor para Estado del Servidor y Solicitudes en Curso */}
				<div className="monitoreo-servidor-solicitudes">
					{/* Estado del Servidor */}
					<div className="section estado-servidor">
						<h2 className="section-title">Estado del Servidor</h2>
						<div className="estado-grid">
							<div className="estado-item">
								<p className="estado-label">CPU: {mockData.estadoServidor.cpu}</p>
								<div className="progress-bar">
									<div className="progress" style={{ width: mockData.estadoServidor.cpu }}></div>
								</div>
							</div>
							<div className="estado-item">
								<p className="estado-label">Memoria: {mockData.estadoServidor.memoria}</p>
								<div className="progress-bar">
									<div className="progress" style={{ width: mockData.estadoServidor.memoria }}></div>
								</div>
							</div>
							<div className="estado-item">
								<p className="estado-label">Disco: {mockData.estadoServidor.disco}</p>
								<div className="progress-bar">
									<div className="progress" style={{ width: mockData.estadoServidor.disco }}></div>
								</div>
							</div>
							<div className="estado-item">
								<p className="estado-label">Tiempo Activo:</p>
								<p className="estado-value">{mockData.estadoServidor.tiempoActivo}</p>
							</div>
						</div>
					</div>

					{/* Solicitudes en Curso */}
					<div className="section solicitudes-en-curso">
						<h2 className="section-title">Solicitudes en Curso</h2>
						<ul className="solicitudes-list">
							{mockData.solicitudesEnCurso.map((solicitud) => (
								<li key={solicitud.id} className="solicitud-item">
									<span>{solicitud.tipo}</span>
									{solicitud.estado} (Usuario: {solicitud.usuario})
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Alertas de Seguridad */}
				<div className="section alertas-seguridad">
					<h2 className="section-title">Alertas de Seguridad</h2>
					<ul className="alertas-list">
						{mockData.alertasSeguridad.map((alerta) => (
							<li key={alerta.id} className="alerta-item">
								{alerta.mensaje} - {new Date(alerta.timestamp).toLocaleString()}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default MonitoreoDashboardAdmin;