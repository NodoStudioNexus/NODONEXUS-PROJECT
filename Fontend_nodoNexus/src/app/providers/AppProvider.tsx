import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
}

export default AppProvider
