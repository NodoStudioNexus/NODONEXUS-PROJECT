import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../../../app/store';
import { NuevoProyectoResumida, nuevoProyectoDetallada } from '../../domain/entities/NuevoProyecto';
import { getSolicitudDetalles, getSolicitudesPendientes } from '../api/nuevoProyectoApi';

interface ProyectoState {
	solicitudesPendientes: NuevoProyectoResumida[];
	solicitudSeleccionada: nuevoProyectoDetallada | null;
	loading: boolean;
	error: string | null;
}

const initialState: ProyectoState = {
	solicitudesPendientes: [],
	solicitudSeleccionada: null,
	loading: false,
	error: null,
};

export const fetchSolicitudesPendientes = createAsyncThunk(
	'proyectos/fetchSolicitudesPendientes',
	async (_, { getState }) => {
		const state = getState() as RootState;
		return await getSolicitudesPendientes(state);
	}
);

export const fetchSolicitudDetalles = createAsyncThunk(
	'proyectos/fetchSolicitudDetalles',
	async (id: number, { getState }) => {
		const state = getState() as RootState;
		return await getSolicitudDetalles(id, state);
	}
);

const proyectoSlice = createSlice({
	name: 'proyectos',
	initialState,
	reducers: {
		addSolicitud: (state, action: PayloadAction<NuevoProyectoResumida>) => {
			state.solicitudesPendientes.unshift(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSolicitudesPendientes.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchSolicitudesPendientes.fulfilled, (state, action) => {
				state.loading = false;
				state.solicitudesPendientes = action.payload;
			})
			.addCase(fetchSolicitudesPendientes.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Error al cargar solicitudes';
			})
			.addCase(fetchSolicitudDetalles.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchSolicitudDetalles.fulfilled, (state, action) => {
				state.loading = false;
				state.solicitudSeleccionada = action.payload;
			})
			.addCase(fetchSolicitudDetalles.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Error al cargar detalles';
			});
	},
});

export const { addSolicitud } = proyectoSlice.actions;
export default proyectoSlice.reducer;