import { useDispatch } from "react-redux";
import { openModal } from "../../../../shared/components/modals/infraestructure/redux/modalGlobalSlice";

import './forgotPassword.scss'

export const ForgotPasswordLink = () => {
  const dispatch = useDispatch();

  const handleForgotPasswordClick = () => {
    dispatch(
      openModal({
        modalType: "resetPassword",
        title: "Restablecer Contraseña",
        message: "",
        variant: "confirm",
        autoClose: false,
        extraClasses: "modalConfirm ",
      })
    );
  };

  return (
    <p
      onClick={handleForgotPasswordClick}
      className="forgot-password-link"
    >
      ¿Olvidaste tu contraseña?
    </p>
  );
};

export default ForgotPasswordLink;
