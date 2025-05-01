import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { webSocketService } from '../services/websocket';
import { useStore } from 'react-redux';
import { RootState } from '../../app/store';

export const useWebSocket = () => {
	const store = useStore();
	const token = useSelector((state: RootState) => state.auth.user?.token);

	useEffect(() => {
		if (token) {
			webSocketService.initialize(store, token);
		}

		return () => {
			webSocketService.disconnect();
		};
	}, [token, store]);
};