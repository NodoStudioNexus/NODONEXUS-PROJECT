import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../app/store';
import { markAsRead, deleteNotification, setNotifications } from '../../infraestructure/redux/notificacionSlice';
import { getNotificaciones, markNotificacionAsRead, deleteNotificacion } from '../../infraestructure/api/notificacionApi';
import './notificacionPanel.scss';

const NotificacionPanel = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
	const [activeTab, setActiveTab] = useState('notifications');
	const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all');
	const notifications = useSelector((state: RootState) => state.notificacion.notifications);
	const token = useSelector((state: RootState) => state.auth.user?.token);
	const dispatch = useDispatch();
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (isOpen && token) {
			setError(null);
			let leido: boolean | undefined;
			if (filter === 'read') leido = true;
			if (filter === 'unread') leido = false;

			getNotificaciones({ auth: { user: { token } } } as RootState, leido)
				.then((data) => dispatch(setNotifications(data)))
				.catch((error) => {
					console.error("Error al cargar notificaciones:", error);
					setError(
						error.response?.status === 401
							? "Sesión expirada. Por favor, inicia sesión nuevamente."
							: "No se pudieron cargar las notificaciones. Inténtalo de nuevo."
					);
				});
		}
	}, [isOpen, filter, token, dispatch]);

	const handleMarkAsRead = (id: number) => {
		dispatch(markAsRead(id));
		if (token) {
			markNotificacionAsRead(id, { auth: { user: { token } } } as RootState)
				.catch((error) => {
					console.error("Error al marcar como leída:", error);
					setError("No se pudo marcar la notificación como leída.");
				});
		}
	};

	const handleDelete = (id: number) => {
		dispatch(deleteNotification(id));
		if (token) {
			deleteNotificacion(id, { auth: { user: { token } } } as RootState)
				.catch((error) => {
					console.error("Error al eliminar notificación:", error);
					setError("No se pudo eliminar la notificación.");
				});
		}
	};

	return (
		<div className={`notification-panel ${isOpen ? 'open' : ''}`}>
			<button className="close-btn" onClick={onClose}>X</button>
			<div className="menu">
				<button onClick={() => setActiveTab('notifications')} className={activeTab === 'notifications' ? 'active' : ''}>
					Notificaciones
				</button>
				<button onClick={() => setActiveTab('mensajes')} className={activeTab === 'mensajes' ? 'active' : ''}>
					Mensajes
				</button>
				<button onClick={() => setActiveTab('chats')} className={activeTab === 'chats' ? 'active' : ''}>
					Chats
				</button>
			</div>
			<div className="content">
				{activeTab === 'notifications' && (
					<div>
						<h3>Todas las Notificaciones</h3>
						{error && <p className="error">{error}</p>}
						<div className="filter">
							<label htmlFor="notification-filter">Filtrar: </label>
							<select
								id="notification-filter"
								value={filter}
								onChange={(e) => setFilter(e.target.value as 'all' | 'read' | 'unread')}
							>
								<option value="all">Todas</option>
								<option value="read">Leídas</option>
								<option value="unread">No Leídas</option>
							</select>
						</div>
						<ul>
							{notifications.length === 0 ? (
								<li>No hay notificaciones</li>
							) : (
								notifications.map((notif) => (
									<li key={notif.id} className={notif.leido ? 'read' : 'unread'}>
										{notif.mensaje} - {new Date(notif.creadoEn).toLocaleString()}
										{notif.enlace && <a href={notif.enlace}> Ver más</a>}
										{!notif.leido && <button onClick={() => handleMarkAsRead(notif.id)}>Marcar como leída</button>}
										<button onClick={() => handleDelete(notif.id)}>Eliminar</button>
									</li>
								))
							)}
						</ul>
					</div>
				)}
				{activeTab === 'mensajes' && <div>Lista de mensajes aquí</div>}
				{activeTab === 'chats' && <div>Lista de chats aquí</div>}
			</div>
		</div>
	);
};

export default NotificacionPanel;