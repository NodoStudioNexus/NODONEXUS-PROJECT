import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../features/auth/infraestructure/redux/authSlice';

const Logout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} style={{ cursor: 'pointer' }}>
      Cerrar sesión
    </button>
  );
};

export default Logout;
