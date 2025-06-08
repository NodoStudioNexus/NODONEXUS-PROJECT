import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../app/store';
import { markAsRead } from '../../../../features/notificaciones/infraestructure/redux/notificacionSlice';

import './notificacionDropdown.scss'

const NotificacionDropdown = () => {
	const notifications = useSelector((state: RootState) => state.notificacion.notifications);
	const dispatch = useDispatch();

	const handleNotificationClick = (id: number) => {
		const notification = notifications.find(n => n.id === id);
		if (notification && !notification.leido) {
			dispatch(markAsRead(id));
		}
	};

	return (
		<div className="notificacion-dropdown">
			<h3>Notificaciones</h3>
			<ul>
				{notifications.length === 0 ? (
					<li>No hay notificaciones</li>
				) : (
					notifications.map((notif) => (
						<li
							key={notif.id}
							className={notif.leido ? 'read' : 'unread'}
							onClick={() => handleNotificationClick(notif.id)}
						>
							{notif.mensaje} - {notif.creadoEn}
							{notif.enlace && <a href={notif.enlace}> Ver más</a>}
						</li>
					))
				)}
			</ul>
		</div>
	);
};

export default NotificacionDropdown;