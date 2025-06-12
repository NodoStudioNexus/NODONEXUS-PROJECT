import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { NuevoProyectoResumida, nuevoProyectoDetallada } from '../../domain/entities/NuevoProyecto';
import { getSolicitudDetalles, getSolicitudesEnProgreso, getSolicitudesPendientes } from '../api/nuevoProyectoApi';

interface ProyectoState {
	solicitudesPendientes: NuevoProyectoResumida[];
	solicitudesEnProgreso: NuevoProyectoResumida[]; // Nuevo estado
	solicitudSeleccionada: nuevoProyectoDetallada | null;
	loading: boolean;
	error: string | null;
}

const initialState: ProyectoState = {
	solicitudesPendientes: [],
	solicitudesEnProgreso: [],
	solicitudSeleccionada: null,
	loading: false,
	error: null,
};

export const fetchSolicitudesPendientes = createAsyncThunk(
	'proyectos/fetchSolicitudesPendientes',
	async () => {
		return await getSolicitudesPendientes();
	}
);

export const fetchSolicitudesEnProgreso = createAsyncThunk(
	'proyectos/fetchSolicitudesEnProgreso',
	async () => {
		return await getSolicitudesEnProgreso();
	}
);

export const fetchSolicitudDetalles = createAsyncThunk(
	'proyectos/fetchSolicitudDetalles',
	async (id: number) => {
		return await getSolicitudDetalles(id);
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
				state.error = action.error.message || 'Error al cargar solicitudes pendientes';
			})

			.addCase(fetchSolicitudesEnProgreso.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchSolicitudesEnProgreso.fulfilled, (state, action) => {
				state.loading = false;
				state.solicitudesEnProgreso = action.payload;
			})
			.addCase(fetchSolicitudesEnProgreso.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Error al cargar solicitudes en progreso';
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