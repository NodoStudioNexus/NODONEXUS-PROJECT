import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/infraestructure/redux/authSlice';
import persistReducer from 'redux-persist/lib/persistReducer';
import storage from "redux-persist/es/storage";
import { persistStore } from 'redux-persist';
import modalGlobalReducer from '../shared/components/modals/infraestructure/redux/modalGlobalSlice';
import themeSliceReducer from '../shared/components/themeToggle/infraestructure/redux/themeSlice';
import resetSliceReducer from '../features/resetPassword/infraestructure/redux/resetSlice';
import notificacionSlice from '../features/comunicacion/infraestructure/redux/notificacionSlice';


const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user'],
};

const themePersistConfig = {
  key: 'theme',
  storage,
};

const notificacionPersistConfig = {
  key: 'notificaciones',
  storage,
  whitelist: ['notifications'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);
const persistedThemeReducer = persistReducer(themePersistConfig, themeSliceReducer);
const persistedNotificacionReducer = persistReducer(notificacionPersistConfig, notificacionSlice);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    modalGlobal: modalGlobalReducer,
    theme: persistedThemeReducer,
    reset: resetSliceReducer,
    notificacion: persistedNotificacionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
