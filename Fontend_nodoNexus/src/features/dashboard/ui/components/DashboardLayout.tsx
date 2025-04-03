import { Outlet, useLocation } from 'react-router-dom';
import { moduleNames } from '../../../../config/routes';
import { menuItemsByRole } from '../../../../config/menuItemsByRole';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import './dashboardLayout.scss';
import HeaderLayout from './HeaderLayout';
import SideBarLayout from './SideBarLayout';

export const DashboardLayout = () => {
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);
  const role = user?.role || 'CLIENT';
  const currentPath = location.pathname;
  const menuItems = menuItemsByRole[role] || [];

  const moduleName =
    menuItems.find((item) => item.path === currentPath)?.name ||
    moduleNames[currentPath.split('/').pop() || ''] ||
    'Dashboard';

  return (
    <div className="dashboard-layout">
      <HeaderLayout moduleName={moduleName} />
      <div className="dashboard-content">
        <SideBarLayout />
        <main className="main-content">
          <Outlet />
        </main>
        <div className="chat-panel"></div> {/* Espacio para el chat */}
      </div>
      {/*

      <footer className="dashboard-footer">Dashboard Footer</footer>
      */}
    </div>
  );
};
