import { useDispatch } from 'react-redux';
import { closeModal } from '../../infraestructure/redux/modalGlobalSlice';

interface GenericSuccessModalProps {
  message: string;
}

export const GenericSuccessModal = ({ message }: GenericSuccessModalProps) => {
  const dispatch = useDispatch();

  return (
    <div className="generic-success-modal">
      <p>{message}</p>
      <div className="modal-footer">
        <button onClick={() => dispatch(closeModal())}>Cerrar</button>
      </div>
    </div>
  );
};

export default GenericSuccessModal;
