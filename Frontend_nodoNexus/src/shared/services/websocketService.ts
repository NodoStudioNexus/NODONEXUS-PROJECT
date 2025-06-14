import { AppDispatch } from "../../app/store";
import { fetchProfile } from "../../features/auth/infraestructure/redux/authSlice";

interface Subscription {
	topic: string;
	callback: (data: any) => void;
}

class WebSocketService {
	private socket: WebSocket | null = null;
	private connected = false;
	private storeDispatch: AppDispatch | null = null;
	private pendingSubscriptions: Subscription[] = [];
	private token: string | null = null;
	private reconnectTimeout: any = null;

	initialize(storeDispatch: AppDispatch, token: string | null, onConnect?: () => void) {
		if (!token) {
			console.error("No se proporcionó un token");
			return;
		}

		this.token = token;
		this.storeDispatch = storeDispatch;

		const url = `${import.meta.env.VITE_WS_URL || "ws://localhost:9091"}/ws`;
		this.socket = new WebSocket(url);

		this.socket.onopen = () => {
			this.connected = true;
			console.log("WebSocket conectado");


			// Reenvía las suscripciones pendientes
			this.pendingSubscriptions.forEach(({ topic }) => {
				this.sendSubscribe(topic);
				console.log("Suscripción reenviada:", topic);
			});

			this.pendingSubscriptions = [];

			// Suscripción fija a profile_updated
			this.sendSubscribe("/topic/profile_updated");

			if (onConnect) onConnect();
		};

		this.socket.onmessage = (event) => {
			try {
				const message = JSON.parse(event.data);

				if (message.topic === "/topic/profile_updated") {
					const email = message.payload;
					console.log("Recibido profile_updated para:", email);
					this.storeDispatch?.(fetchProfile(email));
				} else {
					// Buscar y ejecutar la callback correspondiente
					this.pendingSubscriptions.forEach(({ topic, callback }) => {
						if (message.topic === topic) {
							callback(message.payload);
						}
					});
				}
			} catch (error) {
				console.error("Error procesando mensaje:", event.data, error);
			}
		};

		this.socket.onerror = (error) => {
			console.error("Error en WebSocket:", error);
		};

		this.socket.onclose = () => {
			console.warn("WebSocket desconectado, intentando reconectar...");
			this.connected = false;

			if (this.reconnectTimeout) clearTimeout(this.reconnectTimeout);
			this.reconnectTimeout = setTimeout(() => {
				this.initialize(this.storeDispatch!, this.token, onConnect);
			}, 5000);
		};
	}

	private sendSubscribe(topic: string) {
		if (this.connected && this.socket && this.socket.readyState === WebSocket.OPEN) {
			this.socket.send(JSON.stringify({ type: "SUBSCRIBE", topic }));
		}
	}

	subscribe(topic: string, callback: (data: any) => void) {
		if (this.connected && this.socket?.readyState === WebSocket.OPEN) {
			this.sendSubscribe(topic);
			this.pendingSubscriptions.push({ topic, callback }); // Para mantener el manejador
		} else {
			console.warn("WebSocket no conectado aún. Guardando suscripción a:", topic);
			this.pendingSubscriptions.push({ topic, callback });
		}
	}

	disconnect() {
		if (this.socket?.readyState === WebSocket.OPEN) {
			this.socket.close();
			this.connected = false;
			console.log("WebSocket desconectado manualmente");
		} else {
			console.log("WebSocket no estaba abierto");
		}
	}

	isConnected() {
		return this.connected;
	}
}

export const webSocketService = new WebSocketService();
