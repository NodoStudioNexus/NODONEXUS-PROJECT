import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { toggleTheme } from '../infraestructure/redux/themeSlice';
import { FaSun, FaMoon } from 'react-icons/fa'; // Iconos de React Icons

const ThemeToggle: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      onClick={handleToggleTheme}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.5rem',
        position: 'absolute',
        color: theme === 'light' ? '#000' : '#fff',
      }}
    >
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeToggle;
