import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserAuth from "../../domain/entities/UserAuth";
import { loginUseCase } from "../../domain/useCases/loginUseCase";
import { authApi } from "../api/authApi";

interface AuthState {
  user: UserAuth | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      return await loginUseCase(authApi, email, password);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error en el login');
    }
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
