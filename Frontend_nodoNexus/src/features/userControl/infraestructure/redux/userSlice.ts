import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CreateUsersRequest, UserResponse } from '../../domain/entities/UserControl';
import { RootState } from '../../../../app/store';
import { createUser, getUsers } from '../api/UserControlApi';


interface UserState {
	users: UserResponse[];
	loading: boolean;
	error: string | null;
}

const initialState: UserState = {
	users: [],
	loading: false,
	error: null,
};

export const fetchUsers = createAsyncThunk(
	'users/fetchUsers',
	async (_, { getState }) => {
		const state = getState() as RootState;
		return await getUsers(state);
	}
);

export const addUser = createAsyncThunk(
	'users/addUser',
	async (userData: CreateUsersRequest, { getState }) => {
		const state = getState() as RootState;
		return await createUser(userData, state);
	}
);

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		// Nueva acción síncrona para agregar un usuario recibido del WebSocket
		addUserSync: (state, action: PayloadAction<UserResponse>) => {
			state.users.push(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.loading = false;
				state.users = action.payload;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Error al cargar usuarios';
			})
			.addCase(addUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addUser.fulfilled, (state, action) => {
				state.loading = false;
				state.users.push(action.payload);
			})
			.addCase(addUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Error al crear usuario';
			});
	},
});

export const { addUserSync } = userSlice.actions;
export default userSlice.reducer;