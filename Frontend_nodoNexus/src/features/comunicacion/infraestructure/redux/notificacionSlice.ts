import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
	id: number;
	mensaje: string;
	enlace?: string;
	creadoEn: string;
	leido: boolean;
	idUsuario: string;
}

interface NotificationState {
	notifications: Notification[];
}

const initialState: NotificationState = {
	notifications: [],
};

const notificationSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {
		addNotification: (state, action: PayloadAction<Notification>) => {
			const exists = state.notifications.some(n => n.id === action.payload.id);
			if (!exists) {
				state.notifications.unshift({ ...action.payload }); // Añade al inicio
			}
		},
		markAsRead: (state, action: PayloadAction<number>) => {
			const notification = state.notifications.find(n => n.id === action.payload);
			if (notification) {
				notification.leido = true;
			}
		},
		markAsUnread: (state, action: PayloadAction<number>) => {
			const notification = state.notifications.find(n => n.id === action.payload);
			if (notification) {
				notification.leido = false;
			}
		},
		deleteNotification: (state, action: PayloadAction<number>) => {
			state.notifications = state.notifications.filter(n => n.id !== action.payload);
		},
		setNotifications: (state, action: PayloadAction<Notification[]>) => {
			state.notifications = action.payload;
		},
	},
});

export const { addNotification, markAsRead, markAsUnread, deleteNotification, setNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;