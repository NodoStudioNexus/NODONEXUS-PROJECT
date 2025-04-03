import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { toggleTheme } from '../infraestructure/redux/themeSlice';
import { FaSun, FaMoon } from 'react-icons/fa'; // Iconos de React Icons

import './themetoggle.scss';


const ThemeToggle: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <p
      onClick={handleToggleTheme}
      className='toggleTheme'
    >
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </p>
  );
};

export default ThemeToggle;
