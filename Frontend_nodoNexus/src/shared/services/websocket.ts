import { Store } from "@reduxjs/toolkit";
import SockJS from "sockjs-client";
import Stomp, { Client } from "webstomp-client";
import { fetchProfile } from "../../features/auth/infraestructure/redux/authSlice";
import { AnyAction } from 'redux';

class WebSocketService {
	private client: Client | null = null;
	private store: Store | null = null;
	private connected: boolean = false;

	initialize(store: Store, token: string | null) {
		if (!token) return;

		this.store = store;
		const url = `${import.meta.env.VITE_WS_URL || 'http://localhost:9091'}/ws`;
		const socket = new SockJS(url);
		this.client = Stomp.over(socket);

		this.client.connect(
			{ Authorization: `Bearer ${token}` },
			() => {
				this.connected = true;
				console.log('WebSocket connected');

				this.client?.subscribe('/topic/profile_updated', (message) => {
					const email = message.body;
					console.log('Received profile_updated for email:', email);
					// Despachar la acción asíncrona con ajuste de tipo
					store.dispatch(fetchProfile(email) as unknown as AnyAction);
				});
			},
			(error) => {
				console.error('WebSocket error:', error);
				this.connected = false;
			}
		);
	}

	disconnect() {
		if (this.client && this.connected) {
			this.client.disconnect();
			this.connected = false;
			console.log('WebSocket disconnected');
		}
	}

	isConnected() {
		return this.connected;
	}
}

export const webSocketService = new WebSocketService();