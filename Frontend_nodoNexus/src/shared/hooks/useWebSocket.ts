import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useStore } from 'react-redux';
import { RootState } from '../../app/store';
import { webSocketService } from '../services/websocketService';
import { addNotification } from '../../features/comunicacion/infraestructure/redux/notificacionSlice';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
	id: string;
	sub: string;
}

export const useWebSocket = () => {
	const store = useStore();
	const dispatch = store.dispatch;
	const token = useSelector((state: RootState) => state.auth.user?.token);

	useEffect(() => {
		if (token && !webSocketService.isConnected()) {
			try {
				const decodedToken: DecodedToken = jwtDecode(token);
				const userId = decodedToken.id;
				console.log("WebSocket: Suscribiendo al userId:", userId); // Log para depuración

				webSocketService.initialize(dispatch, token, () => {
					if (userId) {
						webSocketService.subscribe(`/topic/notifications/${userId}`, (notification) => {
							console.log("Notificación recibida vía WebSocket:", notification);
							dispatch(addNotification(notification));
						});
					}
				});
			} catch (error) {
				console.error("Error al decodificar el token:", error);
			}
		}

		return () => {
			webSocketService.disconnect();
		};
	}, [token, dispatch]);
};