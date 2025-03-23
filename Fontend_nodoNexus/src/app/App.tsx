import { AppProvider } from "./providers";
import { AppRouter } from "./router/AppRouter";

const App = () => {
  return (
    <>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </>
  );
};

export default App;
