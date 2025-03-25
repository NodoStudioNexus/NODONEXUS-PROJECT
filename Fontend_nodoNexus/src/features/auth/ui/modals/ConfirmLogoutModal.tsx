import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeModal } from '../../../../shared/components/modals/infraestructure/redux/modalGlobalSlice';
import { logout } from '../../infraestructure/redux/authSlice';

export const ConfirmLogoutModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleConfirm = () => {
    dispatch(logout());
    navigate('/login');
    dispatch(closeModal());
  };

  return (
    <div className="confirm-logout-modal">
      <p>¿Estás seguro de que deseas cerrar sesión?</p>
      <div className="modal-footer">
        <button className="confirm-button" onClick={handleConfirm}>
          Aceptar
        </button>
        <button
          className="cancel-button"
          onClick={() => dispatch(closeModal())}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ConfirmLogoutModal;
