import { useEffect } from 'react';
import ThemeToggle from '../shared/components/themeToggle';
import { AppRouter } from './router/AppRouter';
import { RootState } from './store';
import { useSelector } from 'react-redux';
import { useWebSocket } from '../shared/hooks/useWebSocket';

const App = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useWebSocket()
  return (
    <>
      <ThemeToggle />
      <AppRouter />
    </>
  );
};

export default App;
