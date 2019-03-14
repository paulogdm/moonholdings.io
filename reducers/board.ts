import { Actions } from '../actions/board'
import { IinitalBoardState } from '../shared/types'

export const defaultBoardState : IinitalBoardState = {
  overlay: false,
  notification: '',
  notificationError: false
};

interface IBoardAction {
  type: string;
  overlay: boolean;
  notification: string;
  notificationError: boolean;
}

export const BoardReducer = (state = defaultBoardState, action: IBoardAction): IinitalBoardState => {
  switch (action.type) {
    case Actions.SET_OVERLAY_STATE: {
      const { overlay } = action;
      return { ...state, overlay };
    }

    case Actions.SET_NOTIFICATION: {
      const { notification, notificationError } = action;
      return { ...state, notification, notificationError };
    }

    default:
      return state;
  }
};
