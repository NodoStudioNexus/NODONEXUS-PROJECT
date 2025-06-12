import { Outlet, useLocation } from 'react-router-dom';
import { moduleNames } from '../../../../config/routes';
import { menuItemsByRole } from '../../../../config/menuItemsByRole';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import './dashboardLayout.scss';
import HeaderLayout from './HeaderLayout';
import SideBarLayout from './SideBarLayout';
import NotificacionPanel from '../../../comunicacion/ui/components/NotificacionPanel';
import { useState } from 'react';

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

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => setIsPanelOpen(!isPanelOpen);

  return (
    <div className="dashboard-layout">
      <HeaderLayout moduleName={moduleName} onOpenPanel={togglePanel} />
      <div className="dashboard-content">
        <SideBarLayout />
        <main className={`main-content ${isPanelOpen ? 'panel-open' : ''}`}>
          <Outlet />
        </main>
        <NotificacionPanel isOpen={isPanelOpen} onClose={togglePanel} />
        {/*<div className="chat-panel"></div>  Espacio para el chat */}
      </div>
    </div>
  );
};