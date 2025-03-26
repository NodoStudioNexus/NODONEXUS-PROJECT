import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { modalType } from './modalType';
import { modalVariant } from './modalVariant';

type ModalState = {
  isOpen: boolean;
  modalType: modalType | null;
  title: string;
  message: string;
  variant: modalVariant;
  autoClose: boolean;
  payload?: Record<string, any>; // Solo datos serializables
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
    modalType: null,
    title: '',
    message: '',
    variant: 'info',
    autoClose: false,
    payload: {},
    confirmText: 'Aceptar',
    cancelText: 'Cancelar',
    extraClasses: '',
  },
};

const modalGlobalSlice = createSlice({
  name: 'modalGlobal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<Omit<ModalState, 'isOpen'>>) => {
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
export default modalGlobalSlice.reducer;
