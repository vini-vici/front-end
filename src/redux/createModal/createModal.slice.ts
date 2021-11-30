import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  show: boolean;
}

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    show: false
  } as ModalState,
  reducers: {
    showModal() {
      return {
        show: true
      };
    },
    hideModal() {
      return {
        show: false,
      };
    },
    toggleModal(state) {
      return {
        show: !state.show
      };
    }
  }
});


export const { hideModal, showModal, toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
