// shared/hooks/useWebSocket.ts
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useStore } from "react-redux";
import { RootState } from "../../app/store";

import { addNotification } from "../../features/comunicacion/infraestructure/redux/notificacionSlice";

import { jwtDecode } from "jwt-decode";
import { webSocketService } from "../services/websocketService";
import { addMessage, setConnectedUsers } from "../../features/comunicacion/infraestructure/redux/chatSlice";

interface DecodedToken {
	id: string;
	sub: string;
}

export const useWebSocket = (chatId?: string) => {
	const store = useStore();
	const dispatch = store.dispatch;
	const token = useSelector((state: RootState) => state.auth.user?.token);

	useEffect(() => {
		if (token && !webSocketService.isConnected()) {
			try {
				const decodedToken: DecodedToken = jwtDecode(token);
				const userId = decodedToken.id;

				webSocketService.initialize(dispatch, token, () => {
					// Suscripción a notificaciones
					if (userId) {
						webSocketService.subscribe(`/topic/notifications/${userId}`, (notification) => {
							console.log("Notificación recibida vía WebSocket:", notification);
							dispatch(addNotification(notification));
						});
					}

					// Suscripción al chat grupal
					if (chatId) {
						webSocketService.subscribe(`/topic/chat/${chatId}`, (message) => {
							dispatch(addMessage(message));
						});
					}

					// Suscripción a usuarios conectados
					webSocketService.subscribe("/topic/users/connected", (users) => {
						console.log("Usuarios conectados reibidos en el hook... ", users);
						dispatch(setConnectedUsers(users));
					});
				});
			} catch (error) {
				console.error("Error al decodificar el token:", error);
			}
		}

		return () => {
			webSocketService.disconnect();
		};
	}, [token, dispatch, chatId]);
};