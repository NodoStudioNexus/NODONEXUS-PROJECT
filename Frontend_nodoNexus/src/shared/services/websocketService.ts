import { AppDispatch } from "../../app/store";
import { fetchProfile } from "../../features/auth/infraestructure/redux/authSlice";
import { Client } from "webstomp-client";
import * as Stomp from "webstomp-client";

class WebSocketService {
	private client: Client | null = null;
	private storeDispatch: AppDispatch | null = null;
	private connected: boolean = false;

	initialize(storeDispatch: AppDispatch, token: string | null, onConnect?: () => void) {
		if (!token) {
			console.error("No se proporcionó un token");
			return;
		}

		console.log("Token enviado al WebSocket:", token);
		this.storeDispatch = storeDispatch;
		const url = `${import.meta.env.VITE_WS_URL || "ws://localhost:9091"}/ws`;
		const socket = new WebSocket(url);
		this.client = Stomp.over(socket);

		const connect = () => {
			this.client?.connect(
				{ Authorization: `Bearer ${token}` },
				() => {
					this.connected = true;
					console.log("WebSocket conectado");

					this.client?.subscribe("/topic/profile_updated", (message) => {
						const email = message.body;
						console.log("Recibido profile_updated para email:", email);
						this.storeDispatch!(fetchProfile(email)); // Usa this.storeDispatch
					});

					if (onConnect) onConnect();
				},
				(error) => {
					console.error("Error en WebSocket:", error);
					this.connected = false;
					setTimeout(connect, 5000);
				}
			);
		};

		connect();
	}

	subscribe(topic: string, callback: (message: any) => void) {
		if (this.connected && this.client) {
			this.client.subscribe(topic, (message) => {
				try {
					const parsedMessage = JSON.parse(message.body);
					callback(parsedMessage);
				} catch (error) {
					console.error("Error al parsear el mensaje:", error, message.body);
					callback(message.body);
				}
			});
		} else {
			console.error("WebSocket no está conectado. No se puede suscribir a", topic);
		}
	}

	disconnect() {
		if (this.client && this.connected) {
			this.client.disconnect();
			this.connected = false;
			console.log("WebSocket desconectado");
		}
	}

	isConnected() {
		return this.connected;
	}
}

export const webSocketService = new WebSocketService();