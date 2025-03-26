import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { resetPasswordApi } from '../api/ResetPasswordApi';
import { requestResetUseCase } from '../../domain/useCase/requestReset';

interface ResetState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ResetState = {
  loading: false,
  error: null,
  success: false,
};

export const requestReset = createAsyncThunk(
  'reset/requestReset',
  async (email: string, { rejectWithValue }) => {
    try {
      await requestResetUseCase(resetPasswordApi, email);
      return true;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al solicitar restablecimiento');
    }
  }
);

const resetSlice = createSlice({
  name: 'reset',
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestReset.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(requestReset.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(requestReset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetState } = resetSlice.actions;
const resetSliceReducer = resetSlice.reducer;
export default resetSliceReducer;
