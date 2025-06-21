import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ProyectoVista } from '../../domain/entities/ProyectoVista';
import { AvanceProyecto } from '../../domain/entities/AvanceProyecto';
import { getProyectosVista, getAvanceProyecto } from '../api/proyectoApi';


interface ProyectoState {
	proyectosVista: ProyectoVista[];
	proyectoSeleccionado: ProyectoVista | null;
	avanceProyecto: AvanceProyecto | null;
	loading: boolean;
	error: string | null;
}

const initialState: ProyectoState = {
	proyectosVista: [],
	proyectoSeleccionado: null,
	avanceProyecto: null,
	loading: false,
	error: null,
};

// Acción asíncrona para obtener los proyectos
export const fetchProyectosVista = createAsyncThunk(
	'proyectos/fetchProyectosVista',
	async () => {
		const data = await getProyectosVista();
		// Ordenar por fecha_inicio descendente y tomar los últimos 3 proyectos
		return data.sort((a, b) =>
			new Date(b.fecha_inicio).getTime() - new Date(a.fecha_inicio).getTime()
		).slice(0, 3);
	}
);

// Acción asíncrona para obtener el avance de un proyecto
export const fetchAvanceProyecto = createAsyncThunk(
	'proyectos/fetchAvanceProyecto',
	async (proyectoId: number) => {
		const data = await getAvanceProyecto(proyectoId);
		return data;
	}
);

const proyectoSlice = createSlice({
	name: 'proyectosList',
	initialState,
	reducers: {
		seleccionarProyecto: (state, action: PayloadAction<ProyectoVista>) => {
			state.proyectoSeleccionado = action.payload;
		},
		addProyecto: (state, action: PayloadAction<ProyectoVista>) => {
			state.proyectosVista.push(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProyectosVista.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProyectosVista.fulfilled, (state, action) => {
				state.loading = false;
				state.proyectosVista = action.payload;
				if (action.payload.length > 0) {
					state.proyectoSeleccionado = action.payload[0];
				}
			})
			.addCase(fetchProyectosVista.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Error al cargar proyectos';
			})
			.addCase(fetchAvanceProyecto.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchAvanceProyecto.fulfilled, (state, action) => {
				state.loading = false;
				state.avanceProyecto = action.payload;
			})
			.addCase(fetchAvanceProyecto.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Error al cargar avance del proyecto';
			});
	},
});

export const { seleccionarProyecto, addProyecto } = proyectoSlice.actions;
export default proyectoSlice.reducer;