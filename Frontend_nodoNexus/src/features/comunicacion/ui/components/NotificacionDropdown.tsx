import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../app/store';
import { markAsRead } from '../../infraestructure/redux/notificacionSlice';
import { markNotificacionAsUnread } from '../../infraestructure/api/notificacionApi';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import './notificacionDropdown.scss';

const NotificacionDropdown = ({ onViewAll, onClose }: { onViewAll: () => void; onClose: () => void }) => {
	const [expandedId, setExpandedId] = useState<number | null>(null);
	const notifications = useSelector((state: RootState) => state.notificacion.notifications);
	const token = useSelector((state: RootState) => state.auth.user?.token);
	const dispatch = useDispatch();

	const unreadCount = notifications.filter(n => !n.leido).length;

	const displayedNotifications = notifications
		.filter(n => !n.leido)
		.concat(notifications.filter(n => n.leido))
		.slice(0, 5);

	const handleNotificationClick = (id: number) => {
		const notification = notifications.find(n => n.id === id);
		if (notification && !notification.leido && token) {
			dispatch(markAsRead(id));
			if (token) {
				markNotificacionAsUnread(id, { auth: { user: { token } } } as RootState)
					.catch((error) => {
						console.error("Error al marcar como no leída:", error);
						setError("No se pudo marcar la notificación como no leída.");
					});
			}
		}

		// Toggle expand/collapse
		setExpandedId(expandedId === id ? null : id);
	};

	const handleExpandClick = (e: React.MouseEvent, id: number) => {
		e.stopPropagation(); // Prevenir que se propague el click al li
		setExpandedId(expandedId === id ? null : id);
	};

	const handleViewAll = () => {
		onViewAll();
		onClose();
	};

	return (
		<div className="notificacion-dropdown">
			<h3>Notificaciones ({unreadCount})</h3>
			<ul>
				{displayedNotifications.length === 0 ? (
					<li>No hay notificaciones</li>
				) : (
					displayedNotifications.map((notif) => (
						<li
							key={notif.id}
							className={notif.leido ? 'read' : 'unread'}
							onClick={() => handleNotificationClick(notif.id)}
						>
							<div className="notification-content">
								<div className="notification-message">
									{notif.mensaje} - {new Date(notif.creadoEn).toLocaleString()}
								</div>
								<div className="notification-actions">
									{notif.enlace && (
										<span
											className="expand-icon"
											onClick={(e) => handleExpandClick(e, notif.id)}
										>
											{expandedId === notif.id ? <FaAngleUp /> : <FaAngleDown />}
										</span>
									)}
								</div>
							</div>

							{expandedId === notif.id && (
								<div className="notification-details">
									<p>Detalles adicionales de la notificación...</p>
									{notif.enlace && <a href={notif.enlace}>Ver más</a>}
								</div>
							)}
						</li>
					))
				)}
			</ul>
			<div className="container-buttonNotificaciones">
				<button className="button-notificaciones" onClick={handleViewAll}>
					Ver todas
				</button>
			</div>
		</div>
	);
};

export default NotificacionDropdown;

function setError(arg0: string) {
	throw new Error('Function not implemented.');
}
