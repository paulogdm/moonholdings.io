import { Actions } from '../actions/board'
import { IinitalBoardState } from '../shared/types'

const defaultBoardState : IinitalBoardState = { overlay: false };

interface IBoardAction {
  type: string;
  overlay: boolean;
}

export const BoardReducer = (state = defaultBoardState, action: IBoardAction): IinitalBoardState => {
  switch (action.type) {
    case Actions.SET_OVERLAY_STATE: {
      const { overlay } = action;
      return { overlay };
    }

    default:
      return state;
  }
};
