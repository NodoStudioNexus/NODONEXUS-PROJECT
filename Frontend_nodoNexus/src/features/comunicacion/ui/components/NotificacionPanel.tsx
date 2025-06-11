import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../app/store';
import { markAsRead, markAsUnread, deleteNotification, setNotifications } from '../../infraestructure/redux/notificacionSlice';
import { getNotificaciones, markNotificacionAsRead, markNotificacionAsUnread, deleteNotificacion } from '../../infraestructure/api/notificacionApi';
import { FaFilter, FaTrashAlt, FaAngleUp, FaAngleDown, FaEnvelopeOpen, FaEnvelope } from "react-icons/fa";
import './notificacionPanel.scss';

const NotificacionPanel = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
	const [activeTab, setActiveTab] = useState('notifications');
	const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all');
	const [expandedNotificationId, setExpandedNotificationId] = useState<number | null>(null);
	const [notificationsPerPage, setNotificationsPerPage] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
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

	const handleToggleRead = (id: number, leido: boolean) => {
		if (leido) {
			dispatch(markAsUnread(id));
			if (token) {
				markNotificacionAsUnread(id, { auth: { user: { token } } } as RootState)
					.catch((error) => {
						console.error("Error al marcar como no leída:", error);
						setError("No se pudo marcar la notificación como no leída.");
					});
			}
		} else {
			dispatch(markAsRead(id));
			if (token) {
				markNotificacionAsRead(id, { auth: { user: { token } } } as RootState)
					.catch((error) => {
						console.error("Error al marcar como leída:", error);
						setError("No se pudo marcar la notificación como leída.");
					});
			}
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

	const indexOfLastNotification = currentPage * notificationsPerPage;
	const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
	const currentNotifications = notifications.slice(indexOfFirstNotification, indexOfLastNotification);

	return (
		<div className={`notification-panel ${isOpen ? 'open' : ''}`}>
			<button className="close-btn" onClick={onClose}>X</button>
			<div className="menu">
				<button onClick={() => setActiveTab('notifications')} className={activeTab === 'notifications' ? 'active' : ''}>
					Notificaciones
				</button>
				{/*<button onClick={() => setActiveTab('mensajes')} className={activeTab === 'mensajes' ? 'active' : ''}>
					Mensajes
				</button>*/}
				<button onClick={() => setActiveTab('chats')} className={activeTab === 'chats' ? 'active' : ''}>
					Chats
				</button>
			</div>
			<div className="content">
				{activeTab === 'notifications' && (
					<div className='containerNotificaciones'>
						<div className='containerNotificaciones-header'>
							<h3>Todas las Notificaciones</h3>
							{error && <p className="error">{error}</p>}
							<div className="containerNotificaciones-filter">
								<fieldset>
									<label htmlFor="notification-filter"><FaFilter /></label>
									<select
										id="notification-filter"
										value={filter}
										onChange={(e) => setFilter(e.target.value as 'all' | 'read' | 'unread')}
									>
										<option value="all">Todas</option>
										<option value="read">Leídas</option>
										<option value="unread">No Leídas</option>
									</select>
									<label htmlFor="notifications-per-page">#Notificaciones</label>
									<select
										id="notifications-per-page"
										value={notificationsPerPage}
										onChange={(e) => setNotificationsPerPage(Number(e.target.value))}
									>
										<option value={5}>5</option>
										<option value={10}>10</option>
										<option value={20}>20</option>
										<option value={50}>50</option>
										<option value={notifications.length}>Todas</option>
									</select>
								</fieldset>
							</div>
						</div>
						<ul className='containerNotificaciones-list'>
							{currentNotifications.length === 0 ? (
								<li>No hay notificaciones</li>
							) : (
								currentNotifications.map((notif) => (
									<li
										key={notif.id}
										className={notif.leido ? 'read' : 'unread'}
										onClick={() => setExpandedNotificationId(expandedNotificationId === notif.id ? null : notif.id)}
									>
										{notif.mensaje} - {new Date(notif.creadoEn).toLocaleString()}
										{expandedNotificationId === notif.id && (
											<div className="notification-details">
												<p>Detalles adicionales de la notificación... (Aquí puedes agregar más info)</p>
											</div>
										)}
										<span>
											{notif.enlace && (
												<span
													title="Ver detalles"
													onClick={(e) => {
														e.stopPropagation();
														setExpandedNotificationId(expandedNotificationId === notif.id ? null : notif.id);
													}}
												>
													{expandedNotificationId === notif.id ? <FaAngleDown /> : <FaAngleUp />}
												</span>
											)}
											<a
												onClick={(e) => {
													e.stopPropagation();
													handleToggleRead(notif.id, notif.leido);
												}}
												title={notif.leido ? "Marcar como no leído" : "Marcar como leído"}
											>
												{notif.leido ? <FaEnvelopeOpen /> : <FaEnvelope />}
												{!notif.leido && <span className="unread-indicator"></span>}
											</a>
											<a
												onClick={(e) => {
													e.stopPropagation();
													handleDelete(notif.id);
												}}
												title="Eliminar"
											>
												<FaTrashAlt />
											</a>
										</span>
									</li>
								))
							)}
						</ul>
						<div className="pagination">
							<button
								onClick={() => setCurrentPage(currentPage - 1)}
								disabled={currentPage === 1}
							>
								Anterior
							</button>
							<span>Página {currentPage} de {Math.ceil(notifications.length / notificationsPerPage)}</span>
							<button
								onClick={() => setCurrentPage(currentPage + 1)}
								disabled={indexOfLastNotification >= notifications.length}
							>
								Siguiente
							</button>
						</div>
					</div>
				)}
				{ /*   
{activeTab === 'mensajes' && <div>Lista de mensajes aquí</div>}
				*/}
				{activeTab === 'chats' && <div>Lista de chats aquí</div>}
			</div>
		</div>
	);
};

export default NotificacionPanel;