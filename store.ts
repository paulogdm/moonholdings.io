import { applyMiddleware, createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import { IinitialState } from './shared/types'
import { AssetsReducer, defaultAssetsState } from './reducers/assets'
import { BoardReducer, defaultBoardState } from './reducers/board'

const rootReducer = combineReducers({
  AssetsReducer,
  BoardReducer
});

export const defaultInitialState: IinitialState = {
  AssetsReducer: defaultAssetsState,
  BoardReducer: defaultBoardState,
}

export function initializeStore(initialState: IinitialState = defaultInitialState) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
