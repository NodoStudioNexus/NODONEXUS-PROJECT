import { useDispatch } from "react-redux";
import { openModal } from "../../../../shared/components/modals/infraestructure/redux/modalGlobalSlice";

export const ForgotPasswordLink = () => {
  const dispatch = useDispatch();

  const handleForgotPasswordClick = () => {
    dispatch(
      openModal({
        modalType: "resetPassword",
        title: "Restablecer Contraseña",
        message: "", // No necesitamos mensaje aquí, el formulario lo maneja
        variant: "confirm",
        autoClose: false,
      })
    );
  };

  return (
    <button
      type="button"
      onClick={handleForgotPasswordClick}
      className="forgot-password-link"
    >
      ¿Olvidaste tu contraseña?
    </button>
  );
};

export default ForgotPasswordLink;
