/// <reference types="vite/client" />
declare module 'redux-persist/es/storage' {
  import { WebStorage } from 'redux-persist/es/types';
  const localStorage: WebStorage;
  export default localStorage;
}

declare module 'redux-persist/lib/persistReducer' {
  import { PersistConfig, Persistor } from 'redux-persist/es/types';
  import { Reducer } from 'redux';

  export default function persistReducer<S>(
    config: PersistConfig<S>,
    baseReducer: Reducer<S>
  ): Reducer<S>;
}

declare module 'redux-persist/es/persistStore' {
  import { Persistor, PersistConfig } from 'redux-persist/es/types';
  import { Store } from 'redux';

  export default function persistStore(store: Store, config?: PersistConfig<any>): Persistor;
}

declare module 'redux-persist/integration/react' {
  import { ReactNode } from 'react';
  import { Persistor } from 'redux-persist/es/types';

  interface PersistGateProps {
    persistor: Persistor;
    loading?: ReactNode;
    children?: ReactNode;
  }

  const PersistGate: React.FC<PersistGateProps>;
  export default PersistGate;
}
