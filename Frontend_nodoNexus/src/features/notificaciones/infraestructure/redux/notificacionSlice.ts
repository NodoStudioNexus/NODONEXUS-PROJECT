// features/notifications/infrastructure/redux/notificationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
	id: number;
	mensaje: string;
	enlace?: string;
	creadoEn: string;
	leido: boolean;
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
			state.notifications.push({ ...action.payload, leido: false });
		},
		markAsRead: (state, action: PayloadAction<number>) => {
			const notification = state.notifications.find(n => n.id === action.payload);
			if (notification) notification.leido = true;
		},
	},
});

export const { addNotification, markAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;