import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import ConfirmLogoutModal from '../../../../features/auth/ui/modals/ConfirmLogoutModal';
import ResetPasswordModal from '../../../../features/resetPassword/ui/components/ResetPasswordForm';
import GenericSuccessModal from './components/GenericSuccessModal';
import GenericErrorModal from './components/GenericErrorModalProps';

export const ModalContentRenderer = () => {
  const modal = useSelector((state: RootState) => state.modalGlobal.modal);

  if (!modal.modalType) return null;

  switch (modal.modalType) {
    case 'resetPassword':
      return <ResetPasswordModal />;
    case 'confirmLogout':
      return <ConfirmLogoutModal />;
    case 'success':
      return <GenericSuccessModal message={modal.message} />;
    case 'error':
      return <GenericErrorModal message={modal.message} />;
    case 'info':
      return <p>{modal.message}</p>;
    default:
      return null;
  }
};
