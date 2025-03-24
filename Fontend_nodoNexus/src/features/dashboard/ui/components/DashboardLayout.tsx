import { Outlet } from 'react-router-dom';
import Logout from '../../../../shared/components/logout';

export const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <header><h3>
        Dashboard Header
      </h3>
        <Logout />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Dashboard Footer</footer>
    </div>
  );
};
