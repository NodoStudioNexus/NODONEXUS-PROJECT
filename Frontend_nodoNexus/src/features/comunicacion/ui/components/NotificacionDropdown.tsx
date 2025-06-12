import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../app/store';
import { markAsRead } from '../../infraestructure/redux/notificacionSlice';
import { markNotificacionAsRead } from '../../infraestructure/api/notificacionApi';
import './notificacionDropdown.scss';

const NotificacionDropdown = ({ onViewAll, onClose }: { onViewAll: () => void; onClose: () => void }) => {
	const notifications = useSelector((state: RootState) => state.notificacion.notifications);
	const token = useSelector((state: RootState) => state.auth.user?.token);
	const dispatch = useDispatch();

	const displayedNotifications = notifications
		.filter(n => !n.leido)
		.concat(notifications.filter(n => n.leido))
		.slice(0, 5);

	const handleNotificationClick = (id: number) => {
		const notification = notifications.find(n => n.id === id);
		if (notification && !notification.leido && token) {
			dispatch(markAsRead(id));
			markNotificacionAsRead(id, { auth: { user: { token } } } as RootState).catch((error) => {
				console.error("Error al marcar notificación como leída:", error);
			});
		}
	};

	const handleViewAll = () => {
		onViewAll();
		onClose();
	};

	return (
		<div className="notificacion-dropdown">
			<h3>Notificaciones</h3>
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
							{notif.mensaje} - {new Date(notif.creadoEn).toLocaleString()}
							{notif.enlace && <a href={notif.enlace}> Ver más</a>}
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