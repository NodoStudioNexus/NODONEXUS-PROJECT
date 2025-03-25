import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../modals/infraestructure/redux/modalGlobalSlice';

const Logout: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(
      openModal({
        modalType: 'confirmLogout',
        title: 'Cerrar Sesión',
        message: '¿Estás seguro de que deseas cerrar sesión?',
        variant: 'confirm',
        autoClose: false,
      })
    );
  };

  return (
    <button onClick={handleLogoutClick} style={{ cursor: 'pointer' }}>
      Cerrar sesión
    </button>
  );
};

export default Logout;
