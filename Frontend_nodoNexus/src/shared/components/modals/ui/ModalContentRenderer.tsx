import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import ConfirmLogoutModal from '../../../../features/auth/ui/modals/ConfirmLogoutModal';
import ResetPasswordModal from '../../../../features/resetPassword/ui/components/ResetPasswordForm';
import GenericSuccessModal from './components/GenericSuccessModal';
import GenericErrorModal from './components/GenericErrorModalProps';
import ModalNewUser from '../../../../features/userControl/ui/components/modales/ModalNewUser';
import DetalleSolicitud from '../../../../features/proyectos/ui/components/cotizaciones/DetalleSolicitud';
import ListaSolicitudesUser from '../../../../features/proyectos/ui/components/cotizaciones/ListaSolicitudesUser';

export const ModalContentRenderer = () => {
  const modal = useSelector((state: RootState) => state.modalGlobal.modal);


  if (!modal.modalType) return null;

  switch (modal.modalType) {
    case 'resetPassword':
      return <ResetPasswordModal />;
    case 'FormNewUser':
      return <ModalNewUser />;
    case 'confirmLogout':
      return <ConfirmLogoutModal />;
    case 'success':
      return <GenericSuccessModal message={modal.message} />;
    case 'error':
      return <GenericErrorModal message={modal.message} />;
    case 'info':
      return <p>{modal.message}</p>;
    case 'detallesProyecto':
      return <DetalleSolicitud solicitudId={modal.payload?.solicitudId} />;
    case 'misSolicitudes':
      return <ListaSolicitudesUser />;
    default:
      return null;
  }
};
