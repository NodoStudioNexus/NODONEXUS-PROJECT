import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { FaSearch, FaBell } from 'react-icons/fa';
import Logout from '../../../../shared/components/logout';

import './headerLayout.scss';
import { useNavigate } from 'react-router';
import { PrivateRoutes } from '../../../../config/routes';
import { getProfileImageUrl } from '../../../../shared/utils/getProfileImageUrl';

const HeaderLayout = ({ moduleName }: { moduleName: string }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const getUserInitial = () => user?.initial || 'U';
  const hasProfileImage = user?.profileImage && user.profileImage !== '';
  const profileImageUrl = getProfileImageUrl(user?.profileImage);

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
          {hasProfileImage ? (
            <img
              src={profileImageUrl}
              alt="User Avatar"
              className="user-avatar"
              onClick={toggleProfileMenu}
              onError={(e) => {
                console.log('Image load error:', e);
                e.currentTarget.src = 'https://via.placeholder.com/40';
              }}
            />
          ) : (
            <div className="user-initial" onClick={toggleProfileMenu}>
              {getUserInitial()}
            </div>
          )}
          {isProfileMenuOpen && (
            <div className="profile-menu">
              <p className="profile-menu-welcome">
                ¡Hola, {user?.primerNombre || 'Usuario'}!
              </p>
              <ul>
                <li onClick={() => navigate(PrivateRoutes.PROFILE)}>Ver mi perfil</li>
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