import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../app/store';
import { FaSearch, FaBell } from 'react-icons/fa';
import Logout from '../../../../shared/components/logout';
import './headerLayout.scss';
import { useNavigate } from 'react-router';
import { PrivateRoutes } from '../../../../config/routes';
import { getProfileImageUrl } from '../../../../shared/utils/getProfileImageUrl';

import { addNotification } from '../../../../features/notificaciones/infraestructure/redux/notificacionSlice';
import NotificacionDropdown from '../../../notificaciones/ui/components/NotificacionDropdown';

const HeaderLayout = ({ moduleName }: { moduleName: string }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const notifications = useSelector((state: RootState) => state.notificacion.notifications);
  const dispatch = useDispatch();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const navigate = useNavigate();

  const getUserInitial = () => user?.initial || 'U';
  const hasProfileImage = user?.profileImage && user.profileImage !== '' && !imageFailed;
  const profileImageUrl = getProfileImageUrl(user?.profileImage);

  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const toggleNotificationMenu = () => setIsNotificationOpen(!isNotificationOpen);

  const unreadCount = notifications.filter((notif) => !notif.leido).length;

  // Simulación de notificación al crear un proyecto (solo para prueba)
  useEffect(() => {
    dispatch(addNotification({
      id: Date.now(), // ID único basado en timestamp
      mensaje: '¡Se ha creado un nuevo proyecto!',
      creadoEn: new Date().toISOString(),
      leido: false,
    }));
  }, [dispatch]);

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <FaSearch className="search-icon" />
      </div>

      <div className="header-center">
        <h2>{moduleName}</h2>
      </div>

      <div className="header-right">
        <div className="notificacion-container">
          <FaBell
            className="notifications-icon"
            onClick={toggleNotificationMenu}
          />
          {unreadCount > 0 && <span className="unread-dot"></span>}

          {isNotificationOpen && (
            <div className='containerNotificaciones'>
              <NotificacionDropdown />
            </div>
          )}
        </div>

        <div className="profile-container">
          {hasProfileImage ? (
            <img
              src={profileImageUrl}
              alt="User Avatar"
              className="user-avatar"
              onClick={toggleProfileMenu}
              onError={() => setImageFailed(true)}
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