import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../../../../app/store';
import { FaChevronLeft, FaBars } from 'react-icons/fa';
import { menuItemsByRole } from '../../../../config/menuItemsByRole';
import './sideBar.scss';



const SideBarLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);
  const role = user?.role || 'CLIENT';
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = menuItemsByRole[role] || [];

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const handleMenuItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <nav className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isExpanded ? <FaChevronLeft /> : <FaBars />}
      </button>
      <ul className="menu-items">
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => handleMenuItemClick(item.path)}
          >
            <item.icon className="menu-icon" />
            {isExpanded && <span className='menu-icon-text'>{item.name}</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideBarLayout;
