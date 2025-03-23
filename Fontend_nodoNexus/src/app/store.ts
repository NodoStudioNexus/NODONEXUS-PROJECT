import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/infraestructure/redux/authSlice';
import persistReducer from 'redux-persist/lib/persistReducer';
import storage from "redux-persist/es/storage";
import { persistStore } from 'redux-persist';
import modalGlobalReducer from '../shared/components/modals/infraestructure/redux/modalGlobalSlice';


const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user'],
}

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);


export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    modalGlobal: modalGlobalReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Ignora acciones de redux-persist
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
