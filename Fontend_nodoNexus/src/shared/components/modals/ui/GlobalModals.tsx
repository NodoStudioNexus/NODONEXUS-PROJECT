import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import "./globalModal.scss";
import { RootState } from "../../../../app/store";
import { closeModal } from "../infraestructure/redux/modalGlobalSlice";

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

  if (!modal.isOpen) return null;

  return (
    <div className={`${modal.extraClasses || "modal-overlay"}`}>
      <div className={`modal-content ${modal.variant}`}>
        <div className={`${modal.variant}_modal-header `}>
          <h3>{modal.title}</h3>
        </div>
        <div className="modal-body">
          <p>{modal.message}</p>
          {modal.content && <div>{modal.content}</div>}
        </div>
        <div className="modal-footer">
          {modal.onConfirm && (
            <button
              className="confirm-button"
              onClick={() => {
                modal.onConfirm?.();
                dispatch(closeModal());
              }}
            >
              {modal.confirmText || "Confirmar"}
            </button>
          )}
          <button
            className="cancel-button"
            onClick={() => dispatch(closeModal())}
          >
            {modal.cancelText || "Cerrar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalModal;
