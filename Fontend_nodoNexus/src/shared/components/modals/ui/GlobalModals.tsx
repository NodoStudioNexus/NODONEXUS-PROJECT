import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../app/store';
import { closeModal } from '../infraestructure/redux/modalGlobalSlice';
import { ModalContentRenderer } from './ModalContentRenderer';
import './globalModals.scss';

const GlobalModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.modalGlobal.modal);

  useEffect(() => {
    if (modal.autoClose) {
      const timer = setTimeout(() => {
        dispatch(closeModal());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [modal.autoClose, dispatch]);

  if (!modal.isOpen || !modal.modalType) return null;

  return (
    <div className={`${modal.extraClasses || 'modal-overlay'}`}>
      <div className={`modal-content ${modal.variant}`}>
        <div className={`${modal.variant}_modal-header`}>
          <h3>{modal.title}</h3>
        </div>
        <div className="modal-body">
          <ModalContentRenderer />
        </div>
        {['success', 'error', 'info'].includes(modal.variant) && (
          <div className="modal-footer">
            <button
              className="cancel-button"
              onClick={() => dispatch(closeModal())}
            >
              {modal.cancelText || 'Cerrar'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalModal;
