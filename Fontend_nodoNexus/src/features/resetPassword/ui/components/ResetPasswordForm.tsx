// src/features/resetPassword/ui/modals/ResetPasswordModal.tsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { requestReset } from "../../infraestructure/redux/resetSlice";
import {
  closeModal,
  openModal,
} from "../../../../shared/components/modals/infraestructure/redux/modalGlobalSlice";

export const ResetPasswordModal = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.reset
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(requestReset(email) as any);
  };

  useEffect(() => {
    if (success) {
      dispatch(closeModal());
      dispatch(
        openModal({
          modalType: "success",
          title: "Solicitud Enviada",
          message: "Revisa tu correo para el enlace de restablecimiento.",
          variant: "success",
          autoClose: true,
        })
      );
      dispatch({ type: "reset/resetState" });
    }
  }, [success, dispatch]);

  return (
    <form onSubmit={handleSubmit} className="reset-password-form">
      <div className="reset-password-form_info">
        <label htmlFor="email">
          Ingrese el correo electronico registrado para obtener el link de restablecimiento de contraseña
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingresa tu correo"
          disabled={loading}
          required
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="modal-footer">
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </button>
        <button
          type="button"
          className="cancel-button"
          onClick={() => dispatch(closeModal())}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ResetPasswordModal;
