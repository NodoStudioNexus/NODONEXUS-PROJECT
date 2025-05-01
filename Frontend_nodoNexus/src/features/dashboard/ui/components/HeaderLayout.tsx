import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { FaSearch, FaBell } from 'react-icons/fa';
import Logout from '../../../../shared/components/logout';

import './headerLayout.scss';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9091'; // Respaldo

const HeaderLayout = ({ moduleName }: { moduleName: string }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Función auxiliar para obtener la inicial
  const getUserInitial = () => {
    return user?.initial || 'U';
  };

  // Verificar si hay una imagen de perfil válida
  const hasProfileImage = user?.profileImage && user.profileImage !== '';

  // Construir la URL completa para la imagen
  const profileImageUrl = hasProfileImage && user?.profileImage
    ? `${API_URL}/Uploads/${user.profileImage.split('/').pop()}`
    : '';

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