import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { FaSearch, FaBell } from 'react-icons/fa';
import Logout from '../../../../shared/components/logout';
import './headerLayout.scss';
import { useNavigate } from 'react-router';
import { PrivateRoutes } from '../../../../config/routes';
import { getProfileImageUrl } from '../../../../shared/utils/getProfileImageUrl';
import NotificacionDropdown from '../../../comunicacion/ui/components/NotificacionDropdown';

const HeaderLayout = ({ moduleName, onOpenPanel }: { moduleName: string; onOpenPanel: () => void }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const notifications = useSelector((state: RootState) => state.notificacion.notifications);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const navigate = useNavigate();
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationMenuRef = useRef<HTMLDivElement>(null);

  const getUserInitial = () => user?.initial || 'U';
  const hasProfileImage = user?.profileImage && user.profileImage !== '' && !imageFailed;
  const profileImageUrl = getProfileImageUrl(user?.profileImage);

  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const toggleNotificationMenu = () => setIsNotificationOpen(!isNotificationOpen);
  const closeNotificationMenu = () => setIsNotificationOpen(false);

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
      if (notificationMenuRef.current && !notificationMenuRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((notif) => !notif.leido).length;

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <FaSearch className="search-icon" />
      </div>

      <div className="header-center">
        <h2>{moduleName}</h2>
      </div>

      <div className="header-right">
        <div className="notificacion-container" ref={notificationMenuRef}>
          <FaBell
            className="notifications-icon"
            onClick={toggleNotificationMenu}
          />
          {unreadCount > 0 && <span className="unread-dot"></span>}
          {isNotificationOpen && (
            <div className="containerNotificaciones">
              <NotificacionDropdown onViewAll={onOpenPanel} onClose={closeNotificationMenu} />
            </div>
          )}
        </div>

        <div className="profile-container" ref={profileMenuRef}>
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
                <li><Logout /></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderLayout;