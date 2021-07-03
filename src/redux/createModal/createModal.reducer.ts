import { CreateModalActions, CreateModalActionsTypes } from './createModal.actions';

interface CreateModalState {
  show: boolean;
}

const initialCreateModalState: CreateModalState = {
  show: false
};

export default function createModalReducer(state: CreateModalState = initialCreateModalState, action: CreateModalActions): CreateModalState {
  switch(action.type) {
  case CreateModalActionsTypes.SHOW:
    return {
      show: true
    };
  case CreateModalActionsTypes.HIDE:
    return {
      show: false
    };

  default:
    return state;
  }
}