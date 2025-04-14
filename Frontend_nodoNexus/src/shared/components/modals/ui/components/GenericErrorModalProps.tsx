import { useDispatch } from 'react-redux';
import { closeModal } from '../../infraestructure/redux/modalGlobalSlice';

interface GenericErrorModalProps {
  message: string;
}

export const GenericErrorModal = ({ message }: GenericErrorModalProps) => {
  const dispatch = useDispatch();

  return (
    <div className="generic-error-modal">
      <p>{message}</p>
      <div className="modal-footer">
        <button onClick={() => dispatch(closeModal())}>Cerrar</button>
      </div>
    </div>
  );
};

export default GenericErrorModal;
