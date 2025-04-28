import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { FaSearch, FaBell } from 'react-icons/fa';
import Logout from '../../../../shared/components/logout';
import './headerLayout.scss';

const API_URL = 'http://localhost:9091';


const HeaderLayout = ({ moduleName }: { moduleName: string }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const getUserInitial = () => {
    return user?.initial || 'U';
  }

  const verifyProfileImage = user?.profileImage && user.profileImage !== '';

  const profileImageUrl = verifyProfileImage ? `${API_URL}/${user.profileImage}` : '';

  console.log(profileImageUrl)

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
          {verifyProfileImage ? (
            <img
              src={profileImageUrl}
              alt="User Avatar"
              className="user-avatar"
              onClick={toggleProfileMenu}
              onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/40')}
            />
          ) : (
            <div className='user-initial' onClick={toggleProfileMenu}>
              {getUserInitial()}
            </div>
          )
          }
          {isProfileMenuOpen && (
            <div className="profile-menu">
              <p className='profile-menu-welcome'>¡Hola, {user?.primerNombre}!</p>
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
