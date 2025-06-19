import { configureStore } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/lib/persistReducer';
import storage from 'redux-persist/es/storage';
import { persistStore } from 'redux-persist';
import authSlice from '../features/auth/infraestructure/redux/authSlice';
import modalGlobalReducer from '../shared/components/modals/infraestructure/redux/modalGlobalSlice';
import themeSliceReducer from '../shared/components/themeToggle/infraestructure/redux/themeSlice';
import resetSliceReducer from '../features/resetPassword/infraestructure/redux/resetSlice';
import notificacionSlice from '../features/comunicacion/infraestructure/redux/notificacionSlice';
import nuevoProyectoSlice from '../features/proyectos/infraestructure/redux/nuevoProyectoSlice';
import userSlice from '../features/userControl/infraestructure/redux/userSlice';
import chatSlice from '../features/comunicacion/infraestructure/redux/chatSlice';
import proyectoSlice from '../features/proyectos/infraestructure/redux/proyectoSlice';


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
const chatPersistConfig = {
  key: 'chat',
  storage,
  whitelist: ['chat']
}

const proyectoPersistConfig = {
  key: 'proyectos',
  storage,
  whitelist: ['solicitudesPendientes', 'solicitudSeleccionada'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);
const persistedThemeReducer = persistReducer(themePersistConfig, themeSliceReducer);
const persistedNotificacionReducer = persistReducer(notificacionPersistConfig, notificacionSlice);
const persistedProyectoReducer = persistReducer(proyectoPersistConfig, nuevoProyectoSlice);
const persistedChatReducer = persistReducer(chatPersistConfig, chatSlice);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    modalGlobal: modalGlobalReducer,
    theme: persistedThemeReducer,
    reset: resetSliceReducer,
    notificacion: persistedNotificacionReducer,
    proyectos: persistedProyectoReducer,
    users: userSlice,
    chat: persistedChatReducer,
    proyectosList: proyectoSlice,
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