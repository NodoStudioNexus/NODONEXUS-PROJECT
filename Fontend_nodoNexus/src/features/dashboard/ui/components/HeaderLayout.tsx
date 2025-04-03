import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { FaSearch, FaBell } from 'react-icons/fa';
import Logout from '../../../../shared/components/logout';
import './headerLayout.scss';


const HeaderLayout = ({ moduleName }: { moduleName: string }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <FaSearch className="search-icon" />
      </div>

      <div className="header-center">
        <h2>{moduleName}</h2>
      </div>

      <div className="header-right">
        <FaBell className="notifications-icon" />
        <div className="profile-container">
          <img
            //src={user?.avatar || 'https://via.placeholder.com/40'}
            //alt="User Avatar"
            className="user-avatar"
            onClick={toggleProfileMenu}
          />
          {isProfileMenuOpen && (
            <div className="profile-menu">
              <ul>
                <li>Ver mi perfil</li>
                <li>Configuración</li>
                <li>Modo</li>
                <li>
                  <Logout />
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default HeaderLayout;
