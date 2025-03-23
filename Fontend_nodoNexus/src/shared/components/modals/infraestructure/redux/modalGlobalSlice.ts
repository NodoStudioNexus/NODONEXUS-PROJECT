import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
  isOpen: boolean;
  title: string;
  message: string;
  variant: "success" | "error" | "info" | "confirm" | "modalForms" | "warning" | "infoLarge";
  autoClose: boolean;
  content?: React.ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  extraClasses?: string;
};

interface UIState {
  modal: ModalState;
}

const initialState: UIState = {
  modal: {
    isOpen: false,
    title: "",
    message: "",
    variant: "info",
    autoClose: false,
    content: null,
    onConfirm: undefined,
    confirmText: "Aceptar",
    cancelText: "Cancelar",
    extraClasses: "",
  },
};

const modalGlobalSlice = createSlice({
  name: "modalGlobal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<Omit<ModalState, "isOpen">>) => {
      state.modal = {
        ...action.payload,
        isOpen: true,
      };
    },
    closeModal: (state) => {
      state.modal = initialState.modal;
    },
  },
});

export const { openModal, closeModal } = modalGlobalSlice.actions;
const modalGlobalReducer = modalGlobalSlice.reducer;
export default modalGlobalReducer;
