
import api from '../../../../app/api/axiosConfig';
import { RootState } from '../../../../app/store';
import { CreateUsersRequest, UserResponse } from '../../domain/entities/UserControl';


export const getUsers = async (state: RootState): Promise<UserResponse[]> => {
	try {
		const response = await api.get('/users/management', {
			headers: { Authorization: `Bearer ${state.auth.user?.token}` },
		});
		return response.data;
	} catch (error) {
		console.error('Error al obtener usuarios', error);
		throw new Error('Error al obtener usuarios');
	}
};

export const createUser = async (userData: CreateUsersRequest, state: RootState): Promise<UserResponse> => {
	try {
		const response = await api.post('/users/management/create', userData, {
			headers: { Authorization: `Bearer ${state.auth.user?.token}` },
		});
		console.log('Respuesta del servidor al crear usuario:', response.data);
		return response.data;
	} catch (error: any) {
		console.error('Error al crear usuario:', error.response?.data || error.message);
		throw new Error(error.response?.data?.message || 'Error al crear usuario');
	}
};