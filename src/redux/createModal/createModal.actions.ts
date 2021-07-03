import { Action } from 'redux';

export enum CreateModalActionsTypes {
  SHOW='CREATE_MODAL_SHOW',
  HIDE='CREATE_MODAL_HIDE'
}

type ShowCreateModalAction = Action<CreateModalActionsTypes.SHOW>;
type HideCreateModalAction = Action<CreateModalActionsTypes.HIDE>;
export function showCreateModal(): ShowCreateModalAction {
  return {
    type: CreateModalActionsTypes.SHOW
  };
}

export function hideCreateModal(): HideCreateModalAction {
  return {
    type: CreateModalActionsTypes.HIDE
  };
}

export type CreateModalActions = ShowCreateModalAction | HideCreateModalAction;